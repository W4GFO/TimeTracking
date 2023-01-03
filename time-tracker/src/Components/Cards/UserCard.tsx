import './Styles/UserCardStyle.scss'
import {TIMEFRAME} from '../../Utils/defs'

type UserCardProps = {
	className:string
	funcSetNewTimeFrame:(tf:TIMEFRAME) => void
}

export const UserCard = ({className, funcSetNewTimeFrame}: UserCardProps) => {
	const userCardClassName:string = className + ' user-card-container'

	return (
		<div className={userCardClassName}>
			<section className='user-card-person'>
				<p>Report for:</p>
				<p>Jeremy Robson</p>
			</section>
			<section className='user-card-timeframes-frame'>
				<ul className='user-card-list-of-timeframes'>
					<li onClick={() => {funcSetNewTimeFrame(TIMEFRAME.DAILY)}}>Daily</li>
					<li onClick={() => {funcSetNewTimeFrame(TIMEFRAME.WEEKLY)}}>Weekly</li>
					<li onClick={() => {funcSetNewTimeFrame(TIMEFRAME.MONTHLY)}}>Monthly</li>
				</ul>
			</section>
		</div>
	)
}