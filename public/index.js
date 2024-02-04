async function main() {
  const timeChartCanvas = document.querySelector("#time-chart");
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );

  const apiUrl = "https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1month&apikey=4aced5eef2ec4fbaa91f8e002342ef87";

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const GME = data.GME;
      const MSFT = data.MSFT;
      const DIS = data.DIS;
      const BNTX = data.BNTX;

      const stocks = [GME, MSFT, DIS, BNTX];
      console.log(stocks);

      const highestValues = stocks.map(stock => Math.max(...stock.values.map(value => parseFloat(value.high))));

stocks.forEach( stock => stock.values.reverse())
// Time chart 
      new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: stocks[0].values.map(value => value.datetime),
          datasets: stocks.map(stock => ({
            label: stock.meta.symbol,
            data: stock.values.map(value => parseFloat(value.high)),
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
          }))
        }
      });

// highest price chart
new Chart(highestPriceChartCanvas.getContext('2d'), {
  type: 'bar',
  data: {
    labels: ["GME", "MSFT", "DIS", "BNTX"],
    datasets: [{
      label: "Highest",
      data: highestValues,
      backgroundColor: highestValues.map(stock => getColor(getStockSymbol(stock))),
      borderColor: highestValues.map(stock => getColor(getStockSymbol(stock))),
    }]
  }
});
function getStockSymbol(highestValue) {

  const index = highestValues.findIndex(value => value === highestValue);
  return stocks[index].meta.symbol;
}
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });

  function getColor(stock) {
    if (stock === "GME") {
      return 'rgba(61, 161, 61, 0.7)';
    }
    if (stock === "MSFT") {
      return 'rgba(209, 4, 25, 0.7)';
    }
    if (stock === "DIS") {
      return 'rgba(18, 4, 209, 0.7)';
    }
    if (stock === "BNTX") {
      return 'rgba(166, 43, 158, 0.7)';
    }
  }
}

main();
