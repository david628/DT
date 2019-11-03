const DateUtil = {
    getDaysOfMonth(year, month) {
        return [31, (year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },
    dateFormat(date, format) {
        if(!date) {
            return '';
        }
        let o = {
            "M+": date.getMonth() + 1, // month
            "D+": date.getDate(), // day
            "h+": date.getHours(), // hour
            "m+": date.getMinutes(), // minute
            "s+": date.getSeconds(), // second
            "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
            "S": date.getMilliseconds()
            // millisecond
        }, rs = format;
        if (/(Y+)/.test(rs)) {
            rs = rs.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(rs)) {
                rs = rs.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return rs;
    },
    eq(sDate, eDate, type) {
        if(type === 'year') {
            if(sDate.getFullYear() === eDate.getFullYear()) {
                return true;
            }
        } else if(type === 'month') {
            if(sDate.getFullYear() === eDate.getFullYear() && sDate.getMonth() === eDate.getMonth()) {
                return true;
            }
        } else if(type === 'day') {
            if(sDate.getFullYear() === eDate.getFullYear() && sDate.getMonth() === eDate.getMonth() && sDate.getDate() === eDate.getDate()) {
                return true;
            }
        } else {
            if(sDate.getTime() === eDate.getTime()) {
                return true;
            }
        }
        return false;
    },
    isBefore(sDate, eDate, type) {
        if(type === 'year') {
            if(sDate.getFullYear() < eDate.getFullYear()) {
                return true;
            }
        } else if(type === 'month') {
            if(sDate.getFullYear() < eDate.getFullYear()) {
                return true;
            } else if(sDate.getFullYear() === eDate.getFullYear() && sDate.getMonth() < eDate.getMonth()) {
                return true;
            }
        } else if(type === 'day') {
            if(sDate.getFullYear() < eDate.getFullYear()) {
                return true;
            } else if(sDate.getFullYear() === eDate.getFullYear() && sDate.getMonth() < eDate.getMonth()) {
                return true;
            } else if(sDate.getFullYear() === eDate.getFullYear() && sDate.getMonth() === eDate.getMonth() && sDate.getDate() < eDate.getDate()) {
                return true;
            }
        } else {
            if(sDate.getTime() < eDate.getTime()) {
                return true;
            }
        }
        return false;
    },
    isAfter(sDate, eDate, type) {
        if(type === 'year') {
            if(sDate.getFullYear() > eDate.getFullYear()) {
                return true;
            }
        } else if(type === 'month') {
            if(sDate.getFullYear() > eDate.getFullYear()) {
                return true;
            } else if(sDate.getFullYear() === eDate.getFullYear() && sDate.getMonth() > eDate.getMonth()) {
                return true;
            }
        } else if(type === 'day') {
            if(sDate.getFullYear() > eDate.getFullYear()) {
                return true;
            } else if(sDate.getFullYear() === eDate.getFullYear() && sDate.getMonth() > eDate.getMonth()) {
                return true;
            } else if(sDate.getFullYear() === eDate.getFullYear() && sDate.getMonth() === eDate.getMonth() && sDate.getDate() > eDate.getDate()) {
                return true;
            }
        } else {
            if(sDate.getTime() > eDate.getTime()) {
                return true;
            }
        }
        return false;
    },
    getPervMonthLastDays(date, time) {
        let year = date.getFullYear();
        let month = date.getMonth();
        let currentWeek = new Date(year, parseInt(month, 10), 1).getDay();
        let pervNum = currentWeek != 0 ? currentWeek : currentWeek + 7;
        let rs = [];
        let value = time || date;
        for(let i = 0; i < pervNum; i++) {
            rs.unshift({
                type: 'pervMonth',
                value: new Date(year, month, 0 - i, value.getHours(), value.getMinutes(), value.getSeconds())
            });
        }
        let num = DateUtil.getDaysOfMonth(year, month);
        for(let i = 0; i < num; i++) {
            rs.push({
                type: 'curMonth',
                value: new Date(year, month, i + 1, value.getHours(), value.getMinutes(), value.getSeconds())
            });
        }
        let nextNum = 42 - pervNum - num;
        for(let i = 0; i < nextNum; i++) {
            rs.push({
                type: 'nextMonth',
                value: new Date(year, month, num + i + 1, value.getHours(), value.getMinutes(), value.getSeconds())
            });
        }
        return rs;
    },
    getDateByPrevOrNext(curDate, type, increment, time) {
        let v, value = time || curDate;
        if(type === 'prevYear') {
            v = new Date(curDate.getFullYear() - increment, curDate.getMonth(), curDate.getDate(), value.getHours(), value.getMinutes(), value.getSeconds());
        } else if(type === 'prevMonth') {
            v = new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate(), value.getHours(), value.getMinutes(), value.getSeconds());
        } else if(type === 'nextMonth') {
            v = new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate(), value.getHours(), value.getMinutes(), value.getSeconds());
        } else if(type === 'nextYear') {
            v = new Date(curDate.getFullYear() + increment, curDate.getMonth(), curDate.getDate(), value.getHours(), value.getMinutes(), value.getSeconds());
        }
        return v;
    }
};
export default DateUtil;
