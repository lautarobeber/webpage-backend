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
import path from 'path';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';


const app = express();





// Servir archivos estáticos desde el directorio 'public'


app.use(cors({
    origin: process.env.APP_HOST,
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

app.use('/', express.static('dist'));
app.use('/products', express.static('dist'));
app.use('/login', express.static('dist'));
app.use('/products/:id', express.static('dist'));
app.use('/register', express.static('dist'));
app.use('/login', express.static('dist'));
app.use('/order', express.static('dist'));
app.use('/orderCart', express.static('dist'));
app.use('/myShopping', express.static('dist'));
app.use('/succes', express.static('dist'));
app.use('/admin', express.static('dist'));
app.use('/admin/products', express.static('dist'));
app.use('/admin/users', express.static('dist'));
app.use('/admin/orders', express.static('dist'));
app.use('/admin/categories', express.static('dist'));
app.use('/admin/orders-list', express.static('dist'));
app.use('/admin/addproduct', express.static('dist'));
app.use('/admin/addcategory', express.static('dist'));
app.use('/cart', express.static('dist'));


app.use('/public', express.static('src/uploads'))
/* app.use(express.static("dist"));  */





app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', productsRoutes);
app.use('/api', cartRouters)
app.use('/api', paymentStripeRouter);
app.use('/api', CategoriesRouter);
app.use('/api', usersRoutes)
app.use('/api', orderRoutes)

export default app
