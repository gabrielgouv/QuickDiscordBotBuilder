import RegistrableCommand from "../src/registrable-command";
import DiscordBot from "../src/discord-bot";
import BotCommand from "../src/bot-command";

export default class PingCommand implements RegistrableCommand {

    register(bot: DiscordBot): BotCommand {
        return {
            trigger: '!ping', 
            description: 'ping pong',
            onTriggered: (action, args) => {
                action.sendTextReply('pong ' + args.toString());
            }
        }
    }

}