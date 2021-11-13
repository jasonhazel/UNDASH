<template>
  <VRow no-gutters>
    <VCol cols='12' sm='12' md='4' lg='3' xl='3'>
      <ParityPanel key='parityPanel' v-if="disks.parity.length > 0" />
      
      <DisksPanel key='dataPanel' :disks="disks.data" title='Data' />
      <DisksPanel key='cachePanel' :disks='disks.cache' title='Cache' />

      <ProcessorsPanel key='processorPanel' />
      <MemoryPanel key='memoryPanel' />
      <UpsPanel key='upsPanel' v-if="ups.nompower" />
    </VCol>

    <VCol cols='12' sm='12' md='8' lg='9' xl='9'>
      <DockerPanel key='dockerPanel' />
    </VCol>       
  </VRow>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
  },
  data: () => ({
    expand: { vms: false }, // probably be moved to own panel component
  }),

  computed: {
    ...mapGetters('DISKS', ['disks']),
    ...mapGetters('UPS', ['ups']),
    ...mapGetters([ 'vms', 'dark' ])
  }
}
</script>