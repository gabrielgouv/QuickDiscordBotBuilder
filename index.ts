import DiscordBot from "./src/discord-bot";
import BotOptions from "./src/bot-options";

const options: BotOptions = {
    token: 'NTA4MTA1OTIyNzIwMDM4OTM0.DsVeMA.ClicNWBao-GBpZciBrUYvjqDAkA',
    commandFilePattern: 'commands/*.command.ts'
}

new DiscordBot(options).start();
