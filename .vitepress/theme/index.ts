import { h, computed, watchEffect, nextTick } from 'vue'
import Theme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import VersionSelector from '../components/VersionSelector.vue'
import VersionBadge from '../components/VersionBadge.vue'
import VersionRedirect from '../components/VersionRedirect.vue'
import DocPlayground from '../../src/components/playground/DocPlayground.vue'
import './custom.css'
import './v2.css'
import 'uno.css' // Importação vital para as classes funcionarem

export default {
  extends: Theme,
  Layout() {
    const route = useRoute()
    const isV2 = computed(() => !route.path.match(/^\/v1(\/|$)/))

    if (typeof window !== 'undefined') {
      watchEffect(() => {
        const path = route.path
        if (!path.startsWith('/v1') && !path.startsWith('/v2') && path !== '/' && path !== '/index.html') {
          const target = `/v2${path.replace(/\/$/, '')}`
          nextTick(() => {
            const items = document.querySelectorAll('.VPSidebarItem')
            items.forEach((item) => {
              const link = item.querySelector<HTMLAnchorElement>('a.link')
              if (link && link.getAttribute('href') === target) {
                item.classList.add('is-active')
              }
            })
          })
        }
      })
    }

    return h(
      'div',
      { class: { 'theme-v2': isV2.value } },
      [
        h(Theme.Layout, null, {
          // 'nav-bar-content-after': () => h(VersionSelector),
          'nav-bar-title-after': () => h(VersionBadge),
          'not-found': () => h(VersionRedirect),
        }),
      ]
    )
  },
  enhanceApp({ app }) {
    app.component('DocPlayground', DocPlayground)
  },
}
