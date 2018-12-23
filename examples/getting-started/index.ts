import { DiscordBot, Command } from "qdbb";

const bot = new DiscordBot('BOT_TOKEN'); // Replace with your Bot token

const sayMyName: Command = {
    trigger: '!saymyname',
    description: '— Heisenberg',
    onTriggered: (action, args) => {
        const messageAuthor = action.getAuthor();
        action.reply(`Hello, ${messageAuthor}`)
    }
}

bot.addCommand(sayMyName);

bot.start();