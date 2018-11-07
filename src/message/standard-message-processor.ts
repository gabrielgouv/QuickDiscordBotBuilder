import MessageProcessor from "./message-processor";
import DiscordBot from "../discord-bot";
import BotAction from "../bot-action";
import BotCommand from "../bot-command";
import { Message } from "discord.js";

export default class StandardMessageProcessor extends MessageProcessor {

    public constructor(private bot: DiscordBot) {
        super();
    }

    process(message: Message): { trigger: string; args: string[]; } {

        const messageContent = message.content;
        let splittedMessage = messageContent.split(' ');

        console.log(messageContent);

        let trigger = splittedMessage[0];
        let args = splittedMessage.splice(1, splittedMessage.length);

        return { trigger: trigger, args: args }

    }    
    
    findCommand(trigger: string): BotCommand | null {
        return this.bot.findCommand(trigger);
    }
    
}