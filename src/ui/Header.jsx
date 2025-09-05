import styled from "styled-components"
import HeaderMenu from "./HeaderMenu"
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);;
    padding: 4rem  4.8rem 2rem;
`


export default function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  )
}
