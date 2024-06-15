<p align="center">
  <img width="180" src="assets/icon-circle.png" alt="PlusOne"></img>
  <h1 align="center">PlusOne</h1>
  <p align="center">Applicazione medica PlusOne (Android)
</p>

## ⚒️ Builds

|Piattaforma|Disponibilità||
|--------|---------|--|
|<p><img width="24" height="24" align="left" src="https://img.icons8.com/nolan/64/android-os.png" alt="android"> Android </p>|✔|[Download](https://github.com/ShyVortex/plusone-ionic/releases/latest)|
|<p><img width="24" height="24" align="left" src="https://img.icons8.com/nolan/64/ios-logo.png" alt="ios"> iOS </p>|❌| |

## 📜 Descrizione
PlusOne è un'applicazione Android il cui intento è quello di sperimentare un modo più facile e veloce per mettere in contatto medici, pazienti e infermieri permettendo loro di comunicare
e gestire le attività di uso più comune in ambito infermieristico-ospedaliero in maniera naturale ed istantanea.  
Questa repository che gestisce il frontend applicativo è stata creata per il conseguimento dell'esame 'Ingegneria del Software' della facoltà di informatica presso l'Università degli Studi del Molise (UNIMOL),
sede di Pesche.  
Il frontend dell'applicazione è stato sviluppato "from scratch" da [Angelo Trotta](https://github.com/ShyVortex), [Lorenzo Lepore](https://github.com/lorenzo-lepore) e [Mario Rascato](https://github.com/mariorascato)
a partire da un'idea del nostro manager [Victor Conde](https://github.com/vodkaassassina).

## ⚡ Funzionalità
- Presenza di diversi ruoli: Paziente, Infermiere, Medico ed Admin
- Login e registrazione
- Menù impostazioni dove è possibile cambiare la propria password, segnalare eventuali errori e visualizzare la versione dell'app
  ### Paziente
  - Prenotazione visita generale o specialistica in diversi reparti ospedalieri
  - Invio richiesta SOS immediata (codice rosso), o questionario per richiesta triage (codici bianco-arancione)
  - Registro dove è possibile visualizzare le proprie prenotazioni, la propria diagnosi o le terapie farmacologiche assegnate dal medico
  ### Infermiere
  - Visualizzazione richieste SOS o triage con relativa posizione del paziente, e possibilità di accettazione o rifiuto
  ### Medico
  - Visualizzazione notifiche prenotazioni effettuate dal paziente
  - Assegnazione terapia farmacologica ai pazienti
  ### Admin
  - Accettazione o rifiuto delle richieste di registrazione da parte dei pazienti
  - Visualizzazione dettagli utente per ogni ruolo, con eventuale modifica dei campi sul database
  - Visualizzazione segnalazioni errore, possibilità di segnarle come risolte  

## 🙌 Funzionalità non più in sviluppo
  ### Infermiere
  - Gestione turni
  - Assegnazione farmaci ai pazienti
  ### Medico
  - Cure domiciliari per pazienti confinati a casa
  - Assegnazione di certificato malattia al paziente
  - Visualizzazione cartella clinica paziente
  - Assegnazione scheda di dimissione ospedaliera
  - Assistenza agli infermieri

## Dipendenze
Per buildare manualmente l'applicazione è necessaria la pre-installazione e configurazione di [Android Studio](https://developer.android.com/studio?hl=it).
Una volta configurato, è possibile procedere aprendo una finestra di terminale nella directory di lavoro e digitando:
 ```shell
 ionic capacitor build android
 ```
Alternativamente, è possibile aprire l'applicazione sul proprio browser predefinito con:
 ```shell
 ionic serve
 ```

## Licenza
- Questo progetto è distribuito sotto i termini della [GNU General Public License v3.0](https://github.com/ShyVortex/plusone-ionic/blob/master/LICENSE.md).
- Copyright di [@ShyVortex](https://github.com/ShyVortex), [@lorenzo-lepore](https://github.com/lorenzo-lepore), [@mariorascato](https://github.com/mariorascato), 2024.  
- Qualsiasi tentativo di rivendita dell'applicazione senza alcun preavviso né autorizzazione sarà segnalato alle autorità competenti e perseguito legalmente.
