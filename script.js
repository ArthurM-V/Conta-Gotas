"use strict";

// Classe do usuário
class User {
  constructor(email, usuario, senha, peso = null, qtdAgua = null, cdd = null) {
    this.email = email;
    this.usuario = usuario;
    this.senha = senha;
    this.peso = peso;
    this.qtdAgua = qtdAgua;
    this.cdd = cdd;
  }
}

// Carrega os usuários salvos (ou array vazio)
const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

// ---------------------- CADASTRO ----------------------
const cadEmail = document.getElementById("cd-email");
const cadUser = document.getElementById("cd-user");
const cadSenha = document.getElementById("cd-senha");
const cadConfSenha = document.getElementById("conf-senha");
const criaConta = document.getElementById("cd-signup");

if (criaConta) {
  criaConta.addEventListener("click", () => {
    const email = cadEmail.value.trim();
    const usuario = cadUser.value.trim();
    const senha = cadSenha.value;
    const confSenha = cadConfSenha.value;

    if (!email || !usuario || !senha || !confSenha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha !== confSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    const existe = usuarios.find((u) => u.email === email);
    if (existe) {
      alert("Email já cadastrado.");
      return;
    }

    const novoUsuario = new User(email, usuario, senha);
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Salva no localStorage

    alert("Conta criada com sucesso!");
    console.log("poggers");
    window.location.href = "login.html";
  });
}

// ---------------------- LOGIN ----------------------
const loginEmail = document.getElementById("login-email");
const loginSenha = document.getElementById("login-senha");
const loginBtn = document.getElementById("lc-login");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = loginEmail.value.trim();
    const senha = loginSenha.value;

    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const user = usuariosSalvos.find(
      (u) => u.email === email && u.senha === senha
    );

    if (user) {
      alert(`Bem-vindo(a), ${user.usuario}!`);
      localStorage.setItem("usuarioLogado", JSON.stringify(user));
      console.log("login poggers");
      window.location.href = "user.html";
    } else {
      alert("Email ou senha inválidos.");
    }
  });
}

const apiKey = "61b34619687a10f48902fba432e1d5c2";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const city = document.getElementById("location");
const cityChoice = document.getElementById("info-cdd");
const weatherIcon = document.getElementById("weather-icon");
const temp = document.getElementById("info");

async function checkWeather(cityChoice) {
  const response = await fetch(apiUrl + cityChoice + `&appid=${apiKey}`);

  if (response.status == 404) {
    alert(
      "Não foi possível conseguir os dados sobre o clima! Tente novamente mais tarde."
    );
    temp.textContent = "ERRO";
  } else {
    var data = await response.json();

    city.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°C";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "img/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "img/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "img/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "img/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "img/snow.png";
    }
    console.log(data);
  }
}

const meta = document.getElementById("meta");
const peso = document.getElementById("info-peso");

function calcQuant(x) {
  const idealQuant = x * 35;

  meta.innerHTML = `/ ${idealQuant} mL`;
}

const salvaInfo = document.getElementById("confirma");

const overlay = document.querySelector(".overlay");
const infoScreen = document.querySelector(".info-screen");

const formatador = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const secondHand = document.querySelector(".second-hand");
const minsHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = (mins / 60) * 360 + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = (hours / 60) * 360 + 90;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}
setInterval(setDate, 1000);

salvaInfo.addEventListener("click", () => {
  checkWeather(cityChoice.value);
  calcQuant(peso.value);
  overlay.classList.toggle("hidden");
  infoScreen.classList.toggle("hidden");
});
