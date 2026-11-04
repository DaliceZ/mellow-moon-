import {Leaf} from 'lucide-react';
import {deck,type Drawn} from './deck';
import {interpretCard,type ReadingContext} from './interpretation';
import './reading-meaning.css';
export function ReadingMeaning({drawn,context,position}:{drawn:Drawn;context:ReadingContext;position?:number}){
 const card=deck[drawn.id],r=interpretCard(drawn,context,position);
 return <div className="card-interpretation meaning-page"><div className="meaning-tags"><span className="pill">{r.theme}</span><span className="meaning-orientation">{drawn.reversed?'ไพ่กลับหัว':'ไพ่หัวตั้ง'}</span></div><h3>{card.name}</h3><small>{card.english}</small><div className="meaning-prose"><p>{r.meaning}</p>{r.contextText&&<section className="meaning-context"><h4>{context==='love'?'เมื่อมองเรื่องความรัก':'เมื่อมองเรื่องงานและการเรียน'}</h4><p>{r.contextText}</p></section>}{r.positionText&&<p className="meaning-position">{r.positionText}</p>}<section className="meaning-action"><span className="eyebrow">ลองทีละนิด</span><p>{r.action}</p></section><div className="reflection"><Leaf size={16}/><span>{r.question}</span></div><details className="meaning-symbol"><summary>ทำไมไพ่ใบนี้ถึงเล่าเรื่องแบบนี้?</summary><p>{r.symbol} นี่คือสัญลักษณ์จากภาพดั้งเดิมของ Rider–Waite–Smith ซึ่งนำมาตีความใหม่ในภาพของเมลโล่มูน</p><h4>{drawn.reversed?'ถ้าไพ่หัวตั้ง':'ถ้าไพ่กลับหัว'}</h4><p>{drawn.reversed?card.upright:card.reversed}</p></details></div></div>;
}
