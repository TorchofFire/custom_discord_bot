export const tripbacktick = (string: string): string => {
    return `\`\`\`${string}\`\`\``;
};

export const codeblockset = (string: string | null): string => {
    return tripbacktick(string ?? 'diff\n- Unset');
};

export const emptyString = (): string => {
    return '\u200b'; // 0 width whitespace acceptable by discord
};
