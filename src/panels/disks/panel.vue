<template>
  <Panel 
    :title='title' 
      
    :progress-color='usedPercentage | thresholdColor'
    :progress-value='usedPercentage'
  >
    <template v-slot:additional>
      <VToolbarTitle>{{ usedPercentage }}%</VToolbarTitle>
    </template>
    <VDataTable
      dense
      :headers="headers"
      :items='disks'
      :items-per-page="-1"
      hide-default-footer
      disable-pagination
      disable-sort
      mobile-breakpoint='0'
    >
      <template v-slot:item.name="{ item }">
        <VTooltip right top>
          <template v-slot:activator="{ on, attrs }">
            <VAvatar v-bind='attrs' v-on='on' :color="item.spundown ? 'grey' : 'green' " size='10' class='mr-1' style="margin-bottom:2px!important;"/>
          </template>
          {{ item.spundown ? 'Drive is in standby' :'Drive is active' }}
        </VTooltip>
        {{ item.name }}
      </template>
      <template v-slot:item.temp="{ item }">
        <template v-if='!item.spundown'>
          {{ item.temp }}°C
        </template>
        
      </template>
      <template v-slot:item.size="{ item }">
        {{ item.size | fileSize }}
      </template>       
      <template v-slot:item.fsFree="{ item }">
        <template v-if="item.fsStatus == 'Mounted'">
          <VProgressLinear rounded height='20' :color='driveUsed(item) | thresholdColor' :value='driveUsed(item)'>
            <template v-slot:default>
              <span class='pl-1 left white--text' >
                {{ item.size - item.fsFree | fileSize(1) }} 
              </span>
              <VSpacer />
              <span class='right pr-1 white--text' >
                {{ item.size | fileSize(1) }}
              </span>

            </template>
          </VProgressLinear>
        </template>
      </template>                  
    </VDataTable>

  </Panel>
</template>

<script>
import Panel from '@/components/panel.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'DisksPanel',
  components: { Panel },
  props: {
    disks: {
      type: Array,
      default: () => ([ ])
    },
    title: {
      type: String,
      default: 'disks'
    },
  },
  data: () => ({
    expand: false,
    headers: [ 
      { text: 'Drive', value: 'name', width: '25%' },
      { text: '', value: 'fsFree', align:'right' },
      { text: 'Temp', value: 'temp', width: '10%' },
    ]
  }),
  methods: {
    driveUsed(drive) {
      return parseInt(((drive.size - drive.fsFree) / drive.size) * 100)
    },
  },
  computed: {
    displayed() {
      if (this.showExpanded) {
        return this.formatBytes(this.used)
      } else {
        return `${this.usedPercentage}%`
      }
    },
    mountedDrives() {
      return this.disks.filter(disk => {
        return disk.fsStatus == 'Mounted'
      })
    },
    used() {
      return this.mountedDrives.map(d => d.size - d.fsFree).reduce((p, c) => p + c, 0)
    },
    total() {
      return this.mountedDrives.map(d => d.size).reduce((p, c) => p + c, 0)
    },
    usedPercentage() {
      if (this.total == 0) return '0'
      return parseInt((this.used / this.total) * 100)
    },
    count() {
      return this.disks.length || 0
    }
  }
}
</script>
