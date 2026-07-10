import { Project, SyntaxKind } from 'ts-morph';

const project = new Project({
    tsConfigFilePath: 'tsconfig.json',
});

// Refactor Controllers Only
const controllerFiles = project.getSourceFiles('src/modules/**/*.controller.ts');
for (const file of controllerFiles) {
    let modified = false;
    if (file.getBaseName() === 'auth.controller.ts') continue;

    file.getVariableDeclarations().forEach(varDecl => {
        const init = varDecl.getInitializer();
        if (init && (init.getKind() === SyntaxKind.ArrowFunction)) {
            const arrowFunc = init.asKindOrThrow(SyntaxKind.ArrowFunction);
            if (arrowFunc.isAsync()) {
                const body = arrowFunc.getBody();
                if (body.getKind() === SyntaxKind.Block) {
                    const block = body.asKindOrThrow(SyntaxKind.Block);
                    const tryStmts = block.getStatements().filter(s => s.getKind() === SyntaxKind.TryStatement);
                    
                    if (tryStmts.length > 0) {
                        for (const tryStmt of tryStmts) {
                            const tryBlock = tryStmt.asKindOrThrow(SyntaxKind.TryStatement).getTryBlock();
                            // Use getFullText() to preserve all comments and spacing
                            const statements = tryBlock.getStatements().map(s => s.getFullText());
                            const blockText = statements.join('');
                            block.replaceWithText(`{\n${blockText}\n}`);
                        }
                        
                        const funcText = arrowFunc.getText();
                        varDecl.setInitializer(`asyncHandler(${funcText})`);
                        modified = true;
                    }
                }
            }
        }
    });

    if (modified) {
        // Ensure asyncHandler is imported
        const hasImport = file.getImportDeclaration("express-async-handler");
        if (!hasImport) {
            file.addImportDeclaration({
                defaultImport: "asyncHandler",
                moduleSpecifier: "express-async-handler"
            });
        }
        file.saveSync();
    }
}

console.log("Refactoring complete!");
