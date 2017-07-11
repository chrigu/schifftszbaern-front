<template>
<div>
<div id="main">
  <div class="block">
    <div class="centered">
      <p class="current-situation">
          
      </p>

<!--             </div> -->
          </div>
        </div> 
      </div>

  <section class="info">
    <div class="arrow"></div>
    <div class="center">
      <h1>Schiffts z'Bärn?</h1>
      <p>{{ latest.createdAt }}</p>
      <p>{{ msg }}</p>
    </div>
  </section>
<div class="arrow"></div>
<footer>
  <ul>
      <li>Uf <a href="http://www.twitter.com/schifftszbaern">Twitter</a></li>
      <li>Uf <a href="https://github.com/chrigu/schifftszbaern">GitHub</a></li>
  </ul>
</footer>
</div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'bern',
  computed: {
    latest: function () {
      if (this.allRainLocations.length > 0) {
        return this.allRainLocations[0]
      } else {
        return {
          intensity: -1,
          createdAt: null
        }
      }
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      allRainLocations: []
    }
  },
  apollo: {
  // Simple query that will update the 'hello' vue property
    allRainLocations: gql`
        query {
        allRainLocations(last: 1) {
            createdAt
            intensity
        }
    }
  `
  }
}
</script>
