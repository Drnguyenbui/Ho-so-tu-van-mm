import React, { useState, useMemo, useEffect } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────
const AREAS = [
  { key:"moiBe", label:"Môi Bé", issues:["Dư thừa nhiều","Phì đại","Mất cân xứng","Nhăn nheo","Thâm sạm","Thẩm mỹ lỗi"], procs:()=>["Tạo hình chuyển vạt vi điểm MB"] },
  { key:"muAmVat", label:"Mũ Âm Vật", issues:["Nhiều nếp nhăn","Dư thừa nhiều","Sa xệ","Che AV","Mất cân đối 2 bên","Thẩm mỹ lỗi"], procs:()=>["Treo khoá MAV + nâng điểm G"] },
  { key:"moiLonGoMu", label:"Môi Lớn – Gò Mu", issues:["Thiếu thể tích","Da dư nhiều","Nhiều nếp gấp","Thẩm mỹ lỗi"], procs:s=>{ const p=[]; if(s.includes("Thiếu thể tích"))p.push("Đệm mỡ MML đa tầng (công nghệ chiết tách mỡ khép kín)"); if(s.some(i=>["Da dư nhiều","Nhiều nếp gấp","Thẩm mỹ lỗi"].includes(i)))p.push("Căng da ML tầng sâu"); return p; } },
  { key:"tangSinhMon", label:"Tầng Sinh Môn", issues:["Sa xệ gây hở lộ","Dư thừa nhăn nheo","Mất cân xứng do sẹo xấu","Biến dạng","Thẩm mỹ lỗi"], procs:()=>["Nâng sa trẻ TSM"] },
  { key:"mangTrinh", label:"Màng Trinh", issues:["Góc MT dư thừa lộ ra ngoài âm hộ","Rách","Thẩm mỹ lỗi"], procs:s=>{ const p=[]; if(s.includes("Góc MT dư thừa lộ ra ngoài âm hộ"))p.push("Tạo hình MT vi điểm"); if(s.some(i=>["Rách","Thẩm mỹ lỗi"].includes(i)))p.push("Tái tạo MT 5D"); return p; } },
  { key:"amDao", label:"Âm Đạo", issues:["Giãn trung bình","Giãn rộng","Thẩm mỹ lỗi gây ngoài hẹp trong rộng","Yếu sàn chậu","Thẩm mỹ lỗi"], procs:()=>["Siết cơ ÂĐ đa tầng (công nghệ chỉ khoá lưới V-Lock)"] }
];
const SVCS = ["Detox thải độc cô bé","Chiếu Plasma lạnh phục hồi sau PT","Phẫu thuật không đau","Chăm sóc hậu phẫu tại nhà"];
const NGUON = ["ADS","TikTok","Seeding","Khách cũ (quay đầu)","Khách Giới Thiệu","CTV"];
const CSINH = ["Sinh thường","Sinh mổ","Sinh mổ – sẹo độc"];
const EMPTY = {hoTen:"",ngaySinh:"",gioiTinh:"Nữ",diaChi:"",sdt:"",nguon:"",chieuCao:"",canNang:"",benhPK:"",benhKhac:"",thamMyPK:"",thamMyKhac:"",soLanSinh:"",namSinhGanNhat:"",cachSinh:"",nhuCau:"",moiBe:[],muAmVat:[],moiLonGoMu:[],tangSinhMon:[],mangTrinh:[],amDao:[],svcs:[]};

