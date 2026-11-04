import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('guest profile, stable reading, tarot persistence, journal and deletion',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.getByRole('heading',{level:1})).toContainText('วันนี้ใจเธอ');
 await page.getByRole('button',{name:/ให้โมจิรู้จักเธออีกนิด/}).click();
 await page.getByLabel('ชื่อเล่น').fill('ไดซ์');await page.getByLabel('วันเกิด').fill('2000-02-29');
 await page.getByRole('button',{name:'เริ่มวันดี ๆ ไปด้วยกัน'}).click();await expect(page.getByRole('heading',{level:1})).toContainText('ไดซ์');
 await page.getByRole('link',{name:'เปิดดวงของวันนี้'}).click();const text=await page.locator('.reading-text').textContent();await page.reload();await expect(page.locator('.reading-text')).toHaveText(text!);
 await page.getByRole('button',{name:'รายสัปดาห์',exact:true}).click();await expect(page.locator('.period-list details')).toHaveCount(7);
 await page.getByRole('button',{name:'รายวัน',exact:true}).click();await page.getByRole('button',{name:'เก็บไว้อ่านอีกครั้ง'}).click();
 await page.goto('/tarot');await page.getByRole('button',{name:'ไพ่สามใบ',exact:true}).click();await page.getByLabel('อ่านไพ่กลับหัวด้วย').check();await page.getByRole('button',{name:'สับไพ่ แล้วเลือกของเธอ'}).click();
 for(let i=1;i<=3;i++) await page.getByRole('button',{name:`เปิดไพ่ใบที่ ${i}`,exact:true}).click();
 const names=await page.locator('.card-interpretation h3').allTextContents();expect(new Set(names).size).toBe(3);await page.reload();await expect(page.locator('.card-interpretation h3')).toHaveText(names);
 await page.getByRole('button',{name:'เก็บคำอ่านนี้',exact:true}).click();await page.goto('/journal');await expect(page.locator('.journal-entry')).toHaveCount(2);
 await page.getByRole('button',{name:'เขียนบันทึก',exact:true}).click();await page.getByRole('button',{name:'เก็บเรื่องนี้'}).click();await expect(page.getByRole('alert')).toContainText('เขียนสักนิด');await page.getByLabel('เรื่องของเธอ', {exact:true}).fill('วันนี้ได้พักและดื่มชา');await page.getByRole('button',{name:'เก็บเรื่องนี้'}).click();await page.reload();await expect(page.locator('.journal-entry')).toHaveCount(3);
 await page.getByRole('button',{name:'ลบ วันนี้ได้พักและดื่มชา',exact:true}).click();await page.getByRole('button',{name:'เก็บไว้ก่อน'}).click();await expect(page.locator('.journal-entry')).toHaveCount(3);await page.getByRole('button',{name:'ลบ วันนี้ได้พักและดื่มชา',exact:true}).click();await page.getByRole('button',{name:'ลบบันทึก',exact:true}).click();await expect(page.locator('.journal-entry')).toHaveCount(2);expect(errors).toEqual([]);
});
test('rituals persist; colors and navigation work',async({page})=>{await page.goto('/');await page.getByLabel('ดื่มน้ำให้ตัวเองสักแก้ว').check();await page.reload();await expect(page.getByLabel('ดื่มน้ำให้ตัวเองสักแก้ว')).toBeChecked();await page.goto('/colors');await page.getByRole('button',{name:'วันศุกร์',exact:false}).click();await expect(page.locator('.color-poster h2')).toHaveText('ฟ้าท้องฟ้า');await page.goto('/methods');await expect(page.getByRole('heading',{level:1})).toContainText('อย่างไร');});
test('desktop and mobile screenshots, overflow, reduced motion, accessibility',async({page})=>{
 for(const [width,height] of [[1440,1100],[375,812],[812,375]]){await page.setViewportSize({width,height});await page.goto('/');await page.evaluate(()=>document.fonts.ready);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`output/home-${width}.png`,fullPage:true});}
 await page.setViewportSize({width:375,height:812});await page.emulateMedia({reducedMotion:'reduce'});
 for(const route of ['/','/horoscope','/tarot','/colors','/journal']){await page.goto(route);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);}
 await page.goto('/');await page.getByRole('button',{name:'เปิดเมนู'}).click();await page.locator('.mobile-menu').getByRole('button',{name:'ข้อมูลของฉัน'}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
});

