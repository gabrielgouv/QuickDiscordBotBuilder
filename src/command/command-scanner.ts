import { IOptions } from "glob";
import { DiscordBot } from "../bot/discord-bot";
import { invokeMethod } from "../utils/reflection-utils";
import Log from "../utils/log";
import * as glob from "glob";
import * as path from "path";

export class CommandScanner {

    private readonly options: IOptions = { ignore: 'dist/**/*', absolute: true };

    public constructor(private pattern: string, private bot: DiscordBot) { }
    
    public scanAndRegister(): void {
        this.scan().forEach(file => {
            this.register(file);
        });
    }

    public scan(): string[] {
        return glob.sync(this.pattern, this.options);
    }

    public register(file: string): void {

        // Removes '.ts' from file name for import
        file = path.relative(__dirname, file);
        file = file.substr(0, file.length - '.ts'.length);

        import(`./${file}`).then((object) => {
            const registerReturn = invokeMethod(object);
            this.bot.registerCommand(registerReturn);
        }).catch(error => {
            Log.error(error);
        })

    }

}
