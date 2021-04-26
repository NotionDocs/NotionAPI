import { BlockMap } from "notion-types";

/**
 * @private INTERNAL
 *
 * Originally from [react-notion-x package](https://github.com/NotionX/react-notion-x/blob/master/packages/react-notion-x/src/utils.ts)
 *
 * Group same-type blocks together.
 * @param blockMap - the {@link BlockMap} from which to group blocks
 */
export const groupBlocks = (blockMap: BlockMap): string[][] => {
  const groups: string[][] = [];

  let type: string | undefined = undefined;
  let index = -1;

  Object.keys(blockMap).forEach((id) => {
    const blockValue = blockMap[id]?.value;

    if (blockValue) {
      blockValue.content?.forEach((blockId) => {
        const blockType = blockMap[blockId]?.value?.type;

        if (blockType && blockType !== type) {
          index++;
          type = blockType;
          groups[index] = [];
        }

        groups[index].push(blockId);
      });
    }

    type = undefined;
  });

  return groups;
};
