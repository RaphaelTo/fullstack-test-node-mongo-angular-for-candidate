import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { connectAtMongoDB } from '@/Config/config';

import { routerAccount } from '@/Routes/Account';

const PORT: number = +process.env.PORT! || 3000;
const app: express.Application = express();

connectAtMongoDB();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`${process.env.URL_API}/account`, routerAccount);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
