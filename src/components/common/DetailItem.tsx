import styles from "./DetailItem.module.scss";

interface DetailItemProps {
    label: string;
    value: string | number | undefined;
}

export const DetailItem = ({ label, value }: DetailItemProps) => (
    <div className={styles.detailItem}>
        <p className={styles.detailLabel}>{label}</p>
        <p className={styles.detailValue}>{value || "N/A"}</p>
    </div>
);
