import React, {useState, useEffect} from 'react';
import NavBtn from './NavBtn';


const fams = {
	open: "'Open Sans', sans-serif",
	roboto: "'Roboto', sans-serif",
	crimson: "'Crimson Text', serif",
	enriqueta: "'Enriqueta', serif",
	farmwood: "'Farmwood Text', serif",
	karma: "'Karma', serif",
	lora: "'Lora', serif",
	noto: "'Noto Serif SC', serif"
}


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
		<div className='Nav'>

			<div className='uiMenuBack' style={menuVis ? {opacity: 1, zIndex: '10'} : {opacity: 0, zIndex: '-1'}} onClick={() => setMenuVis(false)}></div>

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

				<div className='uiControls'>

					<button className='uiMenuBtn' onClick={() => setMenuVis(!menuVis)} >Menu</button>

					<div className='uiMenu' style={menuVis ? {opacity: 1, height: '419px', boxShadow: '0 14px 20px 0 rgba(0,0,0,.11)'} : {opacity: 0, height: '0', boxShadow: 'none'}}>

						<div className='uiMenuInner'>

							<div className='uiOptionWrapper'>
								<label htmlFor='loadSelector'>List Load Count</label>
								<div>
									<select
										className='uiSelect'
										name='loadSelector'
										id='loadSelector'
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
							</div>

							<div className='uiOptionWrapper'>
								<label htmlFor='agentSelector'>Article User Agent</label>
								<div>
									<select
										className='uiSelect'
										name='agentSelector'
										id='agentSelector'
										onChange={(e) => props.updateAgent(e.target.value)}
										defaultValue={'desktop'}
									>
										<option value='desktop'>Desktop</option>
										<option value='mobile'>Mobile</option>
										<option value='tablet'>Tablet</option>
									</select>
								</div>
							</div>

							<div className='uiOptionWrapper'>
								<label htmlFor='fontSelector'>Font Family</label>
								<div>
									<select
										className='uiSelect'
										name='fontSelector'
										id='fontSelector'
										onChange={(e) => updateFont(e.target.value)}
										defaultValue={localStorage.getItem('font') ? localStorage.getItem('font') : "'Open Sans', sans-serif"}
									>
										<option value={fams.open} style={{fontFamily: fams.enriqueta}}>Open Sans</option>
										<option value={fams.roboto} style={{fontFamily: fams.roboto}}>Roboto</option>
										<option value={fams.crimson} style={{fontFamily: fams.crimson}}>Crimson Text</option>
										<option value={fams.enriqueta} style={{fontFamily: fams.enriqueta}}>Enriqueta</option>
										<option value={fams.farmwood} style={{fontFamily: fams.farmwood}}>Farmwood Text</option>
										<option value={fams.karma} style={{fontFamily: fams.karma}}>Karma</option>
										<option value={fams.lora} style={{fontFamily: fams.lora}}>Lora</option>
										<option value={fams.noto} style={{fontFamily: fams.noto}}>Noto Serif SC</option>
									</select>
								</div>
							</div>

							<div className='uiOptionWrapper'>
								<label>Font Size</label>
								<div className='fontSizeCont'>
									<button className='uiBtn' onClick={() => props.decFont()}>a</button>
									<button className='uiBtn' onClick={() => props.incFont()}>A</button>
								</div>
							</div>






						</div>
					</div>

				</div>

				<span className='siteTitle'>Hacker Zeus</span>

			</div>

		</div>
	)
}