import * as React from 'react'
import { userContext } from '../App'
import { useContext, useState } from 'react'
import { useGetDataQuery, useAddRecordMutation }  from '../redux'
import { Excel, Heading, Button, InputText, SmallContainer} from '../components'

export function EditPage() {

	const [dataForAdd, setDataForAdd] = useState<{time: string[], pm2_5: number[], pm10: number[]}>({time: [], pm2_5: [], pm10: []})
	
	const [addRecord] = useAddRecordMutation() 
	const { userName, userPassword } = useContext(userContext)
	const { data: data, refetch: refetchData} = useGetDataQuery({login: userName, password: userPassword}, { refetchOnMountOrArgChange: true })
	
	function handleChangeTime(event: React.ChangeEvent<HTMLInputElement>) {
		setDataForAdd(dataForAdd => ({
			...dataForAdd,
			time: [event.target.value]
		}))
	}

	function handleChangePm25(event: React.ChangeEvent<HTMLInputElement>) {
		setDataForAdd(dataForAdd => ({
			...dataForAdd,
			pm2_5: [Number(event.target.value)]
		}))
	}

	function handleChangePm10(event: React.ChangeEvent<HTMLInputElement>) {
		setDataForAdd(dataForAdd => ({
			...dataForAdd,
			pm10: [Number(event.target.value)]
		}))
	}

	function handleAddRecord() {
		addRecord({
					login: userName,
					password: userPassword,
					time: dataForAdd.time,
					pm2_5: dataForAdd.pm2_5,
					pm10: dataForAdd.pm10,
				})
		refetchData()
		alert("Строка добавлена в БД")
	}

	const headers = ['Время', 'Количество частиц pm10', 'Количество частиц pm2_5']
 	return (
		<>
			<Heading>Редактирование данных</Heading>
			<InputText placeholder="time" type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeTime(event)}/>
			<InputText placeholder="pm10" type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangePm10(event)}/>
			<InputText placeholder="pm2_5" type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangePm25(event)}/>
			<Button onClick={handleAddRecord}>Добавить</Button>
			{data && <SmallContainer>Город: { data.city }</SmallContainer>}
			{data && <Excel data={{time: data.time, pm2_5: data.pm2_5 , pm10: data.pm10}} headers={headers}/>}
		</>
	)
}
