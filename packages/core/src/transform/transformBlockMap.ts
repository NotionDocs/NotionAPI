import { BlockMap } from "notion-types";
import { findListStart, getTextContent, getTopLevelPageBlock } from "./util";
import { TransformRules } from "./TransformRules";

export function transformBlockMap<T>(
  blockMap: BlockMap,
  blockId: string,
  transformRules: TransformRules<T>,
  isTopLevel: boolean = true
): T {
  const block = blockMap[blockId];

  if (!block) return;

  let type: keyof TransformRules<T> = block.value.type as any;
  let content: any;
  let children: T[];

  switch (block.value.type) {
    case "text":
    case "toggle":
      content = getTextContent(block.value.properties?.title);
      break;
    case "page":
      if (isTopLevel) {
        children = block.value.content?.map((id) => transformBlockMap(blockMap, id, transformRules, false));
        break;
      }
      type = "pageLink";
      const title = block.value.properties.title?.[0]?.[0];
      const pageLinkIcon = block.value.format?.page_icon;
      content = { title, icon: pageLinkIcon };
      break;
    case "bulleted_list":
    case "numbered_list":
      const listText = getTextContent(block.value.properties?.title);
      const start = findListStart(blockId, blockMap);
      content = { text: listText, start };
      children = block.value.content?.map((id) => transformBlockMap(blockMap, id, transformRules, false));
      break;
    case "header":
    case "sub_header":
    case "sub_sub_header":
      type = "header";
      const headerText = getTextContent(block.value.properties?.title);
      const headerLevel = { header: 1, sub_header: 2, sub_sub_header: 3 }[block.value.type];
      content = { text: headerText, level: headerLevel };
      break;
    case "to_do":
      const todoText = getTextContent(block.value.properties?.title);
      const checked = block.value.properties.checked[0][0] === "Yes";
      content = { text: todoText, checked };
      children = block.value.content?.map((id) => transformBlockMap(blockMap, id, transformRules, false));
      break;
    case "table_of_contents":
      const page = getTopLevelPageBlock(block.value, blockMap);

      content = (page.content ?? [])
        .map((blockId: string) => {
          const blockValue = blockMap[blockId]?.value;
          if (blockValue) {
            const { type } = blockValue;
            if (type === "header" || type === "sub_header" || type === "sub_sub_header")
              return {
                id: blockId,
                level: { header: 1, sub_header: 2, sub_sub_header: 3 }[blockValue.type],
                text: getTextContent(blockValue.properties?.title),
              };
          }
          return null;
        })
        .filter(Boolean);
      break;
    case "divider":
      // no content or children
      break;
    case "column_list":
      children = block.value.content?.map((id) => transformBlockMap(blockMap, id, transformRules, false));
      break;
    case "column":
      content = {
        ratio: block.value.format?.column_ratio || 0.5,
      };
      children = block.value.content?.map((id) => transformBlockMap(blockMap, id, transformRules, false));
      break;
    case "quote":
      const quoteText = getTextContent(block.value.properties?.title);
      content = { text: quoteText, color: block.value.format?.block_color };
      break;
    case "equation":
      content = { math: block.value.properties.title?.[0][0] };
      break;
    case "code":
      const codeText = getTextContent(block.value.properties?.title);
      const language = block.value.properties?.language?.[0][0];
      content = { text: codeText, language };
      break;
    case "image":
    case "video":
      content = {
        aspectRatio: block.value.format?.block_aspect_ratio,
        height: block.value.format?.block_height,
        width: block.value.format?.block_width,
        fullWidth: block.value.format?.block_full_width,
        pageWidth: block.value.format?.block_page_width,
        preserveScale: block.value.format?.block_preserve_scale,
        src: block.value.format?.display_source ?? block.value.properties?.source?.[0]?.[0],
        caption: getTextContent(block.value.properties?.caption),
      };
      break;
    case "callout":
      const calloutText = getTextContent(block.value.properties?.title);
      const calloutIcon = block.value.format?.page_icon;
      content = { text: calloutText, icon: calloutIcon };
      break;
    case "bookmark":
      const bookmarkLink = block.value.properties.link[0][0];
      const bookmarkTitle = (getTextContent(block.value.properties.title) || []).reduce((a, b) => a + b.text, "");
      const bookmarkDesc = (getTextContent(block.value.properties.title) || []).reduce((a, b) => a + b.text, "");
      const bookmarkFavicon = block.value.format?.bookmark_icon;
      const bookmarkThumbnail = block.value.format?.bookmark_cover;
      const bookmarkColor = block.value.format?.block_color;
      content = {
        link: bookmarkLink,
        title: bookmarkTitle,
        desc: bookmarkDesc,
        favicon: bookmarkFavicon,
        thumbnail: bookmarkThumbnail,
        color: bookmarkColor,
      };
      break;
    case "collection_view":
      content = {
        collectionId: block.value.collection_id,
        viewIds: block.value.view_ids,
      };
      break;
  }

  return transformRules[type]?.(blockId, content, children?.filter(Boolean));
}
