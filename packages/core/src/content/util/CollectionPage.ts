export interface CollectionPage<P extends Record<string, any> = Record<string, any>> {
  id: string;
  properties: P;
}
