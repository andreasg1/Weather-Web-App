import {h,Component, render} from 'preact'
import { Link } from 'preact-router';
import style from '../iphone/style';


const Transportation = ({onRouteChange, tubeLines, tubeStatus}) => {

	var colors = ["#894E24", "#DC241F", "#FFCE00", "#007229", "#D799AF", "#6A7278", "#751056", "#000000", "#0019A8", "#00A0E2", "#76D0BD"];

	var results = [];

	for(var i = 0;i<tubeLines.length;i++){
		results.push(<tr style = {{color: `${colors[i]}`, border: `2px solid black`}}><td style = {{border: `2px solid black`}}>{tubeLines[i]}</td><td style = {{border: `2px solid black`, padding: ` 10px`}}>{tubeStatus[i]}</td></tr>);
	}

	return (
		<div class={style.container}>
			<h1>Tube Status</h1>
			<table style = {{textAlign: "center", margin: "0 auto", border: "5px solid black"}}>
				<th style = {{border: `2px solid black`, padding: ` 10px`}}>Line</th>
				<th style = {{border: `2px solid black`, padding: ` 10px`}}>Service Status</th>
					{results}
			</table>
			<br />
			<div>
				<button>
					<a onClick={() => onRouteChange('home')} >
					Back
					</a>
				</button>
			</div>
		</div>
		);
}

export default Transportation;
