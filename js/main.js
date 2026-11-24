/* ANIVAY – storefront script (no build step needed) */
const CONFIG = {
  whatsapp: "919999999999",          // <- replace with your number (country code + number, no +)
  email: "hello@anivay.com",
  currency: "Rs."
};

const PRODUCTS = [
  {id:"shadow-zip-jacket",name:"Shadow Zip Jacket",cat:"jackets",price:10700,type:"jacket",c:"#15171a",a:"#c0392b",tag:"New",desc:"Heavy washed-cotton zip jacket with contrast piping and a boxy, cropped fit."},
  {id:"night-hoodie",name:"Night Hoodie",cat:"hoodies",price:9200,type:"hoodie",c:"#1d2128",a:"#d8d2c0",tag:"New",desc:"500 GSM brushed fleece zip hoodie with embroidered chest crest and drop shoulders."},
  {id:"five-leaf-jeans",name:"Five Leaf Jeans",cat:"jeans",price:9200,type:"jeans",c:"#3b3f48",a:"#b83232",tag:"",desc:"Baggy washed black denim with stitched star panels and an embroidered leg crest."},
  {id:"four-leaf-jeans",name:"Four Leaf Jeans",cat:"jeans",price:9200,type:"jeans",c:"#7d8f9c",a:"#9fb39a",tag:"",desc:"Wide-leg sun-faded blue denim with curved seam panels."},
  {id:"gold-piped-hoodie",name:"Gold Piped Hoodie",cat:"hoodies",price:8700,type:"hoodie",c:"#121416",a:"#d6b86a",tag:"",desc:"Black zip hoodie with gold contour piping and metal zip pull."},
  {id:"gold-piped-sweatpants",name:"Gold Piped Sweatpants",cat:"sweatpants",price:6200,type:"pants",c:"#121416",a:"#d6b86a",tag:"",desc:"Matching wide-leg sweatpants with side piping and embroidered crest."},
  {id:"black-bulls-tee",name:"Black Bulls Tee",cat:"tees",price:3700,type:"tee",c:"#4a4b4e",a:"#c8a24a",tag:"Bestseller",desc:"Oversized raglan tee in 240 GSM cotton with gold embroidered crest."},
  {id:"ash-raglan-tee",name:"Ash Raglan Tee",cat:"tees",price:3500,type:"tee",c:"#8a8d92",a:"#1a1a1a",tag:"",desc:"Soft ash-grey oversized tee with contrast black sleeves."},
  {id:"ember-knit",name:"Ember Knit",cat:"knits",price:7400,type:"knit",c:"#2a2320",a:"#c9552e",tag:"New",desc:"Chunky cable knit sweater with a relaxed, slightly cropped silhouette."},
  {id:"slate-knit",name:"Slate Knit",cat:"knits",price:7200,type:"knit",c:"#4b5560",a:"#e7e2d4",tag:"",desc:"Mid-weight knit pullover in slate with tonal ribbing."},
  {id:"void-sweatpants",name:"Void Sweatpants",cat:"sweatpants",price:5600,type:"pants",c:"#1b1d22",a:"#5a5f6a",tag:"",desc:"Heavyweight jogger-cut sweatpants with brushed inside."},
  {id:"drift-denim-jacket",name:"Drift Denim Jacket",cat:"jackets",price:9900,type:"jacket",c:"#56677a",a:"#e8e8e8",tag:"",desc:"Washed denim trucker jacket, oversized with raw hem."}
];
const CATS = ["tees","hoodies","jeans","jackets","knits","sweatpants"];
const SIZES = ["S","M","L","XL","2XL"];
const fmt = n => CONFIG.currency + " " + n.toLocaleString("en-IN") + ".00";
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];

