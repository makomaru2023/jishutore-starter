export type PlusRoadmapItem = {
    label: string;
    topics: readonly string[];
    count?: number;
};

/**
 * 運営者が内容と追加時期を確定した項目だけを入れる。
 * 未確定の数字や予定をLPに出さないため、初期状態は空にしている。
 */
export const PLUS_ROADMAP: readonly PlusRoadmapItem[] = [];
