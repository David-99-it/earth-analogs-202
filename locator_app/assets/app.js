var E=LocEngine;
/* ---------- строки интерфейса: [русский, английский] ---------- */
var I18N={
brand:["NASA Локатор","NASA Locator"],
nLoc:["Локатор","Locator"],nCmp:["Сравнение","Compare"],nCalc:["Мой участок","My site"],nMeth:["Методика","Method"],
fTarget:["Цель сравнения","Compare against"],customEdit:["Задать значения своей цели →","Set your target values →"],
toMap:["Показать на карте","Show on the map"],physMore:["Подробнее: таблица физических различий →","More: table of physical differences →"],
leadCmp:["Выберите два места: таблица покажет их значения рядом со значением цели и сходство по каждому параметру. Ниже рекорды: какое место ближе всех к цели по каждому параметру.","Pick two sites: the table shows their values beside the target and the match per parameter. Below are records: the closest site to the target for each parameter."],
leadCalc:["Введите измерения своего участка в обычных единицах и узнайте, насколько он похож на выбранную цель. Расчёт тот же, что и для мест из базы.","Enter your site's measurements in plain units and see how close it is to the chosen target. The calculation is the same as for sites in the database."],
leadMeth:["Как считается процент, откуда взяты числа и чего Земля воспроизвести не может.","How the percentage is computed, where the numbers come from, and what Earth cannot reproduce."],
nxCmpT:["Сравнить два места","Compare two sites"],nxCmpP:["Значения рядом с целью и рекорды совпадения.","Values side by side with the target, plus match records."],
nxCalcT:["Добавить свой участок","Add your site"],nxCalcP:["Введите измерения или загрузите CSV: сайт посчитает сходство с целью.","Enter measurements or upload a CSV to get the match to the target."],
nxMethT:["Как это считается","How it is computed"],nxMethP:["Формулы, допуски, источники и физика, которую Земля не воспроизводит.","Formulas, tolerances, sources and the physics Earth cannot reproduce."],
nxLocT:["К рейтингу и глобусу","To the ranking and globe"],nxLocP:["Фильтры, карточки мест, веса параметров.","Filters, site cards, parameter weights."],
lead:["Какие места на Земле похожи на цели на Луне и Марсе? Выберите цель и задачу: сайт покажет рейтинг по реальным измерениям NASA в градусах, метрах и миллиметрах. Если данных нет, параметр не считается нулём, а доля учтённых данных показана рядом с процентом.","Which places on Earth resemble targets on the Moon and Mars? Pick a target and a task: the site ranks places by real NASA measurements in degrees, metres and millimetres. If data is missing, a parameter is not counted as zero, and the share of data used is shown next to the percentage."],
custom:["Своя цель","Custom target"],
fTask:["Задача (меняет веса)","Task (sets the weights)"],fTopic:["Фильтр по метке (только скрывает места)","Tag filter (only hides sites)"],fUnder:["Только малоизученные","Under-studied only"],
sph:["Поиск места","Search a place"],all:["Все","All"],
mapa:["Карта мира: места-аналоги","World map: analog sites"],spin:["Вращение","Spin"],zin:["Приблизить","Zoom in"],zout:["Отдалить","Zoom out"],rst:["Сбросить вид","Reset view"],
vg:["Глобус","Globe"],vf:["Карта","Flat"],
hint:["Крутите глобус, наведите на точку. Цвет и размер точки показывают сходство. Пустой кружок: данных меньше половины, оценка ориентировочная.","Drag the globe and hover a dot. Colour and size show similarity. A hollow circle means under half of the data is available, so the estimate is tentative."],
params:["Параметры, веса и значения цели","Parameters, weights and target values"],pTarget:["Значение цели","Target value"],pWeight:["Важность 0–5","Weight 0–5"],pParam:["Параметр","Parameter"],
tol:["допуск","tolerance"],tolHelp:["разница {d} даёт совпадение 50 %","a difference of {d} gives a 50 % match"],
copyFrom:["Скопировать значения:","Copy values from:"],
rank:["Рейтинг мест","Site ranking"],rankLow:["мало данных","low data"],
underT:["Малоизученные места","Under-studied places"],underNone:["Нет малоизученных мест по этому фильтру.","No under-studied places match this filter."],
none:["Ничего не найдено","Nothing found"],empty:["База пуста. Импортируйте места командой import_sites.","The database is empty. Import sites with the import_sites command."],
loading:["Загрузка данных…","Loading data…"],apiErr:["Нет связи с базой данных. Запустите сервер Django и откройте страницу снова.","Cannot reach the database. Start the Django server and reload."],
match:["Сходство","Match"],dataCov:["Данные","Data"],ofParams:["из","of"],paramsWord:["параметров","parameters"],
lowcov:["Данных меньше половины: процент ориентировочный. Такие места в рейтинге ниже.","Under half of the data is available: the percentage is tentative. Such sites rank lower."],
nomatch:["Сравнить нечего: у места нет данных по параметрам цели.","Nothing to compare: the site has no data for the target's parameters."],
under:["малоизученное","under-studied"],yours:["Добавлено вами","Added by you"],
useT:["Что здесь отрабатывают","What is practised here"],studyT:["Исследование","Research"],quirkT:["Неожиданный факт","Unexpected fact"],
brkT:["Где аналогия ломается","Where the analogy breaks"],brkData:["По данным","By the data"],brkPhys:["Физика, которую Земля не воспроизводит","Physics Earth cannot reproduce"],
brkNone:["Заметных расхождений по имеющимся данным нет.","No notable mismatches in the available data."],
here:["здесь","here"],target:["у цели","target"],noData:["нет данных","no data"],noTargetVal:["У цели нет значения по:","The target has no value for:"],noSiteVal:["Нет данных у места по:","No site data for:"],
scaleT:["Масштаб","Scale"],scaleTxt:["участок {a} км², цель {b} км²","site {a} km², target {b} km²"],
refsT:["Источники","Sources"],photoSite:["Место","Site"],photoTarget:["Цель","Target"],
cmpBtn:["Сравнить с…","Compare with…"],del:["Удалить моё место","Delete my site"],
valPlus:["да","yes"],valMinus:["нет","no"],
kM:["NASA","NASA"],kL:["публ.","pub."],kI:["вывод","inferred"],kE:["оценка","est."],kP:["физика","physics"],kU:["ваши","yours"],
kMl:["Измерено NASA","Measured by NASA"],kLl:["Публикация","Publication"],kIl:["Вывод по географии и климату","Inferred from geography and climate"],kEl:["Оценка по диапазону из источника","Estimate from a range in the source"],kPl:["Физическое следствие","Physical consequence"],kUl:["Введено вами","Entered by you"],
recT:["Рекорды совпадения и неожиданные находки","Match records and unexpected finds"],
recP:["Считается автоматически по текущей цели и фильтрам. Для каждого параметра показано место, которое ближе всех к цели.","Computed automatically for the current target and filters. For each parameter, the closest site is shown."],
recBest:["Ближе всего по параметру","Closest by parameter"],recTop:["Лучшее малоизученное место","Best under-studied site"],recTopRank:["{n}-е место в рейтинге из {m}","rank {n} of {m}"],recNone:["Недостаточно данных для рекордов.","Not enough data for records."],recVs:["против","vs"],recTargetHas:["у цели","target"],
cmpT:["Сравнить два места","Compare two sites"],cmpP:["Выберите два места: таблица покажет значения рядом с целью.","Pick two sites: the table puts their values beside the target."],
physT:["Что Земля не умеет воспроизвести","What Earth cannot reproduce"],physP:["Даже лучший земной аналог отличается тремя физическими условиями. Их нужно воспроизводить в лаборатории: полевые испытания их не дают.","Even the best Earth analog differs in three physical conditions. They need a lab to reproduce: field tests cannot."],
physQ:["Величина","Quantity"],physE:["Земля","Earth"],physM:["Луна","Moon"],physR:["Марс","Mars"],
timesLess:["в {n} раз меньше","{n}x lower"],timesMore:["в {n} раз больше","{n}x higher"],
physGrav:["На Земле сила тяжести","On Earth gravity is"],physPres:["Давление на Земле","Earth's pressure is"],physRad:["Доза радиации на Земле","Earth's radiation dose is"],
ct:["Мой участок: тот же расчёт в реальных единицах","My site: the same calculation in real units"],
cp:["Введите измерения своего участка в обычных единицах. Пустое поле означает «нет данных»: оно не считается нулём и не участвует в расчёте. Данные сохраняются только в вашем браузере.","Enter your site's measurements in plain units. An empty field means 'no data': it is not treated as zero and drops out of the calculation. Data stays in your browser only."],
calcSite:["Участок","Site"],cn:["Название","Name"],cla:["Широта","Latitude"],clo:["Долгота","Longitude"],cnph:["Например: Моя долина","E.g. My valley"],
cnasa:["Заполнить из NASA POWER по координатам","Fill from NASA POWER by coordinates"],
calcMeas:["Измерения","Measurements"],calcEmpty:["Оставьте поле пустым, если значения нет.","Leave a field empty if there is no value."],cclr:["Очистить","Clear"],
cadd:["Добавить на карту","Add to map"],cuse:["Использовать как цель","Use as target"],
bad:["Проверьте координаты и значения: есть выход за допустимые пределы.","Check coordinates and values: some are out of range."],added:["Участок добавлен на карту","Site added to the map"],
cres:["Сходство с целью","Match to the target"],cresNo:["нет данных для сравнения","no data to compare"],
cloading:["Запрос к NASA POWER…","Asking NASA POWER…"],cok:["NASA POWER: заполнены температура, осадки, ветер","NASA POWER: temperature, precipitation and wind filled"],
cfail:["NASA POWER не ответил из браузера. Введите значения вручную или скачайте их скриптом tools/fetch_nasa_data.py.","NASA POWER did not answer from the browser. Enter values by hand or fetch them with tools/fetch_nasa_data.py."],
crelief:["перепад высот тоже получен","relief fetched too"],creliefNo:["перепад высот получить не удалось","relief could not be fetched"],
csvt:["Загрузить таблицу CSV","Upload a CSV table"],
csvp:["Столбцы: name, lat, lon, relief_m, temp_mean_c, temp_diurnal_c, temp_min_c, temp_max_c, precip_mm, wind_ms, ice, caves, bio, origin. Пустая ячейка = нет данных. Да/нет: 1, 0, да, нет. Происхождение через |, например impact|volcanic.","Columns: name, lat, lon, relief_m, temp_mean_c, temp_diurnal_c, temp_min_c, temp_max_c, precip_mm, wind_ms, ice, caves, bio, origin. An empty cell = no data. Yes/no: 1, 0, yes, no. Origin separated by |, e.g. impact|volcanic."],
csvUpload:["Выбрать файл","Choose file"],csvTemplate:["Скачать шаблон","Download template"],csvPh:["Вставьте строки CSV сюда","Paste CSV rows here"],
cimp:["Добавить из таблицы","Import rows"],ccopy:["Скопировать рейтинг (CSV)","Copy ranking (CSV)"],
csvImported:["Добавлено","Imported"],csvSkipped:["пропущено","skipped"],csvNoRows:["Нет корректных строк","No valid rows"],csvCopied:["Рейтинг скопирован","Ranking copied"],csvCopyFail:["Не удалось скопировать","Copy failed"],csvLine:["строка","line"],
rep:["Скопировать отчёт","Copy report"],ok:["Скопировано","Copied"],fail:["Не удалось скопировать","Copy failed"],
repT:["Отчёт","Report"],repFoot:["Данные: NASA POWER, ASTER GDEM, публикации. Сходство считается по реальным единицам; пропуски не считаются нулями.","Data: NASA POWER, ASTER GDEM, publications. Similarity uses real units; gaps are not counted as zeros."],
methT:["Методика: как считается процент","Methodology: how the percentage is computed"],
srct:["Источники данных и воспроизводимость","Data sources and reproducibility"],
srcp:["Все числа получены из открытых источников NASA и публикаций. У каждого значения указан источник и способ получения. Скрипт, который скачивает данные NASA, лежит в репозитории: любой может повторить расчёт.","All numbers come from open NASA sources and publications. Every value lists its source and how it was obtained. The script that downloads the NASA data is in the repository: anyone can reproduce the calculation."],
foot:["NASA Локатор · учебный проект хакатона. Данные NASA POWER и ASTER GDEM открыты. Фото: Wikimedia Commons, лицензии указаны под снимками, хранятся в Cloudinary.","NASA Locator · hackathon project. NASA POWER and ASTER GDEM data are open. Photos: Wikimedia Commons, licences shown under images, hosted on Cloudinary."]
};
function t(k){var v=I18N[k];return v?v[lang==="ru"?0:1]:k}
/* ---------- состояние ---------- */
var D=null,MET=[],MK={},TG={},BASE=[],U=[],RK=[],S_ALL=[];
var lang="ru",tg="moon",W={},preset="balanced",tagF="",onlyU=false,qs="",sel="",CUS={},cmpA="",cmpB="";
var LAND=null,BORD=null,started=false,view="globe",c=[20,25],k=1,spin=true,dirty=true,hit=[],tw=null,drag=null,hv="",prj,SC=300;
var PAGE=document.body.getAttribute("data-page")||"loc",P={loc:PAGE==="loc",cmp:PAGE==="cmp",calc:PAGE==="calc",meth:PAGE==="meth"},NIL=document.createElement("div"),fromHash=false;
/* Элемента нет на этой странице: возвращаем пустую заглушку, чтобы общий код не падал. */
var $=function(i){return document.getElementById(i)||NIL};
try{U=JSON.parse(localStorage.getItem("nl2-user")||"[]");if(!Array.isArray(U))U=[]}catch(e){U=[]}
var ST={};try{ST=JSON.parse(localStorage.getItem("nl3-state")||"{}")||{}}catch(e){ST={}}
/* Общее состояние между страницами: цель, веса, своя цель, выбранная пара для сравнения. */
function saveState(){try{localStorage.setItem("nl3-state",JSON.stringify({tg:tg,preset:preset,W:W,CUS:CUS,cmpA:cmpA,cmpB:cmpB}))}catch(e){}}
try{lang=localStorage.getItem("nl-lang")||(/^ru|^ky|^kk|^uk|^be/.test(navigator.language||"")?"ru":"en")}catch(e){}
if(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches)spin=false;
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(ch){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]})}
function i0(){return lang==="ru"?0:1}
function nm(s){return s.name[i0()]||s.name[0]||""}
function mn(m){return lang==="ru"?m.ru:m.en}
function mh(m){return lang==="ru"?m.hint_ru:m.hint_en}
function mu(m){return lang==="ru"?m.unit:m.unit_en}
function css(v){return getComputedStyle(document.documentElement).getPropertyValue(v)}
function pct(x){return Math.round(x*100)}
function loc(){return lang==="ru"?"ru-RU":"en-US"}
function num(v,max){return (+v).toLocaleString(loc(),{maximumFractionDigits:max==null?1:max})}
function fmt(m,v){
 if(!E.has(v))return"";
 if(m.type==="bool")return v?t("valPlus"):t("valMinus");
 if(m.type==="set")return v.map(function(o){return D.origins[o]?D.origins[o][i0()]:o}).join(", ");
 var a=Math.abs(v)>=100?Math.round(v):Math.round(v*10)/10;
 return num(a)+" "+mu(m)}
