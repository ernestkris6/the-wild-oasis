import React from 'react'
import styled from 'styled-components'

const H1 = styled.h1`
font-size: 30px;
font-weight: 900;
`

const Button = styled.button`
background-color: purple;
color: white;
`

const StyledApp = styled.div`
  background-color: green;
`

export default function App() {
  return (
    <StyledApp>
      <H1>App</H1>
      
      <Button onClick={()=> alert('checked in? What is your name??')}>Check in</Button>
    </StyledApp>
  )
}
