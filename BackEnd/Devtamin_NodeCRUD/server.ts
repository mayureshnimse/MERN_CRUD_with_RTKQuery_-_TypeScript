import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
//import productRoute from './routes/productRoute';
const productRoute = require('./routes/productRoute')
//import errorMiddleware from './middleware/errorMiddleware';
const errorMiddleware = require('./middleware/errorMiddleware')
import cors from 'cors';

require('dotenv').config();

const app = express();

const MONGO_URL: string = process.env.MONGO_URL ?? 'default-mongo-url';
const PORT: number = parseInt(process.env.PORT || '8080', 10); // Parse the port as a number
const FRONTEND: string | undefined = process.env.FRONTEND;

var corsOptions = {
  origin: FRONTEND, // frontend ip address/domain name which could access your backend
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/products', productRoute);

app.get('/', (req: Request, res: Response) => {
  // throw new Error('fake error')
});

// Error middleware should have type annotations
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB..');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
