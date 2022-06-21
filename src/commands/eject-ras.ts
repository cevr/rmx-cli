// @ts-expect-error
import PackageJson from '@npmcli/package-json'
import * as fs from 'fs'
import fetch from 'node-fetch'
import * as path from 'path'

import { RmxCommand } from '../types/command'

let command: RmxCommand = {
  name: 'eject-ras',
  description: 'Eject your Remix project from Remix App Server to Express',
  handler,
}

export default command

async function handler() {
  console.log('🚀 Ejecting from Remix App Server...')

  // download package.json from express template
  await download(
    'https://raw.githubusercontent.com/remix-run/remix/main/templates/express/package.json',
    './__eject-ras__/package.json',
  )
  const pkgJsonExpress = await PackageJson.load(
    path.resolve(process.cwd(), './__eject-ras__'),
  )

  // backup original package.json
  const ts = new Date().toISOString().substring(0, 19).replace(/[-T:]/g, '')
  fs.copyFileSync(
    path.resolve(process.cwd(), './package.json'),
    path.resolve(process.cwd(), `./package-${ts}.json`),
  )
  // get package.json
  const pkgJson = await PackageJson.load(process.cwd())

  // update dependencies
  const remixVersion = pkgJson.content.dependencies['@remix-run/node']

  // install missing dependencies
  const dependencies = getDependencies(pkgJson.content.dependencies)
  dependencies.uninstall('@remix-run/serve')
  for (const [name, version] of Object.entries(
    pkgJsonExpress.content.dependencies,
  )) {
    if (!dependencies.content[name]) {
      dependencies.install(name, version === '*' ? remixVersion : version)
    }
  }

  // install missing devDependencies
  const devDependencies = getDependencies(pkgJson.content.devDependencies)
  for (const [name, version] of Object.entries(
    pkgJsonExpress.content.devDependencies,
  )) {
    if (!devDependencies.content[name]) {
      devDependencies.install(name, version === '*' ? remixVersion : version)
    }
  }

  // update scripts
  const scripts = { ...pkgJson.content.scripts }
  for (const [name, command] of Object.entries(
    pkgJsonExpress.content.scripts,
  )) {
    if (name.startsWith('dev') || name.startsWith('start')) {
      console.log(`📝 updating script ${name}`)
      scripts[name] = command
    }
  }

  // save package.json
  pkgJson.update({
    dependencies: dependencies.content,
    devDependencies: devDependencies.content,
    scripts,
  })

  await pkgJson.save()

  // download express server startup file
  console.log('📦 downloading express server startup file')
  await download(
    'https://raw.githubusercontent.com/remix-run/remix/main/templates/express/server.js',
    './server.js',
  )
  // cleanup files
  fs.unlinkSync(path.resolve(process.cwd(), './__eject-ras__/package.json'))
  fs.rmdirSync(path.resolve(process.cwd(), './__eject-ras__'))

  console.log('🏁 Ejecting from Remix App Server... Done!\n')
  console.log('🔨 run npm install to update your dependencies')
}

function getDependencies(dependencies: Record<string, string>) {
  const newDependencies = { ...dependencies }
  return {
    uninstall(name: string) {
      console.log(`🔥 uninstalling ${name}`)
      delete newDependencies[name]
    },
    install(name: string, version: string) {
      console.log(`📦 installing ${name}@${version}`)
      newDependencies[name] = version
    },
    content: newDependencies,
  }
}

async function download(url: string, filepath: string) {
  const response = await fetch(url)
  const file = await response.text()
  const filedir = path.dirname(path.resolve(process.cwd(), filepath))
  if (!fs.existsSync(filedir)) {
    fs.mkdirSync(filedir, { recursive: true })
  }
  fs.writeFileSync(filepath, file)
}
