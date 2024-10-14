const config = {
  appName: "ByzPylot",
  appDescription:
    "the all-in-one CRM platform designed to streamline your sales process and deepen customer relationships with ease. Discover the power of efficiency and insight in every interaction.",
  domainName: "https://byzpylot.com",
  stripe: {
    plans: [
      {
        isFeatured: true,
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
            : "price_456",
        name: "Basic",
        description: "Ideal for small teams",
        price: 49,
        features: [
          { name: "Contact Management" },
          { name: "Task Management" },
          { name: "Basic Reporting" },
          { name: "Email Integration" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_456",
        name: "Business",
        description: "Designed for growing teams",
        price: "CUSTOM",
        features: [
          { name: "Advanced Contact Management" },
          { name: "Sales Pipeline Management" },
          { name: "Custom Reporting" },
          { name: "Email Marketing Integration" },
          { name: "Dedicated Account Manager" },
        ],
      },
    ],
  },
};

export default config;
