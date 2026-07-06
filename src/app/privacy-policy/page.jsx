import LegalPageShell from "@/components/legal/LegalPageShell";

export const metadata = {
  title: "Privacy Policy | Astro Acharya",
  description:
    "Read how Astro Acharya collects, uses, and protects personal information across the website, services, and consultation requests.",
};

const sections = [
  {
    title: "Information We Collect",
    paragraphs: [
      "We collect the details you share directly with us when you submit a contact form, request a consultation, or communicate by phone, email, or messaging apps.",
      "This may include your name, contact information, consultation preferences, and the details needed to understand your request.",
    ],
  },
  {
    title: "How We Use Information",
    paragraphs: [
      "We use your information to respond to enquiries, manage appointments, deliver consultation services, and improve the experience on our website.",
      "We may also use limited data to keep our site secure, maintain service quality, and understand which pages are most useful to visitors.",
    ],
  },
  {
    title: "Sharing and Disclosure",
    paragraphs: [
      "We do not sell your personal information.",
      "We may share information only when it is needed to operate the website, complete a service you requested, or comply with legal obligations.",
    ],
  },
  {
    title: "Data Retention",
    paragraphs: [
      "We keep personal data only for as long as it is needed for the purpose it was collected or as required by law, after which it is securely deleted or anonymized.",
    ],
  },
  {
    title: "Your Choices",
    paragraphs: [
      "You may contact us to review, update, or request deletion of your personal information where applicable.",
      "If you no longer want to receive follow-up communication from us, you can let us know and we will respect your preference.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "If you have questions about this policy, reach out through our contact page and we will respond as soon as reasonably possible.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Privacy Policy"
      title="Your privacy is handled with care"
      intro="This page explains how we handle the information you share with Astro Acharya while browsing the website or requesting spiritual and consultation services."
      updated="Last updated: July 6, 2026"
      sections={sections}
      asideTitle="Need help?"
      asideText="If you want clarification on any part of this policy, we are happy to discuss it directly."
      primaryAction={{ href: "/", label: "Return Home" }}
      secondaryAction={{ href: "/contact", label: "Contact Support" }}
    />
  );
}
