import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

function UpdateAccounts() {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [nationality, setNationality] = useState("")

  const [idAccount, setIdAccount] = useState(useParams())

  async function getAccount(id){
    await axios.get(`http://127.0.0.1:8000/api/getAccounts/${idAccount.id}`)
    .then(res => {
        setUsername(res.data.username)
        setName(res.data.name)
        setEmail(res.data.email)
        setPhone(res.data.phone)
        setCompany(res.data.company)
        setNationality(res.data.nationality)
        console.log(res.data)
    }).catch(error =>{
        console.log(error)
        alert(error)
    })
  }

  function validateInput(){
    if(name === ""){
      alert("Enter name.")
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

  function updateAccounts(event){
    event.preventDefault();
    if(validateInput()){
      return
    }
    let input = {
        "id" : idAccount.id,
        "name" : name,
        "phone" : phone,
        "company" : company,
        "nationality" : nationality
    }
    axios.post(`http://127.0.0.1:8000/api/updateAccounts`, input)
    .then(res => {
        alert(res.data)
    }).catch(error =>{
      if(error.response.status === 400){
        let error_msg = ""
        if(error.response.data["name"]){
          error_msg += error.response.data["name"] + "\n"
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

  useEffect(() => {
    getAccount()
  }, []);

  return (
    <div className="container">
      <br/><br/>
      <div>
        <Link to="/Accounts">
          <button type="button" className="btn btn-outline-primary">Back Page</button>
        </Link>
      </div>
      <form onSubmit={updateAccounts}>
      <h1 style={{textAlign: "center"}}>Update Account</h1>
      <div className="mb-3">
        <label htmlFor="InputUsername">Username</label>
        <input type="text" className="form-control" id="InputUsername" placeholder="Username" value={ username } disabled />
      </div>

      <div className="mb-3">
        <label htmlFor="InputName">Name</label>
        <input type="text" className="form-control" id="InputName" placeholder="Name" value={ name } onChange={(e) => setName(e.target.value) } />
      </div>

      <div className="mb-3">
        <label htmlFor="InputEmail">Email</label>
        <input type="text" className="form-control" id="InputEmail" placeholder="Email" value={ email } onChange={(e) => setEmail(e.target.value) } disabled />
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

export default UpdateAccounts;
