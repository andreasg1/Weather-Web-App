// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button

import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Components
import Button from '../button';
import Header from '../header';
import Search from '../searchbar';
import Router from 'preact-router';
import Transportation from '../transportation';
import Attraction from '../attraction';
import HourlyView from '../HourlyView';


	const buttonStyle = {
	backgroundColor: "#4CAF50",
	margin: "auto",
   	border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    width: "30%"
	};

	const buttonsDiv = {
		paddingBottom: "20px"
	}

export default class Iphone extends Component {
//var Iphone = React.createClass({



	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.state = {
			loading: true, //Set loading to true so indication to user is shown that data is being loaded
			location: 'London',
			format: 0,
			icon: "",
			iconloaded:false,
			currentPage:'home',
			hourlyHours: [],
			hourlyTemps: [],
			hourlyIcons: [],
			tempFormat: "celsius",
			tubeLines: [],
			tubeStatus: [],
			attractionNames: [],
			attractionAddress: [],
			attractionSites: []
		}
	}

	componentDidMount = () => {
		this.fetchWeatherData();
		this.fetchWeatherDataHourly();
		this.fetchTubeStatus();
		this.fetchAttractionsData();
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = (location = "London") => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = `http://api.wunderground.com/api/c994bc45e46d2857/conditions/q/UK/${this.state.location}.json`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	//a call to fetch the hourly weather data via wunderground
	fetchWeatherDataHourly = (location = "London") => {
		var url = `http://api.wunderground.com/api/c994bc45e46d2857/hourly/q/UK/${this.state.location}.json`
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponseHourly,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	fetchTubeStatus = () => {
		var url = 'https://api.tfl.gov.uk/Line/Mode/tube/Status'
		$.ajax({
			url: url,
			dataType: "json",
			success : this.parseResponseTube,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	fetchAttractionsData = () => {
		var url = 'http://tour-pedia.org/api/getPlaces?location=London&category=attraction';
		$.ajax({
			url: url,
			dataType: "json",
			success : this.parseResponseAttractions,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	handleTempChange = e => {
		console.log(e);
		this.setState({tempFormat: e.target.value});
		this.fetchWeatherData(this.state.location, this.state.tempFormat);
		this.fetchWeatherDataHourly(this.state.location, this.state.tempFormat);
	}

	// Conditional Rendering used to present the illusion of multi-paged app.
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		if(this.state.currentPage == 'home'){
		return (

			<div class={ style.container }>
				<div class={ style.head}>
					<Header handleTempChange = {this.handleTempChange} />
				</div>
					<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					{ this.state.loading ? <h1> </h1> : null }
				</div>

				<div class = "test">
					{this.state.iconloading ? <img src = {`../../assets/icons/${this.state.icon}.png`} style={"padding-bottom: 200px"} alt = "clouds" /> : null}
				</div>


				<div>
					<Search handleChange = {this.handleChange}
							handleClick = {this.handleClick}
					/>
				</div>

				<div>
					<button onClick={() => this.onRouteChange('hourly')}
							className="button"
							style = {style.button}>
							Hourly
					</button>

					<button onClick={() => this.onRouteChange('attractions')}
							className="button"
							current_temp = {this.state.current_temp}
							style = {style.button}>
							Attractions
					</button>

					<button
							onClick={() => this.onRouteChange('transportation')}
							className="button"
							style = {style.button}>
							Tube
					</button>
				</div>


			</div>
		);
		//Take to Transportation
	} else if(this.state.currentPage == 'transportation'){
		return(
			<Transportation onRouteChange = {this.onRouteChange}
							tubeLines = {this.state.tubeLines}
							tubeStatus = {this.state.tubeStatus}
			 />
		);
		//Take to Attractions
	} else if(this.state.currentPage == 'attractions'){
		return(
			<Attraction onRouteChange = {this.onRouteChange}
						current_temp = {this.state.temp}
						names = {this.state.attractionNames}
						addresses = {this.state.attractionAddress}
						details = {this.state.attractionSites}
			/>
		)}
		//Take to Hourly View
	  else if(this.state.currentPage == 'hourly'){
	  	return(
	  		<HourlyView onRouteChange = {this.onRouteChange}
	  					hours = {this.state.hourlyHours}
	  					temps = {this.state.hourlyTemps}
	  					icons = {this.state.hourlyIcons}
	  		 />
	  );
	}}


	//Handles route management for the whole app.
	onRouteChange = (route) => {
	 console.log("called");
     if(route === 'transportation'){
     	console.log("going to transportation...");
   	 	this.setState({currentPage: 'transportation'})
   	 } else if(route === 'home'){
   	 	console.log("going home.....")
       	this.setState({currentPage: 'home'})
     } else if(route === 'attractions'){
     	console.log("going to attractions...");
     	this.setState({currentPage: 'attractions'})
     } else if(route === 'settings'){
     	console.log("going to settings...");
     	this.setState({currentPage: 'settings'})
     } else if(route === 'hourly'){
     	console.log("going to hourly view...");
     	this.setState({currentPage: 'hourly'})
     }

  	}

  	//Handles the searchbar functionality
	handleChange = e => {
		console.log(e);
		this.setState({location: e.target.value});
		this.fetchWeatherData(this.state.location);
		this.fetchWeatherDataHourly(this.state.location);
	 };

	 handleClick = e => {
	 	console.log(this.state.location);
	 };

	//Parses response
	parseResponse = (parsed_json) => {
		try{
			var location = parsed_json['current_observation']['display_location']['city'];
			var temp_c = Math.round(parsed_json['current_observation']['temp_c']);
			var conditions = parsed_json['current_observation']['weather'];
			var temp_f = Math.round(parsed_json['current_observation']['temp_f']);

			if(this.state.tempFormat === 'far'){

				/// set states for fields so they could be rendered later on
				this.setState({
					locate: location,
					temp: temp_f,
					cond : conditions,
					loading: false //Once data is loaded, remove indication
				}, function(){
					this.adjustIcon(this.state.cond); //Callback to adjust the correct icon
				});

			} else {

							/// set states for fields so they could be rendered later on
				this.setState({
					locate: location,
					temp: temp_c,
					cond : conditions,
					loading: false //Once data is loaded, remove indication
				}, function(){
					this.adjustIcon(this.state.cond); //Callback to adjust the correct icon
				});

			}

			}
		catch(err){
			console.log("invalid city name");
		}

	}

	//Parses response for hourly
	parseResponseHourly = (parsed_json) => {
		try{
			var temp = [];
			var hour = [];
			var icons = [];
			console.log(parsed_json);
			if(this.state.tempFormat === "celsius"){
				console.log("im celscius");
			for(var i = 0;i<parsed_json.hourly_forecast.length;i++){
			 	hour.push(parsed_json.hourly_forecast[i].FCTTIME.hour);
				temp.push(parsed_json.hourly_forecast[i].temp.metric);
				icons.push(parsed_json.hourly_forecast[i].icon_url);
			}
			// console.log(temp);
			// console.log(hour);
			this.setState({
				hourlyHours: hour,
				hourlyTemps: temp,
				hourlyIcons: icons
			}, function(){
				console.log(this.state.hourlyHours);
				console.log(this.state.hourlyTemps);
				console.log(this.state.hourlyIcons);
			})
		} else {
			console.log("im far");
			for(var i = 0;i<parsed_json.hourly_forecast.length;i++){
			 	hour.push(parsed_json.hourly_forecast[i].FCTTIME.hour);
				temp.push(parsed_json.hourly_forecast[i].temp.english);
				icons.push(parsed_json.hourly_forecast[i].icon_url);
			}
			this.setState({
				hourlyHours: hour,
				hourlyTemps: temp,
				hourlyIcons: icons
			}, function(){
				console.log(this.state.hourlyHours);
				console.log(this.state.hourlyTemps);
				console.log(this.state.hourlyIcons);
			})
		}
		}
		catch(err){
			alert("No results found. Please enter a valid UK city or check your query.");
		}
	}

	//Parses response for tube info
	parseResponseTube = (parsed_json) => {
		var lines = [];
		var status = [];
		console.log(parsed_json);
		for(var i = 0;i<parsed_json.length;i++){
			lines.push(parsed_json[i].name);
			status.push(parsed_json[i].lineStatuses[0].statusSeverityDescription);
		}

		this.setState({
			tubeLines: lines,
			tubeStatus: status
		}, function(){
			console.log(this.state.tubeLines);
			console.log(this.state.tubeStatus);
		})
	}

	//Parses response for attractions
	parseResponseAttractions = (parsed_json) => {
		var names = [];
		var address = [];
		var details = [];


		for(var i = 0; i<30; i++){
			names.push(parsed_json[i]['name']);
			address.push(parsed_json[i]['address']);
			details.push(parsed_json[i]['details']);
			$.ajax({
				url:details[i],
				dataType: 'json',
				success: this.parseDetailsAttraction,
				error: function(req,err){console.log('API call failed' + err);}
			})


		}

		this.setState({
			attractionNames: names,
			attractionAddress: address
		})
	}

	//Parses the website address for some attractions
	parseDetailsAttraction = (parsed_json) => {
		var website = parsed_json['website'];
		if(website === "" || website === " "){
			website = "N/A";
		}
		this.setState({
			attractionSites: this.state.attractionSites.concat([website])
		})
	}

	//Adjusts icon based on the condition returned by the API
	adjustIcon = (condition) => {
		console.log(condition);
		if(condition.includes("Clouds") || condition.includes("Cloudy") || condition.includes("Overcast") ){
			this.setState({
				icon: "cloud",
				iconloading: true
			})
		} else if(condition.includes("Clear")){
			this.setState({
				icon: "sun",
				iconloading: true
			})
		} else if(condition.includes("Rain") || condition.includes("Drizzle")){
			this.setState({
				icon: "drop",
				iconloading: true
			})
		} else if(condition.includes("Snow")){
			this.setState({
				icon: "snow",
				iconloading: true
			})
		} else if(condition.includes("storm")){
			this.setState({
				icon: "storm",
				iconloading: true
			})
		}
	}




}
