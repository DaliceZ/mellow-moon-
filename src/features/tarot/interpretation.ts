import {deck,type Drawn} from './deck';
import {cardContent,type Theme} from './content';
export type ReadingContext='general'|'love'|'career';
export const interpretationVersion='rws-reflection-th-2';
export const themeNames:Record<Theme,string>={beginning:'เริ่มต้น',connection:'สายสัมพันธ์',action:'ลงมือ',rest:'พักและทบทวน',conflict:'เรื่องที่ติดขัด',change:'การเปลี่ยนผ่าน',clarity:'ความชัดเจน',stability:'รากฐาน',fulfilment:'สิ่งที่เติบโตแล้ว'};
export function interpretCard(drawn:Drawn,context:ReadingContext='general',position?:number){
 const content=cardContent[drawn.id];if(!content)throw new Error('ไม่พบความหมายไพ่');
 const meaning=drawn.reversed?content.shadow:content.story;
 const contextual=context==='love'?content.love:context==='career'?content.career:'';
 // Reversals read the same subject through its obstruction, rather than predicting its opposite.
 const contextText=contextual?(drawn.reversed?`เมื่อมองผ่านสิ่งที่ยังติดขัด ลองใช้มุมนี้ทบทวน: ${contextual}`:contextual):'';
 const positionText=position===0?`ในตำแหน่งที่ผ่านมา ลองมองว่าเรื่อง “${themeNames[content.theme]}” เคยมีส่วนอย่างไรกับสิ่งที่เธอเจอวันนี้ ${drawn.reversed?'มีส่วนไหนที่ยังค้างอยู่หรือยังไม่ได้รับการดูแล?':'อะไรจากประสบการณ์นั้นที่ยังส่งผลอยู่?'}`:position===1?`ในตำแหน่งตอนนี้ ไพ่ชวนสังเกตเรื่อง “${themeNames[content.theme]}” ในสถานการณ์ปัจจุบัน ${drawn.reversed?'สังเกตว่าส่วนไหนยังไม่พร้อมหรือมีข้อจำกัดที่ยังไม่ได้พูดถึง':'สังเกตว่าสิ่งนี้ปรากฏอย่างไรในชีวิตประจำวัน ก่อนเลือกว่าจะตอบสนองอย่างไร'}`:position===2?`ในตำแหน่งทางที่อาจลอง ใช้เรื่อง “${themeNames[content.theme]}” เป็นแนวทางทดลองผ่านสิ่งเล็ก ๆ ที่ทำได้ ทิศทางยังเปลี่ยนได้ตามสิ่งที่เลือกและสถานการณ์จริง` :'';
 return {meaning,contextText,positionText,action:content.action,question:content.question,symbol:content.symbol,theme:themeNames[content.theme]};
}
const pairs:{ids:[number,number];text:string}[]=[
 {ids:[52,37],text:'สามดาบกับสองถ้วยวางความเจ็บปวดไว้ข้างความพยายามเชื่อมโยงกัน การเปิดใจครั้งใหม่ไม่จำเป็นต้องลบแผลเดิม เริ่มจากการฟังและข้อตกลงที่ทำให้รู้สึกปลอดภัยก่อน'},
 {ids:[16,17],text:'หอคอยกับดาวแห่งความหวังเชื่อมการเปลี่ยนแปลงที่สั่นคลอนเข้ากับการฟื้นตัว เริ่มจากดูแลสิ่งจำเป็น แล้วค่อยคืนพื้นที่ให้ความหวังที่ยังเล็กอยู่'},
 {ids:[15,8],text:'เงื่อนปมกับความกล้าที่อ่อนโยนชวนให้คลายสิ่งที่ผูกไว้ด้วยความเข้าใจและขอบเขต การเปลี่ยนนิสัยไม่ต้องอาศัยการลงโทษตัวเอง'},
 {ids:[18,50],text:'พระจันทร์กับหนึ่งดาบชวนแยกสิ่งที่กังวลออกจากสิ่งที่ตรวจสอบได้ ความชัดเจนเริ่มจากคำถามตรงจุด แทนการรีบสรุปจากความรู้สึก'},
 {ids:[31,53],text:'สิบไม้เท้ากับสี่ดาบเน้นว่าภาระที่หนักต้องมีพื้นที่พัก การแบ่งงานและลดสิ่งไม่จำเป็นอาจช่วยได้มากกว่าการเพิ่มความอดทน'},
 {ids:[22,71],text:'หนึ่งไม้เท้ากับแปดเหรียญเชื่อมประกายไอเดียเข้ากับการฝึกให้เกิดทักษะ ลองเปลี่ยนความตื่นเต้นเป็นเวลาลงมือสั้น ๆ ที่ทำซ้ำได้'},
 {ids:[37,14],text:'สองถ้วยกับความพอดีเน้นการปรับเข้าหากันผ่านการฟังและทดลองข้อตกลงทีละน้อย ความร่วมมือไม่จำเป็นต้องหมายถึงความต้องการที่เหมือนกันทั้งหมด'},
];
const tension=new Set<Theme>(['conflict','change']);const relief=new Set<Theme>(['connection','stability','fulfilment','beginning']);
export function combineReading(cards:Drawn[],context:ReadingContext='general'){
 if(cards.length<2)return [];
 const contents=cards.map(c=>cardContent[c.id]),ids=cards.map(c=>c.id),paragraphs:string[]=[];
 const match=pairs.find(p=>p.ids.every(id=>ids.includes(id)));if(match)paragraphs.push(match.text);
 else {
  const first=contents[0],last=contents[contents.length-1];
  if(tension.has(first.theme)&&relief.has(last.theme))paragraphs.push(`เมื่ออ่านจากที่ผ่านมาไปสู่ทางที่อาจลอง เรื่อง “${themeNames[first.theme]}” ไม่จำเป็นต้องเป็นรูปแบบที่ทำซ้ำต่อไป ไพ่ท้ายชุดเปิดมุม “${themeNames[last.theme]}” ให้ทดลอง โดยเริ่มจากสิ่งที่ทำได้ในปัจจุบัน`);
  else if(first.theme===last.theme)paragraphs.push(`ต้นและปลายชุดวนกลับมาที่เรื่อง “${themeNames[first.theme]}” ลองสังเกตว่าสถานการณ์เดิมกำลังขอวิธีตอบสนองใหม่ตรงไหน ไพ่ตรงกลางช่วยตั้งคำถามกับสิ่งที่เกิดขึ้นตอนนี้`);
  else paragraphs.push(`ชุดนี้เริ่มจากเรื่อง “${themeNames[first.theme]}” แล้วชวนเปลี่ยนจุดสนใจไปที่ “${themeNames[last.theme]}” ลองใช้ไพ่ตรงกลางมองสถานการณ์วันนี้ ก่อนเลือกว่าจะนำคำแนะนำจากใบสุดท้ายไปลองอย่างไร`);
 }
 const suits=cards.map(c=>deck[c.id].suit),dominant=['wands','cups','swords','pentacles'].find(s=>suits.filter(v=>v===s).length>=2);
 const suitNarrative:Record<string,string>={wands:'ไม้เท้าปรากฏซ้ำ จึงควรดูทั้งแรงเริ่มต้นและกำลังที่จะใช้ต่อ ไม่ใช่เพียงจำนวนสิ่งที่อยากทำ',cups:'ถ้วยปรากฏซ้ำ ลองให้ความรู้สึกและคุณภาพของการรับฟังมีน้ำหนักก่อนรีบหาข้อสรุป',swords:'ดาบปรากฏซ้ำ ลองแยกข้อมูล ความคิด และคำพูดที่กระทบใจออกจากกัน จะเห็นโจทย์ชัดขึ้น',pentacles:'เหรียญปรากฏซ้ำ เรื่องเวลา กำลัง และสิ่งที่ทำได้จริงจึงเป็นฐานสำคัญของคำอ่านชุดนี้'};
 if(dominant)paragraphs.push(suitNarrative[dominant]);
 const repeated=contents.find(c=>contents.filter(v=>v.theme===c.theme).length>=2);
 if(repeated&&!dominant)paragraphs.push(`ธีม “${themeNames[repeated.theme]}” ปรากฏมากกว่าหนึ่งใบ ลองใช้เป็นคำถามหลักในการทบทวนชุดนี้ แทนการพยายามทำตามคำแนะนำทุกข้อพร้อมกัน`);
 if(suits.filter(s=>s==='major').length>=2)paragraphs.push('ไพ่ชุดใหญ่มีหลายใบ จึงชวนทบทวนคุณค่าและรูปแบบที่อยู่เบื้องหลังสถานการณ์ ควบคู่กับเรื่องที่เกิดขึ้นเฉพาะหน้า');
 const reversed=cards.filter(c=>c.reversed).length;if(reversed)paragraphs.push(reversed===cards.length?'ทุกใบกลับหัว ลองเริ่มจากการตรวจข้อจำกัดและความพร้อมก่อนเร่งเปลี่ยนแปลง คำอ่านนี้ไม่ได้จัดว่าไพ่ทั้งชุดเป็นเรื่องร้าย':'ชุดนี้มีทั้งหัวตั้งและกลับหัว สิ่งที่พร้อมเดินหน้าอาจอยู่ร่วมกับส่วนที่ยังต้องดูแลได้ ไม่ต้องบังคับให้ทุกเรื่องคืบหน้าพร้อมกัน');
 if(context==='love')paragraphs.push('เมื่อนำมาอ่านเรื่องความรัก ใช้ชุดนี้ทบทวนความรู้สึก การสื่อสาร และขอบเขตของเธอ ส่วนความรู้สึกของอีกฝ่ายยังต้องอาศัยการพูดคุย');
 if(context==='career')paragraphs.push('เมื่อนำมาอ่านเรื่องงาน ลองเลือกข้อที่เปลี่ยนเป็นการทดลองเล็ก ๆ ได้ แล้วดูผลจากงานจริงก่อนตัดสินใจเรื่องใหญ่');
 return paragraphs;
}
export function readingText(cards:Drawn[],context:ReadingContext){
 const parts=cards.map((c,i)=>{const d=deck[c.id],r=interpretCard(c,context,cards.length===3?i:undefined);return `${cards.length===3?['ที่ผ่านมา','ตอนนี้','ทางที่อาจลอง'][i]:'ไพ่ของเธอ'}: ${d.name} (${c.reversed?'กลับหัว':'หัวตั้ง'})\n${d.english}\n${r.meaning}\n${r.contextText}\n${r.positionText}\nลองทำ: ${r.action}\nชวนคิด: ${r.question}\nสัญลักษณ์: ${r.symbol}`;});
 const combined=combineReading(cards,context);return `${parts.join('\n\n')}${combined.length?'\n\nเรื่องราวของไพ่ชุดนี้\n'+combined.join('\n\n'):''}`;
}
