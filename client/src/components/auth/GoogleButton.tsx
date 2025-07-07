import { FcGoogle } from 'react-icons/fc';

const GoogleButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full font-bold text-sm flex items-center justify-center gap-3 py-2 border border-white/20 bg-white/5 hover:bg-white/10 transition rounded-lg"
    >
      <FcGoogle />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleButton;
