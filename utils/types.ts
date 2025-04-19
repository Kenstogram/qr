import { User } from "@prisma/client";

export type QrCodeControlNetRequest = {
  clicklink: string;
  url: string;
  prompt: string;
  qr_conditioning_scale?: number;
  num_inference_steps?: number;
  guidance_scale?: number;
  negative_prompt?: string;
};

export type QrCodeControlNetResponse = [string];

export type ImageCodeControlNetRequest = {
  clicklink: string;
  url: string;
  prompt?: string;
  negative_prompt?: string;
  guidance_scale?: number;
  num_inference_steps?: number;
};

export type ImageCodeControlNetResponse = [string];

export type LogoCodeControlNetRequest = {
  clicklink: string;
  url: string;
  size?: string;
  style?: string;
  prompt?: string;
};

export type LogoCodeControlNetResponse = [string];

export type TokCodeControlNetRequest = {
  clicklink: string;
  url: string;
  prompt?: string;
  negative_prompt?: string;
  guidance_scale?: number;
  num_inference_steps?: number;
};

export type TokCodeControlNetResponse = [string];

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type SidebarNavItem = {
  title: string;
  items: NavItem[];
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

// subcriptions
export type SubscriptionPlan = {
  title: string;
  description: string;
  benefits: string[];
  limitations: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
};


export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId" | "stripePriceId"> & {
    stripeCurrentPeriodEnd: number;
    isPaid: boolean;
    interval: "month" | "year" | null;
    isCanceled?: boolean;
  };

// compare plans
export type ColumnType = string | boolean | null;
export type PlansRow = { feature: string; tooltip?: string } & {
  [key in string]: ColumnType;
};

// landing sections
export type InfoList = {
  title: string;
  description: string;
};

export type InfoLdg = {
  title: string;
  image: string;
  description: string;
  list: InfoList[];
};

export type FeatureLdg = {
  title: string;
  description: string;
  link: string;
};

export type TestimonialType = {
  name: string;
  job: string;
  image: string;
  review: string;
};
