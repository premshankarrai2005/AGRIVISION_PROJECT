import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-100 via-white to-green-200 p-6">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-10 shadow-2xl">
        <h1 className="mb-2 text-center text-4xl font-bold text-green-700">
          🌾 FarmLink AI
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Login to your account
        </p>

        <LoginForm />

        <p className="mt-8 text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            Register
          </a>
        </p>
      </div>
    </main>
  );
}