import RegistrableCommand from "../src/registrable-command";
import DiscordBot from "../src/discord-bot";

export default class PingCommand implements RegistrableCommand {

    register(bot: DiscordBot): void {
        bot.addCommand({
            trigger: '!ping', 
            description: 'ping pong',
            onTriggered: (action, args) => {
                action.sendTextReply('pong ' + args.toString());
            }
        });
    }

}