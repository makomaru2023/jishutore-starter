import {
    createSeoCategoryMetadata,
    SeoItemCategoryPage,
} from "@/components/SeoItemCategoryPage";
import { lowerLimbExercisesCategory } from "@/lib/seoItemCategories";

export const metadata = createSeoCategoryMetadata(lowerLimbExercisesCategory);

export default function Page() {
    return <SeoItemCategoryPage config={lowerLimbExercisesCategory} />;
}
