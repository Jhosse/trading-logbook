import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { ROUTES } from "@/lib/constants";

export default function DashboardNav() {
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
			</ul>
		</nav>
	);
}
