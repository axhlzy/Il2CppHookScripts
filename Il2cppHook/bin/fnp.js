#!/usr/bin/env node

const { spawn  } = require('child_process');
const path = require('path');

const packageName = process.argv[2];

const ufuncPath = path.join(path.dirname(__dirname), '_Ufunc.js');

const command = packageName
  ? `frida -U -f ${packageName} -l ${ufuncPath}`
  : `frida -FU -l ${ufuncPath}`;

const fridaProcess = spawn(command, { shell: true, stdio: 'inherit' });

fridaProcess.on('error', (error) => {
    console.error(`执行错误: ${error}`);
});
  
fridaProcess.on('close', (code) => {
    // console.log(`子进程退出，退出码 ${code}`);
});