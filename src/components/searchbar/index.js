import { h, render,Component } from 'preact'
import FaSearch from 'react-icons/lib/fa/search';
import style from './style';


const Search = ({props, handleChange, handleClick}) => {

    return (
     <div class={style.search} >
		<input type="text" onchange = {handleChange} class={style.input}/>
		<button>
			<FaSearch onclick = {handleClick} />
		</button>
	</div>
    )
  }

  export default Search;

