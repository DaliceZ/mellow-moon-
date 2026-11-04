import { useState } from 'react';
import { parseDay } from '../lib/fortune';
export function useStorage<T>(key:string, initial:T, valid:(value:unknown)=>value is T):[T,(value:T|((old:T)=>T))=>void] {
 const [state,setState]=useState<T>(()=>{try {const value=JSON.parse(localStorage.getItem(key)||'null'); return valid(value)?value:initial;}catch{return initial;}});
 const update=(value:T|((old:T)=>T))=>setState(old=>{const next=typeof value==='function'?(value as (old:T)=>T)(old):value;try{localStorage.setItem(key,JSON.stringify(next));}catch{window.dispatchEvent(new Event('storage-failed'));} return next;});
 return [state,update];
}
export type Profile={name:string;birth:string};
export type Entry={id:string;date:string;title:string;text:string;kind:'tarot'|'note'|'fortune';cards?:{id:number;reversed:boolean}[]};
export function validDay(v:unknown):v is string {try {if(typeof v!=='string')return false;parseDay(v);return true;}catch{return false;}}
export const isProfile=(v:unknown):v is Profile=>!!v&&typeof v==='object'&&'name'in v&&typeof v.name==='string'&&'birth'in v&&typeof v.birth==='string'&&(!v.birth||validDay(v.birth));
export const isEntries=(v:unknown):v is Entry[]=>Array.isArray(v)&&v.every(e=>e&&typeof e.id==='string'&&typeof e.text==='string'&&validDay(e.date)&&typeof e.title==='string'&&['tarot','note','fortune'].includes(e.kind)&&(!e.cards||(Array.isArray(e.cards)&&e.cards.every((c:{id:number;reversed:boolean})=>Number.isInteger(c.id)&&c.id>=0&&c.id<78&&typeof c.reversed==='boolean'))));
