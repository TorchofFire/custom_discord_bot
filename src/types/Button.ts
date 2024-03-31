import { ButtonBuilder, ButtonInteraction } from 'discord.js';

export interface Button {
    id: string;
    button: (customId?: string) => ButtonBuilder;
    handle: (interaction: ButtonInteraction) => Promise<void>;
}
