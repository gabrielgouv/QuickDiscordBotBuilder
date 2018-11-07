import DiscordBot from "./discord-bot";

export default interface RegistrableCommand {

    register(bot: DiscordBot): void;

}