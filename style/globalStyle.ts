import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	:root {
		--font-big: 50px;
		--font-middle: 25px;
		--font-small: 10px;
		--nav-width: 150px;
		--nav-bar: blue;
	}
	body {
		font-family: 'Open Sans', sans-serif;
		margin: 0;
		padding: 0;
	}
	*,
	*:before,
	*:after {
	  box-sizing: border-box;
	}
	p {
		margin: 0;
	}
	button{
		margin:0;
		padding:0;
		background: none;
		border:none;
		text-decoration:none;
		outline: none;
		cursor: pointer;
		&:hover {
			background-color: rgba(27, 31, 35, 0.08);
			transition: 0.2s;
  		}
	}
`;

export default GlobalStyle;
