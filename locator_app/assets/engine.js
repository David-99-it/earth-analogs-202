/* Движок сходства: без DOM, проверяется отдельно. Формулы те же, что в locator_app/metrics.py. */
var LocEngine=(function(){
 var MONTHS=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
 function isNum(x){return typeof x==="number"&&isFinite(x)}
 function has(v){return v!==null&&v!==undefined&&!(Array.isArray(v)&&v.length===0)}
 function uniq(a){var s={},o=[];a.forEach(function(x){if(!s[x]){s[x]=1;o.push(x)}});return o}
 /* Совпадение одного параметра 0..1. null = сравнить нельзя (нет значения). Пропуск НИКОГДА не равен нулю. */
 function mscore(m,a,b){
  if(!has(a)||!has(b))return null;
  if(m.type==="num"){if(!isNum(a)||!isNum(b))return null;var d=(a-b)/m.tau;return 1/(1+d*d)}
  if(m.type==="bool")return(!!a===!!b)?1:0;
  if(m.type==="set"){var A=uniq(a),B=uniq(b),n=0;B.forEach(function(x){if(A.indexOf(x)>=0)n++});return n/uniq(A.concat(B)).length}
  return null}
 /* match: средневзвешенное только по параметрам, где данные есть и у места, и у цели.
    cov: доля веса, по которой у места есть данные (среди параметров, которые определены у цели). */
 function compare(M,vals,target,W){
  var num=0,den=0,wAll=0,used=0,total=0,parts={};
  M.forEach(function(m){var k=m.key,w=W[k];if(!(w>0))return;var tv=target[k];if(!has(tv))return;
   total++;wAll+=w;var s=mscore(m,vals[k],tv);if(s===null){parts[k]=null;return}
   parts[k]=s;num+=w*s;den+=w;used++});
  return{match:den?num/den:null,cov:wAll?den/wAll:0,parts:parts,used:used,total:total}}
 function rankCmp(a,b){
  var ao=a.c.cov>=.5?1:0,bo=b.c.cov>=.5?1:0;if(ao!==bo)return bo-ao;
  var am=a.c.match===null?-1:a.c.match,bm=b.c.match===null?-1:b.c.match;if(bm!==am)return bm-am;
  return b.c.cov-a.c.cov}
 function clean(v){if(v===null||v===undefined)return null;v=+v;return(!isFinite(v)||v<=-900)?null:v}
 function r1(x){return Math.round(x*10)/10}
 /* Из ответа NASA POWER (climatology) получает наши параметры. Пропуски остаются пропусками. */
 function derivePower(par){
  var o={},t=par.T2M||{},mx=par.T2M_MAX||{},mn=par.T2M_MIN||{},pr=par.PRECTOTCORR||{},ws=par.WS2M||{},v;
  v=clean(t.ANN);if(v!==null)o.temp_mean_c=r1(v);
  var hi=MONTHS.map(function(m){return clean(mx[m])}),lo=MONTHS.map(function(m){return clean(mn[m])});
  var hok=hi.filter(function(x){return x!==null}),lok=lo.filter(function(x){return x!==null});
  if(hok.length>=10)o.temp_max_c=r1(Math.max.apply(null,hok));
  if(lok.length>=10)o.temp_min_c=r1(Math.min.apply(null,lok));
  var sp=[];for(var i=0;i<12;i++)if(hi[i]!==null&&lo[i]!==null)sp.push(hi[i]-lo[i]);
  if(sp.length>=10)o.temp_diurnal_c=r1(sp.reduce(function(a,b){return a+b},0)/sp.length);
  v=clean(pr.ANN);if(v!==null&&v>=0)o.precip_mm=r1(v*365);
  v=clean(ws.ANN);if(v!==null&&v>=0)o.wind_ms=r1(v);
  return o}
 return{mscore:mscore,compare:compare,rankCmp:rankCmp,has:has,isNum:isNum,derivePower:derivePower}
})();
