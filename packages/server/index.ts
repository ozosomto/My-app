import express from 'express';
import dotenv from 'dotenv';
import router from './routes';





dotenv.config();



const app = express();
app.use(express.json());
app.use( router);

const port = process.env.PORT || 3000;



// let lastResponseId: string | null = null;
// conversationId -> lastResponseId
// convsation->100
// conservation->200


 app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
 });
