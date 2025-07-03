<template>
  <main>
    <!-- Logo VUEjs -->
    <img src="/imagens/vue-js-4096.png" alt="Logo VUE" id="logo-vue" class="absolute opacity-5 w-full">

    <h1 class="titulo-wheater text-[80px] sm:text-[150px] ">Weather</h1> 

    <form @submit.prevent="requisicao()" class="p-12 rounded-xl flex flex-col gap-y-5 mx-auto items-center mb-[-20px] bg-white">
      <div class="relative w-full max-w-xs mb-3">
        <div class="absolute inset-y-0 right-0 px-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
        </div>

        <!-- Input -->
        <input
          type="text" v-model="cidadeBusca"
          placeholder="Pesquisar..."
          class="pl-3 pr-4 py-1 w-full border-green-200 border-b-2 focus:outline-none bg-transparent text-[#7c797a]"
        />
      </div>

      <button type="submit" id="botao-buscar" class="px-4 py-2 rounded-5 w-1/3 rounded-[100px] text-white shadow-xl z-10 bg-cor1 hover:bg-white hover:text-cor1 transition duration-500 cursor-pointer">Buscar</button>
    </form>

    <!-- RESULT -->
    <section class="flex items-end justify-center flex-wrap-reverse" v-if="result != null ">

      <div id="fotoTempo" class="rounded-xxl">
        <img :src="srcFoto" alt="imagem ilustrativa" class="rounded-xl shadow-2xl z-10 relative">
      </div>

      <div id="div-result" class="max-w-xl  h-full p-10 flex flex-col items-start md:items-center justify-start rounded-xl pb-20 z-0 relative">
        <div class="flex items-center gap-x-5 mb-[40px]">
          <h2 class="text-2xl sm:text-base md:text-xl lg:text-2xl text-[#7c797a]">{{ nomeTela }}, {{ pais }}</h2>
          <h1 class="text-3xl sm:text-xl md:text-xl lg:text-5xl text-cor3">{{ temperatura }}</h1>
        </div>

        <div class="flex items-top gap-x-10 justify-items-start text-base">
          <div>
            <p>Max</p>
            <p class="text-cor3">{{ max }}</p>
          </div>
          <div>
            <p>Min</p>
            <p class="text-cor3">{{ min }}</p>
          </div>
          <div>
            <p>Umidade</p>
            <p class="text-cor3">{{ umidade }}</p>
          </div>
          <div>
            <p>Vento</p>
            <p class="text-cor3">{{ vento }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      result: null,
      cidadeBusca: '',
      nomeTela: '',
      pais: '',
      temperatura: '',
      max: '',
      min: '',
      umidade: '',
      vento: '',
      horario: null,
      srcFoto: null
    }
  },
  methods: {
    async requisicao () {
      try {
        const api_key = '77e17c1aff65c82070022333cd98c178';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cidadeBusca}&appid=${api_key}&units=metric`;

        // Fetch
        const response = await fetch(url);
        const resultado = await response.json();

        if (resultado.cod == 200) {
          this.result = resultado;
          this.informacoesTela(this.result);
        } else {
          alert('Cidade não encontrada. Tente novamente!');
        }
      } catch(error) {
        alert('Houve um erro ao buscar. Tente novamente');
        console.error(error);
      }
    },
    async informacoesTela (resultado) {
      // Na tela
      this.temperatura = resultado.main.temp + ' °C';
      this.nomeTela = resultado.name;
      this.pais = resultado.sys.country;
      this.max = resultado.main.temp_max + ' °C';
      this.min = resultado.main.temp_min + ' °C';
      this.umidade = resultado.main.humidity + '%';
      this.vento = resultado.wind.speed + ' Km/h';

      // Dia ou noite
      const nascerSol = resultado.sys.sunrise;
      const porDoSol = resultado.sys.sunset;
      const agora = resultado.dt;

      // Limpo ou chuva
      const tempo = resultado.weather[0].main;

      // Se for dia
      if (agora > nascerSol && agora < porDoSol) {
        if (tempo == 'Clear') {
          this.srcFoto = '/imagens/dia.png';
        } else if (tempo == 'Clouds' || tempo == 'Mist') {
          this.srcFoto = '/imagens/dianublado.png';
        } else {
          this.srcFoto = '/imagens/chuva.png';
        }
      } else { // Se for noite
        if (tempo == 'Clear') {
          this.srcFoto = '/imagens/noite-limpa.png';
        } else {
          this.srcFoto = '/imagens/noite-chuva.png';
        }
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;800&display=swap');

:root {
  --cor1: #42D392;
  --cor2: #f8f9fa;
}
* {font-family: Poppins;}

/* Body */
main {margin-top: 28vh;}
h1, h2 {color: var(--cor1);}
.titulo-wheater {
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 150px;
}
p {color: #7c797a;}

body {
  background-color: var(--cor2);
}
#logo-vue {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 500px) {
  main {margin-top: 20vh;}
  .titulo-wheater {top: 10%;}
  #logo-vue {top: 38%;}
  #fotoTempo {margin-top: -50px;}
}

form {
  max-width: 450px;
}
form, #div-result {
  box-shadow: 2px 2px 46px 2px rgba(66, 211, 146, 0.116);
}
#div-result {background-color: rgba(255, 255, 255, 0.397);}
button {border: 0;}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
