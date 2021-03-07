import { notionService } from "./main";

test("Doesn't crash", async () => {
  const page = await notionService.page.getContentOf("6c2581e6-067b-4c2c-b2f2-224d980138ed");
});
