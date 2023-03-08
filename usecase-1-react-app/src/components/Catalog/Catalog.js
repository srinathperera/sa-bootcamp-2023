import React, {useEffect} from 'react';
import { Container, Row, Col, Button }  from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as regThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from "react-query";
import { useState } from "react";
import { Link } from 'react-router-dom';


// import PetStoreNav from '../../App.js';

//call graphQL api to add items to the cart 

// Component to render the item list
const PetItemList = () => {
    const itemPrice = {
      fontSize: '20px',
      fontWeight: 'bold',
      marginRight: '50px'
    };

    const userID = "user1"; 
    const [cartData, setCartData] = useState({"3": "item3"});


function addItem2Cart(itemID, itemName, price){
  console.log("Adding item to cart: " + itemID + " " + itemName + " " + price);
  /*
    JSON object to store the cart data
    {       
        "itemID": "item1",
        "itemName": "Top Paw® Valentine's Day Single Dog Sweater",
        "itemPrice": 14.99,
        "itemQuantity": 3,
        "itemTotal": 44.97
    },
  
 console.log("Cart Data: " + JSON.stringify(cartData));
 console.log("adding "+ itemID + " " + itemName + " " + price);
    setCartData({
      ...cartData,
    //   itemID: {
    //   "itemID": itemID,
    //   "itemName": itemName,
    //   "itemPrice": price,
    //   "itemQuantity": 1,
    //   "itemTotal": price
    // }
    itemID: itemName
  });
  // cartData[itemID] = {
  //       "itemID": itemID,
  //       "itemName": itemName,
  //       "itemPrice": price,
  //       "itemQuantity": 1,
  //       "itemTotal": price
  //     }
  

    console.log("Cart Data: " + JSON.stringify(cartData));
    //setCartData(cartData);
    localStorage.setItem('cartData', cartData);
*/
  
  // fetch('http://localhost:3000/api/covid19/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     //query: 'mutation {addItem(items2add: [{itemName: "'+itemID+'", quantity: 10}])\n  {itemIDs}}'
  //     query: 'mutation {addItem( items2add: [{ itemName: "'+itemName+'", itemID: "'+itemID+'", price: '+price+', quantity: 1 }]) {itemIDs}}'
  //   }),
  // })
  // .then((res) =>  res.json())
  // .then(json => "Done" + console.log(JSON.stringify(json)))
  // .catch((error) => console.log('error', error));

  //add item data by calling http://localhost:9090/petstore/addItems with fetch
  fetch('http://localhost:3000/api1/petstore/addItems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify([{
    //   "itemID": itemID,
    //   "itemName": itemName,
    //   "itemPrice": price,
    //   "itemQuantity": 1,
    //   "itemTotal": price
    // }]),
        body: JSON.stringify([{
      "itemName": "ball",
      "itemID": "123",
      "price": 100.0,
      "quantity": 10

    }]),
  })
  .then((res) =>  res.json())
  .then(json => "Done" + console.log(JSON.stringify(json)))
  .catch((error) => console.log('error', error));
}

//call graphQL api to add followed state 
function followItem(itemID){
  fetch('http://localhost:3000/api/covid19/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    //add itemID and userID to the query  
    body: JSON.stringify({
      query: 
      'mutation { addFollowedState(itemID: "'+itemID+'", userID: "'+userID+'") {itemID}}'
    }), 
  })
  .then((res) =>  res.json())
  .then(json => "Done" + console.log(JSON.stringify(json)))
  .catch((error) => console.log('error', error));
}


    //call graphql api to get the list of items

    /*
    const [itemList, setItems] = useState([]);
    fetch("http://localhost:3000/api/doctors?searchstr=%22%22")
      .then((res) => res.json())
      .then((json) => {
        setItems(json)
        console.log('received JSON '+ json);
      })
      itemDesc: "Item 1 Description", itemImage: "https://www.example.com/item1.jpg", includes: "Item 1 Includes", intendedFor: "Item 1 Intended For", color: "Item 1 Color", material: "Item 1 Material"
*/
  const [itemList, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/covid19/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: "query { all { itemID itemName itemDesc itemImage includes intendedFor color material price}  }"
      }),
    })
    .then((res) => res.json())
    .then((result) => setItems(result.data.all))
    .catch((error) => console.log('error', error));


    // const storedCartData = localStorage.getItem('cartData');
    // if (storedCartData) {
    //     console.log("cartData: " + storedCartData);
    //     setCartData(storedCartData);
    // }
  }, []);

  //const myList = itemList.map((item) => 
  //  <li key={item.name}>
  //  </li>
  //)

  const listItems = itemList.map((item) =>
    <Col>
      <img src={item.itemImage} width="300" alt="dog"/><br />
      <h4>{item.itemName}</h4>
      <p>{item.itemDesc}</p>
      <p>
        <b>Includes: </b> {item.includes}<br />
        <b>Intended For:</b> {item.intendedFor}<br />
        //add to cart 
        // follow updates Button

      </p>
      <Button
        variant="primary"
        className="float-end"
        onClick={() => addItem2Cart(item.itemID, item.itemName, item.price)}>
        Add to cart
      </Button>
      <br />
      <br />
      <Button
        variant="primary"
        className="float-end"
        onClick={() => followItem(item.itemID)}
      >
        <FontAwesomeIcon icon={regThumbsUp} />  Follow Updates  
      </Button>
    </Col>
  );
    return (
      <>
      <Container>
        <Row>
          {listItems}
        </Row>
      </Container>
    </>
    );
  
  };

  export default function Catalog() {
    useEffect(() => {
        document.title = 'PetStore Catalog';
      }, []);
    return (
      <>
        <PetItemList />
      </>
    );
}