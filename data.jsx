// TTC — fixtures for the prototype

const TTC_MEMBERS = [
  { i: "LM", n: "Léo Martin" },
  { i: "JD", n: "Julien Dupré" },
  { i: "SK", n: "Sami Khoudi" },
  { i: "AT", n: "Andrée Tellesson" },
  { i: "RE", n: "Rémy Bénézet" },
  { i: "MV", n: "Maëlle Vidal" },
  { i: "TC", n: "Théo Cazals" },
  { i: "EP", n: "Eva Pernet" },
  { i: "NK", n: "Nora Kessler" },
  { i: "CD", n: "Clément Dauphin" },
  { i: "YS", n: "Yann Sorel" },
  { i: "AM", n: "Anaïs Marchand" },
];

const ARTICLES = [
  {
    cat: "Récit",
    date: "12 mai",
    read: "8 min",
    title: "82 km dans la brume du Mercantour.",
    excerpt: "Départ 4h12 de la Madone d'Utelle. On voulait du soleil, on a eu une purée à couper au couteau. Récit en six actes d'un ultra 2026 qui ne ressemblait à aucun autre.",
    author: "Léo M.",
    tone: "feature",
  },
  {
    cat: "Matériel",
    date: "08 mai",
    read: "5 min",
    title: "Pourquoi on a tous switché sur la Speedland SL:HSV.",
    excerpt: "Test croisé à six paires de pieds, sur six terrains. Verdict.",
    author: "Sami K.",
  },
  {
    cat: "Nutrition",
    date: "02 mai",
    read: "6 min",
    title: "Le club teste les gels maison : la recette qui passe.",
    excerpt: "60 g de glucides, 0 € de marge, 12 essais en course. Recette + protocole.",
    author: "Maëlle V.",
  },
];

const PROJECTS = [
  {
    n: "01",
    title: "Trail to Techno",
    desc: "Le jour on grimpe, la nuit on danse. Un week-end trail + techno dans l'arrière-pays niçois.",
    tag: "12–14.08.2026",
    state: "Pass ouverts",
    flavor: "battle",
  },
  {
    n: "02",
    title: "TTC × Refuges",
    desc: "Reboisement de l'arrière-pays niçois. Une journée par saison, un sentier remis en état, des arbres en plus.",
    tag: "Mercantour",
    state: "T3 2026",
  },
  {
    n: "03",
    title: "Cordée solidaire",
    desc: "Mentorat sur 6 mois entre coureurs aguerris et débutants. 14 binômes pour la saison en cours.",
    tag: "Saison 26",
    state: "14 binômes",
  },
  {
    n: "04",
    title: "Topo TTC",
    desc: "Notre guide vivant des sentiers de Nice au Mercantour. 142 boucles cataloguées par le club.",
    tag: "Open source",
    state: "v0.4",
  },
];

const DIRECTIONS = [
  { n: "01", h: "S'entraîner", ex: "Sortie hebdo, séances piste, cohortes par niveau. La meute pousse." },
  { n: "02", h: "Partager", ex: "Récits, retours matos, échange de plans nutrition. Carnet collectif." },
  { n: "03", h: "Progresser", ex: "Pas de coach, pas de programme. La régularité, c'est s'entraîner en s'amusant — courir ensemble, souvent, et avancer sans y penser." },
  { n: "04", h: "Défendre", ex: "Refuges, sentiers, montagne. Ce qu'on traverse, on en prend soin." },
];

window.TTC_MEMBERS = TTC_MEMBERS;
window.ARTICLES = ARTICLES;
window.PROJECTS = PROJECTS;
window.DIRECTIONS = DIRECTIONS;

// ===== Trail to Techno — concept (générique) =====
const T2T_PILLARS = [
  {
    n: "01",
    k: "Le sommet",
    h: "On se fixe une montagne.",
    ex: "Un objectif commun, plusieurs manières de l'atteindre. Du 10 km accessible au grand raid d'arête. Personne ne reste en bas.",
    img: "img/runner-climb.jpg",
  },
  {
    n: "02",
    k: "Le refuge",
    h: "On en fait un camp de base.",
    ex: "On dort, on mange, on rit en altitude. Le refuge devient QG de la bande : testing produits, récits, et le calme avant la nuit.",
    img: "img/chalet.jpg",
  },
  {
    n: "03",
    k: "La nuit",
    h: "Puis le son prend le relais.",
    ex: "Le soir, la platine s'allume. Repas de montagne, DJ set, et la piste qui dure jusqu'à ce que le soleil repasse la crête.",
    img: "img/dj.jpg",
  },
];

const T2T_INCLUDES = [
  { k: "Tous niveaux", v: "Rando, 10 km, 25 km ou grand raid — un format pour chaque paire de jambes." },
  { k: "Un vrai lieu", v: "Un refuge de montagne privatisé, loin des dossards et des barrières Vauban." },
  { k: "Repas & DJ set", v: "On mange ensemble, on danse ensemble. La soirée fait partie de la course." },
  { k: "Testing terrain", v: "On teste le matos et la nutrition en conditions réelles, entre coureurs." },
];

window.T2T_PILLARS = T2T_PILLARS;
window.T2T_INCLUDES = T2T_INCLUDES;

