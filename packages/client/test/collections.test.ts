import notionClient from "./main";

async function qp_doesntCrash() {
  const res = await notionClient.queryPage({ pageId: "2fea615a97a7401c81be486e4eec2e94" });
}

test("queryPage - Doesn't crash", qp_doesntCrash);

async function qc_doesntCrash() {
  const res = await notionClient.queryCollection({
    collectionId: "2d8aec23-8281-4a94-9090-caaf823dd21a",
    collectionViewId: "0c7e54c9-32c2-4ed0-9b6d-edbef5a54cba",
  });
}

test("queryCollection - Doesn't crash", qc_doesntCrash);
