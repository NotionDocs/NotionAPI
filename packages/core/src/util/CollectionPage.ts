import { PageMetadata } from "./PageMetadata";

export interface CollectionPage<Props extends Record<string, any> = Record<string, any>> {
  id: string;
  properties: Props;
  metadata: PageMetadata;
}
