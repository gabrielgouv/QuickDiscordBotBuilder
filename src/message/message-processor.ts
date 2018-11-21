import { BotAction } from "../bot/bot-action";
import { Message } from "discord.js";
import { Command } from "../command/command";
import { DiscordBot } from "../bot/discord-bot";

export abstract class MessageProcessor {

    constructor(protected bot: DiscordBot) { }

    public exec(message: Message): void {
        const { trigger, args } = this.process(message);
        const command = this.findCommand(trigger);
        if (command) {
            const action = new BotAction(message, this.bot, command);
            command.onTriggered(action, args)
        }
    }

    abstract process(message: Message): { trigger: string, args: string[] };
    
    findCommand(trigger: string): Command | null {
        if (this.bot) {
            return this.bot.findCommand(trigger);
        }
        return null;
    }

}