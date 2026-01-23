import Link from "next/link";
import { logout } from "@/app/actions/auth";
import Button from "@/app/components/button";

import { ROUTES } from "@/lib/constants";

export default function Nav() {
	const handleSignOut = () => logout();

	return (
		<nav className="">
			<ul className="flex justify-center items-center">
				<li className="mx-2">
					<Link href={ROUTES.DASHBOARD.OVERVIEW}>
						<Button variant="outline">Overview</Button>
					</Link>
				</li>
				<li className="mx-2">
					<Link href={ROUTES.DASHBOARD.CREATE}>
						<Button variant="outline">Create</Button>
					</Link>
				</li>
				<li className="mx-2">
					<Button onClick={handleSignOut} variant="outline">
						Log Out
					</Button>
				</li>
			</ul>
		</nav>
	);
}
