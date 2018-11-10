![Quick Discord Bot Builder Logo](https://i.imgur.com/MUiMiKb.png)

**Note: This documentation is still being written and will soon be translated to english.**</br>
**Aviso: Esta documentação ainda está sendo redigida e em breve será traduzida para o inglês.**

Quick Discord Bot Builder (QDBB) é um "wrapper" do [discord.js](https://github.com/discordjs/discord.js/) que simplifica e acelera ainda mais a criação de bots para o Discord.

## Começando
Estas instruções irão lhe guiar desde a instalação, criação do seu primeiro comando e execução do seu bot.

### Pré-requisitos
#### Registro
O primeiro passo é realizar o registro do seu bot no [Portal do desenvolvedor do Discord](https://discordapp.com/login?redirect_to=%2Fdevelopers). Faça o login com seu e-mail e senha do Discord para ter acesso.

Clique aqui (WIP) para ver a explicação detalhada de registro.

#### FFmpeg
Para que o bot consiga reproduzir áudios nos canais de voz do Discord é necessário ter instalado em sua máquina o [FFmpeg](https://www.ffmpeg.org/).

Instalação no Linux (Ubuntu):
```bash
sudo apt-get install ffmpeg
```

Instalação no Windows:
(WIP)

### Criando um bot
Adicione a biblioteca ao projeto:
```bash
npm install qdbb
```

Agora, com tudo instalado e o token gerado, podemos criar o nosso primeiro bot:

```typescript
let bot = new DiscordBot('BOT_TOKEN');

bot.addCommand({
    trigger: '!meunome',
    description: 'Responde com o seu nome',
    onTriggered: (action) => {
        const username = action.getUserName();
        action.sendTextReply(`Olá ${username}`);
    }
});

bot.start();
```

Se tudo der certo o seu comando será criado e o seu bot inicializado:

```
[Sat, 10 Nov 2018 07:12:06 GMT | info]     [ ADDED ] Added '!meunome' command in commands list.
[Sat, 10 Nov 2018 07:12:07 GMT | info]     Started successfully with 1 command(s) loaded and 0 skipped.
```

**Pronto!** Simples e rápido :D

#### Entendendo o código
O código acima é extremamente simples e bem autoexplicativo. Perceba que basicamente criamos um bot e adicionamos um comando com as seguintes propriedades:

```trigger```: Nome do comando e gatilho de execução. Quando for digitado no chat, o comando será executado;</br>
```description```: Descrição do comando, pode ser útil caso você queira criar um comando de ajuda :);</br>
```onTriggered```: Recebe uma função que é executada no momento em que o gatilho for ativado.

O objeto ```action``` no código acima é do tipo ```BotAction``` que é responsável por encapsular o objeto ```Message``` do discord.js. Além disso, possui métodos para obter informações e enviar respostas.

Com isso você está apto a criar diversos outros comandos. Leia a documentação mais detalhada aqui (WIP).
