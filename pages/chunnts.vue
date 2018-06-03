<template>
  <div class="forecast">
    <div class="container forecast__container">
      <section class="forecast__header">
        <navigation></navigation>
        <div class="fl w-100 pa2">
          <h1 class="f2 lh-copy tc">Chunnts z'Bärn äch cho schiffe?</h1>
        </div>
      </section>
      <div class="buttons" v-if="isPushSupported" >
        <a class="f6 link dim ph3 pv2 mb2 dib white bg-blue forecast-content__button pointer"
           @click="subscriptionButtonPressed()"
           v-bind:class="{'btn--disabled': !buttonEnabled}"
           ahref="#0"
           @click.prevent="!buttonEnabled">{{buttonText}}</a>
      </div>
      <div v-if="!isPushSupported" class="fl w-100 pa2">
        <p>Leider unterstützt die Browser ke Notifikatione. Blibsch äuwä nass.</p>
      </div>
      <svg class="subscribe-animation" viewBox="0 0 2443 2200" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5"><path id="subscribe" fill="none" d="M.965.822h2341.41v1419.36H.965z"/><g id="sun"><path id="sunheat2" d="M1431.46 397.709c64.398 30.181 77.062 39.594 98.017 95 20.954 55.405 22.932 153.153-28.877 163.677-51.809 10.525-145.899 56.787-179.599 36.323-33.7-20.465-71.803-59.697-90.059-97-18.255-37.303-14.504-124.39 23-148 37.505-23.611 113.119-80.182 177.518-50z" fill="#fffbb6" fill-opacity=".239"/><path id="sunheat1" d="M1322 419.527c-27.57 14.901-69.847 44.89-68 108.34 1.847 63.45 25.309 133.061 84 145.842 58.691 12.78 159.663-2.239 187-113 16.367-66.315-13.617-107.236-66.113-126.864-22.946-8.58-108.019-29.921-136.887-14.318z" fill="#fff98e" fill-opacity=".325"/><circle id="sun-body" cx="1389.33" cy="545.115" r="111.271" fill="#f4eb4e"/><path d="M1348.8 573.416s6.073 21.907 40.526 21.907 41.883-19.379 41.883-19.379" fill="none" stroke="#ecc543" stroke-width="5"/><circle id="sun-left-eye" cx="1349.25" cy="518.44" r="9.428" fill="#ecc543"/><circle id="sun-right-eye" cx="1431.46" cy="518.44" r="9.428" fill="#ecc543"/></g><g id="sunbeams" fill="#efed1a" fill-opacity=".871"><path class="sunbeam" d="M1388.16 119.938l5.75 291h-11.5l5.75-291z"/><path class="sunbeam" d="M1689.04 247.554l-201.702 209.834-8.132-8.132 209.834-201.702z"/><path class="sunbeam" d="M1814.73 550.824l-291 5.75v-11.5l291 5.75z"/><path class="sunbeam" d="M1689.04 851.709l-209.834-201.703 8.132-8.131 201.702 209.834z"/><path class="sunbeam" d="M1387.13 979.812l-5.75-291h11.5l-5.75 291z"/><path class="sunbeam" d="M1082.25 855.196l201.702-209.834 8.132 8.132-209.834 201.702z"/><path class="sunbeam" d="M952.63 550.824l291-5.75v11.5l-291-5.75z"/><path class="sunbeam" d="M1082.25 243.94l209.834 201.703-8.132 8.131L1082.25 243.94z"/></g><g id="rain" fill="none" stroke="#e6e6e6" stroke-width="5"><g id="rain1"><path class="raindrop" d="M974.336 733.499l-40.5 70.148"/><path d="M1030.55 790.428l-40.5 70.148"/><path class="raindrop" d="M926.829 767.647l-40.5 70.149"/><path class="raindrop" d="M1152.18 745.573l-40.5 70.148"/><path class="raindrop" d="M1302.01 767.647l-40.5 70.149"/><path class="raindrop" d="M1191.92 815.721l-40.5 70.149"/><path class="raindrop" d="M1369.01 732.573l-40.5 70.148"/></g><g id="rain2"><path class="raindrop" d="M1029.43 710.499l-40.5 70.148"/><path class="raindrop" d="M1121.68 710.499l-40.5 70.148"/><path class="raindrop" d="M1226.68 675.425l-40.5 70.148"/><path class="raindrop" d="M1267.18 710.499l-40.5 70.148"/><path class="raindrop" d="M1410.93 715.63l-40.5 70.148"/></g></g><g id="cloud"><path class="cloud-body" d="M1442.63 721.548c0-45.724-33.532-83.606-77.346-90.413-6.489-69.47-64.932-123.852-136.095-123.852-54.718 0-101.908 32.16-123.755 78.597-16.411-15.595-38.584-25.185-63.008-25.185-50.537 0-91.506 40.968-91.506 91.504 0 3.592.23 7.126.632 10.608-53.707 9.217-94.583 55.973-94.583 112.31 0 62.957 51.032 113.991 113.988 113.991 36.977 0 69.826-17.62 90.652-44.909 16.211 40.719 55.958 69.516 102.459 69.516 38.692 0 72.706-19.945 92.383-50.099a91.133 91.133 0 0 0 36.512 7.596c40.501 0 74.834-26.322 86.881-62.785 36.463-12.046 62.786-46.379 62.786-86.879" fill="silver" fill-rule="nonzero"/><path id="mouth" d="M1075 786 Q1162 700 1250 786" fill="none" stroke="#585858" stroke-width="5"/><circle id="righteye" cx="1241.31" cy="675.846" r="10.601" fill="#4d4d4d"/><circle id="lefteye" cx="1076.1" cy="675.846" r="10.601" fill="#4d4d4d"/></g></svg>
    </div>
  </div>
