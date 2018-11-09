import DiscordBot from "./src/discord-bot";
import BotOptions from "./src/bot-options";

const options: BotOptions = {
    token: '<YOUR_TOKEN>',
    commandFilePattern: 'commands/*.command.ts'
}

new DiscordBot(options).start();
