import { Interaction } from 'discord.js';
import buttons from '../buttons';
import commands from '../commands';
import modals from '../modals';
import { Listener } from '../types/Listener';
import stringSelectMenus from '../stringSelectMenus';
import userSelectMenus from '../userSelectMenus';
import { InteractionReplyable } from '../helpers/InteractionReplyable.helper';

const onInteractionCreate: Listener = {
    event: 'interactionCreate',
    execute: async (interaction: Interaction) => {
        async function errorReply(inter: Interaction, type: string): Promise<void> {
            const interactionReplyable = InteractionReplyable(inter);
            if (!interactionReplyable) return;
            await interactionReplyable.reply({
                ephemeral: true,
                content: `Unknown ${type}`
            });
        }

        if (interaction.isButton()) {
            const button = buttons.find(x => x.id === interaction.customId.split('_')[0]);
            if (!button) {
                await errorReply(interaction, 'Button');
                return;
            }
            await button.handle(interaction);
            return;
        }

        if (interaction.isStringSelectMenu()) {
            const menu = stringSelectMenus.find(x => x.id === interaction.customId.split('_')[0]);
            if (!menu) {
                await errorReply(interaction, 'Menu');
                return;
            }
            await menu.handle(interaction);
            return;
        }

        if (interaction.isUserSelectMenu()) {
            const menu = userSelectMenus.find(x => x.id === interaction.customId.split('_')[0]);
            if (!menu) {
                console.log(`Unknown userSelectMenu: ${interaction.customId}`);
                return;
            }
            await menu.handle(interaction);
            return;
        }

        if (interaction.isModalSubmit()) {
            const modal = modals.find(x => x.id === interaction.customId.split('_')[0]);
            if (!modal) {
                await errorReply(interaction, 'Modal');
                return;
            }
            await modal.handle(interaction);
            return;
        }

        if (!interaction.isCommand()) return;
        const slashCommand = commands.find(x => x.name === interaction.commandName);
        if (!slashCommand) {
            await errorReply(interaction, 'Command');
            return;
        }
        await slashCommand.run(interaction);
    }
};

export default onInteractionCreate;
