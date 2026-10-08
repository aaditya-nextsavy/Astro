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

// Shared card: logo header, body, optional "Follow us on" footer.
// Table layout + inline styles so it renders in mail clients.
function emailShell({ body, withSocials = false }) {
    const socials = withSocials
        ? `
                    <tr>
                        <td style="padding:24px 32px 32px;border-top:1px solid ${BORDER};">
                            <p style="margin:0 0 12px;font-size:13px;font-weight:bold;color:${NAVY};">Follow us on</p>
                            <table role="presentation" cellpadding="0" cellspacing="0">
                                <tr>
                                    ${SOCIAL_LINKS.map(
                                        ({ name, cid, href }) => `
                                    <td style="padding-right:10px;">
                                        <a href="${href}" target="_blank"><img src="cid:${cid}" width="40" height="40" alt="${name}" style="display:block;border:0;" /></a>
                                    </td>`
                                    ).join("")}
                                </tr>
                            </table>
                        </td>
                    </tr>`
        : "";

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
                    </tr>${socials}
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

// Confirmation sent to the person who filled the form. Name must already be HTML-escaped.
function confirmationEmail({ name }) {
    const p = `margin:0 0 16px;font-size:14px;line-height:24px;color:${TEXT};`;

    return emailShell({
        withSocials: true,
        body: `
            <h1 style="margin:0 0 24px;font-size:20px;font-weight:bold;color:${NAVY};">Thank you for reaching out</h1>
            <p style="${p}">Dear ${name},</p>
            <p style="${p}">Thank you for contacting Astro Aacharya. We've received your enquiry and our team is reviewing the details. We'll get back to you shortly with a response.</p>
            <p style="margin:0;font-size:14px;line-height:24px;color:${TEXT};">Best regards,<br />Astro Aacharya</p>`,
    });
}

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            name,
            phone,
            email,
            service,
            message,
            captchaToken,
        } = body;

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
