import { Repository } from "typeorm";
import { Chat } from "../../database/entities/Chat";
import { genId } from "../../utils/genId";
import { User } from "../../database/entities/User";

export class CreateChatService {
  static create: Chat | string;
  constructor(private chatRepository: Repository<Chat>, private userRepository: Repository<User>) { }

  async create({ userSender, userReceiver }: { userSender: string, userReceiver: string }): Promise<Chat | string> {
    try {
      const sender = await this.userRepository.findOne({ where: { username: userSender } });
      if (!sender) return "Can not find user sender";

      const receiver = await this.userRepository.findOne({ where: { username: userReceiver } });
      if (!receiver) return "Can not find user receiver";

      const chatExist = await this.chatRepository.findOne({ where: { userSender: { username: sender.username }, userReceiver: { username: receiver.username } } });
      if (chatExist) return "Chat already exists";

      const chat = this.chatRepository.create({ id: genId(15), userSender: sender, userReceiver: receiver });
      await this.chatRepository.save(chat);

      return chat;
    }
    catch (err) {
      console.log(err)
    }
  }
}
