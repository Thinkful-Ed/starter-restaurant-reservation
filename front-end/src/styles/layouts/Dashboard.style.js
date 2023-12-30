import styled from "styled-components"

export const DashboardHeader = styled.h1`
	display: inline-block;
	font-size: 225%;
	margin-block-start: 0.2rem;
	margin-block-end: 0.2rem;
	font-weight: 700;
`

export const DashboardSubheader = styled.h4`
	display: inline-block;
	margin-block-start: 1rem;
	margin-block-end: 1rem;
`

export const DateNavContainer = styled.div`
	margin: 0 auto;
	button {
		padding: 0.5rem;
		margin: 0 0.5rem;
		cursor: pointer;
	}
`

export const DashboardContentContainer = styled.ul`
	display: flex;
	width: 50%;
	flex-direction: column;
	padding: 0;
`

export const ContentID = styled.h6`
	margin: 0 auto 0 0 !important;
`

export const ContentHeader = styled.h5`
	margin: 0 auto;
	svg {
		margin-left: 1rem;
		cursor: pointer;
	}
	text-decoration: ${(props) => (props.$cancelled ? "line-through" : "none")};
`

export const Card = styled.li`
	display: flex;
	flex-direction: column;
	border: solid 0.1rem #9d9d9d;
	border-radius: 0.3rem;
	padding: 0.5rem;
	margin: 0.5rem;
	box-shadow: var(--box-shadow);

	h6,
	p {
		margin-block-start: 0;
		margin-block-end: 0;
		margin: 0.5rem 0;
	}
`

export const ButtonCard = styled(Card)`
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	font-size: 300%;
	color: var(--light-aluminum);

	&:hover {
		background-color: var(--grey-transparent);
	}
`

export const BadgeRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`
