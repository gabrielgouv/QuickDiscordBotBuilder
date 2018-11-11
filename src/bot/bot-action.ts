import { ImageResponseModel, FileResponseModel } from './bot-action';
import { DiscordBot } from './discord-bot';
import { Message, Attachment, Client } from "discord.js";
import { Command } from '../command/command';
import { relativePathFromCwd, relativePathListFromCwd } from '../utils/file-utils';
import fs from 'fs';
import Log from '../utils/log';

export interface ImageResponseModel {
    message: string;
    imagePath: string[];
}

export interface FileResponseModel {
    message: string;
    fileName: string;
    filePath: string;
}

export class BotAction {

    public constructor(private message: Message, private bot: DiscordBot, private command: Command) {
        Log.info(`Command '${command.trigger}' triggered by ${message.author.id}`);
    }

    public getMessage(): Message {
        return this.message;
    }

    public getDiscordBot(): DiscordBot {
        return this.bot;
    }

    public getClient(): Client {
        return this.bot.getClient();
    }

    public getAuthor(): string {
        return this.message.author.toString();
    }

    public reply(message: string): void
    public reply(imageReply: ImageResponseModel): void
    public reply(fileReply: FileResponseModel): void
    public reply(arg0: any): void {
        
        if (typeof arg0 === 'string') {
            this.sendText(arg0);
        } else if (arg0['imagePath']) {
            this.sendImage(arg0.message, arg0.imagePath);
        } else if (arg0['fileName'] && arg0['filePath']) {
            this.sendFile(arg0.message, arg0.fileName, arg0.filePath);
        }

    }

    private sendText(message: string): void {
        this.message.channel.send(message).catch(error => {
            Log.error(`[${this.command.trigger}][sendText]: ${error}`);
        });
    }

    private sendImage(message: string, ...files: string[]): void {
        files = relativePathListFromCwd(...files);
        this.message.channel.send(message, {files: files}).catch(error => {
            Log.error(`[${this.command.trigger}][sendImage]: ${error}`);
        });
    }

    private sendFile(message: string, fileName: string, filePath: string): void {
        filePath = relativePathFromCwd(filePath);
        fs.readFile(filePath, (error, file) => {

            if (error) {
                Log.error(`[${this.command.trigger}][sendFile]: ${error}`);
                return;
            }

            const attachment = new Attachment(file, fileName);
            this.message.channel.send(message, attachment).catch(error => {
                Log.error(`[${this.command.trigger}][sendFile]: ${error}`);
            });

        });
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