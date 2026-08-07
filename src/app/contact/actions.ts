"use server";

import { Resend } from "resend";

const RECIPIENT_EMAIL = "erika.aldrich.murga@gmail.com";

export interface ContactFormState {
    status: "idle" | "success" | "error";
    message?: string;
}

export async function sendContactMessage(_prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
    // Honeypot: real users never see or fill this field, so a non-empty value means a bot. Pretend
    // success rather than surfacing an error, so it has nothing to learn from and adapt around.
    const honeypot = formData.get("company")?.toString().trim() ?? "";
    if (honeypot) {
        return { status: "success", message: "Thanks for reaching out — I'll get back to you soon." };
    }

    const fullName = formData.get("fullName")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const message = formData.get("message")?.toString().trim() ?? "";

    if (!fullName || !email || !message) {
        return { status: "error", message: "Please fill in every field." };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("RESEND_API_KEY is not set; contact form submission was not sent.");
        return { status: "error", message: "Something went wrong on our end, please try again later." };
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
        from: "Erika Aldrich Murga Portfolio <no-reply@erikamurga.com>",
        to: RECIPIENT_EMAIL,
        replyTo: email,
        subject: `New message from ${fullName}`,
        text: `From: ${fullName} <${email}>\n\n${message}`,
    });

    if (error) {
        console.error("Resend error:", error);
        return { status: "error", message: "Something went wrong on our end, please try again later." };
    }

    return { status: "success", message: "Thanks for reaching out — I'll get back to you soon." };
}
