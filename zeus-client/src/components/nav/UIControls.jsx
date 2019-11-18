import React from 'react';
import Gear from '../icons/Gear';
import fontFams from '../../dataHelpers/fontFams';

export default function UIControls(props) {
	return (
		<div className='uiControls'>

			<button className='uiMenuBtn' onClick={() => props.setMenuVis(!props.menuVis)} ><Gear /></button>

			<div className='uiMenu' style={props.menuVis ? {opacity: 1, height: '419px', boxShadow: '0 14px 20px 0 rgba(0,0,0,.11)'} : {opacity: 0, height: '0', boxShadow: 'none'}}>

				<div className='uiMenuInner'>

					<div className='uiOptionWrapper'>
						<label htmlFor='loadSelector'>Feed Count</label>
						<div>
							<select
								className='uiSelect'
								name='loadSelector'
								id='loadSelector'
								onChange={(e) => props.updateCount(e.target.value)}
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
						<label htmlFor='agentSelector'>Parser User Agent</label>
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
								onChange={(e) => props.updateFont(e.target.value)}
								defaultValue={localStorage.getItem('font') ? localStorage.getItem('font') : "'Open Sans', sans-serif"}
							>
								<option value={fontFams.open} style={{fontFamily: fontFams.enriqueta}}>Open Sans</option>
								<option value={fontFams.roboto} style={{fontFamily: fontFams.roboto}}>Roboto</option>
								<option value={fontFams.crimson} style={{fontFamily: fontFams.crimson}}>Crimson Text</option>
								<option value={fontFams.enriqueta} style={{fontFamily: fontFams.enriqueta}}>Enriqueta</option>
								<option value={fontFams.farmwood} style={{fontFamily: fontFams.farmwood}}>Farmwood Text</option>
								<option value={fontFams.karma} style={{fontFamily: fontFams.karma}}>Karma</option>
								<option value={fontFams.lora} style={{fontFamily: fontFams.lora}}>Lora</option>
								<option value={fontFams.noto} style={{fontFamily: fontFams.noto}}>Noto Serif SC</option>
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
	)
}