<template>
  <Panel 
    :title='title' 
      
    :progress-color='processors.cpu.host | thresholdColor'
    :progress-value='processors.cpu.host'
  >
    <template v-slot:additional>
      <VToolbarTitle>{{ processors.cpu.host }}%</VToolbarTitle>
    </template>
    <VCardText>
      <VRow no-gutters>
        <VCol cols='6' v-for='(core, index) in cores' :key='index' class='pa-1'>
          <VProgressLinear rounded height='20' :color='core.host | thresholdColor' :value='core.host'>
            <template v-slot:default>
              <span :class="core.host | thresholdText">{{ core.host }}%</span>
            </template>
          </VProgressLinear>

        </VCol>

      </VRow>
    </VCardText>
  </Panel>
</template>

<script>
import Panel from '@/components/panel.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'ProcessorsPanel',
  components: { Panel },
  props: {
    disks: {
      type: Array,
      default: () => ([ ])
    },
    title: {
      type: String,
      default: 'Processor'
    },
  },
  data: () => ({
    expand: false,
  }),
  mounted() {

  },
  methods: { },
  computed: {
    ...mapGetters('PROCESSORS', ['processors']),
    cores() {
      const { cpu, ...cpus } = this.processors
      return cpus
    },
  }
}
</script>
