import { CollectionInstance } from "notion-types";
import { CollectionPage } from "./util";
import { NotionClient } from "@notionapi/client";
import { NotionPageService } from "./page";

export interface NotionCollectionPagesReq {
  cursor?: string;
  limit?: number;
}

export class NotionCollectionService {
  constructor(private client: NotionClient, private pageService: NotionPageService) {}

  extractPages = (collection: CollectionInstance): CollectionPage[] =>
    (collection.result.blockIds || []).map((id) => {
      return {
        id,
        properties: this.pageService.extractPropertiesFrom(collection.recordMap, id),
        metadata: this.pageService.extractMetadataFrom(collection.recordMap, id),
      };
    });

  extractMetadataFrom = (collection: CollectionInstance) =>
    this.pageService.extractMetadataFrom(collection.recordMap, Object.keys(collection.recordMap.block)[0]);
}
