'use client';

import { sendGAEvent } from '@next/third-parties/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type EventName = 'sponsor_contact_click' | 'sponsor_menu_click';

type CommonProps = {
    eventName: EventName;
    location: string;
    buttonText: string;
    className?: string;
    children: React.ReactNode;
};

type MailtoProps = CommonProps & {
    href: string;
    target?: '_blank';
};

type AnchorProps = CommonProps & {
    anchorHref: string;
};

function isAnchor(p: MailtoProps | AnchorProps): p is AnchorProps {
    return 'anchorHref' in p;
}

const PAGE_TITLE = '広告掲載・スポンサー募集｜自主トレ素材庫';

export function SponsorCtaButton(props: MailtoProps | AnchorProps) {
    const pathname = usePathname();

    const handleClick = () => {
        sendGAEvent('event', props.eventName, {
            location: props.location,
            button_text: props.buttonText,
            page_path: pathname ?? '/sponsor',
            page_title: PAGE_TITLE,
        });
    };

    if (isAnchor(props)) {
        return (
            <Link
                href={props.anchorHref}
                onClick={handleClick}
                className={props.className}
            >
                {props.children}
            </Link>
        );
    }

    return (
        <a
            href={props.href}
            onClick={handleClick}
            className={props.className}
        >
            {props.children}
        </a>
    );
}
