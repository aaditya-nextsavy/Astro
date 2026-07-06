import Link from "next/link";

export default function NotFound() {
  return (
    <main className="legal-page not-found-page">
      <section className="section pt-0">
        <div className="container-custom legal-shell">
          <div className="legal-card legal-card--content">
            <div className="not-found-figure">
              <p className="legal-eyebrow font-body">Page not found</p>
              <div className="not-found-code">404</div>
            </div>

            <h1 className="legal-title font-heading">We could not find this page</h1>
            <p className="legal-intro not-found-subtitle font-body">
              The page you are looking for may have moved, been renamed, or no longer exists.
              You can return home or contact us if you need help finding the right page.
            </p>

            <div className="legal-actions__buttons" style={{ marginTop: "1.4rem" }}>
              <Link href="/" className="legal-button legal-button--primary font-body">
                Go Home
              </Link>
              <Link href="/contact" className="legal-button legal-button--secondary font-body">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
