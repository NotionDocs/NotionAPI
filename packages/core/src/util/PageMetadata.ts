import { CollectionPropertySchemaMap } from "notion-types";

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
