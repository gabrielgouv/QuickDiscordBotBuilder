import { Client } from "discord.js";
import BotOptions from "./bot-options";
import BotCommand from "./bot-command";
import RegistrableCommand from "./registrable-command";
import MessageProcessor from "./message/message-processor";
import StandardMessageProcessor from "./message/standard-message-processor";

export default class DiscordBot {

    public static readonly DEFAULT_PREFIX = '!'

    private messageProcessor: MessageProcessor;
    private options: BotOptions;
    private client: Client;
    private commands: BotCommand[]

    public constructor(token: string)
    public constructor(options: BotOptions) 
    public constructor(value: any) {

        this.messageProcessor = new StandardMessageProcessor(this);

        if (typeof value === 'string') {
            this.options = { token: value }
            if (this.options.messageProcessor) {
                this.messageProcessor = this.options.messageProcessor;
            }
        } else {
            this.options = value;
        }
        
        this.client = new Client();
        this.commands = [];
    
    }

    public addCommand(command: BotCommand): void {
        this.commands.push(command);
    }

    public registerCommand(registrableCommand: RegistrableCommand): void {
        registrableCommand.register(this);
    }

    public showLogs(showLogs: boolean): void {
        this.options.showLogs = showLogs;
    }

    public findCommand(value: string): BotCommand | null {
        let commandFound = null;
        this.commands.forEach(command => {
            if (command.trigger === value) {
                commandFound = command;
            }
        });
        return commandFound;
    }

    public start(): void {
        console.log(`Starting...`);
        this.client.on('ready', () => {
            console.log(`Started successfully with ${this.commands.length} command(s) loaded.`);
            this.setUpChatMessageListener();
        })
        this.client.login(this.options.token).catch(console.log);
    }

    private setUpChatMessageListener(): void {
        this.client.on('message', message => {
            this.messageProcessor.exec(message);
        });
    }

}