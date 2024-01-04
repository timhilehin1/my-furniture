export interface blogInterface{
    blogImage: {
		imageUrl: string;
		caption: string;
		attribution?: string;
	};
    blogTitle: string;
    blogDescription?: string;
    blogContent: any;
    blogAuthor: string;
    blogSlug?: string;
    blogDate: string;
    
}