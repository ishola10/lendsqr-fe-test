import { Suspense } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UsersContent } from "./UsersContent";
import { StatSkeleton, TableSkeleton } from "@/components/common/SkeletonLoader";
import styles from "./users.module.scss";

export const dynamic = "force-dynamic";

export default function UsersPage() {
    return (
        <DashboardLayout>
            <div className={styles.usersPage}>
                <h1 className={styles.pageTitle}>Users</h1>

                <Suspense fallback={<>
                    <StatSkeleton />
                    <TableSkeleton />
                </>}>
                    <UsersContent />
                </Suspense>
            </div>
        </DashboardLayout>
    );
}
