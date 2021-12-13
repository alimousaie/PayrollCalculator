import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Payroll from './Payroll';
import NavBar from './NavBar';

const Layout = () => {
	return (
		<>
			<NavBar />
			<Box sx={{ my: 4, flexGrow: 1 }}>
				<Grid container spacing={3}>
					<Grid item xs>
						{/* <Item>xs</Item> */}
					</Grid>
					<Grid item xs={10} sm={6}>
						<Payroll />
					</Grid>
					<Grid item xs>
						{/* <Item>xs</Item> */}
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default Layout;
