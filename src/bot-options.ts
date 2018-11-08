import MessageProcessor from "./message/message-processor";

export default interface BotOptions {

    token: string
    commandsDirectory?: string
    messageProcessor?: MessageProcessor

}
