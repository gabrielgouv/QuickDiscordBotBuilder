import { Client } from "discord.js";
import BotOptions from "./bot-options";
import BotCommand from "./bot-command";
import RegistrableCommand from "./registrable-command";
import MessageProcessor from "./message/message-processor";
import StandardMessageProcessor from "./message/standard-message-processor";
import fs from "fs";
import path from "path"
import Log from "./utils/log"
import StringUtils from "./utils/string-utils";


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
        registrableCommand.register(this);
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
        
        this.loadCommandsFromCommandsFolder();

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

    // TODO: criar um file visitor
    private loadCommandsFromCommandsFolder(): void {

        const directory = this.options.commandsDirectory;

        if (directory) {

            const relativePath = '../' +  path.relative(process.cwd(), directory);
            const dirFiles = fs.readdirSync(directory);

            dirFiles.forEach(file => {

                // TODO: Refactor
                file = file.substr(0, file.length - 3);

                import(`${relativePath + '/' + file}`).then((a) => {
                    a.default.prototype.register(this);
                }).catch(err => {
                    Log.error(err);
                })

            })

        }
  
    }

}