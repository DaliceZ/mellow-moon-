import {personalThemes,stableIndex} from './personalReading';
export const weekdays = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
export function localDay(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
export function parseDay(value: string) { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value); if (!m) throw new Error('วันที่ไม่ถูกต้อง'); const [y,mo,d] = m.slice(1).map(Number); const result = new Date(y,mo-1,d,12); if(result.getFullYear()!==y || result.getMonth()!==mo-1 || result.getDate()!==d) throw new Error('วันที่ไม่ถูกต้อง'); return result; }
export function thaiDate(date: Date, short = false) { return new Intl.DateTimeFormat('th-TH', { day:'numeric', month:short?'short':'long',year:'numeric' }).format(date); }
export function birthWeekday(birth: string) { return parseDay(birth).getDay(); }
export function zodiac(birth: string) {
 const date = parseDay(birth), md=(date.getMonth()+1)*100+date.getDate();
 const boundaries: [number,string][]=[[120,'มังกร'],[219,'กุมภ์'],[321,'มีน'],[420,'เมษ'],[521,'พฤษภ'],[621,'เมถุน'],[723,'กรกฎ'],[823,'สิงห์'],[923,'กันย์'],[1023,'ตุลย์'],[1122,'พิจิก'],[1222,'ธนู'],[1232,'มังกร']];
 return boundaries.find(([end])=>md<end)![1];
}
export const dayThemes = [
 { ruler:'อาทิตย์',theme:'เชื่อในก้าวเล็ก ๆ ของตัวเอง',overall:'ลองให้เวลากับสิ่งที่อยากทำสักอย่าง เริ่มจากส่วนเล็กที่สุดที่ทำไหวก็พอ',love:'บอกความรู้สึกดี ๆ ให้คนที่นึกถึงได้รู้สักนิด คำธรรมดาที่จริงใจก็น่ารักแล้ว',work:'เลือกงานสำคัญหนึ่งชิ้นแล้วค่อย ๆ ทำให้เสร็จ อย่าเพิ่งวัดความเก่งจากความเร็ว',money:'ก่อนซื้อของให้รางวัลตัวเอง ลองตั้งงบที่ใช้แล้วสบายใจไว้ก่อน',wellness:'แบ่งเวลาพักออกจากเวลางานให้ชัดขึ้นสักนิด วันนี้ไม่จำเป็นต้องเก่งทุกเรื่อง'},
 { ruler:'จันทร์',theme:'อ่อนโยนกับใจตัวเองอีกนิด',overall:'ถ้าวันนี้รู้สึกไวเป็นพิเศษ ลองพักฟังใจตัวเองก่อนตอบรับเรื่องใหม่ ๆ',love:'ชวนกันคุยเรื่องเล็ก ๆ ในแต่ละวัน การฟังโดยไม่รีบแก้ปัญหาอาจช่วยให้ใกล้กันขึ้น',work:'เริ่มจากงานที่คุ้นมือ แล้วค่อยขยับไปเรื่องที่ต้องใช้สมาธิ',money:'ลองทบทวนค่าใช้จ่ายที่จ่ายเพราะอารมณ์ โดยไม่ต้องตำหนิตัวเองนะ',wellness:'หามุมสงบ ดื่มน้ำ แล้วพักสายตาจากหน้าจอสักครู่'},
 { ruler:'อังคาร',theme:'ค่อย ๆ เปลี่ยนความตั้งใจให้เป็นการลงมือ',overall:'เรื่องที่เลื่อนมาหลายวัน ลองเริ่มทำแค่สิบนาที แล้วค่อยตัดสินใจว่าจะทำต่อไหม',love:'ถ้ามีเรื่องค้างใจ ลองเล่าจากความรู้สึกของเรา แทนการเดาว่าอีกฝ่ายคิดอะไร',work:'แยกงานยากออกเป็นขั้นตอนสั้น ๆ แล้วเริ่มทีละขั้น',money:'เว้นจังหวะก่อนกดจ่าย โดยเฉพาะของที่เพิ่งเห็นครั้งแรก',wellness:'ลุกยืดเส้นเบา ๆ เมื่อรู้สึกว่าตัวเองนั่งนานไปแล้ว'},
 { ruler:'พุธ',theme:'บทสนทนาเล็ก ๆ อาจเปิดมุมใหม่',overall:'มีเรื่องสงสัยก็ลองถาม ไม่ต้องรีบคิดคำตอบทุกอย่างด้วยตัวเอง',love:'ถามไถ่กันด้วยความอยากรู้ และเผื่อพื้นที่ให้คำตอบที่เราไม่คาดไว้',work:'ตรวจข้อความและรายละเอียดอีกครั้งก่อนส่ง จะช่วยให้สื่อสารตรงกันมากขึ้น',money:'เปรียบเทียบราคาและเงื่อนไขให้ครบ ก่อนตัดสินใจซื้อของชิ้นใหญ่',wellness:'ลองวางโทรศัพท์ระหว่างกินข้าว ให้ตัวเองได้พักจากข่าวสารบ้าง'},
 { ruler:'พฤหัสบดี',theme:'เผื่อที่ว่างให้สิ่งที่ยังไม่รู้',overall:'ลองเรียนรู้เรื่องที่สนใจสักนิด อาจเป็นแค่บทความสั้น ๆ ที่เก็บไว้นานแล้ว',love:'เล่าเรื่องที่เพิ่งได้เรียนรู้ให้กันฟัง แล้วลองฟังมุมมองของอีกฝ่ายด้วย',work:'ถ้าติดตรงไหน ลองขอคำแนะนำจากคนที่เคยผ่านงานแบบนี้',money:'กลับไปดูเป้าหมายการเก็บเงิน แล้วเลือกก้าวเล็ก ๆ ที่ทำได้จริง',wellness:'ออกไปสัมผัสอากาศข้างนอกสักครู่ ถ้าสะดวกและปลอดภัย'},
 { ruler:'ศุกร์',theme:'ให้ความสุขธรรมดามีที่ในวันนี้',overall:'เก็บช่วงเวลาหนึ่งไว้ทำสิ่งที่ชอบ โดยไม่ต้องทำให้มันเกิดผลงานก็ได้',love:'ชวนคนที่สบายใจด้วยทำอะไรเรียบง่าย หรือใช้เวลาดี ๆ กับตัวเอง',work:'ลองเติมรายละเอียดที่ทำให้งานน่าใช้ขึ้น โดยยังเผื่อเวลาพักไว้ด้วย',money:'ความสุขเล็ก ๆ ก็มีคุณค่า ลองเลือกสิ่งที่พอดีกับงบของเรา',wellness:'เปิดเพลงที่ชอบ แล้วปล่อยให้ตัวเองพักจากความเร่งรีบสักเพลง'},
 { ruler:'เสาร์',theme:'จัดที่ว่างให้วันข้างหน้า',overall:'สะสางเรื่องที่ค้างอยู่ทีละอย่าง ทำเท่าที่ไหว แล้วค่อยกลับมาทำต่อ',love:'คุยเรื่องขอบเขตและเวลาของแต่ละคน ความเข้าใจก็เริ่มจากการบอกกัน',work:'ทบทวนสิ่งที่ทำไปแล้ว จดไว้ว่าอะไรควรทำต่อและอะไรพักไว้ก่อนได้',money:'เช็กรายจ่ายประจำสักรายการ อาจพบสิ่งที่เราไม่ได้ใช้แล้ว',wellness:'จัดมุมพักเล็ก ๆ ให้สบายขึ้น แล้วให้เวลาตัวเองได้ใช้มันจริง ๆ'},
];
const personal = ['ลองให้เครดิตตัวเองกับสิ่งที่ทำสำเร็จแล้วด้วยนะ','เผื่อเวลาอยู่กับความรู้สึกของตัวเองก่อนนอนสักนิด','เลือกใช้แรงกับเรื่องที่สำคัญกับเราจริง ๆ','ถ้าไม่แน่ใจ ถามให้ชัดก่อนรับปากก็ได้','การขอคำแนะนำไม่จำเป็นต้องรอจนไปต่อไม่ไหวนะ','อย่าลืมเก็บเวลาดี ๆ ไว้ให้สิ่งที่ชอบด้วย','เว้นที่ให้แผนเปลี่ยนได้บ้าง เราไม่ต้องควบคุมทุกอย่าง'];
export function getReading(day:string,birth?:string,identity?:string){
 const date=parseDay(day),weekday=date.getDay();if(birth)parseDay(birth);
 const person=identity||birth||'guest';const key=`personal-reflection-v2|${person}|${birth||''}|${day}`;
 const library=[...dayThemes,...personalThemes];
 const select=(category:'overall'|'love'|'work'|'money'|'wellness')=>library[stableIndex(`${key}|${category}`)%library.length][category];
 const focus=library[stableIndex(`${key}|overall`)%library.length];
 return {...dayThemes[weekday],theme:focus.theme,overall:select('overall'),love:select('love'),work:select('work'),money:select('money'),wellness:select('wellness'),day,weekday,ruleId:'personal-reflection-v2',personKey:stableIndex(`${person}|${birth||''}`).toString(16),personal:birth?personal[(birthWeekday(birth)+stableIndex(key))%personal.length]:'',birthDay:birth?birthWeekday(birth):null};
}
export const colors = [
 {name:'แดงกุหลาบ',hex:'#BA5667',pastel:'#F2CED5',reason:'สีแดงเป็นสีประจำวันอาทิตย์ตามธรรมเนียมสีประจำวันของไทย'},
 {name:'เหลืองละมุน',hex:'#EBCB75',pastel:'#FBF0CC',reason:'สีเหลืองเป็นสีประจำวันจันทร์ตามธรรมเนียมสีประจำวันของไทย'},
 {name:'ชมพูกลีบดอกไม้',hex:'#D996B7',pastel:'#F8E1EB',reason:'สีชมพูเป็นสีประจำวันอังคารตามธรรมเนียมสีประจำวันของไทย'},
 {name:'เขียวใบชา',hex:'#7AA98C',pastel:'#DEECE0',reason:'สีเขียวเป็นสีประจำวันพุธตามธรรมเนียมสีประจำวันของไทย'},
 {name:'ส้มแอปริคอต',hex:'#DBA06F',pastel:'#F6E5D4',reason:'สีส้มเป็นสีประจำวันพฤหัสบดีตามธรรมเนียมสีประจำวันของไทย'},
 {name:'ฟ้าท้องฟ้า',hex:'#79A8C7',pastel:'#DFEDF7',reason:'สีฟ้าเป็นสีประจำวันศุกร์ตามธรรมเนียมสีประจำวันของไทย'},
 {name:'ม่วงลาเวนเดอร์',hex:'#A58DC8',pastel:'#EBE3F4',reason:'สีม่วงเป็นสีประจำวันเสาร์ตามธรรมเนียมสีประจำวันของไทย'},
];
export const rituals=['พักสายตา แล้วหายใจช้า ๆ สักครู่','ดื่มน้ำให้ตัวเองสักแก้ว','จดเรื่องเล็ก ๆ ที่ทำให้ยิ้มได้'];
