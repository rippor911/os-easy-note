import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const distDir = path.resolve(projectRoot, 'dist')

if (path.dirname(distDir) !== projectRoot || path.basename(distDir) !== 'dist') {
  throw new Error(`Refusing to remove unexpected output directory: ${distDir}`)
}

fs.rmSync(distDir, { recursive: true, force: true })
