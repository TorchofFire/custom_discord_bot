import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from '@discordjs/builders';
import { CommandInteraction, ChatInputApplicationCommandData } from 'discord.js';

export interface Command extends ChatInputApplicationCommandData {
    run: (interaction: CommandInteraction) => Promise<void>;
    slashCommandBuilder: Partial<SlashCommandBuilder>;
}

export interface SubCommand extends ChatInputApplicationCommandData {
    run: (interaction: CommandInteraction) => Promise<void>;
    slashCommandBuilder: SlashCommandSubcommandBuilder;
}
