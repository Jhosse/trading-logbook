import Link from "next/link";
import { signIn, signUp } from "@/app/actions/auth";
import AuthForm from "@/app/components/auth/authForm";
import { ROUTES } from "@/lib/constants";

interface AuthPageProps {
	params: { type: string };
}

export default async function AuthPage({ params }: AuthPageProps) {
	const { type } = await params;
	const isSignUp = type.toLowerCase().trim() === "signup";

	return (
		<section className="flex flex-col items-center justify-center w-full max-w-lg m-auto">
			<h1 className="text-3xl font-bold tracking-tight text-white mb-8">
				{isSignUp ? "Create Account" : "Sign In"} Page
			</h1>
			<AuthForm
				action={isSignUp ? signUp : signIn}
				submitText={isSignUp ? "Sign Up" : "Sign In"}
				showNameField={isSignUp}
			/>

			<div className="mt-6 text-center">
				<p className="text-sm text-gray-600">
					{isSignUp ? "Already have an account?" : "Don't have an account?"}
				</p>
				<Link
					href={isSignUp ? ROUTES.AUTH.SIGN_IN : ROUTES.AUTH.SIGN_UP}
					className="text-blue-600 hover:text-blue-500 text-sm font-medium"
				>
					{isSignUp ? "Sign In" : "Sign Up"}
				</Link>
			</div>
		</section>
	);
}
