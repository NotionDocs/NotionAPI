import { NotionClient } from "@notiondocs/api-client";
import fetch from "node-fetch";
import { createNotionService } from "../src";

export const notionClient = new NotionClient("", async (url, request) => {
  const responseData = await (
    await fetch(url, {
      method: "POST",
      headers: request.headers,
      body: JSON.stringify(request.data),
    })
  ).json();
  return { responseData };
});

export const notionService = createNotionService(notionClient);
