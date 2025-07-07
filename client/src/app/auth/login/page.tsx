import LoginForm from '@/components/auth/LoginForm';
import AuthCard from '@/components/auth/AuthCard';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/coolbackgrounds1.png')` }}
    >
      <AuthCard>
        <LoginForm />
      </AuthCard>
    </div>
  );
}
