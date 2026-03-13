import fs from "fs";
import path from "path";

export function makeModule(name: string) {
    const className = capitalize(name);
    const basePath = path.join(process.cwd(), "src/modules", className);

    if (fs.existsSync(basePath)) {
        console.error("\x1b[31mError, this module already exist.\x1b[0m");
        process.exit(1);
    }

    fs.mkdirSync(basePath, { recursive: true });


    fs.writeFileSync(
        path.join(basePath, `${name}.module.ts`),
        `import { ${className}Repository } from "./${name}.repository";
import { ${className}Service } from "./${name}.service";
import { ${className}Controller } from "./${name}.controller";
import { create${className}Routes } from "./${name}.routes";\n
export class ${className}Module {
    static create() {
        const repository = new ${className}Repository();
        const service = new ${className}Service(repository);
        const controller = new ${className}Controller(service);

        const router = create${className}Routes(controller);

        return router;
    }
}`
    );

    fs.writeFileSync(
        path.join(basePath, `${name}.routes.ts`),
        `import { Router } from "express";
import { ${className}Controller } from "./${name}.controller";\n
export function create${className}Routes(controller: ${className}Controller) {
    const router = Router();

    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
}`
    );

    fs.writeFileSync(
        path.join(basePath, `${name}.service.ts`),
        `import { ${className}Repository } from "./${name}.repository";\n
export class ${className}Service {
    constructor(
        private repository: ${className}Repository
    ) {}
}
\n`
    );

    fs.writeFileSync(
        path.join(basePath, `${name}.repository.ts`),
        `import { Repository } from "../../infra/database/Repository";\n
export class ${className}Repository extends Repository<unknown> {
    constructor() {
        super("");
    }
}\n`
    );

    fs.writeFileSync(
        path.join(basePath, `${name}.controller.ts`),
        `import { ${className}Service } from "./${name}.service";\n
export class ${className}Controller {
    constructor(
        private service: ${className}Service
    ) {}
}\n`
    );

    console.log(`\x1b[32mModule "${name}" has been created :).\x1b[0m`);
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}