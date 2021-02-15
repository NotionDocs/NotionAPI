import { Block } from "notion-types";

/**
 * originally from nextjs-notion-starter-kit
 *
 * https://github.com/transitive-bullshit/nextjs-notion-starter-kit/blob/master/lib/map-image-url.ts#L4
 */
export const mapImageURL = (url: string, block: Block) => {
  if (!url) {
    return null;
  }

  if (url.startsWith("data:")) {
    return url;
  }

  if (url.startsWith("/images")) {
    url = `https://www.notion.so${url}`;
  }

  // more recent versions of notion don't proxy unsplash images
  if (!url.startsWith("https://images.unsplash.com")) {
    url = `https://www.notion.so${url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`}`;

    const notionImageUrlV2 = new URL(url);
    let table = block.parent_table === "space" ? "block" : block.parent_table;
    if (table === "collection") {
      table = "block";
    }
    notionImageUrlV2.searchParams.set("table", table);
    notionImageUrlV2.searchParams.set("id", block.id);
    notionImageUrlV2.searchParams.set("cache", "v2");

    url = notionImageUrlV2.toString();
  }

  return url;
};
