import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options : swaggerJSDoc.Options={
    
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'API de reserva de boletos para Buses',
          version: '1.0.0',
         description: 'Documentación de la API de reserva de boletos para Buses, de la empresa ficcticia de transporte Expreso Arequipa',
        },
        // servers: [
        //   {
        //     url: 'http://localhost:3000', // Cambia esto si tu servidor está en una URL diferente
        //   },
        // ],
      },
      apis: [
        `${path.join(__dirname,'./routes/*')}`], // Ruta a los archivos donde están los endpoints, ajustado a TypeScript './routes/*.ts'
    };
    

    //const swaggerSpec = swaggerJsdoc(options);
    const swaggerSpec = swaggerJSDoc(options)
    export default swaggerSpec