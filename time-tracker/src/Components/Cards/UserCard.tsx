import './Styles/UserCardStyle.scss'
import {TIMEFRAME} from '../../Utils/defs'
import IMG from '../../Images/image-jeremy.png'

type UserCardProps = {
	className:string
	funcSetNewTimeFrame:(tf:TIMEFRAME) => void
}

export const UserCard = ({className, funcSetNewTimeFrame}: UserCardProps) => {
	const userCardClassName:string = className + ' user-card-container'

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
					<li onClick={() => {funcSetNewTimeFrame(TIMEFRAME.DAILY)}}>Daily</li>
					<li onClick={() => {funcSetNewTimeFrame(TIMEFRAME.WEEKLY)}}>Weekly</li>
					<li onClick={() => {funcSetNewTimeFrame(TIMEFRAME.MONTHLY)}}>Monthly</li>
				</ul>
			</section>
		</div>
	)
}