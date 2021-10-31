

import Vue from 'vue'


// https://stackoverflow.com/a/18650828
// just wrapped the top solution into a filter

Vue.filter('fileSize', function(bytes, decimals = 0, size = 1000) {
  bytes = bytes * 1000
  if (bytes === 0) return '0 Bytes';

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(size));

  return parseFloat((bytes / Math.pow(size, i)).toFixed(dm)) + ' ' + sizes[i];
})