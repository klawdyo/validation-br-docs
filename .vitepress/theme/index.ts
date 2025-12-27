import { h } from 'vue'
import Theme from 'vitepress/theme'
import VersionSelector from '../components/VersionSelector.vue'
import './custom.css'
import 'uno.css' // Importação vital para as classes funcionarem
import VersionBadge from '../components/VersionBadge.vue'

export default {
  extends: Theme,
  Layout() {
    return h(Theme.Layout, null, {
      // 'nav-bar-content-after': () => h(VersionSelector),
      'nav-bar-title-after': () => h(VersionBadge),
    })
  }
}
