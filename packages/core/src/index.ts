import { NotionClient } from "@notionapi/client";
import { NotionCollectionService } from "./collection";
import { NotionPageService } from "./page";

export const createNotionService = (client: NotionClient) => {
  const page = new NotionPageService(client);
  const collection = new NotionCollectionService(client, page);
  return { page, collection };
};

export * from "./collection";
export * from "./page";
export * from "./util";
