import { Client } from "discord.js";
import BotOptions from "./bot-options";
import BotCommand from "./bot-command";
import RegistrableCommand from "./registrable-command";
import MessageProcessor from "./message/message-processor";
import StandardMessageProcessor from "./message/standard-message-processor";
import Log from "./utils/log"
import StringUtils from "./utils/string-utils";
import CommandScanner from "./command-scanner";


export default class DiscordBot {

    private messageProcessor: MessageProcessor;
    private options: BotOptions;
    private client: Client;
    private commands: BotCommand[]
    private skippedCommands: number;

    public constructor(token: string)
    public constructor(options: BotOptions) 
    public constructor(value: any) {
        this.messageProcessor = new StandardMessageProcessor(this);

        if (typeof value === 'string') {
            this.options = { token: value }
            if (this.options.messageProcessor) 
                this.messageProcessor = this.options.messageProcessor;
        } else {
            this.options = value;
        }
        
        this.client = new Client();
        this.commands = [];
        this.skippedCommands = 0;
    }

    public addCommand(command: BotCommand): void {
        if (this.findCommand(command.trigger)) {
            Log.warn(`[${StringUtils.setBashColor(33, 'SKIPPED')}] A command with '${StringUtils.setBashColor(90, command.trigger)}' trigger has already been added.`);
            this.skippedCommands++;
            return;
        }

        this.commands.push(command);
        Log.info(`[${StringUtils.setBashColor(32, ' ADDED ')}] Added '${StringUtils.setBashColor(90, command.trigger)}' command in commands list.`);
    }

    public registerCommand(registrableCommand: RegistrableCommand): void {
        const command = registrableCommand.register(this);
        this.addCommand(command);
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
        this.scanAndRegisterCommands();

        this.client.on('ready', () => {
            Log.info(StringUtils.setBashColor(32, `Started successfully with ${this.commands.length} command(s) loaded and ${this.skippedCommands} skipped.`));
            this.setUpChatMessageListener();
        })

        this.client.login(this.options.token).catch(console.log);
    }

    private setUpChatMessageListener(): void {
        this.client.on('message', message => {
            this.messageProcessor.exec(message);
        });
    }

    private scanAndRegisterCommands(): void {
        const commandFilePattern = this.options.commandFilePattern;
        if (commandFilePattern) {
            new CommandScanner(commandFilePattern, this).scanAndRegister();
        }
    }

}