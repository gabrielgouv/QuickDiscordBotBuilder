import MessageProcessor from "./message/message-processor";

export default interface BotOptions {

    token: string
    commandFilePattern?: string
    messageProcessor?: MessageProcessor

}