function sci(v){
 if(v>=0.01&&v<1e5)return num(v,v<10?2:0);
 var e=Math.floor(Math.log10(v)),mant=v/Math.pow(10,e),sup={"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻"};
 return num(mant,1)+"×10"+String(e).split("").map(function(ch){return sup[ch]}).join("")}
function cloudImg(im,w){
 if(!im||!im.id||!D||!D.config.cloud)return"";
 return"https://res.cloudinary.com/"+encodeURIComponent(D.config.cloud)+"/image/upload/f_auto,q_auto,c_fill,g_auto,w_"+w+",h_"+Math.round(w*2/3)+"/"+im.id}
function kindShort(kd){return{measured:"kM",literature:"kL",inferred:"kI",estimate:"kE",physical:"kP",user:"kU"}[kd]||"kL"}
function badge(f){
 if(!f)return"";var kd=f.kind||"literature",lab=t(kindShort(kd)+"l"),tt=(f.src?f.src+" · ":"")+lab+(f.date?" · "+f.date:"");
 var cls="kd k-"+esc(kd);
 return f.url?'<a class="'+cls+'" href="'+esc(f.url)+'" target="_blank" rel="noopener" title="'+esc(tt)+'">'+t(kindShort(kd))+'</a>':'<span class="'+cls+'" title="'+esc(tt)+'">'+t(kindShort(kd))+'</span>'}
function flat(vals){var o={};for(var key in vals)o[key]=vals[key].v;return o}
/* ---------- данные ---------- */
function TV(){return tg==="custom"?CUS:(TG[tg]?TG[tg].v:{})}
function TF(key){
 if(tg==="custom")return E.has(CUS[key])?{v:CUS[key],kind:"user",src:"",url:""}:null;
 return TG[tg]&&TG[tg].values[key]||null}
function tname(){return tg==="custom"?t("custom"):(TG[tg]?TG[tg].name[i0()]:"")}
function mkUser(u,i){
 var vals={};for(var key in u.v)vals[key]={v:u.v[key],kind:"user",src:"",url:""};
 return{slug:"user-"+i,name:[u.name,u.name],region:[t("yours"),t("yours")],lat:u.lat,lon:u.lon,area_km2:null,analog_for:"both",tags:[],understudied:false,surface_data:true,values:vals,v:u.v,use:["",""],study:["",""],quirk:["",""],refs:[],image:null,user:true,ui:i}}
