import { Message, Attachment } from "discord.js";
import fs from 'fs';

export default class BotAction {

    private message: Message;

    public constructor(message: Message) {
        this.message = message;
    }

    public getMessage(): Message {
        return this.message;
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