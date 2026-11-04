import {useRef,useState,type CSSProperties,type PointerEvent} from 'react';
import {TarotArt,CardBack} from './Art';
import type {Card} from '../features/tarot/deck';
import './tarot-card-3d.css';

export function TarotCard3D({card,reversed,revealed,onReveal,index}:{card:Card;reversed:boolean;revealed:boolean;onReveal:()=>void;index:number}){
 const [rotation,setRotation]=useState({x: -9,y:0});const [dragging,setDragging]=useState(false),[foil]=useState(true);
 const drag=useRef<{x:number;y:number;rx:number;ry:number;moved:boolean}|null>(null);
 const suppressClick=useRef(false);
 function down(e:PointerEvent<HTMLButtonElement>){if(!revealed||e.button!==0)return;drag.current={x:e.clientX,y:e.clientY,rx:rotation.x,ry:rotation.y,moved:false};suppressClick.current=false;e.currentTarget.setPointerCapture(e.pointerId);}
 function move(e:PointerEvent<HTMLButtonElement>){const d=drag.current;if(!d)return;const dx=e.clientX-d.x,dy=e.clientY-d.y;if(Math.abs(dx)>5||Math.abs(dy)>5){d.moved=true;setDragging(true);}if(d.moved)setRotation({x:e.pointerType==='touch'?d.rx:Math.max(-65,Math.min(65,d.rx-dy*.4)),y:d.ry+dx*.8});}
 function end(){if(drag.current)suppressClick.current=drag.current.moved;drag.current=null;setDragging(false);}
 const y=rotation.y+(revealed?0:180),angle=((rotation.y%360)+360)%360;
 const style={'--card-rx':`${rotation.x}deg`,'--card-ry':`${y}deg`,'--light-x':`${50+Math.sin(y*Math.PI/180)*38}%`,'--light-y':`${40+rotation.x*.6}%`,'--foil-hue':`${y*.6}deg`,'--glint':.3+Math.abs(Math.sin(y*Math.PI/180))*.6} as CSSProperties;
 return <div className={`card-object ${dragging?'is-dragging':''} ${foil?'has-foil':''}`} style={style}>
 <div className="card-stage"><div className="card-ground"/><button className="card-gesture" type="button" onPointerDown={down} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end} onClick={()=>{if(suppressClick.current){suppressClick.current=false;return;}if(!revealed)onReveal();}} onKeyDown={e=>{if(!revealed)return;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key)){e.preventDefault();if(e.key==='Home')setRotation({x:-9,y:0});else setRotation(r=>({x:e.key==='ArrowUp'?Math.max(-65,r.x-15):e.key==='ArrowDown'?Math.min(65,r.x+15):r.x,y:r.y+(e.key==='ArrowRight'?45:e.key==='ArrowLeft'?-45:0)}));}}} aria-label={revealed?`${card.name} ${reversed?'กลับหัว':'หัวตั้ง'} หมุนไพ่ด้วยปุ่มลูกศร`:`เปิดไพ่ใบที่ ${index+1}`} aria-describedby={revealed?`card-help-${index}`:undefined}>
 <span className="card-solid" aria-hidden="true">
 {Array.from({length:9},(_,i)=><span className="card-lamination" key={i} style={{transform:`translateZ(${i*.48-1.92}px)`}}/>)}
 <span className="card-surface card-obverse"><span className="card-print" style={{transform:reversed?'rotate(180deg)':undefined}}>{revealed?<TarotArt card={card}/>:<CardBack/>}</span><span className="card-foil"/><span className="card-varnish"/><span className="card-gold-rim"/><span className="card-sparkles"/></span>
 <span className="card-surface card-reverse"><span className="card-print"><CardBack/></span><span className="card-foil"/><span className="card-varnish"/><span className="card-gold-rim"/><span className="card-sparkles"/></span>
 </span></button></div>
 {revealed&&<span className="sr-only" id={`card-help-${index}`}>ใช้ปุ่มลูกศรเพื่อหมุนไพ่ และปุ่ม Home เพื่อคืนมุมมองด้านหน้า</span>}
 {revealed&&<span className="sr-only" role="status">{angle>90&&angle<270?'ด้านหลังไพ่':'ด้านหน้าไพ่'} · {Math.round(angle)} องศา</span>}
 </div>;
}

