import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 p-6">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-10 shadow-2xl">
        <h1 className="mb-2 text-center text-4xl font-bold text-green-700">
          🌾 FarmLink AI
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Create your account to connect directly with farmers and buyers.
        </p>

        <RegisterForm />

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            Login
          </a>
        </p>
      </div>
    </main>
  );
}