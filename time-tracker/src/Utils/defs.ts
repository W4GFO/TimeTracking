import { createContext } from 'react'
import schedule from './data.json'

export const NUM_CARDS:number = 6

export enum TIMEFRAME {
	DAILY,
	WEEKLY,
	MONTHLY
}

export type EventOccurance = {
	timeframe:TIMEFRAME
	current:number
	previous:number
}

export type ScheduleCategory = {
	title:string
	Events:EventOccurance[]
}

export type Schedule = {
	TopLevel:ScheduleCategory[] //Bad naming - had the Firebase DB set up and couldn't rename the node without deleting everything - so, bad naming here
}

export type FireEventEntry = {
	id:string
	current:number
	previous:number
}

export type FireTimeFrames = {
	daily:FireEventEntry
	weekly:FireEventEntry
	monthly:FireEventEntry
}

export type FireTimeFrame = {
	title:string
	timeframes:FireTimeFrames

}
export type FireSchedule = {
	TopLevel:FireTimeFrame[]
}

export const indexToGridClassName = (idx:number):string => {
	switch(idx) {
		case 0:
			return 'cal-evt1'
		case 1:
			return 'cal-evt2'
		case 2:
			return 'cal-evt3'
		case 3:
			return 'cal-evt4'
		case 4:
			return 'cal-evt5'
		case 5:
			return 'cal-evt6'
	}

	return 'sch1'
}

export const timeframeEnumToString = (tf:TIMEFRAME):string => {
	switch(tf) {
		case TIMEFRAME.DAILY:
			return 'daily'
		case TIMEFRAME.WEEKLY:
			return 'weekly'
		case TIMEFRAME.MONTHLY:
			return 'monthly'
	}
}

export const timeframeStringToEnum = (strTF:string):TIMEFRAME => {
	switch(strTF) {
		case 'daily':
			return TIMEFRAME.DAILY
		case 'weekly':
			return TIMEFRAME.WEEKLY
		case 'monthly':
			return TIMEFRAME.MONTHLY
	}

	return TIMEFRAME.DAILY
}

export const parseData = ():Schedule => {
	let completeSchedule:Schedule = {} as Schedule
	completeSchedule.TopLevel = []

		//Each element is an element containing three categories - daily, weekly, monthly
		//schedule.map((elmt) => {
		schedule.forEach((elmt) => {
			let category:ScheduleCategory = {} as ScheduleCategory
			category.Events = []

			category.title = elmt.title

			let dailyEvent:EventOccurance = {} as EventOccurance
			dailyEvent.timeframe = TIMEFRAME.DAILY
			dailyEvent.current = elmt.timeframes.daily.current
			dailyEvent.previous = elmt.timeframes.daily.previous

			let weeklyEvent:EventOccurance = {} as EventOccurance
			weeklyEvent.timeframe = TIMEFRAME.WEEKLY
			weeklyEvent.current = elmt.timeframes.weekly.current
			weeklyEvent.previous = elmt.timeframes.weekly.previous

			let monthlyEvent:EventOccurance = {} as EventOccurance
			monthlyEvent.timeframe = TIMEFRAME.MONTHLY
			monthlyEvent.current = elmt.timeframes.monthly.current
			monthlyEvent.previous = elmt.timeframes.monthly.previous

			//We're adding these into the array specifically in this 
			//order so we can just pull the values out based on the 
			//value contained in the TIMEFRAME enum.
			category.Events.push(dailyEvent)
			category.Events.push(weeklyEvent)
			category.Events.push(monthlyEvent)

			completeSchedule.TopLevel.push(category)
		})

		return completeSchedule
}

//This is here for two reasons:
// 1: Our Firebase DB has a top level naming requirment our sample data json file doesn't follow.
// 2: So anyone using this code base can just as easily use the json data file if they choose as
//    this method will only be called in a single place after Firebase delivers it's data.
//    So, just comment out a couple of lines and you'll be back reading the  original data file.
export const FireScheduleToLocalScheduleType = (fireSchedule:FireSchedule):Schedule|undefined => {
	if( (fireSchedule.TopLevel === undefined) || (fireSchedule.TopLevel.length <= 0) || (fireSchedule.TopLevel[0].timeframes === undefined) ) {
		return undefined
	}

	//Be sure everything is initialized and allocated appropriately
	let completeSchedule:Schedule = {} as Schedule
	completeSchedule.TopLevel = [] as ScheduleCategory[]

	fireSchedule.TopLevel.forEach((tf:FireTimeFrame) =>{
		let scheduleCategory:ScheduleCategory = {} as ScheduleCategory
		scheduleCategory.Events = [] as EventOccurance[]

		scheduleCategory.title = tf.title

		let dailyEvent:EventOccurance = {} as EventOccurance
		dailyEvent.timeframe = TIMEFRAME.DAILY
		dailyEvent.current = tf.timeframes.daily.current
		dailyEvent.previous = tf.timeframes.daily.previous

		let weeklyEvent:EventOccurance = {} as EventOccurance
		weeklyEvent.timeframe = TIMEFRAME.WEEKLY
		weeklyEvent.current = tf.timeframes.weekly.current
		weeklyEvent.previous = tf.timeframes.weekly.previous

		let monthlyEvent:EventOccurance = {} as EventOccurance
		monthlyEvent.timeframe = TIMEFRAME.MONTHLY
		monthlyEvent.current = tf.timeframes.monthly.current
		monthlyEvent.previous = tf.timeframes.monthly.previous

		//We're adding these into the array specifically in this 
		//order so we can just pull the values out based on the 
		//value contained in the TIMEFRAME enum.
		scheduleCategory.Events.push(dailyEvent)
		scheduleCategory.Events.push(weeklyEvent)
		scheduleCategory.Events.push(monthlyEvent)

		completeSchedule.TopLevel.push(scheduleCategory)
	})

	return completeSchedule
}

export const userScheduleContext:React.Context<Schedule | undefined> = createContext<Schedule | undefined>(undefined)
export const timeframeSelectionContext: React.Context<TIMEFRAME | undefined> = createContext<TIMEFRAME | undefined>(undefined)