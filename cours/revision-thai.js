/* ============================================================
   Banque de phrases de révision — thaï
   Ces phrases ne sont enseignées dans aucune leçon : elles ne
   servent qu'à la séance de révision, pour faire composer des
   tournures NOUVELLES avec le vocabulaire déjà appris.
   Format : seulement `chunks`, `fr`, `en`.
     · chaque chunk DOIT être un mot du lexique (un test le vérifie) ;
       c'est ce qui permet la correction mot à mot cliquable ;
     · `rom` et `mots` (mots requis) sont déduits automatiquement
       par finaliserContenu() — ne jamais les écrire à la main.
   Une phrase n'apparaît en révision que lorsque TOUS ses mots
   ont été rencontrés dans une leçon terminée.
   ============================================================ */

/* ---------- palier A1 ---------- */
ajouterPalier({ palier:'a1', revision:{

  /* — affirmations simples : sujet + verbe + complément — */
  rv_a1_001:{ chunks:['ผม','กิน','ข้าว','ครับ'], fr:'Je mange du riz', en:'I eat rice' },
  rv_a1_002:{ chunks:['ฉัน','ดื่ม','กาแฟ','ค่ะ'], fr:'Je bois du café', en:'I drink coffee' },
  rv_a1_003:{ chunks:['เขา','กิน','ผลไม้'], fr:'Il mange des fruits', en:'He eats fruit' },
  rv_a1_004:{ chunks:['เรา','ไป','ตลาด','ตอนเช้า'], fr:'Nous allons au marché le matin', en:'We go to the market in the morning' },
  rv_a1_005:{ chunks:['คุณ','ไป','โรงเรียน'], fr:'Tu vas à l’école', en:'You go to school' },
  rv_a1_006:{ chunks:['พวกเขา','อยู่','บ้าน'], fr:'Ils sont à la maison', en:'They are at home' },
  rv_a1_007:{ chunks:['แม่','ทำ','อาหาร'], fr:'Ma mère fait à manger', en:'Mum cooks' },
  rv_a1_008:{ chunks:['พ่อ','ทำงาน','ตอนเช้า'], fr:'Mon père travaille le matin', en:'Dad works in the morning' },
  rv_a1_009:{ chunks:['เด็ก','วิ่ง','เร็ว'], fr:'L’enfant court vite', en:'The child runs fast' },
  rv_a1_010:{ chunks:['ครู','พูด','ภาษา','ไทย'], fr:'Le professeur parle thaï', en:'The teacher speaks Thai' },
  rv_a1_011:{ chunks:['นักเรียน','อ่าน','หนังสือ'], fr:'L’élève lit un livre', en:'The student reads a book' },
  rv_a1_012:{ chunks:['เพื่อน','ผม','ซื้อ','รถ'], fr:'Mon ami achète une voiture', en:'My friend buys a car' },
  rv_a1_013:{ chunks:['ผม','มี','แมว','สอง','ตัว'], fr:'J’ai deux chats', en:'I have two cats' },
  rv_a1_014:{ chunks:['เขา','มี','หมา','หนึ่ง','ตัว'], fr:'Il a un chien', en:'He has one dog' },
  rv_a1_015:{ chunks:['ฉัน','ชอบ','ส้มตำ','มาก'], fr:'J’aime beaucoup la salade de papaye', en:'I like papaya salad a lot' },
  rv_a1_016:{ chunks:['ผม','รัก','ครอบครัว'], fr:'J’aime ma famille', en:'I love my family' },
  rv_a1_017:{ chunks:['เรา','เรียน','ภาษา','อังกฤษ'], fr:'Nous apprenons l’anglais', en:'We study English' },
  rv_a1_018:{ chunks:['น้อง','นอน','ตอนบ่าย'], fr:'Mon cadet dort l’après-midi', en:'My younger sibling sleeps in the afternoon' },
  rv_a1_019:{ chunks:['พี่','ขาย','ผลไม้','ที่','ตลาด'], fr:'Mon aîné vend des fruits au marché', en:'My elder sibling sells fruit at the market' },
  rv_a1_020:{ chunks:['ผม','เดิน','ไป','โรงเรียน'], fr:'Je vais à l’école à pied', en:'I walk to school' },

  /* — décrire — */
  rv_a1_021:{ chunks:['อาหาร','ไทย','อร่อย','มาก'], fr:'La cuisine thaïe est très bonne', en:'Thai food is very good' },
  rv_a1_022:{ chunks:['กาแฟ','ร้อน','มาก'], fr:'Le café est très chaud', en:'The coffee is very hot' },
  rv_a1_023:{ chunks:['น้ำ','เย็น','มาก'], fr:'L’eau est très fraîche', en:'The water is very cold' },
  rv_a1_024:{ chunks:['บ้าน','ของ','เขา','ใหญ่'], fr:'Sa maison est grande', en:'His house is big' },
  rv_a1_025:{ chunks:['แมว','ตัว','นี้','เล็ก'], fr:'Ce chat est petit', en:'This cat is small' },
  rv_a1_026:{ chunks:['วันนี้','ไม่','ร้อน','ครับ'], fr:'Il ne fait pas chaud aujourd’hui', en:'It is not hot today' },
  rv_a1_027:{ chunks:['กระเป๋า','ใบ','นี้','แพง'], fr:'Ce sac est cher', en:'This bag is expensive' },
  rv_a1_028:{ chunks:['หนังสือ','เล่ม','นี้','ดี','มาก'], fr:'Ce livre est très bien', en:'This book is very good' },
  rv_a1_029:{ chunks:['ผู้หญิง','คน','นั้น','สวย'], fr:'Cette femme est jolie', en:'That woman is pretty' },
  rv_a1_030:{ chunks:['รถ','คัน','นี้','ใหม่'], fr:'Cette voiture est neuve', en:'This car is new' },
  rv_a1_031:{ chunks:['ส้มตำ','เผ็ด','นิดหน่อย'], fr:'La salade de papaye est un peu épicée', en:'The papaya salad is a bit spicy' },
  rv_a1_032:{ chunks:['ผม','หิว','มาก','ครับ'], fr:'J’ai très faim', en:'I am very hungry' },
  rv_a1_033:{ chunks:['ผม','อิ่ม','ครับ'], fr:'Je suis rassasié', en:'I am full' },

  /* — négation — */
  rv_a1_034:{ chunks:['ผม','ไม่','กิน','เนื้อ'], fr:'Je ne mange pas de viande', en:'I don’t eat beef' },
  rv_a1_035:{ chunks:['ฉัน','ไม่','ชอบ','เผ็ด'], fr:'Je n’aime pas ce qui est épicé', en:'I don’t like spicy food' },
  rv_a1_036:{ chunks:['เขา','ไม่','อยู่','บ้าน'], fr:'Il n’est pas à la maison', en:'He is not at home' },
  rv_a1_037:{ chunks:['ผม','ไม่','เข้าใจ','ครับ'], fr:'Je ne comprends pas', en:'I don’t understand' },
  rv_a1_038:{ chunks:['ผม','ไม่','รู้','ครับ'], fr:'Je ne sais pas', en:'I don’t know' },
  rv_a1_039:{ chunks:['ผม','ไม่','มี','เงิน','ดังนั้น','ผม','ไม่','ซื้อ'], fr:'Je n’ai pas d’argent, donc je n’achète pas', en:'I have no money, so I’m not buying' },
  rv_a1_040:{ chunks:['ร้านอาหาร','ไม่','ไกล'], fr:'Le restaurant n’est pas loin', en:'The restaurant is not far' },
  rv_a1_041:{ chunks:['เขา','ไม่','พูด','ภาษา','ฝรั่งเศส'], fr:'Il ne parle pas français', en:'He doesn’t speak French' },

  /* — questions fermées (ไหม) — */
  rv_a1_042:{ chunks:['คุณ','หิว','ไหม','ครับ'], fr:'As-tu faim ?', en:'Are you hungry?' },
  rv_a1_043:{ chunks:['คุณ','ชอบ','อาหาร','เผ็ด','ไหม','ครับ'], fr:'Aimes-tu la cuisine épicée ?', en:'Do you like spicy food?' },
  rv_a1_044:{ chunks:['เผ็ด','ไหม','ครับ'], fr:'Est-ce épicé ?', en:'Is it spicy?' },
  rv_a1_045:{ chunks:['คุณ','ไป','ตลาด','ไหม'], fr:'Tu vas au marché ?', en:'Are you going to the market?' },
  rv_a1_046:{ chunks:['คุณ','มี','น้ำ','ไหม','ครับ'], fr:'Avez-vous de l’eau ?', en:'Do you have water?' },
  rv_a1_047:{ chunks:['อร่อย','ไหม','ครับ'], fr:'C’est bon ?', en:'Is it tasty?' },
  rv_a1_048:{ chunks:['คุณ','เข้าใจ','ไหม'], fr:'Tu comprends ?', en:'Do you understand?' },
  rv_a1_049:{ chunks:['ไกล','ไหม','ครับ'], fr:'C’est loin ?', en:'Is it far?' },
  rv_a1_050:{ chunks:['คุณ','สบายดี','ไหม','ครับ'], fr:'Comment vas-tu ?', en:'How are you?' },
  rv_a1_051:{ chunks:['คุณ','พูด','ภาษา','อังกฤษ','ไหม'], fr:'Parles-tu anglais ?', en:'Do you speak English?' },
  rv_a1_052:{ chunks:['เขา','เป็น','ครู','ไหม'], fr:'Est-il professeur ?', en:'Is he a teacher?' },

  /* — questions ouvertes — */
  rv_a1_053:{ chunks:['คุณ','ชื่อ','อะไร','ครับ'], fr:'Comment t’appelles-tu ?', en:'What is your name?' },
  rv_a1_054:{ chunks:['คุณ','ไป','ที่ไหน','ครับ'], fr:'Où vas-tu ?', en:'Where are you going?' },
  rv_a1_055:{ chunks:['ห้องน้ำ','อยู่','ที่ไหน','ครับ'], fr:'Où sont les toilettes ?', en:'Where is the toilet?' },
  rv_a1_056:{ chunks:['เขา','เป็น','ใคร','ครับ'], fr:'Qui est-il ?', en:'Who is he?' },
  rv_a1_057:{ chunks:['ใคร','ทำ','อาหาร','ครับ'], fr:'Qui fait la cuisine ?', en:'Who is cooking?' },
  rv_a1_058:{ chunks:['ทำไม','คุณ','ไม่','กิน','ครับ'], fr:'Pourquoi ne manges-tu pas ?', en:'Why aren’t you eating?' },
  rv_a1_059:{ chunks:['คุณ','มา','เมื่อไหร่','ครับ'], fr:'Quand viens-tu ?', en:'When are you coming?' },
  rv_a1_060:{ chunks:['ไป','โรงแรม','ยังไง','ครับ'], fr:'Comment aller à l’hôtel ?', en:'How do I get to the hotel?' },
  rv_a1_061:{ chunks:['ผัดไทย','เท่าไหร่','ครับ'], fr:'Combien coûte le pad thaï ?', en:'How much is the pad thai?' },
  rv_a1_062:{ chunks:['คุณ','มี','ลูก','กี่','คน'], fr:'Combien d’enfants as-tu ?', en:'How many children do you have?' },
  rv_a1_063:{ chunks:['คุณ','อยู่','ที่ไหน','ครับ'], fr:'Où habites-tu ?', en:'Where do you live?' },
  rv_a1_064:{ chunks:['สนามบิน','อยู่','ไกล','ไหม','ครับ'], fr:'L’aéroport est-il loin ?', en:'Is the airport far?' },
  rv_a1_065:{ chunks:['คุณ','ทำงาน','อะไร','ครับ'], fr:'Quel travail fais-tu ?', en:'What work do you do?' },

  /* — demander poliment — */
  rv_a1_066:{ chunks:['ขอ','น้ำ','หน่อย','ครับ'], fr:'Puis-je avoir de l’eau, s’il vous plaît', en:'Some water, please' },
  rv_a1_067:{ chunks:['ขอ','กาแฟ','หน่อย','ครับ'], fr:'Puis-je avoir un café, s’il vous plaît', en:'A coffee, please' },
  rv_a1_068:{ chunks:['ขอ','ผัดไทย','สอง','จาน','ครับ'], fr:'Deux pad thaï, s’il vous plaît', en:'Two pad thai, please' },
  rv_a1_069:{ chunks:['ช่วย','ผม','หน่อย','ครับ'], fr:'Aidez-moi, s’il vous plaît', en:'Please help me' },
  rv_a1_070:{ chunks:['ช่วย','พูด','ช้า','หน่อย','ครับ'], fr:'Parlez plus lentement, s’il vous plaît', en:'Please speak slowly' },
  rv_a1_071:{ chunks:['ขอโทษ','ครับ','ผม','ไม่','เข้าใจ'], fr:'Pardon, je ne comprends pas', en:'Sorry, I don’t understand' },
  rv_a1_072:{ chunks:['ผม','อยาก','ไป','ตลาด'], fr:'Je voudrais aller au marché', en:'I want to go to the market' },
  rv_a1_073:{ chunks:['ผม','อยาก','กิน','ก๋วยเตี๋ยว'], fr:'Je voudrais manger une soupe de nouilles', en:'I want to eat noodle soup' },
  rv_a1_074:{ chunks:['ผม','เอา','น้ำแข็ง','ครับ'], fr:'Je prends des glaçons', en:'I’ll take ice' },
  rv_a1_075:{ chunks:['ผม','อยาก','เรียน','ภาษา','ไทย'], fr:'Je veux apprendre le thaï', en:'I want to learn Thai' },
  rv_a1_076:{ chunks:['ขอ','เบียร์','หนึ่ง','ขวด','ครับ'], fr:'Une bière, s’il vous plaît', en:'One bottle of beer, please' },
  rv_a1_077:{ chunks:['ช่วย','เขียน','หน่อย','ครับ'], fr:'Écrivez-le, s’il vous plaît', en:'Please write it down' },

  /* — mots de liaison — */
  rv_a1_078:{ chunks:['ผม','กิน','ข้าว','และ','ดื่ม','น้ำ'], fr:'Je mange du riz et je bois de l’eau', en:'I eat rice and drink water' },
  rv_a1_079:{ chunks:['เขา','ชอบ','กาแฟ','แต่','ไม่','ชอบ','ชา'], fr:'Il aime le café mais pas le thé', en:'He likes coffee but not tea' },
  rv_a1_080:{ chunks:['คุณ','อยาก','กิน','ไก่','หรือ','ปลา'], fr:'Veux-tu manger du poulet ou du poisson ?', en:'Do you want chicken or fish?' },
  rv_a1_081:{ chunks:['ผม','ไป','ตลาด','กับ','เพื่อน'], fr:'Je vais au marché avec un ami', en:'I go to the market with a friend' },
  rv_a1_082:{ chunks:['ผม','ไม่','กิน','เพราะ','ผม','อิ่ม'], fr:'Je ne mange pas parce que je suis rassasié', en:'I’m not eating because I’m full' },
  rv_a1_083:{ chunks:['อาหาร','แพง','ดังนั้น','ผม','ไม่','ซื้อ'], fr:'La nourriture est chère, donc je n’achète pas', en:'The food is expensive, so I don’t buy it' },
  rv_a1_084:{ chunks:['ถ้า','คุณ','หิว','เรา','ไป','ร้านอาหาร'], fr:'Si tu as faim, on va au restaurant', en:'If you’re hungry, we’ll go to a restaurant' },
  rv_a1_085:{ chunks:['เมื่อ','ผม','เป็น','เด็ก','ผม','อยู่','ฝรั่งเศส'], fr:'Quand j’étais enfant, je vivais en France', en:'When I was a child I lived in France' },
  rv_a1_086:{ chunks:['ผม','รู้','ว่า','คุณ','ชอบ','ส้มตำ'], fr:'Je sais que tu aimes la salade de papaye', en:'I know that you like papaya salad' },
  rv_a1_087:{ chunks:['ผม','ไป','ตลาด','เพื่อ','ซื้อ','ผลไม้'], fr:'Je vais au marché pour acheter des fruits', en:'I go to the market to buy fruit' },
  rv_a1_088:{ chunks:['ผู้หญิง','ที่','พูด','ภาษา','ไทย','เป็น','ครู'], fr:'La femme qui parle thaï est professeur', en:'The woman who speaks Thai is a teacher' },
  rv_a1_089:{ chunks:['ถึงแม้ว่า','แพง','ผม','ก็','ซื้อ'], fr:'Bien que ce soit cher, je l’achète quand même', en:'Although it’s expensive, I still buy it' },
  rv_a1_090:{ chunks:['ผม','ไป','โรงเรียน','โดย','รถเมล์'], fr:'Je vais à l’école en bus', en:'I go to school by bus' },
  rv_a1_091:{ chunks:['นอกจาก','ข้าว','ผม','กิน','ผลไม้','ด้วย'], fr:'À part le riz, je mange aussi des fruits', en:'Besides rice, I also eat fruit' },
  rv_a1_092:{ chunks:['ถ้า','หิว','ก็','กิน','ครับ'], fr:'Si tu as faim, alors mange', en:'If you’re hungry, then eat' },

  /* — se situer, s’orienter — */
  rv_a1_093:{ chunks:['โรงแรม','อยู่','ใกล้','สนามบิน'], fr:'L’hôtel est près de l’aéroport', en:'The hotel is near the airport' },
  rv_a1_094:{ chunks:['ตลาด','อยู่','ไกล','มาก'], fr:'Le marché est très loin', en:'The market is very far' },
  rv_a1_095:{ chunks:['เดิน','ตรงไป','ครับ'], fr:'Allez tout droit', en:'Go straight on' },
  rv_a1_096:{ chunks:['ซ้าย','หรือ','ขวา','ครับ'], fr:'À gauche ou à droite ?', en:'Left or right?' },
  rv_a1_097:{ chunks:['ผม','รอ','คุณ','ที่','โรงแรม'], fr:'Je t’attends à l’hôtel', en:'I’ll wait for you at the hotel' },
  rv_a1_098:{ chunks:['เรา','ไป','สนามบิน','โดย','แท็กซี่'], fr:'Nous allons à l’aéroport en taxi', en:'We go to the airport by taxi' },
  rv_a1_099:{ chunks:['รถไฟ','มา','ตอนเย็น'], fr:'Le train arrive le soir', en:'The train comes in the evening' },
  rv_a1_100:{ chunks:['โรงพยาบาล','อยู่','ที่ไหน','ครับ'], fr:'Où est l’hôpital ?', en:'Where is the hospital?' },

  /* — la vie de tous les jours — */
  rv_a1_101:{ chunks:['ตอนเช้า','ผม','ดื่ม','กาแฟ'], fr:'Le matin je bois du café', en:'In the morning I drink coffee' },
  rv_a1_102:{ chunks:['ตอนเย็น','เรา','กิน','ข้าว','กับ','ครอบครัว'], fr:'Le soir nous mangeons en famille', en:'In the evening we eat with the family' },
  rv_a1_103:{ chunks:['กลางคืน','ผม','นอน','เร็ว'], fr:'La nuit je me couche tôt', en:'At night I sleep early' },
  rv_a1_104:{ chunks:['พรุ่งนี้','ผม','ไป','สนามบิน'], fr:'Demain je vais à l’aéroport', en:'Tomorrow I go to the airport' },
  rv_a1_105:{ chunks:['เมื่อวาน','เรา','ไป','ตลาด'], fr:'Hier nous sommes allés au marché', en:'Yesterday we went to the market' },
  rv_a1_106:{ chunks:['ตอนนี้','ผม','อยู่','โรงแรม'], fr:'Maintenant je suis à l’hôtel', en:'Right now I’m at the hotel' },
  rv_a1_107:{ chunks:['ผม','ทำงาน','ทุก','วัน'], fr:'Je travaille tous les jours', en:'I work every day' },
  rv_a1_108:{ chunks:['เขา','อ่าน','หนังสือ','ตอนบ่าย'], fr:'Il lit l’après-midi', en:'He reads in the afternoon' },
  rv_a1_109:{ chunks:['ผม','ฟัง','ครู','พูด'], fr:'J’écoute le professeur parler', en:'I listen to the teacher speak' },
  rv_a1_110:{ chunks:['เรา','นั่ง','ที่','โต๊ะ'], fr:'Nous sommes assis à table', en:'We sit at the table' },

  /* — au restaurant et au marché — */
  rv_a1_111:{ chunks:['ก๋วยเตี๋ยว','ชาม','นี้','อร่อย','มาก'], fr:'Cette soupe de nouilles est délicieuse', en:'This bowl of noodles is delicious' },
  rv_a1_112:{ chunks:['ขอ','ข้าว','ไม่','เผ็ด','ครับ'], fr:'Du riz pas épicé, s’il vous plaît', en:'Rice not spicy, please' },
  rv_a1_113:{ chunks:['ผม','ไม่','กิน','กุ้ง','ครับ'], fr:'Je ne mange pas de crevettes', en:'I don’t eat prawns' },
  rv_a1_114:{ chunks:['ผลไม้','ที่','ตลาด','ถูก','มาก'], fr:'Les fruits au marché sont très bon marché', en:'The fruit at the market is very cheap' },
  rv_a1_115:{ chunks:['ขอ','ชา','เย็น','หน่อย','ครับ'], fr:'Un thé glacé, s’il vous plaît', en:'An iced tea, please' },
  rv_a1_116:{ chunks:['อาหาร','นี้','หวาน','มาก'], fr:'Ce plat est très sucré', en:'This dish is very sweet' },
  rv_a1_117:{ chunks:['ผม','ชอบ','ไก่','แต่','ไม่','ชอบ','หมู'], fr:'J’aime le poulet mais pas le porc', en:'I like chicken but not pork' },
  rv_a1_118:{ chunks:['ขอ','ไข่','สอง','ใบ','ครับ'], fr:'Deux œufs, s’il vous plaît', en:'Two eggs, please' },

  /* — la famille — */
  rv_a1_119:{ chunks:['แม่','ของ','ผม','เป็น','ครู'], fr:'Ma mère est professeure', en:'My mother is a teacher' },
  rv_a1_120:{ chunks:['พ่อ','ของ','ผม','ทำงาน','ที่','โรงพยาบาล'], fr:'Mon père travaille à l’hôpital', en:'My father works at the hospital' },
  rv_a1_121:{ chunks:['ผม','มี','น้อง','สาม','คน'], fr:'J’ai trois cadets', en:'I have three younger siblings' },
  rv_a1_122:{ chunks:['ยาย','ของ','ผม','อยู่','ที่','เมือง','ไทย'], fr:'Ma grand-mère vit en Thaïlande', en:'My grandmother lives in Thailand' },
  rv_a1_123:{ chunks:['ลูก','ของ','เขา','ไป','โรงเรียน','ทุก','วัน'], fr:'Son enfant va à l’école tous les jours', en:'Their child goes to school every day' },
  rv_a1_124:{ chunks:['ครอบครัว','ของ','ผม','ใหญ่','มาก'], fr:'Ma famille est très grande', en:'My family is very big' },

  /* — politesse et échanges — */
  rv_a1_125:{ chunks:['สวัสดี','ครับ','ผม','เป็น','คน','ฝรั่งเศส'], fr:'Bonjour, je suis français', en:'Hello, I am French' },
  rv_a1_126:{ chunks:['ขอบคุณ','มาก','ครับ'], fr:'Merci beaucoup', en:'Thank you very much' },
  rv_a1_127:{ chunks:['ไม่เป็นไร','ครับ'], fr:'Ce n’est rien', en:'It’s nothing' },
  rv_a1_128:{ chunks:['ยินดี','ครับ'], fr:'Enchanté', en:'Pleased to meet you' },
  rv_a1_129:{ chunks:['แล้วเจอกัน','ครับ'], fr:'À bientôt', en:'See you soon' },
  rv_a1_130:{ chunks:['โชคดี','ครับ'], fr:'Bonne chance', en:'Good luck' }

}});

