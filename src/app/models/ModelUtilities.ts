import { Paziente } from "./paziente/Paziente";
import { Medico } from "./medico/Medico";
import { Persona } from "./persona/Persona";
import { Infermiere } from "./infermiere/Infermiere";
import { Terapia } from "./terapia/Terapia";
import { Farmaco } from "./farmaco/Farmaco";
import { Triage } from "./triage/Triage";
import { Esame } from "./esame/Esame";
import {QuantitaDettaglio} from "./terapiafarmacologica/QuantitaDettaglio";
import {Segnalazione} from "./segnalazione/Segnalazione";

export class ModelUtilities {
  static pazienteFromJSON(json: any): Paziente {
    let paziente: Paziente = new Paziente();

    ModelUtilities.personFromJSON(json, paziente);

    paziente.donatoreOrgani = json.donatoreOrgani;
    paziente.medico = json.medico;
    paziente.esenzione = json.esenzione;
    paziente.indirizzo = json.indirizzo;
    paziente.terapie = json.terapie;
    paziente.attivo = json.attivo;

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
  public static quantitaDettaglioFromJSON(json:any): QuantitaDettaglio {
    let quantitaDettaglio: QuantitaDettaglio  = new QuantitaDettaglio();

    quantitaDettaglio.id = json.id;
    quantitaDettaglio.quantita = json.quantita;
    quantitaDettaglio.note = json.note;
    quantitaDettaglio.farmaco = json.farmaco;

    return quantitaDettaglio;
  }

  public static farmacoFromJSON(json: any): Farmaco {
    let farmaco: Farmaco = new Farmaco();

    farmaco.id = json.id;
    farmaco.codice = json.codice;
    farmaco.nome = json.nome;
    farmaco.categoria = json.categoria;
    farmaco.principioattivo = json.principioattivo;
    farmaco.azienda = json.azienda;

    return farmaco;
  }

  public static esameFromJSON(json: any): Esame {
    let esame: Esame = new Esame();

    esame.id = json.id;
    esame.codice = json.codice;
    esame.nome = json.nome;

    return esame;
  }

  public static triageFromJSON(json:any): Triage{
    let triage: Triage = new Triage();

    triage.id = json.id;
    triage.descrizione = json.descrizione;
    triage.codice = json.colore;
    triage.paziente = json.paziente;
    triage.latitudine = json.latitudine;
    triage.longitudine = json.longitudine;
    triage.conferma = json.conferma;

    return triage;
  }
  public static segnalazioneFromJSON(json:any){
    let segnalazione: Segnalazione = new Segnalazione();

    segnalazione.id = json.id
    segnalazione.utente = json.utente;
    segnalazione.descrizione = json.descrizione;
    segnalazione.schermataBug = json.schermataBug;
    segnalazione.attivo = json.attivo

    return segnalazione;
  }
}
