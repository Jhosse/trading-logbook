import type { ASSETS, TRADE_LABELS } from "@/lib/constants";

export type Assets = (typeof ASSETS)[number];

export enum TradeType {
	BUY = "buy",
	SELL = "sell",
}

export type TradeLabel = (typeof TRADE_LABELS)[TradeType];
