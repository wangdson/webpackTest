import React from  "react";
import { render } from "react-dom";
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const res = moment().endOf('day').fromNow();
console.log(res);
render(<h1>hello wp</h1>,document.getElementById("app"));