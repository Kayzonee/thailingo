/* ============================================================
   ThaiLingo — contenu pédagogique (V1)
   LEX : lexique global (mot thaï, romanisation, français, emoji)
   SENT: phrases (chunks = découpage en mots, le thaï s'écrit sans espaces)
   CURRICULUM : unités > leçons > items
   ============================================================ */

const LEX = {
  // --- Salutations / politesse ---
  sawatdee:  { th:'สวัสดี',    rom:'sà-wàt-dii',    fr:'bonjour',          emoji:'👋' },
  khrap:     { th:'ครับ',      rom:'khráp',         fr:'(politesse, homme)', emoji:'🙋‍♂️' },
  kha:       { th:'ค่ะ',       rom:'khâ',           fr:'(politesse, femme)', emoji:'🙋‍♀️' },
  khopkhun:  { th:'ขอบคุณ',    rom:'khɔ̀ɔp-khun',   fr:'merci',            emoji:'🙏' },
  khothot:   { th:'ขอโทษ',     rom:'khɔ̌ɔ-thôot',   fr:'pardon',           emoji:'😅' },
  chai:      { th:'ใช่',       rom:'châi',          fr:'oui',              emoji:'✅' },
  mai_no:    { th:'ไม่',       rom:'mâi',           fr:'non / ne pas',     emoji:'❌' },
  sabaidee:  { th:'สบายดี',    rom:'sà-baai-dii',   fr:'ça va bien',       emoji:'😊' },
  lakon:     { th:'ลาก่อน',    rom:'laa-kɔ̀ɔn',     fr:'au revoir',        emoji:'👋' },
  yindee:    { th:'ยินดี',     rom:'yin-dii',       fr:'enchanté',         emoji:'🤝' },

  // --- Personnes / pronoms ---
  phom:      { th:'ผม',        rom:'phǒm',          fr:'je (homme)',       emoji:'👨' },
  chan:      { th:'ฉัน',       rom:'chǎn',          fr:'je (femme)',       emoji:'👩' },
  khun:      { th:'คุณ',       rom:'khun',          fr:'tu / vous',        emoji:'🫵' },
  khao:      { th:'เขา',       rom:'khǎo',          fr:'il / elle',        emoji:'🧑' },
  rao:       { th:'เรา',       rom:'rao',           fr:'nous',             emoji:'👨‍👩‍👧' },
  khon:      { th:'คน',        rom:'khon',          fr:'personne',         emoji:'🧍' },  // sert aussi de classificateur pour les personnes
  phuean:    { th:'เพื่อน',    rom:'phûean',        fr:'ami',              emoji:'👯' },
  khru:      { th:'ครู',       rom:'khruu',         fr:'professeur',       emoji:'👩‍🏫' },
  cheu:      { th:'ชื่อ',      rom:'chûue',         fr:'nom / s’appeler',  emoji:'🏷️' },
  arai:      { th:'อะไร',      rom:'à-rai',         fr:'quoi',             emoji:'❓' },

  // --- Nourriture / boissons ---
  nam:       { th:'น้ำ',       rom:'náam',          fr:'eau',              emoji:'💧' },
  khao_rice: { th:'ข้าว',      rom:'khâao',         fr:'riz',              emoji:'🍚' },
  kafae:     { th:'กาแฟ',      rom:'kaa-fɛɛ',       fr:'café',             emoji:'☕' },
  cha:       { th:'ชา',        rom:'chaa',          fr:'thé',              emoji:'🍵' },
  ahan:      { th:'อาหาร',     rom:'aa-hǎan',       fr:'nourriture',       emoji:'🍽️' },
  phonlamai: { th:'ผลไม้',     rom:'phǒn-lá-máai',  fr:'fruit',            emoji:'🍍' },
  kai:       { th:'ไก่',       rom:'kài',           fr:'poulet',           emoji:'🍗' },
  pla:       { th:'ปลา',       rom:'plaa',          fr:'poisson',          emoji:'🐟' },
  phet:      { th:'เผ็ด',      rom:'phèt',          fr:'épicé',            emoji:'🌶️' },
  aroi:      { th:'อร่อย',     rom:'à-rɔ̀i',        fr:'délicieux',        emoji:'😋' },

  // --- Verbes ---
  kin:       { th:'กิน',       rom:'kin',           fr:'manger',           emoji:'🍴' },
  duem:      { th:'ดื่ม',      rom:'dùuem',         fr:'boire',            emoji:'🥤' },
  pai:       { th:'ไป',        rom:'pai',           fr:'aller',            emoji:'🚶' },
  ma:        { th:'มา',        rom:'maa',           fr:'venir',            emoji:'🔙' },
  chop:      { th:'ชอบ',       rom:'chɔ̂ɔp',        fr:'aimer bien',       emoji:'👍' },
  rak:       { th:'รัก',       rom:'rák',           fr:'aimer (d’amour)',  emoji:'❤️' },
  mi:        { th:'มี',        rom:'mii',           fr:'avoir',            emoji:'🎁' },
  yu:        { th:'อยู่',      rom:'yùu',           fr:'être (situé)',     emoji:'📍' },
  phut:      { th:'พูด',       rom:'phûut',         fr:'parler',           emoji:'💬' },
  ao:        { th:'เอา',       rom:'ao',            fr:'prendre / vouloir',emoji:'🤲' },

  // --- Nombres ---
  nueng:     { th:'หนึ่ง',     rom:'nùeng',         fr:'un',               emoji:'1️⃣' },
  song:      { th:'สอง',       rom:'sɔ̌ɔng',        fr:'deux',             emoji:'2️⃣' },
  sam:       { th:'สาม',       rom:'sǎam',          fr:'trois',            emoji:'3️⃣' },
  si:        { th:'สี่',       rom:'sìi',           fr:'quatre',           emoji:'4️⃣' },
  ha:        { th:'ห้า',       rom:'hâa',           fr:'cinq',             emoji:'5️⃣' },
  hok:       { th:'หก',        rom:'hòk',           fr:'six',              emoji:'6️⃣' },
  jet:       { th:'เจ็ด',      rom:'jèt',           fr:'sept',             emoji:'7️⃣' },
  paet:      { th:'แปด',       rom:'pɛ̀ɛt',         fr:'huit',             emoji:'8️⃣' },
  kao:       { th:'เก้า',      rom:'kâao',          fr:'neuf',             emoji:'9️⃣' },
  sip:       { th:'สิบ',       rom:'sìp',           fr:'dix',              emoji:'🔟' },
  baht:      { th:'บาท',       rom:'bàat',          fr:'baht',             emoji:'💰' },
  thaorai:   { th:'เท่าไหร่',  rom:'thâo-rài',      fr:'combien',          emoji:'🧮' },

  // --- Voyage / lieux ---
  ban:       { th:'บ้าน',      rom:'bâan',          fr:'maison',           emoji:'🏠' },
  rot:       { th:'รถ',        rom:'rót',           fr:'voiture',          emoji:'🚗' },
  rotfai:    { th:'รถไฟ',      rom:'rót-fai',       fr:'train',            emoji:'🚆' },
  taxi:      { th:'แท็กซี่',   rom:'thɛ́k-sîi',     fr:'taxi',             emoji:'🚕' },
  rongraem:  { th:'โรงแรม',    rom:'roong-rɛɛm',    fr:'hôtel',            emoji:'🏨' },
  talat:     { th:'ตลาด',      rom:'tà-làat',       fr:'marché',           emoji:'🏪' },
  hongnam:   { th:'ห้องน้ำ',   rom:'hɔ̂ɔng-náam',   fr:'toilettes',        emoji:'🚻' },
  thinai:    { th:'ที่ไหน',    rom:'thîi-nǎi',      fr:'où',               emoji:'🗺️' },
  sai:       { th:'ซ้าย',      rom:'sáai',          fr:'gauche',           emoji:'⬅️' },
  khwa:      { th:'ขวา',       rom:'khwǎa',         fr:'droite',           emoji:'➡️' },

  // --- Animaux / divers ---
  ma_dog:    { th:'หมา',       rom:'mǎa',           fr:'chien',            emoji:'🐶' },
  maeo:      { th:'แมว',       rom:'mɛɛo',          fr:'chat',             emoji:'🐱' },
  chang:     { th:'ช้าง',      rom:'cháang',        fr:'éléphant',         emoji:'🐘' },
  nok:       { th:'นก',        rom:'nók',           fr:'oiseau',           emoji:'🐦' },
  thai:      { th:'ไทย',       rom:'thai',          fr:'thaï',             emoji:'🇹🇭' },
  farangset: { th:'ฝรั่งเศส',  rom:'fà-ràng-sèet',  fr:'français (pays)',  emoji:'🇫🇷' },
  mak:       { th:'มาก',       rom:'mâak',          fr:'beaucoup / très',  emoji:'📈' },
  nitnoi:    { th:'นิดหน่อย',  rom:'nít-nɔ̀i',      fr:'un peu',           emoji:'🤏' }
};

