/* eslint-disable no-console */
'use strict'

const fs = require('fs')
const path = require('path')

const root = __dirname
const assetsDir = path.join(root, 'assets')
const output = path.join(root, 'assets-inline.js')
const files = fs.readdirSync(assetsDir).filter(name => name.endsWith('.webp')).sort()
const entries = files.map(name => {
  const data = fs.readFileSync(path.join(assetsDir, name)).toString('base64')
  return `  ${JSON.stringify(`assets/${name}`)}: ${JSON.stringify(`data:image/webp;base64,${data}`)}`
})

const source = `/* 자동 생성 파일: build-inline-assets.js로 다시 만드세요. */\nwindow.RELATIONSHIP_STUDIO_ASSETS = {\n${entries.join(',\n')}\n}\n`
fs.writeFileSync(output, source, 'utf8')
console.log(`내장 이미지 ${files.length}개 생성: ${(Buffer.byteLength(source) / 1024 / 1024).toFixed(2)}MB`)

