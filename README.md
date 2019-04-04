# Bamazon

Bamazon is an Amazon-like storefront accessed through the command line. In the customer view of this app users are allowed to purchase items which deplete the inventory. In the manager view, the user can see the product offerings, view items with less than five items in stocks, add inventory, and add an entirely new product to the store.

### Customer View

At the start of the program, the storefront is displayed to the user and the user is asked which item they would like to purchase. 

The products table has the following columns:
  * A unique Id for each product, 
  * The name of the product,
  * The department where to find the product,
  * The price, and
  * Available inventory.

When the user is ready, they can respond to the prompt by inputting the item id. The user must select a number if not the entry will not be accepted. When the entry is accepted the user is then asked the quantity of the item they would like to purchase. Again, if a number is not inputted the response is not accepted. 

Once the item and amount have been logged the program verifies that there is enough stock to meet the customer's demand. If not, the transaction is stopped and the user is prompted with the message stating that there is an insufficient quantity. The user is presented with the storefront to amend their purchase quantity. When the amount of the order can be fulfilled the program calculates and displays the total cost of the user's purchase. 

Lastly, the stock updated to reflect the customer's purchase.

### Manager View

Running the Manager View of the application will present the user with a menu of options that include:
  * View products for sale,
  * View low inventory,
  * Add to inventory, and
  * Add a new product.

Selecting 'View products for sale' will display all available items for sale.

'View low inventory' will return all products with a current stock of less than five.

Picking 'Add to inventory' will prompt the user to select an item in which they would like to add stock and then ask the amount of stock to be added. 

Choosing to 'Add a new product' will ask the user the name, department, price, and stock of the new product to be added.

## Usefulness of Project

This application connects to a MySQL database to store the information that is used for the application. 

The app uses the following npm packages:
  * mysql - to record the storefront,
  * inquirer - to interact with the user,
  * easy-table - to display the database data in a table, and
  * chalk - to highlight certain text throughout the program. 

## Demo

For a demonstration of the project in action please click the link below.

## Contact Information

The project is maintained by George Arredondo.


