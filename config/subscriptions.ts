import { PlansRow, SubscriptionPlan } from "../utils/types";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Starter",
    description: "QR Starter Plan",
    benefits: [
      "1 QR Experience",
      "QR Experiences with Limited Analytics",
      "1K tracked clicks/mo"
    ],
    limitations: [
    //  "Limited QR Analytics",
    //  "No API Access",
    ],
    prices: {
      monthly: 0,
      yearly: 0,
    },
    stripeIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_FREE_PRICE_ID as string,
      yearly: null,
    },
  },
  // {
  //   title: "Influencer",
  //   description: "LivestreamQR Influencer Plan",
  //   benefits: [
  //     "2 QR Experiences",
  //     "2 Studio Hours per Month for Livestreaming",
  //     "Picture in Picture Video",
  //     "QR Experiences with Referral Analytics",
  //   ],
  //   limitations: [
  //     "Limited QR Analytics",
  //     "No API Access",
  //   ],
  //   prices: {
  //     monthly: 0,
  //     yearly: 0,
  //   },
  //   stripeIds: {
  //     monthly: process.env.NEXT_PUBLIC_STRIPE_INFLUENCER_PRICE_ID as string,
  //     yearly: null,
  //   },
  // },
  {
    title: "Semi-Pro",
    description: "LivestreamQR Semi-Pro Plan",
    benefits: [
      "10 QR Experiences",
      "QR Analytics and Reporting",
      "50K tracked clicks/mo"
    ],
    limitations: [
    ],
    prices: {
      monthly: 5,
      yearly: 50,
    },
    stripeIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_SEMIPRO_MONTHLY_PLAN_ID as string,
      yearly: process.env.NEXT_PUBLIC_STRIPE_SEMIPRO_YEARLY_PLAN_ID as string,
    },
  },
  {
    title: "Pro",
    description: "QR Pro Plan",
    benefits: [
      "100 QR Experiences",
      "QR Analytics and Reporting",
      "50K tracked clicks/mo"
    ],
    limitations: [
    //  "No API Access",
    ],
    prices: {
      monthly: 30,
      yearly: 300,
    },
    stripeIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID as string,
      yearly: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID as string,
    },
  },
  {
    title: "Business",
    description: "QR Business Plan",
    benefits: [
      "Unlimited QR Experiences",
      "Advanced QR Analytics and Reporting",
      "Access to API suite",
      "2.5M tracked clicks/mo"
    ],
    limitations: [],
    prices: {
      monthly: 300,
      yearly: 3000,
    },
    stripeIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID as string,
      yearly: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID as string,
    },
  },
];

export const plansColumns = [
  "starter",
  "pro",
  "business",
  "enterprise",
] as const;

export const comparePlans: PlansRow[] = [
  {
    feature: "Access to Analytics",
    starter: true,
    pro: true,
    business: true,
    enterprise: "Custom",
    tooltip: "All plans include basic analytics for tracking performance.",
  },
  {
    feature: "Custom Branding",
    starter: null,
    pro: "500/mo",
    business: "1,500/mo",
    enterprise: "Unlimited",
    tooltip: "Custom branding is available from the Pro plan onwards.",
  },
  {
    feature: "Priority Support",
    starter: null,
    pro: "Email",
    business: "Email & Chat",
    enterprise: "24/7 Support",
  },
  {
    feature: "Advanced Reporting",
    starter: null,
    pro: null,
    business: true,
    enterprise: "Custom",
    tooltip:
      "Advanced reporting is available in Business and Enterprise plans.",
  },
  {
    feature: "Dedicated Manager",
    starter: null,
    pro: null,
    business: null,
    enterprise: true,
    tooltip: "Enterprise plan includes a dedicated account manager.",
  },
  {
    feature: "API Access",
    starter: "Limited",
    pro: "Standard",
    business: "Enhanced",
    enterprise: "Full",
  },
  {
    feature: "Monthly Webinars",
    starter: false,
    pro: true,
    business: true,
    enterprise: "Custom",
    tooltip: "Pro and higher plans include access to monthly webinars.",
  },
  {
    feature: "Custom Integrations",
    starter: false,
    pro: false,
    business: "Available",
    enterprise: "Available",
    tooltip:
      "Custom integrations are available in Business and Enterprise plans.",
  },
  {
    feature: "Roles and Permissions",
    starter: null,
    pro: "Basic",
    business: "Advanced",
    enterprise: "Advanced",
    tooltip:
      "User roles and permissions management improves with higher plans.",
  },
  {
    feature: "Onboarding Assistance",
    starter: false,
    pro: "Self-service",
    business: "Assisted",
    enterprise: "Full Service",
    tooltip: "Higher plans include more comprehensive onboarding assistance.",
  },
  // Add more rows as needed
];