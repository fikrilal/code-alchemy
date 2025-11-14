export type WorkImages = {
  hero?: string;
  gallery?: string[];
};

export type WorkFrontmatter = {
  title: string;
  shortDescription?: string;
  thumbnail?: string;
  timeframe?: string;
  link?: string;
  techStack?: string[];
  images?: WorkImages;
};

export type WorkSummary = {
  slug: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
};
