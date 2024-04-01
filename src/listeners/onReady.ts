import { ActivityType, Client } from 'discord.js';
import { Listener } from '../types/Listener';

const onReady: Listener = {
    event: 'ready',
    once: true,
    execute: async (client: Client) => {
        if (!client.user || !client.application) return;

        client.user.setPresence({
            status: 'online',
            activities: [{
                name: 'Riddler boi',
                type: ActivityType.Playing
            }]
        });

        console.log(`\x1b[36m${client.user.username} is online\x1b[0m`);

    }
};

export default onReady;
