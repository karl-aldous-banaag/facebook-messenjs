import { EventEmitter } from "node:events";

export interface ClientOptions {
    pageToken: string;
    verifyToken: string;
    appSecret: string;
    validation?: boolean;
    route?: string;
}

export class Profile {
    public constructor(client: Client, id: string);

    public client: Client;
    public id: string;

    public deletePersistentMenu(): void;
    public getJSON(): object;
    public getPersistentMenu(): Promise<any>;
    public getPersonalInfo(fields: string[]): Promise<Profile>;
    public send(options: string | any, quickReplies?: any[]): Promise<Message>;
    public setPersistentMenu(buttons: any[]): Promise<any>;
}

export class Message {
    public constructor(client: Client, payload?: object);

    public client: Client;
    public raw: object;
    public sender: Profile;
    public recipient: Profile;
    public timestamp: Date;
    public isEcho: boolean;
    public id: string;
    public text: string;
    public quickReplies: any[];
    public payload?: string;
}

export class Action {
    public constructor(client: Client, payload: object, timestamp: Date);
    
    public client: Client;
    public raw: object;
    public timestamp: Date;
}

export class Verify {
    public constructor(client: Client, success: boolean, timestamp?: Date);
    
    public client: Client;
    public success: boolean;
    public timestamp: Date;
}

export class MessageDelivery extends Action {
    public constructor(client: Client, raw: object);

    public sender: Profile;
    public recipient: Profile;
    public message: Message;
    public watermark: number;
}

export class Postback extends Action {
    public constructor(client: Client, raw: object);

    public sender: Profile;
    public recipient: Profile;
    public message: Message;
    public payload: string;
}

export class Reaction extends Action {
    public constructor(client: Client, raw: object);

    public sender: Profile;
    public recipient: Profile;
    public message: Message;
    public action: any;
    public emoji: any;
    public reaction: any;
}

export interface ClientEvents {
    webhookVerify: [verifyEvent: Verify];
    messageDelivery: [messageDelivery: MessageDelivery];
    messages: [message: Message];
    messagingPostback: [postback: Postback];
    messageReaction: [reaction: Reaction]
}

export class MessageManager {
    public constructor(client: Client);

    public client: Client;
    public cache: any;

    public fetch(idOrPayload: string | object): Promise<Profile>;
}

export class ProfileManager {
    public constructor(client: Client);

    public client: Client;
    public cache: any;

    public fetch(id: string, returnType?: string): Promise<Profile> | Profile;
}

export class Client extends EventEmitter {
    public constructor(options: ClientOptions);

    public messageManager: MessageManager;
    public profileManager: ProfileManager;
    public pageToken: string;
    public verifyToken: string;
    public appSecret: string;
    public validation: boolean;
    public route: string;

    public listen(port: number, func: () => {});
    public setGetStartedPayload(payload: string): Promise<boolean>;

    public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
    public on<S extends string | symbol>(
      event: Exclude<S, keyof ClientEvents>,
      listener: (...args: any[]) => void,
    ): this;

    public emit<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K]): boolean;
    public emit<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, ...args: unknown[]): boolean;
}