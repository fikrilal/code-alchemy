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
  /** App/brand logo for list views */
  logo?: string;
  thumbnail?: string;
  playStoreUrl?: string;
  playStoreUrls?: string[];
  whiteLabelClients?: WhiteLabelClientInput[];
  whiteLabelClientsHeading?: string;
  whiteLabelClientsDescription?: string;
  techStack?: string[];
  images?: WorkImages;
  category?: string;
  company?: string;
  date?: string;
  hidden?: boolean;
};

export type WorkSummary = {
  slug: string;
  title: string;
  shortDescription: string;
  logo?: string;
  category?: string;
  company?: string;
  date?: string;
  techStack?: string[];
};