/* Phrases : chunks = mots séparés (pour la banque de mots) */
const SENT = {
  s_hello:    { chunks:['สวัสดี','ครับ'],                 rom:'sà-wàt-dii khráp',            fr:'Bonjour (dit par un homme)' },
  s_hru:      { chunks:['สบายดี','ไหม'],                  rom:'sà-baai-dii mǎi',             fr:'Comment ça va ?' },
  s_fine:     { chunks:['สบายดี','ค่ะ'],                  rom:'sà-baai-dii khâ',             fr:'Ça va bien (dit par une femme)' },
  s_thanks:   { chunks:['ขอบคุณ','มาก'],                  rom:'khɔ̀ɔp-khun mâak',            fr:'Merci beaucoup' },
  s_myname:   { chunks:['ผม','ชื่อ','ปิแอร์'],            rom:'phǒm chûue Pierre',           fr:'Je m’appelle Pierre' },
  s_whatname: { chunks:['คุณ','ชื่อ','อะไร'],             rom:'khun chûue à-rai',            fr:'Comment tu t’appelles ?' },
  s_ieat:     { chunks:['ผม','กิน','ข้าว'],               rom:'phǒm kin khâao',              fr:'Je mange du riz' },
  s_idrink:   { chunks:['ฉัน','ดื่ม','กาแฟ'],             rom:'chǎn dùuem kaa-fɛɛ',          fr:'Je bois du café' },
  s_youlike:  { chunks:['คุณ','ชอบ','อาหาร','ไทย','ไหม'], rom:'khun chɔ̂ɔp aa-hǎan thai mǎi',fr:'Tu aimes la cuisine thaïe ?' },
  s_notspicy: { chunks:['ไม่','เผ็ด'],                     rom:'mâi phèt',                    fr:'Pas épicé' },
  s_verygood: { chunks:['อร่อย','มาก'],                    rom:'à-rɔ̀i mâak',                 fr:'C’est très bon' },
  s_water:    { chunks:['ขอ','น้ำ','หนึ่ง','ขวด'],        rom:'khɔ̌ɔ náam nùeng khùat',      fr:'Une bouteille d’eau, s’il vous plaît' },
  s_howmuch:  { chunks:['เท่าไหร่'],                       rom:'thâo-rài',                    fr:'Combien ?' },
  s_price:    { chunks:['ห้า','สิบ','บาท'],               rom:'hâa sìp bàat',                fr:'Cinquante bahts' },
  s_toilet:   { chunks:['ห้องน้ำ','อยู่','ที่ไหน'],        rom:'hɔ̂ɔng-náam yùu thîi-nǎi',    fr:'Où sont les toilettes ?' },
  s_gohotel:  { chunks:['ไป','โรงแรม'],                    rom:'pai roong-rɛɛm',              fr:'Aller à l’hôtel' },
  s_turnleft: { chunks:['เลี้ยว','ซ้าย'],                  rom:'líao sáai',                   fr:'Tourner à gauche' },
  s_ihave:    { chunks:['ผม','มี','เพื่อน','คน','ไทย'],   rom:'phǒm mii phûean khon thai',   fr:'J’ai un ami thaïlandais' },
  s_ispeak:   { chunks:['ผม','พูด','ไทย','นิดหน่อย'],     rom:'phǒm phûut thai nít-nɔ̀i',    fr:'Je parle un peu thaï' },
  s_ilove:    { chunks:['ฉัน','รัก','เมืองไทย'],          rom:'chǎn rák mueang-thai',        fr:'J’aime la Thaïlande' },
  s_dogcat:   { chunks:['ผม','มี','หมา','สอง','ตัว'],     rom:'phǒm mii mǎa sɔ̌ɔng tua',     fr:'J’ai deux chiens' },
  s_gomarket: { chunks:['เรา','ไป','ตลาด'],                rom:'rao pai tà-làat',             fr:'Nous allons au marché' }
};

