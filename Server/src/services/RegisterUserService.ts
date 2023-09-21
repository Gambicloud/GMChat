import { User } from "../database/entities/User";
import { IUserRepository } from "../repositories/in-memory/UserRespositoryTests";
import { genUserId } from "../utils/genUserId";

export class RegisterUserService{
  static register: User;
  constructor( private userRepository: Omit<IUserRepository,"users"> ){};

  async register( { name, email, username, password }: Omit< User, "id" > ){
    try{
      const userExist = await this.userRepository.findOne({ where: { email: email.toLowerCase() } });
      if(userExist) return "User already exists";
  
      const user = this.userRepository.create({
        id: genUserId(),
        name,
        email: email.toLowerCase(),
        username,
        password
      });
  
      await this.userRepository.save(user);
  
      return user
    }
    catch(err){
      console.log(err)
    }
  };
};