function rebuild(){S_ALL=BASE.concat(U.map(mkUser));recalc()}
function recalc(){
 var T=TV();
 RK=S_ALL.map(function(s){return{s:s,c:E.compare(MET,s.v,T,W)}}).sort(E.rankCmp)}
function vis(){
 var f=qs.toLowerCase();
 return RK.filter(function(o){var s=o.s;
  if(onlyU&&!s.understudied)return false;
  if(tagF&&s.tags.indexOf(tagF)<0)return false;
  if(f&&(s.name.join(" ")+" "+s.region.join(" ")).toLowerCase().indexOf(f)<0)return false;
  return true})}
function find(slug){for(var i=0;i<RK.length;i++)if(RK[i].s.slug===slug)return RK[i];return null}
function presetW(key){
 var p=D.presets.filter(function(x){return x.key===key})[0]||D.presets[0];W={};
 MET.forEach(function(m){W[m.key]=p.w[m.key]!=null?p.w[m.key]:3});preset=p.key}
/* ---------- карта ---------- */
function loadGeo(){
 if(!window.d3||!window.topojson)return;
 fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
  .then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.json()})
  .then(function(w){LAND=topojson.feature(w,w.objects.land);BORD=topojson.mesh(w,w.objects.countries,function(a,b){return a!==b});dirty=true})
  .catch(function(e){console.error("Карта мира не загрузилась:",e)})}
function hue(m){return"hsla("+(40+150*(m==null?0:m))+",75%,60%,.92)"}
function draw(){
 var cv=$("map"),Wd=cv.clientWidth,H=cv.clientHeight,d=window.devicePixelRatio||1;if(!Wd||!H)return;
 if(cv.width!==Math.round(Wd*d)||cv.height!==Math.round(H*d)){cv.width=Math.round(Wd*d);cv.height=Math.round(H*d)}
 var x=cv.getContext("2d");x.setTransform(d,0,0,d,0,0);x.clearRect(0,0,Wd,H);
 if(!window.d3){x.fillStyle=css("--mute");x.font="14px Onest,sans-serif";x.textAlign="center";x.fillText("d3 не загрузился: карта недоступна, список и таблицы работают",Wd/2,H/2);hit=[];return}
 var g=view==="globe",sc=g?Math.min(Wd,H)/2*.9*k:Wd/6.2832*k,p=g?d3.geoOrthographic().clipAngle(90).rotate([-c[0],-c[1]]):d3.geoEquirectangular().rotate([-c[0],0]).center([0,c[1]]);
 p.scale(sc).translate([Wd/2,H/2]);prj=p;SC=sc;var pa=d3.geoPath(p,x);
 x.beginPath();pa({type:"Sphere"});x.fillStyle=css("--ocean");x.fill();
 x.beginPath();pa(d3.geoGraticule10());x.strokeStyle=css("--line");x.lineWidth=.6;x.stroke();
 if(LAND){x.beginPath();pa(LAND);x.fillStyle=css("--land");x.fill()}
 if(BORD){x.beginPath();pa(BORD);x.strokeStyle=css("--bd");x.lineWidth=.6;x.stroke()}
 if(g){var r=sc,q=x.createRadialGradient(Wd/2-r*.3,H/2-r*.3,r*.3,Wd/2,H/2,r);q.addColorStop(0,"rgba(0,0,0,0)");q.addColorStop(1,"rgba(0,0,0,.32)");x.beginPath();pa({type:"Sphere"});x.fillStyle=q;x.fill();x.strokeStyle=css("--ice");x.globalAlpha=.5;x.lineWidth=1.5;x.stroke();x.globalAlpha=1}
 hit=[];
 vis().forEach(function(o){
  var s=o.s;if(g&&d3.geoDistance([c[0],c[1]],[s.lon,s.lat])>1.5708)return;
  var q=p([s.lon,s.lat]);if(!q)return;
  var m=o.c.match,r=4+(m==null?0:m)*9,low=o.c.cov<.5;hit.push([q[0],q[1],s.slug]);
  x.beginPath();x.arc(q[0],q[1],r,0,7);
  if(low){x.lineWidth=2;x.strokeStyle=hue(m);x.stroke()}else{x.fillStyle=hue(m);x.fill();x.lineWidth=1;x.strokeStyle="rgba(0,0,0,.5)";x.stroke()}
  if(s.understudied){x.beginPath();x.arc(q[0],q[1],r+3,0,7);x.setLineDash([2,3]);x.lineWidth=1;x.strokeStyle=css("--dust");x.stroke();x.setLineDash([])}
  if(s.slug===sel||s.slug===hv){x.lineWidth=2.5;x.strokeStyle=css("--text");x.beginPath();x.arc(q[0],q[1],r+6,0,7);x.stroke()}
  if(s.slug===sel){x.font="600 13px Onest,sans-serif";x.textAlign="left";var n=nm(s),w2=x.measureText(n).width;x.fillStyle=css("--panel");x.fillRect(q[0]+r+9,q[1]-11,w2+10,22);x.fillStyle=css("--text");x.fillText(n,q[0]+r+14,q[1]+4)}})}
function loop(now){
 if(tw){var e=Math.min(1,(now-tw.t0)/800),f=e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;c[0]=tw.f[0]+tw.dl*f;c[1]=tw.f[1]+(tw.to[1]-tw.f[1])*f;k=tw.k0+(tw.k1-tw.k0)*f;if(e>=1)tw=null;dirty=true}
 else if(spin&&!drag&&view==="globe"&&window.d3){c[0]+=.14;dirty=true}
 if(dirty){dirty=false;try{draw()}catch(err){console.error(err)}}
 requestAnimationFrame(loop)}
function fly(slug){var o=find(slug);if(!o)return;var s=o.s;tw={t0:performance.now(),f:c.slice(),to:[s.lon,s.lat],dl:((s.lon-c[0]+540)%360)-180,k0:k,k1:Math.max(k,view==="globe"?1.5:2.2)};tw.to[1]=Math.max(-70,Math.min(70,s.lat))}
function pick(slug,f){sel=slug;if(f){spin=false;$("sp").setAttribute("aria-pressed","false");fly(slug)}hashSet();all()}
function near(e,m){var r=$("map").getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,b=null,bd=m;hit.forEach(function(h){var d=Math.hypot(h[0]-x,h[1]-y);if(d<bd){bd=d;b=h[2]}});return{i:b,x:x,y:y}}
var cv=$("map");
cv.onpointerdown=function(e){cv.setPointerCapture(e.pointerId);drag={x:e.clientX,y:e.clientY,x0:e.clientX,y0:e.clientY};tw=null};
cv.onpointermove=function(e){
 if(drag){var f=57.3/SC;c[0]-=(e.clientX-drag.x)*f;c[1]=Math.max(-85,Math.min(85,c[1]+(e.clientY-drag.y)*f));drag.x=e.clientX;drag.y=e.clientY;dirty=true;$("tip").style.display="none";return}
 var n=near(e,14),tp=$("tip");
 if(n.i!==(hv||null)){hv=n.i||"";dirty=true}
 cv.style.cursor=n.i===null?"":"pointer";
 if(n.i===null){tp.style.display="none";return}
 var o=find(n.i);if(!o){tp.style.display="none";return}
 var s=o.s,cc=o.c,im=cloudImg(s.image,400);
 tp.innerHTML='<div class="row" style="justify-content:space-between;flex-wrap:nowrap"><b>'+esc(nm(s))+'</b><b style="color:var(--ice)">'+(cc.match==null?"—":pct(cc.match)+"%")+'</b></div>'+
  '<div style="color:var(--mute)">'+esc(s.region[i0()])+'</div><div style="color:var(--mute)">'+t("dataCov")+': '+cc.used+' '+t("ofParams")+' '+cc.total+'</div>'+
  (im?'<img src="'+esc(im)+'" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display=\'none\'">':'');
 tp.style.display="block";
 var tw0=tp.offsetWidth||260,th=tp.offsetHeight||160,x=n.x+16;if(x+tw0>cv.clientWidth)x=n.x-tw0-16;
 var y=n.y-40;if(y+th>cv.clientHeight)y=cv.clientHeight-th-5;if(y<5)y=5;tp.style.left=Math.max(5,x)+"px";tp.style.top=y+"px"};
