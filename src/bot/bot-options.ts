import { MessageProcessor } from "../message/message-processor";

export interface BotOptions {

    token: string
    commandFilePattern?: string
    messageProcessor?: MessageProcessor

}
