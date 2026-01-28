"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/common/StatCard";
import { UserTable } from "@/components/features/users/UserTable";
import { useUsers } from "@/hooks/useUsers";
import styles from "./users.module.scss";

import { StatSkeleton, TableSkeleton } from "@/components/common/SkeletonLoader";

import { useSearchParams } from "next/navigation";

export default function UsersPage() {
    const { users, loading, error } = useUsers();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    const filteredUsers = users.filter((user) => {
        if (!searchQuery) return true;
        const org = (user.orgName || user.organization || "").toLowerCase();
        const username = (user.userName || user.username || "").toLowerCase();
        const email = (user.email || "").toLowerCase();
        return org.includes(searchQuery) || username.includes(searchQuery) || email.includes(searchQuery);
    });

    if (loading) {
        return (
            <DashboardLayout>
                <div className={styles.usersPage}>
                    <h1 className={styles.pageTitle}>Users</h1>
                    <StatSkeleton />
                    <TableSkeleton />
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div className={styles.usersPage}>
                    <h1 className={styles.pageTitle}>Users</h1>
                    <p className={styles.error}>Error: {error}</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className={styles.usersPage}>
                <h1 className={styles.pageTitle}>Users</h1>

                <div className={styles.statsGrid}>
                    <StatCard
                        icon="/icons/users-stats.svg"
                        label="Users"
                        value={users.length.toLocaleString()}
                        iconBgColor="rgba(223, 24, 255, 0.1)"
                    />
                    <StatCard
                        icon="/icons/active-users-stats.svg"
                        label="Active Users"
                        value={users.length.toLocaleString()}
                        iconBgColor="rgba(87, 24, 255, 0.1)"
                    />
                    <StatCard
                        icon="/icons/users-loans-stats.svg"
                        label="Users with Loans"
                        value="12,453"
                        iconBgColor="rgba(245, 95, 68, 0.1)"
                    />
                    <StatCard
                        icon="/icons/users-savings-stats.svg"
                        label="Users with Savings"
                        value="102,453"
                        iconBgColor="rgba(255, 51, 102, 0.1)"
                    />
                </div>

                <UserTable users={filteredUsers} />
            </div>
        </DashboardLayout>
    );
}
