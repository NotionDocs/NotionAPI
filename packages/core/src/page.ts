import { BlockMap, PageBlock, PageChunk } from "notion-types";
import { RecordMap } from "notion-types/src/maps";
import { isURL, mapImageURL, PageMetadata } from "./util";
import { dashifyId } from "./util/dashifyId";
import { NotionClient } from "@notionapi/client";

export class NotionPageService {
  constructor(private client: NotionClient) {}

  extractMetadataFrom(recordMap: RecordMap, pageId: string): PageMetadata {
    const schema = Object.values(recordMap.collection)[0].value.schema;

    const pageBlock = recordMap.block[pageId].value as PageBlock;

    const title = pageBlock.properties?.title[0][0];
    const createdTime = pageBlock.created_time;
    const lastEditedTime = pageBlock.last_edited_time;

    const _format = pageBlock.format;
    let format = {
      font: _format?.["page_font"],
      cover: isURL(_format?.["page_cover"] || "")
        ? mapImageURL(_format?.["page_cover"], pageBlock)
        : _format?.["page_cover"],
      pageIcon: isURL(_format?.["page_icon"] || "")
        ? mapImageURL(_format?.["page_icon"], pageBlock)
        : _format?.["page_icon"],
    };

    return {
      schema,
      title,
      createdTime,
      lastEditedTime,
      format,
    };
  }

  extractPropertiesFrom(recordMap: RecordMap, pageId: string) {
    const { schema } = this.extractMetadataFrom(recordMap, pageId);

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
          props[prop.name] = cur[1];
          break;
        case "number":
          // unimplemented
          props[prop.name] = cur[1];
          break;
        case "multi_select":
          props[prop.name] = cur[1][0][0].split(",");
          break;
        case "date":
          props[prop.name] = cur[1][0][1][0][1];
          break;
        case "relation":
          props[prop.name] = cur[1].filter((a) => a.length > 1).map((a) => a[1][0][1]);
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
  }

  extractContentFrom(recordMap: RecordMap) {
    return recordMap.block;
  }

  async getContentOf(pageId: string, loaderLimit: number = 30) {
    let index = 0;

    let content = {};

    while (true) {
      const newContent = this.extractContentFrom(
        ((await this.client.query("loadPageChunk", {
          pageId,
          limit: loaderLimit,
          cursor: { stack: [[{ table: "block", id: pageId, index }]] },
          chunkNumber: 0,
          verticalColumns: false,
        })) as PageChunk).recordMap
      );

      // if last key in new content is in content, then the search is over
      if (Object.keys(content).includes(Object.keys(newContent).pop())) break;

      content = { ...content, ...newContent };
      index += loaderLimit;
    }

    return content as BlockMap;
  }

  fetch = async (pageId: string) =>
    (await this.client.query("loadPageChunk", {
      pageId: dashifyId(pageId),
      limit: 30,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false,
    })) as PageChunk;
}
