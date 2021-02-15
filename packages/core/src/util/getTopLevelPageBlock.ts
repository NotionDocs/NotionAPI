import { Block, BlockMap, Collection, PageBlock } from "notion-types";

/**
 * originally from react-notion-x package
 *
 * https://github.com/NotionX/react-notion-x/blob/master/packages/react-notion-x/src/get-block-parent-page.ts
 */
export const getTopLevelPageBlock = (block: Block, blockMap: BlockMap): PageBlock | null => {
  let currentRecord: Block | Collection = block;

  while (currentRecord != null) {
    const parentId: string = currentRecord.parent_id;

    currentRecord = blockMap[parentId]?.value;

    if ((currentRecord as Block)?.type === "page") return currentRecord as PageBlock;
  }

  return null;
};
