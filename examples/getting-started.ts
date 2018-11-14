import { DiscordBot } from "qdbb";

const bot = new DiscordBot('YOUR_BOT_TOKEN'); // Replace with your token

bot.addCommand({
    trigger: '!saymyname',
    description: '— Heisenberg',
    onTriggered: (action) => {
        const messageAuthor = action.getAuthor();
        action.reply(`Hello, ${messageAuthor}`)
    }
});

bot.start();