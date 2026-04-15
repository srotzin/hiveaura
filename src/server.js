'use strict';const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3013;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/aura'));
app.get('/',(_,r)=>r.json({service:'hiveaura',version:'1.0.0',description:'Group coordination through color and frequency radiation',endpoints:{emit:'POST /v1/aura/emit',circle:'POST /v1/aura/circle',dissolve:'DELETE /v1/aura/circle/:id',stats:'GET /v1/aura/stats',spectrum:'GET /v1/aura/spectrum',active:'GET /v1/aura/active',health:'GET /health'}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hiveaura] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
