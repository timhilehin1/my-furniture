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