// ── COLORS ───────────────────────────────────────────────────────────────────
const R="#C4846B",RD="#9E6350",RL="#FEF3EE",RB="#F0D4C8";
const T="#5BA8A0",TL="#EFF9F8",TB="#D4EDEA";
const BG="#FBF7F4",W="#FFFFFF",DK="#2C2C2C",BR="#E8D5CC";
const IS={width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${BR}`,fontSize:14,outline:"none",background:"#FDFAF8",color:DK,boxSizing:"border-box"};

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [view,setView]=useState("form");
  const [form,setForm]=useState(EMPTY);

  useEffect(()=>{
    const lnk=document.createElement("link");
    lnk.href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap";
    lnk.rel="stylesheet"; document.head.appendChild(lnk);
    const st=document.createElement("style");
    st.textContent=`*{box-sizing:border-box}input,select,textarea{font-family:inherit;-webkit-appearance:none}button{-webkit-tap-highlight-color:transparent}@media print{.np{display:none!important}.pw{box-shadow:none!important;margin:0!important;border-radius:0!important}@page{margin:12mm;size:A4 portrait}}`;
    document.head.appendChild(st);
  },[]);

  const bmi=useMemo(()=>{const h=parseFloat(form.chieuCao)/100,w=parseFloat(form.canNang);return h>0&&w>0?(w/h/h).toFixed(1):""; },[form.chieuCao,form.canNang]);
  const procs=useMemo(()=>{const l=[];AREAS.forEach(a=>{const s=form[a.key]||[];if(s.length)l.push(...a.procs(s));});return[...new Set(l)];},[form]);
  const hits=useMemo(()=>AREAS.filter(a=>(form[a.key]||[]).length).map(a=>({...a,sel:form[a.key]})),[form]);

  const upd=(k,v)=>setForm(p=>({...p,[k]:v}));
  const tog=(ar,iss)=>setForm(p=>({...p,[ar]:p[ar].includes(iss)?p[ar].filter(i=>i!==iss):[...p[ar],iss]}));
  const togS=s=>setForm(p=>({...p,svcs:p.svcs.includes(s)?p.svcs.filter(x=>x!==s):[...p.svcs,s]}));

  return (
    <div style={{minHeight:"100vh",background:BG,fontFamily:"'Inter',system-ui,sans-serif"}}>

      {/* ── NAV BAR ── */}
      <div className="np" style={{background:`linear-gradient(135deg,${R},${RD})`,padding:"14px 20px",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 16px rgba(196,132,107,.35)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{color:W,fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,letterSpacing:"0.02em"}}>Mommy Makeover</div>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:11,marginTop:2}}>Hồ sơ tư vấn phụ khoa thẩm mỹ</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          {[["form","📋 Hồ sơ KH"],["plan","📄 Kế hoạch"]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} style={{padding:"9px 16px",borderRadius:20,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,background:view===v?W:"rgba(255,255,255,.2)",color:view===v?R:W,transition:"all .2s",minHeight:40}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* ── FORM VIEW ── */}
      {view==="form"&&(
        <div style={{maxWidth:820,margin:"0 auto",padding:"20px 16px 60px"}}>

          {/* I. Hành chính */}
          <Crd title="I. HÀNH CHÍNH" tc={T}>
            <G2>
              <Fld l="Họ tên KH"><In v={form.hoTen} c={v=>upd("hoTen",v)} p="Nguyễn Thị..."/></Fld>
              <Fld l="Ngày sinh"><In v={form.ngaySinh} c={v=>upd("ngaySinh",v)} t="date"/></Fld>
            </G2>
            <G2>
              <Fld l="Giới tính"><Sl v={form.gioiTinh} c={v=>upd("gioiTinh",v)} o={["Nam","Nữ"]}/></Fld>
              <Fld l="Số điện thoại"><In v={form.sdt} c={v=>upd("sdt",v)} p="09xx xxx xxx" t="tel"/></Fld>
            </G2>
            <div style={{marginBottom:16}}>
              <Fld l="Địa chỉ"><In v={form.diaChi} c={v=>upd("diaChi",v)} p="Số nhà, đường, quận, tỉnh/thành"/></Fld>
            </div>
            <Fld l="Nguồn khách">
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:6}}>
                {NGUON.map(n=><Chp key={n} on={form.nguon===n} go={()=>upd("nguon",form.nguon===n?"":n)}>{n}</Chp>)}
              </div>
            </Fld>
          </Crd>

          {/* II.1 Tổng quát */}
          <Crd title="II.1 TÌNH TRẠNG TỔNG QUÁT" tc={T}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 110px",gap:14}}>
              <Fld l="Chiều cao (cm)"><In v={form.chieuCao} c={v=>upd("chieuCao",v)} t="number" p="160"/></Fld>
              <Fld l="Cân nặng (kg)"><In v={form.canNang} c={v=>upd("canNang",v)} t="number" p="55"/></Fld>
              <Fld l="BMI">
                <div style={{padding:"10px 14px",borderRadius:10,border:`1.5px solid ${BR}`,background:"#F8F3F0",fontWeight:700,fontSize:18,textAlign:"center",color:bmi?(parseFloat(bmi)>25?R:T):"#CCC",minHeight:44,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {bmi||"—"}
                </div>
              </Fld>
            </div>
          </Crd>

          {/* II.2 Tiền sử */}
          <Crd title="II.2 TIỀN SỬ" tc={T}>
            <Dvd>Bệnh lý</Dvd>
            <G2>
              <Fld l="Bệnh Phụ Khoa"><Tx v={form.benhPK} c={v=>upd("benhPK",v)} p="Viêm nhiễm, u xơ..."/></Fld>
              <Fld l="Bệnh khác"><Tx v={form.benhKhac} c={v=>upd("benhKhac",v)} p="Tiểu đường, tim mạch..."/></Fld>
            </G2>
            <Dvd>Thẩm mỹ đã làm</Dvd>
            <G2>
              <Fld l="Phụ khoa"><Tx v={form.thamMyPK} c={v=>upd("thamMyPK",v)} p="Đã làm gì..."/></Fld>
              <Fld l="Thẩm mỹ khác"><Tx v={form.thamMyKhac} c={v=>upd("thamMyKhac",v)} p="Nâng ngực, hút mỡ..."/></Fld>
            </G2>
            <Dvd>Sản khoa</Dvd>
            <G2>
              <Fld l="Đã sinh (số bé)"><In v={form.soLanSinh} c={v=>upd("soLanSinh",v)} t="number" p="2"/></Fld>
              <Fld l="Lần sinh gần nhất (năm trước)"><In v={form.namSinhGanNhat} c={v=>upd("namSinhGanNhat",v)} t="number" p="3"/></Fld>
            </G2>
            <Fld l="Cách sinh">
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:6}}>
                {CSINH.map(c=><Chp key={c} on={form.cachSinh===c} go={()=>upd("cachSinh",form.cachSinh===c?"":c)}>{c}</Chp>)}
              </div>
            </Fld>
          </Crd>

          {/* II.3 Nhu cầu */}
          <Crd title="II.3 NHU CẦU HIỆN TẠI" tc={T}>
            <Fld l="Tình trạng & mong muốn của khách hàng">
              <Tx v={form.nhuCau} c={v=>upd("nhuCau",v)} p="Khách hàng chia sẻ về tình trạng sau sinh, những thay đổi về vùng kín và mong muốn được cải thiện..." rows={4}/>
            </Fld>
          </Crd>

          {/* III. Khám PK */}
          <Crd title="III. KHÁM THẨM MỸ PHỤ KHOA" tc={R}>
            {AREAS.map(a=>{
              const sel=form[a.key]||[]; const has=sel.length>0;
              return(
                <div key={a.key} style={{marginBottom:14,padding:14,borderRadius:12,border:`1.5px solid ${has?T:"#E8E8E8"}`,background:has?"#F0FAFA":"#FAFAFA",transition:"all .2s"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <span style={{background:has?T:"#C0C0C0",color:W,padding:"5px 14px",borderRadius:20,fontSize:13,fontWeight:600,transition:"background .2s"}}>{a.label}</span>
                    {has&&<span style={{fontSize:12,color:T,fontWeight:500}}>✓ {sel.length} vấn đề được chọn</span>}
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {a.issues.map(iss=>{ const on=sel.includes(iss); return(
                      <button key={iss} onClick={()=>tog(a.key,iss)} style={{padding:"7px 13px",borderRadius:8,border:`1.5px solid ${on?R:"#DDD"}`,background:on?RL:W,color:on?RD:"#555",fontSize:13,fontWeight:on?600:400,cursor:"pointer",transition:"all .15s",minHeight:38}}>
                        {on?"✓ ":""}{iss}
                      </button>
                    );})}
                  </div>
                </div>
              );
            })}
          </Crd>

          {/* Dịch vụ phụ trợ */}
          <Crd title="DỊCH VỤ PHỤ TRỢ" tc={R}>
            <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
              {SVCS.map(s=>{ const on=form.svcs.includes(s); return(
                <button key={s} onClick={()=>togS(s)} style={{padding:"11px 18px",borderRadius:50,border:`2px solid ${on?T:BR}`,background:on?T:W,color:on?W:"#666",fontSize:14,fontWeight:on?600:400,cursor:"pointer",transition:"all .2s",minHeight:44}}>
                  {on?"✓ ":""}{s}
                </button>
              );})}
            </div>
          </Crd>

          {/* Actions */}
          <div style={{display:"flex",justifyContent:"center",gap:14,paddingTop:16}}>
            <button onClick={()=>setForm(EMPTY)} style={{padding:"14px 28px",borderRadius:50,border:`2px solid ${R}`,background:W,color:R,fontSize:15,fontWeight:600,cursor:"pointer",minHeight:50}}>
              🔄 Làm mới
            </button>
            <button onClick={()=>setView("plan")} style={{padding:"14px 34px",borderRadius:50,border:"none",background:`linear-gradient(135deg,${R},${RD})`,color:W,fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(196,132,107,.4)",minHeight:50}}>
              📄 Tạo bản kế hoạch →
            </button>
          </div>
        </div>
      )}

      {/* ── PLAN VIEW ── */}
      {view==="plan"&&<Plan form={form} bmi={bmi} procs={procs} hits={hits}/>}
    </div>
  );
}

// ── FORM COMPONENTS ──────────────────────────────────────────────────────────
function Crd({title,tc,children}){
  return <div style={{marginBottom:20,background:W,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.07)"}}>
    <div style={{background:tc,color:W,padding:"13px 20px",fontSize:13,fontWeight:700,letterSpacing:"0.07em"}}>{title}</div>
    <div style={{padding:20}}>{children}</div>
  </div>;
}
function G2({children}){return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>{children}</div>;}
function Fld({l,children}){return <div><label style={{display:"block",fontSize:11,fontWeight:700,color:"#888",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em"}}>{l}</label>{children}</div>;}
function In({v,c,p,t="text"}){return <input type={t} value={v} onChange={e=>c(e.target.value)} placeholder={p} style={IS} onFocus={e=>{e.target.style.borderColor=R;e.target.style.background="#FFF9F7"}} onBlur={e=>{e.target.style.borderColor=BR;e.target.style.background="#FDFAF8"}}/>;}
function Sl({v,c,o}){return <select value={v} onChange={e=>c(e.target.value)} style={{...IS,cursor:"pointer"}}>{o.map(x=><option key={x} value={x}>{x}</option>)}</select>;}
function Tx({v,c,p,rows=2}){return <textarea value={v} onChange={e=>c(e.target.value)} placeholder={p} rows={rows} style={{...IS,resize:"vertical",lineHeight:1.5}} onFocus={e=>{e.target.style.borderColor=R}} onBlur={e=>{e.target.style.borderColor=BR}}/>;}
function Chp({children,on,go}){return <button onClick={go} style={{padding:"9px 16px",borderRadius:50,border:`2px solid ${on?T:BR}`,background:on?T:W,color:on?W:"#666",fontSize:13,fontWeight:on?600:400,cursor:"pointer",minHeight:40,transition:"all .2s",whiteSpace:"nowrap"}}>{on?"✓ ":""}{children}</button>;}
function Dvd({children}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"4px 0 12px",fontSize:12,fontWeight:700,color:R,textTransform:"uppercase",letterSpacing:"0.1em"}}><div style={{flex:1,height:1,background:RB}}/>{children}<div style={{flex:1,height:1,background:RB}}/></div>;}

// ── PLAN DOCUMENT ─────────────────────────────────────────────────────────────
function Plan({form,bmi,procs,hits}){
  const today=new Date().toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit",year:"numeric"});
  const infoRows=[
    [form.hoTen,"Họ tên"],
    [form.ngaySinh?new Date(form.ngaySinh).toLocaleDateString("vi-VN"):"","Ngày sinh"],
    [form.sdt,"Số điện thoại"],
    [bmi?`${bmi} kg/m²  ·  ${form.chieuCao}cm / ${form.canNang}kg`:"","BMI"],
    [form.soLanSinh?`${form.soLanSinh} bé`:"","Đã sinh"],
    [form.namSinhGanNhat?`${form.namSinhGanNhat} năm trước`:"","Lần sinh gần nhất"],
    [form.cachSinh,"Cách sinh"],
    [form.benhPK,"Tiền sử phụ khoa"],
  ].filter(([v])=>v);

  return(
    <div>
      {/* Print bar */}
      <div className="np" style={{background:W,padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 1px 6px rgba(0,0,0,.08)",flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontSize:14,fontWeight:600,color:DK}}>Bản kế hoạch: {form.hoTen||"(chưa nhập tên)"}</div>
          <div style={{fontSize:12,color:"#999",marginTop:2}}>Nhấn nút xuất PDF · Trên iPad: chọn "Lưu vào Files" hoặc in qua AirPrint</div>
        </div>
        <button onClick={()=>window.print()} style={{padding:"11px 24px",borderRadius:50,border:"none",background:`linear-gradient(135deg,${R},${RD})`,color:W,fontSize:14,fontWeight:700,cursor:"pointer",boxShadow:"0 2px 10px rgba(196,132,107,.4)",minHeight:46,whiteSpace:"nowrap"}}>
          🖨️ Xuất PDF / In
        </button>
      </div>

      {/* A4 Document */}
      <div className="pw" style={{maxWidth:820,margin:"24px auto 48px",background:W,boxShadow:"0 4px 40px rgba(0,0,0,.12)",borderRadius:4,minHeight:1100,position:"relative",overflow:"hidden"}}>

        {/* Atmospheric BG glows */}
        <div style={{position:"absolute",top:-100,right:-100,width:340,height:340,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,132,107,.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:80,left:-80,width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle,rgba(91,168,160,.05) 0%,transparent 70%)",pointerEvents:"none"}}/>

        {/* ── DOCUMENT HEADER ── */}
        <div style={{background:`linear-gradient(135deg,${R} 0%,${RD} 55%,#7A3D2C 100%)`,padding:"30px 44px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:700,color:W,letterSpacing:"0.04em",lineHeight:1.1}}>Mommy Makeover</div>
              <div style={{color:"rgba(255,255,255,.6)",fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",marginTop:6}}>Thẩm mỹ phụ khoa chuyên sâu</div>
            </div>
            <div style={{textAlign:"right",paddingTop:4}}>
              <div style={{color:"rgba(255,255,255,.5)",fontSize:11,marginBottom:4}}>Ngày lập</div>
              <div style={{color:W,fontWeight:700,fontSize:15}}>{today}</div>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.2)",paddingTop:18,textAlign:"center"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontStyle:"italic",color:"rgba(255,255,255,.85)",marginBottom:8}}>
              Kế hoạch phục hồi & trẻ hoá vùng kín cá nhân hoá
            </div>
            <div style={{color:W,fontWeight:700,fontSize:22,letterSpacing:"0.02em"}}>{form.hoTen||"Quý Khách"}</div>
          </div>
        </div>

        {/* ── DOCUMENT BODY ── */}
        <div style={{padding:"34px 44px"}}>

          {/* I. Thông tin KH */}
          <PSec title="I. THÔNG TIN KHÁCH HÀNG">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:form.nhuCau?16:0}}>
              {infoRows.map(([v,l])=><PInfo key={l} l={l} v={v}/>)}
            </div>
            {form.nhuCau&&(
              <div style={{padding:"13px 18px",background:"#FBF7F4",borderLeft:`3px solid ${R}`,borderRadius:"0 10px 10px 0"}}>
                <div style={{fontSize:10,color:"#AAA",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>Nhu cầu & tình trạng</div>
                <div style={{fontSize:14,color:DK,lineHeight:1.75}}>{form.nhuCau}</div>
              </div>
            )}
          </PSec>

          {/* II. Vấn đề */}
          {hits.length>0&&(
            <PSec title="II. VẤN ĐỀ SAU KHI THĂM KHÁM">
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {hits.map(a=>(
                  <div key={a.key} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"11px 18px",background:"#F8F3F0",borderRadius:10}}>
                    <div style={{background:T,color:W,padding:"4px 13px",borderRadius:6,fontSize:12,fontWeight:600,whiteSpace:"nowrap",flexShrink:0,marginTop:2}}>{a.label}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"4px 14px",paddingTop:2}}>
                      {a.sel.map(iss=>(
                        <span key={iss} style={{fontSize:13,color:"#444",display:"flex",alignItems:"center",gap:6}}>
                          <span style={{width:6,height:6,borderRadius:"50%",background:R,display:"inline-block",flexShrink:0}}/>
                          {iss}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </PSec>
          )}

          {/* III. Kế hoạch điều trị */}
          {procs.length>0&&(
            <PSec title="III. KẾ HOẠCH ĐIỀU TRỊ CHÍNH">
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {procs.map((p,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"14px 20px",background:TL,borderRadius:12,border:`1px solid ${TB}`}}>
                    <div style={{width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${T},#3D8B83)`,color:W,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:15,flexShrink:0,boxShadow:"0 2px 6px rgba(91,168,160,.3)"}}>
                      {i+1}
                    </div>
                    <div style={{fontSize:14,fontWeight:600,color:"#2A5F5A",lineHeight:1.45}}>{p}</div>
                  </div>
                ))}
              </div>
            </PSec>
          )}

          {/* IV. Dịch vụ phụ trợ */}
          {form.svcs.length>0&&(
            <PSec title="IV. DỊCH VỤ PHỤ TRỢ">
              <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
                {form.svcs.map(s=>(
                  <div key={s} style={{padding:"9px 18px",background:RL,border:`1px solid ${RB}`,borderRadius:20,fontSize:13,color:RD,fontWeight:500}}>
                    ✦ {s}
                  </div>
                ))}
              </div>
            </PSec>
          )}

          {/* Chữ ký */}
          <div style={{marginTop:52,display:"grid",gridTemplateColumns:"1fr 1fr",gap:48}}>
            {["Bác sĩ phụ trách","Khách hàng xác nhận"].map(l=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontSize:13,color:"#999",marginBottom:60}}>{l}</div>
                <div style={{borderTop:"1px solid #E0E0E0",paddingTop:8,fontSize:11,color:"#CCC"}}>Ký và ghi rõ họ tên</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{background:"linear-gradient(135deg,#2A3938 0%,#192625 100%)",padding:"17px 44px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",color:R,fontSize:15,fontWeight:600}}>Mommy Makeover</div>
            <div style={{color:"rgba(255,255,255,.4)",fontSize:11,marginTop:3}}>Thẩm mỹ phụ khoa chuyên sâu</div>
          </div>
          <div style={{textAlign:"right",color:"rgba(255,255,255,.35)",fontSize:11,lineHeight:1.8}}>
            Tài liệu lập riêng cho khách hàng · Bảo mật thông tin
          </div>
        </div>
      </div>
    </div>
  );
}

function PSec({title,children}){
  return(
    <div style={{marginBottom:30}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,color:R,letterSpacing:"0.1em",textTransform:"uppercase",whiteSpace:"nowrap"}}>{title}</div>
        <div style={{flex:1,height:1,background:RB}}/>
      </div>
      {children}
    </div>
  );
}
function PInfo({l,v}){
  return(
    <div style={{padding:"9px 13px",background:"#FBF7F4",borderRadius:8}}>
      <div style={{fontSize:10,color:"#AAA",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>{l}</div>
      <div style={{fontSize:13,fontWeight:500,color:DK}}>{v}</div>
    </div>
  );
}
