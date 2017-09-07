// Weather Symbols
// ---------------

// 1 = sunny
// 101 = clear sky
// 2 = mostly sunny, some clouds
// 102 = mostly clear sky, some clouds
// 35 = overcast and dry
// 3 = partly sunny, thick passing clouds
// 4 = overcast
// 14 = very cloudy, light rain
// 5 = very cloudy
// 21 = very overcast with frequent sleet
// 6 = sunny intervals,  isolated showers
// 15 = very cloudy, light sleet
// 16 = very cloudy, light snow
// 17 = very cloudy, rain
// 18 = very cloudy, rain & snow
// 19 = very cloudy, snow
// 20 = very overcast with rain
// 22 = very overcast with heavy snow
// 23, 24 = thunderstomrs
// 25 = thunderstomrs & heavy rain
// 29 = Sunny intervals, scattered showers
// 7, 10 = sunny intervals, showers & snow, sleet
// 8, 11 = sunny intervals,  snow showers
// 9 = sunny intervals, showers
// 12 = cloudy with thunder (light & sun)
// 13 = cloudy with thunder (sun, rain)
// 26 = sunny with high clouds
// 27 = fog sunny above
// 28 = foggy
// 30 = light clouds some snow, partly sunny
// 31 = light clouds some snow & rain, partly sunny
// 32 = light clouds some rain, partly sunny
// 33 = clouds rain, partly sunny
// 34 = clouds some snow, partly sunny


// sunny           1, 26
// overcast        35, 4, 21, 20, 22
// partly cloudy   2, 3, 6, 29, 7, 10, 8, 11, 9, 30, 31, 32, 33, 34
// cloudy          14, 5, 15, 16, 17, 19, 18
// light rain      21, 6, 15, 18, 29, 7, 10, 9, 31, 32, 33
// heavy rain      17, 20, 26
// light snow      14, 21, 15, 16, 18, 7, 10, 30, 31, 34
// heavy snow      19, 22, 8, 11
// fog             27, 28
// thunderstorms   23, 24, 25, 12, 13

// states > 100 are night states

<template>
<div class="main" v-bind:class="{ 'main--bad-weather': !this.sun, 
                                  'main--night': this.night }">
  <div class="block">
    <div class="centered">
      <p class="current-situation"></p>
      <city v-bind="{
              sun: sun,
              moon: moon,
              night: night,
              fog: fog,
              rain: rain,
              snow: snow,
              clouds: clouds,
              'light-clouds': lightClouds
            }"></city>
    </div>
  </div> 

  <section class="info">
    <div class="arrow"></div>
    <div class="center">
      <h1>Schiffts z'Bärn?</h1>
      <p>{{ schifftsMessage }}</p>
    </div>
  </section>
  <footer class="footer">
    <div class="arrow footer__arrow"></div>
    <ul class="link_list footer__list">
        <li class="link_list__item">Uf <a href="http://www.twitter.com/schifftszbaern">Twitter</a></li>
        <li class="link_list__item">Uf <a href="https://github.com/chrigu/schifftszbaern">GitHub</a></li>
    </ul>
  </footer>
</div>
</template>

<script>
import gql from 'graphql-tag'
import City from './City.vue'

export default {
  name: 'bern',
  components: {
    City
  },
  computed: {
    schifftsData: function () {
      console.log('weather', this.allWeatherLocations)
      if (this.allWeatherLocations.length === 0) {
        return {
          intensity: -1,
          createdAt: null,
          weatherCode: 1,
          temperature: 20
        }
      }

      return this.allWeatherLocations[0]
    },
    schifftsMessage: function () {
      if (this.schifftsData.intensity > -1) {
        return 'Es schifft'
      } else {
        return 'Es schifft nid'
      }
    },
    sun: function () {
      return this.showSunOrMoon(this.schifftsData.weatherCode) && !this.night
    },
    night: function () {
      return this.schifftsData.weatherCode > 100
    },
    moon: function () {
      return this.showSunOrMoon(this.schifftsData.weatherCode) && this.night
    },
    fog: function () {
      switch (this.normalizeCode(this.schifftsData.weatherCode)) {
        case 27:
        case 28:
          return true
        default:
          return false
      }
    },
    rain: function () {
      switch (this.normalizeCode(this.schifftsData.weatherCode)) {
        case 7:
        case 9:
        case 10:
        case 12:
        case 13:
        case 14:
        case 21:
        case 17:
        case 18:
        case 20:
        case 23:
        case 24:
        case 25:
        case 29:
        case 30:
        case 31:
        case 32:
        case 33:
          return true
        default:
          return false
      }
    },
    snow: function () {
      switch (this.normalizeCode(this.schifftsData.weatherCode)) {
        case 7:
        case 8:
        case 10:
        case 11:
        case 16:
        case 18:
        case 19:
        case 22:
        case 30:
        case 31:
        case 34:
          return true
        default:
          return false
      }
    },
    clouds: function () {
      switch (this.normalizeCode(this.schifftsData.weatherCode)) {
        case 2:
        case 3:
        case 35:
        case 4:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 29:
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
          return true
        default:
          return false
      }
    },
    lightClouds: function () {
      switch (this.normalizeCode(this.schifftsData.weatherCode)) {
        case 2:
        case 3:
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
          return true
        default:
          return false
      }
    }
  },
  data () {
    return {
      allWeatherLocations: []
    }
  },
  methods: {
    showSunOrMoon: function (code) {
      const normalizedCode = this.normalizeCode(code)

      switch (normalizedCode) {
        case 1:
        case 2:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 29:
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
          return true
        default:
          return false
      }
    },
    showFog: function (code) {
      const normalizedCode = this.normalizeCode(code)

      switch (normalizedCode) {
        case 27:
        case 28:
          return true
        default:
          return false
      }
    },
    normalizeCode: function (code) {
      return code > 99 ? code - 100 : code
    }
  },
  apollo: {
  // Simple query that will update the 'hello' vue property
    allWeatherLocations: gql`
        query {
        allWeatherLocations(last: 1) {
            createdAt
            intensity
            temperature
            weatherCode
        }
    }
  `
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
