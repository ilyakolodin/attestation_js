import * as React from 'react'
import styled from 'styled-components'

const CenterTable = styled.table`
	margin-left: auto;
	margin-right: auto;
	margin-top: 20px;
	border-collapse: collapse;
`

const TdBordered = styled.td`
	border-collapse: collapse;
	border: 2px solid black;
	padding: 4px;
`

const TheadBold = styled.thead`
	font-weight: bold;
`

export const Excel = ({data, headers}: {data: {time: string[], pm2_5: number[], pm10: number[]}, headers: string[]}) => {
	
	const transformed_data = []
	for ( let i = 0; i < data.time.length; i++){
		transformed_data.push([data.time[i], data.pm10[i], data.pm2_5[i]])
	}

    return (
		<CenterTable>
			<TheadBold>
				<tr>
					{headers.map((v: string, idx: number) => (
						<TdBordered key={idx}>{v}</TdBordered>
					))}
				</tr>
			</TheadBold>
			<tbody>
				{transformed_data.map((row, idx) => (
					<tr key={idx}>
						{row.map((cell, idx) => (
							<TdBordered key={idx}>{cell}</TdBordered>
						))}
					</tr>
				))}
			</tbody>
		</CenterTable>
    )
}