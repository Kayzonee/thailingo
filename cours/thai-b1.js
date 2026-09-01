/* ============================================================
   Thaï — palier B1 (Intermédiaire)
   Donner son avis, raconter, se débrouiller dans les démarches,
   et relier les idées (ว่า, ที่, เพื่อ, ถึงแม้ว่า).
   ============================================================ */
ajouterPalier({ palier:'b1', lexique:{
  /* — opinions et discussion — */
  khwamkhithen:{ th:'ความคิดเห็น', rom:'khwaam-khít-hěn', fr:'opinion', en:'opinion', emoji:'💭' },
  khit:{ th:'คิด', rom:'khít', fr:'penser', en:'to think', emoji:'🤔' },
  chuea:{ th:'เชื่อ', rom:'chʉ̂a', fr:'croire', en:'to believe', emoji:'🙏' },
  hen_duai:{ th:'เห็นด้วย', rom:'hěn-dûai', fr:'être d’accord', en:'to agree', emoji:'🤝' },
  khatkhan:{ th:'คัดค้าน', rom:'khát-kháan', fr:'s’opposer', en:'to object', emoji:'✋' },
  athibai:{ th:'อธิบาย', rom:'à-thí-baai', fr:'expliquer', en:'to explain', emoji:'📖' },
  yokwang:{ th:'ยกตัวอย่าง', rom:'yók-tua-yàang', fr:'donner un exemple', en:'to give an example', emoji:'📌' },
  hetphon:{ th:'เหตุผล', rom:'hèet-phǒn', fr:'raison', en:'reason', emoji:'🧩' },
  panha:{ th:'ปัญหา', rom:'pan-hǎa', fr:'problème', en:'problem', emoji:'⚠️' },
  witthi:{ th:'วิธี', rom:'wí-thii', fr:'méthode / façon', en:'way, method', emoji:'🛠️' },
  kaekhai:{ th:'แก้ไข', rom:'kɛ̂ɛ-khǎi', fr:'corriger, résoudre', en:'to fix, solve', emoji:'🔧' },
  tatsinjai:{ th:'ตัดสินใจ', rom:'tàt-sǐn-jai', fr:'décider', en:'to decide', emoji:'⚖️' },
  nae_nae:{ th:'แน่นอน', rom:'nɛ̂ɛ-nɔɔn', fr:'certainement', en:'certainly', emoji:'✔️' },
  bang_thi:{ th:'บางที', rom:'baang-thii', fr:'peut-être', en:'perhaps', emoji:'🎲' },
  khong_ja:{ th:'คงจะ', rom:'khong-jà', fr:'sans doute', en:'probably', emoji:'📊' },

  /* — raconter — */
  rueang:{ th:'เรื่อง', rom:'rʉ̂ang', fr:'histoire / sujet', en:'story, matter', emoji:'📚' },
  lao:{ th:'เล่า', rom:'lâo', fr:'raconter', en:'to tell', emoji:'🗣️' },
  koetkhuen:{ th:'เกิดขึ้น', rom:'kə̀ət-khʉ̂n', fr:'se produire', en:'to happen', emoji:'💥' },
  ton_raek:{ th:'ตอนแรก', rom:'tɔɔn-rɛ̂ɛk', fr:'au début', en:'at first', emoji:'1️⃣' },
  lang_jak:{ th:'หลังจาก', rom:'lǎng-jàak', fr:'après', en:'after', emoji:'⏭️' },
  kon_na:{ th:'ก่อน', rom:'kɔ̀ɔn', fr:'avant', en:'before', emoji:'⏮️' },
  nai_thisut:{ th:'ในที่สุด', rom:'nai-thîi-sùt', fr:'finalement', en:'in the end', emoji:'🏁' },
  thanthi_dai:{ th:'ทันใด', rom:'than-dai', fr:'soudain', en:'suddenly', emoji:'⚡' },
  jam:{ th:'จำ', rom:'jam', fr:'retenir', en:'to memorise', emoji:'🧠' },
  khaochai_phit:{ th:'เข้าใจผิด', rom:'khâo-jai-phìt', fr:'mal comprendre', en:'to misunderstand', emoji:'🌀' },

  /* — démarches, argent, services — */
  thanakhan:{ th:'ธนาคาร', rom:'thá-naa-khaan', fr:'banque', en:'bank', emoji:'🏦' },
  banchi:{ th:'บัญชี', rom:'ban-chii', fr:'compte', en:'account', emoji:'📒' },
  bat:{ th:'บัตร', rom:'bàt', fr:'carte', en:'card', emoji:'💳' },
  ratkha:{ th:'ราคา', rom:'raa-khaa', fr:'prix', en:'price', emoji:'🏷️' },
  suanlot:{ th:'ส่วนลด', rom:'sùan-lót', fr:'remise', en:'discount', emoji:'🔖' },
  bai_set:{ th:'ใบเสร็จ', rom:'bai-sèt', fr:'reçu', en:'receipt', emoji:'🧾' },
  ekkasan:{ th:'เอกสาร', rom:'èek-kà-sǎan', fr:'document', en:'document', emoji:'📄' },
  langsue:{ th:'ลายเซ็น', rom:'laai-sen', fr:'signature', en:'signature', emoji:'✒️' },
  torakan:{ th:'ติดต่อ', rom:'tìt-tɔ̀ɔ', fr:'contacter', en:'to contact', emoji:'📬' },
  praisani:{ th:'ไปรษณีย์', rom:'prai-sà-nii', fr:'poste', en:'post office', emoji:'📮' },
  song_send:{ th:'ส่ง', rom:'sòng', fr:'envoyer', en:'to send', emoji:'📤' },
  rap:{ th:'รับ', rom:'ráp', fr:'recevoir', en:'to receive', emoji:'📥' },
  jai_pay:{ th:'จ่าย', rom:'jàai', fr:'payer', en:'to pay', emoji:'💸' },
  khue_ngoen:{ th:'คืนเงิน', rom:'khʉʉn-ngəən', fr:'rembourser', en:'to refund', emoji:'↩️' },

  /* — technologie — */
  khomphiuter:{ th:'คอมพิวเตอร์', rom:'khɔɔm-phíu-tə̂ə', fr:'ordinateur', en:'computer', emoji:'💻' },
  internet:{ th:'อินเทอร์เน็ต', rom:'in-thəə-nét', fr:'internet', en:'internet', emoji:'🌐' },
  aeplikhechan:{ th:'แอป', rom:'ɛ́p', fr:'application', en:'app', emoji:'📲' },
  khomun:{ th:'ข้อมูล', rom:'khɔ̂ɔ-muun', fr:'données / informations', en:'data, information', emoji:'🗂️' },
  rahat:{ th:'รหัสผ่าน', rom:'rá-hàt-phàan', fr:'mot de passe', en:'password', emoji:'🔒' },
  khonha:{ th:'ค้นหา', rom:'khón-hǎa', fr:'rechercher', en:'to search', emoji:'🔎' },
  daorot:{ th:'ดาวน์โหลด', rom:'daao-lòot', fr:'télécharger', en:'to download', emoji:'⬇️' },
  ban_thuek:{ th:'บันทึก', rom:'ban-thʉ́k', fr:'enregistrer', en:'to save, record', emoji:'💾' },

  /* — société et relations — */
  sangkhom:{ th:'สังคม', rom:'sǎng-khom', fr:'société', en:'society', emoji:'🏛️' },
  wathanatham:{ th:'วัฒนธรรม', rom:'wát-thá-ná-tham', fr:'culture', en:'culture', emoji:'🎎' },
  prapheni:{ th:'ประเพณี', rom:'prà-phee-nii', fr:'tradition', en:'tradition', emoji:'🎏' },
  sasana:{ th:'ศาสนา', rom:'sàat-sà-nǎa', fr:'religion', en:'religion', emoji:'🛐' },
  ratthaban:{ th:'รัฐบาล', rom:'rát-thà-baan', fr:'gouvernement', en:'government', emoji:'🏛️' },
  kotmai:{ th:'กฎหมาย', rom:'kòt-mǎai', fr:'loi', en:'law', emoji:'⚖️' },
  sitthi:{ th:'สิทธิ', rom:'sìt-thí', fr:'droit', en:'right (entitlement)', emoji:'📜' },
  chuailuea:{ th:'ช่วยเหลือ', rom:'chûai-lʉ̌a', fr:'porter secours', en:'to assist', emoji:'🤲' },
  khopkhun_jing:{ th:'ซึ้งใจ', rom:'sʉ́ng-jai', fr:'touché, reconnaissant', en:'moved, grateful', emoji:'🥹' },
  wai_respect:{ th:'ไหว้', rom:'wâai', fr:'saluer (wai)', en:'to wai (greet)', emoji:'🙏' },
  suphap:{ th:'สุภาพ', rom:'sù-phâap', fr:'poli', en:'polite', emoji:'🎩' },
  kreng_jai:{ th:'เกรงใจ', rom:'kreeng-jai', fr:'ne pas vouloir déranger', en:'considerate reluctance', emoji:'😌' },

  /* — nature et environnement — */
  thammachat:{ th:'ธรรมชาติ', rom:'tham-má-châat', fr:'nature', en:'nature', emoji:'🌿' },
  ton_mai:{ th:'ต้นไม้', rom:'tôn-máai', fr:'arbre', en:'tree', emoji:'🌳' },
  dokmai:{ th:'ดอกไม้', rom:'dɔ̀ɔk-máai', fr:'fleur', en:'flower', emoji:'🌺' },
  maenam:{ th:'แม่น้ำ', rom:'mɛ̂ɛ-náam', fr:'rivière', en:'river', emoji:'🏞️' },
  pa:{ th:'ป่า', rom:'pàa', fr:'forêt', en:'forest', emoji:'🌲' },
  satliang:{ th:'สัตว์', rom:'sàt', fr:'animal', en:'animal', emoji:'🐾' },
  singwaetlom:{ th:'สิ่งแวดล้อม', rom:'sìng-wɛ̂ɛt-lɔ́ɔm', fr:'environnement', en:'environment', emoji:'♻️' },
  malaphit:{ th:'มลพิษ', rom:'mon-lá-phít', fr:'pollution', en:'pollution', emoji:'🏭' },
  raksa:{ th:'รักษา', rom:'rák-sǎa', fr:'préserver / soigner', en:'to preserve, treat', emoji:'🛡️' },

  /* — cuisine et marché approfondis — */
  tham_ahan:{ th:'ทำอาหาร', rom:'tham-aa-hǎan', fr:'cuisiner', en:'to cook', emoji:'🍳' },
  suan_phasom:{ th:'ส่วนผสม', rom:'sùan-phà-sǒm', fr:'ingrédient', en:'ingredient', emoji:'🥄' },
  tom:{ th:'ต้ม', rom:'tôm', fr:'bouillir', en:'to boil', emoji:'🍲' },
  phat:{ th:'ผัด', rom:'phàt', fr:'faire sauter', en:'to stir-fry', emoji:'🍳' },
  thot:{ th:'ทอด', rom:'thɔ̂ɔt', fr:'frire', en:'to fry', emoji:'🍤' },
  ping:{ th:'ปิ้ง', rom:'pîng', fr:'griller', en:'to grill', emoji:'🔥' },
  han:{ th:'หั่น', rom:'hàn', fr:'couper', en:'to slice', emoji:'🔪' },
  chim:{ th:'ชิม', rom:'chim', fr:'goûter', en:'to taste', emoji:'👅' },
  jaan:{ th:'จาน', rom:'jaan', fr:'assiette', en:'plate', emoji:'🍽️' },
  chon:{ th:'ช้อน', rom:'chɔ́ɔn', fr:'cuillère', en:'spoon', emoji:'🥄' },
  som:{ th:'ส้อม', rom:'sɔ̂ɔm', fr:'fourchette', en:'fork', emoji:'🍴' },
  takiap:{ th:'ตะเกียบ', rom:'tà-kìap', fr:'baguettes', en:'chopsticks', emoji:'🥢' },

  /* — santé approfondie — */
  rokphai:{ th:'โรค', rom:'rôok', fr:'maladie', en:'disease', emoji:'🦠' },
  attrai:{ th:'อันตราย', rom:'an-tà-raai', fr:'dangereux', en:'dangerous', emoji:'☠️' },
  plotphai:{ th:'ปลอดภัย', rom:'plɔ̀ɔt-phai', fr:'en sécurité', en:'safe', emoji:'🛟' },
  chak:{ th:'ฉีด', rom:'chìit', fr:'injecter / vacciner', en:'to inject', emoji:'💉' },
  truat:{ th:'ตรวจ', rom:'trùat', fr:'examiner, vérifier', en:'to check, examine', emoji:'🔬' },
  hai_kamlang:{ th:'พักฟื้น', rom:'phák-fʉ́ʉn', fr:'convalescence', en:'to recover', emoji:'🛌' },
  ubattihet:{ th:'อุบัติเหตุ', rom:'ù-bàt-tì-hèet', fr:'accident', en:'accident', emoji:'🚑' },

  /* — liens logiques et subordination — */
  wa:{ th:'ว่า', rom:'wâa', fr:'que (dire que…)', en:'that (say that…)', emoji:'💬' },
  thi_rel:{ th:'ที่', rom:'thîi', fr:'qui / que (relatif)', en:'that, which', emoji:'🔗' },
  phuea:{ th:'เพื่อ', rom:'phʉ̂a', fr:'pour, afin de', en:'in order to', emoji:'🎯' },
  doi:{ th:'โดย', rom:'dooi', fr:'par, au moyen de', en:'by, through', emoji:'🛤️' },
  thueng_maewa:{ th:'ถึงแม้ว่า', rom:'thʉ̌ng-mɛ́ɛ-wâa', fr:'bien que', en:'although', emoji:'🔄' },
  danglan:{ th:'ดังนั้น', rom:'dang-nán', fr:'donc', en:'therefore', emoji:'➡️' },
  nokjak:{ th:'นอกจาก', rom:'nɔ̂ɔk-jàak', fr:'en dehors de', en:'apart from', emoji:'➖' },
  raweang:{ th:'ระหว่าง', rom:'rá-wàang', fr:'pendant, entre', en:'during, between', emoji:'↔️' },
  jonkrathang:{ th:'จนกระทั่ง', rom:'jon-krà-thâng', fr:'jusqu’à ce que', en:'until', emoji:'⏱️' },
  thammai_mai:{ th:'ทำไมถึง', rom:'tham-mai-thʉ̌ng', fr:'pourquoi donc', en:'why exactly', emoji:'❔' },
  yangrai_kotam:{ th:'อย่างไรก็ตาม', rom:'yàang-rai-kɔ̂ɔ-taam', fr:'quoi qu’il en soit', en:'in any case', emoji:'🌀' },

  /* — qualificatifs plus fins — */
  samkhan:{ th:'สำคัญ', rom:'sǎm-khan', fr:'important', en:'important', emoji:'⭐' },
  ngai:{ th:'ง่าย', rom:'ngâai', fr:'facile', en:'easy', emoji:'🟢' },
  yak_hard:{ th:'ยาก', rom:'yâak', fr:'difficile', en:'difficult', emoji:'🔴' },
  narak:{ th:'น่ารัก', rom:'nâa-rák', fr:'mignon', en:'cute', emoji:'🐣' },
  nasonjai:{ th:'น่าสนใจ', rom:'nâa-sǒn-jai', fr:'intéressant', en:'interesting', emoji:'🔍' },
  chalat:{ th:'ฉลาด', rom:'chà-làat', fr:'intelligent', en:'clever', emoji:'🧠' },
  khayan:{ th:'ขยัน', rom:'khà-yǎn', fr:'travailleur', en:'hard-working', emoji:'🐝' },
  khiikiat:{ th:'ขี้เกียจ', rom:'khîi-kìat', fr:'paresseux', en:'lazy', emoji:'🦥' },
  jing:{ th:'จริง', rom:'jing', fr:'vrai', en:'true', emoji:'✔️' },
  plom:{ th:'ปลอม', rom:'plɔɔm', fr:'faux, contrefait', en:'fake', emoji:'❌' },
  sanit:{ th:'สนิท', rom:'sà-nìt', fr:'proche (ami)', en:'close (friend)', emoji:'👬' },

  /* — verbes et mots-outils très courants — */
  bok:{ th:'บอก', rom:'bɔ̀ɔk', fr:'dire, annoncer', en:'to tell', emoji:'📢' },
  keng:{ th:'เก่ง', rom:'kèng', fr:'doué', en:'skilled', emoji:'🏅' },
  ko:{ th:'ก็', rom:'kɔ̂ɔ', fr:'alors, eh bien', en:'then, well', emoji:'➡️' },
  poet:{ th:'เปิด', rom:'pə̀ət', fr:'ouvrir', en:'to open', emoji:'🔓' },
  pit:{ th:'ปิด', rom:'pìt', fr:'fermer', en:'to close', emoji:'🔒' },
  thi_ni:{ th:'ที่นี่', rom:'thîi-nîi', fr:'ici', en:'here', emoji:'📍' },
  sonjai:{ th:'สนใจ', rom:'sǒn-jai', fr:'s’intéresser à', en:'to be interested in', emoji:'👀' },
  bang_some:{ th:'บ้าง', rom:'bâang', fr:'quelques-uns, un peu', en:'some, any', emoji:'🔹' },
  thaang:{ th:'ทาง', rom:'thaang', fr:'chemin, voie', en:'way, path', emoji:'🛤️' },
  hen_see:{ th:'เห็น', rom:'hěn', fr:'voir', en:'to see', emoji:'👁️' },
  yut:{ th:'หยุด', rom:'yùt', fr:'s’arrêter', en:'to stop', emoji:'🛑' },
  riaproi:{ th:'เรียบร้อย', rom:'rîap-rɔ́ɔi', fr:'en ordre, comme il faut', en:'tidy, all set', emoji:'✨' }
}});

