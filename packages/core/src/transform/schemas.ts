import { Color } from "notion-types";

export type NotionText = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  link?: string;
  color?: Color;
  isEquation: boolean;
  isCode: boolean;
  text: string;
};

export type TextBlockContent = NotionText[];

type BaseTextBlockContent = {
  text?: TextBlockContent;
};

export type PageLinkBlockContent = {
  title?: string;
  icon?: string;
};

export type ListBlockContent = BaseTextBlockContent & {
  start: number;
};

export type HeaderBlockContent = BaseTextBlockContent & {
  level: 1 | 2 | 3;
};

export type TodoBlockContent = BaseTextBlockContent & {
  checked: boolean;
};

export type TOCBlockContent = (HeaderBlockContent & {
  id: string;
})[];

export type ColumnBlockContent = {
  ratio: number;
};

export type QuoteBlockContent = BaseTextBlockContent & {
  color?: Color;
};

export type EquationBlockContent = {
  math?: string;
};

export type CodeBlockContent = BaseTextBlockContent & {
  language?: string;
};

export type AssetBlockContent = {
  aspectRatio?: number;
  height?: number;
  width?: number;
  fullWidth?: boolean;
  pageWidth?: boolean;
  preserveScale?: boolean;
  src?: string;
  caption?: NotionText[];
};

export type CalloutBlockContent = BaseTextBlockContent & {
  icon?: string;
};

export type BookmarkBlockContent = {
  link: string;
  title: string;
  desc: string;
  favicon?: string;
  thumbnail?: string;
  color?: Color;
};
