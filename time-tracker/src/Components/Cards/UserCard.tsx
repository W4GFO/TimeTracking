import './Styles/UserCardStyle.scss'
import { useContext } from 'react'
import {TIMEFRAME, timeframeSelectionContext} from '../../Utils/defs'
import IMG from '../../Images/image-jeremy.png'

type UserCardProps = {
	className:string
	funcSetNewTimeFrame:(tf:TIMEFRAME) => void
}

export const UserCard = ({className, funcSetNewTimeFrame}: UserCardProps) => {
	const userCardClassName:string = className + ' user-card-container'

	const tfctx:TIMEFRAME | undefined = useContext<TIMEFRAME | undefined>(timeframeSelectionContext)
	const selectedTimeframe:TIMEFRAME = (tfctx !== undefined) ? tfctx : TIMEFRAME.DAILY

	return (
		<div className={userCardClassName}>
			<section className='user-card-person'>
				<div className='user-card-person-imageinfo'>
					<img src={IMG}/>
				</div>

				<div className='user-card-person-textinfo'>
					<p>Report for:</p>
					<p>Jeremy Robson</p>
				</div>
			</section>
			<section className='user-card-timeframes-frame'>
				<ul className='user-card-list-of-timeframes'>
					<li className={(selectedTimeframe === TIMEFRAME.DAILY ? 'user-selected-timeframe-decoration' : '')}
						onClick={() => {funcSetNewTimeFrame(TIMEFRAME.DAILY)}}>Daily</li>
					<li className={(selectedTimeframe === TIMEFRAME.WEEKLY ? 'user-selected-timeframe-decoration' : '')}
						onClick={() => {funcSetNewTimeFrame(TIMEFRAME.WEEKLY)}}>Weekly</li>
					<li className={(selectedTimeframe === TIMEFRAME.MONTHLY ? 'user-selected-timeframe-decoration' : '')}
						onClick={() => {funcSetNewTimeFrame(TIMEFRAME.MONTHLY)}}>Monthly</li>
				</ul>
			</section>
		</div>
	)
}