/* ---------- palier A2 ---------- */
ajouterPalier({ palier:'a2', revision:{

  /* — le temps des verbes — */
  rv_a2_001:{ chunks:['ผม','กิน','ข้าว','แล้ว','ครับ'], fr:'J’ai déjà mangé', en:'I have already eaten' },
  rv_a2_002:{ chunks:['พรุ่งนี้','ผม','จะ','ไป','ทะเล'], fr:'Demain j’irai à la mer', en:'Tomorrow I will go to the sea' },
  rv_a2_003:{ chunks:['เขา','กำลัง','ทำ','อาหาร'], fr:'Il est en train de cuisiner', en:'He is cooking' },
  rv_a2_004:{ chunks:['ผม','เคย','ไป','ประเทศ','ไทย'], fr:'Je suis déjà allé en Thaïlande', en:'I have been to Thailand' },
  rv_a2_005:{ chunks:['ผม','ยัง','ไม่','กิน','ข้าว'], fr:'Je n’ai pas encore mangé', en:'I haven’t eaten yet' },
  rv_a2_006:{ chunks:['คุณ','เคย','กิน','ส้มตำ','ไหม'], fr:'As-tu déjà mangé de la salade de papaye ?', en:'Have you ever eaten papaya salad?' },
  rv_a2_007:{ chunks:['ผม','ต้อง','ทำงาน','วันนี้'], fr:'Je dois travailler aujourd’hui', en:'I have to work today' },
  rv_a2_008:{ chunks:['คุณ','ควร','พักผ่อน','ครับ'], fr:'Tu devrais te reposer', en:'You should rest' },
  rv_a2_009:{ chunks:['ผม','ไป','ไม่','ได้','ครับ'], fr:'Je ne peux pas y aller', en:'I can’t go' },
  rv_a2_010:{ chunks:['เขา','อาจ','มา','สาย'], fr:'Il sera peut-être en retard', en:'He might be late' },
  rv_a2_011:{ chunks:['ผม','กำลัง','เรียน','ภาษา','ไทย','อยู่'], fr:'Je suis en train d’apprendre le thaï', en:'I am learning Thai' },

  /* — santé, corps — */
  rv_a2_012:{ chunks:['ผม','ปวด','หัว','ครับ'], fr:'J’ai mal à la tête', en:'I have a headache' },
  rv_a2_013:{ chunks:['ผม','ป่วย','ดังนั้น','ผม','ไม่','ไป','ทำงาน'], fr:'Je suis malade, donc je ne vais pas travailler', en:'I’m ill, so I’m not going to work' },
  rv_a2_014:{ chunks:['คุณ','ต้อง','กิน','ยา','ทุก','วัน'], fr:'Tu dois prendre le médicament tous les jours', en:'You must take the medicine every day' },
  rv_a2_015:{ chunks:['หมอ','บอก','ว่า','ผม','แข็งแรง'], fr:'Le médecin dit que je suis en forme', en:'The doctor says I am healthy' },
  rv_a2_016:{ chunks:['ผม','เหนื่อย','มาก','เพราะ','ผม','ทำงาน','ทุก','วัน'], fr:'Je suis très fatigué parce que je travaille tous les jours', en:'I’m very tired because I work every day' },
  rv_a2_017:{ chunks:['ผม','ปวด','ท้อง','ครับ'], fr:'J’ai mal au ventre', en:'I have a stomach ache' },

  /* — vêtements, maison — */
  rv_a2_018:{ chunks:['ผม','ใส่','เสื้อ','สีขาว'], fr:'Je porte une chemise blanche', en:'I’m wearing a white shirt' },
  rv_a2_019:{ chunks:['รองเท้า','คู่','นี้','แพง','มาก'], fr:'Cette paire de chaussures est très chère', en:'This pair of shoes is very expensive' },
  rv_a2_020:{ chunks:['ห้องนอน','ของ','ผม','สะอาด'], fr:'Ma chambre est propre', en:'My bedroom is clean' },
  rv_a2_021:{ chunks:['ช่วย','เปิด','หน้าต่าง','หน่อย','ครับ'], fr:'Ouvre la fenêtre, s’il te plaît', en:'Please open the window' },
  rv_a2_022:{ chunks:['กุญแจ','ของ','ผม','หาย'], fr:'J’ai perdu ma clé', en:'I have lost my key' },
  rv_a2_023:{ chunks:['ห้องครัว','เล็ก','แต่','สะดวก'], fr:'La cuisine est petite mais pratique', en:'The kitchen is small but convenient' },

  /* — travail, études — */
  rv_a2_024:{ chunks:['ผม','ทำงาน','ที่','บริษัท','ใหญ่'], fr:'Je travaille dans une grande entreprise', en:'I work at a big company' },
  rv_a2_025:{ chunks:['วันนี้','ผม','ยุ่ง','มาก','ครับ'], fr:'Aujourd’hui je suis très occupé', en:'I’m very busy today' },
  rv_a2_026:{ chunks:['พรุ่งนี้','ผม','ว่าง','ตอนเช้า'], fr:'Demain je suis libre le matin', en:'Tomorrow I’m free in the morning' },
  rv_a2_027:{ chunks:['เรา','ไม่','มี','ประชุม','วันนี้'], fr:'Nous n’avons pas de réunion aujourd’hui', en:'We have no meeting today' },
  rv_a2_028:{ chunks:['ผม','ลืม','ทำ','การบ้าน'], fr:'J’ai oublié de faire mes devoirs', en:'I forgot to do my homework' },
  rv_a2_029:{ chunks:['ครู','ถาม','แต่','ผม','ตอบ','ไม่','ได้'], fr:'Le professeur demande mais je ne peux pas répondre', en:'The teacher asks but I can’t answer' },
  rv_a2_030:{ chunks:['ผม','จำได้','ว่า','เขา','เป็น','ครู'], fr:'Je me souviens qu’il est professeur', en:'I remember that he is a teacher' },
  rv_a2_031:{ chunks:['คำ','นี้','เขียน','ยังไง','ครับ'], fr:'Comment s’écrit ce mot ?', en:'How do you write this word?' },

  /* — météo — */
  rv_a2_032:{ chunks:['วันนี้','ฝน','ตก'], fr:'Il pleut aujourd’hui', en:'It’s raining today' },
  rv_a2_033:{ chunks:['ถ้า','ฝน','ตก','เรา','ไม่','ไป','ทะเล'], fr:'S’il pleut, nous n’irons pas à la mer', en:'If it rains, we won’t go to the sea' },
  rv_a2_034:{ chunks:['อากาศ','วันนี้','ร้อน','กว่า','เมื่อวาน'], fr:'Il fait plus chaud aujourd’hui qu’hier', en:'The weather is hotter today than yesterday' },
  rv_a2_035:{ chunks:['ตอนเช้า','มี','ลม','เย็น'], fr:'Le matin il y a un vent frais', en:'In the morning there is a cool breeze' },
  rv_a2_036:{ chunks:['ผม','ไม่','ชอบ','อากาศ','ร้อนอบอ้าว'], fr:'Je n’aime pas le temps étouffant', en:'I don’t like muggy weather' },

  /* — loisirs — */
  rv_a2_037:{ chunks:['ผม','ชอบ','ว่ายน้ำ','ที่','ทะเล'], fr:'J’aime nager à la mer', en:'I like swimming in the sea' },
  rv_a2_038:{ chunks:['เรา','ดู','หนัง','ตอนเย็น'], fr:'Nous regardons un film le soir', en:'We watch a film in the evening' },
  rv_a2_039:{ chunks:['เขา','ร้องเพลง','เก่ง','มาก'], fr:'Il chante très bien', en:'He sings very well' },
  rv_a2_040:{ chunks:['เด็ก','เล่น','กัน','ที่','บ้าน'], fr:'Les enfants jouent ensemble à la maison', en:'The children play together at home' },
  rv_a2_041:{ chunks:['ผม','อยาก','ไป','เที่ยว','ภูเขา'], fr:'Je voudrais aller me balader à la montagne', en:'I’d like to travel to the mountains' },
  rv_a2_042:{ chunks:['คุณ','ถ่ายรูป','ให้','ผม','หน่อย','ได้','ไหม'], fr:'Peux-tu me prendre en photo ?', en:'Could you take a photo for me?' },

  /* — sentiments — */
  rv_a2_043:{ chunks:['ผม','ดีใจ','ที่','คุณ','มา'], fr:'Je suis content que tu sois venu', en:'I’m glad you came' },
  rv_a2_044:{ chunks:['เขา','เสียใจ','เพราะ','แมว','หาย'], fr:'Il est triste parce que son chat a disparu', en:'He is sad because his cat is lost' },
  rv_a2_045:{ chunks:['ผม','กลัว','หมา','ตัว','นั้น'], fr:'J’ai peur de ce chien', en:'I’m afraid of that dog' },
  rv_a2_046:{ chunks:['ผม','เบื่อ','เพราะ','ไม่','มี','อะไร','ทำ'], fr:'Je m’ennuie parce que je n’ai rien à faire', en:'I’m bored because there’s nothing to do' },
  rv_a2_047:{ chunks:['เมื่อวาน','สนุก','มาก','ครับ'], fr:'Hier c’était très amusant', en:'Yesterday was great fun' },

  /* — se donner rendez-vous — */
  rv_a2_048:{ chunks:['ผม','จะ','โทร','หา','คุณ','ตอนเย็น'], fr:'Je t’appellerai ce soir', en:'I’ll call you in the evening' },
  rv_a2_049:{ chunks:['ขอโทษ','ครับ','ผม','มา','สาย'], fr:'Pardon, je suis en retard', en:'Sorry, I’m late' },
  rv_a2_050:{ chunks:['เรา','นัด','กัน','ตอนเช้า','ได้','ไหม'], fr:'Peut-on se donner rendez-vous le matin ?', en:'Can we meet in the morning?' },
  rv_a2_051:{ chunks:['ผม','จะ','มา','ทันที','ครับ'], fr:'J’arrive tout de suite', en:'I’ll come right away' },
  rv_a2_052:{ chunks:['ขอโทษ','ที่','รบกวน','ครับ'], fr:'Désolé de vous déranger', en:'Sorry to bother you' },

  /* — voyage — */
  rv_a2_053:{ chunks:['ผม','จอง','ห้อง','ที่','โรงแรม','แล้ว'], fr:'J’ai déjà réservé une chambre à l’hôtel', en:'I have already booked a hotel room' },
  rv_a2_054:{ chunks:['ตั๋ว','รถไฟ','ราคา','เท่าไหร่','ครับ'], fr:'Combien coûte le billet de train ?', en:'How much is the train ticket?' },
  rv_a2_055:{ chunks:['กระเป๋าเดินทาง','ของ','ผม','ใหญ่','มาก'], fr:'Ma valise est très grande', en:'My suitcase is very big' },
  rv_a2_056:{ chunks:['หนังสือเดินทาง','ของ','ผม','หาย','ครับ'], fr:'J’ai perdu mon passeport', en:'I have lost my passport' },
  rv_a2_057:{ chunks:['เรา','จะ','พัก','ที่','ชายหาด','สาม','วัน'], fr:'Nous séjournerons à la plage trois jours', en:'We’ll stay at the beach for three days' },
  rv_a2_058:{ chunks:['วัด','นี้','สวย','ที่สุด'], fr:'Ce temple est le plus beau', en:'This temple is the most beautiful' },

  /* — comparer — */
  rv_a2_059:{ chunks:['อาหาร','ไทย','เผ็ด','กว่า','อาหาร','ฝรั่งเศส'], fr:'La cuisine thaïe est plus épicée que la française', en:'Thai food is spicier than French food' },
  rv_a2_060:{ chunks:['บ้าน','ของ','เขา','เหมือน','บ้าน','ของ','ผม'], fr:'Sa maison est comme la mienne', en:'His house is like mine' },
  rv_a2_061:{ chunks:['สอง','คน','นี้','ต่างกัน','มาก'], fr:'Ces deux personnes sont très différentes', en:'These two people are very different' },
  rv_a2_062:{ chunks:['ข้าว','หมด','แล้ว','ครับ'], fr:'Il n’y a plus de riz', en:'The rice is all gone' },
  rv_a2_063:{ chunks:['ขอ','น้ำ','อีก','หน่อย','ครับ'], fr:'Encore un peu d’eau, s’il vous plaît', en:'A little more water, please' },
  rv_a2_064:{ chunks:['ผม','อยาก','ไป','ด้วย','ครับ'], fr:'Je veux y aller aussi', en:'I want to go too' }

}});

