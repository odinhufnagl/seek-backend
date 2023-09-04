import { Language } from "../db/models";
import { ServerLanguage } from "../types";

export const serverLanguageFromDBLanguage = (
  language: Language
): ServerLanguage => {
  //TODO: do some mapping;
  //TODO: should be a constant-function right?? Not service
  return "en";
};
