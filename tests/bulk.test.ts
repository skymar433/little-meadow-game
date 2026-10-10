import assert from 'node:assert/strict';
import {createRoom,addPlayer,bulkFarm,farm,advance,settleVillage,upgradeCost,villageAction,publicRoom} from '../lib/game.ts';
Math.random=()=>.9;
const r=createRoom(1000),a=addPlayer(1000),b=addPlayer(1000);r.players.push(a,b);
// A friend already working keeps their patch; a bulk route only claims eligible patches.
farm(r,b,3,1000,'flower');bulkFarm(r,a,'plant',1000,'carrot');
assert.equal(a.queue!.length,7);assert.equal(r.plots[3].reserved,b.id);assert.equal(r.plots[4].reserved,a.id);
assert.throws(()=>farm(r,b,4,1000),/tending/);assert.throws(()=>bulkFarm(r,a,'harvest',1000),/tending/);
advance(r,2500);assert.equal(r.plots[4].crop,'carrot');assert.equal(r.plots[4].ready,92500);assert.equal(a.job!.plot,5);assert.equal(r.plots[3].crop,'flower');
advance(r,200000);assert.equal(a.job,null);assert.equal(a.queue!.length,0);assert.ok(r.plots.every(p=>!p.reserved));assert.equal(a.total,8);
// Mixed crops, including a golden one, award once per patch even after a long gap.
r.plots[4].golden=true;bulkFarm(r,a,'harvest',200000);assert.equal(a.queue!.length,11);
assert.throws(()=>farm(r,b,4,200000),/Another helper/);
advance(r,300000);assert.equal(r.harvested,122);assert.deepEqual(r.village!.stock,{berry:18,carrot:90,flower:14,wheat:0,tomato:0,corn:0,pumpkin:0,blueberry:0,radish:0,melon:0});assert.equal(a.total,20);assert.ok(r.plots.every(p=>!p.ready&&!p.reserved));
advance(r,400000);assert.equal(r.harvested,122);assert.throws(()=>bulkFarm(r,a,'harvest',400000),/Nothing/);
assert.throws(()=>bulkFarm(r,a,'plant',400000,'bad' as never),/seed/);assert.ok(r.plots.every(p=>!p.reserved));
const v=settleVillage(r,400000);v.stock.carrot=200;villageAction(r,a,'cottage',401000);assert.equal(v.stock.carrot,180);assert.equal(upgradeCost(v,'cottage'),40);villageAction(r,a,'cottage',402000);assert.equal(v.stock.carrot,140);assert.equal(upgradeCost(v,'cottage'),60);
a.seen=402000;b.seen=402000;const safe=publicRoom(r,402000);assert.ok(safe.activity!.some(e=>e.kind==='build'));assert.ok(safe.activity!.some(e=>e.text.includes('golden')));assert.ok(!JSON.stringify(safe).includes(a.token));assert.ok(!JSON.stringify(safe).includes(b.token));
console.log('Bulk and economy checks passed: friend locks, sequential routes, offline completion, mixed/golden yields once, empty/invalid requests, escalating costs, and activity privacy.');
