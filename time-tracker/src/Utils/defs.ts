import { createContext } from 'react'
import schedule from './data.json'

export const NUM_CARDS:number = 6

export enum TIMEFRAME {
	DAILY,
	WEEKLY,
	MONTHLY
}

export const timeframeSelectionContext: React.Context<TIMEFRAME | undefined> = createContext<TIMEFRAME | undefined>(undefined)

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
	scheduleCategories:ScheduleCategory[]
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
	completeSchedule.scheduleCategories = []

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

			completeSchedule.scheduleCategories.push(category)
		})

		return completeSchedule
}