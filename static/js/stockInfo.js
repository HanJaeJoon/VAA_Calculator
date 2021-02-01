const yahooFinance = require('yahoo-finance');

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
}

module.exports = new StockInfo();