/* Alphabet thaï complet : 44 consonnes (avec classe de ton), voyelles, signes de ton */
const SCRIPT = [
  { th:'ก', rom:'k',   fr:'ko kai — poulet',        cls:'moyenne', emoji:'🐔' },
  { th:'ข', rom:'kh',  fr:'kho khai — œuf',          cls:'haute',   emoji:'🥚' },
  { th:'ค', rom:'kh',  fr:'kho khwai — buffle',      cls:'basse',   emoji:'🐃' },
  { th:'ฆ', rom:'kh',  fr:'kho rakhang — cloche',    cls:'basse',   emoji:'🔔' },
  { th:'ง', rom:'ng',  fr:'ngo ngu — serpent',       cls:'basse',   emoji:'🐍' },
  { th:'จ', rom:'j',   fr:'jo jan — assiette',       cls:'moyenne', emoji:'🍽️' },
  { th:'ฉ', rom:'ch',  fr:'cho ching — cymbales',    cls:'haute',   emoji:'🎶' },
  { th:'ช', rom:'ch',  fr:'cho chang — éléphant',    cls:'basse',   emoji:'🐘' },
  { th:'ซ', rom:'s',   fr:'so so — chaîne',          cls:'basse',   emoji:'⛓️' },
  { th:'ฌ', rom:'ch',  fr:'cho choe — arbre',        cls:'basse',   emoji:'🌳' },
  { th:'ญ', rom:'y',   fr:'yo ying — femme',         cls:'basse',   emoji:'👩' },
  { th:'ฎ', rom:'d',   fr:'do chada — diadème',      cls:'moyenne', emoji:'👑' },
  { th:'ฏ', rom:'t',   fr:'to patak — aiguillon',    cls:'moyenne', emoji:'🔱' },
  { th:'ฐ', rom:'th',  fr:'tho than — socle',        cls:'haute',   emoji:'🗿' },
  { th:'ฑ', rom:'th',  fr:'tho montho — Montho',     cls:'basse',   emoji:'👸' },
  { th:'ฒ', rom:'th',  fr:'tho phu thao — vieillard',cls:'basse',   emoji:'👴' },
  { th:'ณ', rom:'n',   fr:'no nen — novice',         cls:'basse',   emoji:'🧘' },
  { th:'ด', rom:'d',   fr:'do dek — enfant',         cls:'moyenne', emoji:'🧒' },
  { th:'ต', rom:'t',   fr:'to tao — tortue',         cls:'moyenne', emoji:'🐢' },
  { th:'ถ', rom:'th',  fr:'tho thung — sac',         cls:'haute',   emoji:'👜' },
  { th:'ท', rom:'th',  fr:'tho thahan — soldat',     cls:'basse',   emoji:'💂' },
  { th:'ธ', rom:'th',  fr:'tho thong — drapeau',     cls:'basse',   emoji:'🚩' },
  { th:'น', rom:'n',   fr:'no nu — souris',          cls:'basse',   emoji:'🐭' },
  { th:'บ', rom:'b',   fr:'bo baimai — feuille',     cls:'moyenne', emoji:'🍃' },
  { th:'ป', rom:'p',   fr:'po pla — poisson',        cls:'moyenne', emoji:'🐟' },
  { th:'ผ', rom:'ph',  fr:'pho phueng — abeille',    cls:'haute',   emoji:'🐝' },
  { th:'ฝ', rom:'f',   fr:'fo fa — couvercle',       cls:'haute',   emoji:'🥫' },
  { th:'พ', rom:'ph',  fr:'pho phan — plateau',      cls:'basse',   emoji:'🍶' },
  { th:'ฟ', rom:'f',   fr:'fo fan — dent',           cls:'basse',   emoji:'🦷' },
  { th:'ภ', rom:'ph',  fr:'pho samphao — voilier',   cls:'basse',   emoji:'⛵' },
  { th:'ม', rom:'m',   fr:'mo ma — cheval',          cls:'basse',   emoji:'🐴' },
  { th:'ย', rom:'y',   fr:'yo yak — géant',          cls:'basse',   emoji:'👹' },
  { th:'ร', rom:'r',   fr:'ro ruea — bateau',        cls:'basse',   emoji:'🚣' },
  { th:'ล', rom:'l',   fr:'lo ling — singe',         cls:'basse',   emoji:'🐒' },
  { th:'ว', rom:'w',   fr:'wo waen — bague',         cls:'basse',   emoji:'💍' },
  { th:'ศ', rom:'s',   fr:'so sala — pavillon',      cls:'haute',   emoji:'⛩️' },
  { th:'ษ', rom:'s',   fr:'so ruesi — ermite',       cls:'haute',   emoji:'🧙' },
  { th:'ส', rom:'s',   fr:'so suea — tigre',         cls:'haute',   emoji:'🐯' },
  { th:'ห', rom:'h',   fr:'ho hip — coffre',         cls:'haute',   emoji:'📦' },
  { th:'ฬ', rom:'l',   fr:'lo chula — cerf-volant',  cls:'basse',   emoji:'🪁' },
  { th:'อ', rom:'o',   fr:'o ang — bassine',         cls:'moyenne', emoji:'🪣' },
  { th:'ฮ', rom:'h',   fr:'ho nokhuk — hibou',       cls:'basse',   emoji:'🦉' },
  { th:'ฃ', rom:'kh',  fr:'kho khuat — bouteille (désuet)', cls:'haute', emoji:'🍾' },
  { th:'ฅ', rom:'kh',  fr:'kho khon — personne (désuet)',   cls:'basse', emoji:'🧍' },
  // voyelles
  { th:'-า', rom:'aa', fr:'voyelle longue « aa »',   emoji:'🅰️' },
  { th:'-ิ', rom:'i',  fr:'voyelle brève « i »',     emoji:'🇮' },
  { th:'-ี', rom:'ii', fr:'voyelle longue « ii »',   emoji:'🇮' },
  { th:'-ุ', rom:'u',  fr:'voyelle brève « ou »',    emoji:'🇺' },
  { th:'-ู', rom:'uu', fr:'voyelle longue « ouu »',  emoji:'🇺' },
  { th:'เ-', rom:'ee', fr:'voyelle « éé » (devant)', emoji:'🅴' },
  { th:'แ-', rom:'ɛɛ', fr:'voyelle « èè » (devant)', emoji:'🅴' },
  { th:'โ-', rom:'oo', fr:'voyelle « oo » (devant)', emoji:'🅾️' },
  { th:'ไ-', rom:'ai', fr:'voyelle « ai » (devant)', emoji:'🆎' },
  { th:'-ำ', rom:'am', fr:'voyelle « am »',          emoji:'🅰️' },
  // signes de ton
  { th:'-่', rom:'ton bas',        fr:'mái èek — 1er signe de ton',    emoji:'⬇️' },
  { th:'-้', rom:'ton descendant', fr:'mái thoo — 2e signe de ton',    emoji:'↘️' },
  { th:'-๊', rom:'ton haut',       fr:'mái trii — 3e signe de ton',    emoji:'⬆️' },
  { th:'-๋', rom:'ton montant',    fr:'mái jàt-tà-waa — 4e signe',     emoji:'↗️' }
];

