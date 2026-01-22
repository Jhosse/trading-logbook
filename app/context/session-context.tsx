"use client";

import { createContext, type ReactNode, useContext } from "react";

export interface SessionContextType {
	user: {
		id: string;
		name: string;
		email: string;
	};
	session: {
		id: string;
		userId: string;
		expiresAt: Date;
	};
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({
	children,
	session,
}: {
	children: ReactNode;
	session: SessionContextType | undefined;
}) {
	return (
		<SessionContext.Provider value={session}>
			{children}
		</SessionContext.Provider>
	);
}

export function useSession() {
	const context = useContext(SessionContext);
	return context;
}
