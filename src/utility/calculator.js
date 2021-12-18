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
const extraTaxRangePolicies = [
	{
		min: 36000,
		max: 45000,
		taxRate: 0.5,
	},
	{
		min: 45000,
		max: Infinity,
		taxRate: 0.7,
	},
];

/**
 * Number of years of experience:
 * 0-3 years of experience does not give a pay rise
 * 4-7 years of experience gives a salary increase of 20% in addition to basic salary
 * 8-10 years of experience gives a salary increase of 40% in addition to basic salary
 * 11+ years of experience gives a salary increase of 60% in addition to basic salary
 */
const increaseRateByYearsOfExperience = [
	{ min: 0, max: 3, rate: 0 },
	{ min: 4, max: 7, rate: 0.2 },
	{ min: 8, max: 10, rate: 0.4 },
	{ min: 11, max: Infinity, rate: 0.6 },
];

/**
 * calculate Basic salaries before tax:
 * based on profession and experience it can be grow
 * @param  {String} profession Occupation and their base range defined in 'basicSalary'
 * @param  {Number} experience Number of years of experience
 * @return {Number} 		   Increase salary based on years of experiences
 */
const calculateBasicSalary = (profession, experienceYears) => {
	let salary = basicSalary[profession] || 0;
	const experienceRate = increaseRateByYearsOfExperience.find(
		(r) => experienceYears >= r.min && experienceYears <= r.max
	);
	const salaryRaiseRate = 1 + experienceRate.rate;
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
	const sortedExtraTaxRange = extraTaxRangePolicies.sort((s1, s2) =>
		s1.min < s2.min ? -1 : 1
	);
	const minSalary = sortedExtraTaxRange[0].min;
	let salaryPortion = salary <= minSalary ? salary : minSalary;
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
	const sumExtraTax = extraTaxRangePolicies.reduce((extraTax, taxPolicy) => {
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
		return extraTax;
	}, 0);

	return sumExtraTax;
};

/**
 * Calculate salary and tax deductions
 * @param  {Object} payrollParams Contains all parameters for payroll calculation
 * @return {Object}      		  {salary : Number, tax : Number, salaryAfterTax : Number}
 */
export const calculatePayroll = (payrollParams) => {
	const {
		experience,
		profession,
		city,
		incomeYear,
		userSalary,
		calculateMode,
	} = payrollParams;

	let salary = 0;

	if (calculateMode === 'experience') {
		salary = calculateBasicSalary(profession, experience);
	} else {
		salary = userSalary;
	}

	let tax = 0;
	tax = calculateBasicTax(salary, city, incomeYear);
	tax += calculateExtraTax(salary);

	const salaryAfterTax = salary - tax;
	return { salary, tax, salaryAfterTax };
};