const CURRICULUM = [
  { id:'u1', title:'Unité 1', subtitle:'Se saluer', color:'#58CC02', icon:'👋',
    lessons:[
      { id:'u1l1', title:'Bonjour', words:['sawatdee','khrap','kha','khopkhun'], sentences:['s_hello','s_thanks'] },
      { id:'u1l2', title:'Ça va ?',  words:['sabaidee','chai','mai_no','khothot'], sentences:['s_hru','s_fine'] },
      { id:'u1l3', title:'Au revoir',words:['lakon','yindee','khun','phom'], sentences:['s_hello','s_fine','s_thanks'] }
    ]},
  { id:'u2', title:'Unité 2', subtitle:'Les gens', color:'#1CB0F6', icon:'🧑',
    lessons:[
      { id:'u2l1', title:'Pronoms',  words:['phom','chan','khun','khao','rao'], sentences:['s_myname','s_whatname'] },
      { id:'u2l2', title:'Qui ?',    words:['khon','phuean','khru','cheu','arai'], sentences:['s_whatname','s_ihave'] },
      { id:'u2l3', title:'Présenter',words:['phom','chan','phuean','thai','farangset'], sentences:['s_myname','s_ihave','s_ispeak'] }
    ]},
  { id:'u3', title:'Alphabet', subtitle:'Les 44 consonnes et les voyelles', color:'#CE82FF', icon:'🔤', script:true, ecriture:true,
    lessons:[
      { id:'u3l1', title:'Consonnes 1',  script:[0,1,2,4,5] },
      { id:'u3l2', title:'Consonnes 2',  script:[6,7,8,10,17] },
      { id:'u3l3', title:'Consonnes 3',  script:[18,19,20,22,23] },
      { id:'u3l4', title:'Consonnes 4',  script:[24,25,27,30,31] },
      { id:'u3l5', title:'Consonnes 5',  script:[32,33,34,37,38] },
      { id:'u3l6', title:'Consonnes 6',  script:[13,26,28,35,40,41] },
      { id:'u3l7', title:'Voyelles',     script:[44,45,46,47,48,49,50,51,52,53] },
      { id:'u3l8', title:'Les tons',     script:[54,55,56,57] }
    ]},
  { id:'u4', title:'Unité 4', subtitle:'Manger', color:'#FF9600', icon:'🍜',
    lessons:[
      { id:'u4l1', title:'À table',   words:['kin','duem','nam','khao_rice','kafae','cha'], sentences:['s_ieat','s_idrink'] },
      { id:'u4l2', title:'Au resto',  words:['ahan','phet','aroi','kai','pla','ao'], sentences:['s_notspicy','s_verygood','s_youlike'] },
      { id:'u4l3', title:'Commander', words:['nam','ao','mak','nitnoi','phonlamai'], sentences:['s_water','s_verygood','s_notspicy'] }
    ]},
  { id:'u5', title:'Unité 5', subtitle:'Nombres & marché', color:'#FF4B4B', icon:'🔢',
    lessons:[
      { id:'u5l1', title:'1 à 5',    words:['nueng','song','sam','si','ha'], sentences:['s_dogcat'] },
      { id:'u5l2', title:'6 à 10',   words:['hok','jet','paet','kao','sip'], sentences:['s_price'] },
      { id:'u5l3', title:'Marchander',words:['thaorai','baht','talat','mak','nitnoi'], sentences:['s_howmuch','s_price','s_gomarket'] }
    ]},
  { id:'u6', title:'Unité 6', subtitle:'Se déplacer', color:'#00CD9C', icon:'🚕',
    lessons:[
      { id:'u6l1', title:'Transports', words:['rot','rotfai','taxi','pai','ma'], sentences:['s_gohotel','s_gomarket'] },
      { id:'u6l2', title:'Lieux',      words:['ban','rongraem','talat','hongnam','yu'], sentences:['s_toilet','s_gohotel'] },
      { id:'u6l3', title:'Directions', words:['thinai','sai','khwa','yu','pai'], sentences:['s_toilet','s_turnleft'] }
    ]},
  { id:'u7', title:'Unité 7', subtitle:'Vie quotidienne', color:'#A560E8', icon:'🐘',
    lessons:[
      { id:'u7l1', title:'Verbes',   words:['chop','rak','mi','phut','yu'], sentences:['s_ilove','s_ispeak'] },
      { id:'u7l2', title:'Animaux',  words:['ma_dog','maeo','chang','nok','khon'], sentences:['s_dogcat'] },
      { id:'u7l3', title:'Révision', words:['sawatdee','kin','nam','pai','thaorai','phuean'], sentences:['s_ieat','s_toilet','s_howmuch','s_ilove'] }
    ]}
];

