import {
    createSeoCategoryMetadata,
    SeoItemCategoryPage,
} from "@/components/SeoItemCategoryPage";
import { bedMobilityCategory } from "@/lib/seoItemCategories";

export const metadata = createSeoCategoryMetadata(bedMobilityCategory);

export default function Page() {
    return <SeoItemCategoryPage config={bedMobilityCategory} />;
}
