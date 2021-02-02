const yahooFinance = require('yahoo-finance');
const moment = require('moment');

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
        var today = moment().startOf('day');

        if (moment(targetDate,'YYYY-MM-DD').isAfter(today, 'day')) {
            throw Error('미래 검색 불가능!');
        }

        let result = await this.getData(targetDate);

        // algorithm

        return { quote: 'SHY' };
    }
}

module.exports = new StockInfo();