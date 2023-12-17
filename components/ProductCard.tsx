import React from 'react'
import Image from "next/image";

function ProductCard() {
  return (
    <Image
    src={"/newArrival1.png"}
    alt='image'
    width={0}
    height={0}
    sizes='100%'
    style={{ width: "100%", height: "auto" }}
/>
  )
}

export default ProductCard