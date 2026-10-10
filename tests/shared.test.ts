import assert from 'node:assert/strict';
import {createRoom,addPlayer,farm,advance,publicRoom,SHARED_VILLAGE} from '../lib/game.ts';
Math.random=()=>.9;
const r=createRoom(1000),a=addPlayer(1000),b=addPlayer(1000);r.players.push(a,b);
assert.equal(r.code,SHARED_VILLAGE);assert.equal(r.plots.length,12);
farm(r,a,0,1000);assert.throws(()=>farm(r,b,0,1000),/Another helper/);assert.throws(()=>farm(r,a,1,1000),/tending/);
advance(r,2500);assert.equal(r.harvested,6);advance(r,3000);assert.equal(r.harvested,6);
farm(r,b,0,3000);advance(r,4500);assert.equal(r.plots[0].ready,64500);assert.throws(()=>farm(r,a,0,4500),/still growing/);
advance(r,1000000);assert.equal(r.plots[0].ready,64500);farm(r,a,0,1000000);advance(r,1001500);assert.equal(r.harvested,12);
assert.throws(()=>farm(r,a,-1,1001500),/Choose/);a.seen=1001500;const safe=publicRoom(r,1001500);assert.ok(!('token' in safe.players[0]));assert.ok(!('ids' in safe));assert.ok(!('homes' in safe));
console.log('Shared garden tests passed: locking, one reward, free planting, growth, persistence and privacy.');

const crops=createRoom(1000),gardener=addPlayer(1000);crops.players.push(gardener);
farm(crops,gardener,4,1000,'carrot');advance(crops,2500);assert.equal(crops.plots[4].ready,92500);assert.equal(crops.plots[4].crop,'carrot');farm(crops,gardener,4,92500,'flower');advance(crops,94000);assert.equal(crops.harvested,10);assert.equal(crops.effects[0].crop,'carrot');
farm(crops,gardener,5,94000,'flower');advance(crops,95500);assert.equal(crops.plots[5].ready,215500);farm(crops,gardener,5,215500);advance(crops,217000);assert.equal(crops.harvested,24);assert.throws(()=>farm(crops,gardener,6,217000,'invalid' as never),/seed/);assert.equal(crops.plots[6].reserved,'');console.log('Crop timing, selected-seed persistence, correct harvest yield and invalid-seed checks passed.');
