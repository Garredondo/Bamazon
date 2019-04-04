// initialize dependecies
var mysql = require("mysql");
var Table = require("easy-table");
var inquirer = require("inquirer");
var chalk = require("chalk");

// when the node application is run...
// connect to sql database
var connection = mysql.createConnection({
    // set credentials
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});
// make the connection
connection.connect(function (err) {
    if (err) throw err;
    presentMenu();
});

// list menu options
function presentMenu() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View products for sale",
            "View low inventory",
            "Add to inventory",
            "Add a new product"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View products for sale":
                viewProducts();
                break;
            case "View low inventory":
                viewLowInv();
                break;
            case "Add to inventory":
                addToInv();
                break;
            case "Add a new product":
                addNewProduct();
                break;
        }
    });
}
// using the easy-table npm, generate the table for the goods to be displayed
function createTable(res) {
    // using easy-table npm to create a table of the available goods
    var t = new Table;
    res.forEach(function (product) {
        t.cell("Item", product.item_id);
        t.cell("Product", product.product_name);
        t.cell("Department", product.department_name);
        t.cell("Price", product.price);
        t.cell("Quantity", product.stock_quantity);
        t.newRow();
    });
    console.log(t.toString());
}
// View Products for sale
// if this... list items, id, name, prices and quantities
function viewProducts() {
    console.log(chalk.green("\n\nBamazon - Manager View\n"));
    connection.query("SELECT * FROM products\n", function (err, res) {
        if (err) throw err;
        // called the function for the goods to be displayed
        createTable(res);
    });
    connection.end();
}
// view low inventory
// list every item with an inventory count lower than 5
function viewLowInv() {
    console.log(chalk.green("\n\nManager View - Low Inventory\n"));
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        // *** QUESTION HOW TO DEFINE THIS AS EMPTY
        // if (res < 0){
        //     console.log("No products have less than five in stock.")
        // }
        // called the function for the goods to be displayed
        createTable(res);
    });
    connection.end();
}

// add to inventory
// prompt, let manager add inventory to any item in stock
function addToInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "choice",
                type: "rawlist",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].product_name);
                    }
                    return choiceArray;
                },
                message: "To which item would you like to add stock?"
            },
            {
                name: "additionalStock",
                type: "input",
                message: "How much stock would you like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answer.choice) {
                    chosenItem = res[i];
                }
            }
            connection.query("UPDATE products SET ? WHERE ?", [
                {
                    stock_quantity: chosenItem.stock_quantity + parseInt(answer.additionalStock)
                },
                {
                    item_id: chosenItem.item_id
                }
            ], function (err) {
                if (err) throw err;
                console.log("\nInventory added\n");
                connection.end();
            })
        })
    })
}
// add new product
function addNewProduct() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What is the name of the new product you would like add?"
        },
        {
            name: "department",
            type: "input",
            message: "To what department would you like to assign the new product?"
        },
        {
            name: "price",
            type: "input",
            message: "What is the price of the new product?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "stock",
            type: "input",
            message: "How much stock would you like to add?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO products SET ?",
            {
                product_name: answer.item,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.stock
            },
            function(err){
                if(err) throw err;
                console.log("\nNew product added.\n");
                connection.end();
            }
        );
    })

}



