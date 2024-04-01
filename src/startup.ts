import { Client, IntentsBitField } from 'discord.js';
import path from 'path';
import fs from 'fs';
import appConfig from './app.config';
import { Listener } from './types/Listener';
import express, { Router } from 'express';

// eslint-disable-next-line import/no-mutable-exports
export let discordClient: Client;
export const expressApp = express();
const port = 8079;

const registerExpressRoutes = async (): Promise<void> => {
    const routesPath = path.join(__dirname, 'routes');
    const routes = fs.readdirSync(routesPath);
    console.log('\x1b[90mLoading routes...');
    process.stdout.write('|');
    await Promise.all(routes.map(async (route: string) => {
        const routeFile = path.join(routesPath, route);

        const { default: config } = await import(routeFile);
        const routeConfig = config as Router;

        expressApp.use(route);
        process.stdout.write(` ${routeConfig.name} |`);
    }));
    console.log('\x1b[0m');
    console.log(`Loaded ${routes.length} Routes`);
};

const registerDiscordListeners = async (client: Client): Promise<void> => {
    const listenersPath = path.join(__dirname, 'listeners');
    const listeners = fs.readdirSync(listenersPath);
    console.log('\x1b[90mLoading listeners...');
    process.stdout.write('|');
    await Promise.all(listeners.map(async (listener: string) => {
        const listenerFile = path.join(listenersPath, listener);

        const { default: config } = await import(listenerFile);
        const listenerConfig = config as Listener;

        if (listenerConfig.once) {
            client.once(listenerConfig.event, listenerConfig.execute);
        } else {
            client.on(listenerConfig.event, listenerConfig.execute);
        }
        process.stdout.write(` ${listenerConfig.event} |`);
    }));
    console.log('\x1b[0m');
    console.log(`Loaded ${listeners.length} Listeners`);
};

export const startup = async (): Promise<void> => {
    console.log('Bot is starting...');

    discordClient = new Client({
        intents: [
            IntentsBitField.Flags.GuildVoiceStates,
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent
        ]
    });

    await registerDiscordListeners(discordClient);

    await discordClient.login(appConfig.botToken);

    process.on('unhandledRejection', error => console.error(`Unhandled promise rejection: ${error}`));
    discordClient.on('rateLimit', info => console.log(`Rate limit hit ${info ? JSON.stringify(info) : 'Unknown timeout'}`));

    console.log('Express is starting...');

    await registerExpressRoutes();

    expressApp.listen(port, () => {
        console.log(`\x1b[36mExpress is online and listening on port \x1b[33m${port}\x1b[0m`);
    });
};
