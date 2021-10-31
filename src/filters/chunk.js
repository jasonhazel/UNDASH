import Vue from 'vue'

// https://stackoverflow.com/a/11764168

Vue.filter('chunk', function(array, size) {
  let chunks = []
  let i = 0
  let n = array.length

  while (i < n) {
    chunks.push(array.slice(i, i += size))
  }

  return chunks
})