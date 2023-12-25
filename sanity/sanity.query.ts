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

export async function fetchNewArrivals() {
	return client.fetch(groq`
	  *[_type == "product"] {
		"productImages": productImages[]{
        "imageUrl": asset->url,
        "caption": caption,
        "attribution": attribution
      },
		"productName": productName,
		"productPrice": productPrice,
		"discountStatus": discountStatus,
		"discountPrice": discountPrice,
		"availabilityStatus": availabilityStatus,
		"productCategory": productCategory[]->{categoryName},
		"productSize": productSize,
		"slug": slug.current,
		"_id": _id
	  }
	`);
}
