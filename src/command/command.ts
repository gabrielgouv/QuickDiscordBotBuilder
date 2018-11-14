import { BotAction } from "../bot/bot-action";

export interface Command {

    trigger: string
    description?: string
    onTriggered: (action: BotAction, args: string[]) => void

}