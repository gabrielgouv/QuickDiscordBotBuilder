import { MessageProcessor } from "./message-processor";
import { DiscordBot } from "../bot/discord-bot";
import { BotCommand } from "../command/bot-command";
import { Message } from "discord.js";

export class StandardMessageProcessor extends MessageProcessor {

    public constructor(private bot: DiscordBot) {
        super();
    }

    process(message: Message): { trigger: string; args: string[]; } {

        const messageContent = message.content;

        let splittedMessage = messageContent.split(' ');

        let trigger = splittedMessage[0];
        let args = splittedMessage.splice(1, splittedMessage.length);

        return { trigger: trigger, args: args }

    }    
    
    findCommand(trigger: string): BotCommand | null {
        return this.bot.findCommand(trigger);
    }
    
}