import { useContext } from 'react'
import './Styles/CardFrameStyle.scss'

import PLAY_ICON from '../../Images/icon-play.svg'
import WORK_ICON from '../../Images/icon-work.svg'
import STDY_ICON from '../../Images/icon-study.svg'
import SOCL_ICON from '../../Images/icon-social.svg'
import EXEC_ICON from '../../Images/icon-exercise.svg'
import CARE_ICON from '../../Images/icon-self-care.svg'
import ELLIPSIS_ICON from '../../Images/icon-ellipsis.svg'

import {ScheduleCategory, TIMEFRAME, EventOccurance, timeframeSelectionContext} from '../../Utils/defs'

type CardProps = {
	className:string
	schedule:ScheduleCategory
}

export const CardFrame = ({className, schedule}: CardProps) => {
	const tfSelCtx:TIMEFRAME | undefined = useContext<TIMEFRAME | undefined>(timeframeSelectionContext)
	const timeframeSelection:TIMEFRAME = (tfSelCtx !== undefined) ? tfSelCtx : TIMEFRAME.DAILY

	const containerClassName:string = className + ' card-frame-container'

	const prevTimeframeTitle = ():string => {
		switch(timeframeSelection) {
			case TIMEFRAME.DAILY:
				return "Yesterday";
			case TIMEFRAME.WEEKLY:
				return "Last Week"
			case TIMEFRAME.MONTHLY:
				return "Last Month"
		}
	}

	const getImage = ():string => {
		switch(schedule.title) {
			case "Work":
				return WORK_ICON
			case "Play":
				return PLAY_ICON
			case "Study":
				return STDY_ICON
			case "Social":
				return SOCL_ICON
			case "Exercise":
				return EXEC_ICON
			case "Self Care":
				return CARE_ICON
			default:
				break
		}

		return PLAY_ICON
	}

	const getEvent = ():EventOccurance => {
		switch(timeframeSelection) {
			case TIMEFRAME.DAILY:
				return schedule.Events[0]
			case TIMEFRAME.WEEKLY:
				return schedule.Events[1]
			case TIMEFRAME.MONTHLY:
				return schedule.Events[2]
		}
	}

	const currentEventInfo:EventOccurance = getEvent()

	return (
		<section className={containerClassName}>
			<img src={getImage()} />
			<div className='cardinfo-frame'>
				<div className='cardinfo-frame-titlebar'>
					<span>{schedule.title}</span>
					<img src={ELLIPSIS_ICON} />
				</div>

				<div className='cardinfo-frame-data-content-frame'>
					<span className='cardinfo-frame-data-content-hours-worked'>{currentEventInfo.current}hrs</span>
					<span className='cardinfo-frame-data-content-hours-last-week'>{prevTimeframeTitle()} - {currentEventInfo.previous} hrs</span>
				</div>
			</div>
		</section>
	)
}

/*
<div className={containerClassName}>
	<p>{schedule.title}</p>

	{
		schedule.Events.map((schedEvt, idx) => {
			return <p key={idx}>{timeframeEnumToString(schedEvt.timeframe)} : {schedEvt.current} - {schedEvt.previous}</p>
		})
	}
</div>
*/