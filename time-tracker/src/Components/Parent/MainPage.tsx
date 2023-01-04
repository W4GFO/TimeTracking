import './Styles/MainPageStyle.scss'
import {timeframeSelectionContext, Schedule, parseData, indexToGridClassName, TIMEFRAME} from '../../Utils/defs'
import { useState, useEffect } from 'react'
import {CardFrame} from '../Cards/CardFrame'
import {UserCard} from '../Cards/UserCard'

import {timeframeEnumToString} from '../../Utils/defs'

type MainProps = {}

export const MainPage = (props: MainProps) => {
	const [schedule, setSchedule] = useState<Schedule>({} as Schedule)
	const [timeframeSelection, setTimeFrameSelectioin] = useState<TIMEFRAME>(TIMEFRAME.DAILY)

	const updateTimeFrameSelection = (tf:TIMEFRAME) => {
		setTimeFrameSelectioin(tf)	
	}

	useEffect(() => {
		setSchedule(parseData())
	}, []) 

	if(schedule.scheduleCategories === null) {
		return (<p>Nothing to see</p>)
	}

  	return (
		<main>
			<div className='cards-grid'>

			<timeframeSelectionContext.Provider value={timeframeSelection}>

				<UserCard className='user-card' funcSetNewTimeFrame={updateTimeFrameSelection}/>

				{
					schedule.scheduleCategories && schedule.scheduleCategories.map((scheduleFullEvent, idx) => {
						return <CardFrame key={idx} className={indexToGridClassName(idx)}  schedule={scheduleFullEvent} />
					})
				}

				</timeframeSelectionContext.Provider>
			</div>
		</main>
	)
}