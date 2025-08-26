// === إعداد Body ===
const body = document.body;
body.style.margin = "0";
body.style.padding = "0";
body.style.fontFamily = "monospace";
body.style.background = "black";
body.style.color = "#00ff00";
body.style.overflow = "hidden";
body.style.height = "100vh";

// === Canvas Matrix ===
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
body.appendChild(canvas);

const letters = "01GPLTEAMHACKER";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);

// === أصوات ===
const hackerSound = new Audio("https://www.myinstants.com/media/sounds/hacker.mp3");
const errorSound = new Audio("https://www.myinstants.com/media/sounds/hacker2.mp3");

// === Login ===
const login = document.createElement("div");
login.style.cssText = "display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;color:#00ff00;";
login.innerHTML = `
<h1>🚀 أدخل الباسورد 🚀</h1>
<input type="password" id="password" placeholder="أدخل كلمة المرور" style="padding:10px;margin:5px;border-radius:8px;background:black;color:#00ff00;border:1px solid #00ff00;">
<button id="loginBtn" style="padding:10px 20px;margin-top:10px;border-radius:8px;background:#00ff00;color:black;font-weight:bold;cursor:pointer;box-shadow:0 0 15px #00ff00;">دخول</button>
<p id="error" style="color:red;"></p>
`;
body.appendChild(login);

// === Main ===
const main = document.createElement("div");
main.style.display = "none";
main.style.flexDirection = "column";
main.style.alignItems = "center";
main.style.color = "#00ff00";
main.innerHTML = `
<h1>💻 <span style="color:#ff00ff;">GPL TEAM</span> 💻</h1>
<p id="welcome"></p>
<div class="cards" style="display:flex;flex-wrap:wrap;gap:20px;padding:20px;">
  <div class="card" style="background:rgba(0,0,0,0.7);border:1px solid #00ff00;padding:20px;width:300px;box-shadow:0 0 20px #00ff00;border-radius:12px;">
    <h2>📊 جلب المعلومات</h2>
    <input type="text" id="infoUid" placeholder="أدخل ID" style="width:90%;margin:5px 0;padding:5px;border-radius:5px;background:black;color:#00ff00;border:1px solid #00ff00;">
    <input type="text" id="infoRegion" placeholder="أدخل Region" style="width:90%;margin:5px 0;padding:5px;border-radius:5px;background:black;color:#00ff00;border:1px solid #00ff00;">
    <button id="infoBtn" style="padding:5px 10px;margin-top:5px;background:#00ff00;color:black;font-weight:bold;border:none;border-radius:5px;cursor:pointer;">عرض المعلومات</button>
  </div>
  <div class="card" style="background:rgba(0,0,0,0.7);border:1px solid #00ff00;padding:20px;width:300px;box-shadow:0 0 20px #00ff00;border-radius:12px;">
    <h2>💖 زيادة لايكات</h2>
    <input type="text" id="likeUid" placeholder="أدخل ID" style="width:90%;margin:5px 0;padding:5px;border-radius:5px;background:black;color:#00ff00;border:1px solid #00ff00;">
    <input type="text" id="likeRegion" placeholder="أدخل Region" style="width:90%;margin:5px 0;padding:5px;border-radius:5px;background:black;color:#00ff00;border:1px solid #00ff00;">
    <button id="likeBtn" style="padding:5px 10px;margin-top:5px;background:#00ff00;color:black;font-weight:bold;border:none;border-radius:5px;cursor:pointer;">إضافة لايكات</button>
  </div>
</div>
<footer style="margin-top:20px;">💚 جميع الحقوق محفوظة GPL TEAM 💚</footer>
`;
body.appendChild(main);

// === Popup ===
const popup = document.createElement("div");
popup.style.cssText = "display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:black;border:2px solid #00ff00;padding:20px;width:70%;max-height:70%;overflow-y:auto;box-shadow:0 0 40px #00ff00;border-radius:12px;color:#00ff00;z-index:1000;";
popup.innerHTML = `<h2>📢 النتيجة</h2><pre id="popupContent"></pre><button style="display:block;margin:10px auto 0;background:red;color:white;box-shadow:0 0 15px red;">إغلاق</button>`;
body.appendChild(popup);
popup.querySelector("button").onclick = () => { popup.style.display = "none"; };

// === Functions ===
function typeWriter(text, elementId, speed) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      document.getElementById(elementId).innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// === Login Handling ===
document.getElementById("loginBtn").onclick = function () {
  const pass = document.getElementById("password").value;
  if (pass === "GPL") {
    login.style.display = "none";
    main.style.display = "flex";
    hackerSound.play();
    typeWriter("✅ تم دخولك إلى موقع GPL TEAM ⚡", "welcome", 100);
  } else {
    document.getElementById("error").innerText = "❌ كلمة المرور خاطئة!";
    errorSound.play();
  }
};

// === API Info ===
document.getElementById("infoBtn").onclick = async function () {
  const uid = document.getElementById("infoUid").value;
  const region = document.getElementById("infoRegion").value;
  try {
    const res = await fetch(`https://xp-full-info-v4.vercel.app/player-info?uid=${uid}&region=${region}`);
    const data = await res.json();
    document.getElementById("popupContent").innerText = JSON.stringify(data, null, 2);
    popup.style.display = "block";
  } catch (err) {
    document.getElementById("popupContent").innerText = "❌ خطأ في جلب المعلومات";
    popup.style.display = "block";
  }
};

// === API Likes ===
document.getElementById("likeBtn").onclick = async function () {
  const uid = document.getElementById("likeUid").value;
  const region = document.getElementById("likeRegion").value;
  try {
    const res = await fetch(`https://like-xp-v12.vercel.app/like?server_name=${region}&uid=${uid}&key=xp`);
    const data = await res.text();
    document.getElementById("popupContent").innerText = data;
    popup.style.display = "block";
  } catch (err) {
    document.getElementById("popupContent").innerText = "❌ خطأ في إضافة لايك";
    popup.style.display = "block";
  }
};