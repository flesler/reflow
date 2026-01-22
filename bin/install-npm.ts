/* dev dependencies */
import { execSync } from 'child_process'

function main() {
  const args = process.argv.slice(2)
  const isDev = args[0] === '--dev'
  const packages = isDev ? args.slice(1) : args

  if (!packages.length) {
    console.error('Usage: npm run ts -- bin/install-npm.ts [--dev] <package1> [package2] ...')
    process.exit(1)
  }

  const deps: string[] = []
  const devDeps: string[] = []

  for (const pkg of packages) {
    try {
      // Get latest version
      const version = execSync(`npm view ${pkg} version`, { encoding: 'utf8' }).trim()
      const fullPkg = `${pkg}@^${version}`
      if (isDev) {
        devDeps.push(fullPkg)
      } else {
        deps.push(fullPkg)
      }

      // Try to find @types/* package
      // For scoped packages like @faker-js/faker, use @types/faker-js__faker
      // For unscoped packages like lodash, use @types/lodash
      const typesPkg = pkg.startsWith('@')
        ? `@types/${pkg.slice(1).replace('/', '__')}`
        : `@types/${pkg}`
      try {
        execSync(`npm view ${typesPkg} version`, { encoding: 'utf8', stdio: 'ignore' })
        const typesVersion = execSync(`npm view ${typesPkg} version`, { encoding: 'utf8' }).trim()
        devDeps.push(`${typesPkg}@^${typesVersion}`)
        console.log(`Found types: ${typesPkg}@^${typesVersion}`)
      } catch {
        // No @types package exists, skip
      }
    } catch (err) {
      console.error(`Failed to get version for ${pkg}:`, err)
      process.exit(1)
    }
  }

  if (deps.length) {
    console.log('Installing dependencies:', deps.join(' '))
    execSync(`npm install ${deps.join(' ')}`, { stdio: 'inherit' })
  }

  if (devDeps.length) {
    console.log('Installing dev dependencies:', devDeps.join(' '))
    execSync(`npm install --save-dev ${devDeps.join(' ')}`, { stdio: 'inherit' })
  }
}

main()
