import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggwer';
import userRoutes from './routes/user.routes'
import busRoutes from './routes/bus.routes'
import rutaRoutes from './routes/ruta.routes'
import horarioRoutes from './routes/horario.routes'
import reservaRoutes from './routes/reserva.routes'
//instanciamos expres
const app = express();
//aqui decimos que utile el module morgan y quiero su propiedad dev del modulo
app.use(morgan('dev'));
//tambien que utilice el modulo cors
app.use(cors());
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(userRoutes)
app.use(busRoutes)
app.use(rutaRoutes)
app.use(horarioRoutes)
app.use(reservaRoutes)



export default app;