import './Styles/MainPageStyle.scss'
import {Schedule, parseData, indexToGridClassName} from '../../Utils/defs'
import { useState, useEffect } from 'react'
import {CardFrame} from '../Cards/CardFrame'
import {UserCard} from '../Cards/UserCard'

type MainProps = {}

export const MainPage = (props: MainProps) => {
	const [schedule, setSchedule] = useState<Schedule>({} as Schedule)

	useEffect(() => {
		setSchedule(parseData())
	}, []) 

	if(schedule.scheduleCategories === null) {
		return (<p>Nothing to see</p>)
	}

  	return (
		<main>
			<div className='cards-grid'>
				<UserCard className='user-card'/>

				{
					schedule.scheduleCategories && schedule.scheduleCategories.map((scheduleFullEvent, idx) => {
						return <CardFrame key={idx} className={indexToGridClassName(idx)}  schedule={scheduleFullEvent} />
					})
				}
			</div>
		</main>
	)
}