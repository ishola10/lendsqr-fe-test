import Image from "next/image";
import styles from "./StatCard.module.scss";

interface StatCardProps {
    icon: string;
    label: string;
    value: string | number;
    iconBgColor: string;
}

export const StatCard = ({ icon, label, value, iconBgColor }: StatCardProps) => {
    return (
        <div className={styles.statCard}>
            <div className={styles.iconContainer} style={{ backgroundColor: iconBgColor }}>
                <Image src={icon} alt={label} width={22} height={22} />
            </div>
            <h3 className={styles.label}>{label}</h3>
            <p className={styles.value}>{value}</p>
        </div>
    );
};
