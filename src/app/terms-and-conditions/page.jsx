import LegalPageShell from "@/components/legal/LegalPageShell";

export const metadata = {
  title: "Terms and Conditions | Astro Acharya",
  description:
    "Review the terms that apply to the Astro Acharya website, consultations, content, and user responsibilities.",
};

const sections = [
  {
    title: "Use of the Website",
    paragraphs: [
      "By using this website, you agree to use it responsibly and only for lawful purposes.",
      "You must not attempt to interfere with the site, misuse the content, or use the website in a way that harms other visitors or the service itself.",
    ],
  },
  {
    title: "Consultation Services",
    paragraphs: [
      "Any consultation, prediction, or spiritual guidance is provided for informational and personal support purposes.",
      "Outcomes may depend on personal circumstances, and we do not guarantee specific results.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "All text, imagery, graphics, and other site content belong to Astro Acharya unless stated otherwise.",
      "You may not copy, reproduce, or distribute our content without permission.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "We work to keep the website accurate and available, but we cannot guarantee uninterrupted access or error-free content.",
      "To the fullest extent allowed by law, Astro Acharya is not liable for losses that result from use of the website or reliance on its content.",
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these terms from time to time. When we do, the revised version will replace the previous one on this page.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "If you have questions about these terms, please contact us and we will help clarify anything that is unclear.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPageShell
      eyebrow="Terms and Conditions"
      title="Clear terms for using our site and services"
      intro="These terms explain the basic rules for using the Astro Acharya website, reading the content, and requesting services or consultations."
      updated="Last updated: July 6, 2026"
      sections={sections}
      asideTitle="Before you continue"
      asideText="Please read the terms carefully so you know what to expect when using the site or booking a consultation."
      primaryAction={{ href: "/", label: "Back to Home" }}
      secondaryAction={{ href: "/privacy-policy", label: "Privacy Policy" }}
    />
  );
}
