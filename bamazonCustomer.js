// initialize dependecies
var mysql = require("mysql");
// var inquirer = require("inquirer");

// when the node application is run...
    // connect to sql database
var connection = mysql.createConnection({
    // store credentials
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});
        // make the connection
connection.connect(function(err){
    if(err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
    connection.end();
});
        // display the contents of the database with all columns and rows
    // with inquirer prompt the user
        // Ask what they would like to buy
        // Ask how many
            // with answers
                // verify quantity
                    // if insufficient
                        // console.log("insufficent");
                    // if sufficient
                        // Update database
                        // console.log (customer's purchase total);


