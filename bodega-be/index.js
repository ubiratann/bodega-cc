// Express
const express     = require("express")
const bodyParser  = require("body-parser")
const cors        = require("cors")

// Swagger
const swaggerUi   = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// Router
const router = require('express').Router();
const productsRouter = require("./routes/product")
const usersRouter    = require("./routes/user")

// Swagger ui 
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:4000",
			},
		],
	},
	apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);


// Application setup
const app = express()
const PORT = process.env.PORT || 4000


// Routes definitions


app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/product", productsRouter)
app.use("/user", usersRouter)




app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) 