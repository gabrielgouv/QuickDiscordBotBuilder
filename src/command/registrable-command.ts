import { BotCommand } from "./bot-command";
import { DiscordBot } from "../bot/discord-bot";

export interface RegistrableCommand {

    register(bot: DiscordBot): BotCommand;

}