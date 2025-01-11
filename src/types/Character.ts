export interface CareerStat {
  id: string;
  createdAt: string;
  updatedAt: string;
  games_played?: number;
  games_started?: number;
  touchdowns?: number;
  attempts?: number;
  average?: number;
  fumbles?: number;
  longest?: number;
  receptions?: number;
  yards?: number;
  lost?: number;
  team?: string;
  season?: string;
  player: string;
}

export interface Character {
  id: string;
  createdAt: string;
  updatedAt: string;
  character_name?: string;
  name: string;
  description?: string;
  character_description?: string;
  actor_url?: string;
  profile_link?:string;
  biography_html?:string;
  image_src?: string;
  img_src?: string;
  biographyHtml?: string;
  profileLink?: string;
  age?: number;
  height?: string;
  weight?: string;
  college?: string;
  experience?: string;
  career_stats?: CareerStat[];
}
