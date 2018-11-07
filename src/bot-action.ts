import { Message, Attachment } from "discord.js";
import fs from 'fs';
import DiscordBot from "./discord-bot";
import BotCommand from "./bot-command";

export default class BotAction {

    private message: Message;
    private bot: DiscordBot;

    public constructor(message: Message, bot: DiscordBot) {
        this.message = message;
        this.bot = bot;
    }

    public getMessage(): Message {
        return this.message;
    }

    public getDiscordBot(): DiscordBot {
        return this.bot;
    }

    public getUserName(): string {
        return this.message.author.toString();
    }

    public sendTextReply(message: string): void {
        this.message.channel.send(message);
    }

    public sendImageReply(message: string, ...files: string[]): void {
        this.message.channel.send(message, {files: files});
    }

    public sendFileReply(fileName: string, filePath: string): void {
        const buffer = fs.readFileSync(filePath);
        const attachment = new Attachment(buffer, fileName);
        this.message.channel.send('', attachment);
    }

    public playAudio(file: string, leaveChannelWhenFinished?: boolean): void{
        let voiceChannel = this.message.member.voiceChannel;
        if (voiceChannel) {
            voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile(file);
                dispatcher.on('end', end => {
                    if (leaveChannelWhenFinished) 
                        voiceChannel.leave();
                });
            }).catch(err => {
                console.log(err)
                if (leaveChannelWhenFinished) 
                        voiceChannel.leave();
            });
        }
    }

}