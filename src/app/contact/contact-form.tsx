"use client";

import { useActionState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { sendContactMessage, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

export const ContactForm = () => {
    const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);

    return (
        <form action={formAction} className="flex flex-col gap-5">
            {/* Honeypot: real users never see or fill this; bots that auto-fill every field trip it. */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <Input name="fullName" label="Full name" placeholder="Ray-Bernice Eames" isRequired />
            <Input name="email" type="email" label="Email" placeholder="ray@eames.com" isRequired />
            <TextArea name="message" label="Message" placeholder="Tell me about your project..." rows={6} isRequired />

            {state.status !== "idle" && (
                <p className={state.status === "success" ? "text-sm text-success-primary" : "text-sm text-error-primary"} role="status">
                    {state.message}
                </p>
            )}

            <Button type="submit" color="primary" size="lg" isLoading={isPending} className="self-start">
                Send message
            </Button>
        </form>
    );
};
