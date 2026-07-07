import {
    createSeoCategoryMetadata,
    SeoItemCategoryPage,
} from "@/components/SeoItemCategoryPage";
import { trunkExercisesCategory } from "@/lib/seoItemCategories";

export const metadata = createSeoCategoryMetadata(trunkExercisesCategory);

export default function Page() {
    return <SeoItemCategoryPage config={trunkExercisesCategory} />;
}
