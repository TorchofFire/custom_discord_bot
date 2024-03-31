import { GuildMember } from 'discord.js';
import { Listener } from '../types/Listener';

const onGuildMemberUpdate: Listener = {
    event: 'guildMemberUpdate',
    execute: async (oldMember: GuildMember, member: GuildMember) => {
        // nothing implemented yet
    }
};

export default onGuildMemberUpdate;
