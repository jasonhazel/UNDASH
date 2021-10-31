<template>
  <VCard tile class='ma-1 mb-2'>
    <VProgressLinear height='4' :color='progressColor' :value='progressValue' />
    <VToolbar dense tile flat>
      <VToolbarTitle v-if='title'>{{ title }}</VToolbarTitle>
      <VSpacer />
      <VSlideYReverseTransition>
        <div v-show='!opened'>
          <slot name='collapsed' />
        </div>
      </VSlideYReverseTransition>
      <slot name='additional' />

      <VBtn icon v-on:click="$emit('update:opened', !opened)" :class="{ opened: opened }">
        <VIcon>mdi-chevron-down</VIcon>
      </VBtn>
    </VToolbar>
    <VSheet>
      <VExpandTransition>
        <div v-show="opened">
          <slot />
        </div>
      </VExpandTransition>
    </VSheet>
  </VCard>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    progressColor: {
      type: String,
      default: 'grey lighten-1'
    },
    progressValue: {
      type: [Number, String],
      default: 100
    },
    title: {
      type: [String, Boolean],
      default: false
    },
    opened: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    
  })
}
</script>

<style scoped>
.v-btn.opened .v-icon {
  transform: rotate(-180deg);
}
</style>