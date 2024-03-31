import { Message } from 'discord.js';
import { Listener } from '../types/Listener';

const onMessage: Listener = {
    event: 'messageCreate',
    execute: async (message: Message) => {
        if (!message.member || message.member.user.bot) return;
        // nothing implemented yet
    }
};

export default onMessage;
