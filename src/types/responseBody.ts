import { Chat, Message } from "../db/models";

interface ResponseBodyChatObject extends Chat {
  lastMessage?: Message;
  unreadMessagesCount?: number;
}
export type ResponseBodyChat = ResponseBodyChatObject[];
