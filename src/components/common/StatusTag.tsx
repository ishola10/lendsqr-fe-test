import styles from "./StatusTag.module.scss";

interface StatusTagProps {
    status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

export const StatusTag = ({ status }: StatusTagProps) => {
    const statusLower = status.toLowerCase();
    const statusClass = styles[statusLower] || styles.inactive;

    return (
        <span className={`${styles.statusTag} ${statusClass}`}>
            {status}
        </span>
    );
};
