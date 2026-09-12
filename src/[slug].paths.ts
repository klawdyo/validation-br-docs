import fs from 'node:fs'
import path from 'node:path'

export default {
  watch: ['./v2/**/*.md'],
  paths() {
    const v2Dir = path.resolve(__dirname, 'v2')
    const files = fs.readdirSync(v2Dir, { recursive: true }) as string[]

    return files
      .map((file) => file.replace(/\\/g, '/'))
      .filter((file) => file.endsWith('.md') && file !== 'index.md' && !file.includes('/.vitepress') && !file.startsWith('.vitepress'))
      .map((file) => {
        const slug = file.replace(/\.md$/, '')
        const filePath = path.join(v2Dir, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        return {
          params: { slug },
          content,
        }
      })
  },
}
