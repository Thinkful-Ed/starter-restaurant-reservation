import styled from "styled-components"

export const FormContainer = styled.form`
	margin: 1rem auto;
	padding: 1rem;
	background-color: var(--grey-transparent);
	border-radius: 0.5rem;
	box-shadow: var(--box-shadow);

	button {
		margin: 0.5rem;
	}
`

export const InputContainer = styled.div`
	display: inline-flex;
	flex-direction: column;
	margin: 0.5rem;
	position: relative;
	min-width: 0px;
	padding: 0px;
	border: 0px;
	vertical-align: top;

	label {
		color: var(--light-aluminum);
		font-weight: 400;
		font-size: 0.7rem;
		line-height: 1.4375em;
		letter-spacing: 0.00938em;
		padding: 0px;
		display: block;
		transform-origin: left top;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: calc(133% - 32px);
		position: absolute;
		left: 0px;
		top: 3px;
		transform: translate(14px, -9px) scale(0.75);
		transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
			transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
			max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
		z-index: 1;
		pointer-events: auto;
		user-select: none;
	}
`

export const InputBox = styled.div`
	font-weight: 400;
	font-size: 0.7rem;
	line-height: 1.4375em;
	letter-spacing: 0.00938em;
	color: var(--light-aluminum);
	box-sizing: border-box;
	cursor: text;
	display: inline-flex;
	-webkit-box-align: center;
	align-items: center;
	position: relative;
	border-radius: 4px;

	input,
	select {
		font: inherit;
		letter-spacing: inherit;
		color: currentcolor;
		border: 0px;
		box-sizing: content-box;
		background: none;
		height: 1.4375em;
		margin: 0px;
		-webkit-tap-highlight-color: transparent;
		display: block;
		min-width: 0px;
		width: 100%;
		animation-name: mui-auto-fill-cancel;
		animation-duration: 10ms;
		padding: 16.5px 14px;

		&:-webkit-autofill {
			transition: background-color 0s 600000s, color 0s 600000s;
		}
		&:focus {
			outline: none;
		}
	}

	option {
		background-color: var(--dark-aluminum);
	}

	fieldset {
		text-align: left;
		position: absolute;
		inset: -5px 0px 0px;
		margin: 0px;
		padding: 0px 8px;
		pointer-events: none;
		border-radius: inherit;
		border-style: solid;
		border-width: 1px;
		overflow: hidden;
		min-width: 0%;
		border-color: var(--light-aluminum);
	}

	legend {
		float: unset;
		width: auto;
		overflow: hidden;
		display: block;
		padding: 0px;
		height: 11px;
		font-size: 0.75em;
		visibility: hidden;
		max-width: 100%;
		transition: max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;
		white-space: nowrap;
	}

	span {
		padding-left: 5px;
		padding-right: 5px;
		display: inline-block;
		opacity: 0;
		visibility: visible;
	}
`
