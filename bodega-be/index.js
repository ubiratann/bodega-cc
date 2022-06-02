// Express
const express     = require("express")
const bodyParser  = require("body-parser")
const cors        = require("cors")

// Swagger
const swaggerUi   = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerFile = require('./src/swagger/swagger_output.json');

// Router
const productsRouter = require("./src/routes/product")
const usersRouter    = require("./src/routes/user")
const reserveRouter  = require("./src/routes/reserve")

// Application setup
const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

// Routes definitions
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/product", productsRouter)
app.use("/user", usersRouter)
app.use("/reserve", reserveRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) 