// ===== Édition Mercantour (le week-end en vente) =====
const MERCANTOUR = {
  name: "Édition Mercantour",
  when: "8–9 août 2026",
  where: "Vallée de la Gordolasque · Parc du Mercantour",
  base: "Relais des Merveilles",
  partners: ["tout terrain club", "Relais des Merveilles", "Näak"],
  // stats réelles issues des GPX de la traversée (J1 + J2)
  expo: {
    title: "L'expédition",
    tagline: "De la mer au sommet.",
    from: "Nice · niveau de la mer",
    to: "Cime du Gelas · 3 143 m",
    days: "2 jours",
    km: "96,8",
    dplus: "6 500",
    team: "10",
    profile: "M0.0 251.2 L14.3 250.1 L25.5 248.1 L31.4 247.9 L39.3 247.5 L44.6 245.1 L50.1 239.8 L54.6 237.1 L58.5 234.6 L65.6 228.2 L72.0 223.8 L76.8 220.7 L80.6 215.9 L85.2 213.7 L89.2 212.0 L91.5 211.4 L95.3 208.2 L100.3 204.4 L105.4 200.5 L108.9 197.8 L116.1 197.9 L121.6 201.2 L123.8 204.0 L129.9 211.5 L135.0 211.3 L140.0 206.2 L143.8 201.7 L148.1 197.2 L157.5 195.9 L167.3 192.1 L174.0 197.4 L179.5 202.6 L185.0 206.4 L193.6 209.5 L197.9 209.1 L204.5 208.6 L207.8 209.7 L211.9 212.4 L215.5 207.9 L219.3 204.4 L221.5 206.8 L225.4 207.0 L233.1 207.8 L236.5 208.4 L240.5 209.9 L243.5 211.3 L247.3 210.3 L249.0 208.3 L253.4 209.3 L258.4 208.3 L262.7 210.1 L266.1 212.9 L269.4 216.4 L272.7 218.5 L277.2 224.0 L280.2 229.2 L283.8 232.5 L287.4 236.7 L291.8 232.8 L294.9 229.9 L297.0 227.4 L299.8 223.6 L304.5 218.7 L309.7 211.3 L313.0 206.0 L315.4 203.0 L317.5 203.3 L320.8 203.6 L323.2 203.4 L325.6 201.6 L329.7 201.2 L333.0 197.9 L338.2 195.0 L346.0 192.6 L350.4 192.4 L354.9 190.8 L359.4 188.7 L364.3 187.9 L370.4 189.5 L374.5 188.0 L377.7 184.3 L380.4 179.8 L383.3 175.6 L385.4 172.6 L387.8 168.8 L390.0 164.5 L392.8 163.2 L395.2 161.1 L398.9 155.9 L402.8 153.3 L406.1 151.4 L410.4 148.5 L414.1 145.1 L419.8 142.0 L423.8 140.0 L425.4 137.1 L427.9 132.7 L429.5 129.8 L432.4 128.2 L434.1 130.7 L436.3 131.9 L441.6 137.5 L452.2 136.9 L459.8 137.8 L466.9 137.9 L476.4 140.3 L485.5 133.6 L492.6 123.5 L496.2 117.2 L501.1 115.9 L510.5 116.0 L519.6 115.1 L524.9 113.6 L529.4 108.4 L534.7 103.1 L539.5 96.0 L547.1 91.2 L552.0 95.7 L559.5 94.1 L569.7 95.1 L576.1 90.1 L583.5 91.6 L590.7 97.1 L597.8 97.9 L601.2 101.2 L609.5 109.5 L614.4 112.9 L620.8 118.7 L629.3 128.7 L636.9 129.2 L643.7 130.2 L649.8 134.4 L656.4 142.0 L661.0 145.3 L664.6 151.2 L668.5 156.2 L672.1 161.6 L676.2 168.3 L681.8 168.9 L687.7 169.9 L693.7 172.4 L697.2 165.7 L700.1 153.5 L702.8 147.3 L707.8 137.2 L712.1 129.7 L715.4 124.8 L718.2 117.4 L721.7 112.2 L724.1 106.4 L727.0 101.3 L730.2 95.5 L734.2 88.4 L737.7 83.9 L742.5 80.8 L746.6 85.4 L754.2 90.4 L759.6 96.4 L764.5 94.2 L772.8 94.4 L779.3 98.5 L785.2 103.0 L793.0 105.0 L797.1 112.7 L803.4 112.4 L809.7 103.2 L815.1 103.4 L820.0 104.2 L826.1 101.0 L829.4 99.3 L832.6 97.3 L836.2 94.0 L838.5 91.0 L842.6 86.8 L844.6 84.2 L847.8 81.4 L849.4 79.4 L851.5 76.6 L855.6 71.5 L856.8 68.5 L859.0 62.7 L861.6 58.1 L864.1 53.6 L867.6 48.5 L872.6 41.5 L878.0 32.3 L886.3 14.0 L892.3 14.4 L897.5 27.8 L904.9 41.1 L912.4 52.8 L917.4 65.0 L920.8 71.9 L924.7 74.3 L926.9 73.9 L929.1 73.2 L930.7 72.3 L932.8 73.7 L936.0 73.7 L940.8 74.9 L943.2 77.4 L947.3 79.5 L951.1 79.3 L953.0 82.0 L955.0 86.6 L957.1 88.6 L959.4 90.4 L960.4 92.8 L962.0 96.3 L964.5 100.5 L966.8 103.8 L968.4 106.7 L970.6 107.8 L973.0 110.4 L975.1 112.0 L980.9 114.5 L985.2 115.7 L990.6 119.1 L994.5 122.0 L1000.0 123.9",
    splitX: 833.7,
    maxE: 3008,
  },
  // Formats du samedi, groupés par niveau — stats et profils issus des GPX réels (dossier /gpx)
  levels: [
    {
      badge: "●●●", name: "Engagé", sub: "Haute montagne · confirmé",
      items: [
        { name: "L'expédition", km: "97 km", dplus: "6 500 D+", tag: "2 jours · mer → sommet", foot: "Sur sélection", hero: true, useExpoProfile: true },
        { name: "Le Tour de la Vallée des Merveilles", km: "19 km", dplus: "≈ 1 550 D+ · pointe à 2 699 m", tag: "Plus sportif · confirmé", gpx: "gpx/tour-vallee-des-merveilles.gpx",
          profile: "M0.0 75.8 L3.3 75.4 L6.7 74.5 L10.0 73.3 L13.3 71.8 L16.7 69.8 L20.0 68.3 L23.3 65.1 L26.7 62.7 L30.0 58.8 L33.3 54.4 L36.7 53.5 L40.0 50.5 L43.3 46.8 L46.7 45.9 L50.0 46.0 L53.3 45.9 L56.7 44.8 L60.0 42.6 L63.3 41.2 L66.7 41.3 L70.0 41.5 L73.3 41.1 L76.7 38.9 L80.0 37.9 L83.3 37.0 L86.7 35.4 L90.0 32.6 L93.3 29.8 L96.7 29.3 L100.0 28.8 L103.3 28.3 L106.7 28.3 L110.0 26.6 L113.3 21.8 L116.7 16.6 L120.0 11.9 L123.3 8.0 L126.7 12.1 L130.0 15.2 L133.3 16.8 L136.7 19.7 L140.0 21.9 L143.3 22.5 L146.7 23.4 L150.0 25.8 L153.3 24.5 L156.7 21.1 L160.0 16.9 L163.3 17.2 L166.7 21.0 L170.0 24.5 L173.3 27.5 L176.7 28.4 L180.0 29.9 L183.3 32.4 L186.7 33.5 L190.0 34.2 L193.3 35.1 L196.7 38.0 L200.0 39.5 L203.3 39.9 L206.7 40.9 L210.0 42.6 L213.3 42.6 L216.7 40.9 L220.0 38.0 L223.3 35.3 L226.7 32.5 L230.0 30.8 L233.3 28.9 L236.7 26.5 L240.0 24.3 L243.3 20.8 L246.7 19.7 L250.0 24.6 L253.3 28.9 L256.7 32.9 L260.0 37.8 L263.3 40.6 L266.7 42.7 L270.0 45.6 L273.3 47.4 L276.7 50.3 L280.0 54.6 L283.3 57.5 L286.7 61.5 L290.0 66.5 L293.3 70.6 L296.7 74.7 L300.0 76.0" },
        { name: "Le Clapier", km: "16,5 km", dplus: "≈ 1 550 D+ · sommet à 3 039 m", tag: "Boucle sommet · engagé", gpx: "gpx/le-clapier.gpx",
          profile: "M0.0 75.7 L3.3 75.5 L6.7 75.4 L10.0 75.1 L13.3 74.7 L16.7 73.5 L20.0 72.2 L23.3 70.5 L26.7 68.6 L30.0 67.6 L33.3 65.5 L36.7 62.9 L40.0 61.0 L43.3 60.1 L46.7 57.8 L50.0 56.2 L53.3 54.8 L56.7 54.6 L60.0 53.9 L63.3 53.5 L66.7 52.9 L70.0 52.0 L73.3 51.5 L76.7 51.3 L80.0 51.0 L83.3 50.6 L86.7 50.3 L90.0 49.8 L93.3 49.5 L96.7 47.1 L100.0 44.3 L103.3 41.6 L106.7 39.2 L110.0 37.5 L113.3 35.2 L116.7 33.2 L120.0 32.9 L123.3 31.6 L126.7 29.0 L130.0 26.1 L133.3 23.4 L136.7 20.7 L140.0 16.7 L143.3 12.9 L146.7 9.1 L150.0 9.8 L153.3 13.5 L156.7 17.4 L160.0 21.1 L163.3 23.6 L166.7 26.5 L170.0 29.2 L173.3 32.0 L176.7 32.4 L180.0 34.2 L183.3 36.2 L186.7 37.7 L190.0 39.5 L193.3 41.6 L196.7 44.3 L200.0 46.9 L203.3 49.6 L206.7 49.9 L210.0 50.2 L213.3 50.6 L216.7 50.9 L220.0 51.3 L223.3 51.5 L226.7 51.9 L230.0 52.8 L233.3 53.6 L236.7 54.0 L240.0 54.5 L243.3 55.0 L246.7 56.2 L250.0 58.1 L253.3 60.4 L256.7 61.3 L260.0 62.7 L263.3 64.6 L266.7 67.4 L270.0 68.4 L273.3 69.8 L276.7 71.2 L280.0 72.7 L283.3 73.8 L286.7 75.2 L290.0 75.4 L293.3 75.5 L296.7 75.7 L300.0 76.0" },
      ],
    },
    {
      badge: "●●○", name: "Sportif", sub: "Ça grimpe, mais ça se partage",
      items: [
        { name: "Le Balcon du Gelas", km: "≈ 14 km A/R", dplus: "≈ 1 330 D+ · jusqu'à 2 933 m", tag: "Raide et panoramique", gpx: "gpx/balcon-du-gelas.gpx",
          profile: "M0.0 76.0 L3.3 75.9 L6.7 75.6 L10.0 75.4 L13.3 75.2 L16.7 74.9 L20.0 74.7 L23.3 74.4 L26.7 73.9 L30.0 73.6 L33.3 73.2 L36.7 72.9 L40.0 72.3 L43.3 71.4 L46.7 71.0 L50.0 70.5 L53.3 70.0 L56.7 69.9 L60.0 69.4 L63.3 68.3 L66.7 67.2 L70.0 66.4 L73.3 65.4 L76.7 65.0 L80.0 64.4 L83.3 63.2 L86.7 61.9 L90.0 60.6 L93.3 59.5 L96.7 58.0 L100.0 57.0 L103.3 56.3 L106.7 56.6 L110.0 56.5 L113.3 56.0 L116.7 54.9 L120.0 53.4 L123.3 51.8 L126.7 50.7 L130.0 49.7 L133.3 49.0 L136.7 48.9 L140.0 49.1 L143.3 49.0 L146.7 48.9 L150.0 49.1 L153.3 49.1 L156.7 49.0 L160.0 48.9 L163.3 48.5 L166.7 48.1 L170.0 47.2 L173.3 46.8 L176.7 46.1 L180.0 45.4 L183.3 44.4 L186.7 43.8 L190.0 42.6 L193.3 41.7 L196.7 41.2 L200.0 40.6 L203.3 36.5 L206.7 35.3 L210.0 31.7 L213.3 31.7 L216.7 30.4 L220.0 29.2 L223.3 29.2 L226.7 28.0 L230.0 26.6 L233.3 25.2 L236.7 25.2 L240.0 25.2 L243.3 23.7 L246.7 23.7 L250.0 22.0 L253.3 20.4 L256.7 20.4 L260.0 18.5 L263.3 16.7 L266.7 15.0 L270.0 14.3 L273.3 13.6 L276.7 13.6 L280.0 13.6 L283.3 12.9 L286.7 12.3 L290.0 11.6 L293.3 10.8 L296.7 9.9 L300.0 8.0" },
        { name: "La Jonction", km: "≈ 10 km A/R", dplus: "≈ 560 D+ · refuge de Nice (2 232 m)", tag: "Rejoindre l'expé au refuge de Nice",
          profile: "M0.0 76.0 L3.3 75.9 L6.7 75.4 L10.0 75.1 L13.3 74.7 L16.7 74.5 L20.0 74.1 L23.3 73.6 L26.7 73.3 L30.0 72.9 L33.3 72.2 L36.7 71.7 L40.0 71.1 L43.3 70.4 L46.7 70.1 L50.0 69.3 L53.3 68.4 L56.7 67.2 L60.0 66.2 L63.3 65.5 L66.7 64.8 L70.0 64.0 L73.3 63.5 L76.7 63.3 L80.0 62.7 L83.3 60.9 L86.7 59.2 L90.0 57.5 L93.3 56.4 L96.7 55.3 L100.0 53.7 L103.3 53.2 L106.7 52.3 L110.0 50.6 L113.3 48.6 L116.7 46.8 L120.0 44.7 L123.3 42.7 L126.7 40.9 L130.0 38.6 L133.3 37.0 L136.7 35.7 L140.0 35.5 L143.3 35.9 L146.7 35.8 L150.0 35.5 L153.3 34.3 L156.7 32.2 L160.0 29.9 L163.3 27.4 L166.7 25.3 L170.0 23.8 L173.3 22.2 L176.7 20.6 L180.0 20.2 L183.3 20.1 L186.7 20.6 L190.0 20.6 L193.3 20.2 L196.7 20.1 L200.0 20.4 L203.3 20.5 L206.7 20.4 L210.0 20.2 L213.3 20.0 L216.7 19.8 L220.0 19.1 L223.3 18.5 L226.7 16.8 L230.0 16.3 L233.3 15.4 L236.7 14.4 L240.0 13.1 L243.3 12.1 L246.7 11.3 L250.0 10.8 L253.3 10.9 L256.7 11.3 L260.0 11.6 L263.3 12.0 L266.7 12.6 L270.0 12.1 L273.3 12.0 L276.7 11.8 L280.0 11.8 L283.3 11.7 L286.7 11.3 L290.0 11.0 L293.3 10.9 L296.7 9.2 L300.0 8.0",
          options: [
            { t: "Option directe", d: "Relais → refuge de Nice · ≈ 10 km A/R · ≈ 560 D+", gpx: "gpx/la-jonction.gpx" },
            { t: "Option par le Balcon", d: "On rejoint l'expé au niveau du Balcon du Gelas, puis bascule sur le refuge — plus long, plus raide", gpx: "gpx/balcon-du-gelas.gpx" },
          ] },
      ],
    },
    {
      badge: "●○○", name: "Tranquille", sub: "Zéro chrono, zéro pression",
      items: [
        { name: "La Rando", km: "Allure libre", dplus: "à la carte", tag: "Sans chrono · contemplatif", foot: "Ouvert à tous" },
        { name: "Le Chill Max", km: "Refuge only", dplus: "0 D+", tag: "Zéro course · juste la vibe", foot: "C'est cadeau", img: "img/terrace.jpg" },
      ],
    },
  ],
  program: [
    {
      day: "Jeudi soir", date: "6 août · Nice", phase: "day",
      items: [
        { t: "19:00", h: "Soirée de départ · Nice", s: "On envoie la team expé, les pieds dans la mer", kind: "night" },
        { t: "20:00", h: "Départ de l'expédition", s: "Cap sur les 3 143 m — la grande traversée commence", kind: "trail" },
      ],
    },
    {
      day: "Vendredi", date: "7 août · en live", phase: "day",
      items: [
        { t: "Journée", h: "On suit la team en direct", s: "Canal WhatsApp « Partage ta sortie » — photos, points GPS, moral", kind: "trail" },
        { t: "En montée", h: "Cols, crêtes, refuges", s: "La team avale le dénivelé vers le Relais des Merveilles", kind: "trail" },
      ],
    },
    {
      day: "Samedi", date: "8 août · Relais des Merveilles", phase: "peak",
      items: [
        { t: "09:00", h: "Boucles commu au départ du Relais", s: "Merveilles · Clapier · Balcon · Jonction · rando — chacun son format", kind: "trail" },
        { t: "15:00", h: "Arrivée de la team expé au Relais", s: "On monte les accueillir au refuge de Nice par la Jonction", kind: "trail" },
        { t: "19:30", h: "Repas de refuge", s: "Relais des Merveilles · produits du coin", kind: "night" },
        { t: "22:00", h: "DJ set", s: "La piste s'ouvre sous les étoiles", kind: "night" },
      ],
    },
    {
      day: "Dimanche", date: "9 août · Lac Autier", phase: "day",
      items: [
        { t: "10:00", h: "Testing Näak · Lac Autier", s: "Montée tranquille jusqu'au lac, sans chrono", kind: "trail" },
        { t: "14:00", h: "Sunset closing", s: "Dernier café, on se dit à l'an prochain", kind: "night" },
      ],
    },
  ],
  options: [
    { k: "Repas d'après course", v: "Brunch & pique-nique servis au Relais des Merveilles au retour du sommet.", img: "img/terrace.jpg" },
    { k: "Nuit en refuge", v: "Couchage au Relais des Merveilles, dîner et petit-déj montagne inclus.", img: "img/chalet.jpg" },
  ],
  // Itinéraires bis — la commu qui monte le samedi (traces à venir)
  commu: {
    saturday: [
      { name: "Le 10K", km: "≈ 10 km", tag: "Boucle découverte", ex: "Une boucle accessible autour du refuge pour venir vivre le week-end sans gros volume.", soon: true },
      { name: "Le 25K", km: "≈ 25 km", tag: "Plus sportif", ex: "Un tracé plus engagé sur les sentiers de la Vallée des Merveilles pour les jambes affûtées.", soon: true },
      { name: "La Rando", km: "Allure libre", tag: "Sans chrono", ex: "Montée contemplative jusqu'au refuge, à son rythme. Sur les traces de Belle et Sébastien et des routes du Sel, zéro pression.", soon: true },
      { name: "Rejoindre l'expé", km: "Relais → refuge", tag: "Aller à leur rencontre", ex: "Départ du Relais des Merveilles, montée jusqu'au refuge de Nice pour accueillir la team expédition et redescendre avec elle. La montagne à plusieurs.", soon: false },
    ],
    sunday: {
      title: "Testing Näak · La Boucle Autier",
      ex: "Le dimanche, on monte au lac Autier : boucle tranquille et testing produits Näak en conditions réelles. Zéro chrono, juste le partage.",
      stats: ["≈ 7 km", "≈ 600 D+", "Lac à 2 275 m"],
      gpx: "gpx/boucle-lac-autier.gpx",
      img: "img/lake.jpg",
      profile: "M0.0 76.0 L3.3 75.9 L6.7 75.6 L10.0 75.1 L13.3 74.8 L16.7 74.5 L20.0 74.0 L23.3 73.6 L26.7 73.1 L30.0 72.2 L33.3 71.5 L36.7 70.8 L40.0 70.1 L43.3 69.0 L46.7 67.3 L50.0 66.4 L53.3 65.4 L56.7 64.6 L60.0 64.2 L63.3 63.1 L66.7 60.9 L70.0 59.2 L73.3 59.2 L76.7 56.3 L80.0 53.9 L83.3 51.0 L86.7 48.8 L90.0 47.1 L93.3 44.6 L96.7 42.7 L100.0 40.3 L103.3 38.3 L106.7 36.5 L110.0 33.6 L113.3 31.0 L116.7 29.0 L120.0 26.6 L123.3 25.3 L126.7 22.6 L130.0 19.5 L133.3 16.7 L136.7 13.5 L140.0 10.1 L143.3 8.2 L146.7 8.1 L150.0 8.4 L153.3 8.7 L156.7 8.6 L160.0 8.8 L163.3 11.7 L166.7 15.2 L170.0 18.4 L173.3 21.0 L176.7 23.6 L180.0 26.2 L183.3 27.1 L186.7 29.7 L190.0 31.7 L193.3 34.2 L196.7 36.5 L200.0 38.5 L203.3 40.6 L206.7 42.7 L210.0 44.5 L213.3 47.1 L216.7 49.0 L220.0 52.0 L223.3 54.5 L226.7 57.9 L230.0 59.1 L233.3 59.3 L236.7 61.1 L240.0 63.0 L243.3 63.3 L246.7 63.8 L250.0 64.5 L253.3 65.3 L256.7 66.5 L260.0 67.9 L263.3 68.8 L266.7 69.3 L270.0 70.2 L273.3 71.1 L276.7 71.9 L280.0 72.5 L283.3 72.9 L286.7 73.1 L290.0 73.4 L293.3 73.8 L296.7 74.2 L300.0 74.4",
    },
  },
  // Tarifs — billetterie SumUp (formules tout inclus, seule la nuit change)
  pricing: {
    formulas: [
      { name: "Camping", price: "80", sub: "Plus que 20 places · esprit bivouac" },
      { name: "Dortoir", price: "105", sub: "Plus que 15 places · l'esprit refuge", featured: true, badge: "Le QG de la meute" },
      { name: "Chambre 4 pers", price: "125", sub: "Plus que 2 chambres !" },
      { name: "Chambre double", price: "135", sub: "Victime de son succès", soldout: true },
    ],
    included: [
      "Accès aux traces du samedi : 10 km, 25 km, rando détente ou chill",
      "Apéro cocktail : pissaladière, tapenade, guacamole",
      "Grand buffet : entrée, plat, fromages, dessert, café — vin compris (1 bouteille pour 6)",
      "Set techno & ambiance TTC jusqu'au bout de la nuit",
      "Literie fournie : draps, oreillers, taies et couvertures",
      "Dimanche : petit-déj léger (boisson chaude + tartines) + testing Näak",
    ],
    options: [
      "+31 € · Brunch du dimanche au Relais",
      "+13 € · Pique-nique après le testing Näak",
    ],
    corkage: "Droit de bouchon : 7 €/bouteille",
    comprend: "Le prix de la formule comprend l'apéritif, le dîner-buffet (avec vin), l'accès aux traces et au testing Näak — et, pour les formules hébergement, la nuit au Relais et un petit-déj léger.",
    partners: [
      { name: "Näak", tag: "Nutrition officielle", url: "https://www.naak.com/fr", ex: "Barres, gels et purées d'effort à tester avant, pendant et après les traces. L'espace testing tourne tout le week-end." },
      { name: "Wise", tag: "Wise Trail Running · équipement", url: "https://wiseultrarunning.com/collections/all", ex: "Du matos d'ultra-trail pensé pour les longues heures en montagne — à découvrir et tester sur le week-end." },
      { name: "Go'Lum", tag: "Frontales · éclairage", url: "https://www.go-lum.fr/", ex: "Des frontales taillées pour la nuit en montagne. Parfait quand la journée se prolonge jusqu'au dancefloor." },
    ],
    warning: "Les activités sportives (expé, traces, rando) sont libres et non encadrées. Le TTC et le Relais des Merveilles ne fournissent aucun encadrement sportif et ne sauraient être tenus responsables en cas d'accident ou de blessure. Chaque participant s'engage sous sa propre responsabilité : les assurances (responsabilité civile, individuelle accident) sont à la charge de chacun.",
  },
};

