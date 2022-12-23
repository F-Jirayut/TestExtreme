import axios from 'axios';
import { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { Link } from "react-router-dom";

function Accounts() {
  const [allUser, setAllUser] = useState([]);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [dataLogin, setDataLogin] = useState("")
//   const [SearchBar, setSearchBar] = useState([]);
  useEffect(() => {
      getAllAccounts()
    //   setSearchBar(Search)
  }, []);

  function getAllAccounts(){
    axios.get(`http://127.0.0.1:8000/api/listAccounts`)
    .then(res => {
        setAllUser(res.data)
        console.log(res.data)
    }).catch(error =>{
        console.log(error)
        alert(error)
    })
  }

  async function deleteAccount(id){
    if (window.confirm("you want to delete?") === true) {
      await axios.post(`http://127.0.0.1:8000/api/deleteAccounts`, {id : id})
      .then(res => {
          alert(res.data)
      }).catch(error =>{
          console.log(error)
          alert(error)
      })
      await getAllAccounts()
    }
  }

  const columns = [{
    dataField: 'id',
    text: 'ID',
    filter: textFilter()
  }, {
    dataField: 'name',
    text: 'Name',
    filter: textFilter()
  }, {
    dataField: 'username',
    text: 'Username',
    filter: textFilter()
  },
  , {
    dataField: 'email',
    text: 'Email',
    filter: textFilter()
  }, {
    dataField: 'phone',
    text: 'Phone',
    filter: textFilter()
  }, {
    dataField: 'company',
    text: 'Company',
    filter: textFilter()
  }, {
    dataField: 'nationality',
    text: 'Nationality',
    filter: textFilter()
  }, {
    dataField: 'id',
    text: '',
    formatter: (cell) => {
        return <>
        <div style={{textAlign: "center"}}>
        <Link to={`/UpdateAccounts/${cell}`} params={{ id: cell }}>
          <button type="button" className="btn btn-outline-warning" style={{width: "100%"}}>Edit</button>
        </Link>
        <br/><br/>
        <button type="button" className="btn btn-outline-danger" onClick={() => deleteAccount(cell) } style={{width: "100%"}}>Delete</button>
        </div>
        </>
      }
    }
  ];

  function validateInput(){
    if(username === ""){
      alert("Enter username.")
      return true
    }
    if(password === ""){
      alert("Enter password.")
      return true
    }
    return false
  }

  async function loginAPI(event){
    event.preventDefault();
    if(validateInput()){
      return
    }
    let input = {
      "username" : username,
      "password" : password,
    }
    await axios.post(`http://127.0.0.1:8000/api/login`, input)
    .then(res => {
      let msg = "Login success !! \n token : " + res.data.token
        alert(msg)
        setUsername("")
        setPassword("")
        setDataLogin(res.data.token)
        // console.log(res.data.token)
    }).catch(error =>{
        console.log(error)
        alert(error)
    })
  }


  return (
    <div className="container">
      <br/><br/>
      <div>
        <Link to="/">
          <button type="button" className="btn btn-outline-primary">Back Page</button>
        </Link>
      </div>
      <h1 style={{textAlign: "center"}}>Accounts</h1>
      <div style={{textAlign: "right"}}>
        <Link to="/insertAccounts">
            <button type="button" className="btn btn-primary">Add</button>
        </Link>
      </div>
      <br/><br/>
    <BootstrapTable keyField='game_item_id' data={ allUser } columns={ columns } pagination={ paginationFactory() } filter={ filterFactory() } /> 


    <form onSubmit={loginAPI}>
      <div className="container mt-6">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                        <div className="card" style={{padding: "16px"}} >
                        <h1 style={{textAlign: "center"}}>Login API (sanctum)</h1>
                        {
                          dataLogin != "" ? <h4 style={{textAlign: "center"}}>token : {dataLogin}</h4> : ""
                        }
                        <br/>
                        <div className="mb-3">
                          <label htmlFor="InputUsername">Username</label>
                          <input type="text" className="form-control" id="InputUsername" placeholder="Username" value={ username } onChange={(e) => setUsername(e.target.value) } />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="InputPassword">Password</label>
                          <input type="password" className="form-control" id="InputPassword" placeholder="Password" value={ password } onChange={(e) => setPassword(e.target.value) } />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                </div>
            </div>
        </div>

    </form>
    <br/><br/>
    </div>
  );
}

export default Accounts;
