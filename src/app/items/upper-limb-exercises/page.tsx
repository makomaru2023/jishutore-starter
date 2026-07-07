import {
    createSeoCategoryMetadata,
    SeoItemCategoryPage,
} from "@/components/SeoItemCategoryPage";
import { upperLimbExercisesCategory } from "@/lib/seoItemCategories";

export const metadata = createSeoCategoryMetadata(upperLimbExercisesCategory);

export default function Page() {
    return <SeoItemCategoryPage config={upperLimbExercisesCategory} />;
}
