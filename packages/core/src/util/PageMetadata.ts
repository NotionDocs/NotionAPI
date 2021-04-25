import { CollectionPropertySchemaMap } from "notion-types";

/**
 * Represents metadata of a Notion page.
 */
export interface PageMetadata {
  schema: CollectionPropertySchemaMap;
  title: string;
  createdTime: number;
  lastEditedTime: number;
  format: {
    pageIcon?: string;
    font?: string;
    cover?: string;
  };
}
