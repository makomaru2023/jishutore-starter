"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackB2bContactClick } from "@/lib/analytics";

type TrackedB2bContactLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    placement: string;
    children: ReactNode;
};

export function TrackedB2bContactLink({
    placement,
    children,
    onClick,
    ...props
}: TrackedB2bContactLinkProps) {
    return (
        <a
            {...props}
            onClick={(event) => {
                trackB2bContactClick(placement);
                onClick?.(event);
            }}
        >
            {children}
        </a>
    );
}
