import { HTTPService } from "./HTTPService";

const NOTION_API_URL = "https://www.notion.so/api/v3/";

/**
 * Used for performing queries on the Notion backend with provided token and httpService.
 * @param {string} token - your private Notion token. Required for accessing private pages
 * @param {HTTPService} httpService - your HTTP service function that will make the HTTP requests
 */
export class NotionClient {
  constructor(private token: string, private httpService: HTTPService) {}

  /**
   * Query the Notion backend.
   * @param {string} page - the Notion backend page to query
   * @param {any} data - the data to send
   */
  public async query(page: string, data: any) {
    return (
      await this.httpService(NOTION_API_URL + page, {
        headers: {
          "content-type": "application/json",
          cookie: `token_v2=${this.token}`,
        },
        data,
      })
    ).responseData;
  }
}
