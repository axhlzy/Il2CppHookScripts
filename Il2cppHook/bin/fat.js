#!/usr/bin/env node

const {
  spawn, execSync
} = require('child_process');
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2), {
  alias: {
      h: 'help',
      r: 'runtime',
      t: 'timeout',
      f: 'function',
      l: 'log',
  },
  default: {
      runtime: 'v8',
  },
});

if (args.help) {

  showLOGO()

  console.log('\nUsage: fat [options] <package-name?>\n');
  console.log('Options:');
  console.log('  -h, --help                  Print usage information.');
  console.log('  -r, --runtime [engine]      Specify the JS engine (qjs, v8). Default: v8');
  console.log('  -t, --timeout [ms]          Specify the time in milliseconds before calling the function.');
  console.log('  -f, --functions [name]      Specify the function to call on startup. example: -f i();getApkInfo();');
  console.log('  -l, --log [path]            Specify the path to save the log.');
  console.log('  -c, --vscode                Open project with vscode.');
  console.log('  -v, --version               Print version information.');
  console.log('');
  console.log(`Report bugs to: \n   ${require('../package.json').author}\n`)
  process.exit(0);
}

const packageName = args._[0];
const functionName = args.function || args._[1];
const runtime = args.runtime === 'qjs' ? 'qjs' : 'v8';
const timeout = args.timeout ? Number(args.timeout) : 0;
const logPath = args.log;

if (args.hasOwnProperty('v')) {
  console.log(`v${require('../package.json').version}`);
  process.exit(0);
}

if (args.hasOwnProperty('c')) {
  try {
    execSync(`code ${path.join(__dirname, '../')}`);
  } catch (error) {
    console.error(`exec error: ${error}`);
  }
  process.exit(0);
}

const ufuncPath = path.join(path.dirname(__dirname), '_Ufunc.js');

let command;
if (packageName) {
  command = `frida -U -f ${packageName} -l ${ufuncPath} --runtime=${runtime}`;
} else {
  command = `frida -FU -l ${ufuncPath} --runtime=${runtime}`;
}

if (functionName) {
  if (timeout == 0) {
      command += ` -e "Il2Cpp.perform(()=>{${functionName}})"`
  } else {
      const timeoutSnippet = timeout ? `setTimeout(() => {` : '';
      const timeoutSnippetEnd = timeout ? `}, ${timeout});` : '';
      command += ` -e "${timeoutSnippet}${functionName}${timeoutSnippetEnd}"`;
  }
}

if (logPath) command += ` -o ${logPath}`;

const fridaProcess = spawn(command, {
  shell: true,
  stdio: 'inherit'
});

fridaProcess.on('error', (error) => {
  console.error(`run error: ${error}`);
});

fridaProcess.on('close', (code) => {
  // console.log(`child_process exit: ${code}`);
});