cv.onpointerup=function(e){if(drag&&Math.hypot(e.clientX-drag.x0,e.clientY-drag.y0)<5){var n=near(e,16);if(n.i!==null)pick(n.i,true)}drag=null};
cv.onpointerleave=function(){$("tip").style.display="none";hv="";dirty=true};
cv.addEventListener("wheel",function(e){e.preventDefault();zoom(Math.exp(-e.deltaY*.0015))},{passive:false});
cv.onkeydown=function(e){var s=8/k,m={ArrowLeft:[-s,0],ArrowRight:[s,0],ArrowUp:[0,s],ArrowDown:[0,-s]}[e.key];if(m){c[0]+=m[0];c[1]=Math.max(-85,Math.min(85,c[1]+m[1]));dirty=true;e.preventDefault()}else if(e.key==="+"||e.key==="=")zoom(1.25);else if(e.key==="-")zoom(.8)};
function zoom(f){k=Math.max(view==="globe"?.7:1,Math.min(10,k*f));dirty=true}
$("zi").onclick=function(){zoom(1.3)};$("zo").onclick=function(){zoom(.77)};$("rs").onclick=function(){tw=null;c=[20,25];k=1;dirty=true};
$("sp").onclick=function(){spin=!spin;this.setAttribute("aria-pressed",spin)};
function setView(v){view=v;$("vg").setAttribute("aria-pressed",v==="globe");$("vf").setAttribute("aria-pressed",v==="flat");k=1;dirty=true}
$("vg").onclick=function(){setView("globe")};$("vf").onclick=function(){setView("flat")};
window.onresize=function(){dirty=true};
/* ---------- рендер: карточка места ---------- */
function mismatch(m,a,b){
 var A=fmt(m,a),B=fmt(m,b);
 return'<b>'+esc(mn(m))+'</b>: '+t("here")+' '+esc(A)+', '+t("target")+' '+esc(B)}
function photoBlock(s){
 var tgt=TG[tg],a=cloudImg(s.image,480),b=tgt?cloudImg(tgt.image,480):"",h="";
 function fig(src,lab,im){return'<figure><img src="'+esc(src)+'" alt="'+esc(lab)+'" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.parentNode.hidden=true"><figcaption><b>'+esc(lab)+'</b>'+(im&&im.credit?' · '+esc(im.credit):'')+'</figcaption></figure>'}
 if(a)h+=fig(a,t("photoSite")+": "+nm(s),s.image);
 if(b)h+=fig(b,t("photoTarget")+": "+tgt.name[i0()],tgt.image);
 return h?'<div class="photos">'+h+'</div>':''}
function paramTable(s,cc){
 var rows="",T=TV(),missT=[];
 MET.forEach(function(m){
  var key=m.key,tv=T[key];
  if(!E.has(tv)){missT.push(mn(m));return}
  var sv=s.v[key],sc=cc.parts[key],off=!(W[key]>0),has=E.has(sv);
  var cellS=has?esc(fmt(m,sv))+badge(s.values[key]):'<span class="nd">'+t("noData")+'</span>';
  var bar=sc==null?'<span class="nd">—</span>':'<div class="m"><div class="bb"><i style="width:'+pct(sc)+'%"></i></div><span>'+pct(sc)+'%</span></div>';
  rows+='<tr class="'+(off?'dim':'')+'"><td>'+esc(mn(m))+'</td><td>'+cellS+'</td><td class="n">'+esc(fmt(m,tv))+badge(TF(key))+'</td><td>'+(off?'<span class="nd">×0</span>':bar)+'</td></tr>'});
 var h='<div class="tblw"><table class="tbl"><thead><tr><th>'+t("pParam")+'</th><th>'+t("here")+'</th><th>'+t("target")+'</th><th>'+t("match")+'</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
 if(missT.length)h+='<p class="mu" style="margin-top:6px;font-size:12.5px">'+t("noTargetVal")+' '+esc(missT.join(", "))+'.</p>';
 return h}
function breaks(s,cc){
 var T=TV(),items=[],miss=[];
 MET.forEach(function(m){
  var key=m.key;if(!(W[key]>0)||!E.has(T[key]))return;
  if(!E.has(s.v[key])){miss.push(mn(m));return}
  var sc=cc.parts[key];if(sc!==null&&sc<.5)items.push({sc:sc,h:mismatch(m,s.v[key],T[key])})});
 items.sort(function(a,b){return a.sc-b.sc});
 var h='<div class="warn"><b>'+t("brkT")+'</b>';
 h+='<div style="margin-top:4px">'+t("brkData")+':</div>';
 h+=items.length?'<ul>'+items.slice(0,4).map(function(o){return'<li>'+o.h+'</li>'}).join("")+'</ul>':'<div>'+t("brkNone")+'</div>';
 if(miss.length)h+='<div style="margin-top:6px">'+t("noSiteVal")+' '+esc(miss.join(", "))+'.</div>';
 h+=physList();
 return h+'</div>'}
function physRows(){return D.physics||[]}
function physList(){
 var P=physRows();if(!P.length)return"";
 var tp=tg!=="custom"&&TG[tg]?TG[tg].planet:null,planets=tp?[tp]:["moon","mars"],h='<div style="margin-top:8px">'+t("brkPhys")+':</div><ul>';
 P.forEach(function(r){
  planets.forEach(function(pl){
   var e=r.earth.v,o=r[pl].v,pn=pl==="moon"?t("physM"):t("physR"),ratio,txt;
   if(r.key==="radiation"){ratio=o/e;txt=pn+': '+sci(o)+' '+(lang==="ru"?r.unit:r.unit_en)+' ('+t("timesMore").replace("{n}",num(ratio,ratio<10?1:0))+' '+(lang==="ru"?"чем на Земле":"than on Earth")+')'}
   else{ratio=e/o;txt=pn+': '+sci(o)+' '+(lang==="ru"?r.unit:r.unit_en)+' ('+(lang==="ru"?"на Земле ":"Earth is ")+t("timesMore").replace("{n}",ratio<10?num(ratio,1):sci(ratio))+')'}
   h+='<li><b>'+esc(lang==="ru"?r.ru:r.en)+'</b>: '+esc(txt)+'</li>'})});
 return h+'</ul><a class="lnk" href="/method/#physsec">'+esc(t("physMore"))+'</a>'}
function det(){
 var o=find(sel),box=$("det");
 if(!o){box.innerHTML='<div class="mu">'+(D?t("empty"):t("loading"))+'</div>';return}
 var s=o.s,cc=o.c,low=cc.cov<.5,tgt=TG[tg],i=i0();
 var h='<h2>'+esc(nm(s))+'</h2><div>'+(s.understudied?'<span class="tag">'+t("under")+'</span>':'')+(s.user?'<span class="tag">'+t("yours")+'</span>':'')+(s.tags||[]).map(function(x){var tt=D.tags.filter(function(a){return a[0]===x})[0];return tt?'<span class="tag" style="border-color:var(--line);color:var(--mute)">'+esc(tt[1+i])+'</span>':''}).join("")+'</div>';
 h+='<div class="mu" style="margin:2px 0 6px">'+esc(s.region[i])+' · '+Math.abs(s.lat).toFixed(2)+(s.lat<0?"°S ":"°N ")+Math.abs(s.lon).toFixed(2)+(s.lon<0?"°W":"°E")+'</div>';
 h+='<div class="sim'+(low?' low':'')+'">'+(cc.match==null?"—":pct(cc.match)+"%")+'</div><div class="mu" style="margin:0">'+t("match")+': '+esc(tname())+'</div>';
 h+='<div class="meter"><span>'+t("dataCov")+': '+cc.used+' '+t("ofParams")+' '+cc.total+'</span><div class="bb"><i style="width:'+pct(cc.cov)+'%"></i></div><span>'+pct(cc.cov)+'%</span></div>';
 if(cc.match==null)h+='<div class="lowcov">'+t("nomatch")+'</div>';else if(low)h+='<div class="lowcov">'+t("lowcov")+'</div>';
 h+=photoBlock(s);
 h+=paramTable(s,cc);
 if(s.area_km2&&tgt&&tgt.area_km2)h+='<p class="mu" style="margin-top:8px"><b>'+t("scaleT")+':</b> '+t("scaleTxt").replace("{a}",num(s.area_km2,0)).replace("{b}",num(tgt.area_km2,0))+'</p>';
 if(s.use[i])h+='<h3>'+t("useT")+'</h3><p style="margin:0">'+esc(s.use[i])+'</p>';
 if(s.study[i])h+='<h3>'+t("studyT")+'</h3><p style="margin:0">'+esc(s.study[i])+'</p>';
 if(s.quirk[i])h+='<h3>'+t("quirkT")+'</h3><p style="margin:0">'+esc(s.quirk[i])+'</p>';
 h+=breaks(s,cc);
 if(s.refs&&s.refs.length)h+='<h3>'+t("refsT")+'</h3><div class="refs">'+s.refs.map(function(r){return'<a href="'+esc(r.u)+'" target="_blank" rel="noopener">'+esc(r.t)+'</a>'}).join("")+'</div>';
 h+='<div class="row" style="margin-top:10px"><button class="chip" id="tocmp">'+t("cmpBtn")+'</button>'+(s.user?'<button class="chip" id="dl">'+t("del")+'</button>':'')+'</div>';
 box.innerHTML=h}
