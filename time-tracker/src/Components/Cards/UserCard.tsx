import './Styles/UserCardStyle.scss'

type UserCardProps = {
	className:string
}

export const UserCard = ({className}: UserCardProps) => {

	const userCardClassName:string = className + ' user-card-container'

	return (
		<div className={userCardClassName}>
			
		</div>
	)
}