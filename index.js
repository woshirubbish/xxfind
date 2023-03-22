#! /usr/bin/env node

import { calendar } from "./lib/calendar.js";
import { parseOptions } from './lib/cmd.js';

const six = [
  '空亡',
  '大安',
  '留连',
  '速喜',
  '赤口',
  '小吉',
]

const DayAndTimeMap = {
  "赤口小吉": "赤口加小吉，办事自己提，婚姻不能成，失物无信息。",
  "赤口空亡": "赤口加空亡，无病也上床，失物不用找，婚姻不能成。",
  "赤口大安": "赤口加大安，办事险和难，失物东北找，婚姻指定难。",
  "赤口留连": "赤口加留连，办事有困难，行人在外走，失物不回还。",
  "赤口速喜": "赤口加速喜，婚姻在自己，失物有着落，办事官事起。",
  "小吉空亡": "小吉加空亡，病人不妥当，失物正东找，婚姻再想想。",
  "小吉大安": "小吉加大安，事事两周全，婚姻当日定，失物自己损。",
  "小吉留连": "小吉加留连，事事有反还，婚姻有人破，失物上西南。",
  "小吉速喜": "小吉加速喜，事事从头起，婚姻能成就，失物在院里。",
  "小吉赤口": "小吉加赤口，办事往外走，婚姻有难处，失物丢了手。",
  "大安留连": "大安加留连，办事不周全，失物西北去，婚姻晚几天。",
  "大安速喜": "大安加速喜，事事自己起，失物当日见，婚姻自己提。",
  "大安赤口": "大安加赤口，办事不顺手，失物不用找，婚姻两分手。",
  "大安小吉": "大安加小吉，事事从已及，失物不出门，婚姻成就地。",
  "速喜赤口": "速喜加赤口，自己往外走，失物往正北，婚姻得勤走。",
  "速喜小吉": "速喜加小吉，婚姻有人提，病人当天好，失物在家里。",
  "速喜空亡": "速喜加空亡，婚姻有分张，病者积极治，失物不久见。",
  "速喜大安": "速喜加大安，事事都平安，姻姻成全了，占病都相安。",
  "速喜留连": "速喜加留连，婚姻不可言，失物无信息，病人有仙缘。",
  "留连大安": "留连加大安，办事两分张，婚姻有喜事，先苦后来甜。",
  "留连速喜": "留连加速喜，事事由自己，婚姻有成意，失物三天里。",
  "留连赤口": "留连加赤口，病者死人口，失物准丢失，婚姻两分手。",
  "留连小吉": "留连加小吉，事事不用提，失物东南去，病者出人齐。",
  "留连空亡": "留连加空亡，病人准死亡，失物不见面，婚姻两分张。",
  "空亡大安": "空亡加大安，事事不周全，婚姻从和好，失物反复间。",
  "空亡留连": "空亡加留连，办事处处难，婚姻重新定，失物永不还。",
  "空亡速喜": "空亡加速喜，事事怨自己，婚姻有一定，失物在家里。",
  "空亡赤口": "空亡加赤口，办事官非有，婚姻难定准，失物往远走。",
  "空亡小吉": "空亡加小吉，事事有猜疑，婚姻有喜事，失物回家里。"
}


const leixiangMap = {
  '大安': '大安： 绿色，东方，卧室，书房，车，床，木质柜子，菜市场，停车场等',
  '留连': '留连：衣服，杂物，空地，仓库，农舍，暗处等',
  '速喜': '速喜：南方，化妆间，电影院，热闹场所，娱乐场所，商场等',
  '赤口': '小吉：北方，水池，水边，水库，厕所，出行时候所掉，流动，小孩处',
  '空亡': '空亡：房间，家，父母家/处，衣服，凸出物品，中空物品等',
  '小吉': '小吉： 北方，水池，水边，水库，厕所，出行时候所掉，流动，小孩处'
}

function main () {
  const date = new Date(parseOptions().date);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();

  const lunar = calendar.solar2lunar(year, month, day, hours);

  const lmonthIndex = lunar.lMonth % 6;

  const ldayIndex = (lunar.lMonth + lunar.lDay - 1) % 6;

  const lHoursIndex = (lunar.lMonth + lunar.lDay + lunar.lHours - 2) % 6;

  const lDataObj = {
    lmonthIndex,
    ldayIndex,
    lHoursIndex
  }

  const obj = {};

  Object.keys(lDataObj).forEach(key => obj[six[lDataObj[key]]] = leixiangMap[six[lDataObj[key]]])
  const objKeys = Object.keys(obj);

  console.log('对应六壬：', objKeys.toString());
  console.log('大概位置：', DayAndTimeMap[`${objKeys.slice(1).join('')}`]);
  console.log('六宫类象：\r\n', objKeys.map(key => obj[key]).join('\r\n'));
}

main();