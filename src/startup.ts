import { Client, IntentsBitField } from 'discord.js';
import path from 'path';
import fs from 'fs';
import appConfig from './app.config';
import { Listener } from './types/Listener';

// eslint-disable-next-line import/no-mutable-exports
export let discordClient: Client;

const registerDiscordListeners = async (client: Client): Promise<void> => {
    const listenersPath = path.join(__dirname, 'listeners');
    const listeners = fs.readdirSync(listenersPath);
    let listenerCount = 0;
    await Promise.all(listeners.map(async (listener: string) => {
        const listenerFile = path.join(listenersPath, listener);

        const { default: config } = await import(listenerFile);
        const listenerConfig = config as Listener;

        if (listenerConfig.once) {
            client.once(listenerConfig.event, listenerConfig.execute);
        } else {
            client.on(listenerConfig.event, listenerConfig.execute);
        }

        process.stdout.write(`\r${' '.repeat(50)}\rLoaded listener ${listenerConfig.name || listenerConfig.event}`);
        listenerCount++;
    }));
    process.stdout.write(`\r${' '.repeat(50)}\rLoaded ${listenerCount} Listeners`);
    console.log();
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

};
