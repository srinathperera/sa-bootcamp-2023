import ballerina/io;
import ballerina/graphql;

public function main() {
    //call graphql endpoint and get all items
    graphql:Client graphqlClient = check new ("localhost:9090/graphql");

    string document = "{ profile { name, age } }";

    // The `execute` remote method of the `graphql:Client` takes a GraphQL document as the
    // required argument and sends a request to the specified backend URL seeking a response. On the
    // retrieval of a successful response, the client tries to perform data binding for the
    // user-defined data type. On failure to retrieve a successful response or when the client fails
    // to perform data binding, a `graphql:ClientError` will be returned.
    ProfileResponse response = check graphqlClient->execute(document);
    io:println(response.data.profile);


}