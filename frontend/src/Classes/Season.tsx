import { Episode } from "./Episode";

export interface Season {
  _id: string;
  air_date: string;
  episodes?: Episode[] | null;
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
}
