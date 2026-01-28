import styles from "./UserTablePopups.module.scss";

interface UserFilterPopupProps {
    onReset: () => void;
    onFilter: (filters: any) => void;
}

export const UserFilterPopup = ({ onReset, onFilter }: UserFilterPopupProps) => {
    return (
        <div className={styles.filterPopup} onClick={(e) => e.stopPropagation()}>
            <div className={styles.filterField}>
                <label>Organization</label>
                <select>
                    <option value="">Select</option>
                    <option value="Lendsqr">Lendsqr</option>
                    <option value="Irorun">Irorun</option>
                    <option value="Lendstar">Lendstar</option>
                </select>
            </div>

            <div className={styles.filterField}>
                <label>Username</label>
                <input type="text" placeholder="User" />
            </div>

            <div className={styles.filterField}>
                <label>Email</label>
                <input type="email" placeholder="Email" />
            </div>

            <div className={styles.filterField}>
                <label>Date</label>
                <input type="date" placeholder="Date" />
            </div>

            <div className={styles.filterField}>
                <label>Phone Number</label>
                <input type="text" placeholder="Phone Number" />
            </div>

            <div className={styles.filterField}>
                <label>Status</label>
                <select>
                    <option value="">Select</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    <option value="Blacklisted">Blacklisted</option>
                </select>
            </div>

            <div className={styles.filterButtons}>
                <button className={styles.resetBtn} onClick={onReset}>Reset</button>
                <button className={styles.submitBtn} onClick={() => onFilter({})}>Filter</button>
            </div>
        </div>
    );
};
