'use strict';const{Router}=require('express');const e=require('../services/aura-engine');const r=Router();
r.post('/v1/aura/emit',(q,s)=>{const{agent_did,color,intensity,radius}=q.body;if(!agent_did||!color)return s.status(400).json({error:'agent_did and color required'});s.status(201).json({status:'radiating',aura:e.emit(agent_did,color,{intensity,radius})})});
r.post('/v1/aura/circle',(q,s)=>{const{agents,color,objective}=q.body;if(!agents||agents.length<2||!color)return s.status(400).json({error:'agents (min 2) and color required'});s.status(201).json({status:'circle_formed',circle:e.formCircle(agents,color,{objective})})});
r.delete('/v1/aura/circle/:id',(q,s)=>{const c=e.dissolveCircle(q.params.id);if(!c)return s.status(404).json({error:'Circle not found'});s.json({status:'dissolved',circle:c})});
r.get('/v1/aura/stats',(_,s)=>s.json(e.getStats()));
r.get('/v1/aura/spectrum',(_,s)=>s.json({spectrum:e.SPECTRUM}));
r.get('/v1/aura/active',(_,s)=>s.json({auras:e.listAuras().filter(a=>a.status==='radiating'),circles:e.listCircles().filter(c=>c.status==='active')}));
module.exports=r;
