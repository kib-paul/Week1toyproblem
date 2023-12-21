const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculateNetSalary(basicSalary, benefits) {

    const PAYE_RATES = [
        { lowerLimit: 0, upperLimit: 24000, rate: 10 },
        { lowerLimit: 24001, upperLimit: 32333, rate: 25 },
        { lowerLimit: 32334, upperLimit: 500000, rate: 30 },
        { lowerLimit: 500001, upperLimit: 800000, rate: 32.5 },
        { lowerLimit: 800001, upperLimit: Infinity, rate: 35 }
    ];

    const PERSONAL_RELIEF = 2400;
    const INSURANCE_RELIEF = 5000;
    const PENSION_CONTRIBUTION = 20000;
    const NHIF_RATES = [150, 300, 400, 500, 600, 750, 850, 900];
    const NSSF_RATE = 6;


    const taxableIncome = basicSalary + benefits - PERSONAL_RELIEF - INSURANCE_RELIEF - PENSION_CONTRIBUTION;


    let paye = 0;
    for (const rate of PAYE_RATES) {
        if (taxableIncome > rate.upperLimit) {
            paye += (rate.upperLimit - rate.lowerLimit) * rate.rate / 100;
        } else {
            paye += (taxableIncome - rate.lowerLimit) * rate.rate / 100;
            break;
        }
    }

    let nhif = 0;
    for (const rate of NHIF_RATES) {
        if (taxableIncome > rate) {
            nhif = rate;
        } else {
            break;
        }
    }


    const nssf = taxableIncome * NSSF_RATE / 100;

 
    const grossSalary = basicSalary + benefits;
    const netSalary = grossSalary - paye - nhif - nssf;

 
    console.log(`Gross Salary: ksh ${grossSalary}`);
    console.log(`PAYE: ksh ${paye}`);
    console.log(`NHIF: ksh ${nhif}`);
    console.log(`NSSF: ksh ${nssf}`);
    console.log(`Net Salary: ksh ${netSalary}`);
}

function getUserInput() {
    rl.question('Enter Basic Salary: ', function (basicSalaryInput) {
        const basicSalary = parseFloat(basicSalaryInput);
        if (isNaN(basicSalary) || basicSalary < 0) {
            console.log('Invalid input. Please enter a valid basic salary.');
            rl.close();
            return;
        }

        rl.question('Enter Benefits: ', function (benefitsInput) {
            const benefits = parseFloat(benefitsInput);
            if (isNaN(benefits) || benefits < 0) {
                console.log('Invalid input. Please enter valid benefits.');
                rl.close();
                return;
            }

            calculateNetSalary(basicSalary, benefits);
            rl.close();
        });
    });
}

// Call the function
getUserInput();