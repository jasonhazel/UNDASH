<template>
  <VRow no-gutters>
    <VCol cols='12' sm='12' md='4' lg='3' xl='3'>
      <ParityPanel />
      
      <DisksPanel :disks="disks.data" title='Data' />
      <DisksPanel :disks='disks.cache' title='Cache' />

      <ProcessorsPanel />
      <MemoryPanel />
      <UpsPanel />
    </VCol>

    <VCol cols='12' sm='12' md='8' lg='9' xl='9'>
      <DockerPanel />
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
    ...mapGetters([ 'vms', 'dark' ])
  }
}
</script>