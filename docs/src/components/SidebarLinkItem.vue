<script setup lang="ts">
import appConfig from '@islands/app-config'

import type { PropType } from 'vue'
import { joinUrl, isActive } from '~/logic/utils'
import type { SideBarItem } from '~/logic/config'

const props = defineProps({
  item: {
    type: Object as PropType<Partial<SideBarItem>>,
    required: true,
  },
  header: {
    type: Boolean,
    default: false,
  },
  table: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()

let active = $computed(() => isActive(route.path, props.item.link))
let link = $computed(() => props.item.link && joinUrl(appConfig.base, props.item.link))

let style = $computed(() => ([
  'transition duration-100 inline-flex',
  props.header
    ? 'font-bold py-2'
    : props.table
      ? `items-center
      justify-between py-2 px-3 w-full rounded-md
      text-sm text-gray-700
      dark:text-gray-400
      hover:(text-primary dark:text-primary bg-$bg-highlight)`
      : `relative
      items-center
      justify-between
      pl-3 py-2
      border-l border-gray-100
      dark:border-dark-400
      text-gray-700
      dark:text-gray-400
      hover:(text-primary dark:text-primary)`,
  {
    '!border-primary dark:border-primary !text-primary dark:text-primary': active,
  },
]))

</script>

<template>
  <a v-if="link" :href="link" :class="style">
    {{ item.text }}
  </a>
  <h5 v-else :class="style">
    {{ item.text }}
  </h5>
</template>
