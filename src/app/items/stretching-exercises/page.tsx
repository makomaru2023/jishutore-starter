import {
    createSeoCategoryMetadata,
    SeoItemCategoryPage,
} from "@/components/SeoItemCategoryPage";
import { stretchingExercisesCategory } from "@/lib/seoItemCategories";

export const metadata = createSeoCategoryMetadata(stretchingExercisesCategory);

export default function Page() {
    return <SeoItemCategoryPage config={stretchingExercisesCategory} />;
}
