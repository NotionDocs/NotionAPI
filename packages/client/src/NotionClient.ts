import { HTTPService } from "./HTTPService";
import { CollectionInstance, PageChunk } from "notion-types";

const NOTION_API_URL = "https://www.notion.so/api/v3/";

export class NotionClient {
  constructor(private token: string, private httpService: HTTPService) {}

  public async queryPage(req: { pageId: string }) {
    return (
      await this.httpService(NOTION_API_URL + "loadPageChunk", {
        token_v2: this.token,
        data: {
          pageId: req.pageId,
          limit: Number.MAX_SAFE_INTEGER,
          cursor: { stack: [] },
          chunkNumber: 0,
          verticalColumns: false,
        },
      })
    ).responseData as PageChunk;
  }

  public async queryCollection(req: { collectionId: string; collectionViewId: string }) {
    let data = await this.queryPage({ pageId: req.collectionId });

    const { query2: query } = data.recordMap.collection_view[req.collectionViewId].value;

    return (
      await this.httpService("https://www.notion.so/api/v3/queryCollection", {
        token_v2: this.token,
        data: {
          collectionId: Object.entries(data.recordMap.collection)[0][0],
          collectionViewId: req.collectionViewId,
          loader: {
            type: "table",
            limit: Number.MAX_SAFE_INTEGER,
            loadContentCover: true,
          },
          query,
        },
      })
    ).responseData as CollectionInstance;
  }
}
