import {api} from "./api";

export type ChatMessageDto = {
    content: string;
    timestamp: string;
    sender: string;
    receiver: string;
};

export async function getMessages(target: string): Promise<ChatMessageDto[]> {
    const response = await api.get("/messages", {
        params: {
            target: target,
        }
    });

    return response.data;
}