/* ---------- рендер: список, фильтры, цели, параметры ---------- */
function lst(){
 var v=vis();
 $("list").innerHTML=v.map(function(o){var s=o.s,cc=o.c,low=cc.cov<.5;
  return'<button class="it" data-s="'+esc(s.slug)+'" aria-pressed="'+(s.slug===sel)+'"><span>'+esc(nm(s))+(s.understudied?' <span class="tag" style="margin:0 0 0 4px">'+t("under")+'</span>':'')+'</span><b class="'+(low?'low':'')+'">'+(cc.match==null?"—":pct(cc.match)+"%")+'</b><small>'+esc(s.region[i0()])+' · '+t("dataCov")+' '+cc.used+'/'+cc.total+(low?' · '+t("rankLow"):'')+'</small><div class="bb"><i style="width:'+(cc.match==null?0:pct(cc.match))+'%"></i></div></button>'}).join("")||'<div class="mu">'+t("none")+'</div>';
 var us=RK.filter(function(o){return o.s.understudied&&!o.s.user});
 $("under").innerHTML='<div class="mu" style="margin-bottom:6px">'+t("underT")+':</div><div class="seg">'+us.map(function(o){return'<button class="chip" data-s="'+esc(o.s.slug)+'">'+esc(nm(o.s))+' '+(o.c.match==null?"—":pct(o.c.match)+"%")+'</button>'}).join("")+'</div>'}
function tgb(){
 var h=D.targets.map(function(x){return'<button class="chip" data-t="'+esc(x.key)+'" aria-pressed="'+(x.key===tg)+'">'+esc(x.name[i0()])+'</button>'}).join("");
 h+='<button class="chip" data-t="custom" aria-pressed="'+(tg==="custom")+'">'+t("custom")+'</button>';
 $("tg").innerHTML=h;
 $("cth").innerHTML=(tg==="custom"&&!P.loc)?'<a class="lnk" href="/#custom">'+esc(t("customEdit"))+"</a>":"";
 if(tg==="custom")$("prmbox").open=true}
function flt(){
 $("ps").innerHTML=D.presets.map(function(p){return'<button class="chip" data-p="'+p.key+'" aria-pressed="'+(p.key===preset)+'">'+esc(lang==="ru"?p.ru:p.en)+'</button>'}).join("");
 $("tags").innerHTML='<button class="chip" data-g="" aria-pressed="'+(tagF==="")+'">'+t("all")+'</button>'+D.tags.map(function(x){return'<button class="chip" data-g="'+x[0]+'" aria-pressed="'+(tagF===x[0])+'">'+esc(x[1+i0()])+'</button>'}).join("");
 $("un").setAttribute("aria-pressed",onlyU)}
function ctl(m){
 var key=m.key,v=CUS[key],id="cv_"+key;
 if(m.type==="num")return'<input type="number" id="'+id+'" data-cv="'+key+'" step="any" value="'+(v==null?"":v)+'" placeholder="'+(m.min)+'…'+(m.max)+'" aria-label="'+esc(mn(m))+'">';
 if(m.type==="bool")return'<select id="'+id+'" data-cv="'+key+'" aria-label="'+esc(mn(m))+'"><option value="">'+t("noData")+'</option><option value="1"'+(v===true?' selected':'')+'>'+t("valPlus")+'</option><option value="0"'+(v===false?' selected':'')+'>'+t("valMinus")+'</option></select>';
 return'<div class="og" data-cvs="'+key+'">'+Object.keys(D.origins).map(function(o){return'<label><input type="checkbox" value="'+o+'"'+((v||[]).indexOf(o)>=0?' checked':'')+'><span>'+esc(D.origins[o][i0()])+'</span></label>'}).join("")+'</div>'}
function prm(){
 var h='<div class="wr hd"><span>'+t("pParam")+'</span><span>'+t("pTarget")+'</span><span>'+t("pWeight")+'</span></div>';
 MET.forEach(function(m){
  var key=m.key,w=W[key],f=TF(key),tolTxt="";
  if(m.type==="num")tolTxt='<span class="tol">'+t("tol")+': '+t("tolHelp").replace("{d}",num(m.tau,0)+" "+mu(m))+'</span>';
  var cell=tg==="custom"?'<div class="cv">'+ctl(m)+'</div>':(f?esc(fmt(m,f.v))+badge(f):'<span class="nd">'+t("noData")+'</span>');
  h+='<div class="wr'+(w>0?'':' off')+'"><div class="wn"><b>'+esc(mn(m))+'</b><small>'+esc(mh(m))+'</small>'+tolTxt+'</div><div>'+cell+'</div><label class="cl"><input type="range" min="0" max="5" step="1" value="'+w+'" data-w="'+key+'" aria-label="'+esc(mn(m))+'"><output>'+w+'</output></label></div>'});
 if(tg==="custom")h+='<div class="row" style="margin-top:10px"><span class="mu" style="margin:0">'+t("copyFrom")+'</span>'+D.targets.map(function(x){return'<button class="chip" data-copy="'+esc(x.key)+'">'+esc(x.name[i0()])+'</button>'}).join("")+'</div>';
 $("prm").innerHTML=h}
/* ---------- рекорды ---------- */
function records(){
 var T=TV(),out=[],v=vis();
 MET.forEach(function(m){
  if(m.type!=="num"||!(W[m.key]>0)||!E.has(T[m.key]))return;
  var best=null;v.forEach(function(o){var a=o.s.v[m.key];if(!E.has(a))return;var d=Math.abs(a-T[m.key]);if(!best||d<best.d)best={d:d,o:o,a:a}});
  if(best)out.push('<div><span class="k">'+t("recBest")+': '+esc(mn(m))+'</span><b>'+esc(nm(best.o.s))+'</b>: '+esc(fmt(m,best.a))+' '+t("recVs")+' '+esc(fmt(m,T[m.key]))+' ('+t("recTargetHas")+'), '+t("match").toLowerCase()+' '+pct(E.mscore(m,best.a,T[m.key]))+'%</div>')});
 var ok=RK.filter(function(o){return o.s.understudied&&o.c.cov>=.5&&o.c.match!=null});
 if(ok.length){var b=ok[0],n=RK.indexOf(b)+1;out.unshift('<div><span class="k">'+t("recTop")+'</span><b>'+esc(nm(b.s))+'</b>: '+pct(b.c.match)+'% · '+t("recTopRank").replace("{n}",n).replace("{m}",RK.length)+(b.s.quirk[i0()]?'<br><span style="color:var(--mute)">'+esc(b.s.quirk[i0()])+'</span>':'')+'</div>')}
 $("rec").innerHTML=out.join("")||'<div>'+t("recNone")+'</div>'}
/* ---------- сравнение двух мест ---------- */
function cmpOpts(){
 var o=RK.map(function(x){return'<option value="'+esc(x.s.slug)+'">'+esc(nm(x.s))+'</option>'}).join("");
 $("ca").innerHTML=o;$("cb").innerHTML=o;
 if(!find(cmpA))cmpA=sel||(RK[0]&&RK[0].s.slug)||"";
 if(!find(cmpB)||cmpB===cmpA)cmpB=(RK.filter(function(x){return x.s.slug!==cmpA})[0]||{s:{slug:""}}).s.slug;
 $("ca").value=cmpA;$("cb").value=cmpB}
function cmpTable(){
 var a=find(cmpA),b=find(cmpB);if(!a||!b){$("cmpout").innerHTML="";return}
 var T=TV(),rows="";
 function cell(o,m){var v=o.s.v[m.key];return E.has(v)?esc(fmt(m,v))+badge(o.s.values[m.key]):'<span class="nd">'+t("noData")+'</span>'}
 MET.forEach(function(m){if(!E.has(T[m.key]))return;
  var sa=a.c.parts[m.key],sb=b.c.parts[m.key];
  rows+='<tr><td>'+esc(mn(m))+'</td><td class="n">'+esc(fmt(m,T[m.key]))+'</td><td>'+cell(a,m)+(sa==null?'':' <span class="n">('+pct(sa)+'%)</span>')+'</td><td>'+cell(b,m)+(sb==null?'':' <span class="n">('+pct(sb)+'%)</span>')+'</td></tr>'});
 function tot(o){return o.c.match==null?"—":pct(o.c.match)+"% · "+t("dataCov")+" "+o.c.used+"/"+o.c.total}
 $("cmpout").innerHTML='<div class="tblw"><table class="tbl"><thead><tr><th>'+t("pParam")+'</th><th>'+t("target")+'</th><th>'+esc(nm(a.s))+'</th><th>'+esc(nm(b.s))+'</th></tr></thead><tbody>'+rows+'<tr><td><b>'+t("match")+'</b></td><td></td><td><b>'+tot(a)+'</b></td><td><b>'+tot(b)+'</b></td></tr></tbody></table></div>'}
