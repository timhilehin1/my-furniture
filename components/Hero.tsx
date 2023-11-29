import React from 'react'
import Image from 'next/image'
import FurnitureHero from '../assets/furniture-hero.png'

export default function Hero() {
  return (
    <Image
    src={FurnitureHero}
    alt="Hero Image"
    className=''
    // width={500} automatically provided
    // height={500} automatically provided
    // blurDataURL="data:..." automatically provided
    // placeholder="blur" // Optional blur-up while loading
  />
  )
}
