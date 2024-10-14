import Link from "next/link";
import config from "@/app/config";
import { getSEOTags } from "@/lib/seo-tag";

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`

Last Updated: April 29, 2024

Welcome to Byzpylot! These Terms of Service ("Terms") govern your use of the website https://byzpylot.com (the "Site") and the services provided by Byzpylot ("Services"). By accessing or using our Services, you agree to be bound by these Terms.

1. Description of Services

Byzpylot is an all-in-one CRM platform designed to streamline your sales process and deepen customer relationships with ease. Discover the power of efficiency and insight in every interaction.

2. Ownership and Data Collection

By using our Services, you consent to the storage of all data of leads and customers in our platform. This includes but is not limited to data on leads, clients, products, invoices, etc.

3. User Data and Privacy

We collect user data, including personal and non-personal information, as described in our Privacy Policy. By using our Services, you agree to the collection and use of your information as outlined in the Privacy Policy, available at Privacy Policy.

4. Non-Personal Data Collection

We may use web cookies to collect non-personal information about your use of the Site. By using our Services, you consent to the use of cookies in accordance with our Privacy Policy.

5. Governing Law

These Terms shall be governed by and construed in accordance with the laws of France.

6. Updates to the Terms

We may update these Terms from time to time. Users will be notified of any changes by email. Continued use of the Services after any modifications to the Terms constitutes acceptance of those changes.

Contact Us

If you have any questions about these Terms, please contact us at william@byzpylot.com.`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
