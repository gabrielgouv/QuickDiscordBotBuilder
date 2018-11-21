import { Client } from "discord.js";
import { BotOptions } from "./bot-options";
import { Command } from "../command/command";
import { RegistrableCommand } from "../command/registrable-command";
import { MessageProcessor } from "../message/message-processor";
import { StandardMessageProcessor } from "../message/standard-message-processor";
import { CommandScanner } from "../command/command-scanner";
import Log from "../utils/log"

export class DiscordBot {

    private messageProcessor: MessageProcessor;
    private options: BotOptions;
    private client: Client;
    private commands: Command[]
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

    public addCommand(command: Command): void {
        if (this.findCommand(command.trigger)) {
            Log.warn(`[SKIPPED] A command with '${command.trigger}' trigger has already been added.`);
            this.skippedCommands++;
            return;
        }

        this.commands.push(command);
        Log.info(`[ ADDED ] Added '${command.trigger}' command in commands list.`);
    }

    public registerCommand(registrableCommand: RegistrableCommand): void {
        const command = registrableCommand.register(this);
        this.addCommand(command);
    }

    public findCommand(value: string): Command | null {
        let commandFound = null;
        this.commands.forEach(command => {
            if (command.trigger === value) {
                commandFound = command;
            }
        });
        return commandFound;
    }

    public getCommands(): Command[] {
        return this.commands;
    }

    public getClient(): Client {
        return this.client;
    }

    public setMessageProcessor(messageProcessor: MessageProcessor): void {
        this.messageProcessor = messageProcessor;
    }

    public start(): void {

        this.scanAndRegisterCommands();

        this.client.on('ready', () => {
            const botUsername = this.client.user.username;
            Log.info(`Started ${botUsername} with ${this.commands.length} command(s) loaded and ${this.skippedCommands} skipped.`);
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
