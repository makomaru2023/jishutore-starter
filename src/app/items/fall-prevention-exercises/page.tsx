import {
    createSeoCategoryMetadata,
    SeoItemCategoryPage,
} from "@/components/SeoItemCategoryPage";
import { fallPreventionCategory } from "@/lib/seoItemCategories";

export const metadata = createSeoCategoryMetadata(fallPreventionCategory);

export default function Page() {
    return <SeoItemCategoryPage config={fallPreventionCategory} />;
}
