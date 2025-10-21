// Implemtation details
const conversations = new Map<string, string>();

//Exported details
export const conversationRepository = {

 getLastResponseId(conversationId: string) {
    return conversations.get(conversationId);
},

 setLastResponseId(conversationId: string, responseId: string) {
    conversations.set(conversationId, responseId);
},

};


