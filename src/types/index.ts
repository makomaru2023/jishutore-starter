export interface Item {
  id: string;
  tier: string;
  category: string;
  title: string;
  titleJa?: string;
  previewSrc: string;
  fileHref: string;
  fileName: string;
  description?: string;
  exercisePoint?: string;
  targetCondition?: string;
  difficulty?: string;
}
