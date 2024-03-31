import { BaseInteraction, ButtonInteraction, CommandInteraction, Interaction, ModalSubmitInteraction, StringSelectMenuInteraction, UserSelectMenuInteraction } from 'discord.js';

export const InteractionReplyable = (interaction: Interaction | BaseInteraction): ButtonInteraction | StringSelectMenuInteraction | ModalSubmitInteraction | CommandInteraction | UserSelectMenuInteraction | never => {
    if (interaction.isButton()) {
        return interaction as ButtonInteraction;
    }
    if (interaction.isStringSelectMenu()) {
        return interaction as StringSelectMenuInteraction;
    }
    if (interaction.isModalSubmit()) {
        return interaction as ModalSubmitInteraction;
    }
    if (interaction.isCommand()) {
        return interaction as CommandInteraction;
    }
    if (interaction.isUserSelectMenu()) {
        return interaction as UserSelectMenuInteraction;
    }
    console.log(interaction);
    throw new Error('You did an oopsie. This interaction isn\'t a Button, StringMenu, UserContextMenu, ModalSubmit, or Command');
};
