import {
    createSeoCategoryMetadata,
    SeoItemCategoryPage,
} from "@/components/SeoItemCategoryPage";
import { strokeExercisesCategory } from "@/lib/seoItemCategories";

export const metadata = createSeoCategoryMetadata(strokeExercisesCategory);

export default function Page() {
    return <SeoItemCategoryPage config={strokeExercisesCategory} />;
}
