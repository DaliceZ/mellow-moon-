import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('3D result card rotates fully without changing the reading',async({page})=>{
 await page.goto('/tarot');await page.evaluate(()=>localStorage.setItem('mm.tarot.session.v1',JSON.stringify({id:'3d-demo',date:'2026-11-04',mode:'single',cards:[{id:3,reversed:false}],revealed:[0],allowReversed:false})));await page.reload();
 await expect(page.locator('.card-obverse [data-card-art="3"]')).toHaveCount(1);
 const original=await page.locator('.card-interpretation').textContent();
 await expect(page.locator('.card-orbit-controls')).toHaveCount(0);await expect(page.locator('.card-material-control')).toHaveCount(0);
 await page.locator('.card-gesture').focus();for(let i=0;i<4;i++)await page.keyboard.press('ArrowRight');
 await expect(page.locator('.card-object')).toHaveCSS('--card-ry','180deg');await expect(page.locator('.card-object [role=status]')).toContainText('ด้านหลังไพ่');
 for(let i=0;i<4;i++)await page.keyboard.press('ArrowRight');
 await expect(page.locator('.card-object')).toHaveCSS('--card-ry','360deg');await expect(page.locator('.card-interpretation')).toHaveText(original!);
 await page.keyboard.press('Home');await expect(page.locator('.card-object')).toHaveCSS('--card-ry','0deg');await page.keyboard.press('ArrowRight');await expect(page.locator('.card-object')).toHaveCSS('--card-ry','45deg');
 const box=await page.locator('.card-gesture').boundingBox();await page.mouse.move(box!.x+90,box!.y+120);await page.mouse.down();await page.mouse.move(box!.x+200,box!.y+140,{steps:10});await page.mouse.up();await expect(page.locator('.card-object')).toHaveCSS('--card-ry','133deg');
 await page.locator('.card-gesture').focus();await page.keyboard.press('Home');await page.keyboard.press('ArrowRight');
 await page.locator('.card-solid').evaluate(el=>Promise.all(el.getAnimations().map(a=>a.finished)));await page.screenshot({path:'output/tarot-3d-desktop.png',fullPage:true});
 await page.setViewportSize({width:375,height:812});await page.locator('.card-gesture').focus();await page.keyboard.press('Home');await page.emulateMedia({reducedMotion:'reduce'});expect(await page.locator('.card-solid').evaluate(el=>parseFloat(getComputedStyle(el).transitionDuration))).toBeLessThan(.001);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 await page.screenshot({path:'output/tarot-3d-mobile.png',fullPage:true});await page.getByRole('button',{name:'เก็บคำอ่านนี้'}).click();await expect(page).toHaveURL(/journal/);
});
