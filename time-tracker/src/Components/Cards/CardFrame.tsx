import './Styles/CardFrameStyle.scss'
import {ScheduleCategory, timeframeEnumToString} from '../../Utils/defs'

type CardProps = {
	className:string
	schedule:ScheduleCategory
}

export const CardFrame = ({className, schedule}: CardProps) => {
	const containerClassName:string = className + ' card-frame-container'

	return (
		<div className={containerClassName}>
			<p>{schedule.title}</p>

			{
				schedule.Events.map((schedEvt, idx) => {
					return <p key={idx}>{timeframeEnumToString(schedEvt.timeframe)} : {schedEvt.current} - {schedEvt.previous}</p>
				})
			}

		</div>
	)
}