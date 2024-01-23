import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getDiscountProducts() {
	return client.fetch(
		groq`*[_type == "discount"]{
        products[]->{discountPercentage,"productImage" : productImage.asset->url,productName,_id,darkMode}
      }`
	);
}

export async function fetchHero() {
	return client.fetch(
		groq`*[_type == "hero"]{
		heroTitle,
		heroDescription,
		"firstHeroImage": firstHeroImage.asset->url,
		"secondHeroImage": secondHeroImage.asset->url
	  }`
	);
}

//use one function to fetch products, just add an argument to the function

export async function fetchProducts() {
	return client.fetch(groq`
	  *[_type == "product"] {
		"productImages": productImages[]{
        "imageUrl": asset->url,
        "caption": caption,
        "attribution": attribution
      },
		"productName": productName,
		"productDescription": productDescription,
		"productPrice": productPrice,
		"discountStatus": discountStatus,
		"discountPrice": discountPrice,
		"productQuantity":productQuantity,
		"noOfItemsSold":noOfItemsSold,
		"availabilityStatus": availabilityStatus,
		"productCategory": productCategory[]->{categoryName},
		"productSize": productSize[]->{sizeName, abbreviation},
		"productSection": productSection[]->{sectionName},
		"productColor": productColor[]->{colorName, colorCode},
		"slug": slug.current,
		"_id": _id
	  } 
	`);
}

export async function fetchProductBySlug(slug: string) {
	return client.fetch(groq`*[_type == "product" && slug.current == "${slug}"] {
		"productImages": productImages[]{
		"imageUrl": asset->url,
		"caption": caption,
		"attribution": attribution
	  },
		"productName": productName,
		"productDescription": productDescription,
		"productPrice": productPrice,
		"discountStatus": discountStatus,
		"discountPrice": discountPrice,
		"productQuantity":productQuantity,
		"noOfItemsSold":noOfItemsSold,
		"availabilityStatus": availabilityStatus,
		"productCategory": productCategory[]->{categoryName},
		"productSize": productSize[]->{sizeName, abbreviation},
		"productSection": productSection[]->{sectionName},
		"productColor": productColor[]->{colorName, colorCode},
		"slug": slug.current,
		"_id": _id
	  } 
	`);
}

export async function fetchGalleryImages() {
	return client.fetch(groq`
	*[_type == "newArrivalsGallery"]{
		"images": images[]{
			"imageUrl": asset->url,
			"caption": caption,
			"attribution": attribution,
			_key
		}
	}
	`);
}

export async function fetchDiscoveryImages() {
	return client.fetch(groq`
	*[_type == "discovery"]{
		"images": images[]{
			"imageUrl": asset->url,
			"caption": caption,
			"attribution": attribution,
			_key
		}
	}
	`);
}

export async function fetchTestimonials() {
	return client.fetch(groq`
	*[_type == "testimonial"]{
		"testimonialImage": {
        "imageUrl": testimonialImage.asset->url,
        "caption": testimonialImage.caption,
        "attribution": testimonialImage.attribution
      },
		"testimonialName": testimonialName,
		"testimonialDesignation": testimonialDesignation,
		"testimonialText": testimonialText,
	}
	`);
}

export async function fetchBlogPosts() {
	return client.fetch(groq`
	*[_type == "blog"]{
		"blogImage": {
			"imageUrl": blogImage.asset->url,
			"caption": blogImage.caption,
			"attribution": blogImage.attribution
		},
		"blogTitle": blogTitle,
		"blogContent": blogContent,
		"blogAuthor": blogAuthor,
		"blogDescription": blogDescription,
		"blogSlug": blogSlug.current,
		"blogDate": blogDate
	}
	`);
}

export async function fetchDealOfTheDay() {
	return client.fetch(
		groq`*[_type == "deals"]{
			"productImages": productImages[]{
        "imageUrl": asset->url,
        "caption": caption,
        "attribution": attribution
      },
		"productName": productName,
		"productPrice": productPrice,
		"productDescription": productDescription,
		"discountPrice": discountPrice,
		"availabilityStatus": availabilityStatus,
		"productSize": productSize,
		"slug": slug.current,
		"_id": _id
	  }`
	);
}

export async function fetchGramImages() {
	return client.fetch(groq`
	*[_type == "gramGalleryImages"]{
		"images": images[]{
			"imageUrl": asset->url,
			"caption": caption,
			"attribution": attribution,
			_key
		}
	}
	`);
}

export async function fetchBusinessInformation() {
	return client.fetch(groq`
	*[_type == "businessInformation"]{
		"businessName": businessName,
		"businessEmail": businessEmail,
		"businessPhone": businessPhone,
		"businessAddress": businessAddress,
		"businessFacebook": businessFacebook,
		"businessInstagram": businessInstagram,
		"businessTwitter": businessTwitter,
		"businessLinkedin": businessLinkedin,
		"businessLogo": {
			"imageUrl": businessLogo.asset->url,
			"caption": businessLogo.caption,
			"attribution": businessLogo.attribution
		},
		"businessDescription": businessDescription,
	}
	`);
}
