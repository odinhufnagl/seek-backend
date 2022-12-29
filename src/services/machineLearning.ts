import axios from "axios";
import { MACHINE_LEARNING_ENDPOINT } from "../constants";

export const sentenceToVec = async (
  sentence: string
): Promise<number[] | undefined> => {
  try {
    const url = MACHINE_LEARNING_ENDPOINT.SENTENCE_TO_VEC(sentence);

    const r = await axios(url);
    const data = r.data;
    return data;
  } catch (e) {
    console.log("e", e);
    return;
  }
};
