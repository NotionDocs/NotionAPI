import { BlockMap, PageBlock, PageChunk } from "notion-types";
import { RecordMap } from "notion-types/src/maps";
import { PageMetadata } from "./util";
import { NotionClient } from "@notiondocs/api-client";

/**
 * Service for working with Notion pages.
 */
export class NotionPageService {
  constructor(private client: NotionClient) {}

  /**
   * Extract metadata of a Notion page.
   * @param {RecordMap} recordMap - the record map of the page from which the metadata will be extracted
   * @param pageId - the id of the page from which the metadata will be extracted
   */
  extractMetadataFrom(recordMap: RecordMap, pageId: string): PageMetadata {
    const schema = Object.values(recordMap.collection)[0].value.schema;

    const pageBlock = recordMap.block[pageId].value as PageBlock;

    const title = pageBlock.properties?.title[0][0];
    const createdTime = pageBlock.created_time;
    const lastEditedTime = pageBlock.last_edited_time;

    const _format = pageBlock.format;
    let format = {
      font: _format?.["page_font"],
      cover: _format?.["page_cover"],
      pageIcon: _format?.["page_icon"],
    };

    return {
      schema,
      title,
      createdTime,
      lastEditedTime,
      format,
    };
  }

  /**
   * Extract properties of a Notion page.
   * @param {RecordMap} recordMap - the record map of the page from which the properties will be extracted
   * @param pageId - the id of the page from which the properties will be extracted
   */
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

  /**
   * Extract content from a RecordMap.
   * @param {RecordMap} recordMap - the record map from which the content will be extracted
   */
  extractContentFrom(recordMap: RecordMap) {
    return recordMap.block;
  }

  /**
   * Get the entire BlockMap content of a page.
   * @param {string} pageId - the id of the page of which to get the content
   * @param {number} limit - the limit of chunks to load (default 30)
   */
  async getContentOf(pageId: string, limit: number = 30) {
    let index = 0;

    let content = {};

    while (true) {
      const newContent = this.extractContentFrom(
        ((await this.client.query("loadPageChunk", {
          pageId,
          limit,
          cursor: { stack: [[{ table: "block", id: pageId, index }]] },
          chunkNumber: 0,
          verticalColumns: false,
        })) as PageChunk).recordMap
      );

      // if last key in new content is in content, then the search is over
      if (Object.keys(content).includes(Object.keys(newContent).pop())) break;

      content = { ...content, ...newContent };
      index += limit;
    }

    return content as BlockMap;
  }
}
