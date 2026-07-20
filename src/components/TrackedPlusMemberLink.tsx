"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackPlusMemberLinkClick } from "@/lib/analytics";

type TrackedPlusMemberLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
    placement: "header" | "footer";
};

export function TrackedPlusMemberLink({
    placement,
    children,
    onClick,
    ...props
}: TrackedPlusMemberLinkProps) {
    return (
        <Link
            href="/plus/library/"
            {...props}
            onClick={(event) => {
                trackPlusMemberLinkClick(placement);
                onClick?.(event);
            }}
        >
            {children}
        </Link>
    );
}
