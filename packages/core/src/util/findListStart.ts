import { BlockMap } from "notion-types";
import { groupBlocks } from "./groupBlocks";

/**
 * originally from react-notion-x package
 *
 * https://github.com/NotionX/react-notion-x/blob/master/packages/react-notion-x/src/utils.ts
 */
export const findListStart = (blockId: string, blockMap: BlockMap) => {
  const groups = groupBlocks(blockMap);
  const group = groups.find((g) => g.includes(blockId));

  if (!group) {
    return;
  }

  return group.indexOf(blockId) + 1;
};
