"use client";

import Image from "next/image";
import styles from "./Topbar.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface TopbarProps {
    onMenuClick?: () => void;
}

export const Topbar = ({ onMenuClick }: TopbarProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term);

        if (timer) clearTimeout(timer);

        const newTimer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (term) {
                params.set("search", term);
            } else {
                params.delete("search");
            }
            router.push(`?${params.toString()}`);
        }, 300);

        setTimer(newTimer);
    }, [router, searchParams, timer]);

    return (
        <header className={styles.topbar}>
            <div className={styles.leftSection}>
                <button className={styles.menuToggle} onClick={onMenuClick}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21M3 6H21M3 18H21" stroke="#213F7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className={styles.logoContainer}>
                    <Image src="/logo.svg" alt="Lendsqr Logo" width={145} height={30} priority />
                </div>
            </div>

            <div className={styles.searchContainer}>
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search for anything"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button className={styles.searchButton}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.48 11.67L10.39 8.58C11.01 7.68 11.37 6.6 11.37 5.44C11.37 2.44 8.93 0 5.94 0C2.95 0 0.5 2.44 0.5 5.44C0.5 8.44 2.94 10.88 5.94 10.88C7.1 10.88 8.18 10.51 9.08 9.9L12.17 12.98C12.35 13.16 12.58 13.25 12.82 13.25C13.06 13.25 13.29 13.16 13.47 12.98C13.84 12.62 13.84 12.03 13.48 11.67ZM5.94 9.13C3.91 9.13 2.25 7.48 2.25 5.44C2.25 3.4 3.9 1.75 5.94 1.75C7.98 1.75 9.63 3.4 9.63 5.44C9.63 7.48 7.97 9.13 5.93 9.13H5.94Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={styles.navActions}>
                <a href="#" className={styles.docsLink}>Docs</a>
                <button className={styles.notificationBtn}>
                    <svg width="20" height="22" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 14V11.5C16.5 8.35 14.84 5.61 11.89 4.91V4.22C11.89 2.62 10.59 1.32 8.99 1.32C7.39 1.32 6.09 2.62 6.09 4.22V4.91C3.15 5.61 1.48 8.34 1.48 11.5V14L0 15.54V16.32H18V15.54L16.5 14ZM8.99 19.32C10.09 19.32 10.99 18.42 10.99 17.32H6.99C6.99 18.42 7.89 19.32 8.99 19.32Z" fill="#213F7D" />
                    </svg>
                </button>
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <Image src="/images/avatar.png" alt="User Avatar" width={33} height={33} className={styles.avatarImg} />
                    </div>
                    <span className={styles.profileName}>Adedeji</span>
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0.5L5 5.5L10 0.5H0Z" fill="#213F7D" />
                    </svg>
                </div>
            </div>
        </header>
    );
};
