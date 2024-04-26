import express from "express"
import morgan from 'morgan'
import cookieParser from "cookie-parser";
import cors from 'cors'
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/products.routes.js"
import cartRouters from "./routes/cart.routes.js"
import paymentStripeRouter from './routes/payment.stripe.routes.js'
import CategoriesRouter from './routes/category.routes.js'
import usersRoutes from "./routes/users.routes.js";
import orderRoutes from "./routes/order.routes.js"

const app = express();

console.log(process.env.CLIENT_ORIGIN)

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}));
app.use(morgan('dev'));
app.use(
    bodyParser.json({
        verify: function(req, res, buf) {
            req.rawBody = buf;
        }
    })
);
app.use(cookieParser());

app.use('/public', express.static('src/uploads'))
app.use('/api', authRoutes);
app.use('/api', productsRoutes);
app.use('/api', cartRouters)
app.use('/api', paymentStripeRouter);
app.use('/api', CategoriesRouter);
app.use('/api', usersRoutes)
app.use('/api', orderRoutes)

export default app
