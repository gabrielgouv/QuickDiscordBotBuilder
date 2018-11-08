export default class StringUtils {

    public static setBashColor(colorValue: number, string: string) {
        return `\u001b[${colorValue}m${string}\u001b[39m`;
    }

}