import {useEffect,useRef,type ReactNode} from 'react';
import {X} from 'lucide-react';
export function Dialog({title,onClose,children}:{title:string;onClose:()=>void;children:ReactNode}){
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const dialog=ref.current,opener=document.activeElement as HTMLElement|null;dialog?.showModal();const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog?.close();document.body.style.overflow=previous;if(opener?.isConnected)opener.focus();};},[]);
 return <dialog ref={ref} className="dialog" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}} aria-labelledby="dialog-title"><div className="dialog-top"><h2 id="dialog-title">{title}</h2><button className="icon-button" aria-label="ปิดหน้าต่าง" onClick={onClose}><X size={21}/></button></div>{children}</dialog>;
}
