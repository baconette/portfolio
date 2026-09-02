"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { trackEvent } from "@/lib/analytics";
import { unlockWork, type WorkAuthState } from "./actions";

const initialState: WorkAuthState = { status: "idle" };

export const WorkPasswordForm = () => {
    const [state, formAction, isPending] = useActionState(unlockWork, initialState);

    useEffect(() => {
        if (state.status === "error") {
            trackEvent("work_unlock_attempt", { result: "failure" });
        }
    }, [state]);

    return (
        <form action={formAction} className="flex flex-col gap-5">
            <Input name="password" type="password" label="Password" placeholder="Enter password" isRequired />

            {state.status === "error" && (
                <p className="text-sm text-error-primary" role="status">
                    {state.message}
                </p>
            )}

            <Button type="submit" color="primary" size="lg" isLoading={isPending} className="self-start">
                Unlock
            </Button>
        </form>
    );
};
