# ภาพประกอบ

Hero ใช้เครื่องมือ imagegen แบบ built-in ระหว่างพัฒนา เก็บต้นฉบับใน `docs/assets/mochi-moon-original.png` และ WebP สำหรับเว็บใน `public/images/mochi-moon.webp` ไม่มี image generation ใน runtime

Prompt:

> Use case: illustration-story. Create an original wide landscape website hero illustration for Mellow Moon, a cozy Thai astrology daily ritual app. Pastel storybook gouache with delicate pencil texture, flat shapes, soft muted colors, charming premium indie illustration, not 3D. A very cute round cream moon rabbit with long soft ears, rosy cheeks, tiny paws and a little golden star pendant sits on a pale butter-yellow crescent moon in the RIGHT HALF of the image. Around it: a small smiling yellow star, sleepy little clouds, a pale peach ringed planet, tiny botanical sprigs, delicate dotted orbital lines, tiny twinkles. Background warm ivory #FFF9F3 with very subtle blush and pale lavender clouds. LEFT HALF mostly airy blank ivory negative space for website headline overlaid in code. Illustration fills right 60%, rabbit prominent and recognizable. Wide composition approximately 3:2. No text, no lettering, no watermark, no UI.

โลโก้ มาสคอตแบบตอบสนอง ภาพหน้าและหลังไพ่ สร้างด้วย SVG ของโปรเจกต์ใน `src/components/Art.tsx` ไอคอนส่วนควบคุมจาก Lucide React ภาพสำรับเป็นการตีความใหม่ ไม่ใช่งานสแกนสำรับต้นฉบับ


## Storybook deck และสมุดภาพ

ไพ่ทั้ง 78 ใบใช้ SVG ใน `src/components/TarotArt.tsx` ไพ่ชุดใหญ่มีฉากเฉพาะใบ ไพ่ชุดเล็กใช้ฉาก 14 ลำดับร่วมกับโลกของแต่ละชุด ภาพกระต่าย อุปกรณ์ ดอกไม้ และสัญลักษณ์วาดด้วยโค้ด ภาพสมุดใน `JournalArt.tsx` และพื้นหลัง `public/images/orbit-garden.svg` เป็นงานเวกเตอร์ของโปรเจกต์ ไม่มีการเรียกบริการสร้างภาพระหว่างใช้งาน