window.MERCANTOUR = MERCANTOUR;

// ===== Édition Raclette (édition précédente — archive) =====
const RACLETTE = {
  name: "Édition Raclette",
  when: "Janvier 2026",
  where: "Chalet Albarea · Peira Cava",
  base: "Chalet Albarea",
  intro: "La toute première. Un chalet à Peira Cava, de la neige fraîche, une traversée jusqu'à la porte du refuge et une raclette qui a fini en dancefloor. Quatre manières d'y arriver, une seule tablée.",
  expo: {
    km: "45,7",
    dplus: "3 589",
    maxE: "1 505",
    profile: "M0.0 251.8 L9.5 250.8 L19.8 249.1 L30.0 247.1 L39.2 243.6 L41.5 242.2 L45.3 238.5 L51.1 232.4 L59.6 227.8 L66.8 222.8 L74.9 219.1 L80.4 212.8 L86.6 208.1 L91.4 204.4 L97.4 200.6 L104.5 195.8 L110.4 192.9 L115.4 187.7 L119.6 182.4 L126.6 178.7 L134.1 175.2 L142.2 172.6 L147.6 168.3 L152.4 164.4 L153.8 163.8 L155.5 162.8 L161.8 157.5 L168.1 152.9 L174.1 148.9 L179.2 145.2 L183.1 142.5 L193.1 145.2 L204.0 149.4 L213.2 161.6 L218.6 168.6 L226.2 175.8 L234.1 173.1 L235.6 173.6 L238.9 172.2 L243.9 167.9 L249.6 162.2 L254.6 156.4 L259.6 150.4 L264.8 146.0 L272.3 143.7 L280.8 139.1 L288.8 144.1 L296.1 138.9 L303.6 135.8 L311.5 133.8 L321.8 139.7 L330.1 144.5 L337.9 155.2 L348.5 162.5 L359.1 162.6 L370.0 168.2 L381.4 170.1 L390.5 170.2 L397.9 164.1 L401.8 156.8 L407.2 151.4 L411.5 144.3 L413.6 142.8 L419.4 145.9 L426.2 159.3 L432.2 163.3 L435.6 161.9 L439.3 154.8 L443.7 148.3 L449.0 144.7 L454.4 139.5 L458.4 135.0 L464.6 130.2 L468.7 132.0 L472.7 125.5 L478.5 120.2 L485.6 116.1 L489.6 109.0 L493.5 104.0 L496.1 100.5 L500.5 93.9 L506.0 89.4 L511.2 84.1 L517.6 79.3 L521.4 76.2 L528.6 72.7 L532.4 64.0 L535.3 56.1 L539.5 45.3 L543.2 37.5 L547.1 30.5 L550.9 29.0 L554.8 37.3 L558.6 49.2 L560.7 55.7 L566.5 61.7 L572.7 60.0 L582.0 73.3 L589.8 78.4 L598.8 75.1 L602.5 77.8 L611.7 95.2 L617.9 91.9 L621.0 85.7 L624.6 79.0 L628.4 75.5 L632.9 70.8 L637.7 65.1 L643.1 60.0 L648.6 56.3 L652.1 49.7 L657.4 46.7 L662.2 46.0 L671.3 42.3 L679.4 39.9 L685.1 33.9 L689.8 28.0 L691.7 20.8 L693.7 14.2 L696.8 8.8 L699.0 9.7 L702.6 9.4 L708.4 16.5 L713.5 28.3 L717.1 38.4 L719.9 46.6 L723.4 53.4 L728.1 52.0 L736.2 49.4 L746.3 61.0 L757.1 71.9 L761.2 71.8 L771.7 73.3 L783.9 80.0 L787.0 80.7 L795.2 83.3 L805.6 89.9 L810.8 95.2 L820.7 100.4 L828.4 103.5 L835.0 102.2 L844.3 106.4 L851.2 102.4 L861.7 104.3 L872.0 107.0 L876.8 108.9 L881.0 103.4 L885.3 97.8 L889.4 91.8 L894.7 88.8 L901.7 89.0 L906.0 83.5 L910.1 78.0 L916.6 70.5 L920.1 66.2 L923.5 60.7 L926.7 55.3 L929.2 49.7 L932.5 45.9 L935.5 40.8 L938.6 35.7 L941.6 31.2 L944.8 26.6 L947.9 22.9 L955.2 21.6 L964.4 20.8 L972.1 20.5 L981.0 21.6 L991.4 21.0 L1000.0 20.7",
  },
  teams: [
    { n: "01", name: "Team Expé", tag: "La traversée", ex: "45 km et +3 589 m jusqu'au Chalet Albarea. Neige, pluie, brouillard — et le sourire quand même." },
    { n: "02", name: "Team Vélo", tag: "À la pédale", ex: "Montée au chalet à vélo par Peira Cava. Une autre manière de mériter la raclette." },
    { n: "03", name: "Team Demi", tag: "La moitié", ex: "Départ à mi-parcours pour rejoindre la team expé en route et finir ensemble." },
    { n: "04", name: "Team Boucle", tag: "Au départ du chalet", ex: "Une boucle tranquille autour d'Albarea, retour au chaud pour le fromage." },
  ],
  playlist: "5HeKXzdlrErvXZaaOYmfEG",
  gallery: [
    { img: "img/rac-climb.jpg", cap: "Team expé · poudreuse au soleil" },
    { img: "img/rac-silhouette.jpg", cap: "Sous les sapins chargés" },
    { img: "img/rac-rain.jpg", cap: "Regroupement · neige & pluie" },
    { img: "img/rac-party.jpg", cap: "Raclette au chalet · le t-shirt de l'édition" },
  ],
};

