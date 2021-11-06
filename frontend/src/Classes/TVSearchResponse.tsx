import { TVSearchResult } from "./TVSearchResult";

export class TVSearchResponse {
  page: number = 0;
  results: TVSearchResult[] = [];
  total_results: number = 0;
  total_pages: number = 0;
}
