import Benefits from './Benefits'
import Best_seller from './best_seller'
import Brands from './brands'
import Hero_components from './HeroSlider'
import React from 'react'
import NewArrivels from './new-arrivals'
import Recommeded_you from './recommanded_you'
import Flash_deals from './flash_deals'

const Homepage = () => {
  return (
    <>
        <Hero_components />
        <Benefits />
        <Brands />
        <Best_seller />
        <Flash_deals />
        <NewArrivels />
        <Recommeded_you />
    </>
  )
}

export default Homepage