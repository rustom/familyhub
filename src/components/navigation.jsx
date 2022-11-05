import Button from './button'
import styled from 'styled-components'

const Box = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export default function Navigation() {
    return (
        <Box>
            <Button link={'/home'} title={'Home'} />
            <Button link={'/new-family'} title={'New Family'} />
            <Button link={'/join-family'} title={'Join Family'} />
            <Button link={'/stats'} title={'Site Statistics'} />
            <Button link={'/user-settings'} title={'User Settings'} />
        </Box>
    )
}