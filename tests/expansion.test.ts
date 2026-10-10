import assert from 'node:assert/strict';
import {createRoom,addPlayer,settleVillage,villageAction,townAction,lifeAction,cropSeconds,workTime} from '../lib/game.ts';
const r=createRoom(1000),p=addPlayer(1000);r.players.push(p);const v=settleVillage(r,1000),e=v.economy!,l=v.life!;let now=10000;
// Existing level-five saves continue through every new level without losing their stock or identity.
v.cottages=v.cannon=v.shield=5;const token=p.token;
for(const [action,key] of [['cottage','cottages'],['shield','shield'],['cannon','cannon']] as const){while(v[key]<50){v.stock.carrot=v.stock.berry=100000;villageAction(r,p,action,now+=1000)}assert.equal(v[key],50);assert.throws(()=>villageAction(r,p,action,now+=1000),/built|upgraded/)}
assert.equal(p.token,token);assert.equal(v.maxHp,1000);
l.level=50;e.coins=1000000;v.stock.carrot=1000000;e.buildings.greenhouse=49;townAction(r,p,'building:greenhouse',now+=1000);assert.equal(e.buildings.greenhouse,50);assert.ok(cropSeconds(v,'radish')>0);assert.equal(cropSeconds(v,'berry'),21);
l.tracks.tools=50;assert.equal(workTime(r),350);l.tracks.plots=49;lifeAction(r,p,'track:plots',now+=1000);assert.equal(r.plots.length,112);assert.equal(l.tracks.plots,50);assert.throws(()=>lifeAction(r,p,'track:plots',now+=1000),/Maximum/);
p.homeLevel=49;townAction(r,p,'home',now+=1000);assert.equal(p.homeLevel,50);assert.throws(()=>townAction(r,p,'home',now+=1000),/maximum/);
console.log('Level-50 expansion: saved progress, all core levels, hard caps, 112 patches, positive crop/tending times and personal cottage verified.');
