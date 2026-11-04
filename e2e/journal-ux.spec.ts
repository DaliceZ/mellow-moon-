import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('journal has an obvious reading action and separates headings from answers',async({page})=>{
 await page.setViewportSize({width:375,height:812});await page.goto('/journal');await page.evaluate(()=>localStorage.setItem('mm.entries.v1',JSON.stringify([{id:'ux-fortune',date:'2026-11-04',kind:'fortune',title:'ดวงที่อยากเก็บ',text:'ภาพรวม: มีเรื่องสงสัยก็ลองถาม ไม่ต้องรีบคิดคำตอบทุกอย่างด้วยตัวเอง\nความรัก: ให้เวลากับการรับฟัง\nงานและการเรียน: ทำทีละขั้น\nเราจะสื่อสารความต้องการกับคนที่รักอย่างไรดี?'}])));await page.reload();
 const button=page.getByRole('button',{name:'เปิดอ่านคำทำนายฉบับเต็ม',exact:true});await expect(button).toBeVisible();expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(44);await button.click();
 const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();await expect(dialog.getByRole('heading',{name:'ภาพรวม',exact:true})).toBeVisible();await expect(dialog.locator('.saved-reading-section').first().locator('p')).toHaveText('มีเรื่องสงสัยก็ลองถาม ไม่ต้องรีบคิดคำตอบทุกอย่างด้วยตัวเอง');await expect(dialog).not.toContainText('เราจะสื่อสารความต้องการกับคนที่รักอย่างไรดี?');
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 await page.screenshot({path:'output/journal-reading-mobile.png'});await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);await expect(button).toBeFocused();
 await page.locator('.entry-art-button').click();await expect(dialog).toBeVisible();await page.getByRole('button',{name:'กลับไปที่สมุด',exact:true}).click();await page.screenshot({path:'output/journal-open-button-mobile.png',fullPage:true});
});
test('different browser guests and different profiles have personal stable readings',async({browser})=>{
 const a=await browser.newContext(),b=await browser.newContext(),pa=await a.newPage(),pb=await b.newPage();
 await pa.goto('/horoscope');await pb.goto('/horoscope');const guestA=await pa.evaluate(()=>localStorage.getItem('mm.guest.v1')),guestB=await pb.evaluate(()=>localStorage.getItem('mm.guest.v1'));expect(guestA).toBeTruthy();expect(guestA).not.toBe(guestB);
 const before=await pa.locator('.reading-text').textContent();await pa.reload();await expect(pa.locator('.reading-text')).toHaveText(before!);
 await pa.evaluate(()=>localStorage.setItem('mm.profile.v1',JSON.stringify({name:'เมย์',birth:'2000-03-01'})));await pb.evaluate(()=>localStorage.setItem('mm.profile.v1',JSON.stringify({name:'มิน',birth:'2000-03-08'})));await pa.reload();await pb.reload();
 const read=async(p:typeof pa)=>{const result=[];for(const name of ['ภาพรวม','ความรัก','งานและการเรียน','การเงิน','ดูแลตัวเอง']){await p.locator('.reading-categories').getByRole('button',{name,exact:false}).click();result.push(await p.locator('.reading-text').textContent());}return result;};const readingA=await read(pa),readingB=await read(pb);expect(readingA).not.toEqual(readingB);
 await pb.evaluate(()=>localStorage.setItem('mm.profile.v1',JSON.stringify({name:'เมย์',birth:'2000-03-01'})));await pb.reload();expect(await read(pb)).toEqual(readingA);
 await pa.locator('.reading-categories').getByRole('button',{name:'ภาพรวม',exact:false}).click();await expect(pa.locator('.daily-answer h2')).toHaveText('ภาพรวม');await pa.setViewportSize({width:375,height:812});await pa.screenshot({path:'output/personal-reading-mobile.png',fullPage:true});await a.close();await b.close();
});
