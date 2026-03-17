import { App } from "./app";
import { Env } from "./config/Env";
import { Logger } from "./infra/lib/Logger";

async function main() {
    const app = new App({
        port: Env.Global.PORT,
        origins: Env.Global.ORIGINS
    });

    try {
        await app.load();
        app.start();
    } catch (error) {
        Logger.error(error as Error);
        process.exit(1);
    }
}

main();