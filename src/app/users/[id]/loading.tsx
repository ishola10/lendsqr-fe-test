import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DetailsSkeleton } from "@/components/common/SkeletonLoader";
import styles from "./UserDetails.module.scss";

export default function Loading() {
    return (
        <DashboardLayout>
            <div className={styles.container}>
                <DetailsSkeleton />
            </div>
        </DashboardLayout>
    );
}
