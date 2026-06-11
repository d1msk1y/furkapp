import { ZahnradSystem, QuizQuestion } from './types';

export const SYSTEM_DATA: ZahnradSystem[] = [
  {
    id: 'locher',
    name: 'Locher System',
    developed: '1889',
    type: 'Horizontale Eingriffe',
    explanationShort: 'Das von Eduard Locher entwickelte System wurde speziell für die Pilatusbahn konstruiert, die steilste Zahnradbahn der Welt (bis zu 48% Neigung).',
    steepDangerText: 'Bei dieser extremen Steigung bestand die Gefahr, dass die Zahnräder herkömmlicher Systeme durch den enormen Druck aus der Zahnstange springen.',
    solutionText: 'Lochers geniale Lösung: Zwei horizontal rotierende Zahnräder, die seitlich in eine Zahnstange mit beidseitiger Verzahnung eingreifen. Führungsrollen unterhalb der Zahnstange verriegeln das Fahrzeug sicher mit dem Gleis.',
    techStats: [
      { label: 'Max. Steigung', value: '480 ‰ (48 %)' },
      { label: 'Zahnteilung', value: '120 mm' },
      { label: 'Material Zahnstange', value: 'Gegossener Stahl' },
      { label: 'Spurweite', value: '800 mm' }
    ],
    hotspots: [
      {
        id: 'zahnstange',
        title: 'Doppelseitige Zahnstange',
        description: 'Eine flach liegende Stahlschiene mit rechtwinkligen Zähnen auf beiden Seiten. Da sie in der Mitte verlegt ist, ermöglicht sie die Nutzung von zwei symmetrisch angeordneten Getrieben.',
        top: '25%',
        left: '20%'
      },
      {
        id: 'treibraeder',
        title: 'Horizontale Treibräder',
        description: 'Zwei Getriebezahnräder drehen sich flach über den Schienen und greifen von den Seiten her zu. Dadurch heben sich die seitlichen Abdrängkräfte mechanisch auf und verhindern ein Klettern.',
        top: '55%',
        left: '52%'
      },
      {
        id: 'fuehrung',
        title: 'Sicherheits-Führungsrollen',
        description: 'Untere Flanschrollen greifen physisch unter den Kopf der Locher-Zahnstange. Selbst bei extremen Erschütterungen im Wind ist ein Abheben oder Entgleisen der Lok unmöglich.',
        top: '40%',
        left: '78%'
      }
    ],
    historyAndPurpose: 'Eduard Locher war ein renommierter Zürcher Ingenieur. Die Pilatusbahn galt damals als absolut unbaubar. Herkömmliche Systeme wie Riggenbach oder Abt scheiterten an der extremen Hangneigung: vertikale Zahnräder wären bei 48% einfach über die Zähne gesprungen. Lochers unkonventionelle horizontale Idee revolutionierte den alpinen Schienentransport.',
    maxGradientPercent: 48,
    famousLine: 'Pilatusbahn',
    tagline: 'Steilste Bahn der Welt',
    iconKey: 'horizontal'
  },
  {
    id: 'abt',
    name: 'Abt System',
    developed: '1882',
    type: 'Mehrlamellige Steilbahnstange',
    explanationShort: 'Von Roman Abt erfundenes System, das zwei oder drei versetzte, schmale Zahnstangenplatten nutzt. Es läuft extrem laufruhig und bietet stetigen Zahnkontakt.',
    steepDangerText: 'Bei einfachen Zahnstangen kommt es bei Zahnübergängen oft zu Ruckeln, lauten Schlägen und erhöhtem Verschleiss an den Zahnrädern der Lok.',
    solutionText: 'Abts geniale Antwort: Versetzte dünnere Lamellen. Während das eine Zahnrad gerade eine Lücke verlässt, greift das zweite Zahnrad ein Stück versetzt bereits voll in die Nachbarlamelle.',
    techStats: [
      { label: 'Max. Steigung', value: '110 ‰ (11 %)' },
      { label: 'Zahnteilung', value: '120 mm' },
      { label: 'Material Zahnstange', value: 'Spezial-Walzstahl' },
      { label: 'Spurweite', value: '1000 mm (Meterspur)' }
    ],
    hotspots: [
      {
        id: 'lamellen',
        title: 'Versetzte Lamellenstangen',
        description: 'Zwei (oder drei) dünne, vertikal stehende Zahnplatten sind parallel montiert. Ihre Zähne sind um eine halbe Zahnteilung versetzt angeordnet.',
        top: '30%',
        left: '15%'
      },
      {
        id: 'geteiltes_zahnrad',
        title: 'Geteilte Antriebszahnräder',
        description: 'Das Antriebszahnrad der Lokomotive besteht ebenfalls aus zwei physisch versetzten Zahnkränzen, die präzise zu den versetzten Schienenlamellen passen.',
        top: '60%',
        left: '48%'
      },
      {
        id: 'laufruhe',
        title: 'Ununterbrochener Kraftfluss',
        description: 'Durch den Versatz ist zu jeder Millisekunden-Fahrtzeit immer mindestens ein Triebzahn voll belastet im Eingriff. Das eleminiert Vibrationen fast vollständig.',
        top: '35%',
        left: '72%'
      }
    ],
    historyAndPurpose: 'Roman Abt war Schüler von Riggenbach. Er entwarf diese Innovation, um die Kosten für die Herstellung schwerer massiver Schienen zu senken. Die Abt-Zahnstange lässt sich wunderbar biegen, wodurch sie sich auch für enge Kurvenradien hervorragend eignet. Sie ist das Rückgrat der historischen Furka-Oberalp-Bergstrecke.',
    maxGradientPercent: 11,
    famousLine: 'Furka-Oberalp-Bahn',
    tagline: 'Laufruhig & kurvenfreudig',
    iconKey: 'layers'
  },
  {
    id: 'strub',
    name: 'Strub System',
    developed: '1896',
    type: 'Monorail-Kopfzahnstange',
    explanationShort: 'Emil Strub entwickelte dieses minimalistische und äusserst wirtschaftliche Einkopfsystem, das einfacher zu schottern und zu reinigen ist.',
    steepDangerText: 'Komplizierte Zahnleiterkonstruktionen neigen im eisigen Winter dazu, komplett mit Schnee zuzuwehen oder zu vereisen, was Fahrten hochgradig gefährdet.',
    solutionText: 'Strubs simpler Ansatz: Die Zähne werden direkt in den breiten, massiven Kopf einer gewalzten Breitfußschiene gefräst. An den Seiten hat der Schienenkopf ein konisches Profil für Sicherheitszangen.',
    techStats: [
      { label: 'Max. Steigung', value: '250 ‰ (25 %)' },
      { label: 'Zahnteilung', value: '100 mm' },
      { label: 'Material Zahnstange', value: 'Vollgewalzter Stahl' },
      { label: 'Spurweite', value: '1000 mm' }
    ],
    hotspots: [
      {
        id: 'konischer_kopf',
        title: 'Breitschienenkopf mit Zähnen',
        description: 'Ein massives, keilförmiges Schienenprofil. Die Zähne sind thermisch präzise oben eingefräst, während die Flanken glatt für mechanische Zangenbremsen bleiben.',
        top: '25%',
        left: '30%'
      },
      {
        id: 'einfache_verlegung',
        title: 'Präziser Monoblock',
        description: 'Die Strub-Schiene wird auf herkömmlichen Stahlschwellen verkeilt. Sie erfordert weniger Einzelteile als alle anderen historischen Vorgänger.',
        top: '50%',
        left: '50%'
      },
      {
        id: 'sicherheit',
        title: 'Zangenzugriff',
        description: 'Sicherheits-Notzangen der Zugwagen greifen bei Gefahr um den konischen Schienenkopf und verkeilen sich bombenfest, was ein Umstürzen verhindert.',
        top: '65%',
        left: '70%'
      }
    ],
    historyAndPurpose: 'Emil Strub legte den Fokus auf Wirtschaftlichkeit und Hochgebirgstauglichkeit. Das System feierte seine Premiere an der legendären Jungfraubahn. Da der Schnee durch die offene Oberflächenform leicht abgekehrt werden kann, eignet es sich hervorragend für ganzjährigen Tourismus.',
    maxGradientPercent: 25,
    famousLine: 'Jungfraubahn',
    tagline: 'Einfach & wintertauglich',
    iconKey: 'monohead'
  },
  {
    id: 'riggenbach',
    name: 'Riggenbach System',
    developed: '1863',
    type: 'Sprossenstange (Leitersystem)',
    explanationShort: 'Das älteste europäische System, erfunden von Niklaus Riggenbach. Es ähnelt einer Leiter, bei der die Zähne aus runden Metallbolzen bestehen.',
    steepDangerText: 'Frühe Schienenwege waren extremen Biegekräften ausgesetzt und Zahnstangen brachen oder verbogen sich leicht unter dem tonnenschweren Gewicht der Dampfloks.',
    solutionText: 'Riggenbachs geniale Erfindung: Zwei U-Eisen-Profile werden in konstantem Abstand mit hochfesten, runden Stahlriegeln (Sprossen) vernietet. Ein robustes, langlebiges Gitterbett entsteht.',
    techStats: [
      { label: 'Max. Steigung', value: '250 ‰ (25 %)' },
      { label: 'Zahnteilung', value: '100 mm' },
      { label: 'Material Zahnstange', value: 'Schmiedeeisen / Stahl' },
      { label: 'Spurweite', value: '1435 mm / 1000 mm' }
    ],
    hotspots: [
      {
        id: 'U_profile',
        title: 'U-förmige Seitenträger',
        description: 'Zwei dicke, warmgewalzte C-Profile halten die Konstruktion zusammen und stützen die Schwellenbefestigung vor Querkräften.',
        top: '20%',
        left: '25%'
      },
      {
        id: 'sprossen',
        title: 'Rundbolzen-Sprossen',
        description: 'Solide geschmiedete Rundstahlbolzen, die exakt im Zahnabstand horizontal eingepasst sind. Das Lok-Zahnrad wälzt sich äusserst geschmeidig auf diesen runden Pins ab.',
        top: '48%',
        left: '50%'
      },
      {
        id: 'durchlass',
        title: 'Selbstreinigendes Schotterbett',
        description: 'Da die Leiter unten hohl ist, fallen lose Kieselsteine und klebriger Matsch einfach durch das Zahnbett hindurch ab. Das verhindert Zahnsperren.',
        top: '75%',
        left: '75%'
      }
    ],
    historyAndPurpose: 'Niklaus Riggenbach, der geniale Betriebsleiter der Centralbahn in Basel, liess sich diese Technik patentieren, als er den Rigi-Berg bezwingen wollte. 1871 fuhr dort die erste Bergbahn Europas. Es war der absolute Meilenstein der Schweizer Eisenbahngeschichte.',
    maxGradientPercent: 25,
    famousLine: 'Rigibahn',
    tagline: 'Europas erste Bergbahn',
    iconKey: 'ladder'
  },
  {
    id: 'von_roll',
    name: 'Von Roll System',
    developed: '1900-er',
    type: 'Monoblock-Vollstahlprofil',
    explanationShort: 'Eine moderne und hochentwickelte Optimierung für heutige Bergbahnen. Es ist voll kompatibel zu Abt, besteht aber aus einem einzigen monolithischen Gusselement.',
    steepDangerText: 'Das Aufkommen schwerster Güter- und Personenströme beansprucht die historischen, mehrteiligen Schiebeleitern so massiv, dass der Wartungsaufwand explodiert.',
    solutionText: 'Von Rolls Schweizer Ingenieursleistung: Eine komplett im Walzwerk gegossene massive Einzelschiene mit vertikaler Fräsverzahnung. Keine Schweissnähte, keine Nieten, kein Lockern.',
    techStats: [
      { label: 'Max. Steigung', value: '150 ‰ (15 %)' },
      { label: 'Zahnteilung', value: '120 mm' },
      { label: 'Material Zahnstange', value: 'Hochfester Vergütungsstahl' },
      { label: 'Spurweite', value: '1000 mm' }
    ],
    hotspots: [
      {
        id: 'monoblock',
        title: 'Fugenlose Vollstahlschiene',
        description: 'Es gibt keine einzelnen Platten oder Bolzen mehr. Die Zähne sind mit CNC-Präzision direkt aus einer extrem harten, gegossenen Stahlschiene gefräst.',
        top: '28%',
        left: '20%'
      },
      {
        id: 'abt_kompatibel',
        title: 'Universal-Verzahnung',
        description: 'Durch ausgeklügelte Abmessungen können Loks mit Abt-Zahnrädern diese moderne Von-Roll-Zahnstange anstandslos befahren. Perfekt für Strecken-Teilerneuerungen.',
        top: '55%',
        left: '48%'
      },
      {
        id: 'lange_lebensdauer',
        title: 'Verschleissfreie Legierung',
        description: 'Dank modernster Oberflächenhärtung trotzt dieses System extremsten Bremsreibungswärmen ohne thermischen Schock oder Geometrieverzug.',
        top: '40%',
        left: '75%'
      }
    ],
    historyAndPurpose: 'Die Firma Von Roll (heute Tenconi) hat dieses System standardisiert, um Schweizer Bergbahnen ins 21. Jahrhundert zu führen. Es lässt sich extrem schnell verlegen, widersteht modernsten 100-Tonnen-Triebzügen spielend und ist heute das am häufigsten verbaute Zahnstangen-Modernisierungskit.',
    maxGradientPercent: 15,
    famousLine: 'Moderne Bergbahnen',
    tagline: 'Fugenloser Vollstahl',
    iconKey: 'monoblock'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Welches System überwindet die grösste Steigung im Alpenraum?',
    options: ['System Strub', 'System Locher', 'System Abt', 'System Riggenbach'],
    correctOptionIndex: 1, // System Locher
    explanation: 'Das System Locher hält mit schwindelerregenden 48% (480 ‰) Steigung an der weltberühmten Pilatusbahn den absoluten Weltrekord!'
  },
  {
    id: 2,
    question: 'Wie greifen die Zahnräder beim legendären System Locher ein?',
    options: ['Vertikal von oben', 'Schräg im 45°-Winkel', 'Horizontal von den Seiten', 'Gar nicht, es funktioniert magnetisch'],
    correctOptionIndex: 2, // Horizontal von den Seiten
    explanation: 'Zwei horizontal montierte Zahnräder greifen von links und rechts in die mittlere Zahnstange. Das verhindert das Herausspringen des Zahnrads absolut.'
  },
  {
    id: 3,
    question: 'Welches Zahnradsystem ist wegen seiner leiterähnlichen Form mit Rundbolzen bekannt?',
    options: ['System Riggenbach', 'System Von Roll', 'System Strub', 'System Abt'],
    correctOptionIndex: 0, // System Riggenbach
    explanation: 'Niklaus Riggenbachs System nutzt ein offenes Stahlbett mit runden Sprossenbolzen, durch das Schnee und Geröll ungestört hindurchfallen können.'
  },
  {
    id: 4,
    question: 'Warum entwickelte Roman Abt das System mit mehreren versetzten Lamellenplatten?',
    options: [
      'Um Gewicht im Lokomotivkessel einzusparen',
      'Damit immer ein Zahn voll eingreift und extreme Laufruhe entsteht',
      'Ausschliesslich um Weichen wegzulassen',
      'Um Schmieröl an den Triebachsen einzusparen'
    ],
    correctOptionIndex: 1, // Damit immer ein Zahn voll eingreift und extreme Laufruhe entsteht
    explanation: 'Der Versatz der Schienenlamellen sorgt dafür, dass die Zahnradübergänge kontinuierlich fliessend ohne ruckelnde Leerläufe stattfinden. Ein Meilenstein der Ergonomie!'
  },
  {
    id: 5,
    question: 'Welches Kriterium charakterisiert die moderne Schiene von Von Roll?',
    options: [
      'Sie besteht aus elastischem Hartgummi',
      'Sie ist ein CNC-gefrästes, monolithisches Funder-Vollstahlprofil ohne Nieten',
      'Sie muss täglich manuell mit Sand bestreut werden',
      'Sie benötigt drei Zahnräder übereinander'
    ],
    correctOptionIndex: 1, // Sie ist ein CNC-gefrästes, monolithisches Funder-Vollstahlprofil ohne Nieten
    explanation: 'Das moderne Von Roll System maximiert die Zuverlässigkeit, indem es Fugen und Nieten eliminiert. Ein hochfester Einblockstahl wird direkt vorgefräst.'
  }
];
