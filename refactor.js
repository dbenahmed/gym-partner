const fs = require('fs');
const path = require('path');

const serverDir = path.join(__dirname, 'server');
const dirs = ['controllers', 'routes', 'services', 'repositories'];

// Mapping of old file base names to new kebab-case base names without extensions
// Also resolving the double 'workoutTemplates' issue by giving them distinct names if they clash,
// or just standardizing.
// The user wants: <kebab case name>.<type>.<extension>
const typeMap = {
    'controllers': 'controller',
    'routes': 'route',
    'services': 'service',
    'repositories': 'repository'
};

const renamingMap = {}; // oldBaseNameWithoutExt -> newBaseNameWithoutExt
// old to new for import replacements (which include type)
const importReplacementMap = {}; // old filename without ext -> new filename without ext

function toKebabCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}

function processRenameAndMap() {
    dirs.forEach(dir => {
        const dirPath = path.join(serverDir, dir);
        if (!fs.existsSync(dirPath)) return;
        
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            if (fs.statSync(path.join(dirPath, file)).isDirectory()) return;

            const ext = path.extname(file);
            const baseName = path.basename(file, ext);
            
            // Skip the ones we are splitting manually
            if (baseName.includes('exerciseDatabase')) return;

            // Remove existing type suffixes like 'Controllers', 'Routes', 'Services', 'Repositories', 'Repo'
            let cleanName = baseName
                .replace(/Controllers?$/i, '')
                .replace(/Routes?$/i, '')
                .replace(/Services?$/i, '')
                .replace(/Repositories?$/i, '')
                .replace(/Repo$/i, '')
                .replace(/\.controller$/i, '')
                .replace(/\.route$/i, '')
                .replace(/\.service$/i, '')
                .replace(/\.repository$/i, '');
                
            let kebabName = toKebabCase(cleanName);
            
            // Fix specific odd cases if any
            if (kebabName === 'admin-dashboard') {}
            
            const typeSuffix = typeMap[dir];
            const newName = `${kebabName}.${typeSuffix}`;
            
            const oldPath = path.join(dirPath, file);
            const newPath = path.join(dirPath, newName + '.ts'); // always make it .ts

            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${file} -> ${newName}.ts`);

            importReplacementMap[baseName] = newName;
            importReplacementMap[file] = newName + '.ts';
            importReplacementMap[baseName + '.js'] = newName + '.js';
            importReplacementMap[baseName + '.ts'] = newName + '.ts';
        });
    });
}

function updateImports() {
    // Add manual ones for exerciseDatabase which we will split manually
    importReplacementMap['exerciseDatabaseControllers'] = 'exercise-search.controller'; // mostly gets search
    importReplacementMap['exerciseDatabaseControllers.js'] = 'exercise-search.controller.js';
    importReplacementMap['exerciseDatabaseRoutes'] = 'exercise-search.route';
    importReplacementMap['exerciseDatabaseRoutes.js'] = 'exercise-search.route.js';
    importReplacementMap['exerciseDatabaseServices'] = 'exercise-search.service';
    importReplacementMap['exerciseDatabaseServices.js'] = 'exercise-search.service.js';
    importReplacementMap['exerciseDatabaseRepositories'] = 'exercise-search.repository';
    importReplacementMap['exerciseDatabaseRepositories.js'] = 'exercise-search.repository.js';
    
    // We also need to search all files in server directory for these imports and replace them.
    const replaceInFile = (filePath) => {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Add todo for unfinished APIs in controllers
        if (filePath.includes('controller')) {
            const lines = content.split('\n');
            let inBlock = false;
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes('export const')) {
                    const blockEndIndex = lines.findIndex((l, idx) => idx > i && l.trim() === '};');
                    if (blockEndIndex !== -1) {
                        const block = lines.slice(i, blockEndIndex + 1).join('\n');
                        if ((block.includes('To be implemented') || block.includes('res.status(200).json({ message: \'') || block.includes('// ... existing code ...') || block.match(/\{\s*\}/)) && !block.includes('todo :')) {
                            lines.splice(i, 0, '// todo : to be implemented');
                            modified = true;
                            i++; // skip the newly added line
                        }
                    }
                }
            }
            content = lines.join('\n');
        }

        // Replace imports
        // Look for imports like: import ... from ".../controllers/workoutPlansControllers.js"
        // Regex to find import strings
        const importRegex = /(from\s+['"]|import\s+['"])(.+?)(['"])/g;
        content = content.replace(importRegex, (match, p1, p2, p3) => {
            const base = path.basename(p2);
            if (importReplacementMap[base]) {
                const newBase = importReplacementMap[base];
                return p1 + p2.replace(base, newBase) + p3;
            }
            return match;
        });

        if (modified || content !== fs.readFileSync(filePath, 'utf8')) {
            fs.writeFileSync(filePath, content);
            console.log(`Updated imports in: ${filePath}`);
        }
    };

    const walkDir = (dir) => {
        if (!fs.existsSync(dir)) return;
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (file !== 'node_modules' && file !== 'dist') walkDir(fullPath);
            } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.js')) {
                replaceInFile(fullPath);
            }
        });
    };

    walkDir(serverDir);
}

processRenameAndMap();
updateImports();
