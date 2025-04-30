import styled from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import Input from './ui/Input'
import Button from './ui/Button'
import Heading from './ui/Heading'
import Row from './ui/Row'




const StyledApp = styled.div`
  padding: 20px;
`

export default function App() {
  return (
    <>
    <GlobalStyle />
    <StyledApp>
      <Row>
      <Row type='horizontal'>
          <Heading as='h1'>The Wild Oasis</Heading>

          <div>
            <Heading as='h2'>Check in and out</Heading>
            <Button 
            variations='primary'
            sizes='medium'
            onClick={()=> alert('checked in? What is your name??')}>Check in</Button>

            <Button 
            variations='secondary'
            sizes='small'
            onClick={()=> alert('checked in? What is your name??')}>Check out</Button>
          </div>
        </Row>
        
        <Row type='vertical'>
          <Heading as='h3'>Forms</Heading>
          <form action="">
            <Input type='number' placeholder='Number of guests'/>
            <Input type='number' placeholder='Number of guests'/>
          </form>
        </Row>
      </Row>
    </StyledApp>
    </>
  )
}
