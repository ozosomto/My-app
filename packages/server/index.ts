import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';

dotenv.config();



const app = express();
app.use(express.json());
app.use( router);

// ✅ Allow requests from your frontend (React app)
app.use(cors({ origin: "http://localhost:5173" }));


const port = process.env.PORT || 3000;



// let lastResponseId: string | null = null;
// conversationId -> lastResponseId
// convsation->100
// conservation->200


 app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
 });
