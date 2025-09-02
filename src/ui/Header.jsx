import styled from "styled-components"
import Logout from "../features/authentication/Logout"

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);;
    padding: 4rem  4.8rem 2rem;
`


export default function Header() {
  return (
    <StyledHeader>
      <Logout />
    </StyledHeader>
  )
}
