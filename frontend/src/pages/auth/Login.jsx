import AuthLayout from "@/components/auth/AuthLayout";
import AuthBanner from "@/components/auth/AuthBanner";
import LoginForm from "@/components/auth/LoginForm";

function Login() {
  return (
    <AuthLayout
      banner={<AuthBanner />}
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;