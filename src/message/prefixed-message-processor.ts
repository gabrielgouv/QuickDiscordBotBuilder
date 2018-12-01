import { MessageProcessor } from "./message-processor";
import { DiscordBot } from "../bot/discord-bot";
import { Message } from "discord.js";

export class PrefixedMessageProcessor extends MessageProcessor {

    public constructor(protected bot: DiscordBot, private prefix: string) {
        super(bot);
    }

    public process(message: Message): { trigger: string; args: string[]; } {

        const messageContent = message.content;

        let splittedMessage = messageContent.split(' ');

        let trigger : string = '';
        let args : string[] = [];

        if(splittedMessage[0] === this.prefix){
            trigger = splittedMessage[1];
            args = splittedMessage.splice(2, splittedMessage.length);
        }

        return { trigger: trigger, args: args }

    }    
    
}