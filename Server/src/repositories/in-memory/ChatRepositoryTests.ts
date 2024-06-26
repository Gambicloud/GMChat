import { Repository } from "typeorm"
import { Chat } from "../../database/entities/Chat";

export interface IChatRepository extends Repository<Chat>{
  chats: Array<Chat>
};

export const ChatRepositoryTest = {
  chats: [],
  create({ id, userSender, userReceiver }: Chat){
    const chat = { id, userSender, userReceiver };
    return chat;
  },

  save(chat: Chat){
    this.chats.push(chat)
  },

  findOne( { where } : any ) {
    let exists = false;
    const primaryKeys = Object.keys(where);

    const keysInPrimaryKeys = primaryKeys.map(key => {
      return Object.keys(where[key])[0];
    });

    this.chats.map(chat => {
     
      primaryKeys.map(primaryKey => {
        let allKeysMatch = 0;

        keysInPrimaryKeys.map(secKey => {
          if(chat[primaryKey] == where[primaryKey][secKey]) allKeysMatch++;
        });

        if(allKeysMatch == keysInPrimaryKeys.length) exists = chat;

      });
      
    });

    return exists;
  },

  //specific to ListChatService
  find( { where } : any ) {
    let exists = [];
    const allKeys = where;

    const primaryKeys = allKeys.map(key => {
      return Object.keys(key)[0];
    });

    const keysInPrimaryKeys = primaryKeys.map((key, index) => {
      return Object.keys(allKeys[index][key])[0];
    });

    this.chats.map(chat => {
      primaryKeys.map((key, index) => {
        let allKeysMatch = 0;

        keysInPrimaryKeys.map(secKey => {
          if(allKeys[index][key][secKey] == chat[key]) allKeysMatch++;
        });

        if(allKeysMatch == primaryKeys.length) exists.push(chat);

      })
    });

    return exists;
  }

} as unknown as IChatRepository; 