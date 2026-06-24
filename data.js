/* =====================================================================
 *  data.js: scenario data for D-Day, the Normandy landings, 6 June 1944
 *  ---------------------------------------------------------------------
 *  Pure data, no logic. Consumed via window.BATTLE_DATA (config.js re-exports it as D).
 *  Facts compiled and cross-checked against the sources listed in notes.sources.
 *
 *  Languages are builder-selected via `langs` (below). For this build the pair is
 *  Traditional Chinese + English: the bilingual fields carry `_zh` = 繁體中文 (the
 *  secondary language) and `_en` = English (the primary). The `_zh`/`_en` field
 *  NAMES are an engine legacy; `langs` supplies the human toggle labels.
 *
 *  Coordinates are REAL WGS84 lng/lat (projected to scale via Web Mercator
 *  in projection.js). Timeline day key `d` = fractional day of June 1944
 *  (6.0 = 00:00 on 6 June; the tail runs to ~9 June as the beachhead links up).
 * ===================================================================== */
window.BATTLE_DATA = (function () {

  const GE = "ge", AL = "al";   // faction ids: ge = Germans (defender), al = Allies (attacker).

  /* -- meta: map box + clock + identity + cinematic look (the engine reads it all from here) -- *
   *  geo == tools/fetch_tiles footprint; clock is fractional June 1944 (6.0 = 00:00 on 6 June).
   *  Migrated from the old forked engine's config.js (CFG.GEO / DAY / GRADE). */
  const meta = {
    geo:{ minLng:-1.50, maxLng:-0.10, minLat:49.13, maxLat:49.45, Z:13 },
    dayMin:6, dayMax:9.5, year:1944, month:6, lastDay:9, vexag:8.0,
    title:"諾曼第登陸", subtitle:"D-DAY · THE NORMANDY LANDINGS · 6 JUNE 1944",
    dir:"ltr",
    fonts:{ display:'"Microsoft JhengHei","PingFang TC","Noto Sans TC","Heiti TC",sans-serif',
            mono:'"Consolas","SFMono-Regular",ui-monospace,monospace' },
    theme:{ sky:{ day:0x6f9fd0, dayB:0xcad9e2, night:0x10182c, nightB:0x243349, over:0x5a6470, overB:0x808a92 },
            smoke:0x4a3f3a, sea:0x14323f, sun:{ day:0xfff1d6, night:0x8ea6cf }, amb:{ day:0x404a55, night:0x1c2a44 },
            grade:{ filter:"sepia(0.26) saturate(0.78) contrast(1.04) brightness(1.40)", vignette:0.22, grain:0.04 } },
  };

  /* -- factions: colours VERBATIM from the old engine FAC; names/role from the old data; *
   *  maxStrength is a derived display normaliser (a round ceiling ≥ the max unit strength per side). */
  const factions = {
    al:{ main:0x3b7be2, glow:0x5aa0ff, dim:0x1f3f7a, css:"#3b7be2", name_zh:"盟軍", name_en:"Allies",  role:"attacker", maxStrength:30000, defaultFlag:"union"   },
    ge:{ main:0xe23b3b, glow:0xff6a5a, dim:0x7a1f1f, css:"#e23b3b", name_zh:"德軍", name_en:"Germans", role:"defender", maxStrength:16000, defaultFlag:"germany" },
  };

  /* -- ui: engine-rendered strings; omitted keys default to English via DEFAULT_UI. langToggle *
   *  carries the old `langs` toggle (中／EN). The HUD chrome is painted by the engine's buildChrome. */
  const ui = {
    frontLine:{ zh:"戰線", en:"Front line" },
    langToggle:{ both:"中／EN", zh:"中文", en:"EN" },
  };

  /* -- intro: the opening title card + establishing camera over the Calvados coast. ---------- */
  const intro = { title_zh:"諾曼第登陸", title_en:"D-DAY · THE NORMANDY LANDINGS",
    sub_zh:"1944年6月6日 · 大君主行動", sub_en:"6 June 1944 · Operation Overlord",
    cam:{ lng:-0.65, lat:49.36, dist:2800, az:0, el:50 } };

  /* -- flagLegend: the per-force flag swatches in the legend (each names its flag id + faction). */
  const flagLegend = [
    { flag:"us",      zh:"美軍",     en:"United States",  faction:"al" },
    { flag:"union",   zh:"英軍",     en:"United Kingdom", faction:"al" },
    { flag:"canada",  zh:"加拿大軍", en:"Canada",         faction:"al" },
    { flag:"france",  zh:"自由法國", en:"Free France",    faction:"al" },
    { flag:"rn",      zh:"皇家海軍", en:"Royal Navy",     faction:"al" },
    { flag:"germany", zh:"德軍",     en:"Germany",        faction:"ge" },
  ];

  /* -- geography (real lng/lat) ------------------------------------ */
  const geography = {
    regions: [
      { name_en: "Cotentin Peninsula", name_zh: "科唐坦半島",   type: "peninsula", lng:-1.30, lat:49.38, h:0 },
      { name_en: "Bay of the Seine",   name_zh: "塞納灣",       type: "harbour",   lng:-0.78, lat:49.44, h:0 },
      { name_en: "Calvados Coast",     name_zh: "卡爾瓦多斯海岸", type: "region",    lng:-0.46, lat:49.37, h:0 },
      { name_en: "Caen Plain",         name_zh: "卡昂平原",     type: "region",    lng:-0.33, lat:49.19, h:0 },
    ],
    points: [
      /* the five landing beaches (west → east) */
      { name_en: "Utah Beach",  name_zh: "猶他海灘",  type:"bay", lng:-1.175, lat:49.415, h:0 },
      { name_en: "Omaha Beach", name_zh: "奧馬哈海灘", type:"bay", lng:-0.855, lat:49.370, h:0 },
      { name_en: "Gold Beach",  name_zh: "黃金海灘",  type:"bay", lng:-0.580, lat:49.340, h:0 },
      { name_en: "Juno Beach",  name_zh: "朱諾海灘",  type:"bay", lng:-0.456, lat:49.337, h:0 },
      { name_en: "Sword Beach", name_zh: "寶劍海灘",  type:"bay", lng:-0.290, lat:49.295, h:0 },
      /* German strongpoints / Atlantic-Wall batteries */
      { name_en: "Pointe du Hoc",     name_zh: "奧克角",     type:"fort", lng:-0.989, lat:49.396, h:0 },
      { name_en: "Longues Battery",   name_zh: "朗格砲台",   type:"fort", lng:-0.690, lat:49.343, h:0 },
      { name_en: "Merville Battery",  name_zh: "梅維爾砲台", type:"fort", lng:-0.196, lat:49.270, h:0 },
      { name_en: "Pegasus Bridge",    name_zh: "佩加索斯橋", type:"fort", lng:-0.274, lat:49.242, h:0 },
      /* towns */
      { name_en: "Sainte-Mère-Église",name_zh: "聖梅爾埃格利斯", type:"town", lng:-1.316, lat:49.408, h:0 },
      { name_en: "Carentan",          name_zh: "卡朗唐",     type:"town", lng:-1.245, lat:49.303, h:0 },
      { name_en: "Arromanches",       name_zh: "阿羅芒什",   type:"town", lng:-0.617, lat:49.339, h:0 },
      { name_en: "Bayeux",            name_zh: "巴約",       type:"town", lng:-0.703, lat:49.277, h:0 },
      { name_en: "Ouistreham",        name_zh: "烏伊斯特勒昂", type:"town", lng:-0.247, lat:49.279, h:0 },
      { name_en: "Ranville",          name_zh: "朗維爾",     type:"town", lng:-0.255, lat:49.232, h:0 },
      { name_en: "Caen",              name_zh: "卡昂",       type:"town", lng:-0.370, lat:49.183, h:0 },
    ],
    lines: [
      // lines[0] is the engine's primary defensive line; terrain.js reads its name + draws it in the defender's colour.
      { name_en: "Atlantic Wall", name_zh: "大西洋壁壘", color:"#d8766f",
        path: [[-1.175,49.415],[-0.989,49.396],[-0.855,49.370],[-0.690,49.343],
               [-0.580,49.340],[-0.456,49.337],[-0.290,49.295],[-0.196,49.270]] },
    ],
  };

  /* -- units (track keyframes: {d, lng, lat, s, st}) --------------- *
   *  state: march | hold | attack | retreat | landing | dead
   *  cf = counts toward the aggregate force meter
   *  Strengths are approximate D-Day-committed / landed figures (see notes).
   * ---------------------------------------------------------------- */
  const units = [
    /* ===================== ALLIES (blue) ===================== */
    { id:"al_usfirst", faction:AL, kind:"command", flag:"us", cf:false,
      name_zh:"美軍第1集團軍", name_en:"US First Army", type:"Army HQ (afloat)",
      commander:{ zh:"布萊德雷中將", en:"Lt-Gen Omar Bradley", rank:"Lieutenant General" },
      note:"指揮美軍灘頭（猶他、奧馬哈），坐鎮海上的「奧古斯塔」號重巡洋艦。",
      track:[ {d:6,lng:-0.86,lat:49.445,s:0,st:"hold"}, {d:9,lng:-0.86,lat:49.43,s:0,st:"hold"} ] },

    { id:"al_brsecond", faction:AL, kind:"command", flag:"union", cf:false,
      name_zh:"英軍第2集團軍", name_en:"British Second Army", type:"Army HQ",
      commander:{ zh:"鄧普西中將", en:"Lt-Gen Miles Dempsey", rank:"Lieutenant General" },
      note:"指揮英加灘頭（黃金、朱諾、寶劍）及卡昂方向的進攻。",
      track:[ {d:6,lng:-0.42,lat:49.445,s:0,st:"hold"}, {d:9,lng:-0.42,lat:49.40,s:0,st:"hold"} ] },

    { id:"al_82ab", faction:AL, kind:"infantry", flag:"us", cf:true,
      name_zh:"第82空降師", name_en:"82nd Airborne Division", type:"US Airborne Division",
      commander:{ zh:"李奇威少將", en:"Maj-Gen Matthew Ridgway", rank:"Major General" },
      note:"午夜後空降科唐坦半島；第505傘兵團攻取聖梅爾埃格利斯，法國首座獲解放的市鎮（約04:30）。",
      track:[ {d:6.05,lng:-1.330,lat:49.410,s:7000,st:"landing"}, {d:6.18,lng:-1.316,lat:49.408,s:6900,st:"attack"},
              {d:6.5,lng:-1.300,lat:49.400,s:6700,st:"attack"}, {d:7,lng:-1.290,lat:49.380,s:6500,st:"hold"},
              {d:9,lng:-1.270,lat:49.360,s:6200,st:"attack"} ] },

    { id:"al_101ab", faction:AL, kind:"infantry", flag:"us", cf:true,
      name_zh:"第101空降師", name_en:"101st Airborne Division", type:"US Airborne Division",
      commander:{ zh:"泰勒少將", en:"Maj-Gen Maxwell Taylor", rank:"Major General" },
      note:"空降猶他灘後方，扼守氾濫沼澤間的堤道，打通往卡朗唐的灘頭出口。",
      track:[ {d:6.05,lng:-1.240,lat:49.375,s:6600,st:"landing"}, {d:6.3,lng:-1.210,lat:49.400,s:6400,st:"attack"},
              {d:6.6,lng:-1.225,lat:49.360,s:6200,st:"attack"}, {d:7.5,lng:-1.240,lat:49.330,s:6000,st:"attack"},
              {d:9,lng:-1.245,lat:49.315,s:5800,st:"attack"} ] },

    { id:"al_6ab", faction:AL, kind:"infantry", flag:"union", cf:true,
      name_zh:"英軍第6空降師", name_en:"6th Airborne Division", type:"British Airborne Division",
      commander:{ zh:"蓋爾少將", en:"Maj-Gen Richard Gale", rank:"Major General" },
      note:"扼守奧恩河以東：霍華德少校奇襲佩加索斯橋（00:16），奧特威強攻梅維爾砲台；死守東翼。",
      track:[ {d:6.0,lng:-0.260,lat:49.236,s:7000,st:"landing"}, {d:6.02,lng:-0.274,lat:49.242,s:7000,st:"attack"},
              {d:6.15,lng:-0.196,lat:49.270,s:6700,st:"attack"}, {d:6.5,lng:-0.255,lat:49.232,s:6500,st:"hold"},
              {d:9,lng:-0.262,lat:49.240,s:6300,st:"hold"} ] },

    { id:"al_4inf", faction:AL, kind:"infantry", flag:"us", cf:true,
      name_zh:"第4步兵師", name_en:"4th Infantry Division", type:"US Infantry Division (Utah)",
      commander:{ zh:"雷蒙·巴頓少將", en:"Maj-Gen Raymond Barton", rank:"Major General" },
      note:"於登陸時刻（06:30）在猶他登陸，偏南數里卻落在防禦薄弱地段，迅即與空降部隊會師。",
      track:[ {d:6.0,lng:-1.175,lat:49.440,s:21000,st:"hold"}, {d:6.27,lng:-1.175,lat:49.415,s:21000,st:"landing"},
              {d:6.5,lng:-1.200,lat:49.408,s:20500,st:"attack"}, {d:7,lng:-1.240,lat:49.398,s:20000,st:"attack"},
              {d:9,lng:-1.260,lat:49.370,s:19500,st:"attack"} ] },

    { id:"al_1inf", faction:AL, kind:"infantry", flag:"us", cf:true,
      name_zh:"第1步兵師", name_en:"1st Infantry Division", type:"US Infantry Division (Omaha E)",
      commander:{ zh:"休伯納少將", en:"Maj-Gen Clarence Huebner", rank:"Major General" },
      note:"「大紅一師」攻奧馬哈東段——D日最血腥的灘頭，正面是德軍第352師。",
      track:[ {d:6.0,lng:-0.840,lat:49.445,s:17000,st:"hold"}, {d:6.27,lng:-0.840,lat:49.370,s:17000,st:"landing"},
              {d:6.5,lng:-0.840,lat:49.360,s:15500,st:"attack"}, {d:6.9,lng:-0.830,lat:49.340,s:15000,st:"attack"},
              {d:9,lng:-0.820,lat:49.310,s:14500,st:"attack"} ] },

    { id:"al_29inf", faction:AL, kind:"infantry", flag:"us", cf:true,
      name_zh:"第29步兵師", name_en:"29th Infantry Division", type:"US Infantry Division (Omaha W)",
      commander:{ zh:"格哈特少將", en:"Maj-Gen Charles Gerhardt", rank:"Major General" },
      note:"奧馬哈西段（維耶維爾）；一度被壓制於灘頭，上午中段才攻上崖壁。",
      track:[ {d:6.0,lng:-0.885,lat:49.445,s:17000,st:"hold"}, {d:6.27,lng:-0.885,lat:49.370,s:17000,st:"landing"},
              {d:6.5,lng:-0.900,lat:49.360,s:15500,st:"attack"}, {d:6.9,lng:-0.920,lat:49.350,s:15000,st:"attack"},
              {d:9,lng:-0.950,lat:49.340,s:14500,st:"attack"} ] },

    { id:"al_rangers", faction:AL, kind:"infantry", flag:"us", cf:true,
      name_zh:"第2遊騎兵營", name_en:"2nd Ranger Battalion", type:"US Rangers (Pointe du Hoc)",
      commander:{ zh:"拉德中校", en:"Lt-Col James Rudder", rank:"Lieutenant-Colonel" },
      note:"冒砲火攀上奧克角三十米峭壁；德軍大砲早已移往內陸。傷亡極重。",
      track:[ {d:6.0,lng:-0.989,lat:49.440,s:225,st:"hold"}, {d:6.30,lng:-0.989,lat:49.396,s:225,st:"landing"},
              {d:6.5,lng:-0.989,lat:49.394,s:135,st:"attack"}, {d:7,lng:-0.985,lat:49.392,s:90,st:"hold"},
              {d:9,lng:-0.982,lat:49.390,s:90,st:"hold"} ] },

    { id:"al_50inf", faction:AL, kind:"infantry", flag:"union", cf:true,
      name_zh:"第50（諾森布里亞）師", name_en:"50th (Northumbrian) Division", type:"British Infantry Division (Gold)",
      commander:{ zh:"格雷厄姆少將", en:"Maj-Gen Douglas Graham", rank:"Major General" },
      note:"於黃金灘登陸（07:25）；向內陸推進，6月7日解放巴約，法國首座獲解放且完好無損的城市。",
      track:[ {d:6.0,lng:-0.580,lat:49.445,s:25000,st:"hold"}, {d:6.33,lng:-0.580,lat:49.340,s:25000,st:"landing"},
              {d:6.6,lng:-0.600,lat:49.320,s:24000,st:"attack"}, {d:7.5,lng:-0.703,lat:49.277,s:23000,st:"attack"},
              {d:9,lng:-0.700,lat:49.250,s:22500,st:"hold"} ] },

    { id:"al_3cad", faction:AL, kind:"infantry", flag:"canada", cf:true,
      name_zh:"加拿大第3步兵師", name_en:"3rd Canadian Infantry Division", type:"Canadian Infantry Division (Juno)",
      commander:{ zh:"凱勒少將", en:"Maj-Gen Rod Keller", rank:"Major General" },
      note:"冒礁石於朱諾登陸（約07:45）；當日深入內陸最遠的一支。",
      track:[ {d:6.0,lng:-0.456,lat:49.445,s:21400,st:"hold"}, {d:6.36,lng:-0.456,lat:49.337,s:21400,st:"landing"},
              {d:6.7,lng:-0.460,lat:49.285,s:20500,st:"attack"}, {d:7,lng:-0.470,lat:49.245,s:20000,st:"attack"},
              {d:9,lng:-0.460,lat:49.225,s:19500,st:"attack"} ] },

    { id:"al_3brit", faction:AL, kind:"infantry", flag:"union", cf:true,
      name_zh:"英軍第3步兵師", name_en:"3rd Infantry Division", type:"British Infantry Division (Sword)",
      commander:{ zh:"倫尼少將", en:"Maj-Gen Tom Rennie", rank:"Major General" },
      note:"於寶劍灘登陸（07:25），直指D日目標卡昂，卻受第21裝甲師阻擊，止步城下。",
      track:[ {d:6.0,lng:-0.290,lat:49.445,s:29000,st:"hold"}, {d:6.33,lng:-0.290,lat:49.295,s:29000,st:"landing"},
              {d:6.7,lng:-0.300,lat:49.260,s:28000,st:"attack"}, {d:6.9,lng:-0.320,lat:49.230,s:27000,st:"hold"},
              {d:9,lng:-0.330,lat:49.220,s:26500,st:"hold"} ] },

    { id:"al_freefrench", faction:AL, kind:"infantry", flag:"france", cf:true,
      name_zh:"自由法國突擊隊（基弗）", name_en:"Free French Commandos (Kieffer)", type:"Free French Commando",
      commander:{ zh:"基弗少校", en:"Lt-Cdr Philippe Kieffer", rank:"Capitaine de corvette" },
      note:"基弗麾下177名法國海軍陸戰隊員於寶劍灘登陸，解放烏伊斯特勒昂——登陸部隊中唯一的法軍。",
      track:[ {d:6.33,lng:-0.290,lat:49.295,s:177,st:"landing"}, {d:6.5,lng:-0.250,lat:49.279,s:160,st:"attack"},
              {d:6.9,lng:-0.268,lat:49.250,s:150,st:"attack"}, {d:9,lng:-0.262,lat:49.240,s:145,st:"hold"} ] },

    { id:"al_navy", faction:AL, kind:"navy", flag:"rn", cf:true,
      name_zh:"盟軍海軍（海王星行動）", name_en:"Allied Naval Forces (Neptune)", type:"Bombardment & Assault Fleet",
      commander:{ zh:"拉姆齊上將", en:"Adm Sir Bertram Ramsay", rank:"Admiral" },
      note:"海王星行動：近七千艘艦船。約05:30海軍砲轟開火，掩護登陸。",
      track:[ {d:6.0,lng:-0.600,lat:49.448,s:8000,st:"hold"}, {d:6.23,lng:-0.600,lat:49.445,s:8000,st:"attack"},
              {d:6.5,lng:-0.600,lat:49.445,s:8000,st:"attack"}, {d:9,lng:-0.600,lat:49.447,s:7000,st:"hold"} ] },

    /* ===================== GERMANS (red) ===================== */
    { id:"ge_84corps", faction:GE, kind:"command", flag:"germany", cf:false,
      name_zh:"第84軍", name_en:"LXXXIV Corps", type:"Corps HQ",
      commander:{ zh:"馬克斯將軍", en:"Gen. Erich Marcks", rank:"General der Artillerie" },
      note:"統籌諾曼第守備。隆美爾（B集團軍群）當日不在；裝甲預備隊遲遲未獲放行。",
      track:[ {d:6,lng:-0.450,lat:49.160,s:0,st:"hold"}, {d:9,lng:-0.450,lat:49.160,s:0,st:"hold"} ] },

    { id:"ge_716", faction:GE, kind:"infantry", flag:"germany", cf:true,
      name_zh:"第716靜態師", name_en:"716th Static Division", type:"German Static Division",
      commander:{ zh:"里希特中將", en:"Lt-Gen Wilhelm Richter", rank:"Generalleutnant" },
      note:"守備黃金—朱諾—寶劍沿岸及卡昂。兵力分散、裝備不足，在英加進攻下被淹沒。",
      track:[ {d:6.0,lng:-0.420,lat:49.310,s:7000,st:"hold"}, {d:6.4,lng:-0.420,lat:49.300,s:6000,st:"attack"},
              {d:6.9,lng:-0.400,lat:49.260,s:4000,st:"retreat"}, {d:9,lng:-0.400,lat:49.220,s:2500,st:"retreat"} ] },

    { id:"ge_352", faction:GE, kind:"infantry", flag:"germany", cf:true,
      name_zh:"第352步兵師", name_en:"352nd Infantry Division", type:"German Infantry Division",
      commander:{ zh:"克萊斯中將", en:"Lt-Gen Dietrich Kraiss", rank:"Generalleutnant" },
      note:"久經沙場的野戰師，新近進駐而盟軍情報未察；在奧馬哈給美軍造成慘重傷亡。",
      track:[ {d:6.0,lng:-0.800,lat:49.340,s:12000,st:"hold"}, {d:6.3,lng:-0.820,lat:49.350,s:12000,st:"attack"},
              {d:6.7,lng:-0.780,lat:49.330,s:10000,st:"attack"}, {d:6.95,lng:-0.750,lat:49.310,s:8000,st:"hold"},
              {d:9,lng:-0.700,lat:49.280,s:6000,st:"retreat"} ] },

    { id:"ge_709", faction:GE, kind:"infantry", flag:"germany", cf:true,
      name_zh:"第709靜態師", name_en:"709th Static Division", type:"German Static Division",
      commander:{ zh:"馮·施利本中將", en:"Lt-Gen K.-W. von Schlieben", rank:"Generalleutnant" },
      note:"守備科唐坦半島東岸，正面猶他。被登陸與傘兵切割包抄。",
      track:[ {d:6.0,lng:-1.200,lat:49.420,s:10000,st:"hold"}, {d:6.3,lng:-1.190,lat:49.410,s:9500,st:"attack"},
              {d:6.7,lng:-1.220,lat:49.400,s:8500,st:"hold"}, {d:9,lng:-1.270,lat:49.380,s:7000,st:"retreat"} ] },

    { id:"ge_91", faction:GE, kind:"infantry", flag:"germany", cf:true,
      name_zh:"第91空降步兵師", name_en:"91st Air-Landing Division", type:"German Air-Landing Division",
      commander:{ zh:"法利中將", en:"Lt-Gen Wilhelm Falley", rank:"Generalleutnant" },
      note:"據守科唐坦內陸，迎擊美軍傘兵。法利將軍於6月6日清晨遭傘兵伏擊陣亡。",
      track:[ {d:6.0,lng:-1.300,lat:49.380,s:8000,st:"hold"}, {d:6.15,lng:-1.310,lat:49.390,s:7800,st:"attack"},
              {d:6.5,lng:-1.300,lat:49.370,s:7000,st:"attack"}, {d:9,lng:-1.280,lat:49.340,s:5500,st:"retreat"} ] },

    { id:"ge_21pz", faction:GE, kind:"infantry", flag:"germany", cf:true,
      name_zh:"第21裝甲師", name_en:"21st Panzer Division", type:"German Panzer Division",
      commander:{ zh:"福伊希廷格中將", en:"Lt-Gen Edgar Feuchtinger", rank:"Generalleutnant" },
      note:"D日唯一一次大規模裝甲反擊：由朱諾—寶劍缺口直撲海岸，約二十時抵達濱海地帶，旋即後撤。",
      track:[ {d:6.0,lng:-0.360,lat:49.160,s:16000,st:"hold"}, {d:6.4,lng:-0.350,lat:49.190,s:16000,st:"hold"},
              {d:6.6,lng:-0.340,lat:49.240,s:15500,st:"attack"}, {d:6.8,lng:-0.330,lat:49.270,s:15000,st:"attack"},
              {d:6.95,lng:-0.350,lat:49.220,s:14500,st:"retreat"}, {d:9,lng:-0.370,lat:49.190,s:13500,st:"hold"} ] },

    { id:"ge_arty", faction:GE, kind:"artillery", flag:"germany", cf:true,
      name_zh:"大西洋壁壘砲台", name_en:"Atlantic Wall Batteries", type:"German Coastal Artillery",
      commander:{ zh:"沿岸砲台", en:"Coastal batteries", rank:"Longues · Merville · Pointe du Hoc" },
      note:"沿岸要塞砲台（朗格、梅維爾、奧克角）向艦隊開火，旋遭壓制或攻佔。",
      track:[ {d:6.0,lng:-0.690,lat:49.343,s:3000,st:"hold"}, {d:6.23,lng:-0.690,lat:49.343,s:3000,st:"attack"},
              {d:6.5,lng:-0.690,lat:49.343,s:2200,st:"attack"}, {d:6.9,lng:-0.690,lat:49.343,s:1200,st:"dead"},
              {d:9,lng:-0.690,lat:49.343,s:800,st:"dead"} ] },
  ];

  /* -- movement arrows (visibility window in entities.js updateArrows: ~0.6d before to ~1.1d after `d`); [lng,lat] --- */
  const arrows = [
    { d:6.02, f:AL, from:[-0.300,49.250], to:[-0.274,49.242], label:"第6空降師 · 佩加索斯橋", kind:"landing" },
    { d:6.08, f:AL, from:[-1.345,49.448], to:[-1.330,49.410], label:"第82/101空降師 · 空降", kind:"landing" },
    { d:6.13, f:AL, from:[-0.230,49.300], to:[-0.196,49.270], label:"奧特威 · 梅維爾砲台", kind:"attack" },
    { d:6.27, f:AL, from:[-1.175,49.448], to:[-1.175,49.415], label:"第4師 · 猶他", kind:"landing" },
    { d:6.27, f:AL, from:[-0.862,49.448], to:[-0.862,49.370], label:"第1、29師 · 奧馬哈", kind:"landing" },
    { d:6.30, f:AL, from:[-0.989,49.440], to:[-0.989,49.396], label:"遊騎兵 · 奧克角", kind:"landing" },
    { d:6.33, f:AL, from:[-0.580,49.448], to:[-0.580,49.340], label:"第50師 · 黃金", kind:"landing" },
    { d:6.36, f:AL, from:[-0.456,49.448], to:[-0.456,49.337], label:"加軍第3師 · 朱諾", kind:"landing" },
    { d:6.33, f:AL, from:[-0.290,49.448], to:[-0.290,49.295], label:"英軍第3師 · 寶劍", kind:"landing" },
    { d:6.55, f:AL, from:[-0.860,49.368], to:[-0.870,49.345], label:"奧馬哈 · 攻上崖壁", kind:"attack" },
    { d:6.60, f:GE, from:[-0.360,49.170], to:[-0.335,49.265], label:"第21裝甲師 · 反擊", kind:"attack" },
    { d:6.90, f:AL, from:[-0.300,49.270], to:[-0.345,49.205], label:"進逼卡昂", kind:"attack" },
    { d:7.50, f:AL, from:[-0.590,49.330], to:[-0.703,49.277], label:"第50師 · 巴約", kind:"march" },
  ];

  /* -- front line snapshots (latest with d<=now is drawn); [lng,lat] */
  const fronts = [
    { d:6.30, path:[[-1.160,49.405],[-0.855,49.365],[-0.580,49.335],[-0.456,49.333],[-0.290,49.292]] },
    { d:6.60, path:[[-1.210,49.395],[-0.860,49.350],[-0.580,49.305],[-0.456,49.295],[-0.300,49.262]] },
    { d:6.90, path:[[-1.260,49.385],[-0.870,49.348],[-0.600,49.275],[-0.460,49.250],[-0.290,49.240],[-0.200,49.270]] },
    { d:7.50, path:[[-1.270,49.355],[-0.950,49.330],[-0.700,49.260],[-0.470,49.235],[-0.310,49.225]] },
    { d:9.00, path:[[-1.265,49.320],[-1.000,49.300],[-0.700,49.245],[-0.460,49.220],[-0.340,49.200]] },
  ];

  /* -- effect hotspots: active while now ∈ [a,b]; [lng,lat] -------- *
   *  kind: air | artillery | firefight | landing | explosion | oilfire
   * ---------------------------------------------------------------- */
  const hotspots = [
    { a:6.01, b:6.30, lng:-0.274, lat:49.242, kind:"firefight", i:0.9 },  // Pegasus Bridge coup de main
    { a:6.05, b:6.40, lng:-1.316, lat:49.408, kind:"firefight", i:0.8 },  // Sainte-Mère-Église
    { a:6.10, b:6.35, lng:-0.196, lat:49.270, kind:"explosion", i:0.9 },  // Merville Battery assault
    { a:6.05, b:6.45, lng:-1.290, lat:49.385, kind:"firefight", i:0.6 },  // scattered Cotentin drops / 91st
    { a:6.20, b:6.55, lng:-0.690, lat:49.343, kind:"artillery", i:0.9 },  // Longues battery duels the fleet
    { a:6.23, b:6.50, lng:-0.456, lat:49.430, kind:"artillery", i:0.8 },  // naval bombardment offshore
    { a:6.27, b:6.95, lng:-0.862, lat:49.370, kind:"firefight", i:1.0 },  // OMAHA — the bloodiest, sustained
    { a:6.27, b:6.95, lng:-0.862, lat:49.372, kind:"explosion", i:0.7 },  // Omaha shellfire
    { a:6.27, b:6.55, lng:-1.175, lat:49.415, kind:"landing",   i:0.6 },  // Utah (lighter)
    { a:6.30, b:6.60, lng:-0.989, lat:49.396, kind:"firefight", i:0.8 },  // Pointe du Hoc cliff assault
    { a:6.33, b:6.80, lng:-0.456, lat:49.337, kind:"landing",   i:0.9 },  // Juno
    { a:6.33, b:6.80, lng:-0.290, lat:49.295, kind:"firefight", i:0.8 },  // Sword
    { a:6.55, b:6.95, lng:-0.335, lat:49.255, kind:"firefight", i:0.9 },  // 21st Panzer counterattack / Caen front
    { a:6.55, b:6.95, lng:-0.335, lat:49.255, kind:"explosion", i:0.6 },  // ditto, armour
  ];

  /* -- weather profile per day (interpolated) ---------------------- */
  // night = darkness MULTIPLIER (not a clock): >0.5 → moonlight tint + deep dim (true night);
  // ≤0.5 → day sun-colour, merely dimmed (dawn / overcast day). 6 June 1944 was famously overcast
  // with a rough sea and low cloud — the marginal break in the storm that Eisenhower seized.
  const weather = [
    { d:6.0,  night:0.85, fog:0.18, rain:0.05, smoke:0,    zh:"夜 · 陰雲 · 海象惡劣",   en:"Night; overcast; rough sea" },      // the airborne hours, half-moon
    { d:6.13, night:0.72, fog:0.22, rain:0.05, smoke:0.05, zh:"黎明前 · 陰雲",          en:"Before dawn; overcast" },           // Merville / Ste-Mère-Église
    { d:6.25, night:0.35, fog:0.24, rain:0.02, smoke:0.18, zh:"拂曉 · 低雲 · 砲轟",      en:"Dawn; low cloud; bombardment" },    // naval bombardment ~05:30
    { d:6.32, night:0,    fog:0.26, rain:0,    smoke:0.35, zh:"上午 · 陰天 · 硝煙",      en:"Morning; overcast; smoke" },        // H-Hour on the beaches
    { d:6.55, night:0,    fog:0.22, rain:0,    smoke:0.45, zh:"白晝 · 多雲 · 灘頭硝煙",  en:"Day; cloudy; beach smoke" },
    { d:6.85, night:0.45, fog:0.18, rain:0,    smoke:0.45, zh:"黃昏 · 漸放晴",          en:"Dusk; clearing" },                  // long northern dusk, ~21:00
    { d:7.5,  night:0,    fog:0.15, rain:0,    smoke:0.30, zh:"白晝 · 轉晴",            en:"Day; clearer" },
    { d:9.0,  night:0,    fog:0.12, rain:0,    smoke:0.20, zh:"晴朗 · 涼爽",            en:"Fair; cool" },
  ];

  /* -- summary / sourcing notes for the in-app panel (Traditional Chinese) ----- */
  const notes = {
    summary:"諾曼第登陸，1944年6月6日：大君主行動，盟軍進攻德佔法國。在盟軍最高統帥艾森豪指揮、蒙哥馬利統籌登陸下，約十五萬六千名官兵由海空兩路橫渡英倫海峽。午夜剛過，三個空降師奪取兩翼——美軍第82、101師空降科唐坦半島（聖梅爾埃格利斯），英軍第6師空降奧恩河以東（佩加索斯橋、梅維爾砲台）。登陸時刻，海上突擊強攻五處海灘：猶他、奧馬哈（美軍）、黃金（英軍）、朱諾（加軍）、寶劍（英軍），自由法國突擊隊則登陸烏伊斯特勒昂。奧馬哈面對久經沙場的德軍第352師，幾近全軍覆沒；其餘各灘則突破大西洋壁壘。入夜時，盟軍據有五處灘頭——尚未連成一線，卡昂仍在德軍手中——但已在歐陸站穩腳跟，代價是至少四千四百名盟軍將士陣亡。",
    caveats:[
      "地形為真實資料：高程取自 AWS Terrarium DEM、地表為 EOX Sentinel-2 cloudless 2016（現代衛星影像），以 Web Mercator 投影按真實比例呈現；垂直高度作 2 倍誇張以利判讀（水平比例不變）。",
      "注意：影像與高程均為現代資料。1944年的海岸線、德軍刻意氾濫（戰後已排乾）的科唐坦沼澤、大西洋壁壘工事，以及戰後建設（烏伊斯特勒昂渡輪港、阿羅芒什的人工港遺跡、現代道路）皆與1944年6月不同。灘頭與部隊位置僅按真實地名經緯度作示意。",
      "各部隊軍旗採用1944年6月各軍實際旗幟：48星美國國旗（1912–59年；48星而非50星）、1801年版英國聯合旗、1922–57年加拿大紅船旗（綠楓葉，楓葉旗為1965年）、自由法國三色旗加洛林十字，以及德軍鐵十字（巴爾肯十字，國防軍軍徽）。此處刻意採用鐵十字而非納粹十字（卐）：既符合史實、各地（含德國）合法，亦避免使用受禁符號。",
      "兵力為D日投入／登陸的概數。6月6日約十五萬六千名盟軍登陸（美軍約七萬三千、英加約八萬三千，含約二萬三千四百名空降兵）。德軍各師按代表性兵力示意，並非全數投入接戰。",
      "各部隊每日位置為配合敘事的示意化部署（錨定於真實地名經緯度），非逐時精確戰術圖。",
      "傷亡：6月6日盟軍傷亡至少一萬人，當中四千四百一十四人確認陣亡（美軍二千五百零一、其他盟軍一千九百一十三），據美國國家D日紀念碑陣亡名錄。",
    ],
    sources:"地理：AWS Terrarium 高程瓦片（SRTM，USGS 提供）、EOX Sentinel-2 cloudless 2016（含經修改之 Copernicus Sentinel 資料，CC BY 4.0）。史實：維基百科『Normandy landings』、Gordon A. Harrison《Cross-Channel Attack》（美國陸軍軍史中心）、Cornelius Ryan《最長的一天》、帝國戰爭博物館、美國二戰博物館、朱諾海灘中心、美國國家D日紀念碑（傷亡數字）、D-Day Center 與 D-Day Overlord 逐時時間軸（多方交叉核對）。",
  };

  /* -- storyboard: the directed broadcast (SSOT for the TV-special tour) -- *
   *  Each shot: day, hold(s), cam{lng,lat,dist,az°,el°,orbit°/s}, captions,
   *  commanders[], focus[unit ids], side. title_zh/narration_zh = Traditional Chinese.
   * ---------------------------------------------------------------------- */
  const storyboard = [
    { day:6.0, hold:9, cam:{lng:-0.60,lat:49.42,dist:2600,az:0,el:44,orbit:0.7},
      dateLabel:"1944年6月6日 · 00:00", title_zh:"諾曼第登陸", title_en:"The Longest Day Begins",
      narration_zh:"1944年6月5日深夜至6日凌晨，史上最龐大的登陸艦隊逼近諾曼第海岸：近七千艘艦船、十五萬六千名官兵，自海空兩路而來。",
      narration_en:"Through the night of 5–6 June the largest invasion fleet in history closes on the Normandy coast: nearly 7,000 ships and 156,000 men, by sea and by air.",
      commanders:[{zh:"艾森豪",en:"Gen. Dwight D. Eisenhower"}], focus:["al_navy"], side:"al" },

    { day:6.02, hold:9, cam:{lng:-0.274,lat:49.245,dist:620,az:200,el:50,orbit:0.8},
      dateLabel:"6月6日 · 00:16", title_zh:"佩加索斯橋", title_en:"Coup de Main · Pegasus Bridge",
      narration_zh:"凌晨零時十六分，霍華德少校的滑翔機在卡昂運河大橋旁數十米處著陸，數分鐘內奪橋——這是D日的第一場戰鬥。",
      narration_en:"At 00:16 Major Howard's gliders land within yards of the Caen Canal bridge and seize it in minutes. The first action of D-Day.",
      commanders:[{zh:"霍華德少校",en:"Maj. John Howard"}], focus:["al_6ab"], side:"al" },

    { day:6.08, hold:9, cam:{lng:-1.29,lat:49.40,dist:1500,az:0,el:46,orbit:0.8},
      dateLabel:"6月6日 · 01:30", title_zh:"傘兵空降", title_en:"The Airborne Drops",
      narration_zh:"美軍第82與第101空降師空降科唐坦半島，在夜色與氾濫的沼澤中四散；英軍第6空降師則扼守東翼。",
      narration_en:"The US 82nd and 101st are dropped across the Cotentin, scattered in the darkness and flooded marshes; the British 6th holds the eastern flank.",
      commanders:[{zh:"李奇威將軍",en:"Maj-Gen Matthew Ridgway"}], focus:["al_82ab","al_101ab"], side:"al" },

    { day:6.13, hold:9, cam:{lng:-1.316,lat:49.405,dist:760,az:180,el:48,orbit:0.8},
      dateLabel:"6月6日 · 約04:30", title_zh:"聖梅爾埃格利斯 · 梅維爾", title_en:"First Town Freed · Merville",
      narration_zh:"第505傘兵團解放聖梅爾埃格利斯，這是法國第一個重獲自由的市鎮；東面奧特威的營隊強攻梅維爾砲台。德軍法利將軍於戰鬥中陣亡。",
      narration_en:"The 505th frees Sainte-Mère-Église, the first French town liberated; to the east Otway's battalion storms the Merville Battery. General Falley is killed in the fighting.",
      commanders:[{zh:"奧特威中校",en:"Lt-Col Terence Otway"}], focus:["al_82ab","al_6ab","ge_91"], side:"both" },

    { day:6.25, hold:8, cam:{lng:-0.60,lat:49.41,dist:2000,az:0,el:42,orbit:0.8},
      dateLabel:"6月6日 · 05:30", title_zh:"海軍砲轟", title_en:"The Naval Bombardment",
      narration_zh:"黎明時分，低雲之下，龐大艦隊開火。戰列艦與巡洋艦猛轟大西洋壁壘，登陸艇集結待命，準備強攻。",
      narration_en:"At dawn, under low cloud, the armada opens fire. Battleships and cruisers pound the Atlantic Wall as the landing craft form up for the assault.",
      commanders:[{zh:"拉姆齊上將",en:"Adm Sir Bertram Ramsay"}], focus:["al_navy","ge_arty"], side:"al" },

    { day:6.27, hold:12, cam:{lng:-0.862,lat:49.378,dist:760,az:0,el:42,orbit:0.7},
      dateLabel:"6月6日 · 06:30 · 登陸時刻", title_zh:"血染奧馬哈", title_en:"Bloody Omaha",
      narration_zh:"登陸時刻，第1與第29步兵師衝上奧馬哈——卻撞上完好無損、出乎意料的德軍第352師。灘頭頓成屠場。",
      narration_en:"At H-Hour the 1st and 29th hit Omaha, and run into the intact, unexpected 352nd Division. The foreshore becomes a killing ground.",
      commanders:[{zh:"休伯納將軍",en:"Maj-Gen Clarence Huebner"}], focus:["al_1inf","al_29inf","ge_352"], side:"both" },

    { day:6.29, hold:8, cam:{lng:-1.175,lat:49.420,dist:820,az:0,el:44,orbit:0.8},
      dateLabel:"6月6日 · 06:30", title_zh:"猶他海灘", title_en:"Utah Beach",
      narration_zh:"在猶他，第4步兵師偏南登陸，卻落在防禦薄弱的地段。「我們就從這裏開始打這場仗」，羅斯福將軍如此決斷。此處傷亡輕微。",
      narration_en:"At Utah the 4th Division lands off-target to the south, but on a lightly held sector. 'We'll start the war from right here,' decides General Roosevelt. Losses are light.",
      commanders:[{zh:"雷蒙·巴頓將軍",en:"Maj-Gen Raymond Barton"}], focus:["al_4inf","al_101ab"], side:"al" },

    { day:6.30, hold:8, cam:{lng:-0.989,lat:49.398,dist:560,az:0,el:50,orbit:0.7},
      dateLabel:"6月6日 · 約07:10", title_zh:"奧克角", title_en:"Pointe du Hoc",
      narration_zh:"拉德的遊騎兵冒著砲火，以抓鉤與雲梯攀上三十米高的奧克角峭壁——卻發現大砲早已被移往內陸。他們仍死守此地。",
      narration_en:"Rudder's Rangers scale the 30-metre cliff under fire, with grapnels and fire-ladders, only to find the guns moved inland. They hold the position regardless.",
      commanders:[{zh:"拉德中校",en:"Lt-Col James Rudder"}], focus:["al_rangers"], side:"al" },

    { day:6.33, hold:11, cam:{lng:-0.40,lat:49.33,dist:1500,az:0,el:44,orbit:0.8},
      dateLabel:"6月6日 · 07:25", title_zh:"黃金 · 朱諾 · 寶劍", title_en:"The British & Canadian Beaches",
      narration_zh:"比美軍晚一小時，英軍與加軍登陸黃金、朱諾、寶劍三灘；基弗的自由法國突擊隊解放烏伊斯特勒昂。大西洋壁壘就此崩潰。",
      narration_en:"An hour after the Americans, the British and Canadians hit Gold, Juno and Sword; Kieffer's French commandos free Ouistreham. The Atlantic Wall gives way.",
      commanders:[{zh:"基弗少校",en:"Lt-Cdr Philippe Kieffer"}], focus:["al_50inf","al_3cad","al_3brit","al_freefrench"], side:"both" },

    { day:6.55, hold:9, cam:{lng:-0.862,lat:49.360,dist:720,az:0,el:46,orbit:0.8},
      dateLabel:"6月6日 · 約10:00", title_zh:"突破奧馬哈", title_en:"Off the Beach at Omaha",
      narration_zh:"上午稍晚，士兵三五成群，終於攻上奧馬哈的崖壁。D日代價最慘重的一灘，終告守住。",
      narration_en:"By mid-morning, in small groups, the men finally fight their way up the Omaha bluffs. The costliest beach of D-Day is at last held.",
      commanders:[{zh:"格哈特將軍",en:"Maj-Gen Charles Gerhardt"}], focus:["al_1inf","al_29inf"], side:"al" },

    { day:6.6, hold:9, cam:{lng:-0.345,lat:49.23,dist:1300,az:0,el:44,orbit:0.8},
      dateLabel:"6月6日 · 下午", title_zh:"第21裝甲師反擊", title_en:"21st Panzer Counterattacks",
      narration_zh:"當日唯一一次大規模裝甲反擊：第21裝甲師由朱諾與寶劍之間的缺口直撲海岸，約二十時抵達濱海地帶——卻在滑翔機增援抵達後孤立後撤。",
      narration_en:"The only armoured riposte of the day, 21st Panzer drives for the sea through the Juno–Sword gap and reaches the coast around 20:00, then pulls back, isolated, as glider reinforcements arrive overhead.",
      commanders:[{zh:"福伊希廷格將軍",en:"Lt-Gen Edgar Feuchtinger"}], focus:["ge_21pz","al_3brit"], side:"both" },

    { day:6.85, hold:10, cam:{lng:-0.60,lat:49.36,dist:2400,az:0,el:46,orbit:0.9},
      dateLabel:"6月6日 · 入夜", title_zh:"黃昏的灘頭堡", title_en:"The Foothold at Nightfall",
      narration_zh:"入夜時分，約十五萬六千人已登陸。五處灘頭尚未連成一線，卡昂仍在德軍手中。但盟軍重返歐陸，已成定局。",
      narration_en:"By nightfall some 156,000 men are ashore. Five beachheads, not yet linked; Caen still holds. But the Allied return to the continent is a fact.",
      commanders:[{zh:"蒙哥馬利將軍",en:"Gen. Bernard Montgomery"}], focus:["al_4inf","al_50inf","al_3cad","al_3brit"], side:"both" },

    { day:7.5, hold:9, cam:{lng:-0.703,lat:49.285,dist:1100,az:0,el:44,orbit:0.8},
      dateLabel:"1944年6月7日", title_zh:"巴約解放", title_en:"Bayeux Liberated",
      narration_zh:"6月7日，第50師進入巴約，這是第一座獲解放、且未遭戰火摧殘的法國城市。各處灘頭開始連成一片。",
      narration_en:"On 7 June the 50th Division enters Bayeux, the first French city liberated and spared the fighting. The beachheads begin to link up.",
      commanders:[{zh:"格雷厄姆將軍",en:"Maj-Gen Douglas Graham"}], focus:["al_50inf"], side:"al" },

    { day:9.0, hold:11, cam:{lng:-0.62,lat:49.32,dist:2600,az:0,el:46,orbit:1.0},
      dateLabel:"1944年6月6–9日", title_zh:"缺口已開", title_en:"The Lodgement Holds",
      narration_zh:"短短數日，五處灘頭連成一片完整的灘頭陣地。卡朗唐與卡昂尚待攻取——但通往被佔歐洲的大門，已被撞開。",
      narration_en:"Within days the five beaches become one continuous lodgement. Carentan and Caen are still to be taken. But the door into occupied Europe has been forced open.",
      commanders:[{zh:"布萊德雷將軍",en:"Lt-Gen Omar Bradley"}], focus:["al_1inf","al_50inf","al_3cad"], side:"al" },
  ];
  const outro = { title_zh:"諾曼第登陸 · 1944年6月6日", title_en:"D-Day · 6 June 1944",
    narration_zh:"灘頭陣地以一日至少四千四百名盟軍將士陣亡的代價換來。西歐的解放，自這片海灘揭開序幕。願記住那些倒下的人。",
    narration_en:"The foothold is won, at a cost of at least 4,400 Allied dead in a single day. From these beaches the liberation of Western Europe would begin. Remember those who fell.",
    cam:{ lng:-0.65, lat:49.34, dist:3000, az:0, el:52, orbit:1.0, tween:3.4 } };

  return { meta, factions, ui, intro, flagLegend, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro };
})();
