import { IOptions } from "glob";
import glob from "glob";
import Log from "./utils/log";
import { DiscordBot } from "./discord-bot";
import { ReflectionUtils } from "./utils/reflection-utils";

export class CommandScanner {

    private readonly options: IOptions = { ignore: 'dist/**/*' };

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
        file = file.substr(0, file.length - '.ts'.length);

        const pathSplitted = file.split('/').length;
        let goBackDir = '';

        for (let i = 0; i < pathSplitted - 1; i++) {
            goBackDir += '../'
        }
        
        import(`${goBackDir}${file}`).then((object) => {
            const registerReturn = ReflectionUtils.invokeMethod(object);
            this.bot.registerCommand(registerReturn);
        }).catch(error => {
            Log.error(error);
        })
    }

}
