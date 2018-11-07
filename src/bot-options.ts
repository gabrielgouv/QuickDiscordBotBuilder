import MessageProcessor from "./message/message-processor";

export default interface BotOptions {

    token: string
    showLogs?: boolean
    messageProcessor?: MessageProcessor

}
