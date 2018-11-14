<p align="center">
    <img src="https://raw.githubusercontent.com/gabrielgouv/QuickDiscordBotBuilder/master/qdbb-header.png" alt="Header">
</p>
<a href="https://nodei.co/npm/qdbb/"><img src="https://nodei.co/npm/qdbb.png"></a>
<br>
<a href="https://travis-ci.org/gabrielgouv/QuickDiscordBotBuilder"><img src="https://travis-ci.org/gabrielgouv/QuickDiscordBotBuilder.svg?branch=master" alt="TravisCI"></a>
<a href="https://david-dm.org/gabrielgouv/QuickDiscordBotBuilder" title="dependencies status"><img src="https://david-dm.org/gabrielgouv/QuickDiscordBotBuilder/status.svg"/></a>
<a href="https://codebeat.co/projects/github-com-gabrielgouv-quickdiscordbotbuilder-master"><img alt="codebeat badge" src="https://codebeat.co/badges/d7fb7509-513e-4b3a-a552-79ae80b3a551" /></a>
<a class="badge-align" href="https://www.codacy.com/app/GabrielGouv/QuickDiscordBotBuilder?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gabrielgouv/QuickDiscordBotBuilder&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/9f2a43fc09b34bf590a1fc042986b3ce"/></a>
<br><br>

Quick Discord Bot Builder (QDBB) is a wrapper for [discord.js](https://github.com/discordjs/discord.js/) that simplifies and speed up much more Discord Bot creation.

**Note: This project is under development and all versions under 0.X.X can be a break change.**

## Quickstart

**This is a quick explanation for anyone who already has basic knowledge on NodeJS and TypeScript. If you need a more detailed explanation [click here](https://github.com/gabrielgouv/QuickDiscordBotBuilder/wiki/Getting-Started).**

1. Register a new Bot Application in Discord Developer Portal. [Click here](https://github.com/gabrielgouv/QuickDiscordBotBuilder/wiki/Registering-a-Discord-Bot-in-developer-portal) to learn how to register.
2. Install the module dependency:
```bash
npm install qdbb
```

3. Replace ```YOUR_BOT_TOKEN``` below with your generated Bot token in Discord Developer Portal.

```typescript
import { DiscordBot } from "qdbb";

const bot = new DiscordBot('YOUR_BOT_TOKEN');

bot.addCommand({
    trigger: '!saymyname',
    description: '— Heisenberg',
    onTriggered: (action) => {
        const messageAuthor = action.getAuthor();
        action.reply(`Hello, ${messageAuthor}`)
    }
});

bot.start();
```

4. **Done!** Run your code. Remember to [invite your Bot](https://github.com/gabrielgouv/QuickDiscordBotBuilder/wiki/Registering-a-Discord-Bot-in-developer-portal#inviting-your-bot) to your server :).

## Thanks
[Antonio Neto (aacgn)](https://github.com/aacgn)

## License
```
MIT License

Copyright (c) 2018 João Gabriel Gouveia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
