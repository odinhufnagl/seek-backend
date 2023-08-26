import { User } from "../db/models";

export interface RequestBody extends Record<string, any> {}

export interface RequestBodyIdList extends RequestBody {
  ids: number[];
}

export interface RequestBodyPutUser extends User, RequestBody {}
export interface RequestBodyAcceptInvite extends RequestBody {
  code: string;
  userId: number;
}

export interface RequestBodyNewChatSeen extends RequestBody {
  userId: number;
  chatId: number;
}
export interface RequestBodyBlockUser extends RequestBody {
  userToBlockId: number;
  userBlockingId: number;
}
export interface RequestBodyUnblockUser extends RequestBody {
  userToBlockId: number;
  userBlockingId: number;
}
