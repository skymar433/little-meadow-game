import assert from 'node:assert/strict';
import {ANIMALS,assignAnimal,createRoom,addPlayer,publicRoom} from '../lib/game.ts';
const r=createRoom(1000);Math.random=()=>.2;
for(let n=0;n<20;n++){const p=addPlayer(1000);assignAnimal(r,p);r.players.push(p)}
assert.equal(ANIMALS.length,10);for(let n=0;n<10;n++)assert.equal(r.players.filter(p=>p.animal===n).length,2);
const a=r.players[0],chosen=a.animal;assignAnimal(r,a);assert.equal(a.animal,chosen);const old=addPlayer(1000);r.players.push(old);assignAnimal(r,old);assert.ok(Number.isInteger(old.animal));const safe=publicRoom(r,1000);assert.equal(safe.players[0].animal,chosen);assert.ok(!JSON.stringify(safe).includes(a.token));console.log('Animal assignment passed: ten species, balanced rotation, remembered returning characters, legacy migration, public avatar without token.');