/* ============================================================
   Extension V2 — vocabulaire, phrases, tons et unités 8→10
   ============================================================ */
Object.assign(LEX, {
  // Couleurs
  si_daeng:  { th:'สีแดง',      rom:'sǐi-dɛɛng',      fr:'rouge',            emoji:'🔴' },
  si_namngen:{ th:'สีน้ำเงิน',  rom:'sǐi-náam-ngəən', fr:'bleu',             emoji:'🔵' },
  si_khiao:  { th:'สีเขียว',    rom:'sǐi-khǐao',      fr:'vert',             emoji:'🟢' },
  si_dam:    { th:'สีดำ',       rom:'sǐi-dam',        fr:'noir',             emoji:'⚫' },
  si_khao:   { th:'สีขาว',      rom:'sǐi-khǎao',      fr:'blanc',            emoji:'⚪' },
  // Famille
  mae:       { th:'แม่',        rom:'mɛ̂ɛ',           fr:'mère',             emoji:'👩' },
  pho:       { th:'พ่อ',        rom:'phɔ̂ɔ',          fr:'père',             emoji:'👨' },
  luk:       { th:'ลูก',        rom:'lûuk',           fr:'enfant',           emoji:'👶' },
  phi:       { th:'พี่',        rom:'phîi',           fr:'aîné(e)',          emoji:'🧑' },
  nong:      { th:'น้อง',       rom:'nɔ́ɔng',         fr:'cadet(te)',        emoji:'🧒' },
  khropkhrua:{ th:'ครอบครัว',   rom:'khrɔ̂ɔp-khrua',  fr:'famille',          emoji:'👨‍👩‍👧' },
  // Temps
  wanni:     { th:'วันนี้',     rom:'wan-níi',        fr:'aujourd’hui',      emoji:'📅' },
  phrungni:  { th:'พรุ่งนี้',   rom:'phrûng-níi',     fr:'demain',           emoji:'⏭️' },
  mueawan:   { th:'เมื่อวาน',   rom:'mûea-waan',      fr:'hier',             emoji:'⏮️' },
  tonchao:   { th:'ตอนเช้า',    rom:'tɔɔn-cháao',     fr:'le matin',         emoji:'🌅' },
  tonyen:    { th:'ตอนเย็น',    rom:'tɔɔn-yen',       fr:'le soir',          emoji:'🌆' },
  wela:      { th:'เวลา',       rom:'wee-laa',        fr:'temps / heure',    emoji:'⏰' },
  // Adjectifs
  yai:       { th:'ใหญ่',       rom:'yài',            fr:'grand',            emoji:'🐘' },
  lek:       { th:'เล็ก',       rom:'lék',            fr:'petit',            emoji:'🐜' },
  ron:       { th:'ร้อน',       rom:'rɔ́ɔn',          fr:'chaud',            emoji:'🔥' },
  yen:       { th:'เย็น',       rom:'yen',            fr:'frais',            emoji:'❄️' },
  suai:      { th:'สวย',        rom:'sǔai',           fr:'joli',             emoji:'🌸' },
  di:        { th:'ดี',         rom:'dii',            fr:'bien / bon',       emoji:'👌' },
  phaeng:    { th:'แพง',        rom:'phɛɛng',         fr:'cher',             emoji:'💸' },
  thuk:      { th:'ถูก',        rom:'thùuk',          fr:'pas cher',         emoji:'🏷️' },
  // Questions
  khrai:     { th:'ใคร',        rom:'khrai',          fr:'qui',              emoji:'🕵️' },
  thammai:   { th:'ทำไม',       rom:'tham-mai',       fr:'pourquoi',         emoji:'🤔' },
  muearai:   { th:'เมื่อไหร่',  rom:'mûea-rài',       fr:'quand',            emoji:'📆' },
  yangngai:  { th:'ยังไง',      rom:'yang-ngai',      fr:'comment',          emoji:'⚙️' },
  // Verbes
  tham:      { th:'ทำ',         rom:'tham',           fr:'faire',            emoji:'🔨' },
  du:        { th:'ดู',         rom:'duu',            fr:'regarder',         emoji:'👀' },
  fang:      { th:'ฟัง',        rom:'fang',           fr:'écouter',          emoji:'👂' },
  an:        { th:'อ่าน',       rom:'àan',            fr:'lire',             emoji:'📖' },
  khian:     { th:'เขียน',      rom:'khǐan',          fr:'écrire',           emoji:'✍️' },
  non:       { th:'นอน',        rom:'nɔɔn',           fr:'dormir',           emoji:'😴' },
  thamngan:  { th:'ทำงาน',      rom:'tham-ngaan',     fr:'travailler',       emoji:'💼' },
  rian:      { th:'เรียน',      rom:'rian',           fr:'étudier',          emoji:'🎓' },
  yak:       { th:'อยาก',       rom:'yàak',           fr:'vouloir',          emoji:'🌟' },
  // Nourriture
  kuaitiao:  { th:'ก๋วยเตี๋ยว', rom:'kǔai-tǐao',      fr:'soupe de nouilles',emoji:'🍜' },
  phatthai:  { th:'ผัดไทย',     rom:'phàt-thai',      fr:'pad thaï',         emoji:'🍤' },
  somtam:    { th:'ส้มตำ',      rom:'sôm-tam',        fr:'salade de papaye', emoji:'🥗' },
  bia:       { th:'เบียร์',     rom:'bia',            fr:'bière',            emoji:'🍺' },
  namkhaeng: { th:'น้ำแข็ง',    rom:'náam-khǎeng',    fr:'glaçons',          emoji:'🧊' },
  // Vie pratique
  maipenrai: { th:'ไม่เป็นไร',  rom:'mâi-pen-rai',    fr:'de rien / pas grave', emoji:'🤷' },
  rongphaya: { th:'โรงพยาบาล',  rom:'roong-phá-yaa-baan', fr:'hôpital',      emoji:'🏥' },
  tamruat:   { th:'ตำรวจ',      rom:'tam-rùat',       fr:'police',           emoji:'👮' },
  ngen:      { th:'เงิน',       rom:'ngən',           fr:'argent',           emoji:'💵' },
  thorasap:  { th:'โทรศัพท์',   rom:'thoo-rá-sàp',    fr:'téléphone',        emoji:'📱' },
  phasa:     { th:'ภาษา',       rom:'phaa-sǎa',       fr:'langue',           emoji:'🗣️' },
  chuai:     { th:'ช่วย',       rom:'chûai',          fr:'aider',            emoji:'🆘' }
});

