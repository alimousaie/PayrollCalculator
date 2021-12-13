import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CalculateIcon from '@mui/icons-material/Calculate';
import Slider from '@mui/material/Slider';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import { calculatePayroll } from '../utility/calculator';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	'& .MuiToggleButtonGroup-grouped': {
		margin: theme.spacing(0.5),
		border: 0,
		'&.Mui-disabled': {
			border: 0,
		},
		'&:not(:first-of-type)': {
			borderRadius: theme.shape.borderRadius,
		},
		'&:first-of-type': {
			borderRadius: theme.shape.borderRadius,
		},
	},
}));

const Payroll = () => {
	const [experience, setExperience] = useState(0);
	const [profession, setProfession] = useState('developer');
	const [city, setCity] = useState('Stockholm');
	const [incomeYear, setIncomeYear] = useState(2019);
	const [showResult, setShowResult] = useState(false);
	const [salary, setSalary] = useState(0);

	const handleExperienceChange = (event, newValue) => {
		if (typeof newValue === 'number') {
			setExperience(newValue);
		}
		setShowResult(false);
	};

	const handleProfession = (event, newProfession) => {
		setProfession(newProfession);
		setShowResult(false);
	};

	const handleCityChange = (event) => {
		setCity(event.target.value);
		setShowResult(false);
	};
	const handleIncomeYearChange = (event) => {
		setIncomeYear(event.target.value);
		setShowResult(false);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const payrollParams = {
			experience,
			profession,
			city,
			incomeYear,
		};

		const salaryAfterTax = calculatePayroll(payrollParams);
		setSalary(salaryAfterTax);
		setShowResult(true);
	};

	return (
		<Container maxWidth='sm' sx={{ mt: 1 }}>
			<Box sx={{ width: '100%' }}>
				<Collapse in={showResult}>
					<Alert
						severity='success'
						sx={{ my: 1, py: 1 }}
						action={
							<IconButton
								aria-label='close'
								color='inherit'
								size='small'
								onClick={() => {
									setShowResult(false);
								}}
							>
								<CloseIcon fontSize='inherit' />
							</IconButton>
						}
					>
						<AlertTitle sx={{ mb: 1 }}>Result</AlertTitle>
						Salary after tax: <strong>{salary.toLocaleString()}</strong> SEK
					</Alert>
				</Collapse>
			</Box>
			<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<Typography id='non-linear-slider' gutterBottom>
					Years of experience: {experience}
				</Typography>
				<Slider
					autoFocus
					id='experience'
					name='experience'
					value={experience}
					min={0}
					step={1}
					max={50}
					onChange={handleExperienceChange}
					valueLabelDisplay='auto'
					aria-labelledby='non-linear-slider'
				/>

				<Box
					fullWidth
					sx={{
						display: 'flex',
						flexFlow: 'column',
						justifyContent: 'space-around',
						alignItems: 'flex-start',
						my: 3,
					}}
				>
					<Typography sx={{ mr: 2, mb: 2 }} gutterBottom>
						Profession: {profession}
					</Typography>
					<StyledToggleButtonGroup
						size='small'
						value={profession}
						exclusive
						color='primary'
						onChange={handleProfession}
						aria-label='Profession'
					>
						<ToggleButton value='developer' aria-label='developer'>
							<Tooltip title='Developer' arrow>
								<CodeIcon />
							</Tooltip>
						</ToggleButton>
						<ToggleButton value='teacher' aria-label='teacher'>
							<Tooltip title='Teacher' arrow>
								<SchoolIcon />
							</Tooltip>
						</ToggleButton>
						<ToggleButton value='cashier' aria-label='cashier'>
							<Tooltip title='Cashier' arrow>
								<PointOfSaleIcon />
							</Tooltip>
						</ToggleButton>
					</StyledToggleButtonGroup>
				</Box>

				<FormControl variant='standard' fullWidth sx={{ my: 2 }}>
					<Typography sx={{ mr: 2, mb: 2 }}>City:</Typography>
					<RadioGroup
						row
						aria-label='city'
						id='city'
						name='city'
						value={city}
						onChange={handleCityChange}
					>
						<FormControlLabel
							value='Stockholm'
							control={<Radio />}
							label='Stockholm'
						/>
						<FormControlLabel
							value='Gothenburg'
							control={<Radio />}
							label='Gothenburg'
						/>
					</RadioGroup>
				</FormControl>

				<FormControl variant='standard' fullWidth sx={{ my: 2 }}>
					<Typography sx={{ mr: 2, mb: 2 }}>Income year:</Typography>
					<RadioGroup
						row
						aria-label='Income year'
						id='incomeYear'
						name='incomeYear'
						value={incomeYear}
						onChange={handleIncomeYearChange}
					>
						<FormControlLabel value='2019' control={<Radio />} label='2019' />
						<FormControlLabel value='2020' control={<Radio />} label='2020' />
					</RadioGroup>
				</FormControl>

				<Button
					type='submit'
					fullWidth
					variant='contained'
					startIcon={<CalculateIcon />}
					sx={{ mt: 3, mb: 2 }}
				>
					Calculate
				</Button>
			</Box>
		</Container>
	);
};

export default Payroll;
