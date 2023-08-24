import argv from 'minimist'

const environment = argv(process.argv.slice(2))
export const isProduction = Boolean(environment.prod)
