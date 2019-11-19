import React, {useState, useEffect} from 'react';
import NavBtn from './NavBtn';
import UIControls from './UIControls';


export default function Nav(props) {
	const [current, setCurrent] = useState('top');
	const [refreshList, setRefreshList] = useState(false);
	const [menuVis, setMenuVis] = useState(false);

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

	const updateFont = (font) => {
		localStorage.setItem('font', font);
		props.setFont(font);
	}

	useEffect(() => {
		if (refreshList === true) {
			makeReq(current);
			setRefreshList(false);
		}
	}, [current, makeReq, refreshList]);


	return (
		<div className={'Nav ' + (props.dark && 'genDark') }>

			<div className='uiMenuDarkBkg'
				onClick={() => setMenuVis(false)}
				style={menuVis ? {opacity: 1, zIndex: 19} : {opacity: 0, zIndex: -1}} >
			</div>


			<div className='navLeft'>
				<NavBtn click={() => updateList('top')} text='Top' current={current === 'top'} />
				<NavBtn click={() => updateList('new')} text='New' current={current === 'new'} />
				<NavBtn click={() => updateList('best')} text='Best' current={current === 'best'} />
				<NavBtn click={() => updateList('ask')} text='Ask' current={current === 'ask'} />
				<NavBtn click={() => updateList('show')} text='Show' current={current === 'show'} />
				<NavBtn click={() => updateList('jobs')} text='Jobs' current={current === 'jobs'} />
			</div>


			<div className={'navRight ' + (props.dark && 'genDark')}>

				<UIControls
					menuVis={menuVis}
					setMenuVis={setMenuVis}
					updateCount={updateCount}
					updateAgent={props.updateAgent}
					updateFont={updateFont}
					decFont={props.decFont}
					incFont={props.incFont}
					dark={props.dark}
					toggleDark={props.toggleDark}
				/>

				<span className='siteTitle'>Hacker Zeus</span>

			</div>

		</div>
	)
}