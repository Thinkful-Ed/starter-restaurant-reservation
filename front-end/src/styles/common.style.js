import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled, { keyframes } from "styled-components"

export const BigHeader = styled.h1`
	display: inline-block;
	font-size: 500%;
	margin-block-start: 0.5rem;
	margin-block-end: 0.5rem;
	font-weight: 900;
	color: ${(props) => (props.$danger ? "var(--red)" : "var(--black)")};
`

export const MonoSubheader = styled.h6`
	font-family: var(--font-mono);
	color: ${(props) => (props.$danger ? "var(--red)" : "var(--white)")};
	cursor: ${(props) => (props.$pointer ? "pointer" : "default")};
`

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: ${(props) =>
		props.$justify ? "flex-start" : "space-between"};
	margin: ${(props) => (props.$center ? "0.5rem auto" : "0.5rem")};
`

export const Column = styled.div`
	display: flex;
	flex-direction: column;
`

export const Alert = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 2;
	font-size: 130%;
	font-weight: 500;
	cursor: default;
	padding: 0.75rem 1.25rem;
	margin: 0.5rem 0.5rem 1rem 0.5rem;
	border: 1px solid transparent;
	border-radius: 0.25rem;
	color: var(--dark-aluminum);
	background-color: var(--red-transparent);
	border-color: var(--red-transparent);
	box-shadow: var(--box-shadow);
	opacity: ${(props) => (props.$displayed ? "100" : "0")};
	transition: all 0.5s ease-out;
`

export const Button = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	position: relative;
	box-sizing: border-box;
	outline: 0;
	cursor: pointer;
	user-select: none;
	vertical-align: middle;
	text-decoration: none;
	font-weight: 500;
	font-size: 0.875rem;
	line-height: 1.75;
	letter-spacing: 0.028em;
	text-transform: uppercase;
	min-width: 64px;
	padding: 0.25rem 1rem;
	transition: all 0.3s ease-in-out;
	background-color: none;
	background: transparent;

	border: ${(props) =>
		props.$danger
			? "1px solid var(--red-transparent)"
			: "1px solid var(--aluminum)"};
	color: ${(props) =>
		props.$danger ? "var(--red)" : "var(--light-aluminum)"};
	border-radius: ${(props) => (props.$pill ? "4rem" : "0.25rem")};
	margin: ${(props) => (props.$center ? "0 auto" : "none")};

	&:hover {
		border: ${(props) =>
			props.$danger
				? "1px solid var(--red)"
				: "1px solid var(--light-aluminum)"};
		background-color: ${(props) =>
			props.$danger
				? "var(--red-transparent)"
				: "var(--grey-transparent)"};
	}

	svg {
		margin-right: 0.25rem;
	}
`

export const Badge = styled.div`
	display: inline-block;
	padding: 0.35rem 0.5rem;
	font-size: 75%;
	font-weight: 700;
	line-height: 1;
	text-align: center;
	white-space: nowrap;
	vertical-align: baseline;
	border-radius: 0.25rem;
	margin: 0.5rem;

	cursor: ${(props) => (props.$pointer ? "pointer" : "default")};
	color: ${(props) =>
		props.$success || props.$danger
			? props.$success
				? "var(--green)"
				: "var(--red)"
			: "var(--light-aluminum)"};
	background-color: ${(props) =>
		props.$success || props.$danger
			? props.$success
				? "var(--green-transparent)"
				: "var(--red-transparent)"
			: "var(--grey-transparent)"};
	border: ${(props) =>
		props.$success || props.$danger
			? props.$success
				? "1 px solid var(--green)"
				: "1px solid var(--red)"
			: "1px solid var(--dark-aluminum)"};
`

const spinAnimation = keyframes`
	0% { transform: rotate(0deg); }
	100% { transform: rotate(720deg); }
`
export const Loader = styled(FontAwesomeIcon)`
	font-size: 500%;
	margin: auto;
	animation-name: ${spinAnimation};
	animation-duration: 2.5s;
	animation-iteration-count: infinite;
`

export const CenterContainer = styled.div`
	font-weight: bolder;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	a {
		color: black;
	}
`