'use strict';

let startButton = document.querySelector('#start'),
    divBudget = document.querySelector('.budget-value'),
    divDayBudget = document.querySelector('.daybudget-value'),
    divLevelValue = document.querySelector('.level-value'),
    divExpensesValue = document.querySelector('.expenses-value'),
    divOptionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    divIncomeValue = document.querySelector('.income-value'),
    divMonthSavingsValue = document.querySelector('.monthsavings-value'),
    divYearSavingsValue = document.querySelector('.yearsavings-value'),

    inputItem = document.querySelectorAll('.expenses-item'),
    btnExpenses = document.querySelectorAll('button')[0],
    btnOptionalExpenses = document.querySelectorAll('button')[1],
    btnBudget = document.querySelectorAll('button')[2],
    divOptionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    inputIncome = document.querySelector('.choose-income'),
    boxSavings = document.querySelector('#savings'),
    inputSum = document.querySelector('.choose-sum'),
    inputPercent = document.querySelector('.choose-percent'),
    inputYear = document.querySelector('.year-value'),
    inputMonth = document.querySelector('.month-value'),
    inputDay = document.querySelector('.day-value');

let money, time;

btnExpenses.disabled = true;
btnOptionalExpenses.disabled = true;
btnBudget.disabled = true;

startButton.addEventListener('click', function () {
    time = prompt('Введите дату в формате YYYY MM DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
    appData.budget = money;
    appData.timeData = time;
    divBudget.textContent = money.toFixed();
    inputYear.value = new Date(Date.parse(time)).getFullYear();
    inputMonth.value = new Date(Date.parse(time)).getMonth() + 1;
    inputDay.value = new Date(Date.parse(time)).getDay();

    btnExpenses.disabled = false;
    btnOptionalExpenses.disabled = false;
    btnBudget.disabled = false;
});

btnExpenses.addEventListener('click', function () {

    let sum = 0;

    for (let i = 0; i < inputItem.length; i++) {
        let firstQuestion = inputItem[i].value,
            secondQuestion = inputItem[++i].value;

        if ((typeof (firstQuestion)) === 'string' && (typeof (firstQuestion)) != null && (typeof (secondQuestion)) != null && firstQuestion != '' && secondQuestion != '' && firstQuestion.length < 50) {
            console.log('Done');
            appData.expenses[firstQuestion] = secondQuestion;
            sum += +secondQuestion;
        } else {
            console.log("Bad result");
            i--;
        }
    }
    divExpensesValue.textContent = sum;
});

btnOptionalExpenses.addEventListener('click', function () {

    for (let i = 0; i < divOptionalExpensesItem.length; i++) {
        const questionOptExpenses = divOptionalExpensesItem[i].value;
        appData.optionalExpenses[i] = questionOptExpenses;
        divOptionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

btnBudget.addEventListener('click', function () {

    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +divExpensesValue.textContent) / 30).toFixed();
        divDayBudget.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 20000) {
            divLevelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 20000 && appData.moneyPerDay < 80000) {
            divLevelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 80000) {
            divLevelValue.textContent = 'Высокий уровень достатка';
        } else {
            divLevelValue.textContent = 'Произошла ошибка';
        }
    } else {
        divBudget.textContent = 'Введите доход';
    }
});

inputIncome.addEventListener('input', function () {
    let items = inputIncome.value;
    appData.income = items.split(', ');
    divIncomeValue.textContent = appData.income;
});

boxSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

inputSum.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +inputSum.value,
            percent = +inputPercent.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        divMonthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        divYearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

inputPercent.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +inputSum.value,
            percent = +inputPercent.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        divMonthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        divYearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

const appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};