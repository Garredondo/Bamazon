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
});

// display the contents of the database with all columns and rows
function displayOfferings() {
    console.log(chalk.green("\n\nBamazon\n"));
    connection.query("SELECT * FROM products\n", function (err, res) {
        if (err) throw err;

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
        askUser();
    });
}
// with inquirer -- prompt the user

function askUser() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
                // what they would like to buy
                name: "itemDesired",
                type: "input",
                message: "What 'Item' would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
            },
            {
                // how many
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
            }
        ]).then(function (answer) {
            // with answers
            // verify quantity

            var userSelectedItem = results[answer.itemDesired - 1];
        
            checkStock(userSelectedItem, answer);
        });
    });
}

function checkStock(userSelectedItem, answer) {
    if (userSelectedItem.stock_quantity < answer.quantity) {
        console.log("\n\nSorry there is an insufficient amount of stock to make your request.");
        displayOfferings();
    } else {
        var total = answer.quantity * userSelectedItem.price;
        console.log("\n\nCalculating your total...");
        console.log("\nYour total is " + chalk.red(total.toFixed(2)));
        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: userSelectedItem.stock_quantity - parseInt(answer.quantity)
        }, {
            item_id: userSelectedItem.item_id
        }], function (err) {
            if (err) throw err;
            console.log("\nThank you for your business!\n\n");
            connection.end();
        })
    }
}

displayOfferings();
