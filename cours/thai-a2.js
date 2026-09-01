/* ============================================================
   Thaï — palier A2 (Élémentaire)
   Le corps, la maison, le travail, le temps qui passe,
   et les premières marques d'aspect (แล้ว, จะ, กำลัง, เคย).
   ============================================================ */
ajouterPalier({ palier:'a2', lexique:{
  /* — corps et santé — */
  hua:{ th:'หัว', rom:'hǔa', fr:'tête', en:'head', emoji:'🧠' },
  ta_eye:{ th:'ตาดู', rom:'taa', fr:'œil', en:'eye', emoji:'👁️' },
  hu:{ th:'หู', rom:'hǔu', fr:'oreille', en:'ear', emoji:'👂' },
  pak:{ th:'ปาก', rom:'pàak', fr:'bouche', en:'mouth', emoji:'👄' },
  mue:{ th:'มือ', rom:'mʉʉ', fr:'main', en:'hand', emoji:'✋' },
  thao:{ th:'เท้า', rom:'tháao', fr:'pied', en:'foot', emoji:'🦶' },
  thong:{ th:'ท้อง', rom:'thɔ́ɔng', fr:'ventre', en:'belly', emoji:'🫄' },
  lang:{ th:'หลัง', rom:'lǎng', fr:'dos', en:'back', emoji:'🔙' },
  jai:{ th:'ใจ', rom:'jai', fr:'cœur (esprit)', en:'heart (mind)', emoji:'💗' },
  puai:{ th:'ป่วย', rom:'pùai', fr:'malade', en:'sick', emoji:'🤒' },
  jep:{ th:'เจ็บ', rom:'jèp', fr:'avoir mal', en:'to hurt', emoji:'😣' },
  puat:{ th:'ปวด', rom:'pùat', fr:'douleur sourde', en:'ache', emoji:'🤕' },
  ya_med:{ th:'ยา', rom:'yaa', fr:'médicament', en:'medicine', emoji:'💊' },
  mo:{ th:'หมอ', rom:'mɔ̌ɔ', fr:'médecin', en:'doctor', emoji:'🩺' },
  khaijai:{ th:'ไข้', rom:'khâi', fr:'fièvre', en:'fever', emoji:'🌡️' },
  nueai:{ th:'เหนื่อย', rom:'nʉ̀ai', fr:'fatigué', en:'tired', emoji:'😮‍💨' },
  khaengraeng:{ th:'แข็งแรง', rom:'khɛ̌ng-rɛɛng', fr:'en forme', en:'strong, healthy', emoji:'💪' },

  /* — vêtements — */
  suea:{ th:'เสื้อ', rom:'sʉ̂a', fr:'chemise / haut', en:'shirt / top', emoji:'👕' },
  kangkeng:{ th:'กางเกง', rom:'kaang-keeng', fr:'pantalon', en:'trousers', emoji:'👖' },
  krapong:{ th:'กระโปรง', rom:'krà-proong', fr:'jupe', en:'skirt', emoji:'👗' },
  rongthao:{ th:'รองเท้า', rom:'rɔɔng-tháao', fr:'chaussures', en:'shoes', emoji:'👟' },
  muak:{ th:'หมวก', rom:'mùak', fr:'chapeau', en:'hat', emoji:'🧢' },
  waen:{ th:'แว่นตา', rom:'wɛ̂n-taa', fr:'lunettes', en:'glasses', emoji:'👓' },
  nalika:{ th:'นาฬิกา', rom:'naa-lí-kaa', fr:'montre', en:'watch', emoji:'⌚' },
  sai_wear:{ th:'ใส่', rom:'sài', fr:'porter / mettre', en:'to wear / put on', emoji:'👔' },

  /* — maison — */
  hong:{ th:'ห้อง', rom:'hɔ̂ɔng', fr:'pièce', en:'room', emoji:'🚪' },
  hongnon:{ th:'ห้องนอน', rom:'hɔ̂ɔng-nɔɔn', fr:'chambre', en:'bedroom', emoji:'🛏️' },
  hongkhrua:{ th:'ห้องครัว', rom:'hɔ̂ɔng-khrua', fr:'cuisine', en:'kitchen', emoji:'🍳' },
  tiang:{ th:'เตียง', rom:'tiang', fr:'lit', en:'bed', emoji:'🛏️' },
  natang:{ th:'หน้าต่าง', rom:'nâa-tàang', fr:'fenêtre', en:'window', emoji:'🪟' },
  fai:{ th:'ไฟ', rom:'fai', fr:'lumière / feu', en:'light / fire', emoji:'💡' },
  kunjae:{ th:'กุญแจ', rom:'kun-jɛɛ', fr:'clé', en:'key', emoji:'🔑' },
  saduak:{ th:'สะดวก', rom:'sà-dùak', fr:'pratique', en:'convenient', emoji:'👌' },
  sa_at:{ th:'สะอาด', rom:'sà-àat', fr:'propre', en:'clean', emoji:'🧼' },
  sokkaprok:{ th:'สกปรก', rom:'sòk-kà-pròk', fr:'sale', en:'dirty', emoji:'🧹' },

  /* — travail et métiers — */
  ngan:{ th:'งาน', rom:'ngaan', fr:'travail', en:'work', emoji:'💼' },
  borisat:{ th:'บริษัท', rom:'bɔɔ-rí-sàt', fr:'entreprise', en:'company', emoji:'🏢' },
  ophit:{ th:'ออฟฟิศ', rom:'ɔ́ɔp-fít', fr:'bureau', en:'office', emoji:'🏬' },
  phanakngan:{ th:'พนักงาน', rom:'phá-nák-ngaan', fr:'employé', en:'employee', emoji:'🧑‍💼' },
  chaokhong:{ th:'เจ้าของ', rom:'jâo-khɔ̌ɔng', fr:'propriétaire', en:'owner', emoji:'🔑' },
  phokhrua:{ th:'พ่อครัว', rom:'phɔ̂ɔ-khrua', fr:'cuisinier', en:'cook', emoji:'👨‍🍳' },
  khonkhaprot:{ th:'คนขับรถ', rom:'khon-khàp-rót', fr:'chauffeur', en:'driver', emoji:'🚖' },
  chaona:{ th:'ชาวนา', rom:'chaao-naa', fr:'agriculteur', en:'farmer', emoji:'👨‍🌾' },
  phayaban:{ th:'พยาบาล', rom:'phá-yaa-baan', fr:'infirmier', en:'nurse', emoji:'👩‍⚕️' },
  ngoenduean:{ th:'เงินเดือน', rom:'ngəən-dʉan', fr:'salaire', en:'salary', emoji:'💰' },
  prachum:{ th:'ประชุม', rom:'prà-chum', fr:'réunion', en:'meeting', emoji:'📋' },
  yung:{ th:'ยุ่ง', rom:'yûng', fr:'occupé', en:'busy', emoji:'🌀' },
  wang_free:{ th:'ว่าง', rom:'wâang', fr:'libre / disponible', en:'free, available', emoji:'🕳️' },

  /* — études — */
  mahawitthayalai:{ th:'มหาวิทยาลัย', rom:'má-hǎa-wít-thá-yaa-lai', fr:'université', en:'university', emoji:'🎓' },
  wicha:{ th:'วิชา', rom:'wí-chaa', fr:'matière', en:'subject', emoji:'📘' },
  kanban:{ th:'การบ้าน', rom:'kaan-bâan', fr:'devoirs', en:'homework', emoji:'📝' },
  sop:{ th:'สอบ', rom:'sɔ̀ɔp', fr:'examen', en:'exam', emoji:'🧾' },
  kham:{ th:'คำ', rom:'kham', fr:'mot', en:'word', emoji:'🔤' },
  prayok:{ th:'ประโยค', rom:'prà-yòok', fr:'phrase', en:'sentence', emoji:'📄' },
  tuaaksorn:{ th:'ตัวอักษร', rom:'tua-àk-sɔ̌ɔn', fr:'lettre (caractère)', en:'letter (character)', emoji:'🔡' },
  jamdai:{ th:'จำได้', rom:'jam-dâi', fr:'se souvenir', en:'to remember', emoji:'🧠' },
  luem:{ th:'ลืม', rom:'lʉʉm', fr:'oublier', en:'to forget', emoji:'💨' },
  tob:{ th:'ตอบ', rom:'tɔ̀ɔp', fr:'répondre', en:'to answer', emoji:'💬' },
  tham_ask:{ th:'ถาม', rom:'thǎam', fr:'demander', en:'to ask', emoji:'🙋' },

  /* — météo et saisons — */
  akat:{ th:'อากาศ', rom:'aa-kàat', fr:'temps (météo)', en:'weather', emoji:'🌤️' },
  fon:{ th:'ฝน', rom:'fǒn', fr:'pluie', en:'rain', emoji:'🌧️' },
  daet:{ th:'แดด', rom:'dɛ̀ɛt', fr:'soleil (lumière)', en:'sunshine', emoji:'☀️' },
  lom:{ th:'ลม', rom:'lom', fr:'vent', en:'wind', emoji:'💨' },
  mek:{ th:'เมฆ', rom:'mêek', fr:'nuage', en:'cloud', emoji:'☁️' },
  ruedu:{ th:'ฤดู', rom:'rʉ́-duu', fr:'saison', en:'season', emoji:'🍂' },
  raton:{ th:'ร้อนอบอ้าว', rom:'rɔ́ɔn-òp-âao', fr:'étouffant', en:'sweltering', emoji:'🥵' },
  chuen:{ th:'ชื้น', rom:'chʉ́ʉn', fr:'humide', en:'humid', emoji:'💦' },

  /* — loisirs — */
  kila:{ th:'กีฬา', rom:'kii-laa', fr:'sport', en:'sport', emoji:'⚽' },
  wainam:{ th:'ว่ายน้ำ', rom:'wâai-náam', fr:'nager', en:'to swim', emoji:'🏊' },
  tenram:{ th:'เต้นรำ', rom:'tên-ram', fr:'danser', en:'to dance', emoji:'💃' },
  rongphleng:{ th:'ร้องเพลง', rom:'rɔ́ɔng-phleeng', fr:'chanter', en:'to sing', emoji:'🎤' },
  phleng:{ th:'เพลง', rom:'phleeng', fr:'chanson', en:'song', emoji:'🎵' },
  nang_film:{ th:'หนัง', rom:'nǎng', fr:'film', en:'movie', emoji:'🎬' },
  len:{ th:'เล่น', rom:'lên', fr:'jouer', en:'to play', emoji:'🎮' },
  thiao:{ th:'เที่ยว', rom:'thîao', fr:'se balader / voyager', en:'to go out, travel', emoji:'🧳' },
  thairup:{ th:'ถ่ายรูป', rom:'thàai-rûup', fr:'prendre une photo', en:'to take a photo', emoji:'📷' },
  phakphon:{ th:'พักผ่อน', rom:'phák-phɔ̀n', fr:'se reposer', en:'to rest', emoji:'🛋️' },

  /* — sentiments — */
  diijai:{ th:'ดีใจ', rom:'dii-jai', fr:'content', en:'glad', emoji:'😄' },
  siajai:{ th:'เสียใจ', rom:'sǐa-jai', fr:'triste', en:'sad', emoji:'😢' },
  krot:{ th:'โกรธ', rom:'kròot', fr:'en colère', en:'angry', emoji:'😠' },
  klua:{ th:'กลัว', rom:'klua', fr:'avoir peur', en:'afraid', emoji:'😨' },
  tuenten:{ th:'ตื่นเต้น', rom:'tʉ̀ʉn-tên', fr:'excité', en:'excited', emoji:'🤩' },
  bua:{ th:'เบื่อ', rom:'bʉ̀a', fr:'s’ennuyer', en:'bored', emoji:'😑' },
  sanuk:{ th:'สนุก', rom:'sà-nùk', fr:'amusant', en:'fun', emoji:'🎉' },
  sabai:{ th:'สบาย', rom:'sà-baai', fr:'à l’aise', en:'comfortable', emoji:'😌' },

  /* — aspect et temps grammatical — */
  laeo:{ th:'แล้ว', rom:'lɛ́ɛo', fr:'déjà (accompli)', en:'already (done)', emoji:'✔️' },
  ja:{ th:'จะ', rom:'jà', fr:'(futur)', en:'(future marker)', emoji:'⏩' },
  kamlang:{ th:'กำลัง', rom:'kam-lang', fr:'(en train de)', en:'(in progress)', emoji:'🔄' },
  khoei:{ th:'เคย', rom:'khəəi', fr:'avoir déjà fait', en:'to have ever done', emoji:'📜' },
  yang:{ th:'ยัง', rom:'yang', fr:'encore / pas encore', en:'still / not yet', emoji:'⏳' },
  dai_can:{ th:'ได้', rom:'dâi', fr:'pouvoir / réussir', en:'can / to manage', emoji:'✅' },
  tong:{ th:'ต้อง', rom:'tɔ̂ng', fr:'devoir', en:'must', emoji:'❗' },
  khuan:{ th:'ควร', rom:'khuan', fr:'il faudrait', en:'should', emoji:'💡' },
  amat:{ th:'อาจ', rom:'àat', fr:'peut-être', en:'may, might', emoji:'🤷' },

  /* — comparaisons et quantités — */
  kwa:{ th:'กว่า', rom:'kwàa', fr:'plus que', en:'more than', emoji:'➕' },
  thisut:{ th:'ที่สุด', rom:'thîi-sùt', fr:'le plus', en:'the most', emoji:'🏆' },
  muean:{ th:'เหมือน', rom:'mʉ̌an', fr:'comme / pareil', en:'like, same as', emoji:'🟰' },
  tangkan:{ th:'ต่างกัน', rom:'tàang-kan', fr:'différent', en:'different', emoji:'🔀' },
  thuknai:{ th:'ทุก', rom:'thúk', fr:'chaque', en:'every', emoji:'🔁' },
  bang:{ th:'บาง', rom:'baang', fr:'certains', en:'some', emoji:'🔸' },
  mot:{ th:'หมด', rom:'mòt', fr:'épuisé / tout', en:'all gone', emoji:'🚫' },
  luea:{ th:'เหลือ', rom:'lʉ̌a', fr:'rester (il reste)', en:'to be left', emoji:'🍽️' },
  ik:{ th:'อีก', rom:'ìik', fr:'encore / de plus', en:'more, again', emoji:'➕' },
  duai:{ th:'ด้วย', rom:'dûai', fr:'aussi / avec', en:'too, with', emoji:'🤝' },

  /* — rendez-vous et téléphone — */
  that:{ th:'นัด', rom:'nát', fr:'rendez-vous', en:'appointment', emoji:'📅' },
  tho:{ th:'โทร', rom:'thoo', fr:'téléphoner', en:'to call', emoji:'📞' },
  khokhwam:{ th:'ข้อความ', rom:'khɔ̂ɔ-khwaam', fr:'message', en:'message', emoji:'✉️' },
  ropkuan:{ th:'รบกวน', rom:'róp-kuan', fr:'déranger', en:'to bother', emoji:'🙇' },
  sadaeng:{ th:'สาย', rom:'sǎai', fr:'en retard', en:'late', emoji:'⏰' },
  chao_early:{ th:'เช้า', rom:'cháao', fr:'tôt / matin', en:'early, morning', emoji:'🌅' },
  thanthi:{ th:'ทันที', rom:'than-thii', fr:'tout de suite', en:'right away', emoji:'⚡' },

  /* — voyage — */
  tuadoen:{ th:'ตั๋ว', rom:'tǔa', fr:'billet', en:'ticket', emoji:'🎫' },
  krapao_doen:{ th:'กระเป๋าเดินทาง', rom:'krà-pǎo-dəən-thaang', fr:'valise', en:'suitcase', emoji:'🧳' },
  nangsuedoenthang:{ th:'หนังสือเดินทาง', rom:'nǎng-sʉ̌ʉ-dəən-thaang', fr:'passeport', en:'passport', emoji:'🛂' },
  chaihat:{ th:'ชายหาด', rom:'chaai-hàat', fr:'plage', en:'beach', emoji:'🏖️' },
  phukhao:{ th:'ภูเขา', rom:'phuu-khǎo', fr:'montagne', en:'mountain', emoji:'⛰️' },
  thale:{ th:'ทะเล', rom:'thá-lee', fr:'mer', en:'sea', emoji:'🌊' },
  wat:{ th:'วัด', rom:'wát', fr:'temple', en:'temple', emoji:'🛕' },
  mueang:{ th:'เมือง', rom:'mʉang', fr:'ville', en:'city', emoji:'🏙️' },
  changwat:{ th:'จังหวัด', rom:'jang-wàt', fr:'province', en:'province', emoji:'🗾' },
  prathet:{ th:'ประเทศ', rom:'prà-thêet', fr:'pays', en:'country', emoji:'🌍' },
  jong:{ th:'จอง', rom:'jɔɔng', fr:'réserver', en:'to book', emoji:'📖' },
  phak_stay:{ th:'พัก', rom:'phák', fr:'séjourner', en:'to stay', emoji:'🏨' },

  /* — petits mots de liaison, très fréquents — */
  ha_seek:{ th:'หา', rom:'hǎa', fr:'chercher / voir (qqn)', en:'to look for, to see (sb)', emoji:'🔍' },
  khu:{ th:'คู่', rom:'khûu', fr:'paire', en:'pair', emoji:'👟' },
  khong:{ th:'ของ', rom:'khɔ̌ɔng', fr:'de (appartenance)', en:'of (belonging)', emoji:'🔗' },
  tok:{ th:'ตก', rom:'tòk', fr:'tomber', en:'to fall', emoji:'⬇️' },
  kan:{ th:'กัน', rom:'kan', fr:'ensemble / l’un l’autre', en:'together, each other', emoji:'🤝' },
  hai_lost:{ th:'หาย', rom:'hǎai', fr:'disparaître / être perdu', en:'to disappear, be lost', emoji:'🫥' },
  kap:{ th:'กับ', rom:'kàp', fr:'avec', en:'with', emoji:'➕' },
  phro:{ th:'เพราะ', rom:'phrɔ́', fr:'parce que', en:'because', emoji:'➡️' },
  tha_if:{ th:'ถ้า', rom:'thâa', fr:'si', en:'if', emoji:'🔀' },
  tae:{ th:'แต่', rom:'tɛ̀ɛ', fr:'mais', en:'but', emoji:'↔️' },
  lae:{ th:'และ', rom:'lɛ́', fr:'et', en:'and', emoji:'➕' },
  rue:{ th:'หรือ', rom:'rʉ̌ʉ', fr:'ou', en:'or', emoji:'❔' },
  ni_this:{ th:'นี้', rom:'níi', fr:'ce / ceci', en:'this', emoji:'👈' },
  nan_that:{ th:'นั้น', rom:'nán', fr:'cela', en:'that', emoji:'👉' },
  khrang:{ th:'ครั้ง', rom:'khráng', fr:'fois', en:'time (occurrence)', emoji:'🔢' },
  chuamong:{ th:'ชั่วโมง', rom:'chûa-moong', fr:'heure (durée)', en:'hour', emoji:'⏳' }
}});

