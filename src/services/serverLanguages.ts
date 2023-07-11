import { Language } from "../db/models";
import { ServerLanguage } from "../types";

export const serverLanguageFromDBLanguage = (
  language: Language
): ServerLanguage => {
  //TODO: do some mapping;
  return "en";
};
