// Basic Salay for Occupation
const basicSalary = {
	developer: 30000,
	teacher: 27000,
	cashier: 25000,
};

// Basic tax rate / Location
const basicTaxRate = {
	Stockholm: {
		2019: 0.3,
		2020: 0.29,
	},
	Gothenburg: {
		2019: 0.25,
		2020: 0.22,
	},
};

// Extra high-income tax policies
const extraTaxRangePolicies = {
	part1: {
		min: 36000,
		max: 45000,
		taxRate: 0.5,
	},
	part2: {
		min: 45000,
		max: Infinity,
		taxRate: 0.7,
	},
};

/**
 * Number of years of experience:
 * 0-3 years of experience does not give a pay rise
 * 4-7 years of experience gives a salary increase of 20% in addition to basic salary
 * 8-10 years of experience gives a salary increase of 40% in addition to basic salary
 * 11+ years of experience gives a salary increase of 60% in addition to basic salary
 * @param  {Number} years years of Experience
 * @return {Number}       Salary increasement rate
 */
const getIncreaseRateByYearsOfExperience = (years) => {
	if (years >= 11) return 0.6;
	else if (years >= 8) return 0.4;
	else if (years >= 4) return 0.2;
	else return 0;
};

/**
 * calculate Basic salaries before tax:
 * based on profession and experience it can be grow
 * @param  {String} profession Occupation and their base range defined in 'basicSalary'
 * @param  {Number} experience Number of years of experience
 * @return {Number} 		   Increase salary based on years of experiences
 */
const calculateBasicSalary = (profession, experienceYears) => {
	let salary = basicSalary[profession] || 0;
	const salaryRaiseRate =
		1 + getIncreaseRateByYearsOfExperience(experienceYears);
	salary *= salaryRaiseRate;
	return salary;
};

/**
 * Basic tax rate / Location
 * The basic tax rate is based on city and income year and is applied to salary between SEK 0 - 36,000:
 * @param  {Number} salary		Employee salary
 * @param  {String} city		The city he/she is working
 * @param  {Number} incomeYear	The tax year
 * @return {Number}      		Amount of tax should pay at first step
 */
const calculateBasicTax = (salary, city, incomeYear) => {
	let salaryPortion = salary <= 36000 ? salary : 36000;
	const taxRate = basicTaxRate[city][incomeYear];
	const basicTax = salaryPortion * taxRate;
	return basicTax;
};

/**
 * Extra high-income tax:
 * pay 50% tax on all salary between SEK 36,000 - 45,000,
 * and 70% tax on anything over SEK 45,000
 * @param  {Number} salary Employee salary
 * @return {Number}        Amount of extra tax
 */
const calculateExtraTax = (salary) => {
	let extraTax = 0;

	Object.entries(extraTaxRangePolicies).forEach(([key, taxPolicy]) => {
		let salaryPortion = salary;

		if (salaryPortion > taxPolicy.max) {
			salaryPortion = taxPolicy.max;
		}

		if (salaryPortion > taxPolicy.min) {
			salaryPortion = salaryPortion - taxPolicy.min;
		} else {
			salaryPortion = 0;
		}

		extraTax += salaryPortion * taxPolicy.taxRate;
	});

	return extraTax;
};

/**
 * Calculate salary and tax deductions
 * @param  {Object} payrollParams Contains all parameters for payroll calculation
 * @return {Number}      		  Remaining salary after tax
 */
export const calculatePayroll = (payrollParams) => {
	const { experience, profession, city, incomeYear } = payrollParams;

	const salary = calculateBasicSalary(profession, experience);

	let tax = 0;
	tax = calculateBasicTax(salary, city, incomeYear);
	tax += calculateExtraTax(salary);

	const salaryAfterTax = salary - tax;
	return salaryAfterTax;
};
