import { ModalBuilder, ModalSubmitInteraction } from 'discord.js';

export interface Modal {
    id: string;
    modal: (arg?:string) => ModalBuilder;
    handle: (interaction: ModalSubmitInteraction) => Promise<void>;
}
