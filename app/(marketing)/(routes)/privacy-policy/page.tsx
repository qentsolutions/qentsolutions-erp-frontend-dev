import config from "@/app/config";
import { getSEOTags } from "@/lib/seo-tag";
import Link from "next/link";

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: April 29, 2024

Welcome to ByzPylot! This Privacy Policy explains how we collect, use, and disclose information about you when you use our website https://byzpylot.com (the "Site") and the services provided by ByzPylot (the "Services").

1. Information We Collect

We collect various types of information, including:

Data from leads, clients, products, invoices, project management, etc.
Non-personal information through web cookies.
2. Purpose of Data Collection

We collect and store data to help you use our platform effectively.

3. Data Sharing

We do not share the data we collect with any other parties.

4. Children's Privacy

We do not knowingly collect any data from children under the age of 13. If you believe that we may have collected personal information from a child under the age of 13, please contact us at william@byzpylot.com.

5. Updates to the Privacy Policy

We may update this Privacy Policy from time to time. Users will be notified of any changes by email. Continued use of the Services after any modifications to the Privacy Policy constitutes acceptance of those changes.

Contact Us

If you have any questions about this Privacy Policy, please contact us at william@byzpylot.com.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
