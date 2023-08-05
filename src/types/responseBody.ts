import { Chat, Message } from "../db/models";

export interface ResponseBodyGetPlural<T> {
  rows: T[];
  count: number;
}
interface ResponseBodyChatObject extends Chat {
  lastMessage?: Message;
  unreadMessagesCount?: number;
}
export type ResponseBodyChats = ResponseBodyGetPlural<ResponseBodyChatObject>;
