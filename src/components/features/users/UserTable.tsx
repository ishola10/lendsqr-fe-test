import { KeyboardEvent, MouseEvent, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { StatusTag } from "@/components/common/StatusTag";
import { Pagination } from "@/components/common/Pagination";
import { UserActionPopup } from "./UserActionPopup";
import { UserFilterPopup, UserFilters } from "./UserFilterPopup";
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
    const [statusOverrides, setStatusOverrides] = useState<Record<string, Status>>(() => {
        if (typeof window === "undefined") return {};

        const savedOverrides = localStorage.getItem("lendsqr_status_overrides");
        if (!savedOverrides) return {};

        try {
            return JSON.parse(savedOverrides);
        } catch {
            return {};
        }
    });
    const [pendingFilters, setPendingFilters] = useState<UserFilters>({
        organization: "",
        username: "",
        email: "",
        date: "",
        phoneNumber: "",
        status: "",
    });
    const [appliedFilters, setAppliedFilters] = useState<UserFilters>({
        organization: "",
        username: "",
        email: "",
        date: "",
        phoneNumber: "",
        status: "",
    });

    const tableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        localStorage.setItem("lendsqr_status_overrides", JSON.stringify(statusOverrides));
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

    const processedUsers = users.map(user => ({
        ...user,
        status: statusOverrides[user.id] || user.status
    })).filter((user) => {
        const org = String(user.orgName || user.organization || "").toLowerCase();
        const username = String(user.userName || user.username || "").toLowerCase();
        const email = String(user.email || "").toLowerCase();
        const phoneNumber = String(user.phoneNumber || "").toLowerCase();
        const joinedDate = String(user.createdAt || user.dateJoined || "");
        const status = String(user.status || "").toLowerCase();

        const orgMatches = !appliedFilters.organization || org.includes(appliedFilters.organization.toLowerCase());
        const usernameMatches = !appliedFilters.username || username.includes(appliedFilters.username.toLowerCase());
        const emailMatches = !appliedFilters.email || email.includes(appliedFilters.email.toLowerCase());
        const phoneMatches = !appliedFilters.phoneNumber || phoneNumber.includes(appliedFilters.phoneNumber.toLowerCase());
        const dateMatches = !appliedFilters.date || joinedDate.startsWith(appliedFilters.date);
        const statusMatches = !appliedFilters.status || status === appliedFilters.status.toLowerCase();

        return orgMatches && usernameMatches && emailMatches && phoneMatches && dateMatches && statusMatches;
    });

    const totalPages = Math.max(1, Math.ceil(processedUsers.length / itemsPerPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const safeIndexOfLastItem = safeCurrentPage * itemsPerPage;
    const safeIndexOfFirstItem = safeIndexOfLastItem - itemsPerPage;

    const currentItems = processedUsers.slice(safeIndexOfFirstItem, safeIndexOfLastItem);

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

    const handleRowClick = (id: string, event: MouseEvent<HTMLTableRowElement>) => {
        if (event.ctrlKey || event.metaKey) {
            window.open(`/users/${id}`, "_blank", "noopener,noreferrer");
            return;
        }
        handleViewDetails(id);
    };

    const handleRowKeyDown = (id: string, event: KeyboardEvent<HTMLTableRowElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleViewDetails(id);
        }
    };

    const toggleActionMenu = (id: string) => {
        setActiveActionMenuId(activeActionMenuId === id ? null : id);
    };

    const toggleFilterPopup = () => {
        setIsFilterPopupOpen(!isFilterPopupOpen);
    };

    const onResetFilters = () => {
        const emptyFilters: UserFilters = {
            organization: "",
            username: "",
            email: "",
            date: "",
            phoneNumber: "",
            status: "",
        };
        setPendingFilters(emptyFilters);
        setAppliedFilters(emptyFilters);
        setCurrentPage(1);
        setIsFilterPopupOpen(false);
    };

    const onApplyFilters = (filters: UserFilters) => {
        setAppliedFilters(filters);
        setCurrentPage(1);
        setIsFilterPopupOpen(false);
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
                                        onReset={onResetFilters}
                                        onFilter={onApplyFilters}
                                        filters={pendingFilters}
                                        onFilterChange={(field, value) => {
                                            setPendingFilters((prev) => ({ ...prev, [field]: value }));
                                        }}
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
                        {currentItems.length > 0 ? (
                            currentItems.map((user) => (
                                <tr
                                    key={user.id}
                                    className={styles.clickableRow}
                                    onClick={(event) => handleRowClick(user.id, event)}
                                    onKeyDown={(event) => handleRowKeyDown(user.id, event)}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`Open details for ${cleanUsername(user.userName || user.username, user.email)}`}
                                >
                                    <td data-label="Organization">{user.orgName || user.organization || "N/A"}</td>
                                    <td data-label="Username">{cleanUsername(user.userName || user.username, user.email)}</td>
                                    <td data-label="Email">{user.email || "N/A"}</td>
                                    <td data-label="Phone Number">{user.phoneNumber || "N/A"}</td>
                                    <td data-label="Date Joined">{formatDate(user.createdAt || user.dateJoined)}</td>
                                    <td data-label="Status">
                                        <StatusTag status={(user.status as Status) || "Active"} />
                                    </td>
                                    <td className={styles.relativeTd} data-label="Actions">
                                        <button
                                            className={styles.actionBtn}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                toggleActionMenu(user.id);
                                            }}
                                        >
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className={styles.emptyState}>No users match your current filters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                totalItems={processedUsers.length}
                itemsPerPage={itemsPerPage}
                currentPage={safeCurrentPage}
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
