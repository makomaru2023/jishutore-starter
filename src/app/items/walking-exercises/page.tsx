import {
    createSeoCategoryMetadata,
    SeoItemCategoryPage,
} from "@/components/SeoItemCategoryPage";
import { walkingExercisesCategory } from "@/lib/seoItemCategories";

export const metadata = createSeoCategoryMetadata(walkingExercisesCategory);

export default function Page() {
    return <SeoItemCategoryPage config={walkingExercisesCategory} />;
}
