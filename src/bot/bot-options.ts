import { MessageProcessor } from "../message/message-processor";

export interface BotOptions {

    token: string
    commandScanner?: string
    messageProcessor?: MessageProcessor

}
