require('dotenv').config();

// Express
const express     = require("express");
const bodyParser  = require("body-parser");
const cors        = require("cors");

//Sequelize
const connection = require("./src/database/connection");
const User       = require("./src/models/user");
const Reserve    = require("./src/models/reserve");
const Product    = require("./src/models/product");
const Sale    = require("./src/models/sale");
const Category    = require("./src/models/category");

// Swagger
const swaggerUi    = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerFile  = require('./src/swagger/swagger_output.json');

// Router
const productsRouter = require("./src/routes/product");
const usersRouter    = require("./src/routes/user");
const reserveRouter  = require("./src/routes/reserve");


// Application setup
const app  = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes definitions
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/reserves", reserveRouter);


// Database agregations && sync
Product.hasOne(Reserve);
Product.hasOne(Sale);
Product.belongsTo(Category);
Reserve.belongsTo(User);
Sale.belongsTo(Reserve);
User.hasMany(Reserve);

connection.sync({force: true}).then(response => {
    console.log("Database synced");
}).catch(err =>{
    console.log(err);
} );


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));