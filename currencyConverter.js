document.addEventListener('DOMContentLoaded', populateCurrencyOptions);

async function fetchExchangeRates() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    return response.json();
}

async function populateCurrencyOptions() {
    const data = await fetchExchangeRates();
    const currencies = Object.keys(data.rates);
    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.text = currency;
        fromSelect.add(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.text = currency;
        toSelect.add(option2);
    });
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const data = await fetchExchangeRates();
    const rate = data.rates[toCurrency] / data.rates[fromCurrency];
    const result = amount * rate;

    document.getElementById('conversion-result').innerText = `Converted Amount: ${result.toFixed(2)} ${toCurrency}`;
}
