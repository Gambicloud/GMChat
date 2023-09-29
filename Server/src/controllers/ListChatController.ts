import { Request, Response } from "express";
import { ListChatService } from "../services/ListChatService";
import { ChatRepository } from "../repositories/ChatRepository";

export class ListChatController{
  async list( req: Request, res: Response ){
    const { username } = req.params;

    const listChatService = new ListChatService(ChatRepository);

    const response = await listChatService.list({ username });

    return res.json(response)

  }
}