import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";

const DashboardIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 13H15V15H1V13ZM1 1V11H7V1H1ZM3 3H5V9H3V3ZM9 1V11H15V1H9ZM11 3H13V9H11V3Z" fill="currentColor" />
    </svg>
);

const UsersIcon = () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 5.5C13.88 5.5 15 4.38 15 3C15 1.62 13.88 0.5 12.5 0.5C11.12 0.5 10 1.62 10 3C10 4.38 11.12 5.5 12.5 5.5ZM3.5 5.5C4.88 5.5 6 4.38 6 3C6 1.62 4.88 0.5 3.5 0.5C2.12 0.5 1 1.62 1 3C1 4.38 2.12 5.5 3.5 5.5ZM3.5 7C1.83 7 0 7.83 0 9.5V11.5H7V9.5C7 7.83 5.17 7 3.5 7ZM12.5 7C10.83 7 9 7.83 9 9.5V11.5H16V9.5C16 7.83 14.17 7 12.5 7Z" fill="currentColor" />
    </svg>
);

const OrganizationIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 15V1H1V15H0V16H16V15H15ZM14 15H2V2H14V15ZM4 4H12V5H4V4ZM4 6H12V7H4V6ZM4 8H12V9H4V8ZM4 10H12V11H4V10ZM4 12H12V13H4V12Z" fill="currentColor" />
    </svg>
);

const SwitchOrgIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 3H13.5V5.5H15V1.5H1V5.5H2.5V3ZM13.5 13H2.5V10.5H1V14.5H15V10.5H13.5V13ZM8 4L4 8H7V12H9V8H12L8 4Z" fill="currentColor" />
    </svg>
);

const menuItems = [
    {
        title: "CUSTOMERS",
        items: [
            { name: "Users", icon: <UsersIcon />, href: "/users" },
            { name: "Guarantors", icon: <UsersIcon />, href: "/guarantors" },
            { name: "Loans", icon: <DashboardIcon />, href: "/loans" },
            { name: "Decision Models", icon: <DashboardIcon />, href: "/decision-models" },
            { name: "Savings", icon: <DashboardIcon />, href: "/savings" },
            { name: "Loan Requests", icon: <DashboardIcon />, href: "/loan-requests" },
            { name: "Whitelist", icon: <DashboardIcon />, href: "/whitelist" },
            { name: "Karma", icon: <DashboardIcon />, href: "/karma" },
        ],
    },
    {
        title: "BUSINESSES",
        items: [
            { name: "Organization", icon: <OrganizationIcon />, href: "/organizations" },
            { name: "Loan Products", icon: <DashboardIcon />, href: "/loan-products" },
            { name: "Savings Products", icon: <DashboardIcon />, href: "/savings-products" },
            { name: "Fees and Charges", icon: <DashboardIcon />, href: "/fees" },
            { name: "Transactions", icon: <DashboardIcon />, href: "/transactions" },
            { name: "Services", icon: <DashboardIcon />, href: "/services" },
            { name: "Service Account", icon: <DashboardIcon />, href: "/service-account" },
            { name: "Settlements", icon: <DashboardIcon />, href: "/settlements" },
            { name: "Reports", icon: <DashboardIcon />, href: "/reports" },
        ],
    },
    {
        title: "SETTINGS",
        items: [
            { name: "Preferences", icon: <DashboardIcon />, href: "/preferences" },
            { name: "Fees and Pricing", icon: <DashboardIcon />, href: "/fees-pricing" },
            { name: "Audit Logs", icon: <DashboardIcon />, href: "/audit-logs" },
        ],
    },
];

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

export const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
    const pathname = usePathname();

    return (
        <>
            {isOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
                <button className={styles.closeBtn} onClick={closeSidebar}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#213F7D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <div className={styles.switchOrg}>
                    <SwitchOrgIcon />
                    <span>Switch Organization</span>
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.chevron}>
                        <path d="M0 0.5L5 5.5L10 0.5H0Z" fill="#213F7D" />
                    </svg>
                </div>

                <div className={styles.dashboardLink}>
                    <div className={styles.disabledItem}>
                        <DashboardIcon />
                        <span>Dashboard</span>
                    </div>
                </div>

                <nav className={styles.navSections}>
                    {menuItems.map((section) => (
                        <div key={section.title} className={styles.section}>
                            <h3 className={styles.sectionTitle}>{section.title}</h3>
                            <ul>
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href || (item.name === "Users" && pathname === "/");
                                    const isUsers = item.name === "Users";

                                    if (isUsers) {
                                        return (
                                            <li key={item.name}>
                                                <Link href={item.href} className={isActive ? styles.active : ""}>
                                                    {item.icon}
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        );
                                    }

                                    return (
                                        <li key={item.name}>
                                            <div className={styles.disabledItem}>
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
};
