var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  nowWhat();
});

function showInventory(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err){throw err};
        console.log("\n----------------------------------------");
        console.log("Items available for purchase: ");
        console.log("----------------------------------------");
        for(var i=0; i<res.length; i++){
            console.log(res[i].item_id + " $" + res[i].price + " " + res[i].product_name);
        }
        console.log("\n----------------------------------------");
        askUser();
    });
};
 
function askUser(){
    inquirer.prompt([
        {
            type: "input",
            name: "idSelection",
            message: "Please enter the id number of the product you wish to buy"
        },{
            type: "input",
            name: "qtySelection",
            message: "How many would you like to buy?"
        }
    ]).then(function(answer){
        // console.log("id selection: " + answer.idSelection);
        // console.log("quantity: " + answer.qtySelection);

        connection.query("SELECT stock_quantity FROM products WHERE item_id = ?",[answer.idSelection], function(err, res){
            // console.log("All results: " + res);
            // console.log("sql qty: " + res[0].stock_quantity);
       
            if(res[0].stock_quantity > answer.qtySelection){
               connection.query("UPDATE products SET ? WHERE ?",
               [
                {
                    stock_quantity: (res[0].stock_quantity-answer.qtySelection)
                },
                {
                   item_id: answer.idSelection
                }
               ]); 
               console.log("---------------------------------------------");
               console.log("*****Purchase complete! Thank you!*****");
               console.log("---------------------------------------------");
               nowWhat();
                
            }else{
                console.log("******Sorry, Insufficiant Inventory!******");
                nowWhat();
            }
        }); 
    });
}
function nowWhat(){
    inquirer.prompt([
        {
            type: "list",
            name: "nowWhat",
            message: "What would you like to do?",
            choices: ["Shop", "Exit Bamazon"]
        }
    ]).then(function(answer){
        if(answer.nowWhat === "Shop"){
            showInventory();
        }else if(answer.nowWhat === "Exit Bamazon"){
            connection.end();
        }
    });
}