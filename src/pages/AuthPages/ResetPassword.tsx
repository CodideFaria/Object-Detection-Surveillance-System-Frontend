import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

export default function ResetPassword() {
    return (
        <>
            <PageMeta
                title="React.js Set New Password | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Set New Password page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <AuthLayout>
                <ResetPasswordForm />
            </AuthLayout>
        </>
    );
}