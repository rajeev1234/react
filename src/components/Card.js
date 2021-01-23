import React from 'react';
import StarRatings from "react-star-ratings";
const Card = props => {
  const {
    title= null, authors = null,rating = null,price=  null
  } = props.book || {};

  return (
    <div className="col-sm-6 col-md-4 country-card">
      <div className="country-card-container border-gray rounded border mx-2 my-3 d-flex flex-row align-items-center p-0 bg-light">
        <div className="h-100 position-relative border-gray border-right px-2 bg-white rounded-left">
          {/* <Flag country={code2} format="png" pngSize={64} basePath="/img/flags-iso/flat" className="d-block h-100" /> */}
          <img src="https://s3-ap-southeast-1.amazonaws.com/he-public-data/red-book-hi8d6431a.png" style={{width:"50px", height:"50px"}}></img>
          <StarRatings
          rating={Number.isInteger(parseInt(rating)) ? parseInt(rating) : 5}
          starRatedColor="blue"
          numberOfStars={5}
          name='rating'
          starDimension="8px"
          starSpacing="1px"
        />
        </div>
        <div className="px-3">
          <span className="country-name text-dark d-block font-weight-bold">{ title }</span>
          <span className="country-region text-secondary text-uppercase">{ authors }</span><br />
          <span className="text-secondary text-uppercase font-weight-bold"> Rs. <font style={{color:"gold"}}>{ price }</font></span><br />
          <button type="button" className="btn btn-success" style={{width:"100%"}}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default Card;