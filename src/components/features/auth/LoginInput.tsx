import { useState } from "react";
import styles from "./LoginInput.module.scss";

interface LoginInputProps {
    type: "text" | "password" | "email";
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    required?: boolean;
    autoComplete?: string;
}

export const LoginInput = ({
    type,
    placeholder,
    value,
    onChange,
    id,
    required = false,
    autoComplete,
}: LoginInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className={styles.inputContainer}>
            <input
                id={id}
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={styles.input}
                required={required}
                autoComplete={autoComplete}
            />
            {isPassword && (
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "HIDE" : "SHOW"}
                </button>
            )}
        </div>
    );
};
