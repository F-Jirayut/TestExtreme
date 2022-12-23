import axios from 'axios';
import {  useState } from 'react';
import { Link } from "react-router-dom";

function InsertAccounts() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [nationality, setNationality] = useState("")


  // const [input, setInput] = useState({
  //   "username" : "",
  //   "password" : "",
  //   "name" : "",
  //   "email" : "",
  //   "phone" : "",
  //   "company" : "",
  //   "nationality" : ""
  // });

  function validateInput(){
    if(username === ""){
      alert("Enter username.")
      return true
    }
    if(password === ""){
      alert("Enter password.")
      return true
    }
    if(name === ""){
      alert("Enter name.")
      return true
    }
    if(email === ""){
      alert("Enter email.")
      return true
    }
    if(phone === ""){
      alert("Enter phone.")
      return true
    }
    if(company === ""){
      alert("Enter company.")
      return true
    }
    if(nationality === ""){
      alert("Enter nationality.")
      return true
    }
    return false
  }

  async function AddAccounts(event){
    event.preventDefault();
    if(await validateInput()){
      return
    }
    let input = {
        "username" : username,
        "password" : password,
        "name" : name,
        "email" : email,
        "phone" : phone,
        "company" : company,
        "nationality" : nationality
    }
    console.log(input)
    await axios.post(`http://127.0.0.1:8000/api/addAccounts`, input)
    .then(res => {
        setUsername("")
        setPassword("")
        setName("")
        setEmail("")
        setPhone("")
        setCompany("")
        setNationality("")
        alert(res.data)
    }).catch(error =>{
      if(error.response.status === 400){
        let error_msg = ""
        if(error.response.data["username"]){
          error_msg += error.response.data["username"] + "\n"
        }
        if(error.response.data["password"]){
          error_msg += error.response.data["password"] + "\n"
        }
        if(error.response.data["name"]){
          error_msg += error.response.data["name"] + "\n"
        }
        if(error.response.data["email"]){
          error_msg += error.response.data["email"] + "\n"
        }
        if(error.response.data["phone"]){
          error_msg += error.response.data["phone"] + "\n"
        }
        if(error.response.data["company"]){
          error_msg += error.response.data["company"] + "\n"
        }
        if(error.response.data["nationality"]){
          error_msg += error.response.data["nationality"] + "\n"
        }
        alert(error_msg)
      }
      else{
        alert(error)
      }
    })
  }

  return (
    <div className="container">
      <br/><br/>
      <div>
        <Link to="/Accounts">
          <button type="button" className="btn btn-outline-primary">Back Page</button>
        </Link>
      </div>
      <form onSubmit={AddAccounts}>
      <h1 style={{textAlign: "center"}}>Insert Account</h1>
      <div className="mb-3">
        <label htmlFor="InputUsername">Username</label>
        <input type="text" className="form-control" id="InputUsername" placeholder="Username" value={ username } onChange={(e) => setUsername(e.target.value) } />
      </div>

      <div className="mb-3">
        <label htmlFor="InputPassword">Password</label>
        <input type="password" className="form-control" id="InputPassword" placeholder="Password" value={ password } onChange={(e) => setPassword(e.target.value) } />
      </div>

      <div className="mb-3">
        <label htmlFor="InputName">Name</label>
        <input type="text" className="form-control" id="InputName" placeholder="Name" value={ name } onChange={(e) => setName(e.target.value) } />
      </div>

      <div className="mb-3">
        <label htmlFor="InputEmail">Email</label>
        <input type="text" className="form-control" id="InputEmail" placeholder="Email" value={ email } onChange={(e) => setEmail(e.target.value) } />
      </div>

      <div className="mb-3">
        <label htmlFor="InputPhone">Phone (ตัวเลข 10 หลัก)</label>
        <input type="tel" pattern="[0-9]{10}" maxLength="10" className="form-control" id="InputPhone" placeholder="Phone" value={ phone } onChange={(e) => setPhone(e.target.value) } />
      </div>

      <div className="mb-3">
        <label htmlFor="Inputcompany">Company</label>
        <input type="text" className="form-control" id="Inputcompany" placeholder="Company" value={ company } onChange={(e) => setCompany(e.target.value) } />
      </div>

      <div className="mb-3">
        <label htmlFor="InputNationality">Nationality</label>
        <input type="text" className="form-control" id="InputNationality" placeholder="Nationality" value={ nationality } onChange={(e) => setNationality(e.target.value) } />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  );
}

export default InsertAccounts;
