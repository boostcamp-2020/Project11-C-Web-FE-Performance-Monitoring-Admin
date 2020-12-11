import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	:root {
		--font-big: 50px;
		--font-middle: 25px;
		--font-small: 10px;
		--nav-width: 150px;
		--nav-bar: blue;
		min-height: 100%;
	}
	body {
		font-family: 'Open Sans', sans-serif;
		width: 100%;
		margin: 0;
		padding: 0;
		background-image: url('../../../public/svg/costom_background.svg');
		background-size: cover;
		background-repeat: no-repeat;
	}
	*,
	*:before,
	*:after {
	  box-sizing: border-box;
	}
	#root {
		height: 100%;
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
	}
`;

export default GlobalStyle;
