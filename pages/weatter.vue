<template>
  <section class="weather-container" v-bind:class="{'weather-container--bad-weather': this.greySky,
                                                'weather-container--night': this.night,
                                                'weather-container--night-bad': this.night && this.greySky}">
    <navigation></navigation>
      <div class="controls flex center-items">
        <button class="f6 link b--none dim ph3 pv2 mr2 dib white bg-blue pointer forecast-content__button" @click="toggleDay()" >{{buttonMsg}}</button>
        <select v-model="weather">
          <option value="clear">Schön</option>
          <option value="rainy">Räge</option>
          <option value="cloudy">Wouche</option>
          <option value="foggy">Näbu</option>
          <option value="snowfall">Schnee</option>
        </select>
      </div>
      <city v-bind="{
              sun: sun,
              moon: moon,
              night: night,
              fog: fog,
              rain: rain,
              snow: snow,
              clouds: clouds,
              lightClouds: lightClouds,
              ready: ready
            }"
            class="w-50 db city-wrapper__city"
            ></city>
  </section>
</template>

<script>

import Navigation from '~/components/Navigation.vue'
import City from '~/components/City.vue'

const DAY_BUTTON_MSG = 'Tag'
const NIGHT_BUTTON_MSG = 'Nacht'

export default {

  components: {
    Navigation,
    City
  },
  data() {
    return {
      sun: true,
      greySky: false,
      fog: false,
      snow: false,
      rain: false,
      moon: false,
      night: false,
      clouds: false,
      lightClouds: false,
      ready: false,
      weather: 'clear',
      buttonMsg: NIGHT_BUTTON_MSG
    }
  },
  methods: {
    toggleDay() {
      this.night = !this.night
      this.buttonMsg = this.night ? DAY_BUTTON_MSG : NIGHT_BUTTON_MSG
      this.setDayOrNight()
    },
    setDayOrNight() {
      if (this.weather === 'clear') {
        this.sun = !this.greySky && !this.night
        this.moon = !this.greySky && this.night
      } else {
        this.sun = false
        this.moon = false
      }
    }
  },
  watch: {
    weather() {
      switch (this.weather) {
        case 'rainy':
          this.sun = false
          this.greySky = true
          this.clouds = true
          this.rain = true
          this.fog = false
          this.snow = false
          break
        case 'cloudy':
          this.sun = false
          this.greySky = true
          this.clouds = true
          this.rain = false
          this.fog = false
          this.snow = false
          break
        case 'foggy':
          this.sun = false
          this.greySky = true
          this.clouds = false
          this.rain = false
          this.fog = true
          this.snow = false
          break
        case 'snowfall':
          this.sun = false
          this.greySky = true
          this.clouds = true
          this.rain = false
          this.fog = false
          this.snow = true
          break
        default:
          this.sun = true
          this.greySky = false
          this.clouds = false
          this.rain = false
          this.fog = false
          this.snow = false
      }
      this.setDayOrNight()
    }
  },
  mounted: function () {
    this.ready = true
  }
}

</script>

