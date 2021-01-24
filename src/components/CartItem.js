import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import  { Redirect } from 'react-router-dom'
// import { browserHistory } from 'react-router-dom';
import { Link } from 'react-router';
import axios from "axios";
export default class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


render(){
  const {
        id= null, product = null,rating = null,price_ht=  null
      } = this.props.book || {}
  return (
    <div className="col-sm-6 col-md-4 country-card">
      <div className="country-card-container border-gray rounded border mx-2 my-3 d-flex flex-row align-items-center p-0 bg-light">
        <div className="h-100 position-relative border-gray border-right px-2 bg-white rounded-left">
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
          <span className="country-name text-dark d-block font-weight-bold">{ product }</span>
          <span className="text-secondary text-uppercase font-weight-bold"> Rs. <font style={{color:"gold"}}>{ price_ht }</font></span><br />
          <button type="button" className="btn btn-success" style={{width:"100%"}}>Pay</button>
        </div>
      </div>
    </div>
  )
}
}