/* — phrases du palier A2 — */
ajouterPalier({ palier:'a2',
  romanisations:{ 'ไป':'pai','มา':'maa','อยู่':'yùu','ที่':'thîi','กับ':'kàp','เพราะ':'phrɔ́','ถ้า':'thâa','แต่':'tɛ̀ɛ','และ':'lɛ́','หรือ':'rʉ̌ʉ','นี้':'níi','นั้น':'nán','ครั้ง':'khráng','ชั่วโมง':'chûa-moong','สอง':'sɔ̌ɔng' },
  phrases:{
  a2_sick:{ chunks:['ผม','ป่วย','ครับ'], rom:'phǒm pùai khráp', fr:'Je suis malade', en:'I am sick' },
  a2_headache:{ chunks:['ปวด','หัว'], rom:'pùat hǔa', fr:'J’ai mal à la tête', en:'I have a headache' },
  a2_doctor:{ chunks:['ผม','ต้อง','ไป','หา','หมอ'], rom:'phǒm tɔ̂ng pai hǎa mɔ̌ɔ', fr:'Je dois aller chez le médecin', en:'I must see a doctor' },
  a2_tired:{ chunks:['วันนี้','ผม','เหนื่อย','มาก'], rom:'wan-níi phǒm nʉ̀ai mâak', fr:'Aujourd’hui je suis très fatigué', en:'I am very tired today' },
  a2_wear:{ chunks:['เขา','ใส่','เสื้อ','สีขาว'], rom:'khǎo sài sʉ̂a sǐi-khǎao', fr:'Il porte une chemise blanche', en:'He wears a white shirt' },
  a2_shoes:{ chunks:['รองเท้า','คู่','นี้','แพง'], rom:'rɔɔng-tháao khûu níi phɛɛng', fr:'Ces chaussures sont chères', en:'These shoes are expensive' },
  a2_room:{ chunks:['ห้องนอน','ของ','ผม','เล็ก'], rom:'hɔ̂ɔng-nɔɔn khɔ̌ɔng phǒm lék', fr:'Ma chambre est petite', en:'My bedroom is small' },
  a2_key:{ chunks:['กุญแจ','อยู่','ไหน'], rom:'kun-jɛɛ yùu nǎi', fr:'Où est la clé ?', en:'Where is the key?' },
  a2_work:{ chunks:['ผม','ทำงาน','ที่','บริษัท'], rom:'phǒm tham-ngaan thîi bɔɔ-rí-sàt', fr:'Je travaille dans une entreprise', en:'I work at a company' },
  a2_busy:{ chunks:['วันนี้','ผม','ยุ่ง','มาก'], rom:'wan-níi phǒm yûng mâak', fr:'Je suis très occupé aujourd’hui', en:'I am very busy today' },
  a2_free:{ chunks:['พรุ่งนี้','ผม','ว่าง'], rom:'phrûng-níi phǒm wâang', fr:'Demain je suis libre', en:'Tomorrow I am free' },
  a2_meeting:{ chunks:['เรา','มี','ประชุม','ตอนบ่าย'], rom:'rao mii prà-chum tɔɔn-bàai', fr:'Nous avons une réunion cet après-midi', en:'We have a meeting this afternoon' },
  a2_homework:{ chunks:['ผม','ทำ','การบ้าน','แล้ว'], rom:'phǒm tham kaan-bâan lɛ́ɛo', fr:'J’ai déjà fait mes devoirs', en:'I have already done my homework' },
  a2_exam:{ chunks:['พรุ่งนี้','ผม','จะ','สอบ'], rom:'phrûng-níi phǒm jà sɔ̀ɔp', fr:'Demain je vais passer un examen', en:'Tomorrow I will take an exam' },
  a2_studying:{ chunks:['ผม','กำลัง','เรียน','ภาษา','ไทย'], rom:'phǒm kam-lang rian phaa-sǎa thai', fr:'Je suis en train d’apprendre le thaï', en:'I am learning Thai right now' },
  a2_ever:{ chunks:['คุณ','เคย','ไป','เมืองไทย','ไหม'], rom:'khun khəəi pai mʉang-thai mǎi', fr:'Es-tu déjà allé en Thaïlande ?', en:'Have you ever been to Thailand?' },
  a2_notyet:{ chunks:['ผม','ยัง','ไม่','เข้าใจ'], rom:'phǒm yang mâi khâo-jai', fr:'Je ne comprends pas encore', en:'I don’t understand yet' },
  a2_forget:{ chunks:['ผม','ลืม','คำ','นี้'], rom:'phǒm lʉʉm kham níi', fr:'J’ai oublié ce mot', en:'I forgot this word' },
  a2_remember:{ chunks:['ผม','จำได้','แล้ว'], rom:'phǒm jam-dâi lɛ́ɛo', fr:'Je m’en souviens maintenant', en:'I remember now' },
  a2_rain:{ chunks:['ฝน','ตก'], rom:'fǒn tòk', fr:'Il pleut', en:'It is raining' },
  a2_weather:{ chunks:['วันนี้','อากาศ','ดี'], rom:'wan-níi aa-kàat dii', fr:'Il fait beau aujourd’hui', en:'The weather is nice today' },
  a2_swim:{ chunks:['ผม','ว่ายน้ำ','ไม่','เป็น'], rom:'phǒm wâai-náam mâi pen', fr:'Je ne sais pas nager', en:'I can’t swim' },
  a2_movie:{ chunks:['เรา','ไป','ดู','หนัง','กัน'], rom:'rao pai duu nǎng kan', fr:'Allons voir un film', en:'Let’s go watch a movie' },
  a2_song:{ chunks:['ผม','ชอบ','เพลง','นี้'], rom:'phǒm chɔ̂ɔp phleeng níi', fr:'J’aime cette chanson', en:'I like this song' },
  a2_glad:{ chunks:['ผม','ดีใจ','มาก'], rom:'phǒm dii-jai mâak', fr:'Je suis très content', en:'I am very glad' },
  a2_bored:{ chunks:['ผม','เบื่อ'], rom:'phǒm bʉ̀a', fr:'Je m’ennuie', en:'I am bored' },
  a2_fun:{ chunks:['สนุก','มาก'], rom:'sà-nùk mâak', fr:'C’était très amusant', en:'That was great fun' },
  a2_bigger:{ chunks:['บ้าน','นี้','ใหญ่','กว่า'], rom:'bâan níi yài kwàa', fr:'Cette maison est plus grande', en:'This house is bigger' },
  a2_most:{ chunks:['อาหาร','ไทย','อร่อย','ที่สุด'], rom:'aa-hǎan thai à-rɔ̀i thîi-sùt', fr:'La cuisine thaïe est la meilleure', en:'Thai food is the best' },
  a2_same:{ chunks:['เหมือน','กัน'], rom:'mʉ̌an kan', fr:'C’est pareil', en:'It’s the same' },
  a2_call:{ chunks:['ผม','จะ','โทร','หา','คุณ'], rom:'phǒm jà thoo hǎa khun', fr:'Je t’appellerai', en:'I will call you' },
  a2_late:{ chunks:['ผม','จะ','สาย','นิดหน่อย'], rom:'phǒm jà sǎai nít-nɔ̀i', fr:'Je serai un peu en retard', en:'I will be a little late' },
  a2_ticket:{ chunks:['ผม','จอง','ตั๋ว','แล้ว'], rom:'phǒm jɔɔng tǔa lɛ́ɛo', fr:'J’ai réservé le billet', en:'I have booked the ticket' },
  a2_beach:{ chunks:['เรา','ไป','ทะเล','กัน'], rom:'rao pai thá-lee kan', fr:'Allons à la mer', en:'Let’s go to the sea' },
  a2_temple:{ chunks:['วัด','นี้','สวย','มาก'], rom:'wát níi sǔai mâak', fr:'Ce temple est très beau', en:'This temple is very beautiful' },
  a2_stay:{ chunks:['ผม','พัก','ที่','โรงแรม'], rom:'phǒm phák thîi roong-rɛɛm', fr:'Je loge à l’hôtel', en:'I am staying at a hotel' },
  a2_passport:{ chunks:['หนังสือเดินทาง','ของ','ผม','หาย'], rom:'nǎng-sʉ̌ʉ-dəən-thaang khɔ̌ɔng phǒm hǎai', fr:'J’ai perdu mon passeport', en:'I have lost my passport' },
  a2_must:{ chunks:['คุณ','ต้อง','ไป','ตอนนี้'], rom:'khun tɔ̂ng pai tɔɔn-níi', fr:'Tu dois partir maintenant', en:'You must go now' },
  a2_should:{ chunks:['คุณ','ควร','พักผ่อน'], rom:'khun khuan phák-phɔ̀n', fr:'Tu devrais te reposer', en:'You should rest' },
  a2_more:{ chunks:['ขอ','อีก','หนึ่ง','ที่'], rom:'khɔ̌ɔ ìik nùeng thîi', fr:'Encore une portion, s’il vous plaît', en:'One more serving, please' },
  a2_allgone:{ chunks:['หมด','แล้ว'], rom:'mòt lɛ́ɛo', fr:'Il n’y en a plus', en:'It’s all gone' },
  a2_because:{ chunks:['ผม','ไม่','ไป','เพราะ','ฝน','ตก'], rom:'phǒm mâi pai phrɔ́ fǒn tòk', fr:'Je n’y vais pas parce qu’il pleut', en:'I’m not going because it’s raining' },
  a2_if:{ chunks:['ถ้า','ว่าง','ผม','จะ','ไป'], rom:'thâa wâang phǒm jà pai', fr:'Si je suis libre, j’irai', en:'If I’m free, I’ll go' },
  a2_but:{ chunks:['อร่อย','แต่','เผ็ด'], rom:'à-rɔ̀i tɛ̀ɛ phèt', fr:'C’est bon mais épicé', en:'It’s tasty but spicy' }
}});

