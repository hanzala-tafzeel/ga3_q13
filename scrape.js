const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [42,43,44,45,46,47,48,49,50,51];
  let grandTotal = 0;

  for (let seed of seeds) {

    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log("Opening:", url);

    await page.goto(url);
    await page.waitForSelector("table", { timeout: 60000 });

    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => parseFloat(cell.innerText))
           .filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b)=>a+b,0);

    console.log(`Seed ${seed} total =`, sum);

    grandTotal += sum;
  }

  console.log("FINAL TOTAL =", grandTotal);

  await browser.close();

})();
