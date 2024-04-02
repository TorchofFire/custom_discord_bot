import 'dotenv/config';

const appConfig = {
    secureProtocol: process.env.SECURE_PROTOCOL === 'true',
    certPath: process.env.SSL_PATH,
    botToken: process.env.BOT_TOKEN,
    appPort: Number(process.env.APP_PORT || 8079)
};

export default appConfig;
