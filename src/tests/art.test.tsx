import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {TarotArt} from '../components/TarotArt';
import {deck} from '../features/tarot/deck';
import {mkdirSync,writeFileSync} from 'node:fs';
import {entryCards} from '../features/journal/Journal';
describe('illustrated deck',()=>{
 it('recovers artwork and original spread order from older saved readings',()=>{
 expect(entryCards({id:'old',date:'2026-11-04',kind:'tarot',title:'ไพ่ของฉัน',text:'ที่ผ่านมา: แสงแดดของเรา (กลับหัว)\nตอนนี้: นักเดินทาง (หัวตั้ง)'})).toEqual([{id:19,reversed:true},{id:0,reversed:false}]);
 });
 it('renders 78 independent illustrations and produces a review sheet',()=>{
 const renders=deck.map(card=>renderToStaticMarkup(<TarotArt card={card}/>));
 expect(renders).toHaveLength(78);expect(renders.every((svg,i)=>svg.includes(`data-card-art="${i}"`))).toBe(true);
 expect(new Set(renders.map(svg=>svg.replace(/<text[\s\S]*?<\/text>/g,'').replace(/aria-label="[^"]*"/g,'').replace(/data-card-art="[^"]*"/g,''))).size).toBe(78);
 mkdirSync('output',{recursive:true});writeFileSync('output/deck-gallery.html',`<!doctype html><html lang="th"><meta charset="UTF-8"><title>Mellow Moon · Original deck artwork</title><style>body{margin:35px;background:#fff9f3;color:#66516c;font:14px sans-serif}h1{font:30px Georgia}main{display:grid;grid-template-columns:repeat(8,1fr);gap:25px 15px}figure{margin:0}svg{width:100%;display:block}figcaption{text-align:center;font-size:10px;padding:7px}</style><h1>Mellow Moon · the storybook deck</h1><main>${renders.map((svg,i)=>`<figure>${svg}<figcaption>${deck[i].english}</figcaption></figure>`).join('')}</main></html>`);
 });
});
