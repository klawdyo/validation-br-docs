import { h } from 'vue'
import Theme from 'vitepress/theme'
import VersionSelector from '../components/VersionSelector.vue'
import './custom.css'

export default {
  extends: Theme,
  // Layout() {
  //   return h(Theme.Layout, null, {
  //     'nav-bar-content-after': () => h(VersionSelector)
  //   })
  // }
}
