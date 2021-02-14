import { HTTPService } from "./HTTPService";
import { BaseCollectionView, CollectionInstance, PageChunk } from "notion-types";
import { dashifyId } from "./dashifyId";

const NOTION_API_URL = "https://www.notion.so/api/v3/";

export class NotionClient {
  constructor(private token: string, private httpService: HTTPService) {}

  public async queryPage(req: { pageId: string }) {
    return (
      await this.httpService(NOTION_API_URL + "loadPageChunk", {
        token_v2: this.token,
        data: {
          pageId: dashifyId(req.pageId),
          limit: Number.MAX_SAFE_INTEGER,
          cursor: { stack: [] },
          chunkNumber: 0,
          verticalColumns: false,
        },
      })
    ).responseData as PageChunk;
  }

  public async queryCollection(req: {
    collectionId: string;
    collectionViewId: string;
    query?: BaseCollectionView["query2"];
  }) {
    return (
      await this.httpService(NOTION_API_URL + "queryCollection", {
        token_v2: this.token,
        data: {
          collectionId: dashifyId(req.collectionId),
          collectionViewId: dashifyId(req.collectionViewId),
          loader: {
            type: "table",
            limit: Number.MAX_SAFE_INTEGER,
            loadContentCover: true,
          },
          query: req.query,
        },
      })
    ).responseData as CollectionInstance;
  }
}
