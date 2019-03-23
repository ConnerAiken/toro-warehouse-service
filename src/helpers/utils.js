export default {
    log(msg, type = 0) {
        if(type === 1) {
            console.warn(`[${process.env.APP_NAME}] ${msg}`);
        }else if(type === 2) {
            console.error(`[${process.env.APP_NAME}] ${msg}`);
        }else {
            console.log(`[${process.env.APP_NAME}] ${msg}`);
        }
    },
    loadENV() {
        const defaultConfig = dotenv.config({
            path: path.resolve(process.cwd(), '.env.default')
        });
        const config = dotenv.config(); 

        if (config.error && !defaultConfig.error) {
            this.log("Could not find .env file, using default env file..");
        }else if(config.error && defaultConfig.error) {
            this.log("Could not find any .env files, please set one up!", 1);
        }
    }
}