const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// 1. Delete workout-history
const historyDir = path.join(srcDir, 'modules', 'workout-history');
if (fs.existsSync(historyDir)) {
    fs.rmSync(historyDir, { recursive: true, force: true });
}

// 2. Rename weight-tracking to body-weight-tracking
const oldWeightDir = path.join(srcDir, 'modules', 'weight-tracking');
const newWeightDir = path.join(srcDir, 'modules', 'body-weight-tracking');

if (fs.existsSync(oldWeightDir)) {
    fs.renameSync(oldWeightDir, newWeightDir);
}

// Rename files inside body-weight-tracking
function renameFilesInDir(dir, oldPrefix1, oldPrefix2, newPrefix) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const itemPath = path.join(dir, item);
        if (fs.statSync(itemPath).isDirectory()) {
            renameFilesInDir(itemPath, oldPrefix1, oldPrefix2, newPrefix);
        } else {
            let newName = item;
            if (newName.startsWith(oldPrefix1)) {
                newName = newName.replace(oldPrefix1, newPrefix);
            } else if (newName.startsWith(oldPrefix2)) {
                newName = newName.replace(oldPrefix2, newPrefix);
            }
            if (newName !== item) {
                fs.renameSync(itemPath, path.join(dir, newName));
            }
        }
    }
}

renameFilesInDir(newWeightDir, 'weight-tracking', 'weight-logs', 'body-weight-tracking');

// 3. Update imports in all files in src/
function updateImportsInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace workout-history routes in app.ts
    if (filePath.endsWith('app.ts')) {
        content = content.replace(/import workoutHistoryRouter from ".*workout-history\.route\.js";\r?\n/, '');
        content = content.replace(/app\.use\(workoutHistoryRouter\);\r?\n/, '');
    }

    // Replace weight-tracking / weight-logs references
    content = content.replace(/weight-tracking/g, 'body-weight-tracking');
    content = content.replace(/weight-logs/g, 'body-weight-tracking');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
    }
}

function walkAndProcess(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            walkAndProcess(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.js')) {
            updateImportsInFile(fullPath);
        }
    }
}

walkAndProcess(srcDir);
console.log("Renaming and cleanup complete.");
