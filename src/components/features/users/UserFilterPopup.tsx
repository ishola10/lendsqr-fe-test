import styles from "./UserTablePopups.module.scss";

export interface UserFilters {
    organization: string;
    username: string;
    email: string;
    date: string;
    phoneNumber: string;
    status: string;
}

interface UserFilterPopupProps {
    onReset: () => void;
    onFilter: (filters: UserFilters) => void;
    filters: UserFilters;
    onFilterChange: (field: keyof UserFilters, value: string) => void;
}

export const UserFilterPopup = ({ onReset, onFilter, filters, onFilterChange }: UserFilterPopupProps) => {
    return (
        <div className={styles.filterPopup} onClick={(e) => e.stopPropagation()}>
            <div className={styles.filterField}>
                <label>Organization</label>
                <select
                    value={filters.organization}
                    onChange={(e) => onFilterChange("organization", e.target.value)}
                >
                    <option value="">Select</option>
                    <option value="Lendsqr">Lendsqr</option>
                    <option value="Irorun">Irorun</option>
                    <option value="Lendstar">Lendstar</option>
                </select>
            </div>

            <div className={styles.filterField}>
                <label>Username</label>
                <input
                    type="text"
                    placeholder="User"
                    value={filters.username}
                    onChange={(e) => onFilterChange("username", e.target.value)}
                />
            </div>

            <div className={styles.filterField}>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={filters.email}
                    onChange={(e) => onFilterChange("email", e.target.value)}
                />
            </div>

            <div className={styles.filterField}>
                <label>Date</label>
                <input
                    type="date"
                    placeholder="Date"
                    value={filters.date}
                    onChange={(e) => onFilterChange("date", e.target.value)}
                />
            </div>

            <div className={styles.filterField}>
                <label>Phone Number</label>
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={filters.phoneNumber}
                    onChange={(e) => onFilterChange("phoneNumber", e.target.value)}
                />
            </div>

            <div className={styles.filterField}>
                <label>Status</label>
                <select
                    value={filters.status}
                    onChange={(e) => onFilterChange("status", e.target.value)}
                >
                    <option value="">Select</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    <option value="Blacklisted">Blacklisted</option>
                </select>
            </div>

            <div className={styles.filterButtons}>
                <button className={styles.resetBtn} onClick={onReset}>Reset</button>
                <button className={styles.submitBtn} onClick={() => onFilter(filters)}>Filter</button>
            </div>
        </div>
    );
};
