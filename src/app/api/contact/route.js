import { NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";
import path from "path";

const escapeHtml = (value) =>
    String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const NAVY = "#17374F";
const BORDER = "#E3E8EE";
const STRIPE = "#F7F4EE";
const TEXT = "#333333";

// Same accounts as the site footer
const SOCIAL_LINKS = [
    { name: "Instagram", cid: "social-instagram", file: "instagram.png", href: "https://www.instagram.com/astro_aacharya" },
    { name: "YouTube", cid: "social-youtube", file: "youtube.png", href: "https://www.youtube.com/@AstroAacharya1008" },
    { name: "Facebook", cid: "social-facebook", file: "facebook.png", href: "https://www.facebook.com/astrovastuconsultants" },
    { name: "X", cid: "social-x", file: "x.png", href: "https://x.com/astroaacharya18" },
];

// Images are attached inline and referenced by cid: (mail clients block SVG and relative URLs)
const LOGO_ATTACHMENT = {
    filename: "logo.png",
    path: path.join(process.cwd(), "public/assets/favicons/favicon-96x96.png"),
    cid: "astro-logo",
};

const SOCIAL_ATTACHMENTS = SOCIAL_LINKS.map(({ file, cid }) => ({
    filename: file,
    path: path.join(process.cwd(), "public/assets/email", file),
    cid,
}));

// Card used for the internal enquiry mail: logo header + body.
// Table layout + inline styles so it renders in mail clients.
function emailShell({ body }) {
    return `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
        <tr>
            <td align="center" style="padding:32px 16px;">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border:1px solid ${BORDER};border-radius:12px;font-family:Arial,Helvetica,sans-serif;">
                    <tr>
                        <td style="padding:32px 32px 0;">
                            <table role="presentation" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="vertical-align:middle;">
                                        <img src="cid:astro-logo" width="40" height="40" alt="Astro Aacharya" style="display:block;border:0;" />
                                    </td>
                                    <td style="vertical-align:middle;padding-left:12px;font-family:Georgia,'Times New Roman',serif;font-size:20px;letter-spacing:1px;color:${NAVY};">
                                        ASTRO AACHARYA
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:32px;">
                            ${body}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

// Email for the team receiving a new enquiry. All values must already be HTML-escaped.
function enquiryEmail({ name, phone, email, service, message }) {
    const rows = [
        ["Name", name],
        ["Email", `<a href="mailto:${email}" style="color:#1a5fb4;text-decoration:underline;">${email}</a>`],
        ["Contact Number", `<a href="tel:${phone.replace(/[^\d+]/g, "")}" style="color:${TEXT};text-decoration:none;">${phone}</a>`],
        ["Service", service],
    ];

    const tableRows = rows
        .map(
            ([label, value], i) => `
                <tr style="background:${i % 2 ? STRIPE : "#ffffff"};">
                    <td width="35%" style="padding:12px;border:1px solid ${BORDER};font-size:13px;font-weight:bold;color:${NAVY};">${label}</td>
                    <td style="padding:12px;border:1px solid ${BORDER};font-size:13px;color:${TEXT};">${value}</td>
                </tr>`
        )
        .join("");

    const messageBlock = message
        ? `
            <p style="margin:24px 0 0;font-size:13px;font-weight:bold;color:${NAVY};">Message</p>
            <p style="margin:12px 0 0;padding:12px 24px;font-size:14px;line-height:22px;color:${TEXT};">${message}</p>`
        : "";

    return emailShell({
        body: `
            <h1 style="margin:0 0 24px;font-size:20px;font-weight:bold;color:${NAVY};">New enquiry</h1>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${tableRows}
            </table>
            ${messageBlock}`,
    });
}

const SITE_URL = (process.env.SITE_URL || "https://astroaacharya.in").replace(/\/$/, "");
const CONTACT_EMAIL = "info@astroaacharya.in";
const CONTACT_PHONE = "+919898061008";

const FOOTER_LINKS = [
    { label: "Contact", href: `${SITE_URL}/contact` },
    { label: "About", href: `${SITE_URL}/about` },
    { label: "Terms of use", href: `${SITE_URL}/terms-and-conditions` },
    { label: "Privacy policy", href: `${SITE_URL}/privacy-policy` },
];

// Shared layout for every thank-you mail sent to visitors: logo, greeting, paragraphs,
// website/call links, sign-off, then contact, copyright, page links and socials.
// Name and paragraphs must already be HTML-escaped (or trusted markup).
function thankYouEmail({ name, paragraphs }) {
    const font = "font-family:Arial,Helvetica,sans-serif;";
    const p = `margin:0 0 18px;${font}font-size:14px;line-height:24px;color:${NAVY};`;
    const small = `margin:0 0 14px;${font}font-size:13px;line-height:20px;color:${NAVY};`;
    const cta = `display:inline-block;padding-bottom:3px;border-bottom:1px solid ${NAVY};${font}font-size:14px;font-weight:bold;letter-spacing:0.3px;color:${NAVY};text-decoration:none;`;

    const footerLinks = FOOTER_LINKS.map(
        ({ label, href }) =>
            `<a href="${href}" target="_blank" style="color:${NAVY};text-decoration:none;">${label}</a>`
    ).join(`<span style="padding:0 8px;color:${NAVY};">|</span>`);

    const socials = SOCIAL_LINKS.map(
        ({ name: label, cid, href }) => `
                                    <td style="padding-right:10px;">
                                        <a href="${href}" target="_blank"><img src="cid:${cid}" width="34" height="34" alt="${label}" style="display:block;border:0;" /></a>
                                    </td>`
    ).join("");

    return `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
        <tr>
            <td style="padding:32px 24px;">
                <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
                    <tr>
                        <td style="padding-bottom:32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="vertical-align:middle;">
                                        <img src="cid:astro-logo" width="44" height="44" alt="Astro Aacharya" style="display:block;border:0;" />
                                    </td>
                                    <td style="vertical-align:middle;padding-left:10px;font-family:Georgia,'Times New Roman',serif;font-size:18px;letter-spacing:2px;color:${NAVY};">
                                        ASTRO AACHARYA
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style="${p}">Dear ${name},</p>
                            ${paragraphs.map((text) => `<p style="${p}">${text}</p>`).join("\n                            ")}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:4px 0 30px;">
                            <table role="presentation" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-right:20px;">
                                        <a href="${SITE_URL}" target="_blank" style="${cta}">VISIT OUR WEBSITE&nbsp;&nbsp;&rsaquo;</a>
                                    </td>
                                    <td>
                                        <a href="tel:${CONTACT_PHONE}" style="${cta}">CALL OUR TEAM&nbsp;&nbsp;&rsaquo;</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom:36px;">
                            <p style="${p}">Best regards,</p>
                            <p style="margin:0;${font}font-size:15px;font-weight:bold;color:${NAVY};">Team Astro Aacharya</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style="${small}">For any queries, connect with us at <a href="mailto:${CONTACT_EMAIL}" style="color:${NAVY};font-weight:bold;text-decoration:none;">${CONTACT_EMAIL}</a></p>
                            <p style="${small}margin-bottom:24px;">&copy; ${new Date().getFullYear()} Astro Aacharya. All Rights Reserved.</p>
                            <p style="${small}margin-bottom:24px;">${footerLinks}</p>
                            <p style="${small}">Follow us on</p>
                            <table role="presentation" cellpadding="0" cellspacing="0">
                                <tr>${socials}
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

// Confirmation sent to the person who filled the contact form. Name must already be HTML-escaped.
function confirmationEmail({ name }) {
    return thankYouEmail({
        name,
        paragraphs: [
            "Thank you for contacting Astro Aacharya.",
            "Every conversation helps us guide people better. Through astrology, vastu and spiritual guidance, we strive to bring clarity, balance and lasting positive change to the lives of those who seek it.",
            "We have received your message. Our team is reviewing the details you shared and will get back to you as soon as possible.",
            "If you need any assistance in the meantime, feel free to reach out to our team.",
        ],
    });
}

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            name,
            phone,
            service,
            message,
            captchaToken,
        } = body;
        const email = typeof body.email === "string" ? body.email.trim() : "";

        // Optional message: cap at the same 120-character limit as the form, escape for the email HTML
        const cleanMessage = escapeHtml(
            (typeof message === "string" ? message : "").trim().slice(0, 120)
        );

        if (
            !name ||
            !phone ||
            !email ||
            !service ||
            !captchaToken
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing fields",
                },
                { status: 400 }
            );
        }

        // Same rule as the form: letters of any language, spaces and . ' - only, at least two letters
        const cleanName = typeof name === "string" ? name.trim() : "";
        if (
            !/^[\p{L}\p{M}]+(?:[ .'’-]+[\p{L}\p{M}]+)*\.?$/u.test(cleanName) ||
            (cleanName.match(/\p{L}/gu) || []).length < 2
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please enter a valid name.",
                },
                { status: 400 }
            );
        }

        const isProduction = process.env.NODE_ENV === "production";

        if (isProduction) {
            const secret = process.env.RECAPTCHA_SECRET_KEY;

            if (!secret) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Captcha is not configured.",
                    },
                    { status: 500 }
                );
            }

            // Verify Google Recaptcha
            const verification = await fetch(
                "https://www.google.com/recaptcha/api/siteverify",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                        secret,
                        response: captchaToken,
                    }),
                }
            );

            const captcha = await verification.json();

            if (
                !captcha.success ||
                captcha.action !== "footer_contact" ||
                (typeof captcha.score === "number" && captcha.score < 0.3)
            ) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Captcha failed",
                    },
                    { status: 400 }
                );
            }
        }

        await transporter.sendMail({
            from: `"Website Contact Form" <${process.env.GMAIL_USER}>`,
            to: process.env.CONTACT_RECEIVER,
            replyTo: email,
            subject: "New Contact Form Submission",

            html: enquiryEmail({
                name: escapeHtml(name),
                phone: escapeHtml(phone),
                email: escapeHtml(email),
                service: escapeHtml(service),
                message: cleanMessage,
            }),

            attachments: [LOGO_ATTACHMENT],
        });

        // Confirmation to the visitor. The enquiry already reached the team, so a failure here
        // (e.g. a mistyped address) is logged rather than reported as a failed submission.
        try {
            await transporter.sendMail({
                from: `"Astro Aacharya" <${process.env.GMAIL_USER}>`,
                to: email,
                subject: "Thank you for reaching out - Astro Aacharya",
                html: confirmationEmail({ name: escapeHtml(name) }),
                attachments: [LOGO_ATTACHMENT, ...SOCIAL_ATTACHMENTS],
            });
        } catch (confirmErr) {
            console.error("Confirmation email failed:", confirmErr);
        }

        return NextResponse.json({
            success: true,
        });

    } catch (err) {

        console.error(err);

        return NextResponse.json(
            {
                success: false,
                message: "Server Error",
            },
            { status: 500 }
        );
    }
}
