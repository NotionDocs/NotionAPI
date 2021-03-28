export type HTTPService = (
  url: string,
  request: {
    data: any;
    headers: Record<string, any>;
  }
) => Promise<{
  responseData: Record<string, any>;
}>;