/* — parcours du palier A2 — */
ajouterPalier({ palier:'a2',
  sections:[
    { id:'sec-a2', titre:{fr:'Élémentaire', en:'Elementary'},
      sousTitre:{fr:'Raconter, comparer, se projeter', en:'Telling, comparing, planning'},
      unites:['a2u1','a2u2','a2u3','a2u4','a2u5','a2u6','a2u7','a2u8','a2u9','a2u10'],
      couleur:'#1CB0F6' }
  ],
  unites:[
  { id:'a2u1', title:{fr:'Le corps', en:'The body'}, subtitle:{fr:'Se sentir bien ou mal', en:'Feeling well or unwell'},
    color:'#FF4B4B', icon:'🩺', lessons:[
    { id:'a2u1l1', title:{fr:'Le corps', en:'Body parts'}, words:['hua','ta_eye','hu','pak','mue','thao'], sentences:['a2_headache'] },
    { id:'a2u1l2', title:{fr:'Être malade', en:'Being ill'}, words:['puai','jep','puat','khaijai','nueai'], sentences:['a2_sick','a2_tired'] },
    { id:'a2u1l3', title:{fr:'Chez le médecin', en:'At the doctor’s'}, words:['mo','ya_med','phayaban','khaengraeng','thong','lang','jai'], sentences:['a2_doctor'] }
  ]},
  { id:'a2u2', title:{fr:'S’habiller', en:'Getting dressed'}, subtitle:{fr:'Vêtements et accessoires', en:'Clothes and accessories'},
    color:'#CE82FF', icon:'👕', lessons:[
    { id:'a2u2l1', title:{fr:'Vêtements', en:'Clothes'}, words:['suea','kangkeng','krapong','rongthao'], sentences:['a2_wear','a2_shoes'] },
    { id:'a2u2l2', title:{fr:'Accessoires', en:'Accessories'}, words:['muak','waen','nalika','sai_wear','khu'], sentences:['a2_wear'] }
  ]},
  { id:'a2u3', title:{fr:'À la maison', en:'At home'}, subtitle:{fr:'Les pièces et les objets', en:'Rooms and things'},
    color:'#FF9600', icon:'🏠', lessons:[
    { id:'a2u3l1', title:{fr:'Les pièces', en:'Rooms'}, words:['hong','hongnon','hongkhrua','natang','pratu'], sentences:['a2_room'] },
    { id:'a2u3l2', title:{fr:'Objets', en:'Objects'}, words:['tiang','fai','kunjae','khong'], sentences:['a2_key'] },
    { id:'a2u3l3', title:{fr:'C’est comment ?', en:'What’s it like?'}, words:['sa_at','sokkaprok','saduak','sabai'], sentences:['a2_room'] }
  ]},
  { id:'a2u4', title:{fr:'Le travail', en:'Work'}, subtitle:{fr:'Métiers et bureau', en:'Jobs and the office'},
    color:'#00CD9C', icon:'💼', lessons:[
    { id:'a2u4l1', title:{fr:'Au bureau', en:'At the office'}, words:['ngan','borisat','ophit','phanakngan','prachum'], sentences:['a2_work','a2_meeting'] },
    { id:'a2u4l2', title:{fr:'Métiers', en:'Jobs'}, words:['phokhrua','khonkhaprot','chaona','chaokhong','ngoenduean'], sentences:['a2_work'] },
    { id:'a2u4l3', title:{fr:'Occupé ou libre', en:'Busy or free'}, words:['yung','wang_free','that','ropkuan'], sentences:['a2_busy','a2_free'] },
    { id:'a2u4l4', title:{fr:'Au téléphone', en:'On the phone'}, words:['tho','khokhwam','sadaeng','ha_seek'], sentences:['a2_call','a2_late'] }
  ]},
  { id:'a2u5', title:{fr:'Étudier', en:'Studying'}, subtitle:{fr:'Apprendre une langue', en:'Learning a language'},
    color:'#A560E8', icon:'📚', lessons:[
    { id:'a2u5l1', title:{fr:'À l’école', en:'At school'}, words:['mahawitthayalai','wicha','kanban','sop'], sentences:['a2_homework','a2_exam'] },
    { id:'a2u5l2', title:{fr:'Les mots', en:'Words'}, words:['kham','prayok','tuaaksorn','tham_ask','tob'], sentences:['a2_forget'] },
    { id:'a2u5l3', title:{fr:'Mémoire', en:'Memory'}, words:['jamdai','luem','yang','khoei'], sentences:['a2_remember','a2_notyet','a2_ever'] }
  ]},
  { id:'a2u6', title:{fr:'Le temps qu’il fait', en:'Weather'}, subtitle:{fr:'Pluie, soleil, saisons', en:'Rain, sun, seasons'},
    color:'#1CB0F6', icon:'🌦️', lessons:[
    { id:'a2u6l1', title:{fr:'La météo', en:'The weather'}, words:['akat','fon','daet','lom','mek','tok'], sentences:['a2_rain','a2_weather'] },
    { id:'a2u6l2', title:{fr:'Saisons', en:'Seasons'}, words:['ruedu','raton','chuen','chao_early'], sentences:['a2_weather'] }
  ]},
  { id:'a2u7', title:{fr:'Loisirs', en:'Free time'}, subtitle:{fr:'Sport, musique, sorties', en:'Sport, music, going out'},
    color:'#FFB020', icon:'🎬', lessons:[
    { id:'a2u7l1', title:{fr:'Sport', en:'Sport'}, words:['kila','wainam','len','tenram'], sentences:['a2_swim'] },
    { id:'a2u7l2', title:{fr:'Musique et cinéma', en:'Music and film'}, words:['phleng','rongphleng','nang_film','thairup'], sentences:['a2_movie','a2_song'] },
    { id:'a2u7l3', title:{fr:'Sortir', en:'Going out'}, words:['thiao','phakphon','sanuk','kan'], sentences:['a2_fun','a2_beach'] }
  ]},
  { id:'a2u8', title:{fr:'Sentiments', en:'Feelings'}, subtitle:{fr:'Dire ce qu’on ressent', en:'Saying how you feel'},
    color:'#FF86D0', icon:'💗', lessons:[
    { id:'a2u8l1', title:{fr:'Joie et tristesse', en:'Joy and sadness'}, words:['diijai','siajai','tuenten','bua'], sentences:['a2_glad','a2_bored'] },
    { id:'a2u8l2', title:{fr:'Peur et colère', en:'Fear and anger'}, words:['krot','klua','hai_lost'], sentences:['a2_passport'] }
  ]},
  { id:'a2u9', title:{fr:'Hier et demain', en:'Yesterday and tomorrow'}, subtitle:{fr:'Marquer le temps', en:'Marking time'},
    color:'#7B61FF', icon:'⏩', lessons:[
    { id:'a2u9l1', title:{fr:'Déjà fait', en:'Already done'}, words:['laeo','khoei','yang','khrang'], sentences:['a2_homework','a2_ever','a2_allgone'] },
    { id:'a2u9l2', title:{fr:'En cours et à venir', en:'Now and later'}, words:['ja','kamlang','thanthi','chuamong'], sentences:['a2_studying','a2_exam','a2_call'] },
    { id:'a2u9l3', title:{fr:'Pouvoir et devoir', en:'Can and must'}, words:['dai_can','tong','khuan','amat'], sentences:['a2_must','a2_should'] }
  ]},
  { id:'a2u10', title:{fr:'Comparer', en:'Comparing'}, subtitle:{fr:'Plus, moins, pareil', en:'More, less, the same'},
    color:'#2CC3A5', icon:'⚖️', lessons:[
    { id:'a2u10l1', title:{fr:'Plus et moins', en:'More and less'}, words:['kwa','thisut','ik','duai'], sentences:['a2_bigger','a2_most','a2_more'] },
    { id:'a2u10l2', title:{fr:'Pareil ou différent', en:'Same or different'}, words:['muean','tangkan','thuknai','bang'], sentences:['a2_same'] },
    { id:'a2u10l3', title:{fr:'Relier les idées', en:'Linking ideas'}, words:['phro','tha_if','tae','lae','rue','kap'], sentences:['a2_because','a2_if','a2_but'] },
    { id:'a2u10l4', title:{fr:'Voyager', en:'Travelling'}, words:['tuadoen','jong','phak_stay','thale','wat','mueang','prathet'], sentences:['a2_ticket','a2_temple','a2_stay'] },
    { id:'a2u10l5', title:{fr:'Préparer le voyage', en:'Packing up'}, words:['krapao_doen','nangsuedoenthang','chaihat','phukhao','changwat'], sentences:['a2_passport','a2_beach'] },
    { id:'a2u10l6', title:{fr:'Ceci ou cela', en:'This or that'}, words:['ni_this','nan_that','mot','luea'], sentences:['a2_allgone','a2_more'] }
  ]}
  ]
});
