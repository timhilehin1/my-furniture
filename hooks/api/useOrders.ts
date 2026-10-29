"use client";
import {
	InfiniteData,
	QueryClient,
	useInfiniteQuery,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { ordersApi } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import {
	OrderListItem,
	OrderListResponse,
	OrderStatus,
} from "@/interfaces/api.interface";

const PAGE_SIZE = 10;
// backend max limit; used when looking an order up without a cached list
const LOOKUP_PAGE_SIZE = 50;
const MAX_LOOKUP_PAGES = 20;

// Paginated order list; each "Load more" fetches the next backend page and appends
export function useOrders(status: OrderStatus | null, enabled = true) {
	return useInfiniteQuery({
		enabled,
		queryKey: queryKeys.orderList(status ?? "ALL"),
		queryFn: ({ pageParam }) =>
			ordersApi.list({ page: pageParam, limit: PAGE_SIZE, status: status ?? undefined }),
		initialPageParam: 1,
		getNextPageParam: (last) =>
			last.meta.page < last.meta.totalPages ? last.meta.page + 1 : undefined,
	});
}

function findCachedOrder(queryClient: QueryClient, orderId: string) {
	const lists = queryClient.getQueriesData<InfiniteData<OrderListResponse>>({
		queryKey: queryKeys.orders,
	});
	for (const [, data] of lists) {
		for (const page of data?.pages ?? []) {
			const found = page.data.find((o) => o.id === orderId);
			if (found) return found;
		}
	}
	return undefined;
}

// No GET /orders/:id yet: reuse the list data, paging through the list on a cold load (e.g. refresh)
export function useOrderFromList(orderId: string) {
	const queryClient = useQueryClient();
	return useQuery({
		queryKey: queryKeys.orderDetail(orderId),
		queryFn: async (): Promise<OrderListItem | null> => {
			const cached = findCachedOrder(queryClient, orderId);
			if (cached) return cached;
			for (let page = 1; page <= MAX_LOOKUP_PAGES; page++) {
				const res = await ordersApi.list({ page, limit: LOOKUP_PAGE_SIZE });
				const found = res.data.find((o) => o.id === orderId);
				if (found) return found;
				if (page >= res.meta.totalPages) break;
			}
			// list is scoped to the logged-in user, so this covers "not yours" too
			return null;
		},
		initialData: () => findCachedOrder(queryClient, orderId),
		enabled: !!orderId,
	});
}
