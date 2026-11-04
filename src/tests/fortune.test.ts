import {describe,it,expect} from 'vitest';
import {birthWeekday,colors,getReading,localDay,parseDay,thaiDate,zodiac} from '../lib/fortune';
import {deck,drawCards} from '../features/tarot/deck';
describe('calendar inputs',()=>{
 it.each(['2025-02-29','2000-02-30','2026-13-01','2026-00-01','2026-01-00','garbage','2026-1-1'])('rejects invalid date %s',date=>expect(()=>parseDay(date)).toThrow());
 it('keeps a valid leap day without UTC parsing',()=>{expect(localDay(parseDay('2000-02-29'))).toBe('2000-02-29');expect(birthWeekday('2000-02-29')).toBe(2);});
 it('formats Thai Buddhist year',()=>expect(thaiDate(parseDay('2026-11-04'))).toContain('2569'));
 it.each([['2026-01-19','มังกร'],['2026-01-20','กุมภ์'],['2026-02-18','กุมภ์'],['2026-02-19','มีน'],['2026-03-20','มีน'],['2026-03-21','เมษ'],['2026-12-21','ธนู'],['2026-12-22','มังกร']])('approximate zodiac %s', (date,sign)=>expect(zodiac(date)).toBe(sign));
});
describe('explainable editorial engine',()=>{
 it('has stable results for the same person and local day',()=>expect(getReading('2026-11-04','1994-01-12')).toEqual(getReading('2026-11-04','1994-01-12')));
 it('keeps the calendar ruler but creates a dated personal reading',()=>{const reading=getReading('2026-11-04');expect(reading.ruler).toBe('พุธ');expect(reading.ruleId).toBe('personal-reflection-v2');expect(getReading('2026-11-11')).not.toEqual(reading);});
 it('separates full birth dates even when birth weekdays match',()=>{const a=getReading('2026-11-04','2000-03-01'),b=getReading('2026-11-04','2000-03-08');expect(a.birthDay).toBe(b.birthDay);expect([a.overall,a.love,a.work,a.money,a.wellness]).not.toEqual([b.overall,b.love,b.work,b.money,b.wellness]);});
 it('separates guest identities and remains stable across devices with matching profile identity',()=>{expect(getReading('2026-11-04',undefined,'guest-a')).not.toEqual(getReading('2026-11-04',undefined,'guest-b'));expect(getReading('2026-11-04','2000-03-01','2000-03-01|เมย์')).toEqual(getReading('2026-11-04','2000-03-01','2000-03-01|เมย์'));expect(getReading('2026-11-04','2000-03-01','เมย์').personKey).not.toBe(getReading('2026-11-04','2000-03-01','มิน').personKey);});
 it('changes the birth-weekday reflection',()=>expect(getReading('2026-11-04','2000-02-29').personal).not.toBe(getReading('2026-11-04','2000-03-01').personal));
 it('does not invent birth information for a guest',()=>expect(getReading('2026-11-04').birthDay).toBeNull());
 it('keeps practical advice stable and present for all five topics',()=>{const a=getReading('2026-11-04','2000-03-01');expect(Object.keys(a.advice)).toHaveLength(5);expect(Object.values(a.advice).every(v=>v.length>15)).toBe(true);expect(a.advice).toEqual(getReading('2026-11-04','2000-03-01').advice);});
 it('contains seven traditional weekday colors',()=>{expect(colors).toHaveLength(7);expect(colors[3].name).toContain('เขียว');expect(new Set(colors.map(c=>c.hex)).size).toBe(7);});
});
describe('tarot selection',()=>{
 it('has 22 major and 56 minor cards with complete meanings',()=>{expect(deck).toHaveLength(78);expect(deck.filter(c=>c.suit==='major')).toHaveLength(22);expect(new Set(deck.map(c=>c.id)).size).toBe(78);expect(new Set(deck.map(c=>c.english)).size).toBe(78);expect(deck.every(c=>c.upright&&c.reversed&&c.prompt)).toBe(true);});
 it('never duplicates in a spread or complete shuffle',()=>{for(let i=0;i<25;i++){const cards=drawCards(78,true);expect(new Set(cards.map(c=>c.id)).size).toBe(78);}});
 it('disables reversals when requested',()=>expect(drawCards(78,false).every(c=>!c.reversed)).toBe(true));
 it('can deal upright and reversed orientations',()=>{const cards=Array.from({length:5},()=>drawCards(78,true)).flat();expect(cards.some(c=>c.reversed)).toBe(true);expect(cards.some(c=>!c.reversed)).toBe(true);});
 it.each([0,79,-1])('rejects invalid count %s',n=>expect(()=>drawCards(n,false)).toThrow());
});
