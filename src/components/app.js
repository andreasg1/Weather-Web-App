// import preact
import { h, Component } from 'preact';
import Router from 'preact-router';
import Route from 'preact-router';
// import required Components from 'components/'
import Iphone from './iphone';
import header from './header';


export default class App extends Component {
//var App = React.createClass({

	// once the components are loaded, checks if the url bar has a path with "ipad" in it, if so sets state of tablet to be tru
	/*
		A render method to display the required Component on screen (iPhone or iPad) : selected by checking component's isTablet state
	*/


	handleRoute = e => {
		this.currentUrl = e.url;
	};



	render(){

			return (
				<div id="app">
					<Router onChange={this.handleRoute}>
					<Iphone path ="/" />

					</Router>
				</div>
			);

	}
}
