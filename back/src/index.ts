import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import coookieParser from 'cookie-parser';

import { checkSession } from '@/Middlewares/session';

import { connectAtMongoDB } from '@/Config/config';

import { routerAccount } from '@/Routes/Account';
import { routerProduct } from '@/Routes/Product';

const PORT: number = +process.env.PORT! || 3000;
const app: express.Application = express();

connectAtMongoDB();
app.use(morgan('dev'));
app.disable('x-powered-by');
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(coookieParser());

app.use(`${process.env.URL_API}/account`, routerAccount);
app.use(`${process.env.URL_API}/products`, checkSession, routerProduct);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
