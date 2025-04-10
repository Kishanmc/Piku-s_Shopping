import React from 'react'
import Hero from '../component/hero/hero';
import Popular from '../component/popular/popular';
import Offers from '../component/offers/offers';
 import Newcollections from '../component/newcollection/newcollection';
import SubscribeSection from '../component/subscribe/subscribeSection';



const Shop = props => {
  return (
    <div>
       <Hero/>
      <Popular/>
      <Offers/>
      <Newcollections/>
      <SubscribeSection/>
    

      
    </div>
  )
}



export default Shop;