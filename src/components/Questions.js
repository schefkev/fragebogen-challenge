const questions = [
  {
    id: 1,
    question:
      'Welche der folgenden Maßnahmen ist am effektivsten, um Passwortdiebstahl zu verhindern?',
    answers: [
      {
        id: 1,
        text: 'Verwendung von einfachen Passwörtern, die leicht zu merken sind',
      },
      {
        id: 2,
        text: 'Verwendung von unterschiedlichen Passwörtern für verschiedene Konten',
      },
      {
        id: 3,
        text: 'Speicherung von Passwörtern in einem ungesicherten Dokument',
      },
      { id: 4, text: 'Weitergabe von Passwörtern an Freunde oder Kollegen' },
    ],
  },
  {
    id: 2,
    question:
      'Welche der folgenden Aussagen zu Phishing-Angriffen ist korrekt?',
    answers: [
      {
        id: 1,
        text: 'Phishing-Angriffe sind nur auf ältere Menschen ausgerichtet, die weniger technisch versiert sind',
      },
      {
        id: 2,
        text: 'Phishing-Angriffe können durch die Verwendung von Antiviren-Software verhindert werden',
      },
      {
        id: 3,
        text: 'Phishing-Angriffe zielen darauf ab, vertrauliche Informationen wie Passwörter und Kreditkartennummern zu stehlen',
      },
      {
        id: 4,
        text: 'Phishing-Angriffe sind nur auf bestimmte Branchen wie Finanzdienstleistungen und Gesundheitswesen beschränkt',
      },
    ],
  },
  {
    id: 3,
    question: 'Was ist der Zweck einer Firewall?',
    answers: [
      { id: 1, text: 'Verhinderung von Angriffen auf das Netzwerk' },
      { id: 2, text: 'Sicherung von Daten auf lokalen Festplatten' },
      { id: 3, text: 'Erkennung von Viren und Malware auf einem System' },
      { id: 4, text: 'Beschleunigung der Internetverbindung' },
    ],
  },
  {
    id: 4,
    question:
      'Welche der folgenden Maßnahmen ist am effektivsten, um sich gegen Ransomware-Angriffe zu schützen?',
    answers: [
      { id: 1, text: 'Regelmäßige Durchführung von Backups wichtiger Daten' },
      {
        id: 2,
        text: 'Verwendung von einfachen Passwörtern, um sich schnell anmelden zu können',
      },
      { id: 3, text: 'Ignorieren von E-Mails mit unbekanntem Absender' },
      { id: 4, text: 'Weitergabe von Passwörtern an Freunde oder Kollegen' },
    ],
  },
  {
    id: 5,
    question: 'Was ist ein VPN und wofür wird es verwendet?',
    answers: [
      { id: 1, text: 'Ein VPN ist eine Art von Virus, der Computer infiziert' },
      {
        id: 2,
        text: 'Ein VPN wird verwendet, um die Geschwindigkeit der Internetverbindung zu erhöhen',
      },
      {
        id: 3,
        text: 'Ein VPN wird verwendet, um die Identität und den Standort des Benutzers im Internet zu verschleiern',
      },
      { id: 4, text: 'Ein VPN wird verwendet, um Spam-E-Mails zu blockieren' },
    ],
  },
];

questions.forEach((question) => {
  question.answers.sort(() => Math.random() - 0.5);
});

export default questions;
