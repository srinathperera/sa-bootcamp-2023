import ballerina/graphql;
import ballerina/io;


public type ItemData record {|
    readonly string itemID;
    string itemName;
    string itemDesc;
    string itemImage;
    string includes; 
    string intendedFor;
    string color;
    string material;
    float price; 
|};

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
 

public type AddItemResponse record {|
    string[] itemIDs;
|};

public type GetAddItemDataResponse record {|
    AddItemData[] items;
|};

public type FollowedState record {|
    string itemID;
    string userID;
|};


public type AddFollowedStateResponse record {|
    string itemID;
|};

public type CheckoutResponse record {|
    string status;
|};


table<AddItemData> addItemTable = table[]; 
//following is a sample ItemData as a table using realsitic values

table<ItemData> itemDataTable = table [
  {
    itemID: "1",
    itemName: "Sony WH-1000XM4",
    itemDesc: "Wireless Noise-Canceling Headphones",
    itemImage: "./wh1000xm4.png",
    includes: "Carrying Case, Audio Cable, USB-C Charging Cable, Adapter",
    intendedFor: "Music Lovers",
    color: "Black",
    material: "Plastic, Leather",
    price: 348.00
  },
  {
    itemID: "2",
    itemName: "Fitbit Charge 5",
    itemDesc: "Advanced Health & Fitness Tracker",
    itemImage: "./fitbit.png",
    includes: "Charging Cable",
    intendedFor: "Fitness Enthusiasts",
    color: "Black",
    material: "Plastic, Rubber",
    price: 179.95
  },
  {
    itemID: "3",
    itemName: "Apple iPhone 13 Pro Max",
    itemDesc: "6.7-inch Super Retina XDR Display",
    itemImage: "./iphone.png",
    includes: "Charging Cable, EarPods",
    intendedFor: "Techies",
    color: "Graphite",
    material: "Stainless Steel, Ceramic Shield Front Cover",
    price: 1099.00
  },
  {
    itemID: "4",
    itemName: "Samsung Galaxy Watch 4 Classic",
    itemDesc: "Smartwatch with Advanced Health Monitoring",
    itemImage: "./galaxy-watch.png",
    includes: "Wireless Charging Dock",
    intendedFor: "Techies, Fitness Enthusiasts",
    color: "Black",
    material: "Stainless Steel",
    price: 349.99
  },
  {
    itemID: "5",
    itemName: "DJI Mavic Air 2",
    itemDesc: "Foldable 4K Drone",
    itemImage: "./dji-mavic.png",
    includes: "Remote Controller, Intelligent Flight Battery, Charger",
    intendedFor: "Drone Enthusiasts, Photographers",
    color: "Gray",
    material: "Plastic",
    price: 799.00
  },
  {
    itemID: "6",
    itemName: "Anker PowerCore 10000",
    itemDesc: "Ultra-Compact 10000mAh Portable Charger",
    itemImage: "./anker-powercore.png",
    includes: "Charging Cable",
    intendedFor: "Travelers, Techies",
    color: "Black",
    material: "Plastic",
    price: 19.99
  },
  {
    itemID: "7",
    itemName: "Bose QuietComfort 35 II",
    itemDesc: "Wireless Noise-Canceling Headphones",
    itemImage: "./bose-quietcomfort.png",
    includes: "Carrying Case, Audio Cable, USB Charging Cable",
    intendedFor: "Music Lovers",
    color: "Black",
    material: "Plastic, Leather",
    price: 299.00
  },
  {
    itemID: "8",
    itemName: "Amazon Echo Dot",
    itemDesc: "Smart Speaker with Alexa",
    itemImage: "./echo-dot.png",
    includes: "Power Adapter",
    intendedFor: "Smart Home Enthusiasts",
    color: "Charcoal",
    material: "Plastic",
    price: 49.99
  }, 
    {itemID: "1", itemName: "Item 1", itemDesc: "Item 1 Description", itemImage: "./item-1.png", includes: "Item 1 Includes", intendedFor: "Item 1 Intended For", color: "Item 1 Color", material: "Item 1 Material", price:23.3},
    {itemID: "2", itemName: "Item 2", itemDesc: "Item 2 Description", itemImage: "./item-2.png", includes: "Item 2 Includes", intendedFor: "Item 2 Intended For", color: "Item 2 Color", material: "Item 2 Material", price:3.2},
    {itemID: "3", itemName: "Item 3", itemDesc: "Item 3 Description", itemImage: "./item-3.png", includes: "Item 3 Includes", intendedFor: "Item 3 Intended For", color: "Item 3 Color", material: "Item 3 Material", price:4.3}
];



//following is a sample FollowedState as a table using realsitic values
table<FollowedState> followedStateTable = table [
    {itemID: "1", userID: "1"},
    {itemID: "2", userID: "1"},
    {itemID: "3", userID: "1"}
];

//@http:ServiceConfig {
//    cors: {
//        allowOrigins: ["*"],
//        allowHeaders: ["*"],
//        exposeHeaders: ["X-CUSTOM-HEADER"]
//    }
//}


public distinct service class PetStoreItemData {
    
    private final ItemData entryRecord;

    public isolated function init(ItemData entryRecord) {
        self.entryRecord = entryRecord;
    }


    //generate a resource for each feild in entryRecord
    resource function get itemID() returns string {
        return self.entryRecord.itemID;
    }

    resource function get itemName() returns string {
        return self.entryRecord.itemName;
    }

    resource function get itemDesc() returns string {
        return self.entryRecord.itemDesc;
    }

    resource function get itemImage() returns string {
        return self.entryRecord.itemImage;
    }

    resource function get includes() returns string {
        return self.entryRecord.includes;
    }

    resource function get intendedFor() returns string {
        return self.entryRecord.intendedFor;
    }

    resource function get color() returns string {
        return self.entryRecord.color;
    }

    resource function get material() returns string {
        return self.entryRecord.material;
    }

    resource function get price () returns float {
        return self.entryRecord.price;
    }

}

service /covid19 on new graphql:Listener(9000) {
    resource function get all() returns PetStoreItemData[] {
        ItemData[] covidEntries = itemDataTable.toArray().cloneReadOnly();
        return covidEntries.map(entry => new PetStoreItemData(entry));
    }

    resource function get checkoutData(string isoCode) returns PetStoreItemData? {
        return new PetStoreItemData(itemDataTable.toArray().cloneReadOnly()[0]);
    }

    remote function addItem(AddItemData[] items2add) returns AddItemResponse{
        io:println("adding items" + items2add.toString());
        items2add.forEach(function (AddItemData item) {
            addItemTable.add(item);
        });
        
        return {itemIDs: ["1", "2", "3"]};
    }

//    resource function get addItems() returns GetAddItemDataResponse{
//        io:println("getting add items data");
//        return {items: addItemTable.toArray().cloneReadOnly()};
 //   }

    //write a graphql mutation functin to add followed state to a new table 
    remote function addFollowedState(string itemID, string userID) returns AddFollowedStateResponse{
        followedStateTable.add({itemID: itemID, userID: userID});
        return {itemID: itemID};
    }


    remote function checkout(CheckoutData entry) returns CheckoutResponse{
        io:println("checkout" + entry.toString());
        return {status: "success"};
    }
}