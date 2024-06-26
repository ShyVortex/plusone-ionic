export class LoginUtilities {
  public static getRuoloByEmail(email: string) :string {
    if(this.isValidEmail(email)){
      if(email.includes("@paziente.it"))
        return "PAZIENTE";
      else if(email.includes("@medico.it"))
        return "MEDICO";
      else if(email.includes("@infermiere.it"))
        return "INFERMIERE";
      else if(email.includes("@admin.it"))
        return "ADMIN";
      else
        return "NON VALIDA";
    }
    else{
      return "NON VALIDA"
    }



  }
  private static isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
