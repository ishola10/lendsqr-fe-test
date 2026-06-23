"use client";

import { useState, useEffect } from "react";
import { DetailItem } from "@/components/common/DetailItem";
import { User } from "@/types/user";
import styles from "./UserDetails.module.scss";

export const UserDetailsClient = ({ user: initialUser }: { user: User }) => {
    const [user, setUser] = useState<User>(() => {
        if (typeof window === "undefined") return initialUser;

        const savedOverrides = localStorage.getItem("lendsqr_status_overrides");
        if (!savedOverrides) return initialUser;

        try {
            const overrides = JSON.parse(savedOverrides) as Record<string, string>;
            if (!overrides[initialUser.id]) return initialUser;
            return { ...initialUser, status: overrides[initialUser.id] };
        } catch {
            return initialUser;
        }
    });
    const [activeTab, setActiveTab] = useState("General Details");

    const updateStatus = (newStatus: string) => {
        const savedOverrides = localStorage.getItem("lendsqr_status_overrides");
        const overrides = savedOverrides ? JSON.parse(savedOverrides) : {};
        overrides[initialUser.id] = newStatus;
        localStorage.setItem("lendsqr_status_overrides", JSON.stringify(overrides));
        setUser(prev => ({ ...prev, status: newStatus }));
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem(`lendsqr_user_${user.id}`, JSON.stringify(user));
        }
    }, [user]);

    const tabs = ["General Details", "Documents", "Bank Details", "Loans", "Savings", "App and System"];

    const renderTabContent = () => {
        if (activeTab === "General Details") {
            return (
                <>
                    <section className={styles.infoSection}>
                        <h4>Personal Information</h4>
                        <div className={styles.grid}>
                            <DetailItem label="Full Name" value={user.profile?.fullName} />
                            <DetailItem label="Phone Number" value={user.phoneNumber} />
                            <DetailItem label="Email Address" value={user.email} />
                            <DetailItem label="BVN" value={user.profile?.bvn || "N/A"} />
                            <DetailItem label="Gender" value={user.profile?.gender} />
                            <DetailItem label="Marital Status" value={user.profile?.maritalStatus} />
                            <DetailItem label="Children" value={user.profile?.children || "None"} />
                            <DetailItem label="Type of Residence" value={user.profile?.residence} />
                        </div>
                    </section>

                    <section className={styles.infoSection}>
                        <h4>Education and Employment</h4>
                        <div className={styles.grid}>
                            <DetailItem label="Level of Education" value={user.education?.level} />
                            <DetailItem label="Employment Status" value={user.education?.employmentStatus} />
                            <DetailItem label="Sector of Employment" value={user.education?.sector} />
                            <DetailItem label="Duration of Employment" value={user.education?.duration} />
                            <DetailItem label="Office Email" value={user.education?.officeEmail} />
                            <DetailItem label="Monthly Income" value={user.education?.monthlyIncome ? `₦${user.education.monthlyIncome[0]?.toLocaleString()}.00 - ₦${user.education.monthlyIncome[1]?.toLocaleString()}.00` : "N/A"} />
                            <DetailItem label="Loan Repayment" value={user.education?.loanRepayment ? `₦${Number(user.education.loanRepayment).toLocaleString()}` : "N/A"} />
                        </div>
                    </section>

                    <section className={styles.infoSection}>
                        <h4>Socials</h4>
                        <div className={styles.grid}>
                            <DetailItem label="Twitter" value={user.socials?.twitter} />
                            <DetailItem label="Facebook" value={user.socials?.facebook} />
                            <DetailItem label="Instagram" value={user.socials?.instagram} />
                        </div>
                    </section>

                    <section className={styles.infoSection}>
                        <h4>Guarantor</h4>
                        <div className={styles.grid}>
                            <DetailItem label="Full Name" value={user.guarantor?.fullName} />
                            <DetailItem label="Phone Number" value={user.guarantor?.phoneNumber} />
                            <DetailItem label="Email Address" value={user.guarantor?.email} />
                            <DetailItem label="Relationship" value={user.guarantor?.relationship} />
                        </div>
                    </section>
                </>
            );
        }

        if (activeTab === "Documents") {
            return (
                <section className={styles.infoSection}>
                    <h4>Identity and Verification</h4>
                    <div className={styles.grid}>
                        <DetailItem label="User ID" value={user.id} />
                        <DetailItem label="BVN" value={user.profile?.bvn || "N/A"} />
                        <DetailItem label="Full Name" value={user.profile?.fullName} />
                        <DetailItem label="Email Address" value={user.email} />
                    </div>
                </section>
            );
        }

        if (activeTab === "Bank Details") {
            return (
                <section className={styles.infoSection}>
                    <h4>Bank Information</h4>
                    <div className={styles.grid}>
                        <DetailItem label="Bank Name" value={user.account?.bank} />
                        <DetailItem label="Account Number" value={user.account?.accountNumber} />
                        <DetailItem label="Currency" value={user.account?.currency || "NGN"} />
                        <DetailItem
                            label="Current Balance"
                            value={`₦${Number(user.account?.balance || 0).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}`}
                        />
                    </div>
                </section>
            );
        }

        if (activeTab === "Loans") {
            return (
                <section className={styles.infoSection}>
                    <h4>Loan Overview</h4>
                    <div className={styles.grid}>
                        <DetailItem label="Loan Repayment" value={user.education?.loanRepayment ? `₦${Number(user.education.loanRepayment).toLocaleString()}` : "N/A"} />
                        <DetailItem label="Employment Status" value={user.education?.employmentStatus} />
                        <DetailItem label="Sector" value={user.education?.sector} />
                        <DetailItem label="Monthly Income" value={user.education?.monthlyIncome ? `₦${user.education.monthlyIncome[0]?.toLocaleString()} - ₦${user.education.monthlyIncome[1]?.toLocaleString()}` : "N/A"} />
                    </div>
                </section>
            );
        }

        if (activeTab === "Savings") {
            return (
                <section className={styles.infoSection}>
                    <h4>Savings Overview</h4>
                    <div className={styles.grid}>
                        <DetailItem label="Available Balance" value={`₦${Number(user.account?.balance || 0).toLocaleString()}`} />
                        <DetailItem label="Currency" value={user.account?.currency || "NGN"} />
                        <DetailItem label="Account Number" value={user.account?.accountNumber} />
                        <DetailItem label="Bank Name" value={user.account?.bank} />
                    </div>
                </section>
            );
        }

        return (
            <section className={styles.infoSection}>
                <h4>App and System</h4>
                <div className={styles.grid}>
                    <DetailItem label="Status" value={user.status || "Active"} />
                    <DetailItem label="Organization" value={user.orgName || user.organization} />
                    <DetailItem label="Date Joined" value={user.createdAt || user.dateJoined} />
                    <DetailItem label="Last Active" value={user.lastActiveDate} />
                    <DetailItem label="User Handle" value={user.userName || user.username} />
                </div>
            </section>
        );
    };

    return (
        <>
            <div className={styles.header}>
                <h2>User Details</h2>
                <div className={styles.actions}>
                    <button className={styles.blacklistBtn} onClick={() => updateStatus("Blacklisted")}>Blacklist User</button>
                    <button className={styles.activateBtn} onClick={() => updateStatus("Active")}>Activate User</button>
                </div>
            </div>

            <div className={styles.profileBar}>
                <div className={styles.summaryInfo}>
                    <div className={styles.avatarCircle}>
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#213F7D" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <div className={styles.userNameId}>
                        <h3>{user.profile?.fullName || user.username || "User"}</h3>
                        <p>{user.id}</p>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.userTier}>
                        <p>User&apos;s Tier</p>
                        <div className={styles.stars}>
                            <StarIcon filled />
                            <StarIcon />
                            <StarIcon />
                        </div>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.bankInfo}>
                        <h3>₦{user.account?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}</h3>
                        <p>{user.account?.accountNumber}/{user.account?.bank}</p>
                    </div>
                </div>

                <div className={styles.tabs}>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.mainCard}>
                {renderTabContent()}
            </div>
        </>
    );
};

const StarIcon = ({ filled }: { filled?: boolean }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#E9B200" : "none"} stroke="#E9B200" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);