function showLOGO() {
  var asciiArt = `
_ _  ______                        _                 _                 
| | |(_____ \\                      | |               | |                
| | |  ____) )____ ____  ____ _____| |__   ___   ___ | |  _ _____  ____ 
| | | / ____// ___)  _ \\|  _ (_____)  _ \\ / _ \\ / _ \\| |_/ ) ___ |/ ___)
| | || (____( (___| |_| | |_| |    | | | | |_| | |_| |  _ (| ____| |    
|_|_|\\______)____)  __/|  __/     |_| |_|\\___/ \\___/|_| \\_)_____)_|    
                |_|   |_|                                             
`;

  {
      // var asciiArt = `
      // oo dP d8888b.                                     dP                         dP                         
      //    88     \`88                                     88                         88                         
      // dP 88 .aaadP' .d8888b. 88d888b. 88d888b.          88d888b. .d8888b. .d8888b. 88  .dP  .d8888b. 88d888b. 
      // 88 88 88'     88'  \`"" 88'  \`88 88'  \`88 88888888 88'  \`88 88'  \`88 88'  \`88 88888"   88ooood8 88'  \`88 
      // 88 88 88.     88.  ... 88.  .88 88.  .88          88    88 88.  .88 88.  .88 88  \`8b. 88.  ... 88       
      // dP dP Y88888P \`88888P' 88Y888P' 88Y888P'          dP    dP \`88888P' \`88888P' dP   \`YP \`88888P' dP       
      //                        88       88                                                                      
      //                        dP       dP                                                                      
      // `;

      // var asciiArt = `
      // _      __                                _                    _                  
      // _ (_ )  /'__\`\\                             ( )                  ( )                 
      // (_) | | (_)  ) )   ___  _ _    _ _   ______ | |__     _      _   | |/')    __   _ __ 
      // | | | |    /' /  /'___)( '_\`\\ ( '_\`\\(______)|  _ \`\\ /'_\`\\  /'_\`\\ | , <   /'__\`\\( '__)
      // | | | |  /' /( )( (___ | (_) )| (_) )       | | | |( (_) )( (_) )| |\\\`\\ (  ___/| |   
      // (_)(___)(_____/'\`\\____)| ,__/| ,__/        (_) (_)\\___/'\\___/'(_) (_)\\\`\\____)(_)   
      //                    | |    | |                                                    
      //                    (_)    (_)                                                    
      // `;

      // var asciiArt = `

      // _ _  ______                        _                 _                 
      // (_) |(_____ \                      | |               | |                
      //  _| |  ____) )____ ____  ____ _____| |__   ___   ___ | |  _ _____  ____ 
      // | | | / ____// ___)  _ \|  _ (_____)  _ \ / _ \ / _ \| |_/ ) ___ |/ ___)
      // | | || (____( (___| |_| | |_| |    | | | | |_| | |_| |  _ (| ____| |    
      // |_|\_)_______)____)  __/|  __/     |_| |_|\___/ \___/|_| \_)_____)_|    
      //                   |_|   |_|                                             

      // `;
  }

  {
      // var colors = [
      //   '\x1b[38;5;220m', // 淡灰色
      //   '\x1b[38;5;178m', // 橙黄色
      //   '\x1b[38;5;154m', // 粉红色
      //   '\x1b[38;5;117m', // 绿色
      //   '\x1b[38;5;81m',  // 青色
      //   '\x1b[38;5;39m',  // 蓝绿色
      //   '\x1b[38;5;27m',  // 深蓝色
      //   '\x1b[38;5;21m',  // 紫色
      // ];

      // asciiArt.split('\n').forEach((line, i) => {
      //   let output = '';
      //   for (let j = 0; j < line.length; j++) {
      //     output += `${colors[(i + j) % colors.length]}${line[j]}`;
      //   }
      //   console.log(output);
      // });

      // var colors = [
      //   '\x1b[38;5;198m', // 红色
      //   '\x1b[38;5;208m', // 橙色
      //   '\x1b[38;5;226m', // 淡黄色
      //   '\x1b[38;5;118m', // 绿色
      //   '\x1b[38;5;75m',  // 深绿色
      //   '\x1b[38;5;39m',  // 青色
      //   '\x1b[38;5;33m',  // 蓝绿色
      //   '\x1b[38;5;27m',  // 深蓝色
      //   '\x1b[38;5;198m', // 红色
      // ];

      // asciiArt.split('\n').forEach((line, i) => {
      //   let output = '';
      //   for (let j = 0; j < line.length; j++) {
      //     output += `${colors[(i + j) % colors.length]}${line[j]}`;
      //   }
      //   console.log(output);
      // });

      // var colors = [
      //   '\x1b[38;2;255;166;158m', // 淡红色
      //   '\x1b[38;2;255;187;89m',  // 橙色
      //   '\x1b[38;2;255;231;100m', // 暗黄色
      //   '\x1b[38;2;255;250;139m', // 淡黄色
      // ];

      // asciiArt.split('\n').forEach((line, i) => {
      //   let output = '';
      //   for (let j = 0; j < line.length; j++) {
      //     output += `${colors[(i + j) % colors.length]}${line[j]}`;
      //   }
      //   console.log(output);
      // });

      // var colors = [
      //   '\x1b[38;5;214m', // 橙色
      //   '\x1b[38;5;190m', // 浅红色
      //   '\x1b[38;5;172m', // 红色
      //   '\x1b[38;5;160m', // 橙红色
      //   '\x1b[38;5;118m', // 绿色
      //   '\x1b[38;5;82m',  // 青绿色
      //   '\x1b[38;5;45m',  // 青色
      //   '\x1b[38;5;33m',  // 蓝绿色
      // ];

      // asciiArt.split('\n').forEach((line, i) => {
      //   let output = '';
      //   for (let j = 0; j < line.length; j++) {
      //     output += `${colors[(i + j) % colors.length]}${line[j]}`;
      //   }
      //   console.log(output);
      // });
  }

  var colors = [
      '\x1b[38;5;196m', // 红色
      '\x1b[38;5;202m', // 橙色
      '\x1b[38;5;208m', // 亮橙色
      '\x1b[38;5;214m', // 亮橙黄色
      '\x1b[38;5;220m', // 亮黄色
      '\x1b[38;5;226m', // 黄色
      '\x1b[38;5;190m', // 亮黄绿色
      '\x1b[38;5;154m', // 绿色
      '\x1b[38;5;118m', // 亮绿色
      '\x1b[38;5;82m', // 暗绿色
      '\x1b[38;5;46m', // 青绿色
      '\x1b[38;5;40m', // 暗青绿色
      '\x1b[38;5;33m', // 蓝绿色
      '\x1b[38;5;27m', // 暗蓝绿色
      '\x1b[38;5;21m', // 青色
      '\x1b[38;5;57m', // 亮青色
      '\x1b[38;5;93m', // 暗青色
      '\x1b[38;5;129m', // 蓝色
      '\x1b[38;5;165m', // 亮蓝色
      '\x1b[38;5;201m', // 暗蓝色
      '\x1b[38;5;198m', // 紫色
      '\x1b[38;5;162m', // 亮紫色
      '\x1b[38;5;126m', // 暗紫色
      '\x1b[0m', // 结束符
  ];

  asciiArt.split('\n').forEach((line, i) => {
      let output = '';
      for (let j = 0; j < line.length; j++) {
          output += `${colors[(i + j) % colors.length]}${line[j]}`;
      }
      console.log("\t" + output + colors[colors.length - 1]);
  });
}