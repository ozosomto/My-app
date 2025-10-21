import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';


// Implementation of controller
// validation
// error handling
// call service layer
const ChatRequestSchema = z.object({
    prompt: z.string()
    .trim()
    .min(1, "Prompt cannot be empty.")
    .max(1000, "Prompt is too long (max 1000 characters)"),
    conversationId: z.string().uuid()
});


// public interface
export const chatController = {
 async sendMessage(req: Request, res: Response) {
    
const parseResult = ChatRequestSchema.safeParse(req.body);
if (!parseResult.success) {
    return res.status(400).json( parseResult.error.format ());

}

try {

   const {prompt, conversationId} = req.body;

    const response = await chatService.sendMessage(prompt, conversationId);
    
    res.json({ message: response.message });
    
} catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request.' })
}  

}
}
