import notionClient from "./main";

async function doesntCrash() {
  await notionClient.queryPage({ pageId: "0be6efce9daf42688f65c76b89f8eb27" });
}

test("Doesn't crash", doesntCrash);
