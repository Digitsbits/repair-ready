export const zones=['Front bumper','Hood','Left side','Right side','Roof','Rear bumper'];
export const fresh=()=>({year:'',make:'',model:'',zones:[],severity:'Not sure',notes:'',day:'',time:'Morning',transport:'No preference'});
export function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function validDate(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(`${s}T12:00:00`);return !Number.isNaN(d.getTime())&&d.getFullYear()===+s.slice(0,4)&&d.getMonth()+1===+s.slice(5,7)&&d.getDate()===+s.slice(8,10);}
export function validate(s,step){
 if(step===0){if(!/^\d{4}$/.test(s.year)||+s.year<1900||+s.year>2100)return 'Enter a four-digit model year between 1900 and 2100.';if(!s.make.trim()||!s.model.trim())return 'Add a vehicle make and model to continue.';}
 if(step===1&&!s.zones.length)return 'Select at least one area on the diagram or in the list.';
 if(step===2&&(!validDate(s.day)||s.day<today()))return 'Choose today or a future date for your preferred visit.';
 return '';
}
export function clean(raw){const s=fresh();if(!raw||typeof raw!=='object')return s;for(const k of Object.keys(s)){if(k==='zones')s.zones=Array.isArray(raw.zones)?[...new Set(raw.zones.filter(x=>zones.includes(x)))]:[];else if(typeof raw[k]==='string')s[k]=raw[k].slice(0,k==='notes'?1500:80);}if(!['Not sure','Surface marks','Dent or deformation','Part damaged'].includes(s.severity))s.severity='Not sure';if(!['Morning','Afternoon','Flexible'].includes(s.time))s.time='Morning';if(!['No preference','I can leave the vehicle','I need to wait'].includes(s.transport))s.transport='No preference';return s;}
export function brief(s,photoCount=0){return {title:'Repair Ready — demo intake brief',notice:'Not a quote or booking. Nothing has been transmitted. Photo files are not included.',vehicle:{year:s.year,make:s.make,model:s.model},damage:{areas:s.zones,severity:s.severity,notes:s.notes,localPhotoCount:photoCount},preference:{date:s.day,time:s.time,transport:s.transport}};}
