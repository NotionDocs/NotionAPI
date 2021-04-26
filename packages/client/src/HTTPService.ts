/**
 * HTTP Service interface used by {@link NotionClient}. To be implemented by user.
 * @param {string} url - the URL to which the request will be sent
 * @param request - {@link HTTPServiceRequest}
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
