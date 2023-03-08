import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Form, FormLabel, Button } from 'react-bootstrap';
import '../../App.js';
import '../../index.css';
import {InputNumber, InputGroup} from 'rsuite';
import './inputnumber.less'



export default function MyCart() {
    const [items, setItems] = useState(
        [
            { id: 1, name: 'Item 1', quantity: 1, price: 10 },
            { id: 2, name: 'Item 2', quantity: 2, price: 20 },
            { id: 3, name: 'Item 3', quantity: 3, price: 30 },
        ]
    );
    const [checkoutConfirmation, setCheckoutConfirmation] = useState("");
    console.log("Call fetch");
    useEffect(() => {
        console.log("Call fetch inside useEffect");  
    //   fetch('http://localhost:3000/api1/petstore/addItems')
    //     .then(response => response.json())
    //     .then(data => setData(data))
    //     .catch((error) => console.log('error', error));
        fetch('http://localhost:3000/api1/petstore/addItems')
        .then(response => response.json())
        .then(data => {
            //setCartData(data);
            console.log("Set Cart Data 3: " + JSON.stringify(data));
            //"itemName":"ball","itemID":"123","price":100,"quantity":10
            setItems(data.map((item) => {return { id: item.itemID, name: item.itemName, quantity: item.quantity, price: item.price }}));
        }, [])
        .catch((error) => console.log('error', error));
    }, [setCheckoutConfirmation]);

    //fetch('http://localhost:3000/api1/petstore/addItems')
    //.then(response => response.json())
    //.then(data => {
    //    setCartData(data);
    //    console.log("Set Cart Data: " + JSON.stringify(cartData));
    //}, [])
    //.catch((error) => console.log('error', error));

    // State to keep track of the number of items in the cart
    /*
    let numItems = 6;

    const [value, setValue] = React.useState(0);
    const handleMinus = () => {
        setValue(parseInt(value, 10) - 1);
    };
    const handlePlus = () => {
        setValue(parseInt(value, 10) + 1);
    };

    // function updateCartData(event){
    //     cartData[event.target.name][event.target.value] = event.target.value;
    //     //TODO saving this everytime may be slow
    // }
    */
    
    const [myFormState, setMyFormState] = useState({});

    function handleChange(event) {
        setMyFormState({
        ...myFormState,
        [event.target.name]: event.target.value,
        });
    }
  
//following is a sample CheckoutData in JSON
//{
//    "items": [
//        {
//            "itemName": "Sony WH-1000XM4",
//            "itemID": "1",
//            "price": 348.00,
//            "quantity": 1
//        },
//        {
//            "itemName": "Fitbit Charge 5",
//            "itemID": "2",
//            "price": 179.95,
//            "quantity": 1
//        }
//    ],
//    "name": "John Doe",
//    "cardNumber": "1234567890123456",
//    "address": "123 Main St",
//    "expiration": "12/25",
//    "cvv": "123"
//}
    function handleCheckout(event){
        event.preventDefault();

        const userData = {
            name: 'John',
            email: 'john@example.com',
          };
          
          const items4Server = items.map((item) => {
            return { itemName: item.name, itemID: item.id, price: item.price, quantity: item.quantity}}); 


          var checkoutInput = {
            //items: items4Server, 
            items: [], 
            name: "string",
            cardNumber: "string",
            address: "string",
            expiration: "string",
            cvv: "string"
          }

          //call petsotre checkout
          fetch('http://localhost:3000/api1/petstore/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkoutInput),
            })
            .then((res) =>  res.json())
            .then(json => {
                    console.log("Done" + JSON.stringify(json));
                    setCheckoutConfirmation(json.orderId);
                })
            .catch((error) => console.log('error', error));

        setItems([]);
/*  
          const query = `mutation Checkout($input: CheckoutData!) {
            checkout(entry: $input) {
              status
            }
          }`;
          
          const variables = {
            input: JSON.stringify(checkoutInput),
          };
          
          fetch('http://localhost:3000/api/covid19/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              query,
              variables,
            }),
          })            
          .then((res) =>  res.json())
          .then(json => "Done" + console.log(JSON.stringify(json)))
          .catch((error) => console.log('error', error));   
*/


 /*       
        console.log("Checkout: " + JSON.stringify(myFormState) + " " + JSON.stringify(setItems));
        const checkoutData = {
            "items": items,
            "name": myFormState.name,
            "cardNumber": myFormState.cardNumber,
            "address": myFormState.address,
            "expiration": myFormState.expiration,
            "cvv": myFormState.cvv
        }

        const items4Server = items.map((item) => {
            return { itemID: item.id, itemName: item.name, quantity: item.quantity, price: item.price }}); 

        fetch('http://localhost:3000/api/covid19/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            //add itemID and userID to the query  
            body: JSON.stringify({
                query: 
                'mutation { checkout( entry: {items:'+JSON.stringify(items4Server)+', name: "string", cardNumber: "string", address: "string", expiration: "string", cvv: "string"} ) {status}}'
            }), 
            })
            .then((res) =>  res.json())
            .then(json => "Done" + console.log(JSON.stringify(json)))
            .catch((error) => console.log('error', error));   
*/         
          
        console.log("Checkout Done");
    }

    // 'mutation { checkout( entry: {items:'+JSON.stringify(items4Server)+', name: "string", cardNumber: "string", address: "string", expiration: "string", cvv: "string"} ) {status}}'

    function handleQuantityChange(itemId, delta) {
        setItems(items => {
          return items.map(item => {
            if (item.id === itemId) {
              return { ...item, quantity: item.quantity + delta };
            } else {
              return item;
            }
          });
        });
     }
    

    
    // console.log("Cart Data 3: " + JSON.stringify(cartData));  
    // const cartItems = cartData.map((item) => (
    //     <tr key={item.itemID}>
    //         <td>{item.itemName}</td>
    //         <td width="120px">
    //         <InputGroup>
    //             <InputGroup.Button onClick={handleMinus}>-</InputGroup.Button>
    //             <InputNumber className="custom-input-number" value={item.quantity} onChange={updateCartData} name={item.itemID}/>
    //             <InputGroup.Button onClick={handlePlus}>+</InputGroup.Button>
    //         </InputGroup></td>
    //         <td width="120px" className="text-center">${item.price}</td>
    //         <td width="120px" className="text-center">${item.price*item.quantity}</td>
    //     </tr>
    // ));

  
    /*
        return (
        <div>
            <h1>helloooo</h1>
          <div>
            <ul>
            {items.map(item => (
                <li key={item.id}>
                {item.name}: {item.quantity}
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </li>
            ))}
            </ul>
        </div>
       </div> 
    );
    }
    */
    
    
    console.log("before return ");
    var message; 
    if (checkoutConfirmation.length > 0){
        message = <p>Thank you for your purchase. Your order number is {checkoutConfirmation}</p>
    } else{
        message = <p>Checking out items - You have {items.length} items in your cart</p>
    }

    return (
        <>

        <Container className="mt-5">
            <Row>
                <Col>
                    <p>{message}</p>
                    <table className='table align-middle'> 
                       <thead>
                        <tr className="text-center">
                            <th scope="col"></th>
                            <th scope="col">QTY</th>
                            <th scope="col" >Unit</th>
                            <th scope="col">Total</th>
                        </tr>
                       </thead>           
                       <tbody>
                            {items.map(item => (
                                <tr>
                                <td>{item.name}</td>
                                <td width="120px">
                                <div>
                                    <ul>

                                        <li key={item.id}>
                                        {item.name}: {item.quantity}
                                        <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                        </li>

                                    </ul>
                                </div>
                                </td>
                                <td width="120px" className="text-center">${item.price}</td>
                                <td width="120px" className="text-center">${item.price*item.quantity}</td>
                                </tr>
                            ))}
                       </tbody>          
                    </table>
                </Col>
    
                <Col className="col-4 bg-primary p-4 text-white rounded-3"><h2>Card Details</h2>
                    <Form onSubmit={handleCheckout}>
                        <Row>
                        <Form.Group className="mb-3" controlId="formNameOnCard">
                            <FormLabel>Name on Card</FormLabel>
                            <Form.Control type="text" placeholder="Enter full name" name="name" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCardNumber">
                            <FormLabel>Card Number</FormLabel>
                            <Form.Control type="text" placeholder="Enter card number" name="cardNumber" onChange={handleChange}/>
                        </Form.Group>
                        </Row>
                        <Row><Col>
                        <Form.Group className="mb-3" controlId="formExpirationDate">
                            <FormLabel>Expiration Date</FormLabel>
                            <Form.Control type="text" placeholder="Expiration Date" name="expiration" onChange={handleChange}/>
                        </Form.Group></Col>
                        <Col>
                        <Form.Group className="mb-3" controlId="formCVV">
                            <FormLabel>CVV</FormLabel>
                            <Form.Control type="text" placeholder="CVV" name="cvv" onChange={handleChange}/>
                        </Form.Group></Col>
                        </Row>
                        <Row className="p-2">
                            <Col>Subtotal</Col>
                            <Col className="col-2 d-flex justify-content-right">$134.97</Col>
                        </Row>
                        <Row className="p-2">
                            <Col>Shipping</Col>
                            <Col className="col-2 d-flex justify-content-right">$20</Col>
                        </Row>
                        <Row className="p-2">
                            <Col c>Tax</Col>
                            <Col className="col-2 d-flex justify-content-right">$10.34</Col>
                        </Row>
    
                        <Row className="p-2">
                            <Col>Total (inc. tax)</Col>
                            <Col className="col-2 d-flex justify-content-right">$165.31</Col>
                        </Row>
                        <Row className="d-flex justify-content-center p-3">
                            <Button variant="warning" type="submit" size="lg" >
            Place Order
          </Button>
                            </Row>
                    </Form>
                </Col>
            </Row>
            
        </Container>
        </>
      );
    }    




  /*
   // return (
    //     <div>
    //         <h1>helloooo</h1>
    //       <div>
    //         {cartData.map(item => <div key={item.id}>{item.itemName}</div>)}
    //     </div>
    //    </div> 
    // );

    
  */

    /*
    console.log("before return ");
    return (
        <>

        <Container className="mt-5">
            <Row>
                <Col>
                    <p>Checking out items - You have {numItems} items in your cart</p>
                    <table className='table align-middle'> 
                       <thead>
                        <tr className="text-center">
                            <th scope="col"></th>
                            <th scope="col">QTY</th>
                            <th scope="col" >Unit</th>
                            <th scope="col">Total</th>
                        </tr>
                       </thead>           
                       <tbody>
                       {cartItems}
                        <tr>
                        <td>Top Paw® Valentine's Day Single Dog Sweater</td>
                        <td width="120px"><InputGroup>
            <InputGroup.Button onClick={handleMinus}>-</InputGroup.Button>
            <InputNumber className="custom-input-number" value={3} onChange={setValue} />
            <InputGroup.Button onClick={handlePlus}>+</InputGroup.Button>
          </InputGroup></td>
                        <td width="120px" className="text-center">$ 14.99</td>
                        <td width="120px" className="text-center">$ 44.97</td>
                        </tr>
                        
                        <tr>
                        <td>Arcadia Trail™ Dog Windbreaker</td>
                        <td width="120px"><InputGroup>
            <InputGroup.Button onClick={handleMinus}>-</InputGroup.Button>
            <InputNumber className="custom-input-number" value={3} onChange={setValue} />
            <InputGroup.Button onClick={handlePlus}>+</InputGroup.Button>
          </InputGroup></td>
                        <td width="120px" className="text-center">$ 29.99</td>
                        <td width="120px" className="text-center">$ 89.97</td>
                        </tr>
    
                       </tbody>          
                    </table>
                </Col>
    
                <Col className="col-4 bg-primary p-4 text-white rounded-3"><h2>Card Details</h2>
                    <Form onSubmit={handleCheckout}>
                        <Row>
                        <Form.Group className="mb-3" controlId="formNameOnCard">
                            <FormLabel>Name on Card</FormLabel>
                            <Form.Control type="text" placeholder="Enter full name" name="name" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCardNumber">
                            <FormLabel>Card Number</FormLabel>
                            <Form.Control type="text" placeholder="Enter card number" name="cardNumber" onChange={handleChange}/>
                        </Form.Group>
                        </Row>
                        <Row><Col>
                        <Form.Group className="mb-3" controlId="formExpirationDate">
                            <FormLabel>Expiration Date</FormLabel>
                            <Form.Control type="text" placeholder="Expiration Date" name="expiration" onChange={handleChange}/>
                        </Form.Group></Col>
                        <Col>
                        <Form.Group className="mb-3" controlId="formCVV">
                            <FormLabel>CVV</FormLabel>
                            <Form.Control type="text" placeholder="CVV" name="cvv" onChange={handleChange}/>
                        </Form.Group></Col>
                        </Row>
                        <Row className="p-2">
                            <Col>Subtotal</Col>
                            <Col className="col-2 d-flex justify-content-right">$134.97</Col>
                        </Row>
                        <Row className="p-2">
                            <Col>Shipping</Col>
                            <Col className="col-2 d-flex justify-content-right">$20</Col>
                        </Row>
                        <Row className="p-2">
                            <Col c>Tax</Col>
                            <Col className="col-2 d-flex justify-content-right">$10.34</Col>
                        </Row>
    
                        <Row className="p-2">
                            <Col>Total (inc. tax)</Col>
                            <Col className="col-2 d-flex justify-content-right">$165.31</Col>
                        </Row>
                        <Row className="d-flex justify-content-center p-3">
                            <Button variant="warning" type="submit" size="lg" >
            Place Order
          </Button>
                            </Row>
                    </Form>
                </Col>
            </Row>
            
        </Container>
        </>
      );
    }    

*/


 
  
  
  

  
  
  
