import DiscordBot from "./src/discord-bot";
import BotOptions from "./src/bot-options";

const options: BotOptions = {
    token: 'NTA4MTA1OTIyNzIwMDM4OTM0.DsQQEQ.-1cfwP0W7OW0ubgzxXvyUgVLnJ4',
    commandsDirectory: './commands'
}

new DiscordBot(options).start();
