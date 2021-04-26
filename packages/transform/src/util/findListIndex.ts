import { BlockMap } from "notion-types";
import { groupBlocks } from "./groupBlocks";

/**
 * @private INTERNAL
 *
 * Find the index of a list item.
 * @param {string} blockId - the id of the list item block
 * @param {BlockMap} blockMap - the block map that contains the list
 */
export const findListIndex = (blockId: string, blockMap: BlockMap) => {
  const groups = groupBlocks(blockMap);
  const group = groups.find((g) => g.includes(blockId));

  if (!group) return;

  return group.indexOf(blockId) + 1;
};
