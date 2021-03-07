export type HTTPService = (
  url: string,
  request: {
    data: any;
    token_v2: string;
  }
) => Promise<{
  responseData: Record<string, any>;
}>;
