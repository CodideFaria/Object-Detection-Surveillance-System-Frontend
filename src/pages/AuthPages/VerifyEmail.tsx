import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import VerifyEmailForm from "../../components/auth/VerifyEmailForm";

export default function VerifyEmail() {
  return (
    <>
      <PageMeta
        title="React.js VerifyEmail Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <VerifyEmailForm />
      </AuthLayout>
    </>
  );
}
