import { Command } from "./command";
import { DiscordBot } from "../bot/discord-bot";

export interface RegistrableCommand {

    register(bot: DiscordBot): Command;

}