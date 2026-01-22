import { signIn } from "@/app/actions/auth";
import AuthForm from "@/app/components/auth/authForm";

export default async function Home() {
	return (
		<section className="flex flex-col min-h-screen items-center justify-center max-w-lg m-auto">
			<h1 className="text-2xl uppercase">Home Page</h1>
			<AuthForm action={signIn} submitText="Sign In" showNameField={false} />
		</section>
	);
}
