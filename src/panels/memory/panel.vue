<template>
  <Panel 
    title='Memory' 
    :opened.sync='expand' 
    :progress-color='usage | thresholdColor'
    :progress-value='usage'
  >
    <template v-slot:additional>
      <VToolbarTitle>{{ usage }}%</VToolbarTitle>
    </template>
    <VDataTable
      dense
      :headers="headers"
      :items='records'
      :items-per-page="-1"
      hide-default-footer
      disable-pagination
      disable-sort
      mobile-breakpoint='0'
      
    >      
      <template v-slot:item.used>
        <VProgressLinear rounded height='20' :color='usage | thresholdColor' :value='usage'>
          <template v-slot:default>
            <span :class="usage | thresholdText">{{ used | fileSize(0, 1000) }}</span>
          </template>
        </VProgressLinear>
      </template>  
      <template v-slot:item.total>
        {{ total | fileSize(0, 1000) }}
      </template>        
    </VDataTable>

  </Panel>
</template>

<script>
import Panel from '@/components/panel.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'MemoryPanel',
  components: { Panel },
  props: {
  },
  data: () => ({
    expand: false,
    headers: [
      { text: 'Usage', value: 'used', width: '80%' },
      { text: 'Total', value: 'total', width: '20%' },
    ]
  }),
  methods: { },
  computed: {
    ...mapGetters('MEMORY', ['memory']),
    used() {
      return this.memory.total - this.memory.available
    },
    usage() {
      return Math.round((1 - this.memory.available / this.memory.total) * 100) || 0
    },
    total() {
      return this.memory.total
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
