import { h, render, Component} from 'preact';
import $ from 'jquery';
import Days from './day';
import Timenow from './time';
import style from './style';



	 const Header = ({props,handleTempChange}) => {
	 		let far="far";
	 		let celscius ="celsius";
			return(
			<div>
			<span class = {style.day}><Days /></span>
			<span class = {style.time}><Timenow /></span>
			<span class = {style.temp}>
				<button value = {celscius} onClick ={handleTempChange}> &deg;C </button>
				<span> / </span>
				<button value={far} onClick ={handleTempChange}> &deg;F </button>
			</span>

			</div>

        )}

		export default Header;
