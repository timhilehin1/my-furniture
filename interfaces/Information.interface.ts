export interface informationInterface {
	businessName: string;
	businessAddress: string;
	businessEmail: string;
	businessPhone: string;
	businessFacebook: string;
	businessInstagram: string;
	businessTwitter: string;
	businessLinkedin: string;
	businessLogo: {
		imageUrl: string;
		caption: string;
		attribution?: string;
	};
	businessDescription: string;
}
