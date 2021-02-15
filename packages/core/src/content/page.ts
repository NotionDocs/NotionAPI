import { PageBlock } from "notion-types";
import { RecordMap } from "notion-types/src/maps";
import { parseNotionText } from "./text";
import { isURL, mapImageURL, PageMetadata } from "../util";

export class NotionPage {
  constructor(public readonly recordMap: RecordMap, public pageId: string) {}

  public static readonly getMetadata = (recordMap: RecordMap) => (pageId: string): PageMetadata => {
    const schema = Object.values(recordMap.collection)[0].value.schema;

    const pageBlock = recordMap.block[pageId].value as PageBlock;

    const title = pageBlock.properties?.title[0][0];
    const createdTime = pageBlock.created_time;
    const lastEditedTime = pageBlock.last_edited_time;

    const _format = pageBlock.format;
    let format = {
      font: _format?.["page_font"],
      cover: isURL(_format?.["page_cover"] || "") ? mapImageURL(_format?.["page_cover"], pageBlock) : undefined,
      pageIcon: isURL(_format?.["page_icon"] || "") ? mapImageURL(_format?.["page_icon"], pageBlock) : undefined,
    };

    return {
      schema,
      title,
      createdTime,
      lastEditedTime,
      format,
    };
  };

  public static readonly getProperties = (recordMap: RecordMap) => (pageId: string) => {
    const { schema } = NotionPage.getMetadata(recordMap)(pageId);

    const properties = recordMap.block[pageId].value.properties as Record<string, any>;

    return Object.entries(properties).reduce((props, cur) => {
      const prop = schema[cur[0]];
      if (!prop) return props; // occasionally, old props are left in properties object but not schema
      switch (prop.type) {
        case "title":
        case "select":
          props[prop.name] = cur[1][0][0];
          break;
        case "text":
          props[prop.name] = parseNotionText(cur[1]);
          break;
        case "number":
          // unimplemented
          props[prop.name] = cur[1];
          break;
        case "multi_select":
          props[prop.name] = cur[1][0][0].split(",");
          break;
        case "date":
        case "relation":
          props[prop.name] = cur[1][0][1][0][1];
          break;
        case "person":
          // unimplemented
          props[prop.name] = cur[1];
          break;
        case "file":
          // unimplemented
          props[prop.name] = cur[1];
          break;
        case "checkbox":
          props[prop.name] = cur[1][0][0] === "Yes";
          break;
        case "url":
          props[prop.name] = cur[1][0][0];
          break;
        case "email":
          // unimplemented
          props[prop.name] = cur[1];
          break;
        case "phone_number":
          // unimplemented
          props[prop.name] = cur[1];
          break;
        case "formula":
          // unimplemented
          props[prop.name] = cur[1];
          break;
        case "created_time":
          // unimplemented
          props[prop.name] = cur[1];
          break;
        case "created_by":
          // unimplemented
          props[prop.name] = cur[1];
          break;
        case "last_edited_time":
          // unimplemented
          props[prop.name] = cur[1];
          break;
        case "last_edited_by":
          // unimplemented
          props[prop.name] = cur[1];
          break;
      }
      return props;
    }, {} as Record<string, any>);
  };

  public static readonly getContent = (recordMap: RecordMap) => recordMap.block;

  public readonly getMetadata = () => NotionPage.getMetadata(this.recordMap)(this.pageId);
  public readonly getProperties = () => NotionPage.getProperties(this.recordMap)(this.pageId);
  public readonly getContent = () => NotionPage.getContent(this.recordMap);
}
