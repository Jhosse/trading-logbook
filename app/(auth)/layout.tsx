export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-full flex flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black">
			{children}
		</div>
	);
}
