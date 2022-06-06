import { CollectionInstance, CollectionQueryResult, PageChunk } from "notion-types";
import { CollectionPage } from "./util";
import { NotionPageService } from "./page";
import { dashifyId } from "./util/dashifyId";
import { NotionClient } from "@notiondocs/api-client";

/**
 * Service for working with Notion collections.
 */
export class NotionCollectionService {
  constructor(private client: NotionClient, private pageService: NotionPageService) {}

  /**
   * Extract pages from a Notion {@link CollectionInstance}.
   * @param collection - the {@link CollectionInstance} from which to extract the pages
   */
  extractPagesFrom = (collection: CollectionInstance): CollectionPage[] =>
    (
      ((collection.result as unknown) as { reducerResults: CollectionQueryResult }).reducerResults
        .collection_group_results.blockIds || []
    ).map((id) => {
      return {
        id,
        properties: this.pageService.extractPropertiesFrom(collection.recordMap, id),
        metadata: this.pageService.extractMetadataFrom(collection.recordMap, id),
      };
    });

  /**
   * Extract metadata of a Notion {@link CollectionInstance}.
   * @param collection - the {@link CollectionInstance} from which to extract the metadata
   */
  extractMetadataFrom = (collection: CollectionInstance) =>
    this.pageService.extractMetadataFrom(collection.recordMap, Object.keys(collection.recordMap.block)[0]);

  /**
   * Fetch a {@link CollectionInstance} from Notion using the pageId of the collection.
   * @param {string} pageId - the pageId of the collection.
   * @param {string} collectionViewId - the view id of the collection.
   * @param {object} options - the options for fetching the collection.
   * @see fetch
   */
  async fetchFrom(
    pageId: string,
    collectionViewId: string,
    options: { limit?: number; searchQuery?: string; userTimeZone?: string } = {}
  ) {
    const page = (await this.client.query("loadPageChunk", {
      pageId: dashifyId(pageId),
      cursor: { stack: [] },
      chunkNumber: 0,
      limit: 100,
      verticalColumns: false,
    })) as PageChunk;

    const collectionId = Object.keys(page.recordMap.collection)[0];

    collectionViewId = dashifyId(collectionViewId);

    return (await this.client.query("queryCollection", {
      collection: { id: collectionId },
      collectionView: { id: collectionViewId },
      loader: {
        type: "reducer",
        reducers: {
          collection_group_results: {
            type: "results",
            limit: options.limit || 999,
            loadContentCover: true,
          },
          "table:uncategorized:title:count": {
            type: "aggregation",
            aggregation: {
              property: "title",
              aggregator: "count",
            },
          },
        },
        searchQuery: options.searchQuery || "",
        userTimeZone: options.searchQuery || "America/Chicago",
      },
    })) as CollectionInstance;
  }

  /**
   * Fetch a {@link CollectionInstance} from Notion using the id of the collection.
   * @param {string} collectionId - the id of the collection.
   * @param {string} collectionViewId - the view id of the collection
   * @param {number} limit - the limit of chunks to load (default 50)
   * @see fetchFrom
   */
  async fetch(collectionId: string, collectionViewId: string, limit: number = 50) {
    return (await this.client.query("queryCollection", {
      collection: { id: collectionId },
      collectionView: { id: collectionViewId },
      loader: {
        limit,
        loadContentCover: true,
        searchQuery: "",
        type: "table",
        userTimeZone: "America/Chicago",
      },
    })) as CollectionInstance;
  }
}
