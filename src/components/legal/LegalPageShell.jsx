import Link from "next/link";

export default function LegalPageShell({
  eyebrow,
  title,
  intro,
  updated,
  sections = [],
  primaryAction = { href: "/", label: "Back Home" },
  secondaryAction = { href: "/contact", label: "Contact Us" },
  asideTitle,
  asideText,
}) {
  return (
    <main className="legal-page">
      <div className="section pt-0">
        <div className="container-custom legal-shell">
          <p className="legal-eyebrow font-body">{eyebrow}</p>
          <h1 className="legal-title font-heading">{title}</h1>
          <p className="legal-intro font-body">{intro}</p>
          {updated ? <p className="legal-updated font-body">{updated}</p> : null}
        </div>
      </div>

      <div className="pt-8">
        <div className="container-custom legal-grid">
          <div className="legal-card legal-card--content">
            <div className="legal-section-list">
              {sections.map((section) => (
                <article className="legal-section" key={section.title}>
                  <h2 className="font-heading">{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p className="font-body" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                  {section.items?.length ? (
                    <ul className="font-body">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.note ? (
                    <p className="legal-note font-body">{section.note}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>

          {/* <aside className="legal-card legal-card--sticky">
            <div className="legal-actions">
              <p className="legal-eyebrow font-body">{asideTitle}</p>
              <p className="legal-actions__copy font-body">{asideText}</p>
              <div className="legal-actions__buttons">
                <Link href={primaryAction.href} className="legal-button legal-button--primary font-body">
                  {primaryAction.label}
                </Link>
                <Link href={secondaryAction.href} className="legal-button legal-button--secondary font-body">
                  {secondaryAction.label}
                </Link>
              </div>
            </div>
          </aside> */}
        </div>
      </div>
    </main>
  );
}
