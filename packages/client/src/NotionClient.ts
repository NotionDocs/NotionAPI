import { HTTPService } from "./HTTPService";

const NOTION_API_URL = "https://www.notion.so/api/v3/";

export class NotionClient {
  constructor(private token: string, private httpService: HTTPService) {}

  public async query(page: string, data: any) {
    return (
      await this.httpService(NOTION_API_URL + page, {
        token_v2: this.token,
        data,
      })
    ).responseData;
  }
}
