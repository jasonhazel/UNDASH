<template>
  
  <Panel 
    title='UPS' 
    :progress-color='charge | reverseThresholdColor'
    :progress-value='charge'
  >
    <template v-slot:additional>
      <template v-if="ups.status == 'ONLINE'">
        <VChip label small text-color='white' color='green'>
          {{ ups.timeleft }}
        </VChip>
      </template>
      <template v-else>
        <VChip label small text-color='white' color='red'>
          {{ ups.status }}
        </VChip>
      </template>
    </template>
    <VCardText>
      <VProgressLinear rounded height='20' :color='usage | thresholdColor' :value='usage'>
        <template v-slot:default>
          <span :class="usage | thresholdText">
            {{ used }} W of {{ ups.nompower }} W
            </span>
        </template>
      </VProgressLinear>

    </VCardText>

  </Panel>

</template>

<script>
import Panel from '@/components/panel.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'UpsPanel',
  components: { Panel },
  props: {
  },
  data: () => ({
    expand: false,
  }),
  methods: { },
  computed: {
    ...mapGetters('UPS', ['ups']),
    used() {
      return Math.round(parseInt(this.ups.nompower) * (this.usage / 100))
    },
    usage() {
      return parseInt(this.ups.loadpct)
    },
    charge() {
      return parseInt(this.ups.bcharge)
    },
    records() {
      if (!this.total || !this.used) return []

      return [
        { used: null, total: null }
      ]
    }
  }
}
</script>
