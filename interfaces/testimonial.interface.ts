export  interface TestimonialInterface {
	testimonialImage: {
		imageUrl: string;
		caption: string;
		attribution: string;
	};
	testimonialName: string;
	testimonialText: string;
	testimonialDesignation: string;
	_id?: string;
}
