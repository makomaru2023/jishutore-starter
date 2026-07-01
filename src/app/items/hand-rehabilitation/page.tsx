import {
    createSeoCategoryMetadata,
    SeoItemCategoryPage,
} from "@/components/SeoItemCategoryPage";
import { handRehabilitationCategory } from "@/lib/seoItemCategories";

export const metadata = createSeoCategoryMetadata(handRehabilitationCategory);

export default function Page() {
    return <SeoItemCategoryPage config={handRehabilitationCategory} />;
}
