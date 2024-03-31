import { StringSelectMenuBuilder, StringSelectMenuInteraction } from 'discord.js';

export interface StringSelectMenu {
    id: string;
    menu: (string?: string, arrayStringKeyValuePair?: {key: string; value: string}[]) => StringSelectMenuBuilder;
    handle: (interaction: StringSelectMenuInteraction) => Promise<void>;
}
