import { App } from "./app";
import { Env } from "./config/Env";

async function main() {
    const APP = new App({
        port: Env.Global.PORT,
        origins: Env.Global.ORIGINS
    });

    await APP.Init();
}

main();