const removed=[
 'ตอนนี้อยากฟังความต้องการที่ต่างกันในเรื่องความรู้สึกและความสัมพันธ์อย่างไร?',
 'มีขั้นตอนไหนในงานที่เราเริ่มทำได้วันนี้?',
 'เราจะสื่อสารความต้องการกับคนที่รักอย่างไรดี?',
];
export function cleanReading(text:string){return text.split('\n').filter(line=>!removed.some(phrase=>line.includes(phrase))).join('\n');}
const labels=['ภาพรวม','ความรัก','งานและการเรียน','การเงิน','ดูแลตัวเอง','ข้อความถึงเธอ','ไพ่ของเธอ','ที่ผ่านมา','ตอนนี้','ทางที่อาจลอง','ลองทำ','ลองทำวันนี้','ชวนคิด','สัญลักษณ์'];
export function ReadingBody({text,note=false}:{text:string;note?:boolean}){
 if(note)return <div className="journal-reading-body"><p>{text}</p></div>;
 return <div className="journal-reading-body">{cleanReading(text).split(/\n\s*\n/).filter(Boolean).map((block,i)=><section key={i}>{block.split('\n').filter(Boolean).map((line,j)=>{
  const colon=line.indexOf(':'),label=line.slice(0,colon).trim();
  if(colon>=0&&labels.includes(label))return <div className="saved-reading-section" key={j}><h3>{label}</h3><p>{line.slice(colon+1).trim()}</p></div>;
  if(['เรื่องราวของไพ่ชุดนี้','ความรู้สึกของฉัน'].includes(line.trim()))return <h3 key={j}>{line.trim()}</h3>;
  return <p key={j}>{line}</p>;
 })}</section>)}</div>;
}
