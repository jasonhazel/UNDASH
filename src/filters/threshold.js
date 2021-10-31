import Vue from 'vue'

Vue.filter('thresholdColor', function(value, def = 'green lighten-2') {
  if (value >= 85) return 'red lighten-1'
  if (value >= 60) return 'orange lighten-1'

  return def
})

Vue.filter('reverseThresholdColor', function(value, def = 'green lighten-2') {
  if (value <= 60) return 'red lighten-1'
  if (value <= 85) return 'orange lighten-1'

  return def
})

// dumb names
Vue.filter('reverseThresholdText', function(value) {
  if (value <= 60) return 'black--text'
  return 'white--text'
})

Vue.filter('thresholdText', function (value) {
  if (value >= 60) return 'white--text'
  return null
})