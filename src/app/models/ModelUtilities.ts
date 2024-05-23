import { Paziente } from "./paziente/Paziente";
import { Medico } from "./medico/Medico";
import { Persona } from "./persona/persona";
import { Infermiere } from "./infermiere/Infermiere";
import { Terapia } from "./terapia/Terapia";

export class ModelUtilities {
  static pazienteFromJSON(json: any): Paziente {
    let paziente: Paziente = new Paziente();

    ModelUtilities.personFromJSON(json, paziente);

    paziente.donatoreOrgani = json.donatoreOrgani;
    paziente.medico = json.medico;
    paziente.esenzione = json.esenzione;
    paziente.indirizzo = json.indirizzo;
    paziente.terapie = json.terapie;

    return paziente;
  }

  public static medicoFromJSON(json: any): Medico {
    let medico: Medico = new Medico();

    ModelUtilities.personFromJSON(json, medico);

    medico.ospedale = json.ospedale;
    medico.reparto = json.reparto;
    medico.ruolo = json.ruolo;
    medico.tipologiaMedico = json.tipologiaMedico;
    medico.terapie = json.terapie;
    medico.pazienti = json.pazienti;

    return medico;
  }

  public static infermiereFromJSON(json: any): Infermiere {
    let infermiere: Infermiere = new Infermiere();

    ModelUtilities.personFromJSON(json,infermiere);
    infermiere.ospedale = json.ospedale;
    infermiere.reparto = json.reparto;
    infermiere.ruolo = json.ruolo;

    return infermiere;
  }

  private static personFromJSON(json: any, persona: Persona) {
    persona.id = json.id;
    persona.nome = json.nome;
    persona.cognome = json.cognome;
    persona.CF = json.cf;
    persona.email = json.email;
    persona.password = json.password;
  }

  public static terapieFromJSON(json: any): Terapia {
    let terapia: Terapia = new Terapia();

    terapia.id = json.id;
    terapia.orario = json.orario;
    terapia.informazioneAggiuntive = json.informazioneAggiuntive;
    terapia.causa = json.causa;
    terapia.attivo =  json.attivo;
    terapia.medicoCurante = json.medicoCurante;
    terapia.paziente = json.paziente;
    terapia.tipologiaTerapia = json.tipologiaTerapia;

    return terapia;
  }
}
