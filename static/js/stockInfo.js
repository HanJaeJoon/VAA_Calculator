const yahooFinance = require('yahoo-finance');
const moment = require('moment');
const { quote } = require('yahoo-finance');

class StockInfo {
    getData(targetDate) {
        let now;

        if (targetDate) {
            try {
                now = new Date(Date.parse(targetDate));
            } catch {
                now = Date.now();
            }
        } else {
            now = Date.now();
        }

        let dateObj = new Date(now);
        let toDate = dateObj.toISOString();
        let fromDate = new Date(dateObj.setFullYear(dateObj.getFullYear() - 1)).toISOString();

        return yahooFinance.historical({
            symbols: ['SPY', 'EFA', 'EEM', 'AGG', 'SHY', 'IEF', 'LQD'],
            from: fromDate,
            to: toDate,
            period: 'd'
        });
    }

    async asyncCalculate(targetDate) {
        let today = moment().startOf('day');

        if (moment(targetDate, 'YYYY-MM-DD').isSameOrAfter(today, 'day')) {
            throw Error('과거 검색만 가능!');
        }

        let stockInfo = await this.getData(targetDate);
        let result = {
            quote: '',
            history: {
                'SPY': {},
                'EFA': {},
                'EEM': {},
                'AGG': {},
                'SHY': {},
                'IEF': {},
                'LQD': {},
            },
            //raw: stockInfo,
        };

        let d1 = moment(today).add(-1, 'month');
        let d3 = moment(today).add(-3, 'month');
        let d6 = moment(today).add(-6, 'month');
        let d12 = moment(today).add(-12, 'month');

        for (let stock in stockInfo) {
            let history = stockInfo[stock];
            let p0, p1, p3, p6, p12;

            // 최근 -> 과거순
            for (let i = 0; i < history.length; i++) {
                let info = history[i];
                let date = moment(info.date);
                let dateString = date.format('YYYY-MM-DD');

                // 목표 날짜
                if (!p0 && moment() > date) {
                    p0 = info.close;
                    result.history[stock]['p0'] = {
                        date: dateString,
                        price: p0,
                    };
                    continue;
                }

                // 1개월
                if (!p1 && d1 > date) {
                    p1 = info.close;
                    result.history[stock]['p1'] = {
                        date: dateString,
                        price: p1,
                    };
                    continue;
                }

                // 3개월
                if (!p3 && d3 > date) {
                    p3 = info.close;
                    result.history[stock]['p3'] = {
                        date: dateString,
                        price: p3,
                    };
                    continue;
                }

                // 6개월
                if (!p6 && d6 > date) {
                    p6 = info.close;
                    result.history[stock]['p6'] = {
                        date: dateString,
                        price: p6,
                    };
                    continue;
                }

                // 12개월
                if (!p12 && (d12 > date || i === history.length - 1)) {
                    p12 = info.close;
                    result.history[stock]['p12'] = {
                        date: dateString,
                        price: p12,
                    };
                    continue;
                }
            }
        }

        // calculate momentum
        let momentums = {};

        for (let ticker in result.history) {
            let stock = result.history[ticker];

            let p12 = stock['p12'].price;
            let p6 = stock['p6'].price;
            let p3 = stock['p3'].price;
            let p1 = stock['p1'].price;
            let p0 = stock['p0'].price;

            let momentum = 12 * (p0 / p1 - 1) + 4 * (p0 / p3 - 1) + 2 * (p0 / p6 - 1) + (p0 / p12 - 1);

            momentums[ticker] = momentum;
        }

        //console.log(`${quote} is selected`);

        // select quote
        let quote;

        if (momentums['SPY'] < 0 || momentums['EFA'] < 0 || momentums['EEM'] < 0 || momentums['AGG'] < 0) {
            let max = Math.max(momentums['SHY'], momentums['IEF'], momentums['LQD']);

            for (let t in momentums) {
                if (max === momentums[t]) {
                    quote = t;
                    //console.log(`${quote} is selected`);
                    break; 
                }
            }
        } else {
            let max = Math.max(momentums['SPY'], momentums['EFA'], momentums['EEM'], momentums['AGG']);

            for (let t in momentums) {
                if (max === momentums[t]) {
                    quote = t;
                    //console.log(`${quote} is selected`);
                    break; 
                }
            }
        }

        result.quote = quote;
        
        return result;
    }
}

module.exports = new StockInfo();