import './App.scss'

import {MainPage} from './Components/Parent/MainPage'
import {useState, useEffect} from 'react'
import {Schedule, FireSchedule, userScheduleContext, FireScheduleToLocalScheduleType} from './Utils/defs'

import * as fire from './Utils/FirebaseUtils'
import { DocumentData, DocumentSnapshot, doc, onSnapshot } from 'firebase/firestore'

//These represent the exact names used in the Firebase DB
const CollectionName:string = 'schedules'
const DocumentName:string = 'current'

function App() {
  const [usersSchedule, setUsersSchedule] = useState<Schedule | undefined>({} as Schedule)

  const processSchedule = (doc:DocumentSnapshot<DocumentData>) => {
    const schfb:FireSchedule = doc.data() as FireSchedule

    const sch:Schedule | undefined = FireScheduleToLocalScheduleType(schfb)

    if(sch === undefined) {
      return
    }

    setUsersSchedule(sch)
  }

  useEffect(() => {
    let userScheduleDoc = doc(fire.FirebaseDB, CollectionName, DocumentName)

    const unsubscribeFunc = onSnapshot(userScheduleDoc, (doc) => {processSchedule(doc)})

    /*
    | I do it this way in case you wind up watching more than one document.
    | This way, all you need to do is keep adding the additional unsubscribe 
    | calls without any real code changes.
    | You can also just call return unsubscribeFunc() if you know you'll only
    | be watching a single document.
    */
    return () => {
      unsubscribeFunc()
    }
  }, [])

  return (
    <div className='app'>
      <userScheduleContext.Provider value={usersSchedule}>
        <MainPage />
      </userScheduleContext.Provider>
    </div>
  );
}

export default App;
