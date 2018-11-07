import DiscordBot from "./src/discord-bot";
import BotOptions from "./src/bot-options";

const options: BotOptions = {
    token: '<YOUR TOKEN>',
    showLogs: true
}

let bot = new DiscordBot(options);

bot.addCommand({
    trigger: '!ping', 
    description: 'ping pong',
    onTriggered: (action, args) => {
        action.sendTextReply('pong ' + args.toString());
    }
});

bot.start();