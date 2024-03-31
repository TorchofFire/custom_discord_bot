import { GuildMember } from 'discord.js';
import { Listener } from '../types/Listener';

const onGuildMemberRemove: Listener = {
    event: 'guildMemberRemove',
    execute: async (member: GuildMember) => {
        // nothing implemented yet
    }
};

export default onGuildMemberRemove;
