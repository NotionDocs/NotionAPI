/**
 * HTTP Service interface used by NotionAPI client. To be implemented by user.
 * @param {string} url - the URL to which the request will be sent
 * @param {HTTPServiceRequest} request - the request
 * @return Promise of object with responseData
 */
export declare type HTTPService = (
  url: string,
  request: HTTPServiceRequest
) => Promise<{
  responseData: Record<string, any>;
}>;

export type HTTPServiceRequest = {
  data: any;
  headers: Record<string, any>;
};
