export const queryKeys = {
	profile: ["profile"] as const,
	cart: ["cart"] as const,
	orderStatus: (orderId: string) => ["order", orderId, "status"] as const,
	orders: ["orders"] as const,
	orderList: (status: string) => ["orders", status] as const,
	orderDetail: (orderId: string) => ["order", orderId, "detail"] as const,
};
