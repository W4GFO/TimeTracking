import './App.scss'

import {MainPage} from './Components/Parent/MainPage'
import {useState, useEffect} from 'react'
import {Schedule, FireSchedule, userScheduleContext, FireScheduleToLocalScheduleType} from './Utils/defs'

import * as fire from './Utils/FirebaseUtils'
import {onAuthStateChanged, signInWithPopup} from 'firebase/auth'
import { DocumentData, DocumentSnapshot, doc, onSnapshot } from 'firebase/firestore'

//These represent the exact names used in the Firebase DB
const CollectionName:string = 'schedules'
const DocumentName:string = 'current'

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
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

  const onLogInOut = async () => {
    try {
      const results = await signInWithPopup(fire.FirebaseAuth, fire.GoogleFirebaseAuthProvider)
    }
    catch(error) {
      console.log("There's an issue logging into the backend services: " + error)
    }
  }

  //This is the callback from Firebase.  So don't try to determined logged-In/Out status anywhere else.
  //Instead, call your log In/Out calls and wait for this callback to occur to set up any state or other
  //logic you have which is dependent on the user's access status.
  onAuthStateChanged(fire.FirebaseAuth, user => {
    setLoggedIn((user !== null) && (user.uid !== undefined) && (user.uid.length === 12))
  })

  return (
    <div className='app'>
      <userScheduleContext.Provider value={usersSchedule}>
        <MainPage />
        <button onClick={onLogInOut}>Log In/Out</button>
      </userScheduleContext.Provider>
    </div>
  );
}

export default App;