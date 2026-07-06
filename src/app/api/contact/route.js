import { NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            name,
            phone,
            email,
            service,
            captchaToken,
        } = body;

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

            html: `
                <h2>New Enquiry</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Phone:</strong> ${phone}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Service:</strong> ${service}</p>
            `,
        });

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
