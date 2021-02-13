import { Color, Decoration } from "notion-types";
import { NotionText } from "../transform/schemas";

export const parseNotionText = (children: Decoration[]) =>
  (children || []).map((it) => {
    let item: NotionText;

    let bold = false;
    let italic = false;
    let underline = false;
    let strikethrough = false;
    let isCode = false;
    let link: string = null;
    let color: Color = null;

    if (it[0] == "⁍") {
      item = {
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        link: null,
        color: null,
        isEquation: true,
        isCode: false,
        text: it[1][0][1] as string,
      };
    } else {
      if (it.length > 1) {
        it[1].forEach((it) => {
          switch (it[0]) {
            case "b":
              bold = true;
              break;
            case "i":
              italic = true;
              break;
            case "_":
              underline = true;
              break;
            case "s":
              strikethrough = true;
              break;
            case "c":
              isCode = true;
              break;
            case "a":
              link = it[1];
              break;
            case "h":
              color = it[1];
              break;
            default:
            // console.log(it[0]);
          }
        });
      }
      item = {
        bold,
        italic,
        underline,
        strikethrough,
        link,
        color,
        isEquation: false,
        isCode,
        text: it[0],
      };
    }

    return item;
  });

export const defaultNotionText = (text: string) =>
  ({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    isEquation: false,
    isCode: false,
    text,
  } as NotionText);