/* ---------- palier B1 ---------- */
ajouterPalier({ palier:'b1', revision:{

  /* — donner son avis — */
  rv_b1_001:{ chunks:['ผม','คิด','ว่า','อาหาร','ไทย','อร่อย','ที่สุด'], fr:'Je pense que la cuisine thaïe est la meilleure', en:'I think Thai food is the best' },
  rv_b1_002:{ chunks:['ผม','เห็นด้วย','กับ','คุณ','ครับ'], fr:'Je suis d’accord avec toi', en:'I agree with you' },
  rv_b1_003:{ chunks:['ผม','ไม่','เห็นด้วย','เพราะ','ผม','มี','เหตุผล'], fr:'Je ne suis pas d’accord, parce que j’ai mes raisons', en:'I disagree, because I have my reasons' },
  rv_b1_004:{ chunks:['ช่วย','อธิบาย','อีก','ครั้ง','ได้','ไหม','ครับ'], fr:'Peux-tu expliquer encore une fois ?', en:'Could you explain once more?' },
  rv_b1_005:{ chunks:['ผม','ขอ','ยกตัวอย่าง','หน่อย','ครับ'], fr:'Permettez-moi de donner un exemple', en:'Let me give an example' },
  rv_b1_006:{ chunks:['บางที','เขา','อาจ','เข้าใจผิด'], fr:'Peut-être qu’il a mal compris', en:'Maybe he misunderstood' },
  rv_b1_007:{ chunks:['แน่นอน','ว่า','เรื่อง','นี้','สำคัญ'], fr:'Il est certain que cette affaire est importante', en:'This matter is certainly important' },
  rv_b1_008:{ chunks:['เรา','ต้อง','ตัดสินใจ','วันนี้'], fr:'Nous devons décider aujourd’hui', en:'We have to decide today' },
  rv_b1_009:{ chunks:['ปัญหา','นี้','แก้ไข','ยาก','มาก'], fr:'Ce problème est très difficile à résoudre', en:'This problem is very hard to fix' },

  /* — raconter — */
  rv_b1_010:{ chunks:['ตอนแรก','ผม','ไม่','เข้าใจ','แต่','ในที่สุด','ผม','ก็','เข้าใจ'], fr:'Au début je ne comprenais pas, mais finalement j’ai compris', en:'At first I didn’t understand, but in the end I did' },
  rv_b1_011:{ chunks:['หลังจาก','ทำงาน','ผม','ไป','บ้าน'], fr:'Après le travail je vais à la maison', en:'After work I go to the house' },
  rv_b1_012:{ chunks:['เขา','เล่า','เรื่อง','ที่','เกิดขึ้น','เมื่อวาน'], fr:'Il raconte ce qui s’est passé hier', en:'He tells what happened yesterday' },
  rv_b1_013:{ chunks:['ก่อน','นอน','ผม','อ่าน','หนังสือ'], fr:'Avant de dormir je lis un livre', en:'Before sleeping I read a book' },
  rv_b1_014:{ chunks:['ผม','จำ','ชื่อ','ของ','เขา','ไม่','ได้'], fr:'Je n’arrive pas à retenir son nom', en:'I can’t remember his name' },

  /* — démarches — */
  rv_b1_015:{ chunks:['ผม','อยาก','เปิด','บัญชี','ที่','ธนาคาร'], fr:'Je voudrais ouvrir un compte à la banque', en:'I’d like to open a bank account' },
  rv_b1_016:{ chunks:['ขอ','ใบเสร็จ','หน่อย','ครับ'], fr:'Puis-je avoir un reçu ?', en:'May I have a receipt?' },
  rv_b1_017:{ chunks:['ผม','จ่าย','ด้วย','บัตร','ได้','ไหม','ครับ'], fr:'Puis-je payer par carte ?', en:'Can I pay by card?' },
  rv_b1_018:{ chunks:['มี','ส่วนลด','ไหม','ครับ'], fr:'Y a-t-il une remise ?', en:'Is there a discount?' },
  rv_b1_019:{ chunks:['ผม','ต้อง','ส่ง','เอกสาร','ไป','ที่','ไปรษณีย์'], fr:'Je dois envoyer les documents à la poste', en:'I have to send the documents to the post office' },
  rv_b1_020:{ chunks:['ช่วย','ติดต่อ','เขา','ให้','ผม','หน่อย','ครับ'], fr:'Contactez-le pour moi, s’il vous plaît', en:'Please contact him for me' },

  /* — vie numérique — */
  rv_b1_021:{ chunks:['ผม','ลืม','รหัสผ่าน','ของ','ผม'], fr:'J’ai oublié mon mot de passe', en:'I forgot my password' },
  rv_b1_022:{ chunks:['อินเทอร์เน็ต','ที่นี่','ช้า','มาก'], fr:'Internet est très lent ici', en:'The internet here is very slow' },
  rv_b1_023:{ chunks:['ผม','ค้นหา','ข้อมูล','ทุก','วัน'], fr:'Je cherche des informations tous les jours', en:'I search for information every day' },
  rv_b1_024:{ chunks:['ช่วย','บันทึก','ข้อมูล','นี้','หน่อย','ครับ'], fr:'Enregistre ces données, s’il te plaît', en:'Please save this data' },

  /* — culture, société — */
  rv_b1_025:{ chunks:['ผม','สนใจ','วัฒนธรรม','ไทย','มาก'], fr:'La culture thaïe m’intéresse beaucoup', en:'I’m very interested in Thai culture' },
  rv_b1_026:{ chunks:['ผม','ไหว้','ครู','ทุก','วัน'], fr:'Je salue le professeur (wai) tous les jours', en:'I wai the teacher every day' },
  rv_b1_027:{ chunks:['ประเพณี','นี้','สำคัญ','มาก','ครับ'], fr:'Cette tradition est très importante', en:'This tradition is very important' },
  rv_b1_028:{ chunks:['ถึงแม้ว่า','ผม','เป็น','คน','ฝรั่งเศส','ผม','ก็','เข้าใจ'], fr:'Bien que je sois français, je comprends quand même', en:'Although I’m French, I still understand' },

  /* — cuisine — */
  rv_b1_029:{ chunks:['ผม','ชอบ','ทำอาหาร','ที่','บ้าน'], fr:'J’aime cuisiner à la maison', en:'I like cooking at home' },
  rv_b1_030:{ chunks:['ช่วย','หั่น','ผัก','หน่อย','ครับ'], fr:'Coupe les légumes, s’il te plaît', en:'Please chop the vegetables' },
  rv_b1_031:{ chunks:['ขอ','ชิม','หน่อย','ได้','ไหม','ครับ'], fr:'Puis-je goûter ?', en:'May I have a taste?' },
  rv_b1_032:{ chunks:['ขอ','ช้อน','กับ','ส้อม','หน่อย','ครับ'], fr:'Une cuillère et une fourchette, s’il vous plaît', en:'A spoon and a fork, please' },

  /* — sécurité, santé — */
  rv_b1_033:{ chunks:['ที่นี่','ปลอดภัย','ไหม','ครับ'], fr:'Est-ce sûr ici ?', en:'Is it safe here?' },
  rv_b1_034:{ chunks:['กลางคืน','ถนน','นี้','อันตราย'], fr:'La nuit, cette rue est dangereuse', en:'At night this street is dangerous' },
  rv_b1_035:{ chunks:['หมอ','ต้อง','ตรวจ','ก่อน'], fr:'Le médecin doit examiner d’abord', en:'The doctor must examine first' },
  rv_b1_036:{ chunks:['มี','อุบัติเหตุ','ระหว่าง','ทาง'], fr:'Il y a eu un accident en chemin', en:'There was an accident on the way' },

  /* — nature — */
  rv_b1_037:{ chunks:['ป่า','ที่นี่','สวย','มาก'], fr:'La forêt ici est très belle', en:'The forest here is very beautiful' },
  rv_b1_038:{ chunks:['เรา','ต้อง','รักษา','สิ่งแวดล้อม'], fr:'Nous devons préserver l’environnement', en:'We must protect the environment' },
  rv_b1_039:{ chunks:['มลพิษ','เป็น','ปัญหา','ใหญ่','ของ','เมือง'], fr:'La pollution est un grand problème de la ville', en:'Pollution is a big problem for the city' },
  rv_b1_040:{ chunks:['ดอกไม้','ที่','แม่น้ำ','สวย','มาก'], fr:'Les fleurs à la rivière sont très belles', en:'The flowers at the river are very beautiful' }

}});

