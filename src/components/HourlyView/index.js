import {h,Component, render} from 'preact'
import style from '../iphone/style';
import RenderHourly from '../RenderHourly/RenderHourly.js';


const HourlyView = ({onRouteChange, hours, temps,icons}) => {
	var results = [];

	for(var i = 0;i<hours.length-11;i++){
		results.push(<tr><td>{hours[i] + ":00"}</td><td>{temps[i]}&deg;C</td><td><img src={icons[i]} alt = 'icon' height = '30' width = '30' /></td></tr>)
	}

	return (
		<div class={style.container}  >
			<h1>Hourly View - 24Hrs</h1>
			<div style = {{overflowY: "scroll", height: "700px" }} >
				<table style = {{textAlign: "center", margin: "0 auto", border: "5px solid black"}}>
					<th>Time</th>
					<th>Temp</th>
					<th>Condition</th>
					{results}
				</table>
				<br />
				<button>
					<a onClick={() => onRouteChange('home')} >
					Back
					</a>
				</button>
			</div>
		</div>
		);
}

export default HourlyView;
