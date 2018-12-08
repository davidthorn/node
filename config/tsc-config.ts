import { spawn, execSync } from 'child_process'
import * as fs from 'fs-extra'
import * as path  from 'path'
import * as stripJsonComments from 'strip-json-comments'

let tsConfigPath = path.join(process.cwd() , '/tsconfig.json')
let packagePath = path.join(process.cwd() , '/package.json')
let readmePath = path.join(process.cwd() , '/README.md')
let licensePath = path.join(process.cwd() , '/LICENSE')

let tsContentContents = stripJsonComments(fs.readFileSync(tsConfigPath , { encoding:'utf8' }), { whitespace: true })
let tsconfigJSON = JSON.parse(tsContentContents)
let packageContentContents = stripJsonComments(fs.readFileSync(packagePath , { encoding:'utf8' }), { whitespace: true })
let packageJSON = JSON.parse(packageContentContents)
let licenseContents = fs.readFileSync(path.join(__dirname , '/LICENSE') , { encoding:'utf8' })

tsconfigJSON.include = [ "src/**/*.ts"  ]
tsconfigJSON.lib = [ "es2017" , "dom" ]
tsconfigJSON.compilerOptions.resolveJsonModule = true 

fs.writeFileSync(tsConfigPath, JSON.stringify(tsconfigJSON, null, 4) , { encoding: 'utf8' })

packageJSON.scripts.test = "mocha -r ts-node/register tests/**/*.ts"
packageJSON.main = "src/main.ts"
const username = execSync("git config --global user.name",  { encoding:'utf8' }).trim().replace('\n' , "")
const email = execSync("git config --global user.email", { encoding:'utf8' }).trim().replace('\n' , "")
packageJSON.author = `${username} <${email}>`

fs.writeFileSync(packagePath, JSON.stringify(packageJSON, null, 4) , { encoding: 'utf8' })

fs.writeFileSync(readmePath, `# ${packageJSON.name}\n\n${packageJSON.description}\n\nAuthor ${packageJSON.author}\n\nCreated ${new Date().toString()}` , { encoding: 'utf8' })
fs.writeFileSync(licensePath, licenseContents , { encoding: 'utf8' })

console.log(tsconfigJSON)


