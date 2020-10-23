const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
const contractsPath = path.resolve(__dirname, 'contracts');

fs.removeSync(buildPath);

const fileNames = fs.readdirSync(contractsPath);

const input = fileNames.reduce(
  (input, fileName) => {
    const filePath = path.resolve(__dirname, 'contracts', fileName);
    const source = fs.readFileSync(filePath, 'utf8');
    return { sources: { ...input.sources, [fileName]: source } };
  },
  { sources: {} }
);
source = input.sources;
const output = solc.compile(input, 1).contracts;
// console.log(output);
fs.ensureDirSync(buildPath);
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
