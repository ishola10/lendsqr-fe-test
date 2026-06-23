"use client";

import { useSearchParams } from "next/navigation";
import { UserTable } from "@/components/features/users/UserTable";
import { StatCard } from "@/components/common/StatCard";
import { useUsers } from "@/hooks/useUsers";
import styles from "./users.module.scss";
import { StatSkeleton, TableSkeleton } from "@/components/common/SkeletonLoader";

export function UsersContent() {
    const { users, loading, error } = useUsers();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    const filteredUsers = users.filter((user) => {
        if (!searchQuery) return true;
        const org = (user.orgName || user.organization || "").toLowerCase();
        const username = (user.userName || user.username || "").toLowerCase();
        const email = (user.email || "").toLowerCase();
        return (
            org.includes(searchQuery) ||
            username.includes(searchQuery) ||
            email.includes(searchQuery)
        );
    });

    const activeUsersCount = users.filter((user) => {
        const normalizedStatus = String(user.status || "Active").toLowerCase();
        return normalizedStatus === "active";
    }).length;

    const usersWithLoansCount = users.filter((user) => Number(user.education?.loanRepayment || 0) > 0).length;
    const usersWithSavingsCount = users.filter((user) => Number(user.account?.balance || 0) > 0).length;

    if (loading) {
        return (
            <>
                <StatSkeleton />
                <TableSkeleton />
            </>
        );
    }

    if (error) {
        return <p className={styles.error}>Error: {error}</p>;
    }

    return (
        <>
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
                        value={activeUsersCount.toLocaleString()}
                        iconBgColor="rgba(87, 24, 255, 0.1)"
                    />
                    <StatCard
                        icon="/icons/users-loans-stats.svg"
                        label="Users with Loans"
                        value={usersWithLoansCount.toLocaleString()}
                        iconBgColor="rgba(245, 95, 68, 0.1)"
                    />
                    <StatCard
                        icon="/icons/users-savings-stats.svg"
                        label="Users with Savings"
                        value={usersWithSavingsCount.toLocaleString()}
                        iconBgColor="rgba(255, 51, 102, 0.1)"
                    />
            </div>

            <UserTable users={filteredUsers} />
        </>
    );
}
