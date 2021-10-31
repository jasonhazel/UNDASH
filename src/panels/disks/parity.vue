<template>
  <div>
    <Panel v-if="count > 0"
      title='Parity' 
      :opened.sync='expand' 
      progress-color='color'
      progress-value='100'
    >
      <template v-slot:additional>
        <template v-if='status == "valid"'>
          <VIcon :color='color'>mdi-check-circle</VIcon>
        </template>
        <template v-else>
          <VChip label small text-color='white' :color='color' class='text-uppercase'>
            {{ status }}
          </VChip>
        </template>
      </template>
      <VDataTable
        dense
        :headers="headers"
        :items='parity'
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
                <span :class="driveUsed(item) | thresholdText">{{ item.size - item.fsFree | fileSize }}</span>
              </template>
            </VProgressLinear>
          </template>
        </template>                  
      </VDataTable>

    </Panel>
  </div>
</template>

<script>
import Panel from '@/components/panel.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'DisksPanel',
  components: { Panel },
  data: () => ({
    expand: false,
    headers: [
      { text: 'Drive', value: 'name', width: '70%' },
      { text: '', value: 'size', width: '20%', align: 'right' },
      { text: 'Temp', value: 'temp', width: '10%' },
    ]
  }),
  computed: {
    ...mapGetters('DISKS', ['parity']),
    ...mapGetters('VARS', ['vars']),
    disabled() {
      return this.parity.filter(disk => disk.status == 'DISK_NP')
    },
    count() {
      return this.parity.length
    },
    invalid() {
      return this.parity.filter(disk => disk.status == 'DISK_INVALID')
    },
    resync() {
      return this.vars.mdresync != 0
    },
    missing() {
      return !this.resync && this.count == this.disabled
    },
    degraded() {
      return !this.resync && this.count > this.invalid && this.invalid > 0
    },
    valid() {
      return !this.resync && !this.degraded
    },
    rebuild() {
      return this.resync && this.vars.mdresyncaction.includes('recon')
    },
    clearing() {
      return this.resync && this.vars.mdresyncaction.includes('clear')
    },
    readCheck() {
      return this.resync && this.vars.mdresyncaction == 'check'
    },
    parityCheck() {
      return this.resync && this.vars.mdresyncaction.includes('check')
    },
    status() {
      let status = 'unknown'

      if (this.missing)
        return 'missing'

      if (this.degraded)
        return 'degraded'

      if (this.valid)
        return 'valid'

      if (!this.resync && this.vars.mdinvaliddisk)
        return 'data invalid'
      
      if (!this.resync)
        return 'parity invalid'

      if (this.rebuild)
        return 'rebuilding'

      if (this.clearing)
        return 'clearing'

      if (this.readCheck)
        return 'read check'

      if (this.parityCheck)
        return 'parity check'

      return status
    },
    color() {
      switch(this.status) {
        case 'unknown':
        case 'missing':
        case 'data invalid':
        case 'parity invalid':
          return 'red lighten-2'
        
        case 'degraded':
        case 'rebuilding':
        case 'clearing':
        case 'read check':
        case 'parity check':
          return 'orange lighten-2'
        default:
          return 'green lighten-2'
      }
    }
  }
}
</script>
