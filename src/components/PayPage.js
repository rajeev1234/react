import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import  { Redirect } from 'react-router-dom'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
  } from "reactstrap";
  import axios from "axios";
  import CardItem from './CartItem'
export default class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        password: "",
        email: "",
        error:"",
        modalcheck: true
    };
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.save = this.save.bind(this)
    this.CartItem = this.CartItem.bind(this)
  }
  componentDidMount(){
      this.CartItem()
  }
  handleChangeName(e){
      this.setState({
          name : e.target.value
      })
  }
  handleChangePassword(e){
    this.setState({
        password : e.target.value
    })
  }
  handleChangeEmail(e){
    this.setState({
        email : e.target.value
    })
  }
  CartItem(){
    axios
    .get("https://barclaytest123.herokuapp.com/CartItemView")
    .then(res => this.setState({ currentCountries: res.data.results,totalCountries: res.data.count,totalPages: parseInt((res.data.count) / 100 + 1) }))
    .catch(err => console.log(err));

}
  save(){
    // var _this = this            
    var email = this.state.email
      if(!this.state.name || !this.state.password || !this.state.email){
          this.setState({
              "error" : "Please Fill all the details"
          })
      }
      else{
        axios.post('https://barclaytest123.herokuapp.com/users/', {
            username: this.state.name,
            email : this.state.email,
            password: this.state.password
          })
          .then(function (response) {
                
              console.log(email)
              console.log(response)
            if(response.data.email == (email)){
                this.setState({
                    error: "Registration Done",
                    modalcheck: false
                })
            }
             else{
                this.setState({
                    error:"Error"
                })
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          }.bind(this));
      }
  }

render(){
    console.log('pay page',this.state.name,this.state.email,this.state.password)
    const { allCountries, currentCountries, currentPage, totalPages,totalCountries } = this.state;
  return (
    <div className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
            <Modal isOpen={this.state.modalcheck}>
            <ModalHeader> Register</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="title">Name</Label>
                  <Input
                    type="text"
                    name="title"
                    value={this.state.name}
                    onChange={this.handleChangeName}
                    placeholder="Enter your name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Email</Label>
                  <Input
                    type="email"
                    name="description"
                    value={this.state.email}
                    onChange={this.handleChangeEmail}
                    placeholder="Enter Email address"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="completed">Password</Label>
                    <Input
                      type="password"
                      name="completed"
                      placeholder=" Enter Password"
                      value={this.state.password}
                      onChange={this.handleChangePassword}
                    />
                  
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
                <p style={{color:"red",marginRight:"2%"}}>{this.state.error}</p>
              <Button color="success" onClick={this.save}>
                Save
              </Button>
              <Button color="success">
                Login
              </Button>
            </ModalFooter>
          </Modal>
          {this.state.modalcheck == false ?
          <div style={{color:"white"}}>
              <h2>Welcome {this.state.name}</h2>
              { currentCountries.map(country => <CardItem key={country.id} book={country} />) }
          </div> : null}
            </div>
          </div>
        </div>
      </div>
  )
}
}
