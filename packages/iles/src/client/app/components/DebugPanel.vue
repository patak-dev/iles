<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { usePage } from '../composables/pageData'

export default defineComponent({
  name: 'DebugPanel',
  setup () {
    const { page, meta, frontmatter, props } = usePage()
    const message = ref<string | undefined>(undefined)
    const el = ref<HTMLElement | null>(null)
    const content = ref<HTMLElement | null>(null)
    const open = ref(false)
    const buttonLabel = computed(() => message.value || 'Debug')

    const cleanPage = computed(() => {
      const layout = page.value.layoutName || 'false'
      return { layout, frontmatter, meta, props }
    })

    let timeoutId: any
    function copyIfSelected () {
      if (!getSelection()?.toString()) return
      document.execCommand('copy')
      message.value = 'Copied!'
      timeoutId = setTimeout(() => { message.value = undefined }, 3000)
    }

    function copyAll (el: HTMLElement | null) {
      const selection = getSelection()
      if (!selection || !el) return
      const range = document.createRange()
      range.selectNode(el)
      selection.removeAllRanges()
      selection.addRange(range)
      copyIfSelected()
    }

    watch(open, (open) => {
      if (open && message.value) {
        clearTimeout(timeoutId)
        message.value = undefined
      }
      if (!open && el.value) el.value.scrollTop = 0
    })

    return {
      el,
      open,
      copyIfSelected,
      buttonLabel,
      cleanPage,
      copyAll,
      content,
    }
  },
})
</script>

<template>
  <div ref="el" class="debug" :class="{ open }" @click="open = !open" @mouseup="copyIfSelected">
    <p class="title">{{ buttonLabel }}<span class="info">Open DevTools to inspect <b>islands</b> 🏝</span></p>
    <pre ref="content" class="block">{{ cleanPage }}</pre>
    <button v-show="open" class="debug title" @click="copyAll(content)">Copy to Clipboard</button>
  </div>
</template>

<style scoped>
.debug {
  --debug-rgba: 0, 0, 0;
  --debug-opacity: 0.75;
  --debug-bg: rgba(var(--debug-rgba), var(--debug-opacity));
  --debug-color: #EEE;

  box-sizing: border-box;
  position: fixed;
  right: 8px;
  bottom: 8px;
  z-index: 9999;
  border-radius: 4px;
  width: 74px;
  height: 32px;
  color: var(--debug-color);
  overflow: hidden;
  cursor: pointer;
  background-color: var(--debug-bg);
  transition: all 0.15s ease;
}

.info {
  display: none
}

.debug:not(.open):hover {
  --debug-opacity: 0.7;
}

.debug.open:hover {
  --debug-opacity: 1;
}

.debug.open {
  --debug-rgba: 40, 40, 40;

  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin-top: 0;
  border-radius: 0;
  padding: 0 0;
  overflow: auto;
}

.debug.open .info {
  display: inline;
  float:  right;
}

@media (prefers-color-scheme: light) {
  .debug.open {
    --debug-rgba: 255, 255, 255;
    --debug-color: #444;
    border-left: 1px solid #DDD;
  }
}

@media (min-width: 512px) {
  .debug.open {
    width: 512px;
  }
}

.title {
  margin: 0;
  padding: 6px 16px;
  line-height: 20px;
  font-size: 13px;
}

.debug:not(.open) .title {
  padding: 6px 0;
  text-align: center;
}

.debug.title {
  width: max-content;
}

.block {
  margin: 2px 0 0;
  border-top: 1px solid #DDD;
  padding: 8px 16px;
  font-family: Hack, monospace;
  font-size: 13px;
}

.block + .block {
  margin-top: 8px;
}
</style>
