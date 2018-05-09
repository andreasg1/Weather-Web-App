import {h,render,Component} from 'preact';

export default class Days extends Component{


	render() {
		var months = new Array(12);
		months[0] = "JAN";
		months[1] = "FEB";
		months[2] = "MAR";
		months[3] = "APR";
		months[4] = "MAY";
		months[5] = "JUNE";
		months[6] = "JULY";
		months[7] = "AUG";
		months[8] = "SEP";
		months[9] = "OCT";
		months[10] = "NOV";
		months[11] = "DEC";

		var days = new Array(7);
		days[1] = "MON";
		days[2] = "TUE";
		days[3] = "WED";
		days[4] = "THU";
		days[5] = "FRI";
		days[6] = "SAT";
		days[0] = "SUN";


		let day = new Date().getDay();
    	let date = new Date().getDate();
    	let month = new Date().getMonth();

        return( <span> {days[day]} , {date} {months[month]} </span>

    )};
}
