import * as bcrypt from 'bcryptjs';


export class HashingUtilities {

  static  async  HashPassword(password: string):Promise<string> {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    }
    static async verifyPassword(password: string,hashedPassword:string):Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }


}
