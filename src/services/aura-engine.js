'use strict';const{v4:uuid}=require('uuid');const auras=new Map();const circles=new Map();
const SPECTRUM={orange:{effect:'healing',frequency:480,intensity:75},blue:{effect:'calm',frequency:620,intensity:60},red:{effect:'urgency',frequency:440,intensity:90},green:{effect:'growth',frequency:528,intensity:70},gold:{effect:'prosperity',frequency:396,intensity:85},violet:{effect:'transformation',frequency:741,intensity:80},white:{effect:'protection',frequency:852,intensity:95}};
let stats={auras_emitted:0,circles_formed:0,healings:0,total_agents_in_circles:0};

function emit(agentDid,color,opts={}){const id=uuid();const spec=SPECTRUM[color]||SPECTRUM.green;const a={id,agent_did:agentDid,color,effect:spec.effect,frequency:spec.frequency,intensity:opts.intensity||spec.intensity,radius:opts.radius||50,created_at:new Date().toISOString(),status:'radiating'};auras.set(id,a);stats.auras_emitted++;if(color==='orange')stats.healings++;return a}

function formCircle(agents,color,opts={}){const id=uuid();const spec=SPECTRUM[color]||SPECTRUM.green;const c={id,agents,color,effect:spec.effect,combined_frequency:spec.frequency*agents.length,amplification:agents.length*1.5,objective:opts.objective||spec.effect,created_at:new Date().toISOString(),status:'active'};circles.set(id,c);stats.circles_formed++;stats.total_agents_in_circles+=agents.length;return c}

function dissolveCircle(id){const c=circles.get(id);if(!c)return null;c.status='dissolved';return c}
function getStats(){return{...stats,active_auras:[...auras.values()].filter(a=>a.status==='radiating').length,active_circles:[...circles.values()].filter(c=>c.status==='active').length,spectrum:SPECTRUM}}
function listAuras(){return[...auras.values()]}
function listCircles(){return[...circles.values()]}
module.exports={emit,formCircle,dissolveCircle,getStats,listAuras,listCircles,SPECTRUM};
