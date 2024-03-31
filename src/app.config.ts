// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const isProd = process.env.NODE_ENV === 'production';
const testBotToken = 'Nzg3NDIzNjAxNTc3MTY0ODAx.GDocKj.1hQ861NxUr-Uofy2Cc99UxIkheUZbTRp1eoACM';

const appConfig = {
    clientId: isProd
        ? '' // Riddler
        : '787423601577164801', // Test Bot
    riddlerServerId: isProd
        ? ''
        : '938599383480561696', // test server
    botToken: process.env.BOT_TOKEN ?? testBotToken
};
export default appConfig;
