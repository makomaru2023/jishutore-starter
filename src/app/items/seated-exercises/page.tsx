import {
    createSeoCategoryMetadata,
    SeoItemCategoryPage,
} from "@/components/SeoItemCategoryPage";
import { seatedExercisesCategory } from "@/lib/seoItemCategories";

export const metadata = createSeoCategoryMetadata(seatedExercisesCategory);

export default function Page() {
    return <SeoItemCategoryPage config={seatedExercisesCategory} />;
}
