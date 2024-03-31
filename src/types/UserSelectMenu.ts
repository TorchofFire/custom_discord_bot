import { UserSelectMenuBuilder, UserSelectMenuInteraction } from 'discord.js';

export interface UserSelectMenu {
    id: string;
    menu: (customId?: string) => UserSelectMenuBuilder;
    handle: (interaction: UserSelectMenuInteraction) => Promise<void>;
}
