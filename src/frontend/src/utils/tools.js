// 原样提取自 indexbak.html L1492-1533 (frontendCalc) 和 L1554 (LUNAR)

// LUNAR 农历计算对象
export const LUNAR = {
    info: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, 0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, 0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, 0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, 0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, 0x0d520],
    gan: '甲乙丙丁戊己庚辛壬癸'.split(''),
    zhi: '子丑寅卯辰巳午未申酉戌亥'.split(''),
    months: '正二三四五六七八九十冬腊'.split(''),
    days: '初一,初二,初三,初四,初五,初六,初七,初八,初九,初十,十一,十二,十三,十四,十五,十六,十七,十八,十九,二十,廿一,廿二,廿三,廿四,廿五,廿六,廿七,廿八,廿九,三十'.split(','),
    lYearDays(y) {
        let s = 348;
        for (let i = 0x8000; i > 0x8; i >>= 1) s += (this.info[y - 1900] & i) ? 1 : 0;
        return s + this.leapDays(y);
    },
    leapDays(y) {
        if (this.leapMonth(y)) return (this.info[y - 1900] & 0x10000) ? 30 : 29;
        return 0;
    },
    leapMonth(y) {
        return this.info[y - 1900] & 0xf;
    },
    monthDays(y, m) {
        return (this.info[y - 1900] & (0x10000 >> m)) ? 30 : 29;
    },
    solar2lunar(y, m, d) {
        if (y < 1900 || y > 2100) return null;
        const base = new Date(1900, 0, 31), obj = new Date(y, m - 1, d);
        let offset = Math.round((obj - base) / 86400000);
        let ly = 1900, temp = 0;
        for (; ly < 2101 && offset > 0; ly++) { temp = this.lYearDays(ly); offset -= temp; }
        if (offset < 0) { offset += temp; ly--; }
        let lm = 1, leap = this.leapMonth(ly), isLeap = false;
        for (; lm < 13 && offset > 0; lm++) {
            if (leap > 0 && lm === (leap + 1) && !isLeap) { --lm; isLeap = true; temp = this.leapDays(ly); }
            else { temp = this.monthDays(ly, lm); }
            if (isLeap && lm === (leap + 1)) isLeap = false;
            offset -= temp;
        }
        if (offset === 0 && leap > 0 && lm === leap + 1) {
            if (isLeap) isLeap = false;
            else { isLeap = true; --lm; }
        }
        if (offset < 0) { offset += temp; --lm; }
        const ld = offset + 1, gIdx = (ly - 4) % 10, zIdx = (ly - 4) % 12;
        const yStr = this.gan[gIdx < 0 ? gIdx + 10 : gIdx] + this.zhi[zIdx < 0 ? zIdx + 12 : zIdx];
        const mStr = (isLeap ? '闰' : '') + this.months[lm - 1] + '月';
        return { year: ly, month: lm, day: ld, isLeap, yearStr: yStr, monthStr: mStr, dayStr: this.days[ld - 1], fullStr: yStr + '年' + mStr + this.days[ld - 1] };
    }
};

// frontendCalc 前端计算对象
export const frontendCalc = {
    l2s(l) {
        let days = 0;
        const { year, month, day, isLeap } = l;
        for (let i = 1900; i < year; i++) days += LUNAR.lYearDays(i);
        const leap = LUNAR.leapMonth(year);
        for (let i = 1; i < month; i++) {
            days += LUNAR.monthDays(year, i);
            if (leap > 0 && i === leap) days += LUNAR.leapDays(year);
        }
        if (isLeap) days += LUNAR.monthDays(year, month);
        days += day - 1;
        const base = new Date(Date.UTC(1900, 0, 31));
        const target = new Date(base.getTime() + days * 86400000);
        return { year: target.getUTCFullYear(), month: target.getUTCMonth() + 1, day: target.getUTCDate() };
    },
    addPeriod(l, val, unit) {
        let { year, month, day, isLeap } = l;
        if (unit === 'year') {
            year += val;
            const lp = LUNAR.leapMonth(year);
            isLeap = isLeap && lp === month;
        } else if (unit === 'month') {
            let tot = (year - 1900) * 12 + (month - 1) + val;
            year = Math.floor(tot / 12) + 1900;
            month = (tot % 12) + 1;
            const lp = LUNAR.leapMonth(year);
            isLeap = isLeap && lp === month;
        } else if (unit === 'day') {
            const s = this.l2s(l);
            const d = new Date(Date.UTC(s.year, s.month - 1, s.day + val));
            return LUNAR.solar2lunar(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
        }
        let max = isLeap ? LUNAR.leapDays(year) : LUNAR.monthDays(year, month);
        let td = Math.min(day, max);
        while (td > 0) {
            if (this.l2s({ year, month, day: td, isLeap })) return { year, month, day: td, isLeap };
            td--;
        }
        return { year, month, day, isLeap };
    }
};
