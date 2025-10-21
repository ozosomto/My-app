import  express  from "express";
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';

const router = express.Router();

// Define routes and associate them with controller methods


router.get('/', (req: Request, res: Response) => {
   res.send('Hello, World!');
});
router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello world' });
});

router.post('/api/chat', chatController.sendMessage);

export default router;