/* ---------- original garment illustrations ---------- */
function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=(n>>16)+amt,g=(n>>8&255)+amt,b=(n&255)+amt;const k=v=>Math.max(0,Math.min(255,v));return "#"+((1<<24)+(k(r)<<16)+(k(g)<<8)+k(b)).toString(16).slice(1)}
function art(p,view=0){
  const c=p.c,d=shade(c,-22),l=shade(c,18),a=p.a;let body="";
  const crest=(x,y)=>`<g transform="translate(${x} ${y})"><circle r="9" fill="none" stroke="${a}" stroke-width="2"/><path d="M-4 3 L0 -6 L4 3 Z" fill="${a}"/></g>`;
  switch(p.type){
    case"tee":body=`<path d="M70 40 L100 28 Q150 50 200 28 L230 40 L280 80 L255 115 L228 100 L228 270 L72 270 L72 100 L45 115 L20 80Z" fill="${c}"/><path d="M70 40 L20 80 L45 115 L72 100Z M230 40 L280 80 L255 115 L228 100Z" fill="${p.id==='ash-raglan-tee'?'#161616':'#101010'}"/><path d="M100 28 Q150 66 200 28" fill="none" stroke="${d}" stroke-width="6"/>${view?'':crest(115,92)}`;break;
    case"hoodie":body=`<path d="M105 20 Q150 -6 195 20 L205 56 L252 80 L282 250 L248 258 L235 140 L228 262 L72 262 L65 140 L52 258 L18 250 L48 80 L95 56Z" fill="${c}"/><path d="M105 20 Q150 -6 195 20 L205 56 Q150 90 95 56Z" fill="${d}"/><path d="M150 52 L150 262" stroke="${l}" stroke-width="3"/><path d="M52 88 Q70 170 62 255 M248 88 Q230 170 238 255" stroke="${a}" stroke-width="2.5" fill="none"/><rect x="18" y="238" width="34" height="20" fill="${d}"/><rect x="248" y="238" width="34" height="20" fill="${d}"/>${crest(188,100)}`;break;
    case"jacket":body=`<path d="M105 18 Q150 0 195 18 L208 50 L258 76 L278 240 L246 248 L236 130 L230 250 L70 250 L64 130 L54 248 L22 240 L42 76 L92 50Z" fill="${c}"/><path d="M105 18 Q150 0 195 18 L208 50 Q150 80 92 50Z" fill="${d}"/><path d="M150 56 L150 250" stroke="${l}" stroke-width="3"/><path d="M92 54 Q70 150 74 246 M208 54 Q230 150 226 246" stroke="${a}" stroke-width="3" fill="none"/><path d="M190 108 l18 -4 l-4 10 l14 -2" stroke="${a}" stroke-width="3" fill="none"/>`;break;
    case"jeans":body=`<path d="M82 14 H218 L236 270 H162 L150 100 L138 270 H64Z" fill="${c}"/><path d="M82 14 H218 V34 H82Z" fill="${d}"/><path d="M150 34 V100" stroke="${l}" stroke-width="3"/><path d="M84 150 Q104 170 124 150 Q104 190 84 150Z M176 150 Q196 170 216 150 Q196 190 176 150Z" fill="none" stroke="${a}" stroke-width="2.5"/><circle cx="96" cy="46" r="5" fill="${a}"/>`;break;
    case"pants":body=`<path d="M84 14 H216 L234 272 H164 L150 96 L136 272 H66Z" fill="${c}"/><path d="M84 14 H216 V38 H84Z" fill="${d}"/><path d="M96 38 L78 270 M204 38 L222 270" stroke="${a}" stroke-width="3" fill="none"/>${crest(180,86)}`;break;
    case"knit":body=`<path d="M110 22 Q150 44 190 22 L232 38 L282 120 L252 140 L232 112 L228 250 L72 250 L68 112 L48 140 L18 120 L68 38Z" fill="${c}"/><path d="M110 22 Q150 44 190 22" stroke="${d}" stroke-width="8" fill="none"/>${[0,1,2,3,4,5,6].map(i=>`<path d="M${86+i*21} 70 v170" stroke="${shade(c,12)}" stroke-width="3" stroke-dasharray="2 5"/>`).join('')}<rect x="72" y="234" width="156" height="16" fill="${d}"/><path d="M130 100 l20 -16 l20 16 l-20 16Z" fill="none" stroke="${a}" stroke-width="3"/>`;break;
  }
  const sh=view===2?'<ellipse cx="150" cy="288" rx="90" ry="6" fill="rgba(0,0,0,.12)"/>':'';
  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${p.name}">${sh}${body}</svg>`;
}
const card=p=>`<a class="pc" href="product.html?id=${p.id}"><div class="im">${p.tag?`<span class="tag">${p.tag}</span>`:""}${art(p)}</div><h4>${p.name}</h4><p>${fmt(p.price)}</p></a>`;

/* ---------- cart ---------- */
const cart={get(){try{return JSON.parse(localStorage.getItem("anivay_cart"))||[]}catch(e){return[]}},set(v){localStorage.setItem("anivay_cart",JSON.stringify(v));renderCart()},
  add(id,size,q){const c=this.get(),i=c.find(x=>x.id===id&&x.size===size);i?i.q+=q:c.push({id,size,q});this.set(c)},
  rm(k){const c=this.get();c.splice(k,1);this.set(c)}};
