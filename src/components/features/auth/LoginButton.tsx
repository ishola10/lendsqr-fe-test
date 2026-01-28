import styles from "./LoginButton.module.scss";

interface LoginButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
}

export const LoginButton = ({
    children,
    onClick,
    type = "submit",
    disabled = false,
}: LoginButtonProps) => {
    return (
        <button
            type={type}
            className={styles.button}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