Object.assign(SENT, {
  s_family:   { chunks:['ผม','มี','พี่','สอง','คน'],        rom:'phǒm mii phîi sɔ̌ɔng khon', fr:'J’ai deux grands frères' },
  s_hot:      { chunks:['วันนี้','ร้อน','มาก'],              rom:'wan-níi rɔ́ɔn mâak',        fr:'Aujourd’hui il fait très chaud' },
  s_expensive:{ chunks:['แพง','เกินไป'],                     rom:'phɛɛng kəən-pai',           fr:'C’est trop cher' },
  s_nevermind:{ chunks:['ไม่เป็นไร'],                        rom:'mâi-pen-rai',               fr:'Ce n’est rien' },
  s_study:    { chunks:['ผม','เรียน','ภาษา','ไทย'],         rom:'phǒm rian phaa-sǎa thai',   fr:'J’étudie la langue thaïe' },
  s_wherefrom:{ chunks:['คุณ','มา','จาก','ไหน'],            rom:'khun maa jàak nǎi',         fr:'D’où viens-tu ?' },
  s_fromfr:   { chunks:['ผม','มา','จาก','ฝรั่งเศส'],        rom:'phǒm maa jàak fà-ràng-sèet',fr:'Je viens de France' },
  s_noodle:   { chunks:['ขอ','ก๋วยเตี๋ยว','หนึ่ง','ชาม'],   rom:'khɔ̌ɔ kǔai-tǐao nùeng chaam', fr:'Un bol de nouilles s’il vous plaît' },
  s_beer:     { chunks:['ขอ','เบียร์','เย็น'],               rom:'khɔ̌ɔ bia yen',             fr:'Une bière fraîche s’il vous plaît' },
  s_tomorrow: { chunks:['พรุ่งนี้','ผม','ไป','ตลาด'],       rom:'phrûng-níi phǒm pai tà-làat', fr:'Demain je vais au marché' },
  s_sleep:    { chunks:['ผม','อยาก','นอน'],                  rom:'phǒm yàak nɔɔn',            fr:'Je veux dormir' },
  s_pretty:   { chunks:['ภาษา','ไทย','สวย','มาก'],          rom:'phaa-sǎa thai sǔai mâak',   fr:'La langue thaïe est très belle' },
  s_mother:   { chunks:['แม่','ทำงาน','ตอนเช้า'],           rom:'mɛ̂ɛ tham-ngaan tɔɔn-cháao',fr:'Maman travaille le matin' },
  s_help:     { chunks:['ช่วย','ผม','หน่อย'],                rom:'chûai phǒm nɔ̀i',           fr:'Aidez-moi s’il vous plaît' },
  s_hospital: { chunks:['โรงพยาบาล','อยู่','ที่ไหน'],       rom:'roong-phá-yaa-baan yùu thîi-nǎi', fr:'Où est l’hôpital ?' }
});

