export interface Episode {
  air_date: string;
  episode_number: number;
  //crew?: (CrewEntity)[] | null;
  //guest_stars?: (GuestStarsEntity)[] | null;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}
