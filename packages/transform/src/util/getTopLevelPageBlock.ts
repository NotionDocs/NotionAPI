import { Block, BlockMap, Collection, PageBlock } from "notion-types";

/**
 * @private INTERNAL
 *
 * Get the top-level PageBlock that contains the given block.
 * @param {Block} block - the block whose parent is the desired PageBlock
 * @param {BlockMap} blockMap - the block map that contains the block and parent PageBlock
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
