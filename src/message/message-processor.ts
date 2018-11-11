import { BotAction } from "../bot/bot-action";
import { Message } from "discord.js";
import { Command } from "../command/command";
import { DiscordBot } from "../bot/discord-bot";

export abstract class MessageProcessor {

    public exec(message: Message, bot: DiscordBot): void {
        const { trigger, args } = this.process(message);
        const command = this.findCommand(trigger);
        if (command) {
            const action = new BotAction(message, bot, command);
            command.onTriggered(action, args)
        }
    }

    abstract process(message: Message): { trigger: string, args: string[] };
    abstract findCommand(trigger: string): Command | null;

}