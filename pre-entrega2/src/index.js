/////////////////////////////////////////////////////////
///////////IMPORTS
////////////////////////////////////////////////////////
const express = require("express");
const routes = require("./routes");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const Products = require('./dao/models/class.products');
const products = new Products();
const mongoose = require('mongoose')


/////////////////////////////////////////////////////////
///////////SERVIDOR EXPRESS
////////////////////////////////////////////////////////

const app = express();
const port = 8080;

//Conf handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

routes(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const httpServer = app.listen(port, () =>
  console.log(`Up and running in port ${port}`)
);
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("New connected client");
  const id = socket.id;

  socket.on("realtimeproducts", (data) => {
   // console.log(data + `from ${id}`);

    products.getProducts().then((data) => {
      const result = {
        products2: JSON.stringify(data),
      };
      socket.emit("obtainProducts", result);
    });
  });
});


/////////////////////////////////////////////////////////
///////////Mongoose
////////////////////////////////////////////////////////

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://CoderUser:FHT93BiHO5kSduUH@codercluster.39kdtej.mongodb.net/ecommerce?retryWrites=true&w=majority')