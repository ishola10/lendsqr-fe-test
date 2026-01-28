import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { fetchUserById } from "@/lib/api";
import { UserDetailsClient } from "./UserDetailsClient";
import Link from "next/link";
import styles from "./UserDetails.module.scss";

export default async function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await fetchUserById(id);

    if (!user) {
        return (
            <DashboardLayout>
                <div style={{ padding: '30px' }}>User not found</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <Link href="/users" className={styles.backBtn}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#545F7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to Users
                </Link>

                <UserDetailsClient user={user} />
            </div>
        </DashboardLayout>
    );
}
