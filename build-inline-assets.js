/* eslint-disable no-console */
'use strict'

const fs = require('fs')
const path = require('path')

const root = __dirname
const assetsDir = path.join(root, 'assets')
const files = fs.readdirSync(assetsDir).filter(name => name.endsWith('.webp')).sort()
const groups = [files.slice(0, Math.ceil(files.length / 2)), files.slice(Math.ceil(files.length / 2))]
const outputs = ['assets-inline-a.js', 'assets-inline-b.js']

groups.forEach((group, groupIndex) => {
  const entries = group.map(name => {
    const data = fs.readFileSync(path.join(assetsDir, name)).toString('base64')
    return `  ${JSON.stringify(`assets/${name}`)}: ${JSON.stringify(`data:image/webp;base64,${data}`)}`
  })
  const opener = groupIndex === 0 ? 'window.RELATIONSHIP_STUDIO_ASSETS = {' : 'Object.assign(window.RELATIONSHIP_STUDIO_ASSETS, {'
  const closer = groupIndex === 0 ? '}' : '})'
  const source = `/* 자동 생성 파일: build-inline-assets.js로 다시 만드세요. */\n${opener}\n${entries.join(',\n')}\n${closer}\n`
  fs.writeFileSync(path.join(root, outputs[groupIndex]), source, 'utf8')
  console.log(`${outputs[groupIndex]}: ${group.length}개, ${(Buffer.byteLength(source) / 1024 / 1024).toFixed(2)}MB`)
})

const oldOutput = path.join(root, 'assets-inline.js')
if (fs.existsSync(oldOutput)) fs.unlinkSync(oldOutput)

