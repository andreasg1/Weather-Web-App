import {h,Component, render} from 'preact'
import style from '../iphone/style';



const RenderHourly = ({hours, temps}) => {
	
	var results = [];
	
	for(var i = 0;i<hours.length;i++){
		results.push(<tr><td>{hours[i]}</td><td>{temps[i]}</td></tr>)
	}

	return (
		
			
				hours.map((hour, i) => {
					return (
						<tr><td>{hours[i]}</td><td>{temps[i]}</td></tr>
					);
				})
			
		
	)
	
}

//export default RenderHourly;