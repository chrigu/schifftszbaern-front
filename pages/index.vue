<template>
  <section class="container">
    <bern></bern>
  </section>
</template>

<script>
import Bern from '~/components/Bern.vue'

export default {
  asyncData (context) {
    let client = context.app.apolloProvider.defaultClient
  },
  components: {
    Bern
  },
  head () {
    return {
      title: 'Schiffts z\'Bärn'
    }
  }
}

</script>