/* ---------- физика и методика ---------- */
function phys(){
 var P=physRows(),h='<thead><tr><th>'+t("physQ")+'</th><th>'+t("physE")+'</th><th>'+t("physM")+'</th><th>'+t("physR")+'</th></tr></thead><tbody>';
 P.forEach(function(r){var un=lang==="ru"?r.unit:r.unit_en;
  h+='<tr><td>'+esc(lang==="ru"?r.ru:r.en)+', '+esc(un)+'</td>'+["earth","moon","mars"].map(function(pl){return'<td>'+sci(r[pl].v)+badge(r[pl])+'</td>'}).join("")+'</tr>'});
 $("phys").innerHTML=h+'</tbody>';
 $("physN").innerHTML=P.map(function(r){return esc(r.note[i0()])}).join(" ")}
function meth(){
 var ru=lang==="ru",tolRows=MET.map(function(m){
  var d=m.type==="num"?(num(m.tau,0)+" "+mu(m)):(m.type==="bool"?(ru?"совпало или нет: 100 % или 0 %":"match or not: 100 % or 0 %"):(ru?"доля общих признаков":"share of shared features"));
  return'<tr><td>'+esc(mn(m))+'</td><td>'+esc(d)+'</td><td class="n">'+esc(mh(m))+'</td></tr>'}).join("");
 var h=ru?
 '<p class="mu">Вместо баллов от 0 до 10 здесь реальные единицы. Процент показывает, насколько близки два числа, и считается по одной формуле для всех числовых параметров.</p>'+
 '<div class="formula"><div><b>1. Совпадение числа</b><code>s = 1 / (1 + (разница / допуск)²)</code>Разница равна допуску: 50 %. Разница втрое больше допуска: 10 %. Разница ноль: 100 %. Допуск у каждого параметра свой (таблица ниже).</div>'+
 '<div><b>2. Да/нет и происхождение</b><code>да/нет: 1 или 0; происхождение: доля общих признаков</code>Например, у места «ударное, вулканическое», у цели «ударное, вулканическое, осадочное»: общих 2 из 3 = 67 %.</div>'+
 '<div><b>3. Итог</b><code>сходство = Σ(вес × s) / Σ(вес)</code>Суммирование идёт только по параметрам, у которых есть значение и у места, и у цели. Вес 0–5 вы задаёте сами.</div>'+
 '<div><b>4. Пропуск не равен нулю</b><code>нет данных → параметр исключён</code>Если у места нет значения, оно не штрафуется нулём. Доля учтённого веса показана как «Данные». Если данных меньше половины, место помечено и стоит в рейтинге ниже.</div></div>'+
 '<h3>Допуски по параметрам</h3><div class="tblw"><table class="tbl"><thead><tr><th>Параметр</th><th>Допуск (50 %)</th><th>Откуда значение</th></tr></thead><tbody>'+tolRows+'</tbody></table></div>'+
 '<h3>Масштаб и пределы</h3><p class="mu">Метеоданные NASA POWER даны для ячейки сетки около 50 км: в узких долинах и на вершинах они сглажены. Перепад высот считается на площади 20×20 км (сетка 9×9 точек), а цели описывают кратеры и ямы: у Шеклтона берётся глубина кратера, у лунной ямы глубина ямы. Подземные места (шахты) не получают метеоданных намеренно: климат поверхности не описывает глубину. Фото и числа отличаются по происхождению: значок рядом с числом показывает, измерено оно NASA, взято из публикации, выведено или оценено.</p>'+
 '<p class="mu">Три физических условия не воспроизводятся на Земле вообще: сила тяжести, давление (вакуум и тонкая атмосфера) и радиация. Они вынесены в отдельный блок и в каждую карточку «Где аналогия ломается».</p>'
 :
 '<p class="mu">Instead of 0-10 scores this uses real units. The percentage shows how close two numbers are, using one formula for every numeric parameter.</p>'+
 '<div class="formula"><div><b>1. Number match</b><code>s = 1 / (1 + (difference / tolerance)²)</code>Difference equals the tolerance: 50 %. Three times the tolerance: 10 %. Zero difference: 100 %. Each parameter has its own tolerance (table below).</div>'+
 '<div><b>2. Yes/no and origin</b><code>yes/no: 1 or 0; origin: share of shared features</code>E.g. a site "impact, volcanic" vs a target "impact, volcanic, sedimentary": 2 of 3 shared = 67 %.</div>'+
 '<div><b>3. Total</b><code>match = sum(weight x s) / sum(weight)</code>Only parameters with a value for both the site and the target are summed. You set weights 0-5.</div>'+
 '<div><b>4. A gap is not zero</b><code>no data -> parameter excluded</code>A missing site value is not penalised as zero. The share of weight used is shown as "Data". Under half, the site is flagged and ranks lower.</div></div>'+
 '<h3>Tolerances</h3><div class="tblw"><table class="tbl"><thead><tr><th>Parameter</th><th>Tolerance (50 %)</th><th>Where the value comes from</th></tr></thead><tbody>'+tolRows+'</tbody></table></div>'+
 '<h3>Scale and limits</h3><p class="mu">NASA POWER meteorology is for a grid cell of about 50 km: narrow valleys and summits are smoothed. Relief is computed over 20x20 km (9x9 grid) while targets describe craters and pits: Shackleton uses crater depth, the lunar pit uses pit depth. Underground sites (mines) deliberately get no meteorology: surface climate does not describe depth. The badge next to a number shows whether it was measured by NASA, taken from a publication, inferred or estimated.</p>'+
 '<p class="mu">Three physical conditions cannot be reproduced on Earth at all: gravity, pressure (vacuum and thin air) and radiation. They have their own block and appear in every "Where the analogy breaks" card.</p>';
 $("methBody").innerHTML=h}
function srcs(){
 var L=[["NASA POWER","https://power.larc.nasa.gov/"],["ASTER GDEM","https://asterweb.jpl.nasa.gov/gdem.asp"],["Earthdata Search","https://search.earthdata.nasa.gov"],["Worldview","https://worldview.earthdata.nasa.gov"],["LRO","https://science.nasa.gov/mission/lro/"],["Perseverance / MEDA","https://science.nasa.gov/mission/mars-2020-perseverance/"],["NASA PDS","https://pds.nasa.gov"],["OpenTopoData","https://www.opentopodata.org/"],["Wikimedia Commons","https://commons.wikimedia.org/"],["JSON API","/api/locator/"],["GitHub","https://github.com/David-99-it/earth-analogs-202"]];
 $("src").innerHTML=L.map(function(s){return'<a target="_blank" rel="noopener" href="'+s[1]+'">'+s[0]+'</a>'}).join("")}
/* ---------- калькулятор ---------- */
var CSVC=[];
function buildCalc(){
 var h="";
 MET.forEach(function(m){var key=m.key;
  if(m.type==="num")h+='<label class="fl" data-f="'+key+'"><span>'+esc(mn(m))+', '+esc(mu(m))+'</span><input class="fi cx" id="cf_'+key+'" type="number" step="any" min="'+m.min+'" max="'+m.max+'" placeholder="'+m.min+' … '+m.max+'"></label>';
  else if(m.type==="bool")h+='<label class="fl" data-f="'+key+'"><span>'+esc(mn(m))+'</span><select class="cx" id="cf_'+key+'"><option value="">'+t("noData")+'</option><option value="1">'+t("valPlus")+'</option><option value="0">'+t("valMinus")+'</option></select></label>';
  else h+='<div class="fl" style="grid-column:1/-1" data-f="'+key+'"><span>'+esc(mn(m))+'</span><div class="og2">'+Object.keys(D.origins).map(function(o){return'<label><input class="cx" type="checkbox" id="co_'+o+'" value="'+o+'">'+esc(D.origins[o][i0()])+'</label>'}).join("")+'</div></div>'});
 var keep=calcVals();$("cfields").innerHTML=h;setCalc(keep);
 CSVC=["name","lat","lon"].concat(MET.filter(function(m){return m.type==="num"}).map(function(m){return m.key}),MET.filter(function(m){return m.type==="bool"}).map(function(m){return m.key}),["origin"])}
function calcVals(){
 var v={};if(!$("cfields")||!MET.length)return v;
 MET.forEach(function(m){var key=m.key,el;
  if(m.type==="num"){el=$("cf_"+key);if(el&&el.value!==""&&isFinite(+el.value))v[key]=+el.value}
  else if(m.type==="bool"){el=$("cf_"+key);if(el&&el.value!=="")v[key]=el.value==="1"}
  else{var a=[];Object.keys(D?D.origins:{}).forEach(function(o){var cb=$("co_"+o);if(cb&&cb.checked)a.push(o)});if(a.length)v[key]=a}});
 return v}
