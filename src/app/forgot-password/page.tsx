import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px" }}>
            <section style={{ maxWidth: "420px", textAlign: "center" }}>
                <h1 style={{ marginBottom: "12px", color: "#213F7D" }}>Password reset is not enabled yet</h1>
                <p style={{ marginBottom: "20px", color: "#545F7D" }}>
                    This assessment build does not include a backend password recovery flow.
                </p>
                <Link href="/" style={{ color: "#39CDCC", fontWeight: 600 }}>
                    Return to login
                </Link>
            </section>
        </main>
    );
}
