import {describe,it,expect} from 'vitest';
import {cardContent} from '../features/tarot/content';
import {deck} from '../features/tarot/deck';
import {interpretCard,combineReading,readingText} from '../features/tarot/interpretation';
describe('curated tarot meanings',()=>{
 it('covers all persisted IDs with unique complete content',()=>{
  expect(Object.keys(cardContent)).toHaveLength(78);
  for(const field of ['story','shadow','love','career','symbol','action','question'] as const){
   const values=deck.map(c=>cardContent[c.id][field]);expect(new Set(values).size,field).toBe(78);expect(values.every(v=>v.length>15),field).toBe(true);
  }
  expect(deck[8].english).toBe('Strength');expect(deck[11].english).toBe('Justice');
 });
 it('distinguishes equally numbered cards by their actual scene',()=>{
  expect(interpretCard({id:38,reversed:false}).meaning).toContain('เพื่อน');
  expect(interpretCard({id:52,reversed:false}).meaning).toContain('เจ็บ');
  expect(interpretCard({id:66,reversed:false}).meaning).toContain('ความถนัด');
 });
 it('uses orientation, context and position without changing drawn IDs',()=>{
  const card={id:18,reversed:true};const snapshot={...card};
  expect(interpretCard(card,'love',0).meaning).toBe(cardContent[18].shadow);
  expect(interpretCard(card,'love',0).contextText).toContain(cardContent[18].love);
  expect(interpretCard(card,'career',0).contextText).toContain(cardContent[18].career);
  const positions=[0,1,2].map(i=>interpretCard(card,'general',i).positionText);expect(new Set(positions).size).toBe(3);expect(card).toEqual(snapshot);
 });
 it('combines specific relationships, suit emphasis and reversals deterministically',()=>{
  const cards=[{id:52,reversed:false},{id:37,reversed:false},{id:14,reversed:true}];
  const combined=combineReading(cards);expect(combined.join(' ')).toContain('สามดาบกับสองถ้วย');expect(combined.join(' ')).toContain('กลับหัว');
  expect(combineReading(cards)).toEqual(combined);expect(combineReading([{id:36,reversed:false},{id:37,reversed:false},{id:38,reversed:false}]).join(' ')).toContain('ถ้วยปรากฏซ้ำ');
 });
 it('exports the full meaning, action, symbols and combined reading for the journal',()=>{
  const cards=[{id:16,reversed:false},{id:17,reversed:false},{id:19,reversed:false}];const text=readingText(cards,'career');expect(text).toContain(cardContent[16].story);expect(text).toContain(cardContent[17].career);expect(text).toContain(cardContent[19].action);expect(text).toContain('เรื่องราวของไพ่ชุดนี้');expect(text).toContain('หอคอยกับดาวแห่งความหวัง');
 });
});
