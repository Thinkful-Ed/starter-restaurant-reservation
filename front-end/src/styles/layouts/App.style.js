import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

export const NavContainer = styled.nav`
	border-bottom: 1px solid #dee2e6 !important;
	background-color: var(--black);
	box-shadow: var(--box-shadow);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1rem;
`

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: none;
	width: 95%;
	height: 100%;
	margin: 1rem auto;
`

export const SidebarToggle = styled(FontAwesomeIcon)`
	cursor: pointer;
	margin: 1rem;
	transform: ${(props) => (props.$collapsed ? "rotate(90deg)" : "")};
	transition: all 0.3s ease-in-out;
`