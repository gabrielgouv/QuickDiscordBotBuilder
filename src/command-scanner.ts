import { IOptions } from "glob";
import glob from "glob";
import Log from "./utils/log";
import DiscordBot from "./discord-bot";
import ReflectionUtils from "./utils/reflection-utils";

export default class CommandScanner {

    private readonly options: IOptions = { ignore: 'dist/**/*' };

    public constructor(private pattern: string, private bot: DiscordBot) { }

    public scan(): string[] {
        return glob.sync(this.pattern, this.options);
    }

    public scanAndRegister(): void {
        this.scan().forEach(file => {
            this.register(file);
        });
    }

    public register(file: string): void {
        // Removes '.ts' from file name for import
        file = file.substr(0, file.length - '.ts'.length);

        import(`../${file}`).then((object) => {
            const registerReturn = ReflectionUtils.invokeMethod(object);
            this.bot.registerCommand(registerReturn);
        }).catch(error => {
            Log.error(error);
        })
    }

}
