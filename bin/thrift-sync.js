#!/usr/bin/env node

const program = require('commander')
const minimist = require('minimist')
const chalk = require('chalk')
const didYouMean = require('didyoumean')

didYouMean.threshold = 0.6

program
  .version(require('../package').version)
  .usage('<command> [options]')

program
    .command('sync <git-url>')
    .description('sync thrift file from git url')
    .option('-p, --path <targetPath>', 'target path for generated js file')
    .action((gitUrl, cmd) => {
      const options = cleanArgs(cmd)
      require('../lib/sync')(gitUrl, options)
    })

// output help information on unknown commands
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    suggestCommands(cmd)
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function suggestCommands (cmd) {
  const availableCommands = program.commands.map(cmd => {
    return cmd._name
  })

  const suggestion = didYouMean(cmd, availableCommands)
  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
  }
}

function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.'))
    }
  })
  return args
}