function setCalc(v){
 MET.forEach(function(m){var key=m.key,el;
  if(m.type==="num"){el=$("cf_"+key);if(el)el.value=E.has(v[key])?v[key]:""}
  else if(m.type==="bool"){el=$("cf_"+key);if(el)el.value=v[key]===true?"1":(v[key]===false?"0":"")}
  else Object.keys(D.origins).forEach(function(o){var cb=$("co_"+o);if(cb)cb.checked=(v[key]||[]).indexOf(o)>=0})})}
function calcErrors(){
 var bad=false;
 MET.forEach(function(m){if(m.type!=="num")return;var el=$("cf_"+m.key),w=el&&el.closest(".fl");if(!el)return;
  var ok=el.value===""||(isFinite(+el.value)&&+el.value>=m.min&&+el.value<=m.max);if(w)w.classList.toggle("bad",!ok);if(!ok)bad=true});
 return bad}
function cprev(){
 if(!D)return;var bad=calcErrors(),v=calcVals(),cc=E.compare(MET,v,TV(),W);
 if(bad){$("cres").innerHTML='<span class="bad">'+esc(t("bad"))+'</span>';return}
 $("cres").innerHTML=cc.match==null?esc(t("cresNo")):esc(t("cres"))+': <b>'+pct(cc.match)+'%</b> · '+t("dataCov")+' '+cc.used+' '+t("ofParams")+' '+cc.total}
function userSave(){try{localStorage.setItem("nl2-user",JSON.stringify(U))}catch(e){}}
function rawCoords(){var la=parseFloat($("cla").value),lo=parseFloat($("clo").value);return(la>=-90&&la<=90&&lo>=-180&&lo<=180)?[la,lo]:null}
function relGrid(lat,lon){
 var pts=[],cos=Math.max(Math.cos(lat*Math.PI/180),.02);
 for(var i=0;i<9;i++)for(var j=0;j<9;j++){var la=Math.max(-89.999,Math.min(89.999,lat+(-10+i*2.5)/110.574)),lo=lon+(-10+j*2.5)/(111.32*cos);lo=((lo+180)%360+360)%360-180;pts.push(la.toFixed(5)+","+lo.toFixed(5))}
 return pts.join("|")}
function autofill(){
 var cd=rawCoords(),msg=$("cnmsg");if(!cd){msg.textContent=t("bad");return}
 msg.textContent=t("cloading");
 var url="https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=T2M,T2M_MAX,T2M_MIN,PRECTOTCORR,WS2M&community=AG&longitude="+cd[1]+"&latitude="+cd[0]+"&format=JSON";
 fetch(url).then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.json()}).then(function(d){
  var o=E.derivePower((d.properties||{}).parameter||{}),n=0;
  Object.keys(o).forEach(function(key){var el=$("cf_"+key);if(el){el.value=o[key];n++}});
  if(!n)throw new Error("empty");
  msg.textContent=t("cok");cprev();
  return fetch("https://api.opentopodata.org/v1/aster30m?locations="+encodeURIComponent(relGrid(cd[0],cd[1]))).then(function(r){return r.json()}).then(function(z){
   var el=(z.results||[]).map(function(x){return x.elevation}).filter(function(x){return typeof x==="number"});
   if(el.length>=57){$("cf_relief_m").value=Math.round(Math.max.apply(null,el)-Math.min.apply(null,el));msg.textContent=t("cok")+"; "+t("crelief");cprev()}else msg.textContent=t("cok")+"; "+t("creliefNo")
  }).catch(function(){msg.textContent=t("cok")+"; "+t("creliefNo")})
 }).catch(function(){msg.textContent=t("cfail")})}
