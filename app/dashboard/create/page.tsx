import CreateTradeForm from "@/app/components/dashboard/createTradeForm";

export default function DashboardCreate() {
	return (
		<div className="w-full max-w-[800px] flex flex-col gap-6">
			<div>
				<h2 className="page-title">Add new trade</h2>
				<p className="secondary-text">
					Enter your execution details to update your trading journal
					performance.
				</p>
			</div>

			<div className="min-h-[15rem] border rounded-xl p-6 shadow-2xl">
				<CreateTradeForm />
			</div>
		</div>
	);
}
