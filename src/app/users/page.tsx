import { Suspense } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UsersContent } from "./UsersContent";
import styles from "./users.module.scss";

export default function UsersPage() {
    return (
        <DashboardLayout>
            <div className={styles.usersPage}>
                <h1 className={styles.pageTitle}>Users</h1>

                <Suspense fallback={null}>
                    <UsersContent />
                </Suspense>
            </div>
        </DashboardLayout>
    );
}
