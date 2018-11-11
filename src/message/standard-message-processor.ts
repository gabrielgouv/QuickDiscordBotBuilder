import { MessageProcessor } from "./message-processor";
import { DiscordBot } from "../bot/discord-bot";
import { Command } from "../command/command";
import { Message } from "discord.js";

export class StandardMessageProcessor extends MessageProcessor {

    public constructor(private bot: DiscordBot) {
        super();
    }

    process(message: Message): { trigger: string; args: string[]; } {

        const messageContent = message.content;
        const splittedMessage = messageContent.split(' ');
        const trigger = splittedMessage[0];
        const args = splittedMessage.splice(1, splittedMessage.length);

        return { trigger: trigger, args: args }

    }    
    
    findCommand(trigger: string): Command | null {
        return this.bot.findCommand(trigger);
    }
    
}