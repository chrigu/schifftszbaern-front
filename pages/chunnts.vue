<template>
  <section class="container">
      <navigation></navigation>
      <div class="fl w-100 pa2">
        <h1 class="f2 lh-copy tc">Chunnts z'Bärn äch cho schiffe?</h1>
      </div>
      <div v-if="isPushSupported" class="fl w-100 pa2">
        <div class="center">
          <a class="f6 link dim ph3 pv2 mb2 dib white bg-blue" @click="updateSubscription()" ahref="#0">{{buttonText}}</a>
          <img class="db mt3" src="~/assets/images/chunnts.svg" alt="Chunnt" />
        </div>
      </div>
      <div v-if="!isPushSupported" class="fl w-100 pa2">
        <p>Leider unterstützt die Browser ke Notifikatione</p>
      </div>
  </section>
</template>

<script>

import Navigation from '~/components/Navigation.vue'

const BUTTON_TEXT_SUBSCRIBE = 'I wot troche bliebe!'
const BUTTON_TEXT_UNSUBSCRIBE = 'I wot mi wieder la überrasche!'
const SUBSCRIBED_CLASS = 'chunnts--subscribed'
const BODY_CLASS = 'chunnts'

export default {

  components: {
    Navigation
  },
  data () {
    return {
      isPushEnabled: false,
      isPushSupported: false,
      isOptedOut: false,
      buttonText: BUTTON_TEXT_SUBSCRIBE
    }
  },
  methods: {
    setBackgroundClass(setSubscribeClass) {

      if (setSubscribeClass) {
        document.body.classList.add(SUBSCRIBED_CLASS)
      } else {
        document.body.classList.remove(SUBSCRIBED_CLASS)
      }
    },
    updateSubscription() {
      this.getSubscriptionState().then((state) => {
        if (state.isPushEnabled) {
          this.setBackgroundClass(false)
          this.$OneSignal.push(() => {
            this.$OneSignal.setSubscription(false)
          })
        } else {
            this.setBackgroundClass(true)
            if (state.isOptedOut) {
              this.$OneSignal.push(() => {
                this.$OneSignal.setSubscription(true)
              })
            } else {
              this.$OneSignal.push(["registerForPushNotifications"])
            }
        }
      })
    },
    updateSubscriptionButton() {
      this.getSubscriptionState().then((state) => {
       this.buttonText = !state.isPushEnabled || state.isOptedOut ? BUTTON_TEXT_SUBSCRIBE : BUTTON_TEXT_UNSUBSCRIBE
      })
    },
    getSubscriptionState() {
      return Promise.all([
          this.$OneSignal.isPushNotificationsEnabled(),
          this.$OneSignal.isOptedOut()
        ]).then(function(result) {
            const isPushEnabled = result[0]
            const isOptedOut = result[1]
            console.log(result)
            return {
                isPushEnabled,
                isOptedOut
            };
        });
    }
  },
  created: function() {

    document.body.classList.add(BODY_CLASS)

    // https://documentation.onesignal.com/docs/web-push-custom-code-examples
    this.$OneSignal.push(() => {

      if (!this.$OneSignal.isPushNotificationsSupported()) {
          console.log('Push not supported')
          return
      }
      this.isPushSupported = true

      this.$OneSignal.on('subscriptionChange', (isSubscribed) => {
        this.updateSubscriptionButton()
      })
  })
  }
}

</script>
