"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackPlusResourceClick } from "@/lib/analytics";

type TrackedPlusResourceLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    placement: string;
    resource: "powerpoint_sample" | "fee_check_free";
    children: ReactNode;
};

export function TrackedPlusResourceLink({
    placement,
    resource,
    children,
    onClick,
    ...props
}: TrackedPlusResourceLinkProps) {
    return (
        <a
            {...props}
            onClick={(event) => {
                trackPlusResourceClick(resource, placement);
                onClick?.(event);
            }}
        >
            {children}
        </a>
    );
}
