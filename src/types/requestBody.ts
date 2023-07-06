import { Album, Post, User } from "../db/models";

export interface RequestBody extends Record<string, any> {}

export interface RequestBodyIdList extends RequestBody {
  ids: number[];
}

export interface RequestBodyPostPost extends RequestBody, Post {
  albumIds?: number[];
}

export interface RequestBodyPutUser extends User, RequestBody {}
export interface RequestBodyAcceptInvite extends RequestBody {
  code: string;
  userId: number;
}
export interface RequestBodyPostAlbum extends Album, RequestBody {}
