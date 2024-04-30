export class LoginUtilities {
  public static getRuoloByEmail(email: string) :string {
    if(this.isValidEmail(email)){
      if(email.includes("@paziente.it")){
        return "PAZIENTE"
      }
      else if(email.includes("@medico.it")){
        return "MEDICO"
      }
      else if(email.includes("@infermiere.it")){
        return "INFERMIERE"
      }
    }
    else{
      throw new Error("Email non valida");
    }
    return ""


  }
  private static isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