window.RACLETTE = RACLETTE;

// ===== Édition Mont Chauve (l'origine — genèse du concept) =====
const MONTCHAUVE = {
  name: "Édition Mont Chauve",
  when: "Octobre 2025",
  where: "Mont Chauve · Nice",
  base: "Promenade des Anglais",
  intro: "Là où tout a commencé. Une sortie filmée comme un clip : départ Promenade des Anglais, montée au Mont Chauve, fumigènes verts au sommet et un DJ set face à la baie. NOLT au maillot, Resonance Musics à la prod — et le concept Trail to Techno était né.",
  expo: {
    km: "13,7",
    dplus: "1 184",
    from: "Promenade des Anglais · mer",
    to: "Mont Chauve · 854 m",
    profile: "M0.0 250.1 L23.3 250.7 L37.5 251.8 L65.4 251.5 L100.7 250.7 L144.9 251.1 L184.7 250.1 L222.6 247.6 L259.8 244.9 L301.2 241.1 L338.7 237.3 L361.3 231.2 L381.0 221.6 L403.6 211.3 L438.7 201.2 L452.7 200.9 L468.0 202.6 L483.5 196.3 L499.1 187.4 L513.5 183.5 L528.4 182.9 L550.0 182.0 L562.3 183.5 L578.4 173.6 L601.1 165.3 L619.1 160.0 L641.8 154.1 L664.0 145.3 L684.6 140.6 L698.3 129.3 L710.2 123.6 L731.8 118.1 L765.8 111.3 L791.8 104.7 L823.8 92.6 L861.2 78.4 L898.1 64.4 L916.4 59.5 L938.3 52.1 L957.9 36.9 L975.4 20.2 L989.9 12.9 L998.2 8.9 L1000.0 8.2",
  },
  partners: [
    { n: "NOLT", r: "Le maillot" },
    { n: "tout terrain club", r: "L'équipe" },
    { n: "Resonance Musics", r: "La prod & le DJ set" },
  ],
  links: [
    { label: "Le DJ set", sub: "sur YouTube", href: "https://youtu.be/pMIHIoRCogg?si=aSy-CzkZ7_ZBsezJ" },
    { label: "Le clip", sub: "sur YouTube", href: "https://youtu.be/gl_mZ91vhmU?si=5Q35Az1ubI89mGrZ" },
  ],
  playlist: "3vyfirO02s0EqrN3fC7amY",
  gallery: [
    { img: "img/mc-run.jpg", cap: "Départ · Promenade des Anglais" },
    { img: "img/mc-summit.jpg", cap: "Cap sur le Mont Chauve" },
    { img: "img/mc-smoke.jpg", cap: "Fumigènes au sommet" },
    { img: "img/mc-banner.jpg", cap: "NOLT × ttc × Resonance" },
  ],
};