</template>

<script>

import { TimelineMax } from 'gsap'
import Navigation from '~/components/Navigation.vue'

const BUTTON_TEXT_SUBSCRIBE = 'Ja, I wot wüsse wes chunnt u troche bliebe!'
const BUTTON_TEXT_UNSUBSCRIBE = 'I wot mi wieder la überrasche!'
const SUBSCRIBED_CLASS = 'chunnts--subscribed'
const BODY_CLASS = 'chunnts'

// labels
const GOOD_WEATHER_START = 'goodWeatherStart'
const CLOUD_HAPPY = 'cloudhappy'
const GOOD_WEATHER_COMPLETE = 'goodWeatherCloudHappy'
const SUNBEAMS_SHOWING = 'sunbeamsShowing'

// TLs
const RAIN_TL = 'rainTl'
const HAPPY_CLOUD_TL = 'happyCloudTl'
const BG_TL = 'bgTl'
const GOOD_WEATHER_TL = 'goodWeatherTl'

export default {

  components: {
    Navigation
  },
  data () {
    return {
      isPushSupported: false,
      isOptedOut: false,
      buttonText: BUTTON_TEXT_SUBSCRIBE,
      masterTl: new TimelineMax(),
      isSubscribed: false,
      ready: false,
      buttonEnabled: false
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
    subscriptionButtonPressed() {
      this.getSubscriptionState().then((state) => {
        if (state.isPushEnabled) {
          console.log('push enabled')
          this.setBackgroundClass(false)
          this.$OneSignal.push(() => {
            this.$OneSignal.setSubscription(false)
          })
        } else {
            console.log('push NOT enabled')
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
    updateSubscription() {
      this.getSubscriptionState().then((state) => {
        console.log('update', state)
        this.isSubscribed = this.isPushEnabled(state)
        if (this.isSubscribed) {
          this.buttonText = BUTTON_TEXT_UNSUBSCRIBE
          this.showSun(false)
        } else {
          this.buttonText = BUTTON_TEXT_SUBSCRIBE
          this.buttonEnabled = false
          this.showRain()
        }
      })
    },
    isPushEnabled(state) {
      return state.isPushEnabled && !state.isOptedOut
    },
    getSubscriptionState() {
      return Promise.all([
          this.$OneSignal.isPushNotificationsEnabled(),
          this.$OneSignal.isOptedOut()
        ]).then(function(result) {
            const isPushEnabled = result[0]
            const isOptedOut = result[1]
            return {
                isPushEnabled,
                isOptedOut
            };
        });
    },
    rain() {
      const tl = new TimelineMax({ data: { timelineName: RAIN_TL } })
      const staggerDelta = 0.2
      const duration = 2

      const movementSettings = {
        x: -250,
        y: 500,
        ease: Linear.easeNone,
        repeat: -1
      }

      const opacitySettings = {
        opacity: 0,
        ease: Linear.easeNone,
        clearProps: 'opacity',
        repeat: -1
      }

      tl.add('rainStart')
      tl.staggerTo('#rain1 .raindrop', duration, movementSettings, staggerDelta)
        .staggerTo('#rain2 .raindrop', duration, movementSettings, -staggerDelta, 'rainStart')
        .staggerTo('#rain1 .raindrop', duration, opacitySettings, staggerDelta, 'rainStart')
        .staggerTo('#rain2 .raindrop', duration, opacitySettings, -staggerDelta, 'rainStart');

      return tl
    },
    goodWeather() {
      const tl = new TimelineMax({ data: { timelineName: GOOD_WEATHER_TL } })

      tl.add(GOOD_WEATHER_START)

        .add(this.happyCloud())
        .add(this.bgToGoodWeather(), GOOD_WEATHER_START)
        .add(GOOD_WEATHER_COMPLETE)
        .to('#sun', 2, {
          autoAlpha: 1
        })
        .from('#sun', 2, {
          x: '-=100',
          y: '+=100',
          ease: Elastic.easeOut.config(1, 0.5)
        }, GOOD_WEATHER_COMPLETE)
        .add('goodWeatherSunShowing')
        .staggerTo('.sunbeam', 0.4, { autoAlpha: 1 }, 0.1)
        .add(SUNBEAMS_SHOWING)
        .to('#sunheat1', 25, {
          rotation: 360,
          repeat: -1,
          transformOrigin: "50% 50%"
        })
        .to('#sunheat2', 30, {
          rotation: -360,
          repeat: -1,
          transformOrigin: "50% 50%"
        }, SUNBEAMS_SHOWING)
        .to('#sunbeams', 80, {
          rotation: 360,
          repeat: -1,
          transformOrigin: "50% 50%",
          ease: Linear.easeNone
        }, SUNBEAMS_SHOWING)
        .to('#cloud', 3, {
          opacity: 0
        }, SUNBEAMS_SHOWING)
        .to('#sun, #sunbeams', 1.5, {
          x: '-=150',
          y: '+=150',
          ease: Elastic.easeOut.config(1, 0.3)
        })
      return tl
    },
    bgToGoodWeather() {
      const tl = new TimelineMax({ data: { timelineName: BG_TL } })

      tl.fromTo('.container', 2, {
        backgroundColor: 'rgba(124, 124, 124, 1.0)',
        ease: Power2.easeOut
      }, {
          backgroundColor: 'rgba(88, 198, 255, 1.0)',
          ease: Power2.easeOut
      })
      return tl
    },
    happyCloud() {

      const tl = new TimelineMax({ data: { timelineName: HAPPY_CLOUD_TL } })

      tl.to('#mouth', 1, {
        attr: {
          d: `M 1075 786 Q 1162 860 1250 786`
        },
        ease: Linear.easeNone
      })
        .add(CLOUD_HAPPY)
        .to('.cloud-body', 2, {
          fill: 'rgba(250, 250, 250, 0.7)'
        }, GOOD_WEATHER_COMPLETE)

      return tl
    },
    showSun(jumpToEnd) {
      const rainTl = this.masterTl.getChildren(true, false, true).filter(tl => tl.data && tl.data.timelineName === RAIN_TL)[0]
      const duration = 2

      TweenMax.to('#rain1, #rain2', 1, {
        autoAlpha: 0,
        delay: duration,
        onComplete: () => {
          // if (rainTl) {
            rainTl.restart().kill()
          // }
          this.masterTl.add(this.goodWeather())
          this.buttonEnabled = true
          if (jumpToEnd) {
            this.masterTl.seek('-=0')
          }
        }
      })

    },
    showRain() {
      // const goodWeatherTl = this.masterTl.getChildren(false, false, true)[0]
      //goodWeatherTl.pause()

      const cloudOffset = 2000

      TweenMax.to('#sun', 1, {
        y: `+=${cloudOffset}`
      })
      TweenMax.staggerTo('.sunbeam', 0.5, {
        autoAlpha: 0,
        onComplete: () => {
          this.buttonEnabled = true
        }
      }, 0.1, this.reset)

      // todo make own toggle fn
      //document.getElementsByClassName('rain-button')[0].classList.add('isHidden')
    },
    reset() {
      const happyCloudTl = this.getTlByName(HAPPY_CLOUD_TL)
      const bgTl = this.getTlByName(BG_TL)
      const goodWeatherTl = this.getTlByName(GOOD_WEATHER_TL)

      TweenMax.to('#cloud', 0, {
        opacity: 1
      })

      happyCloudTl.reverse()
      bgTl.reverse()
      goodWeatherTl.kill()


      TweenMax.set( '#rain1, #rain2, #sunbeams', { clearProps: 'all' }, '+=1')
      TweenMax.set('#sun, .sunbeam', { autoAlpha: 0, clearProps: 'x, y' })
      this.masterTl.add(this.rain())

    },
    getTlByName(tlName) {
      return this.masterTl.getChildren(true, false, true).filter(tl => tl.data && tl.data.timelineName === tlName)[0]
    }
  },
  created: function() {
    document.body.classList.add(BODY_CLASS)

    // https://documentation.onesignal.com/docs/web-push-custom-code-examples
    this.$OneSignal.push(() => {

      this.ready = true

      if (!this.$OneSignal.isPushNotificationsSupported()) {
          console.log('Push not supported')
          return
      }
      this.isPushSupported = true

      this.$OneSignal.on('subscriptionChange', (isSubscribed) => {
        this.updateSubscription()
      })

      this.getSubscriptionState().then(state => {
        this.buttonEnabled = true
        this.isSubscribed = this.isPushEnabled(state)
        if (this.isSubscribed) {
          this.buttonText = BUTTON_TEXT_UNSUBSCRIBE
          this.showSun(true)
        }
      })
  })
  },
  mounted: function () {
    this.masterTl.set('#sun', { autoAlpha: 0 })
      .set('.sunbeam', { autoAlpha: 0 })
    this.masterTl.add(this.rain(), 'rainScene')
    this.masterTl.timeScale(1.5)

  },
  watch: {
      // whenever question changes, this function will run
      buttonEnabled: function (newQuestion, oldQuestion) {
        console.log('button', newQuestion)
      }
    }
}

</script>
