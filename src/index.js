import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//routes
import authRoutes from './routes/authRoutes';
import pharmaRoutes from './routes/pharmaRoutes';
import userRouter from './routes/userRoutes';


const app = express();

const PORT = process.env.PORT || 7500;

app.use(cors());
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/auth', authRoutes);
app.use('/pharma', pharmaRoutes);
app.use("/user", userRouter);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});