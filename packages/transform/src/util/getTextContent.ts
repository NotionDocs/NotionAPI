import { Decoration } from "notion-types";
import { defaultNotionText, parseNotionText } from "./textUtil";

export const getTextContent = (text?: Decoration[]) => {
  if (!text) return undefined;
  else if (Array.isArray(text)) return parseNotionText(text);
  else if (typeof text === "string") return [defaultNotionText(text)];
  else return undefined;
};