/* ---------- palier A1 — le tout début du parcours ----------
   Ces phrases n'emploient QUE le vocabulaire des vingt premières
   leçons (politesse, pronoms, mots interrogatifs, nombres, table,
   mots de liaison). Sans elles, la bascule vers la composition
   arrive avant qu'il y ait assez de phrases jouables, et la séance
   repasse trois ou quatre fois sur les mêmes.                     */
ajouterPalier({ palier:'a1', revision:{

  /* — à table : dire ce qu'on mange et boit — */
  rv_a1_201:{ chunks:['คุณ','กิน','อะไร','ครับ'], fr:'Que manges-tu ?', en:'What are you eating?' },
  rv_a1_202:{ chunks:['ผม','กิน','ก๋วยเตี๋ยว','ครับ'], fr:'Je mange une soupe de nouilles', en:'I’m eating noodle soup' },
  rv_a1_203:{ chunks:['ฉัน','ดื่ม','ชา','ค่ะ'], fr:'Je bois du thé', en:'I drink tea' },
  rv_a1_204:{ chunks:['คุณ','ดื่ม','อะไร','ครับ'], fr:'Que bois-tu ?', en:'What are you drinking?' },
  rv_a1_205:{ chunks:['ผม','ดื่ม','น้ำ','ครับ'], fr:'Je bois de l’eau', en:'I drink water' },
  rv_a1_206:{ chunks:['เด็ก','ดื่ม','นม'], fr:'L’enfant boit du lait', en:'The child drinks milk' },
  rv_a1_207:{ chunks:['ผู้หญิง','กิน','ส้มตำ'], fr:'La femme mange de la salade de papaye', en:'The woman eats papaya salad' },
  rv_a1_208:{ chunks:['ผู้ชาย','ดื่ม','เบียร์'], fr:'L’homme boit une bière', en:'The man drinks beer' },
  rv_a1_209:{ chunks:['เพื่อน','ผม','กิน','ผัดไทย'], fr:'Mon ami mange un pad thaï', en:'My friend eats pad thai' },
  rv_a1_210:{ chunks:['เรา','กิน','อาหาร','ไทย'], fr:'Nous mangeons de la cuisine thaïe', en:'We eat Thai food' },
  rv_a1_211:{ chunks:['พวกเขา','ดื่ม','กาแฟ'], fr:'Ils boivent du café', en:'They drink coffee' },
  rv_a1_212:{ chunks:['ครู','กิน','ข้าว','กับ','นักเรียน'], fr:'Le professeur mange avec les élèves', en:'The teacher eats with the students' },

  /* — commander poliment — */
  rv_a1_213:{ chunks:['ขอ','ข้าว','หน่อย','ครับ'], fr:'Du riz, s’il vous plaît', en:'Some rice, please' },
  rv_a1_214:{ chunks:['ขอ','ชา','หน่อย','ครับ'], fr:'Du thé, s’il vous plaît', en:'Some tea, please' },
  rv_a1_215:{ chunks:['ขอ','น้ำแข็ง','หน่อย','ครับ'], fr:'Des glaçons, s’il vous plaît', en:'Some ice, please' },
  rv_a1_216:{ chunks:['ขอ','นม','หน่อย','ค่ะ'], fr:'Du lait, s’il vous plaît', en:'Some milk, please' },
  rv_a1_217:{ chunks:['ขอ','ขนม','หน่อย','ครับ'], fr:'Une friandise, s’il vous plaît', en:'A sweet, please' },
  rv_a1_218:{ chunks:['ขอ','เกลือ','กับ','น้ำตาล','หน่อย','ครับ'], fr:'Du sel et du sucre, s’il vous plaît', en:'Salt and sugar, please' },
  rv_a1_219:{ chunks:['ผม','เอา','ผัดไทย','ครับ'], fr:'Je prends un pad thaï', en:'I’ll have the pad thai' },
  rv_a1_220:{ chunks:['ผม','อยาก','กิน','ปลา','ครับ'], fr:'Je voudrais manger du poisson', en:'I’d like to eat fish' },
  rv_a1_221:{ chunks:['ผม','อยาก','ดื่ม','กาแฟ','ครับ'], fr:'Je voudrais boire un café', en:'I’d like to drink coffee' },
  rv_a1_222:{ chunks:['คุณ','อยาก','กิน','อะไร','ครับ'], fr:'Que veux-tu manger ?', en:'What would you like to eat?' },
  rv_a1_223:{ chunks:['คุณ','อยาก','ดื่ม','อะไร','ครับ'], fr:'Que veux-tu boire ?', en:'What would you like to drink?' },
  rv_a1_224:{ chunks:['คุณ','อยาก','กิน','ขนม','ไหม','ครับ'], fr:'Veux-tu une friandise ?', en:'Would you like a sweet?' },

  /* — refuser, nuancer — */
  rv_a1_225:{ chunks:['ผม','ไม่','กิน','หมู','ครับ'], fr:'Je ne mange pas de porc', en:'I don’t eat pork' },
  rv_a1_226:{ chunks:['ฉัน','ไม่','ดื่ม','เบียร์','ค่ะ'], fr:'Je ne bois pas de bière', en:'I don’t drink beer' },
  rv_a1_227:{ chunks:['ผม','ไม่','กิน','กุ้ง','และ','ไม่','กิน','ปลา'], fr:'Je ne mange ni crevettes ni poisson', en:'I eat neither prawns nor fish' },
  rv_a1_228:{ chunks:['ผม','กิน','ไก่','แต่','ไม่','กิน','เนื้อ'], fr:'Je mange du poulet mais pas de bœuf', en:'I eat chicken but not beef' },
  rv_a1_229:{ chunks:['ผม','ไม่','กิน','เพราะ','ไม่','หิว','ครับ'], fr:'Je ne mange pas parce que je n’ai pas faim', en:'I’m not eating because I’m not hungry' },

  /* — goûts et jugements — */
  rv_a1_230:{ chunks:['ส้มตำ','เผ็ด','มาก','ครับ'], fr:'La salade de papaye est très épicée', en:'The papaya salad is very spicy' },
  rv_a1_231:{ chunks:['ผัดไทย','อร่อย','มาก','ครับ'], fr:'Le pad thaï est très bon', en:'The pad thai is very tasty' },
  rv_a1_232:{ chunks:['ก๋วยเตี๋ยว','อร่อย','ไหม','ครับ'], fr:'La soupe de nouilles est-elle bonne ?', en:'Is the noodle soup tasty?' },
  rv_a1_233:{ chunks:['อาหาร','ไทย','เผ็ด','ไหม','ครับ'], fr:'La cuisine thaïe est-elle épicée ?', en:'Is Thai food spicy?' },
  rv_a1_234:{ chunks:['ขนม','หวาน','มาก','ครับ'], fr:'La friandise est très sucrée', en:'The sweet is very sugary' },
  rv_a1_235:{ chunks:['ผัก','ไม่','เผ็ด','ครับ'], fr:'Les légumes ne sont pas épicés', en:'The vegetables aren’t spicy' },
  rv_a1_236:{ chunks:['ส้มตำ','เปรี้ยว','และ','เผ็ด'], fr:'La salade de papaye est acide et épicée', en:'The papaya salad is sour and spicy' },
  rv_a1_237:{ chunks:['อาหาร','เค็ม','มาก','ครับ'], fr:'Le plat est très salé', en:'The dish is very salty' },
  rv_a1_238:{ chunks:['ผลไม้','หวาน','มาก','ครับ'], fr:'Les fruits sont très sucrés', en:'The fruit is very sweet' },

  /* — faim, satiété, et les mots de liaison qui vont avec — */
  rv_a1_239:{ chunks:['ผม','หิว','และ','อยาก','กิน','ข้าว'], fr:'J’ai faim et je veux manger du riz', en:'I’m hungry and I want to eat rice' },
  rv_a1_240:{ chunks:['ผม','อิ่ม','แต่','อยาก','กิน','ขนม'], fr:'Je suis rassasié mais je veux une friandise', en:'I’m full but I want a sweet' },
  rv_a1_241:{ chunks:['คุณ','หิว','หรือ','อิ่ม','ครับ'], fr:'As-tu faim ou es-tu rassasié ?', en:'Are you hungry or full?' },
  rv_a1_242:{ chunks:['ผม','หิว','ดังนั้น','ผม','กิน','ข้าว'], fr:'J’ai faim, donc je mange du riz', en:'I’m hungry, so I eat rice' },
  rv_a1_243:{ chunks:['ถ้า','เผ็ด','ผม','ไม่','กิน','ครับ'], fr:'Si c’est épicé, je ne mange pas', en:'If it’s spicy, I won’t eat it' },
  rv_a1_244:{ chunks:['เมื่อ','ผม','หิว','ผม','กิน','ขนม'], fr:'Quand j’ai faim, je mange une friandise', en:'When I’m hungry I eat a sweet' },
  rv_a1_245:{ chunks:['ผม','อยาก','กิน','ส้มตำ','แต่','เผ็ด','มาก'], fr:'Je veux manger de la salade de papaye, mais c’est très épicé', en:'I want papaya salad, but it’s very spicy' },
  rv_a1_246:{ chunks:['คุณ','กิน','ไก่','หรือ','ปลา','ครับ'], fr:'Manges-tu du poulet ou du poisson ?', en:'Do you eat chicken or fish?' },
  rv_a1_247:{ chunks:['ผม','กิน','ข้าว','กับ','ผัก'], fr:'Je mange du riz avec des légumes', en:'I eat rice with vegetables' },
  rv_a1_248:{ chunks:['ฉัน','ดื่ม','กาแฟ','กับ','นม','ค่ะ'], fr:'Je bois du café avec du lait', en:'I drink coffee with milk' },
  rv_a1_249:{ chunks:['ถึงแม้ว่า','เผ็ด','ผม','ก็','กิน','ครับ'], fr:'Bien que ce soit épicé, je mange quand même', en:'Even though it’s spicy, I still eat it' },
  rv_a1_250:{ chunks:['นอกจาก','ข้าว','ผม','กิน','ผัก','ด้วย'], fr:'À part le riz, je mange aussi des légumes', en:'Besides rice, I also eat vegetables' },

  /* — prix et nombres — */
  rv_a1_251:{ chunks:['ก๋วยเตี๋ยว','เท่าไหร่','ครับ'], fr:'Combien coûte la soupe de nouilles ?', en:'How much is the noodle soup?' },
  rv_a1_252:{ chunks:['อาหาร','เท่าไหร่','ครับ'], fr:'Combien coûte le repas ?', en:'How much is the food?' },
  rv_a1_253:{ chunks:['ผัดไทย','ห้า','สิบ','บาท','ครับ'], fr:'Le pad thaï coûte cinquante bahts', en:'The pad thai is fifty baht' },
  rv_a1_254:{ chunks:['ขนม','ยี่สิบ','บาท','ครับ'], fr:'La friandise coûte vingt bahts', en:'The sweet is twenty baht' },
  rv_a1_255:{ chunks:['เบียร์','หนึ่ง','ร้อย','บาท','ครับ'], fr:'La bière coûte cent bahts', en:'The beer is one hundred baht' },
  rv_a1_256:{ chunks:['ผัดไทย','กี่','บาท','ครับ'], fr:'Le pad thaï, combien de bahts ?', en:'How many baht is the pad thai?' },

  /* — questions du quotidien — */
  rv_a1_257:{ chunks:['ใคร','หิว','ครับ'], fr:'Qui a faim ?', en:'Who is hungry?' },
  rv_a1_258:{ chunks:['คุณ','กิน','ข้าว','เมื่อไหร่','ครับ'], fr:'Quand manges-tu ?', en:'When do you eat?' },
  rv_a1_259:{ chunks:['คุณ','กิน','ข้าว','กับ','ใคร','ครับ'], fr:'Avec qui manges-tu ?', en:'Who do you eat with?' },
  rv_a1_260:{ chunks:['ทำไม','คุณ','ไม่','ดื่ม','ครับ'], fr:'Pourquoi ne bois-tu pas ?', en:'Why aren’t you drinking?' },
  rv_a1_261:{ chunks:['ร้านอาหาร','อยู่','ที่ไหน','ครับ'], fr:'Où est le restaurant ?', en:'Where is the restaurant?' },
  rv_a1_262:{ chunks:['สวัสดี','ครับ','สบายดี','ไหม','ครับ'], fr:'Bonjour, comment vas-tu ?', en:'Hello, how are you?' },
  rv_a1_263:{ chunks:['ขอโทษ','ครับ','ผม','ไม่','หิว'], fr:'Pardon, je n’ai pas faim', en:'Sorry, I’m not hungry' },
  rv_a1_264:{ chunks:['ขอบคุณ','ครับ','อร่อย','มาก'], fr:'Merci, c’était très bon', en:'Thank you, it was delicious' },
  rv_a1_265:{ chunks:['ราตรีสวัสดิ์','ครับ'], fr:'Bonne nuit', en:'Good night' },
  rv_a1_266:{ chunks:['ลาก่อน','ครับ','โชคดี','ครับ'], fr:'Au revoir, bonne chance', en:'Goodbye, good luck' }

}});

