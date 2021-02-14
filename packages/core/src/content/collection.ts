import { CollectionInstance } from "notion-types";
import { NotionPage } from "./page";
import { CollectionPage } from "./util";

export interface NotionCollectionPagesReq {
  cursor?: string;
  limit?: number;
}

export class NotionCollection {
  constructor(public readonly data: CollectionInstance) {}

  public static readonly getPages = (data: CollectionInstance) => (
    req: NotionCollectionPagesReq = {}
  ): CollectionPage[] => {
    let blockIds = data.result.blockIds || [];
    blockIds = blockIds
      .slice(
        req.cursor ? (blockIds.indexOf(req.cursor) < 0 ? blockIds.length : blockIds.indexOf(req.cursor)) : 0,
        req.limit || Number.MAX_SAFE_INTEGER
      )
      .filter((v, i, a) => i < Math.min(a.length, req.limit || Number.MAX_SAFE_INTEGER));

    return blockIds.map((id) => {
      return {
        id,
        properties: NotionPage.getProperties(data.recordMap)(id),
        metadata: NotionPage.getMetadata(data.recordMap)(id),
      };
    });
  };

  public readonly getMetadata = () =>
    NotionPage.getMetadata(this.data.recordMap)(Object.keys(this.data.recordMap.block)[0]);
  public readonly getPages = (req: NotionCollectionPagesReq) => NotionCollection.getPages(this.data)(req);
}
