import { PageMetadata } from "./PageMetadata";

/**
 * Represents a page in a Notion collection.
 */
export interface CollectionPage<Props extends Record<string, any> = Record<string, any>> {
  id: string;
  properties: Props;
  metadata: PageMetadata;
}
