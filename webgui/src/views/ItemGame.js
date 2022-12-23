import axios from 'axios';
import { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Link } from "react-router-dom";
function ItemGame() {
  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState([]);

  // useEffect(() => {
  //   async function onrandomItems(){
  //     await randomItems(items)
  //     }
  //     onrandomItems()
  // }, []);

  const columns_for_all_items = [{
    dataField: 'game_item_id',
    text: 'Game Item ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }, 
  {
    dataField: 'chance',
    text: 'Chance'
  }, {
    dataField: 'stock',
    text: 'Stock'
  }
  ];

  const columns_for_new_items = [{
    dataField: 'key',
    text: 'Index'
  }, {
    dataField: 'game_item_id',
    text: 'Game Item ID'
  }, {
    dataField: 'name',
    text: 'Name'
  },
  ];

  function randomItems(){
    axios.get(`http://127.0.0.1:8000/api/randomItems`)
    .then(res => {
      setNewItems(res.data)
    }).catch(error =>{
      console.log(error)
      alert(error)
    })
  }

  function getAllItem(){
    axios.get(`http://127.0.0.1:8000/api/getAllItems`)
      .then(res => {
        setItems(res.data)
        console.log(res.data)
      }).catch(error =>{
        console.log(error)
        alert(error)
      })
  }

  function removeAllItem(){
    setItems([])
  }

  return (
    <div className="container">
      <br/>
      <div>
        <Link to="/">
          <button type="button" className="btn btn-outline-primary">Back Page</button>
        </Link>
      </div>
      {
        items.length > 0 ? 
        <>
          <h1 style={{textAlign: "center"}}>All Items</h1>
          <BootstrapTable keyField='game_item_id' data={ items } columns={ columns_for_all_items } pagination={ paginationFactory() } /> 
        </>
        : ""
      }
      <br/>
      {
        newItems.length > 0 ? 
        <>
          <h1 style={{textAlign: "center"}}>Random Items (100)</h1>
          <BootstrapTable keyField='key' data={ newItems } columns={ columns_for_new_items } pagination={ paginationFactory() } /> 
        </>
        : ""
      }

      <button type="button" className="btn btn-primary btn-lg" onClick={getAllItem}>Show All Items</button><br/><br/>
      <button type="button" className="btn btn-primary btn-lg" onClick={removeAllItem}>Close All Items</button><br/><br/>
      <button type="button" className="btn btn-primary btn-lg" onClick={randomItems}>Random</button>
    </div>
  );
}

export default ItemGame;