/* ---------- palier A1 — les onze premières leçons ----------
   Vocabulaire strictement limité aux leçons 1 à 11 (politesse,
   pronoms, gens, mots interrogatifs, nombres et prix, กิน/ดื่ม et
   les premières boissons). C'est la fenêtre où la bascule vers la
   composition se produit : sans ces phrases, la séance repasse
   deux à trois fois sur les mêmes.                                */
ajouterPalier({ palier:'a1', revision:{

  rv_a1_301:{ chunks:['คุณ','กิน','ข้าว','ไหม','ครับ'], fr:'Manges-tu du riz ?', en:'Do you eat rice?' },
  rv_a1_302:{ chunks:['คุณ','ดื่ม','กาแฟ','ไหม','ครับ'], fr:'Bois-tu du café ?', en:'Do you drink coffee?' },
  rv_a1_303:{ chunks:['ผม','ดื่ม','กาแฟ','ครับ'], fr:'Je bois du café', en:'I drink coffee' },
  rv_a1_304:{ chunks:['ฉัน','ดื่ม','น้ำ','ค่ะ'], fr:'Je bois de l’eau', en:'I drink water' },
  rv_a1_305:{ chunks:['เด็ก','กิน','ข้าว'], fr:'L’enfant mange du riz', en:'The child eats rice' },
  rv_a1_306:{ chunks:['ครู','ดื่ม','ชา'], fr:'Le professeur boit du thé', en:'The teacher drinks tea' },
  rv_a1_307:{ chunks:['นักเรียน','ดื่ม','น้ำ'], fr:'L’élève boit de l’eau', en:'The student drinks water' },
  rv_a1_308:{ chunks:['ผู้ชาย','กิน','ข้าว'], fr:'L’homme mange du riz', en:'The man eats rice' },
  rv_a1_309:{ chunks:['ผู้หญิง','ดื่ม','กาแฟ'], fr:'La femme boit du café', en:'The woman drinks coffee' },
  rv_a1_310:{ chunks:['เพื่อน','ดื่ม','ชา'], fr:'Mon ami boit du thé', en:'My friend drinks tea' },
  rv_a1_311:{ chunks:['เรา','กิน','ข้าว','ครับ'], fr:'Nous mangeons du riz', en:'We eat rice' },
  rv_a1_312:{ chunks:['พวกเขา','ดื่ม','น้ำ'], fr:'Ils boivent de l’eau', en:'They drink water' },
  rv_a1_313:{ chunks:['เขา','กิน','ข้าว','ไหม','ครับ'], fr:'Mange-t-il du riz ?', en:'Does he eat rice?' },
  rv_a1_314:{ chunks:['ใคร','ดื่ม','กาแฟ','ครับ'], fr:'Qui boit du café ?', en:'Who drinks coffee?' },
  rv_a1_315:{ chunks:['ใคร','กิน','ข้าว','ครับ'], fr:'Qui mange du riz ?', en:'Who eats rice?' },
  rv_a1_316:{ chunks:['เขา','ชื่อ','อะไร','ครับ'], fr:'Comment s’appelle-t-il ?', en:'What is his name?' },
  rv_a1_317:{ chunks:['คุณ','กี่','คน','ครับ'], fr:'Vous êtes combien ?', en:'How many of you are there?' },
  rv_a1_318:{ chunks:['ข้าว','เท่าไหร่','ครับ'], fr:'Combien coûte le riz ?', en:'How much is the rice?' },
  rv_a1_319:{ chunks:['กาแฟ','เท่าไหร่','ครับ'], fr:'Combien coûte le café ?', en:'How much is the coffee?' },
  rv_a1_320:{ chunks:['ชา','สิบ','บาท','ครับ'], fr:'Le thé coûte dix bahts', en:'The tea is ten baht' },
  rv_a1_321:{ chunks:['ข้าว','ยี่สิบ','บาท','ครับ'], fr:'Le riz coûte vingt bahts', en:'The rice is twenty baht' },
  rv_a1_322:{ chunks:['กาแฟ','สี่','สิบ','บาท','ครับ'], fr:'Le café coûte quarante bahts', en:'The coffee is forty baht' },
  rv_a1_323:{ chunks:['น้ำ','ห้า','บาท','ครับ'], fr:'L’eau coûte cinq bahts', en:'The water is five baht' },
  rv_a1_324:{ chunks:['ผม','สบายดี','ครับ','ขอบคุณ'], fr:'Je vais bien, merci', en:'I’m fine, thank you' },
  rv_a1_325:{ chunks:['ฉัน','สบายดี','ค่ะ','ขอบคุณ'], fr:'Je vais bien, merci', en:'I’m fine, thank you' },
  rv_a1_326:{ chunks:['เขา','ไม่','ใช่','นักเรียน'], fr:'Il n’est pas élève', en:'He is not a student' },
  rv_a1_327:{ chunks:['ขอโทษ','ครับ','ผม','ไม่','ใช่','ครู'], fr:'Pardon, je ne suis pas professeur', en:'Sorry, I’m not a teacher' },
  rv_a1_328:{ chunks:['ทำไม','คุณ','ไม่','ดื่ม','น้ำ','ครับ'], fr:'Pourquoi ne bois-tu pas d’eau ?', en:'Why don’t you drink water?' },
  rv_a1_329:{ chunks:['คุณ','ดื่ม','ชา','เมื่อไหร่','ครับ'], fr:'Quand bois-tu du thé ?', en:'When do you drink tea?' },
  rv_a1_330:{ chunks:['ไม่เป็นไร','ครับ','ขอบคุณ'], fr:'Ce n’est rien, merci', en:'It’s nothing, thank you' }

}});
