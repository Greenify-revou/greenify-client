import React from "react";
import LandingHero from "../components/LandingHero";
import Products from "../components/Products";
import LandingReview from "../components/LandingReview";

const HomePage = () => {
  return (
    <div className="">

      {/* Hero Section */}
      <LandingHero />

      {/* Product Section */}
      <Products />

      {/* Review Section */}
      <LandingReview />
  
    </div>
  )
}

export default HomePage