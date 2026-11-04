const VISITOR_ID_KEY = "visitorId";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// RFC 4122 v4. randomUUID only exists in secure contexts (https, localhost), so build one by hand elsewhere
function uuidV4(): string {
	if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
	const b = crypto.getRandomValues(new Uint8Array(16));
	b[6] = (b[6] & 0x0f) | 0x40;
	b[8] = (b[8] & 0x3f) | 0x80;
	const hex = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

let memoryId: string | null = null;

// Anonymous id kept across visits; the backend rejects anything that isn't a UUID with a 400.
// Older non-UUID ids are replaced. Deliberately not cleared on logout.
export function getVisitorId(): string {
	try {
		let id = localStorage.getItem(VISITOR_ID_KEY);
		if (!id || !UUID_RE.test(id)) {
			id = uuidV4();
			localStorage.setItem(VISITOR_ID_KEY, id);
		}
		return id;
	} catch {
		// storage blocked (private mode): keep one id for this page load
		memoryId ??= uuidV4();
		return memoryId;
	}
}

export const isUuid = (value: string) => UUID_RE.test(value);
