export type GamePlatform = {
  platform: {
    name: string;
  };
};

export type Genre = {
  name: string;
  slug: string;
  id: number;
};

export type Game = {
  background_image: string;
  name: string;
  parent_platforms?: GamePlatform[];
  genres?: Genre[];
  released: string;
  slug: string;
};

export type GameCardProps = {
  game: Game;
};
