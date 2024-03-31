import { Awaitable, ClientEvents } from 'discord.js';

export interface Listener {
    event: keyof ClientEvents;
    name?: string;
    once?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    execute: (...args: any[]) => Awaitable<void>;
}
