import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const PORT: number = +process.env.PORT! || 3000;
const app: express.Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json('hello world'));

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
