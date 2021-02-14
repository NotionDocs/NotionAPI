import { NotionClient } from "../src";
import got from "got";

const notionClient = new NotionClient("", async (url, request) => {
  const res = (
    await got.post(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        cookie: `token_v2=${request.token_v2}`,
      },
      body: JSON.stringify(request.data),
    })
  ).body;
  return { responseData: JSON.parse(res) };
});

export default notionClient;
