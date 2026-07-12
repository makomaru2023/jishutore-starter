"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackLineClick } from "@/lib/analytics";

type TrackedLineLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    placement: string;
    children: ReactNode;
};

export function TrackedLineLink({ placement, children, onClick, ...props }: TrackedLineLinkProps) {
    return (
        <a
            {...props}
            onClick={(event) => {
                trackLineClick(placement);
                onClick?.(event);
            }}
        >
            {children}
        </a>
    );
}
