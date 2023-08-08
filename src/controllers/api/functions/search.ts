import { Response } from "express";
import { ApiQueryParamsError } from "../../../classes";
import { searchChats } from "../../../services";
import { RequestSearch } from "../../../types";
//TODO: in all screens, try to minimize include in some nice way

const searchController = async (req: RequestSearch, res: Response) => {
  const searchQuery = req.query.search_query;
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);
  const userId = Number(req.query.userId);
  console.log("searchQuery", searchQuery, "userId", userId);
  if (!searchQuery) {
    throw new ApiQueryParamsError();
  }
  const chats = await searchChats(userId, searchQuery, { limit, offset });
  res.send({ chats });
};

export default { searchController };
