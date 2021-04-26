import { Block, BlockMap, Collection, PageBlock } from "notion-types";

/**
 * @private INTERNAL
 *
 * Get the top-level {@link PageBlock} that contains the given block.
 * @param block - the {@link Block} whose parent is the desired {@link PageBlock}
 * @param blockMap - the {@link BlockMap} that contains the block and parent {@link PageBlock}
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
