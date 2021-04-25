/**
 * HTTP Service interface used by NotionAPI client. To be implemented by user. Accepts url to send request to and request information. Returns a Promise with ret
 */
export type HTTPService = (
  url: string,
  request: {
    data: any;
    headers: Record<string, any>;
  }
) => Promise<{
  responseData: Record<string, any>;
}>;
