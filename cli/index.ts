import { Command } from "commander";
import { makeModule } from "./make";

const program = new Command();

program
    .command("make:module <name>")
    .description("Create a new module")
    .action(makeModule);

program.parse(process.argv);