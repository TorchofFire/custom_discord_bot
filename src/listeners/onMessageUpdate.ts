import { Message } from 'discord.js';
import { Listener } from '../types/Listener';

const onGuildMemberAdd: Listener = {
    event: 'messageUpdate',
    execute: async (oldMessage: Message, newMessage: Message) => {
        if (oldMessage.content === newMessage.content) return;
        // nothing implemented yet
    }
};

export default onGuildMemberAdd;