/* 3 nouvelles unités */
CURRICULUM.push(
  { id:'u8', title:'Unité 8', subtitle:'Famille & temps', color:'#FF86D0', icon:'👨‍👩‍👧',
    lessons:[
      { id:'u8l1', title:'La famille', words:['mae','pho','luk','phi','nong','khropkhrua'], sentences:['s_family','s_mother'] },
      { id:'u8l2', title:'Quand ?',    words:['wanni','phrungni','mueawan','tonchao','tonyen','wela'], sentences:['s_tomorrow','s_mother'] },
      { id:'u8l3', title:'Ma journée', words:['thamngan','rian','non','tham','yak'], sentences:['s_sleep','s_study','s_mother'] }
    ]},
  { id:'u9', title:'Unité 9', subtitle:'Décrire & demander', color:'#FFB020', icon:'🎨',
    lessons:[
      { id:'u9l1', title:'Couleurs',   words:['si_daeng','si_namngen','si_khiao','si_dam','si_khao'], sentences:['s_pretty'] },
      { id:'u9l2', title:'Adjectifs',  words:['yai','lek','ron','yen','suai','di','phaeng','thuk'], sentences:['s_hot','s_expensive'] },
      { id:'u9l3', title:'Questions',  words:['khrai','thammai','muearai','yangngai','thinai'], sentences:['s_wherefrom','s_fromfr'] }
    ]},
  { id:'u10', title:'Unité 10', subtitle:'Se débrouiller', color:'#2CC3A5', icon:'🛟',
    lessons:[
      { id:'u10l1', title:'Au restaurant', words:['kuaitiao','phatthai','somtam','bia','namkhaeng'], sentences:['s_noodle','s_beer'] },
      { id:'u10l2', title:'Urgences',      words:['rongphaya','tamruat','chuai','maipenrai','thorasap'], sentences:['s_help','s_hospital','s_nevermind'] },
      { id:'u10l3', title:'Parler thaï',   words:['phasa','an','khian','fang','phut','ngen'], sentences:['s_study','s_pretty','s_wherefrom'] }
    ]}
);

/* ============================================================
   Extension V4 — classificateurs et règles de ton
   ============================================================ */
Object.assign(LEX, {
  cl_tua:  { th:'ตัว',  rom:'tua',   fr:'classif. animaux/vêtements', emoji:'🐕' },
  cl_an:   { th:'อัน',  rom:'an',    fr:'classif. petits objets',     emoji:'🔧' },
  cl_bai:  { th:'ใบ',   rom:'bai',   fr:'classif. feuilles/récipients', emoji:'🍃' },
  cl_khuat:{ th:'ขวด',  rom:'khùat', fr:'classif. bouteilles',        emoji:'🍾' },
  cl_cham: { th:'ชาม',  rom:'chaam', fr:'classif. bols',              emoji:'🥣' },
  cl_khan: { th:'คัน',  rom:'khan',  fr:'classif. véhicules',         emoji:'🚗' },
  cl_khan2:{ th:'เล่ม', rom:'lêm',   fr:'classif. livres',            emoji:'📕' }
});
Object.assign(SENT, {
  s_twodogs: { chunks:['ผม','มี','หมา','สอง','ตัว'],       rom:'phǒm mii mǎa sɔ̌ɔng tua',   fr:'J’ai deux chiens' },
  s_threefr: { chunks:['เพื่อน','สาม','คน'],                rom:'phûean sǎam khon',          fr:'Trois amis' },
  s_onebowl: { chunks:['ก๋วยเตี๋ยว','หนึ่ง','ชาม'],        rom:'kǔai-tǐao nùeng chaam',     fr:'Un bol de nouilles' },
  s_twocars: { chunks:['รถ','สอง','คัน'],                   rom:'rót sɔ̌ɔng khan',           fr:'Deux voitures' }
});

