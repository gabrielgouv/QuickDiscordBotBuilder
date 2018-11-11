import path from 'path';

export const relativePathListFromCwd = (...paths: string[]): string[] => {
    return paths.map((file) => {
        return relativePathFromCwd(file);
    });
}

export const relativePathFromCwd = (p: string): string => {
    return path.relative(process.cwd(), p);
}