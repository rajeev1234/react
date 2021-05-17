import React, { Component } from 'react';
import ReactTable from "react-table-6";
// import Select from 'react-select';
import "react-table-6/react-table.css";
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';


const data = [
  {name: "rajeev", id: "1"},
  {name:"nepal", id : "2"}
]

const options = [
  { value: 'SLC', label: 'SLC' },
  { value: 'ME', label: 'ME' },
  { value: 'BE', label: 'BE' },
];
class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    selectedOption: null,
    qualificationList:[],
    employeeList:[],
    salary:""
  }
  this.handleChange = this.handleChange.bind(this)
  this.onChangeValue = this.onChangeValue.bind(this)
  this.qualificationList = this.qualificationList.bind(this)
  this.employeeList = this.employeeList.bind(this)
  this.handleChangeSalary = this.handleChangeSalary.bind(this)
}


  componentDidMount() {
    console.log("testing")
    this.qualificationList()
    this.employeeList()
    this.setState({
      test:"test"
    })



  }
  handleChangeSalary(e){
    this.setState({
      salary: e.target.value
    })
  }
  qualificationList(){
    $.ajax({
      url: 'http://127.0.0.1:8000/qualificationNameList/',
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data) {
        console.log('asdfasfd',data.qualificationList)
        this.setState({
          qualificationList: data.qualificationList
        })
      }.bind(this),
      error: function(xhr, status, err) {
      console.log('adf',err)
      }.bind(this)
    });

  }
  employeeList(){
    $.ajax({
      url: 'http://127.0.0.1:8000/employeeList/',
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data) {
        console.log('asdfasfd',data)
        this.setState({
          employeeList: data.employee
        })
      }.bind(this),
      error: function(xhr, status, err) {
      console.log('adf',err)
      }.bind(this)
    });
  }
  onChangeValue(e){
    console.log(e.target.value)
  }
  handleChange(selectedOption){
    // this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
    
  render() {
console.log(this.state.value)
    return (
      <div style={{margin:"7% 2% 2% 2%"}}>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"start"}}>
        <div>
              <ReactTable
              data={this.state.employeeList}
              columns={[
                  {
                    Header: "Employee Id",
                    accessor: "id",
                    sortable: false,
                    width: 100,
                  },
                  {
                    Header: "Name",
                    accessor: "name",
                    width: 120,
                  },
                 
              ]}
              style={{backgroundColor: "white"}}
              showPageSizeOptions={false}
              showPageJump={false}
              />
              </div >
              <div style={{marginLeft:"5%"}}>
              <div style={{display:"flex", flexDirection:"row"}}>
                Name*
                <input style={{marginLeft:"3%", width:"1000px"}} value={this.state.value} placeholder="Name" 	onChange={e => {
					let value = e.target.value;

					value = value.replace(/[^A-Za-z]/gi, "");

					this.setState({
						value
					});
				}}></input>
              </div>
              <div style={{display:"flex", flexDirection:"row", marginTop:"3%"}}>
                Gender
                <div onChange={this.onChangeValue} style={{marginLeft:"5%"}}>
                  <input type="radio" value="Male" name="gender" /> Male
                  <input type="radio" value="Female" name="gender" /> Female
                  <input type="radio" value="Other" name="gender" /> Other
                </div>              
                </div>
              <div style={{display:"flex", flexDirection:"row", marginTop:"3%"}}>
                DOB* &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;

                {/* <input style={{marginLeft:"3%", width:"1000px"}}></input> */}
                <TextField
        id="date"
        // label="Birthday"
        type="date"
        // defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true,
        }}
      />
              </div>
              <div style={{display:"flex", flexDirection:"row", marginTop:"3%"}}>
                Salary
                <input type="number" style={{marginLeft:"3%", width:"1000px"}} value={this.state.salary} onChange={this.handleChangeSalary}></input>
              </div>
              <div style={{backgroundColor:"#dfc8c8",marginTop:"10%", width:"1070px", height:"500px", color:"black"}}>
                <div style={{margin:"3%", fontSize:"30px"}}>
                    Employee Qualification
                </div>

                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                  Qualification 
                  <select
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                  >
                  <option value="SLC">SLC</option>
                  <option value="INTERMEDIATE">INTERMETIATE</option>
                  <option value="BE">BE</option>
                  <option value="ME">ME</option>
                  </select>
                  <p>Marks</p>
                  <input></input>
                  <button>Add</button>
                </div>
                <div style={{marginTop:"2%"}}>
                <ReactTable
                  data={data}
                  columns={[
                  {
                    Header: "QID",
                    accessor: "id",
                    sortable: true,
                  },
                  {
                    Header: "Qualification Name",
                    accessor: "name",
                  },
                  {
                    Header: "Marks",
                    accessor: "name",
                  }
                 
              ]}
              style={{backgroundColor: "white"}}
              showPageSizeOptions={false}
              showPageJump={false}
              pageSize={5}

              />
              </div>
              </div>
              </div>
              
          </div>
          
          </div>
    );
  }
}


export default App;