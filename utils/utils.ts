export const convertDateToText = (dateString: string) => {
	// Parse the date string
	const [year, month, day] = dateString.split("-").map(Number);

	// Define month names
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	// Convert month to text form
	const monthText = monthNames[month - 1];

	// Convert year to full form (considering 2-digit years)
	const fullYear = year >= 0 && year < 100 ? 2000 + year : year;

	// Construct the text form with the day
	const textForm = `${day} ${monthText} ${fullYear}`;

	return textForm;
};

export const calculateDiscount = (price: number, discountPrice: any) => {
	if (discountPrice === null || discountPrice >= price) return 0;
	return `${Math.round(((price - discountPrice) / price) * 100)}%`;
};

export const NairaFormat = new Intl.NumberFormat("en-NG", {
	maximumFractionDigits: 0,
	currency: "NGN",
	style: "currency",
});

export const getNairaFormat = (amount: any) => {
	if (amount) {
		amount = amount.replaceAll("₦", "");
		amount = amount.replaceAll(",", "");
		return NairaFormat.format(amount);
	}
	return NairaFormat.format(0);
};

export const getSoldPercentage = (
	total: number | undefined,
	sold: number | undefined
) => {
	if (total === undefined || sold === undefined) return 0;
	const percentage = (sold / total) * 100;
	return Math.floor(percentage);
};

export const getAvailableQuantity = (
	total: number | undefined,
	sold: number | undefined
) => {
	if (total === undefined || sold === undefined) return 0;
	const availableQuantity = total - sold;
	return Math.floor(availableQuantity);
};

export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
