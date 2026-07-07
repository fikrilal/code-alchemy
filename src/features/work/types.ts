export type WorkImages = {
  hero?: string;
  gallery?: string[];
};

export type WhiteLabelClientInput = {
  appId: string;
  name?: string;
};

export type WhiteLabelClient = {
  appId: string;
  name: string;
  playStoreUrl: string;
  icon?: string;
};

export type WorkFrontmatter = {
  title: string;
  shortDescription?: string;
  thumbnail?: string;
  playStoreUrl?: string;
  playStoreUrls?: string[];
  whiteLabelClients?: WhiteLabelClientInput[];
  whiteLabelClientsHeading?: string;
  whiteLabelClientsDescription?: string;
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
  date?: string;
  techStack?: string[];
};
