import React, {useState, useEffect} from 'react';
import NavBtn from './NavBtn';


export default function Nav(props) {
	const [current, setCurrent] = useState('top');
	const [refreshList, setRefreshList] = useState(false);

	const makeReq = props.makeReq;

	const updateList = (type) => {
		setCurrent(type);
		makeReq(type);
	}

	const updateCount = (count) => {
		localStorage.setItem('count', count);
		props.setCount(count);
		setRefreshList(true);
	}

	useEffect(() => {
		if (refreshList === true) {
			makeReq(current);
			setRefreshList(false);
		}
	}, [current, makeReq, refreshList]);


	return (
		<div className='Nav'>

			<div className='navLeft'>
				<div className='navBtnCont'>
					<NavBtn click={() => updateList('top')} text='Top' current={current === 'top'} />
					<NavBtn click={() => updateList('new')} text='New' current={current === 'new'} />
					<NavBtn click={() => updateList('best')} text='Best' current={current === 'best'} />
					<NavBtn click={() => updateList('ask')} text='Ask' current={current === 'ask'} />
					<NavBtn click={() => updateList('show')} text='Show' current={current === 'show'} />
					<NavBtn click={() => updateList('jobs')} text='Jobs' current={current === 'jobs'} />
				</div>
			</div>

			<div className='navRight'>

				<div className='displayControls'>

					<select
						name='loadSelecter'
						onChange={(e) => updateCount(e.target.value)}
						defaultValue={localStorage.getItem('count') ? localStorage.getItem('count') : 30}
					>
						<option value={15}>15</option>
						<option value={30}>30</option>
						<option value={60}>60</option>
						<option value={90}>90</option>
						<option value={120}>120</option>
					</select>

				</div>

				<span className='siteTitle'>Hacker Zeus</span>
			</div>




		</div>
	)
}