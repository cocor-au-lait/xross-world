import React, { useState } from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility'

const TableWrapper = styled.div`
  table,
  th,
  td {
    border-collapse: collapse;
    border: 1px solid #333;
  }
`

const Cell = styled.td<{
  block: boolean
}>`
  background-color: ${props => (props.block ? 'black' : 'white')};
  padding: 4px;
`

const data = [
  {
    text: 'はっかそん',
    direction: 'vertical',
    head: { x: 0, y: 0 },
  },
  {
    text: 'そーすこーど',
    direction: 'horizontal',
    head: { x: 0, y: 3 },
  },
  {
    text: 'しこうさくご',
    direction: 'vertical',
    head: { x: 3, y: 2 },
  },
  {
    text: 'せいさく',
    direction: 'horizontal',
    head: { x: 0, y: 6 },
  },
]

const width = Math.max(
  ...data
    .filter(d => d.direction === 'horizontal')
    .map(d => d.head.x + d.text.length)
)
const height = Math.max(
  ...data
    .filter(d => d.direction === 'vertical')
    .map(d => d.head.y + d.text.length)
)

const tableData: string[][] = new Array(width).fill('')
tableData.forEach((_, i) => {
  tableData[i] = new Array(height).fill('')
})

data.forEach(d => {
  for (let i = 0; i < d.text.length; i++) {
    const char = d.text.charAt(i)
    if (d.direction === 'horizontal') {
      tableData[d.head.x + i][d.head.y] = char
    } else {
      tableData[d.head.x][d.head.y + i] = char
    }
  }
})

console.log(tableData)

const Puzzle: NextPage = () => {
  const [visibleTexts, setVisibleTexts] = useState(false)

  return (
    <Box>
      <TableWrapper>
        <table>
          <tbody>
            {tableData.map((tr, i) => (
              <tr key={i}>
                {tr.map((td, j) => (
                  <Cell key={j} block={td === ''}>
                    {visibleTexts ? td : ''}
                  </Cell>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>

      <IconButton
        aria-label="delete"
        onClick={() => setVisibleTexts(!visibleTexts)}
      >
        <VisibilityIcon />
      </IconButton>
    </Box>
  )
}

export default Puzzle
