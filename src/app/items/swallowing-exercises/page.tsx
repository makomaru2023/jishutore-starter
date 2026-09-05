import {
    createSwallowingMetadata,
    SwallowingExercisesPage,
} from "@/components/SwallowingCategoryPage";

export const metadata = createSwallowingMetadata();

export default function Page() {
    return <SwallowingExercisesPage />;
}