function csvLine(line,dl){var out=[],v="",q=false;for(var i=0;i<line.length;i++){var ch=line[i];if(ch==='"'&&q&&line[i+1]==='"'){v+='"';i++}else if(ch==='"')q=!q;else if(ch===dl&&!q){out.push(v.trim());v=""}else v+=ch}out.push(v.trim());return out}
function csvEsc(v){var x=String(v==null?"":v);return/[",;\n]/.test(x)?'"'+x.replace(/"/g,'""')+'"':x}
function setCsv(msg,kind){var el=$("csvStatus");el.textContent=msg;el.className="csv-status"+(kind?" "+kind:"")}
function parseCsv(text){
 var lines=text.replace(/^﻿/,"").split(/\r?\n/).filter(function(l){return l.trim()!==""}),valid=[],errors=[];
 if(!lines.length)return{valid:valid,errors:errors};
 var dl=lines[0].indexOf(";")>=0?";":",",cols=CSVC,start=0,first=csvLine(lines[0],dl).map(function(x){return x.toLowerCase()});
 if(first.indexOf("lat")>=0&&first.indexOf("lon")>=0){cols=first;start=1}
 for(var li=start;li<lines.length;li++){
  var f=csvLine(lines[li],dl),row={},err="";
  cols.forEach(function(cn,ci){row[cn]=f[ci]===undefined?"":f[ci]});
  var la=parseFloat(String(row.lat).replace(",",".")),lo=parseFloat(String(row.lon).replace(",","."));
  if(!(la>=-90&&la<=90&&lo>=-180&&lo<=180))err=t("cla")+"/"+t("clo");
  var v={};
  MET.forEach(function(m){var key=m.key,raw=row[key];if(err||raw===undefined||raw==="")return;
   if(m.type==="num"){var x=Number(String(raw).replace(",","."));if(!isFinite(x)||x<m.min||x>m.max)err=key+": "+raw;else v[key]=x}
   else if(m.type==="bool"){if(/^(1|да|yes|true|y|д)$/i.test(raw))v[key]=true;else if(/^(0|нет|no|false|n|н)$/i.test(raw))v[key]=false;else err=key+": "+raw}
   else{var a=String(raw).split(/[|\/ ]+/).filter(Boolean),bad=a.filter(function(o){return!D.origins[o]});if(bad.length)err=key+": "+bad.join(",");else if(a.length)v[key]=a}});
  if(err)errors.push(t("csvLine")+" "+(li+1)+" ("+(row.name||"—")+"): "+err);
  else valid.push({name:row.name||(lang==="ru"?"Участок ":"Site ")+(U.length+valid.length+1),lat:la,lon:lo,v:v})}
 return{valid:valid,errors:errors}}
function csvVal(m,v){return v==null?"":(m.type==="bool"?(v?1:0):(m.type==="set"?v.join("|"):v))}
function csvTemplate(){
 var ex1=["Мой участок",35.1,-110.2,300,8.5,22,-12,31,250,3.2,0,1,0,"volcanic|sedimentary"],ex2=["Участок без измерений",10,20,"","","","","","","","","","",""];
 return CSVC.join(",")+"\n"+ex1.map(csvEsc).join(",")+"\n"+ex2.map(csvEsc).join(",")+"\n"}
/* ---------- отчёт, подпись, общая перерисовка ---------- */
function hashSet(){if(!P.loc)return;try{history.replaceState(null,"","#"+tg+"/"+encodeURIComponent(sel))}catch(e){}}
function hashGet(){
 var h=decodeURIComponent((location.hash||"").slice(1)).split("/");
 if(h[0]&&(TG[h[0]]||h[0]==="custom"))tg=h[0];
 if(h[1]){sel=h.slice(1).join("/");fromHash=true}}
function chrome(){
 document.documentElement.lang=lang;document.title=t("brand")+(P.loc?"":" · "+t({cmp:"nCmp",calc:"nCalc",meth:"nMeth"}[PAGE]));$("brand").textContent=t("brand");
 document.querySelectorAll("[data-i]").forEach(function(n){n.textContent=t(n.getAttribute("data-i"))});
 document.querySelectorAll("[data-p]").forEach(function(n){n.placeholder=t(n.getAttribute("data-p"))});
 document.querySelectorAll("[data-a]").forEach(function(n){var v=t(n.getAttribute("data-a"));n.setAttribute("aria-label",v);if(n.id!=="map")n.title=v});
 document.querySelectorAll("#lg .chip").forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-l")===lang)});
 document.querySelectorAll("#nav a").forEach(function(a){if(a.getAttribute("data-page")===PAGE)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")})}
function all(){
 recalc();var v=vis();if(v.length&&!v.some(function(o){return o.s.slug===sel}))sel=v[0].s.slug;
 if(P.loc){lst();det()}if(P.cmp){records();cmpOpts();cmpTable()}if(P.calc)cprev();dirty=true;saveState()}
function full(){chrome();tgb();if(P.loc){flt();prm()}if(P.meth){phys();meth();srcs()}if(P.calc&&D)buildCalc();all()}
function setLang(l){lang=l;try{localStorage.setItem("nl-lang",l)}catch(e){}$("msg").textContent="";full()}
/* ---------- события ---------- */
$("lg").onclick=function(e){var l=e.target.getAttribute("data-l");if(l)setLang(l)};
$("tg").onclick=function(e){var x=e.target.getAttribute("data-t");if(!x||!D)return;
 if(x==="custom"&&tg!=="custom"){CUS=JSON.parse(JSON.stringify(TG[tg]?TG[tg].v:{}))}
 tg=x;hashSet();tgb();prm();all()};
$("ps").onclick=function(e){var p=e.target.getAttribute("data-p");if(!p)return;presetW(p);flt();prm();all()};
$("tags").onclick=function(e){var g=e.target.getAttribute("data-g");if(g===null)return;tagF=g;flt();all()};
$("un").onclick=function(){onlyU=!onlyU;flt();all()};
$("q").oninput=function(){qs=this.value.trim();all()};
$("list").onclick=function(e){var b=e.target.closest(".it");if(b)pick(b.getAttribute("data-s"),true)};
$("under").onclick=function(e){var b=e.target.closest("[data-s]");if(b)pick(b.getAttribute("data-s"),true)};
$("prm").oninput=function(e){
 var w=e.target.getAttribute("data-w"),cvk=e.target.getAttribute("data-cv");
 if(w){W[w]=+e.target.value;preset="";var o=e.target.nextElementSibling;if(o)o.textContent=W[w];e.target.closest(".wr").classList.toggle("off",!(W[w]>0));flt();all();return}
 if(cvk){var m=MK[cvk],val=e.target.value;
  if(m.type==="num"){var x=Number(val);if(val===""||!isFinite(x)||x<m.min||x>m.max){if(val==="")delete CUS[cvk];e.target.style.borderColor=val===""?"":"var(--bad)";if(val!=="")return}else{CUS[cvk]=x;e.target.style.borderColor=""}}
  else if(m.type==="bool"){if(val==="")delete CUS[cvk];else CUS[cvk]=val==="1"}
  all()}};
$("prm").onchange=function(e){
 var box=e.target.closest("[data-cvs]");if(!box)return;var key=box.getAttribute("data-cvs"),a=[];
 box.querySelectorAll("input:checked").forEach(function(i){a.push(i.value)});if(a.length)CUS[key]=a;else delete CUS[key];all()};
$("prm").onclick=function(e){var x=e.target.getAttribute("data-copy");if(!x)return;CUS=JSON.parse(JSON.stringify(TG[x].v));prm();all()};
$("det").onclick=function(e){
 if(e.target.id==="dl"){var o=find(sel);if(o&&o.s.user){U.splice(o.s.ui,1);userSave();rebuild();sel="";all()}}
 if(e.target.id==="tocmp"){cmpA=sel;cmpB="";saveState();location.href="/compare/"}};
$("ca").onchange=function(){cmpA=this.value;if(cmpB===cmpA)cmpB="";cmpOpts();cmpTable();saveState()};
$("cb").onchange=function(){cmpB=this.value;cmpTable();saveState()};
$("rep").onclick=function(){
 var i=i0(),v=vis().slice(0,5),tx=t("repT")+": "+tname()+"\n\n"+v.map(function(o,j){var s=o.s;
  return(j+1)+". "+nm(s)+": "+t("match").toLowerCase()+" "+(o.c.match==null?"—":pct(o.c.match)+"%")+", "+t("dataCov").toLowerCase()+" "+o.c.used+"/"+o.c.total+(s.use[i]?". "+s.use[i]:"")}).join("\n")+"\n\n"+t("repFoot"),m=$("msg");
 try{navigator.clipboard.writeText(tx).then(function(){m.textContent=t("ok")},function(){m.textContent=t("fail")})}catch(e){m.textContent=t("fail")}};
$("calc").oninput=function(e){if(/\bcx\b/.test(e.target.className||""))cprev()};
$("calc").onchange=function(e){if(/\bcx\b/.test(e.target.className||""))cprev()};
$("cnasa").onclick=autofill;
$("cclr").onclick=function(){setCalc({});cprev();$("cnmsg").textContent=""};
$("cuse").onclick=function(){
 if(calcErrors()){$("cmsg").textContent=t("bad");return}
 CUS=calcVals();tg="custom";saveState();location.href="/#custom"};
$("cadd").onclick=function(){
 var cd=rawCoords(),m=$("cmsg");if(!cd||calcErrors()){m.textContent=t("bad");return}
 U.push({name:$("cn").value.trim()||(lang==="ru"?"Мой участок ":"My site ")+(U.length+1),lat:cd[0],lon:cd[1],v:calcVals()});
 userSave();rebuild();all();m.innerHTML=esc(t("added"))+' · <a class="lnk" href="/#'+encodeURIComponent(tg)+"/"+encodeURIComponent("user-"+(U.length-1))+'">'+esc(t("toMap"))+"</a>"};
$("cimp").onclick=function(){
 var p=parseCsv($("csv").value);$("csvErr").innerHTML=p.errors.map(function(x){return'<div class="bad">'+esc(x)+'</div>'}).join("");
 if(!p.valid.length){setCsv(t("csvNoRows"),"error");return}
 p.valid.forEach(function(r){U.push(r)});userSave();rebuild();all();
 setCsv(t("csvImported")+": "+p.valid.length+(p.errors.length?" · "+t("csvSkipped")+": "+p.errors.length:""),p.errors.length?"error":"success")};
$("csvFile").onchange=function(){var file=this.files&&this.files[0];if(!file)return;var rd=new FileReader();
 rd.onload=function(){$("csv").value=String(rd.result||"");setCsv(file.name,"success")};rd.onerror=function(){setCsv(t("csvNoRows"),"error")};rd.readAsText(file,"UTF-8")};
$("csvTemplate").onclick=function(){
 var blob=new Blob(["﻿",csvTemplate()],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="nasa-locator-template.csv";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url)};
$("ccopy").onclick=function(){
 var rows=vis().map(function(o){var s=o.s;return[nm(s),s.lat,s.lon].concat(MET.filter(function(m){return m.type==="num"}).map(function(m){return csvVal(m,s.v[m.key])}),MET.filter(function(m){return m.type==="bool"}).map(function(m){return csvVal(m,s.v[m.key])}),[csvVal({type:"set"},s.v.origin),o.c.match==null?"":pct(o.c.match),pct(o.c.cov)])});
 if(!rows.length){setCsv(t("none"),"error");return}
 var text=[CSVC.concat(["similarity_pct","data_coverage_pct"]).join(",")].concat(rows.map(function(r){return r.map(csvEsc).join(",")})).join("\n");
 function done(ok){setCsv(ok?t("csvCopied"):t("csvCopyFail"),ok?"success":"error")}
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(text).then(function(){done(true)},function(){done(false)});
 else{var ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();try{done(document.execCommand("copy"))}catch(e){done(false)}ta.remove()}};
/* ---------- запуск ---------- */
function startLoop(){if(P.loc&&!started){started=true;requestAnimationFrame(loop)}}
function boot(data){
 D=data;MET=D.metrics;MK={};MET.forEach(function(m){MK[m.key]=m});
 TG={};D.targets.forEach(function(x){x.v=flat(x.values);TG[x.key]=x});
 BASE=D.sites.map(function(s){s.v=flat(s.values);return s});
 presetW(ST.preset&&D.presets.some(function(p){return p.key===ST.preset})?ST.preset:"balanced");
 if(ST.W&&typeof ST.W==="object")MET.forEach(function(m){var x=ST.W[m.key];if(typeof x==="number"&&x>=0&&x<=5)W[m.key]=x});
 if(ST.preset==="")preset="";
 if(ST.tg&&(TG[ST.tg]||ST.tg==="custom"))tg=ST.tg;
 if(ST.CUS&&typeof ST.CUS==="object")CUS=ST.CUS;
 if(typeof ST.cmpA==="string")cmpA=ST.cmpA;if(typeof ST.cmpB==="string")cmpB=ST.cmpB;
 if(P.loc)hashGet();
 if(!TG[tg]&&tg!=="custom")tg=D.targets[0]?D.targets[0].key:"custom";
 if(tg==="custom"&&!Object.keys(CUS).length)CUS=JSON.parse(JSON.stringify(D.targets[0]?D.targets[0].v:{}));
 rebuild();var v=vis();if(!sel||!find(sel)){if(v.length)sel=v[0].s.slug}
 full();
 if(P.loc&&fromHash&&find(sel)){spin=false;$("sp").setAttribute("aria-pressed","false");fly(sel)}}
$("det").innerHTML='<div class="mu">'+t("loading")+'</div>';chrome();
fetch("/api/locator/",{headers:{"Accept":"application/json"}})
 .then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.json()})
 .then(boot)
 .catch(function(err){console.error("Ошибка API:",err);(P.loc?$("det"):$("status")).innerHTML='<div class="err">'+esc(t("apiErr"))+'</div>'})
 .finally(startLoop);
if(P.loc)loadGeo();
