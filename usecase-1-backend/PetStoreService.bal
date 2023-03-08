import ballerina/io;
import ballerina/http;

// The service-level CORS config applies globally to each `resource`.


public type AddItemData record {|
    string itemName;
    string itemID;
    float price;
    int quantity;
|};


public type CheckoutData record {|
    AddItemData[] items;
    string name;
    string cardNumber;
    string address;
    string expiration; 
    string cvv;
|}; 
//TODO add CORS support
public type CheckoutResponse record {|
    string status;
    string message;
    string orderId; 
|};


//write a service to add AddItemData to the database

table<AddItemData> addItemTable = table[]; 

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowCredentials: false,
        allowHeaders: ["CORELATION_ID"],
        exposeHeaders: ["X-CUSTOM-HEADER"],
        maxAge: 84900
    }
}

service /petstore on new http:Listener(9090) {
    //private final mysql:Client dbClient;



    function init() returns error? {

    }

    //write a sample json payload to add an item to the database
    // {
    //     "itemName": "ball",
    //     "itemID": "123",
    //     "price": 100.0,
    //     "quantity": 10
    // }


    resource function get addItems() returns AddItemData[]|error?  {
        return addItemTable.toArray();
        //return dbClient->query("SELECT * FROM items", AddItemData);
    }

    resource function post addItems(@http:Payload AddItemData[] addItems) returns string[] {
        addItems.forEach(function (AddItemData item) {
            addItemTable.add(item);
        });
        //string[] ids = [];
        //foreach AddItemData item in addItems {
        //    string sqlQuery = string `INSERT INTO items (itemName, itemID, price, quantity) VALUES (${item.itemName}, ${item.itemID}, ${item.price}, ${item.quantity})`;
        //    sql:ExecutionResult result = check dbClient->execute(sqlQuery);
        //    ids.push(<string>result.lastInsertId);
        //}
        //return ids;
        return ["Item added to the database"];
    }

    resource function delete addItems () returns string{
        addItemTable = table[];
        return "Items deleted";
    }

    resource function post checkout(@http:Payload CheckoutData checkoutData) returns CheckoutResponse {
        io:println(checkoutData);
        addItemTable = table[];
        return {status: "success", message: "Order placed successfully", orderId: "123"};
    }

    // resource function addItem(http:Caller caller, http:Request request) returns error? {
    //     //get the json payload from the request
    //     json payload = check request.getJsonPayload();
    //     //convert the payload to AddItemData record
    //     AddItemData data = check payload.cloneWithType(AddItemData);
    //     //create an insert query
    //     string sqlQuery = string `INSERT INTO items (itemName, itemID, price, quantity) VALUES (${data.itemName}, ${data.itemID}, ${data.price}, ${data.quantity})`;
    //     //execute the query
    //     sql:ExecutionResult result = check dbClient->execute(sqlQuery);
    //     //send the response back to the caller
    //     check caller->respond("Item added to the database");
    // }
}