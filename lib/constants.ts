import { TradeType } from "@/lib/trades/types";

export const ROUTES = {
	HOME: "/",
	AUTH: {
		SIGN_IN: "/SignIn",
		SIGN_UP: "/SignUp",
	},
	APP: {
		DASHBOARD: "/dashboard",
		PROFILE: "/profile",
		SETTINGS: "/settings",
	},
	DASHBOARD: {
		OVERVIEW: "/dashboard",
		CREATE: "/dashboard/create",
	},
} as const;

export const ASSETS = ["GER40.cash", "US30.cash", "XAUUSD", "US100.cash"] as const;

export const TRADE_LABELS = {
	[TradeType.BUY]: "Buy",
	[TradeType.SELL]: "Sell",
} as const;