/* — phrases du palier B1 — */
ajouterPalier({ palier:'b1',
  romanisations:{ 'ผู้':'phûu','ฉัน':'chǎn','ไหม':'mǎi','นะ':'ná','เลย':'ləəi','อยาก':'yàak','มาก':'mâak','นี่':'nîi' },
  phrases:{
  b1_think:{ chunks:['ผม','คิด','ว่า','อาหาร','ไทย','อร่อย'], rom:'phǒm khít wâa aa-hǎan thai à-rɔ̀i', fr:'Je pense que la cuisine thaïe est bonne', en:'I think Thai food is good' },
  b1_agree:{ chunks:['ผม','เห็นด้วย','กับ','คุณ'], rom:'phǒm hěn-dûai kàp khun', fr:'Je suis d’accord avec toi', en:'I agree with you' },
  b1_explain:{ chunks:['ช่วย','อธิบาย','อีก','ครั้ง'], rom:'chûai à-thí-baai ìik khráng', fr:'Explique encore une fois', en:'Please explain once more' },
  b1_problem:{ chunks:['เรา','มี','ปัญหา','นิดหน่อย'], rom:'rao mii pan-hǎa nít-nɔ̀i', fr:'Nous avons un petit problème', en:'We have a small problem' },
  b1_decide:{ chunks:['ผม','ตัดสินใจ','แล้ว'], rom:'phǒm tàt-sǐn-jai lɛ́ɛo', fr:'J’ai pris ma décision', en:'I have made my decision' },
  b1_because_that:{ chunks:['เขา','บอก','ว่า','เขา','ยุ่ง'], rom:'khǎo bɔ̀ɔk wâa khǎo yûng', fr:'Il dit qu’il est occupé', en:'He says he is busy' },
  b1_which:{ chunks:['คน','ที่','พูด','ไทย','เก่ง'], rom:'khon thîi phûut thai kèng', fr:'La personne qui parle bien thaï', en:'The person who speaks Thai well' },
  b1_inorder:{ chunks:['ผม','เรียน','เพื่อ','ทำงาน','ที่','เมืองไทย'], rom:'phǒm rian phʉ̂a tham-ngaan thîi mʉang-thai', fr:'J’étudie pour travailler en Thaïlande', en:'I study in order to work in Thailand' },
  b1_although:{ chunks:['ถึงแม้ว่า','ฝน','ตก','ผม','ก็','ไป'], rom:'thʉ̌ng-mɛ́ɛ-wâa fǒn tòk phǒm kɔ̂ɔ pai', fr:'Bien qu’il pleuve, j’y vais', en:'Although it rains, I am going' },
  b1_therefore:{ chunks:['ผม','เหนื่อย','ดังนั้น','ผม','จะ','นอน'], rom:'phǒm nʉ̀ai dang-nán phǒm jà nɔɔn', fr:'Je suis fatigué, donc je vais dormir', en:'I am tired, so I will sleep' },
  b1_story:{ chunks:['ผม','จะ','เล่า','เรื่อง','นี้'], rom:'phǒm jà lâo rʉ̂ang níi', fr:'Je vais raconter cette histoire', en:'I will tell this story' },
  b1_after:{ chunks:['หลังจาก','กิน','ข้าว','เรา','ไป','เที่ยว'], rom:'lǎng-jàak kin khâao rao pai thîao', fr:'Après avoir mangé, nous sommes sortis', en:'After eating, we went out' },
  b1_finally:{ chunks:['ในที่สุด','เรา','ก็','เข้าใจ'], rom:'nai-thîi-sùt rao kɔ̂ɔ khâo-jai', fr:'Finalement, nous avons compris', en:'In the end, we understood' },
  b1_bank:{ chunks:['ผม','อยาก','เปิด','บัญชี','ธนาคาร'], rom:'phǒm yàak pə̀ət ban-chii thá-naa-khaan', fr:'Je voudrais ouvrir un compte en banque', en:'I would like to open a bank account' },
  b1_pay:{ chunks:['ผม','จ่าย','ด้วย','บัตร','ได้','ไหม'], rom:'phǒm jàai dûai bàt dâi mǎi', fr:'Puis-je payer par carte ?', en:'Can I pay by card?' },
  b1_receipt:{ chunks:['ขอ','ใบเสร็จ','ด้วย','ครับ'], rom:'khɔ̌ɔ bai-sèt dûai khráp', fr:'Le reçu, s’il vous plaît', en:'The receipt, please' },
  b1_send:{ chunks:['ผม','ต้อง','ส่ง','เอกสาร','วันนี้'], rom:'phǒm tɔ̂ng sòng èek-kà-sǎan wan-níi', fr:'Je dois envoyer les documents aujourd’hui', en:'I must send the documents today' },
  b1_password:{ chunks:['ผม','ลืม','รหัสผ่าน'], rom:'phǒm lʉʉm rá-hàt-phàan', fr:'J’ai oublié le mot de passe', en:'I forgot the password' },
  b1_internet:{ chunks:['ที่นี่','มี','อินเทอร์เน็ต','ไหม'], rom:'thîi-nîi mii in-thəə-nét mǎi', fr:'Y a-t-il internet ici ?', en:'Is there internet here?' },
  b1_culture:{ chunks:['ผม','สนใจ','วัฒนธรรม','ไทย'], rom:'phǒm sǒn-jai wát-thá-ná-tham thai', fr:'La culture thaïe m’intéresse', en:'I am interested in Thai culture' },
  b1_tradition:{ chunks:['นี่','เป็น','ประเพณี','เก่า'], rom:'nîi pen prà-phee-nii kào', fr:'C’est une vieille tradition', en:'This is an old tradition' },
  b1_polite:{ chunks:['คน','ไทย','สุภาพ','มาก'], rom:'khon thai sù-phâap mâak', fr:'Les Thaïlandais sont très polis', en:'Thai people are very polite' },
  b1_cook:{ chunks:['ผม','ทำอาหาร','ไทย','เป็น'], rom:'phǒm tham-aa-hǎan thai pen', fr:'Je sais cuisiner thaï', en:'I know how to cook Thai food' },
  b1_taste:{ chunks:['ช่วย','ชิม','หน่อย'], rom:'chûai chim nɔ̀i', fr:'Goûte, s’il te plaît', en:'Please taste it' },
  b1_ingredient:{ chunks:['ส่วนผสม','มี','อะไร','บ้าง'], rom:'sùan-phà-sǒm mii à-rai bâang', fr:'Quels sont les ingrédients ?', en:'What are the ingredients?' },
  b1_nature:{ chunks:['ผม','ชอบ','ธรรมชาติ','มาก'], rom:'phǒm chɔ̂ɔp tham-má-châat mâak', fr:'J’aime beaucoup la nature', en:'I love nature' },
  b1_pollution:{ chunks:['มลพิษ','เป็น','ปัญหา','ใหญ่'], rom:'mon-lá-phít pen pan-hǎa yài', fr:'La pollution est un gros problème', en:'Pollution is a big problem' },
  b1_dangerous:{ chunks:['ที่นี่','อันตราย','นะ'], rom:'thîi-nîi an-tà-raai ná', fr:'C’est dangereux ici', en:'It is dangerous here' },
  b1_safe:{ chunks:['ตอนนี้','ปลอดภัย','แล้ว'], rom:'tɔɔn-níi plɔ̀ɔt-phai lɛ́ɛo', fr:'C’est sûr maintenant', en:'It is safe now' },
  b1_accident:{ chunks:['มี','อุบัติเหตุ','ที่','ถนน'], rom:'mii ù-bàt-tì-hèet thîi thà-nǒn', fr:'Il y a eu un accident dans la rue', en:'There was an accident in the street' },
  b1_important:{ chunks:['เรื่อง','นี้','สำคัญ','มาก'], rom:'rʉ̂ang níi sǎm-khan mâak', fr:'Cette affaire est très importante', en:'This matter is very important' },
  b1_difficult:{ chunks:['ภาษา','ไทย','ยาก','แต่','สนุก'], rom:'phaa-sǎa thai yâak tɛ̀ɛ sà-nùk', fr:'Le thaï est difficile mais amusant', en:'Thai is hard but fun' },
  b1_interesting:{ chunks:['หนังสือ','เล่ม','นี้','น่าสนใจ'], rom:'nǎng-sʉ̌ʉ lêm níi nâa-sǒn-jai', fr:'Ce livre est intéressant', en:'This book is interesting' },
  b1_close_friend:{ chunks:['เรา','สนิท','กัน','มาก'], rom:'rao sà-nìt kan mâak', fr:'Nous sommes très proches', en:'We are very close' },
  b1_during:{ chunks:['ระหว่าง','ทาง','ผม','เห็น','ช้าง'], rom:'rá-wàang thaang phǒm hěn cháang', fr:'En chemin, j’ai vu un éléphant', en:'On the way, I saw an elephant' },
  b1_until:{ chunks:['รอ','จนกระทั่ง','ฝน','หยุด'], rom:'rɔɔ jon-krà-thâng fǒn yùt', fr:'Attends jusqu’à ce que la pluie cesse', en:'Wait until the rain stops' },
  b1_apartfrom:{ chunks:['นอกจาก','นี้','ยัง','มี','อีก'], rom:'nɔ̂ɔk-jàak níi yang mii ìik', fr:'En dehors de cela, il y en a encore', en:'Apart from this, there is more' },
  b1_true:{ chunks:['เรื่อง','นี้','จริง','ไหม'], rom:'rʉ̂ang níi jing mǎi', fr:'Cette histoire est-elle vraie ?', en:'Is this story true?' },
  b1_misunderstand:{ chunks:['ผม','เข้าใจผิด','ขอโทษ'], rom:'phǒm khâo-jai-phìt khɔ̌ɔ-thôot', fr:'J’ai mal compris, désolé', en:'I misunderstood, sorry' },
  b1_maybe:{ chunks:['บางที','เขา','อาจ','ไม่','มา'], rom:'baang-thii khǎo àat mâi maa', fr:'Peut-être qu’il ne viendra pas', en:'Maybe he will not come' }
}});

