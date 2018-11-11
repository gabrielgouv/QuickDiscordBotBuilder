import { BotAction } from "../bot/bot-action";
import { Message } from "discord.js";
import { Command } from "../command/command";

export abstract class MessageProcessor {

    public exec(message: Message): void {
        const { trigger, args } = this.process(message);
        const command = this.findCommand(trigger);
        const action = new BotAction(message);
        if (command) {
            command.onTriggered(action, args)
        }
    }

    abstract process(message: Message): { trigger: string, args: string[] };
    abstract findCommand(trigger: string): Command | null;

}