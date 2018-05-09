import {h,render,Component} from 'preact';

import style from '../iphone/style';
import style2 from './style2';
import {Link} from 'preact-router';


const Attraction =  ({onRouteChange, current_temp, names, addresses, details}) => {

	var results =[];

	for(var i=0; i<names.length; i++){
		results.push(<tr><td>{names[i]}</td><td>{addresses[i]}</td><td><a href={details[i]}>{details[i]}</a></td></tr>)
	}

	if(current_temp > 1){

	return(
		<div class={style.container}>

			<h1> Attractions in London</h1>
			<div style = {{overflowY: "scroll", height: "700px" }}>
			<table style = {{textAlign: "center", margin: "0 auto", border: "5px solid black"}}>
					<th>Attraction</th><th>Address</th><th>Description</th>
					{results}
			</table>
			</div>
			<div >
			<br />
				<button>
					<a onClick={() => onRouteChange('home')} >
					Back
					</a>
				</button>
			</div>
		</div>
		) } else {
		return(
		<div class = {style.container}>
			<h1>Temp too low to visit attractions!</h1>
			<div>
				<button>
					<a onClick={() => onRouteChange('home')} >
					Back
					</a>
				</button>
			</div>
		</div>
		)
	}
}



export default Attraction;