window.MONTCHAUVE = MONTCHAUVE;

// ===== Adhésion 2027 =====
const ADHESION = {
  season: "2027",
  price: "60",
  period: "an",
  benefits: [
    { n: "01", k: "Les infos en prio", v: "Events du club et éditions Trail to Techno annoncés en avant-première. Tu réserves ta place avant tout le monde." },
    { n: "02", k: "Promos partenaires", v: "Des réductions réservées aux membres chez nos partenaires." },
    { n: "03", k: "Réducs sur les events", v: "Tarif membre sur les éditions Trail to Techno et les stages." },
    { n: "04", k: "Soirées exclusives", v: "Accès aux soirées réservées à la meute : DJ sets, refuges privatisés, afters." },
    { n: "05", k: "Espace membre", v: "Ton accès à l'espace membre : crée et gère tes team courses, suis tes inscriptions et tes stats.", wide: true },
  ],
  community: [
    { free: true, k: "Les runs officiels · gratuits", v: "Les sorties hebdo du club restent ouvertes à tout le monde, sans adhésion." },
    { free: true, k: "La commu WhatsApp · gratuite", v: "On y cale les sorties, on partage les traces et on annonce les events." },
    { free: false, k: "Des ressources pour progresser", v: "Plans, conseils d'entraînement et retours d'expé réservés aux membres." },
    { free: false, k: "Des events liés au trail", v: "Stages, sorties longues et rendez-vous trail exclusifs aux adhérents." },
  ],
  levels: [
    { niv: "1", an: "Poussin", em: "🐣" },
    { niv: "5", an: "Lapin", em: "🐇" },
    { niv: "10", an: "Renard", em: "🦊" },
    { niv: "15", an: "Loup", em: "🐺" },
    { niv: "25", an: "Sanglier", em: "🐗" },
    { niv: "40", an: "Grand Cerf", em: "🦌" },
    { niv: "70", an: "Chamois", em: "🐐" },
    { niv: "85", an: "Grizzly", em: "🐻" },
    { niv: "100", an: "Aigle Royal", em: "🦅" },
  ],
  stylesLevels: [
    { niv: "1", an: "Petit Tapeur de Pied", em: "🦶" },
    { niv: "5", an: "Danseur de Buffet", em: "🍽️" },
    { niv: "10", an: "Amateur de BPM", em: "🎧" },
    { niv: "15", an: "Chasseur de Caissons", em: "🔊" },
    { niv: "25", an: "Maxi Teufeur", em: "🔥" },
    { niv: "40", an: "Briseur de Semelles", em: "👟" },
    { niv: "70", an: "Machine à Techno", em: "⚡" },
    { niv: "85", an: "Chaman des Platines", em: "🧙" },
    { niv: "100", an: "Dieu de la Rave", em: "👑" },
  ],
};
window.ADHESION = ADHESION;
