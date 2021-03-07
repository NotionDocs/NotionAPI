import { notionService } from "./main";

test("Doesn't crash", async () => {
  const collection = await notionService.collection.fetch(
    "28f21484334d47dea997b79e1063ae0d",
    "8bb4a5b6fd344dfdb4624a5a69dea6dc"
  );
  console.log(collection);
});