/* — parcours du palier B1 — */
ajouterPalier({ palier:'b1',
  sections:[
    { id:'sec-b1', titre:{fr:'Intermédiaire', en:'Intermediate'},
      sousTitre:{fr:'Donner son avis et raconter', en:'Giving opinions and telling stories'},
      unites:['b1u1','b1u2','b1u3','b1u4','b1u5','b1u6','b1u7','b1u8'], couleur:'#CE82FF' }
  ],
  unites:[
  { id:'b1u1', title:{fr:'Donner son avis', en:'Giving an opinion'}, subtitle:{fr:'Penser, croire, discuter', en:'Thinking, believing, discussing'},
    color:'#CE82FF', icon:'💭', lessons:[
    { id:'b1u1l1', title:{fr:'Je pense que…', en:'I think that…'}, words:['khit','wa','chuea','khwamkhithen'], sentences:['b1_think','b1_because_that'] },
    { id:'b1u1l2', title:{fr:'D’accord ou non', en:'Agreeing or not'}, words:['hen_duai','khatkhan','nae_nae','bang_thi','khong_ja'], sentences:['b1_agree','b1_maybe'] },
    { id:'b1u1l3', title:{fr:'Expliquer', en:'Explaining'}, words:['athibai','yokwang','hetphon','witthi'], sentences:['b1_explain'] }
  ]},
  { id:'b1u2', title:{fr:'Résoudre', en:'Sorting things out'}, subtitle:{fr:'Problèmes et décisions', en:'Problems and decisions'},
    color:'#FF4B4B', icon:'🧩', lessons:[
    { id:'b1u2l1', title:{fr:'Un problème', en:'A problem'}, words:['panha','kaekhai','tatsinjai','samkhan'], sentences:['b1_problem','b1_decide','b1_important'] },
    { id:'b1u2l2', title:{fr:'Facile ou difficile', en:'Easy or hard'}, words:['ngai','yak_hard','chalat','khayan','khiikiat','keng'], sentences:['b1_difficult','b1_which'] }
  ]},
  { id:'b1u3', title:{fr:'Raconter', en:'Telling a story'}, subtitle:{fr:'Mettre les faits en ordre', en:'Putting events in order'},
    color:'#FF9600', icon:'📖', lessons:[
    { id:'b1u3l1', title:{fr:'Une histoire', en:'A story'}, words:['rueang','lao','koetkhuen','jam','bok','hen_see'], sentences:['b1_story','b1_true','b1_during'] },
    { id:'b1u3l2', title:{fr:'Avant, après', en:'Before, after'}, words:['ton_raek','lang_jak','kon_na','nai_thisut','thanthi_dai'], sentences:['b1_after','b1_finally'] },
    { id:'b1u3l3', title:{fr:'Malentendus', en:'Misunderstandings'}, words:['khaochai_phit','jing','plom','riaproi'], sentences:['b1_misunderstand','b1_true'] }
  ]},
  { id:'b1u4', title:{fr:'Démarches', en:'Getting things done'}, subtitle:{fr:'Banque, poste, papiers', en:'Bank, post, paperwork'},
    color:'#00CD9C', icon:'🏦', lessons:[
    { id:'b1u4l1', title:{fr:'À la banque', en:'At the bank'}, words:['thanakhan','banchi','bat','jai_pay'], sentences:['b1_bank','b1_pay'] },
    { id:'b1u4l2', title:{fr:'Payer', en:'Paying'}, words:['ratkha','suanlot','bai_set','khue_ngoen'], sentences:['b1_receipt'] },
    { id:'b1u4l3', title:{fr:'Papiers', en:'Paperwork'}, words:['ekkasan','langsue','torakan','praisani','song_send','rap'], sentences:['b1_send'] }
  ]},
  { id:'b1u5', title:{fr:'Numérique', en:'Online'}, subtitle:{fr:'Ordinateur et internet', en:'Computer and internet'},
    color:'#1CB0F6', icon:'💻', lessons:[
    { id:'b1u5l1', title:{fr:'Les appareils', en:'Devices'}, words:['khomphiuter','internet','aeplikhechan','khomun'], sentences:['b1_internet'] },
    { id:'b1u5l2', title:{fr:'Se connecter', en:'Logging in'}, words:['rahat','khonha','daorot','ban_thuek','poet','pit'], sentences:['b1_password','b1_bank'] }
  ]},
  { id:'b1u6', title:{fr:'Société', en:'Society'}, subtitle:{fr:'Culture, coutumes, règles', en:'Culture, customs, rules'},
    color:'#A560E8', icon:'🏛️', lessons:[
    { id:'b1u6l1', title:{fr:'Culture', en:'Culture'}, words:['sangkhom','wathanatham','prapheni','sasana'], sentences:['b1_culture','b1_tradition'] },
    { id:'b1u6l2', title:{fr:'Bonnes manières', en:'Good manners'}, words:['wai_respect','suphap','kreng_jai','khopkhun_jing','sanit'], sentences:['b1_polite','b1_close_friend'] },
    { id:'b1u6l3', title:{fr:'Règles', en:'Rules'}, words:['ratthaban','kotmai','sitthi','chuailuea'], sentences:['b1_important'] }
  ]},
  { id:'b1u7', title:{fr:'Cuisiner', en:'Cooking'}, subtitle:{fr:'À la cuisine', en:'In the kitchen'},
    color:'#FFB020', icon:'🍳', lessons:[
    { id:'b1u7l1', title:{fr:'Préparer', en:'Preparing'}, words:['tham_ahan','suan_phasom','han','chim'], sentences:['b1_cook','b1_ingredient','b1_taste'] },
    { id:'b1u7l2', title:{fr:'Cuissons', en:'Cooking methods'}, words:['tom','phat','thot','ping'], sentences:['b1_cook'] },
    { id:'b1u7l3', title:{fr:'À table', en:'At the table'}, words:['jaan','chon','som','takiap'], sentences:['b1_taste'] }
  ]},
  { id:'b1u8', title:{fr:'Relier les idées', en:'Linking ideas'}, subtitle:{fr:'Phrases plus longues', en:'Longer sentences'},
    color:'#7B61FF', icon:'🔗', lessons:[
    { id:'b1u8l1', title:{fr:'Qui, que', en:'Who, which'}, words:['thi_rel','wa','doi'], sentences:['b1_which','b1_because_that'] },
    { id:'b1u8l2', title:{fr:'But et opposition', en:'Purpose and contrast'}, words:['phuea','thueng_maewa','danglan','nokjak'], sentences:['b1_inorder','b1_although','b1_therefore','b1_apartfrom'] },
    { id:'b1u8l3', title:{fr:'Situer dans le temps', en:'Placing in time'}, words:['raweang','jonkrathang','yangrai_kotam','thammai_mai','yut','thaang'], sentences:['b1_during','b1_until'] },
    { id:'b1u8l7', title:{fr:'Petits mots utiles', en:'Handy little words'}, words:['ko','thi_ni','sonjai','bang_some'], sentences:['b1_internet','b1_culture','b1_apartfrom'] },
    { id:'b1u8l4', title:{fr:'Nature', en:'Nature'}, words:['thammachat','ton_mai','dokmai','maenam','pa','satliang'], sentences:['b1_nature'] },
    { id:'b1u8l5', title:{fr:'Environnement', en:'Environment'}, words:['singwaetlom','malaphit','raksa','narak','nasonjai'], sentences:['b1_pollution','b1_interesting'] },
    { id:'b1u8l6', title:{fr:'Danger', en:'Danger'}, words:['rokphai','attrai','plotphai','chak','truat','hai_kamlang','ubattihet'], sentences:['b1_dangerous','b1_safe','b1_accident'] }
  ]}
  ]
});
