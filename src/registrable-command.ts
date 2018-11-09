import DiscordBot from "./discord-bot";
import BotCommand from "./bot-command";

export default interface RegistrableCommand {

    register(bot: DiscordBot): BotCommand;

}