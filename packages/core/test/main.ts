import { NotionClient } from "@notionapi/client";
import fetch from "node-fetch";
import { createNotionService } from "../src";

export const notionClient = new NotionClient("", async (url, request) => {
  const responseData = await (
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        cookie: `token_v2=${request.token_v2}`,
      },
      body: JSON.stringify(request.data),
    })
  ).json();
  return { responseData };
});

export const notionService = createNotionService(notionClient);
