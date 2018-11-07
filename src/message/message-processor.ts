import BotAction from "../bot-action";
import { Message } from "discord.js";
import DiscordBot from "../discord-bot";
import BotCommand from "../bot-command";

export default abstract class MessageProcessor {

    public exec(message: Message, bot: DiscordBot): void {
        const { trigger, args } = this.process(message);
        const command = this.findCommand(trigger);
        const action = new BotAction(message, bot);
        if (command) {
            command.onTriggered(action, args)
        }
    }

    abstract process(message: Message): { trigger: string, args: string[] };
    abstract findCommand(trigger: string): BotCommand | null;

}