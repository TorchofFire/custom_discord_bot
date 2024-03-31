import { GuildMember } from 'discord.js';
import { Listener } from '../types/Listener';

const onGuildMemberAdd: Listener = {
    event: 'guildMemberAdd',
    execute: async (member: GuildMember) => {
        // nothing implemented yet
    }
};

export default onGuildMemberAdd;
