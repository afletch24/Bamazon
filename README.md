# Bamazon 
This is a amazon like app that utilizes Sequal Pro and Node.js to create a store front that keeps track of its inventory. 

## Dependencies
The following packages are required:
*mysql
*inquirer

## Bamazon in Action
After calling Bamazon through the terminal with node.js, Bamazon will give the user the option to enter the app. 

![Image of Start](/images/startScreen1.png)

Once the user selects "Shop", Bamazon will show the products available for purchase and their prices. 

![Image of Inventory](/images/inventory2.png)

The user is then prompted which product they would li ke to "purchase" by identifying the product by its id number and the quantity. Bamazon will check the inventory to see if there are enough products in stock to fullfill the user's order request. If the inventory is sufficient, the user will be informed that the purchase was accepted. 
 
![Image of Purchase](/images/purchase3.png)


If the inventory is insufficient, the user will be informed and given the option to continue shopping or exit Bamazon. 

![Image of Insufficient Inventory](/images/insufficentInventory.png)

