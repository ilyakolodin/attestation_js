import * as React from 'react'
import { userContext } from '../App'
import { useContext, useState } from 'react'
import { useGetPositionQuery, useGetAirQualityQuery, useAddDataMutation}  from '../redux'
import { Excel, Heading, Button, InputText} from '../components'

export function MainPage() {
	
	const [addData] = useAddDataMutation() 
	const { userName, userPassword } = useContext(userContext)
	
	const [text, setText] = useState<string>('')
	const [city, setCity] = useState<string>('')
	
	const { data: positionData} = useGetPositionQuery(city, {skip: !city})
	const { data: airQualityData } = useGetAirQualityQuery(positionData, {skip: !positionData})
	
	function handleClick() {
		setCity(text)
	}
	
	function handleChangeCity(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value)
    }
	
	function handleAddData() {
		addData({
					login: userName,
					password: userPassword,
					city: city,
					time: airQualityData.hourly.time,
					pm2_5: airQualityData.hourly.pm2_5,
					pm10: airQualityData.hourly.pm10,
				})
		alert("Данные добавлены в БД")
	}
	
	const headers = ['Время', 'Количество частиц pm10', 'Количество частиц pm2_5']
	
 	return (
		<>
			<Heading>Получение данных</Heading>
			<InputText placeholder="Город" type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeCity(event)}/>
			<Button onClick={handleClick}>Запрос</Button>
			{airQualityData && <Button onClick={handleAddData}>Сохранить в БД</Button>}
			{airQualityData && <Excel data={airQualityData.hourly} headers={headers}/>}
		</>
	)
}
