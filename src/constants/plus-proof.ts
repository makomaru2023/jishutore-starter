const parseOptionalProofCount = (value: string | undefined): number | null => {
    const normalized = value?.trim();
    if (!normalized || !/^\d+$/.test(normalized)) return null;

    const parsed = Number(normalized);
    return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
};

export const PLUS_PROOF_TOTAL_DL = parseOptionalProofCount(
    process.env.NEXT_PUBLIC_PROOF_TOTAL_DL,
);
export const PLUS_PROOF_LINE_FRIENDS = parseOptionalProofCount(
    process.env.NEXT_PUBLIC_PROOF_LINE_FRIENDS,
);
