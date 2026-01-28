import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { StatusTag } from "@/components/common/StatusTag";
import { Pagination } from "@/components/common/Pagination";
import { UserActionPopup } from "./UserActionPopup";
import { UserFilterPopup } from "./UserFilterPopup";
import { User } from "@/types/user";
import styles from "./UserTable.module.scss";

type Status = "Active" | "Inactive" | "Pending" | "Blacklisted";

interface UserTableProps {
    users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const [statusOverrides, setStatusOverrides] = useState<Record<string, Status>>({});

    const tableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedOverrides = localStorage.getItem("lendsqr_status_overrides");
        if (savedOverrides) {
            setStatusOverrides(JSON.parse(savedOverrides));
        }
    }, []);

    useEffect(() => {
        if (Object.keys(statusOverrides).length > 0) {
            localStorage.setItem("lendsqr_status_overrides", JSON.stringify(statusOverrides));
        }
    }, [statusOverrides]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
                setActiveActionMenuId(null);
                setIsFilterPopupOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const processedUsers = users.map(user => ({
        ...user,
        status: statusOverrides[user.id] || user.status
    }));

    const currentItems = processedUsers.slice(indexOfFirstItem, indexOfLastItem);

    const onPageChange = (page: number) => setCurrentPage(page);
    const onItemsPerPageChange = (items: number) => {
        setItemsPerPage(items);
        setCurrentPage(1);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "N/A";

        if (dateString.includes('-')) {
            const parts = dateString.split('-');
            if (parts.length >= 2) {
                const year = parts[0];
                const monthNum = parseInt(parts[1]);
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const month = months[monthNum - 1] || parts[1];

                return `${month} ${year}`;
            }
        }

        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString;

            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
        } catch {
            return dateString;
        }
    };

    const cleanUsername = (username?: string, email?: string) => {
        return username || (email ? email.split('@')[0] : "user");
    };

    const handleViewDetails = (id: string) => {
        router.push(`/users/${id}`);
        setActiveActionMenuId(null);
    };

    const toggleActionMenu = (id: string) => {
        setActiveActionMenuId(activeActionMenuId === id ? null : id);
    };

    const toggleFilterPopup = () => {
        setIsFilterPopupOpen(!isFilterPopupOpen);
    };

    return (
        <div className={styles.container} ref={tableRef}>
            <div className={styles.tableWrapper}>
                <table className={styles.userTable}>
                    <thead>
                        <tr>
                            <th className={styles.relativeTh}>
                                <div className={styles.headerContent} onClick={toggleFilterPopup}>
                                    ORGANIZATION
                                    <FilterIcon />
                                </div>
                                {isFilterPopupOpen && (
                                    <UserFilterPopup
                                        onReset={() => setIsFilterPopupOpen(false)}
                                        onFilter={() => setIsFilterPopupOpen(false)}
                                    />
                                )}
                            </th>
                            <th>
                                <div className={styles.headerContent} onClick={toggleFilterPopup}>
                                    USERNAME
                                    <FilterIcon />
                                </div>
                            </th>
                            <th>
                                <div className={styles.headerContent} onClick={toggleFilterPopup}>
                                    EMAIL
                                    <FilterIcon />
                                </div>
                            </th>
                            <th>
                                <div className={styles.headerContent} onClick={toggleFilterPopup}>
                                    PHONE NUMBER
                                    <FilterIcon />
                                </div>
                            </th>
                            <th>
                                <div className={styles.headerContent} onClick={toggleFilterPopup}>
                                    DATE JOINED
                                    <FilterIcon />
                                </div>
                            </th>
                            <th>
                                <div className={styles.headerContent} onClick={toggleFilterPopup}>
                                    STATUS
                                    <FilterIcon />
                                </div>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((user) => (
                            <tr key={user.id}>
                                <td>{user.orgName || user.organization}</td>
                                <td>{cleanUsername(user.userName || user.username, user.email)}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{formatDate(user.createdAt || user.dateJoined)}</td>
                                <td>
                                    <StatusTag status={(user.status as Status) || "Active"} />
                                </td>
                                <td className={styles.relativeTd}>
                                    <button className={styles.actionBtn} onClick={() => toggleActionMenu(user.id)}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 13.5C11.1046 13.5 12 12.6046 12 11.5C12 10.3954 11.1046 9.5 10 9.5C8.89543 9.5 8 10.3954 8 11.5C8 12.6046 8.89543 13.5 10 13.5Z" fill="#545F7D" />
                                            <path d="M10 7.5C11.1046 7.5 12 6.60457 12 5.5C12 4.39543 11.1046 3.5 10 3.5C8.89543 3.5 8 4.39543 8 5.5C8 6.60457 8.89543 7.5 10 7.5Z" fill="#545F7D" />
                                            <path d="M10 19.5C11.1046 19.5 12 18.6046 12 17.5C12 16.3954 11.1046 15.5 10 15.5C8.89543 15.5 8 16.3954 8 17.5C8 18.6046 8.89543 19.5 10 19.5Z" fill="#545F7D" />
                                        </svg>
                                    </button>
                                    {activeActionMenuId === user.id && (
                                        <UserActionPopup
                                            userId={user.id}
                                            onViewDetails={handleViewDetails}
                                            onBlacklist={(id) => {
                                                setStatusOverrides({ ...statusOverrides, [id]: "Blacklisted" });
                                                setActiveActionMenuId(null);
                                            }}
                                            onActivate={(id) => {
                                                setStatusOverrides({ ...statusOverrides, [id]: "Active" });
                                                setActiveActionMenuId(null);
                                            }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                totalItems={users.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
                onItemsPerPageChange={onItemsPerPageChange}
            />
        </div>
    );
};

const FilterIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer" }}>
        <path d="M6.22222 11.5556H9.77778V10.2222H6.22222V11.5556ZM0 4.44444V5.77778H16V4.44444H0ZM2.66667 8.66667H13.3333V7.33333H2.66667V8.66667Z" fill="#545F7D" />
    </svg>
);