/* Règles de ton : classe de la consonne initiale + signe éventuel → ton réel.
   Chaque entrée est un exemple vérifiable, avec l'explication de la règle. */
const TONES = ['moyen','bas','descendant','haut','montant'];
const TONE_RULES = [
  { th:'กา', rom:'kaa',   ton:'moyen',      regle:'consonne moyenne (ก) + syllabe vivante, sans signe → ton moyen' },
  { th:'ขา', rom:'khǎa',  ton:'montant',    regle:'consonne haute (ข) + syllabe vivante, sans signe → ton montant' },
  { th:'คา', rom:'khaa',  ton:'moyen',      regle:'consonne basse (ค) + syllabe vivante, sans signe → ton moyen' },
  { th:'ก่า', rom:'kàa',  ton:'bas',        regle:'consonne moyenne + mái èek (่) → ton bas' },
  { th:'ข่า', rom:'khàa', ton:'bas',        regle:'consonne haute + mái èek (่) → ton bas' },
  { th:'ค่า', rom:'khâa', ton:'descendant', regle:'consonne basse + mái èek (่) → ton descendant' },
  { th:'ก้า', rom:'kâa',  ton:'descendant', regle:'consonne moyenne + mái thoo (้) → ton descendant' },
  { th:'ข้า', rom:'khâa', ton:'descendant', regle:'consonne haute + mái thoo (้) → ton descendant' },
  { th:'ค้า', rom:'kháa', ton:'haut',       regle:'consonne basse + mái thoo (้) → ton haut' },
  { th:'ก๊า', rom:'káa',  ton:'haut',       regle:'consonne moyenne + mái trii (๊) → ton haut' },
  { th:'ก๋า', rom:'kǎa',  ton:'montant',    regle:'consonne moyenne + mái jàt-tà-waa (๋) → ton montant' }
];

CURRICULUM.push(
  { id:'u11', title:'Unité 11', subtitle:'Compter & les tons', color:'#7B61FF', icon:'🎼',
    lessons:[
      { id:'u11l1', title:'Classificateurs 1', words:['cl_tua','khon','cl_cham','cl_khuat'], sentences:['s_twodogs','s_threefr','s_onebowl'] },
      { id:'u11l2', title:'Classificateurs 2', words:['cl_an','cl_bai','cl_khan','cl_khan2'],     sentences:['s_twocars','s_onebowl'] }
    ]},
  { id:'u12', title:'Les tons', subtitle:'Lire le ton d’une syllabe', color:'#7B61FF', icon:'🎼', ecriture:true,
    lessons:[
      { id:'u11l3', title:'Règles de ton 1', tones:[0,1,2,3,4] },
      { id:'u11l4', title:'Règles de ton 2', tones:[5,6,7,8,9,10] }
    ]}
);

/* ============================================================
   Extension V5 — sections (chapitres du parcours)
   ============================================================ */
const SECTIONS = [
  { id:'s1', titre:'Section 1 — Premiers mots',      unites:['u1','u2'],            couleur:'#58CC02' },
  { id:'s2', titre:'Section 2 — La vie de tous les jours', unites:['u4','u5','u6','u7'], couleur:'#1CB0F6' },
  { id:'s3', titre:'Section 3 — S’exprimer',         unites:['u8','u9','u10','u11'], couleur:'#CE82FF' }
];

/* ============================================================
   Romanisation de tout ce qui s'affiche en thaï — les mots des
   phrases qui ne sont pas des entrées du lexique
   ============================================================ */
const ROM_EXTRA = {
  'ไหม':'mǎi', 'ปิแอร์':'pi-ɛɛ', 'ขอ':'khɔ̌ɔ', 'เลี้ยว':'líao', 'เมืองไทย':'mueang-thai',
  'เกินไป':'kəən-pai', 'จาก':'jàak', 'ไหน':'nǎi', 'หน่อย':'nɔ̀i'
};
const ROM_PAR_THAI = (()=>{
  const t = Object.assign({}, ROM_EXTRA);
  Object.values(LEX).forEach(w=>{ if(!t[w.th]) t[w.th] = w.rom; });
  SCRIPT.forEach(l=>{ if(!t[l.th]) t[l.th] = l.rom; });
  TONE_RULES.forEach(r=>{ if(!t[r.th]) t[r.th] = r.rom; });
  return t;
})();
/* romanisation d'un mot, ou d'une suite de mots thaïs */
function romDe(th){
  if(!th) return '';
  if(ROM_PAR_THAI[th]) return ROM_PAR_THAI[th];
  return '';
}

/* deux parcours distincts : la langue d'un côté, l'écriture de l'autre */
const UNITES_LANGUE   = CURRICULUM.filter(u => !u.ecriture);
const UNITES_ECRITURE = CURRICULUM.filter(u =>  u.ecriture);