function toast(m){const t=$(".toast");t.textContent=m;t.classList.add("on");setTimeout(()=>t.classList.remove("on"),2000)}
function renderCart(){
  const c=cart.get();let tot=0,n=0;
  $(".items").innerHTML=c.length?c.map((x,k)=>{const p=PRODUCTS.find(q=>q.id===x.id);tot+=p.price*x.q;n+=x.q;return`<div class="item"><div class="th">${art(p)}</div><div><b class="caps" style="font-weight:500;font-size:14px">${p.name}</b><small>Size ${x.size} · Qty ${x.q}</small><button class="rm" data-k="${k}">Remove</button></div><div>${fmt(p.price*x.q)}</div></div>`}).join(""):`<p style="padding:40px 0;text-align:center;color:var(--mute)">Your cart is empty.</p>`;
  $(".cartbtn b").textContent=n;$(".cartbtn b").style.display=n?"grid":"none";$("#ctot").textContent=fmt(tot);
  $$(".rm").forEach(b=>b.onclick=()=>cart.rm(+b.dataset.k));
}
function checkout(){
  const c=cart.get();if(!c.length)return toast("Cart is empty");
  let tot=0;const lines=c.map(x=>{const p=PRODUCTS.find(q=>q.id===x.id);tot+=p.price*x.q;return`• ${p.name} (${x.size}) x${x.q} – ${fmt(p.price*x.q)}`});
  const msg=`Hi ANIVAY, I'd like to place an order:\n${lines.join("\n")}\nTotal: ${fmt(tot)}`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`,"_blank");
}

/* ---------- shell (header / footer) ---------- */
function shell(){
  const mq=Array(8).fill("<span>Clover Drop now live!</span>").join("");
  $("#hdr").innerHTML=`<header class="hdr"><div class="bar"><div class="l"><button id="mb" aria-label="Menu"><svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button><button id="sb" aria-label="Search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg></button></div><a href="index.html" class="logo" aria-label="Anivay">anivay</a><div class="r"><button id="snd" aria-label="Sound"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l4 6M21 9l-4 6"/></svg></button><button class="cartbtn" id="cb" aria-label="Cart"><svg viewBox="0 0 24 24"><path d="M2 3h3l3 12h11l2-8H6"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg><b>0</b></button></div></div><div class="marq"><div>${mq}${mq}</div></div>
  <nav class="menu" id="menu"><a href="index.html">Home</a><button class="sh" id="shb">Shop <span>⌃</span></button><div class="sub" id="sub">${CATS.map(c=>`<a href="shop.html?cat=${c}">${c}</a>`).join("")}</div><a href="shop.html?cat=clover">Clover Drop</a><a href="contact.html">Contact</a><a href="track-order.html">Track your order</a></nav></header>
  <div class="scrim" id="scrim"></div>
  <aside class="cart" id="cart"><h3>Your cart <button id="cx">✕</button></h3><div class="items"></div><div class="cfoot"><div class="tot"><span>Total</span><span id="ctot"></span></div><button class="btn" id="co">Checkout via WhatsApp</button></div></aside>
  <div class="srch" id="srch"><input id="si" placeholder="Search products…" autocomplete="off"><div class="res" id="res"></div></div><div class="toast"></div>`;
  $("#ftr").innerHTML=`<footer class="ft"><div class="cols"><div><div class="logo">anivay</div><p>Heavyweight streetwear, designed with intent.</p></div><div><h5>Shop</h5>${CATS.slice(0,4).map(c=>`<a href="shop.html?cat=${c}" class="caps" style="font-size:13px">${c}</a>`).join("")}</div><div><h5>Help</h5><a href="contact.html">Contact</a><a href="track-order.html">Track order</a><a href="contact.html">Shipping &amp; returns</a></div><div><h5>Newsletter</h5><form id="nl"><input type="email" placeholder="Your email" required><button class="btn" style="padding:12px;font-size:14px">Subscribe</button></form></div></div><div class="copy">© ${new Date().getFullYear()} ANIVAY. ALL RIGHTS RESERVED.</div></footer>
  <a class="chat" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/></svg></a>`;
  const on=(id,f)=>$(id).onclick=f, menu=$("#menu"),scrim=$("#scrim"),cartEl=$("#cart"),srch=$("#srch");
  const closeAll=()=>{menu.classList.remove("on");cartEl.classList.remove("on");srch.classList.remove("on");scrim.classList.remove("on")};
  on("#mb",()=>{const o=!menu.classList.contains("on");closeAll();if(o){menu.classList.add("on");scrim.classList.add("on")}});
  on("#shb",e=>{$("#sub").classList.toggle("on");e.currentTarget.classList.toggle("open")});
  on("#cb",()=>{closeAll();cartEl.classList.add("on");scrim.classList.add("on")});
  on("#cx",closeAll);scrim.onclick=closeAll;
  on("#sb",()=>{closeAll();srch.classList.add("on");scrim.classList.add("on");$("#si").focus()});
  on("#snd",()=>toast("Sound is off"));
  on("#co",checkout);
  $("#si").oninput=e=>{const q=e.target.value.toLowerCase().trim();$("#res").innerHTML=q?PRODUCTS.filter(p=>(p.name+p.cat).toLowerCase().includes(q)).map(p=>`<a href="product.html?id=${p.id}"><span>${p.name}</span><span>${fmt(p.price)}</span></a>`).join("")||"<p>No results</p>":""};
  $("#nl").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Thanks for subscribing!")};
  document.addEventListener("keydown",e=>e.key==="Escape"&&closeAll());
  renderCart();
}

/* ---------- pages ---------- */
const pages={
  home(){
    $("#drop").innerHTML=PRODUCTS.slice(0,8).map(card).join("");
    $("#cats").innerHTML=CATS.map(c=>`<a class="cat" href="shop.html?cat=${c}">${c}</a>`).join("");
  },
  shop(){
    const q=new URLSearchParams(location.search).get("cat")||"all";
    const list=q==="all"?PRODUCTS:q==="clover"?PRODUCTS.filter(p=>p.tag==="New"||p.tag==="Bestseller"):PRODUCTS.filter(p=>p.cat===q);
    $("#ttl").textContent=q==="all"?"Shop all":q==="clover"?"Clover drop":q;
    $("#filters").innerHTML=["all",...CATS].map(c=>`<button class="${c===q?"on":""}" onclick="location.href='shop.html${c==="all"?"":"?cat="+c}'">${c}</button>`).join("");
    $("#list").innerHTML=list.map(card).join("")||"<p>No products found.</p>";
  },
  product(){
    const id=new URLSearchParams(location.search).get("id"),p=PRODUCTS.find(x=>x.id===id)||PRODUCTS[6];
    document.title=p.name+" – ANIVAY";let size="S",q=1,v=0;
    const draw=()=>{$("#main").innerHTML=art(p,v);$$("#thumbs button").forEach((b,i)=>b.classList.toggle("on",i===v))};
    $("#thumbs").innerHTML=[0,1,2,3].map(i=>`<button aria-label="View ${i+1}">${art(p,i)}</button>`).join("");
    $$("#thumbs button").forEach((b,i)=>b.onclick=()=>{v=i;draw()});draw();
    $("#pname").textContent=p.name;$("#pprice").textContent=fmt(p.price)+" INR";
    $("#sizes").innerHTML=SIZES.map(s=>`<button class="${s===size?"on":""}">${s}</button>`).join("");
    $$("#sizes button").forEach(b=>b.onclick=()=>{size=b.textContent;$$("#sizes button").forEach(x=>x.classList.toggle("on",x===b))});
    $("#minus").onclick=()=>{q=Math.max(1,q-1);$("#q").textContent=q};$("#plus").onclick=()=>{q=Math.min(10,q+1);$("#q").textContent=q};
    $("#add").onclick=()=>{cart.add(p.id,size,q);toast("Added to cart");$("#cart").classList.add("on");$("#scrim").classList.add("on")};
    $("#buy").onclick=()=>{cart.add(p.id,size,q);checkout()};
    $("#pdesc").textContent=p.desc;
    $("#more").innerHTML=PRODUCTS.filter(x=>x.id!==p.id).slice(0,4).map(card).join("");
  },
  contact(){
    $("#cf").onsubmit=async e=>{
      e.preventDefault();const n=$("#cn"),f=e.target;n.className="note";
      try{const r=await fetch("contact.php",{method:"POST",body:new FormData(f)});const j=await r.json();if(!j.ok)throw 0;n.textContent="Thanks! We'll get back to you within 24 hours.";n.classList.add("on");f.reset()}
      catch(err){location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent("Website enquiry from "+f.name.value)}&body=${encodeURIComponent(f.message.value+"\n\n"+f.name.value+" / "+f.email.value)}`}
    };
  },
  track(){
    const ORDER=["Order placed","Packed","Shipped","Out for delivery","Delivered"];
    $("#tf").onsubmit=async e=>{
      e.preventDefault();const n=$("#tn"),st=$("#steps");n.className="note";st.classList.remove("on");
      const fd=new FormData(e.target);
      try{const r=await fetch("track.php",{method:"POST",body:fd});const j=await r.json();
        if(!j.ok){n.textContent=j.msg||"Order not found. Check your order ID and email.";n.classList.add("on","err");return}
        const i=ORDER.indexOf(j.status);st.innerHTML=ORDER.map((s,k)=>`<li class="${k<=i?"done":""}">${s}</li>`).join("");st.classList.add("on");
        n.textContent=`Order ${j.id}: ${j.status}${j.tracking?" · Tracking: "+j.tracking:""}`;n.classList.add("on")}
      catch(err){n.textContent="Tracking is unavailable right now. Please contact us.";n.classList.add("on","err")}
    };
  }
};
document.addEventListener("DOMContentLoaded",()=>{shell();const p=document.body.dataset.page;pages[p]&&pages[p]()});
