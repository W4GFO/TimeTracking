import './Styles/MainPageStyle.scss'

import {UserCard} from '../Cards/UserCard'
import {CardFrame} from '../Cards/CardFrame'
import { useState, useEffect, useContext} from 'react'
import {timeframeSelectionContext, userScheduleContext, Schedule, indexToGridClassName, TIMEFRAME} from '../../Utils/defs'


type MainProps = {}

export const MainPage = (props: MainProps) => {
	const schedule:Schedule | undefined = useContext<Schedule | undefined>(userScheduleContext)

	//const [schedule, setSchedule] = useState<Schedule>({} as Schedule)//Uncomment to use the test json file
	const [timeframeSelection, setTimeFrameSelectioin] = useState<TIMEFRAME>(TIMEFRAME.DAILY)

	const updateTimeFrameSelection = (tf:TIMEFRAME) => {
		setTimeFrameSelectioin(tf)	
	}

	useEffect(() => {
		//setSchedule(parseData()) //Uncomment to use the test json file
	}, []) 

  	return (
		<main>
			<div className='cards-grid'>

			<timeframeSelectionContext.Provider value={timeframeSelection}>

				<UserCard className='user-card' funcSetNewTimeFrame={updateTimeFrameSelection}/>

				{
					schedule && schedule.TopLevel && schedule.TopLevel.map((scheduleFullEvent, idx) => {
						return <CardFrame key={idx} className={indexToGridClassName(idx)}  schedule={scheduleFullEvent} />
					})
				}

				</timeframeSelectionContext.Provider>
			</div>
		</main>
	)
}