# Mellow Moon

เว็บภาษาไทยสำหรับดูแลใจด้วยธีมดาวประจำวัน ไพ่ทาโรต์ และสีประจำวัน สร้างด้วย React, TypeScript, Vite, Tailwind CSS และ Motion for React ไม่มี AI หรือ API key ใน runtime

## เริ่มใช้งาน

ต้องใช้ Node.js 22.12 ขึ้นไป แนะนำ Node 22 LTS

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm test
npm run build
npm run test:e2e
```

E2E ต้องมี Chromium ของ Playwright (`npx playwright install chromium`) ผล build อยู่ที่ `dist/` ใช้ static hosting พร้อม SPA fallback ไป `index.html`

## ขอบเขตรุ่นแรก

- หน้าแรกพร้อมภาพ Mochi Moon ต้นฉบับและกิจวัตร 3 ข้อที่บันทึกแยกวัน
- โปรไฟล์ผู้ใช้แบบไม่ต้องสมัคร ชื่อเล่นและวันเกิดเป็นข้อมูลไม่บังคับ
- ดวงรายวัน 5 หมวด พร้อมข้อความตามวันเกิด รายสัปดาห์และรายเดือนรวมคำอ่านรายวัน
- ไพ่ 78 ใบ ภาพ SVG สร้างตามชุด/ลำดับ/สัญลักษณ์ ไพ่หนึ่งใบและสามใบ พร้อมคำถามเรื่องความรักและการงาน
- เลือกเปิดไพ่กลับหัว เก็บรอบปัจจุบัน ป้องกันไพ่ซ้ำ บันทึกและคัดลอกคำอ่าน
- สีประจำวัน 7 วัน พร้อมเฉดสีและปุ่มคัดลอกรหัส
- สมุดบันทึก เพิ่ม ลบ กรอง และส่งออก JSON
- อธิบายวิธีเลือกคำอ่านและข้อจำกัดอยู่ในเว็บ

Birth Chart, คู่สัมพันธ์, ปฏิทินจันทร์, เกม, คอลเลกชัน, บัญชีผู้ใช้ และ cloud sync อยู่เฟสถัดไป ไม่มีลิงก์หรือปุ่มหลอกไปยังฟีเจอร์เหล่านี้

## หลักเกณฑ์

อ่าน [docs/METHODS.md](docs/METHODS.md) สำหรับกฎและข้อจำกัด ใช้เวลาท้องถิ่นของอุปกรณ์ ไม่มีการคำนวณตำแหน่งดาว ไม่มีคะแนนดวงหรือเปอร์เซ็นต์ความแม่นยำ

## โครงสร้าง

`src/lib/fortune.ts` แยกกฎวันที่และเนื้อหาออกจาก UI, `src/features/tarot/deck.ts` เก็บสำรับและวิธีจับไพ่, `src/components/Art.tsx` สร้างภาพ SVG, `src/store/useStorage.ts` ดูแล localStorage, `src/app/App.tsx` เก็บหน้าจอและการโต้ตอบ, `src/styles.css` เก็บโทเคนและ responsive styles

โปรเจกต์เป็น static client app จึงไม่ต้องมี backend หรือฐานข้อมูล การเพิ่มเซิร์ฟเวอร์ในอนาคตควรแยกโค้ดคำนวณที่ต้องใช้ข้อมูลดาวออกจาก client และออกแบบ consent/authentication ก่อน sync ข้อมูลส่วนตัว

## ข้อมูลและข้อจำกัด

ข้อมูลเก็บใน localStorage ของ origin นี้เท่านั้น การล้างเบราว์เซอร์หรือเปลี่ยนเครื่องทำให้ข้อมูลไม่ตามไปด้วย ส่งออก JSON ได้ แต่ยังไม่มีการนำเข้า ข้อมูลจาก localhost กับเว็บที่ deploy เป็นคนละชุดกัน

ใช้ font จาก Google Fonts เมื่อออนไลน์ มี system sans-serif สำรอง ภาพหลักและ SVG อยู่ในโปรเจกต์ ไม่มี stock photography ไพ่ชุดเล็กใช้ความหมายร่วมจากชุดและลำดับ จึงมีภาษาบางส่วนซ้ำกัน งานภาพเป็นการตีความใหม่ของทีม ไม่ได้อ้างว่าเป็นภาพ Rider–Waite–Smith ต้นฉบับ

## ลิขสิทธิ์

ไม่ได้ใช้ Swiss Ephemeris จึงยังไม่มีการผูกลิขสิทธิ์โปรเจกต์กับ AGPL หรือ Professional License ของ Swiss Ephemeris ก่อนทำ Birth Chart ต้องประเมินไลบรารีและลิขสิทธิ์อีกครั้ง

ภาพ hero สร้างด้วย imagegen ระหว่างการพัฒนา รายละเอียดอยู่ใน [docs/ASSETS.md](docs/ASSETS.md) ฟอนต์ Nunito และ Noto Sans Thai ใช้ SIL Open Font License; ไอคอน Lucide ใช้ ISC; React, Vite, Motion, Tailwind และ React Router ใช้ MIT ตรวจรายละเอียดได้ใน package ของแต่ละ dependency
