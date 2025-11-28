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
  category?: string;
  date?: string;
  hidden?: boolean;
};

export type WorkSummary = {
  slug: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  category?: string;
};
