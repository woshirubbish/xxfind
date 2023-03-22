import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

const sections = [
  {
    header: '小六壬寻物',
    content: '玄学',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'date',
        typeLabel: '{underline string}',
        description: '丢失东西的时间，例：2022/2/1-10:00',
      }
    ],
  },
];

const optionDefinetions = [
  { name: 'help', alias: 'h' },
  { name: 'date', alias: 'd', type: String }
]

export function parseOptions () {
  const options = commandLineArgs(optionDefinetions);
  const usage = commandLineUsage(sections);
  if ('help' in options) {
    console.log(usage);
    process.exit();
  }
  
  return options;
}