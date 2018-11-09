import { DiscordBot } from "./discord-bot";
import { BotCommand } from "./bot-command";

export interface RegistrableCommand {

    register(bot: DiscordBot): BotCommand;

}