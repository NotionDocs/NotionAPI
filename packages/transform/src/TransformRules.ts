import {
  AssetBlockContent,
  BookmarkBlockContent,
  CalloutBlockContent,
  CodeBlockContent,
  CollectionViewBlockContent,
  ColumnBlockContent,
  EquationBlockContent,
  HeaderBlockContent,
  ListBlockContent,
  PageLinkBlockContent,
  QuoteBlockContent,
  TextBlockContent,
  TOCBlockContent,
  TodoBlockContent,
} from "./schemas";

export type TransformRules<T> = Partial<{
  text: (id: string, content: TextBlockContent) => T;
  page: (id: string, content: undefined, children: T[]) => T;
  pageLink: (id: string, content: PageLinkBlockContent) => T;
  bulleted_list: (id: string, content: ListBlockContent, children: T[]) => T;
  numbered_list: (id: string, content: ListBlockContent, children: T[]) => T;
  header: (id: string, content: HeaderBlockContent) => T;
  to_do: (id: string, content: TodoBlockContent, children: T[]) => T;
  table_of_contents: (id: string, content: TOCBlockContent) => T;
  divider: (id: string) => T;
  column_list: (id: string, content: undefined, children: T[]) => T;
  column: (id: string, content: ColumnBlockContent, children: T[]) => T;
  quote: (id: string, content: QuoteBlockContent) => T;
  equation: (id: string, content: EquationBlockContent) => T;
  code: (id: string, content: CodeBlockContent) => T;
  image: (id: string, content: AssetBlockContent) => T;
  video: (id: string, content: AssetBlockContent) => T;
  callout: (id: string, content: CalloutBlockContent) => T;
  bookmark: (id: string, content: BookmarkBlockContent) => T;
  toggle: (id: string, content: TextBlockContent) => T;
  collection_view: (id: string, content: CollectionViewBlockContent) => T;
}>;
