const swaggerAutogen = require('swagger-autogen')();


const doc = {
    info: {
        version: "1.0.0",
        title: "Bodega API",
        description: "Documentação dos endpoints da Bodega-cc"
    },
    host: "localhost:4000",
    basePath: "/",
    schemes: ['http',],
    consumes: ['application/json'],
    produces: ['application/json'],
}


const outputFile = './src/swagger/swagger_output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index')           // Your project's root file
})