import { signIn } from "@/app/actions/auth";
import AuthForm from "@/app/components/auth/authForm";

export default async function Home() {
	return (
		<section className="flex flex-col items-center justify-center w-full max-w-lg m-auto">
			<h1 className="text-3xl font-bold tracking-tight text-white mb-2">
				Welcome Back
			</h1>
			<p className="text-slate-400 text-sm mb-8">
				Professional trade tracking & analytics
			</p>
			<AuthForm action={signIn} submitText="Sign In" showNameField={false} />
		</section>
	);
}
