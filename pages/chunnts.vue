<template>
  <section class="container">
      <navigation></navigation>
      <div class="fl w-100 pa2">
        <h1 class="f2 lh-copy tc">Chunnts z'Bärn äch cho schiffe?</h1>
      </div>
      <div class="fl w-100 pa2">
        <a v-if="!isNotificationEnabled" class="f6 link dim ph3 pv2 mb2 dib white bg-blue" @click="subscribe()">I wot troche bliebe!</a>
        <a v-if="isNotificationEnabled" class="f6 link dim ph3 pv2 mb2 dib white bg-blue" href="#0">I wot mi wieder la überrasche!</a>
        <img class="center db" src="~/assets/images/chunnts.svg" alt="Chunnt" />

      </div>
    
  </section>
</template>

<script>

import Navigation from '~/components/Navigation.vue'

export default {

  components: {
    Navigation
  },
  data () {
    return {
      isNotificationEnabled: false
    }
  },
  methods: {
    subscribe () {
      this.$OneSignal.push(["registerForPushNotifications"])
    }
  },
  created: function() {
    // https://documentation.onesignal.com/docs/web-push-custom-code-examples
    this.$OneSignal.push(() => {
    this.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
      if (isEnabled) {
        console.log('Push notifications are enabled!')
        this.isNotificationEnabled = true;
      } else {
        console.log('Push notifications are not enabled yet.')
        this.isNotificationEnabled = false;
      }
    })
  })
  }
}

</script>

