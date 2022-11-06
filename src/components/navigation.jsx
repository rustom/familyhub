import Button from './button'
import styled from 'styled-components'
import { Tabs, TabList, TabPanels, Tab, TabPanel, HStack, Link, Flex } from '@chakra-ui/react'

const Box = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export default function Navigation() {
    return (
        <>
        <Flex justifyContent='space-between' style={{marginTop: '40px', marginBottom: '40px'}}>
          <Link href={'/home'}>
            Home
          </Link>
          <Link href={'/new-family'}>
            New Family
          </Link>
          <Link href={'/join-family'}>
            Join Family
          </Link>
          <Link href={'/stats'}>
            Site Statistics
          </Link>
          <Link href={'/user-settings'}>
            User Settings
          </Link>
        </Flex>
      </>
        // <Box>
        //     <Button link={'/home'} title={'Home'} />
        //     <Button link={'/new-family'} title={'New Family'} />
        //     <Button link={'/join-family'} title={'Join Family'} />
        //     <Button link={'/stats'} title={'Site Statistics'} />
        //     <Button link={'/user-settings'} title={'User Settings'} />
        // </Box>
    )
}