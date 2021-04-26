import { Decoration } from "notion-types";
import { defaultNotionText, parseNotionText } from "./textUtil";

/**
 * @private INTERNAL
 *
 * Helper method to get text content.
 * @param text - array of Notion text {@link Decoration}
 */
export const getTextContent = (text?: Decoration[]) => {
  if (!text) return undefined;
  else if (Array.isArray(text)) return parseNotionText(text);
  else if (typeof text === "string") return [defaultNotionText(text)];
  else return undefined;
};
