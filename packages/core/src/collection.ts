import { CollectionInstance, PageChunk } from "notion-types";
import { CollectionPage } from "./util";
import { NotionClient } from "@notionapi/client";
import { NotionPageService } from "./page";

export interface NotionCollectionPagesReq {
  cursor?: string;
  limit?: number;
}

export class NotionCollectionService {
  constructor(private client: NotionClient, private pageService: NotionPageService) {}

  extractPagesFrom = (collection: CollectionInstance): CollectionPage[] =>
    (collection.result.blockIds || []).map((id) => {
      return {
        id,
        properties: this.pageService.extractPropertiesFrom(collection.recordMap, id),
        metadata: this.pageService.extractMetadataFrom(collection.recordMap, id),
      };
    });

  extractMetadataFrom = (collection: CollectionInstance) =>
    this.pageService.extractMetadataFrom(collection.recordMap, Object.keys(collection.recordMap.block)[0]);

  async fetch(pageId: string, collectionViewId: string, limit: number = 50) {
    const page = (await this.client.query("loadPageChunk", {
      pageId,
      cursor: { stack: [] },
      chunkNumber: 0,
      limit: 100,
      verticalColumns: false,
    })) as PageChunk;

    const collectionId = Object.keys(page.recordMap.collection)[0];
    const query = page.recordMap.collection_view[collectionViewId].value.query2;

    return (await this.client.query("queryCollection", {
      collectionId,
      collectionViewId,
      loader: {
        limit,
        loadContentCover: true,
        searchQuery: "",
        type: "table",
        userTimeZone: "America/Chicago",
      },
      query,
    })) as CollectionInstance;
  }
}
