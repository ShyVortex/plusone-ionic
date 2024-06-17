export class SignupUtilities {
  public static getRuoloByEmail(email: string) :string {
    if (this.isValidEmail(email)) {
      if (email.endsWith("@paziente.it"))
        return "PAZIENTE";
      else if (email.endsWith("@medico.it"))
        return "MEDICO";
      else if (email.endsWith("@infermiere.it"))
        return "INFERMIERE";
      else if (email.endsWith("@admin.it"))
        return "ADMIN";
      else
        return "NON VALIDA";
    }
    else
      return "NON VALIDA";
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
