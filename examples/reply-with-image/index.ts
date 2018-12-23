import { ImageResponseModel, DiscordBot, Command } from "qdbb";

const bot = new DiscordBot('BOT_TOKEN'); // Replace with your Bot token

const imageReply: Command = {
    trigger: '!pug',
    onTriggered: (action) => {

        const imageReply: ImageResponseModel = {
            message: 'Pug',
            imagePath: 'examples/reply-with-image/pug.jpg' // Project relative path
        }

        action.reply(imageReply);
    }
}

bot.addCommand(imageReply);

bot.start();
