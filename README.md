# TimeTracking

In the interest of giving something back to this platform, I wanted to put together a Firebase solution that anybody can freely copy and use for thier own projects.  

This project makes use of the FireStore Database and the Firebase Auth Google user login.

This project will update in real-time whenever there are changes to the back-end database and/or
the user's "logged In/Out" status changes.

I put this together because, sometimes figuring all this out through trial and error, endless searching, hours watching tutorial videos, guessing, and a bunch of StackOverflow can be pretty time consuming.

When I do include external links in this project, I will try to make them as specific as possible.

# Code Set up

***NOTE:*** I have the '>' as my prompt, so when I write a code segment/command, I have a leading '>' which isn't part of the command, but rather represents my command prompt.  ie:

```
> [THE COMMAND TO TYPE]
```

Above, you type only the command - without the leading '>'


### Immediately after CRA - you'll set up Firebase with your React project

The first thing you'll want to do when setting up your React project with Firebase is to install firebase.

```
> npm install firebase
```

Below is a good link to get the overall concept to get firebase integrated when you're ready to dig in deeper.

<a href="https://firebase.google.com/docs/firestore/quickstart" target="_blank">Firebase Quick Start</a>

# The project

In this React project, I've kept the Firebase specific functionality very localized for understanding's sake.

1st: The FirebaseUtils.ts is the file I am using just to creats/allocate the Firebase specific variables.  These variables are used later-on to access the Firebase functionality.

2nd: The Firebase functionality is contained within the App.tsx file. Specifically:
	
* Within the useEffect - the onSnapshot allows us to "monitor" the real-time updates of the FireStore Database.

* The onLogInOut function which is called when the dummy button is clicked 
	I've removed this button since it isn't really part of the UI.
	Thus, its code is just commented out.

* The onAuthStateChanged function so we are notified whenever the user's "Logged-In" status changes

It's important to keep in mind that you can do all the UI for login/out anywhere - ***HOWEVER*** you should ***ALWAYS*** rely on this callback to make the determination if the user is logged in or not.  

For example: call user logout from whereever, but do ***NOT*** assume that user is logged out until this callback is called with the user's status!  Trust me on this one...

	

**NOTE:** There is a minor descrepency between the initial data in the JSON file and the way the FireStore DB is configured so there is a translation function - **BUT** it isn't really relevant to Firebase functionality within a React Project - just something specific to this one.

# Data

The data for this project included in the original download from FrontEndMentor is using a JSON file.  
Since JSON is also the format of the Firebase Database, I was able to easily leverage the Firebase Database.  

All I basically did was take the data contained within the original file and set up the database with the same data - and more importatnly, in the same format.

In the Firebase project, I am using the FireStore Database service.  

Let's now go ahead and configure our Firebase project before we jump too far ahead.

# Setting up and Configuring Firebase

***FIRST*** You must set up at least one Firebase project


1. Go to https://firebase.google.com/ and then go to the Firebase Console (It should be in the upper righthand side of browser window ):

![Firebase Console](./fireimages/1.png)

2. Next, you'll either select an existing Firebase project - or create one.  If you're creating one, select the "Add" option:

![Firebase New Project](./fireimages/22.png)

* Now just walk through the steps, providing name, etc... 

* Quick note - Firebase projects contain Firebase Applications - This will become relevant in step 3.

Below is a link with more than you'll ever want to know about Firebase projects:

<a href="https://firebase.google.com/docs/projects/learn-more?authuser=0&hl=en" target="_blank">Firebase Projects</a>


2. Next, you'll want to open the project's settings

![Firebase New Project](./fireimages/2.png)

3. Scroll down to the bottom of the page and select the button to create a new web application:

![Firebase Web Appliction](./fireimages/3.png)

4. Give your web app any name you'd like:

![Firebase Web Appliction name](./fireimages/4.png)

5. Now that you've set up your web application in your Firebase project - you're presented with the settings you'll need to incorporate into your React Project: (NOTE: This is essentially what makes up my entire FirebaseUtils.ts file - with the exception I point out below)

![Firebase Web Appliction name](./fireimages/5.png)

## WARNING!!!!!!!!  IMPORTANT PART!!!!!

Once you're ready to add in all the project information into your code segment ***DO NOT***
place the configuration keys and IDs into any file which will ever be put into a repo!!!!!!!!!

Instead, create the following file in the project's root directory - ie: The same level as your package.json file.  Additionally - Make ***ABSOLUTELY CERTAIN*** this file is in your .gitignore so that it ***NEVER*** gets commited to your repo!  ***ESPECIALLY*** a public repo!

```
> touch .env.local
```

The above file's naming convention must be exact

Now, all those crazy numbers and values you see that Firebase is presenting, place those values into your .env.local file.  Below is an example of what your .env.local file might look like (NOTICE - No quotes anywhere).  

Also, the naming convention is critical!  The environment variable's name MUST start with "REACT_APP_" followed by whatever you want - otherwise the variables won't get read in by the environment.

On line 23 of my FirebaseUtils.ts file you can see where I read these variables in.

```
REACT_APP_API_KEY=QRbcMaBCabcORASDVrm123aBcd4F9BcUrsW_ABc
REACT_APP_AUTH_DOMAIN=somecoolprojects-4a4ab.firebaseapp.com
REACT_APP_PROJ_ID=somecoolprojects-4a4ab
REACT_APP_STORAGEBUCKET=somecoolprojects-4a4ab.appspot.com
REACT_APP_MESSAGING_SENDER_ID=246810121418
REACT_APP_APP_ID=8:456789012345:web:i12aaccgg24567w12x3g48
REACT_APP_MEASUREMENT_ID=A-BC1A2987BD
```

***NOTE:***  Lastly, remember that this is a file of environment variables and remember that environment variables are only read in once by an application and that happens only when the app starts.  So, be sure after creating, entering the keys, and saving this file that you restart your IDE.  So if you notice your variables aren't being read in - it's a good bet this is why. 


6. Now go back into your Firebase project and set up the FireStore database.  You'll need to select the service to create, then create it:

Select the service (The database and authentication are selected for display purposes.  You'll do the same for both, just one at a time.)

![Firebase Services](./fireimages/6.png)

- Instantiate the FireStore service (We'll look at setting up the DB itself in a moment)

![FireStore Service](./fireimages/7.png)

***NOTE:*** For a test/dev project, using the initial testing permissions will probably serve you best until you understand Firebases security rules. Below is a good place to learn more.

<a href="https://firebase.google.com/docs/rules" target="_blank">Firebase Sec. Rules</a>

- Instantiate the Authentication service (We'll set this up here at the same time)

![Firebase Auth Service](./fireimages/Auth1.png)

- Now we'll set up Google as our federated authority provider. ie: The external service we'll use to trust user's login credentials within our own project. (You can use any, but Google is by far the easiest and will get you up and running the fastest.)

![Firebase Auth Service](./fireimages/Auth2.png)

- Your project ID will be different and you'll need to set the support email.  FYI - neither this project ID nor any of the values I show for the .env.local are real, just an FYI in case anyone was wondering.  I just don't want this documentation to wind up looking like one of those redacted previously classified government documents. 

![Firebase Auth Service](./fireimages/Auth3.png)

For your furture reference - we're setting up the backend before we run a bunch of stuff on our web client simple because if the services are set up in Firebase before running the client, you just wind up with a bunch of error logs on your client/dev window.  This isn't about having or not having data in a database, but if you go to try and allocate the DB service on your client, you'll see the errors, same goes for Auth.  It isn't whether you have any users or not, it's if the service has been allocated to the project's application that will cause all the nasty errors to pop-up.


# The Database

Let's start by looking at an image which represents what your FireStore database is going to look for this project:

![FireStore Data](./fireimages/10.png)

So, what exactly are we looking at?

1. The "schedules" column represents a collection
2. The "current" column represents a document within the "schedules" collection
3. The "TopLevel" column represnts the contents of the "current" document
- This is what represents the JSON which is contained in the 
JSON document provided in the original project download
4. Here, you'll notice we needed to name our toplevel array for FireStore to be happy
5. This is the one difference from the original file.
- Thus, the translation function mentioned earlier

## Two things to point out about the database

1. The database is set up as follows:

```
	Collection -> Document -> Collection -> Document -> [PATTERN REPEATS]
```

Essentially, a document must reside within a collection and documents canNOT contain other documents.

CAVEAT! - A document CAN contain a collection, which can then contain additional documents.
Below is a very useful link to explain this a little further.

<a href="https://firebase.google.com/docs/firestore/data-model" target="_blank">FireStore Data Model</a>

2. When you're entering data into the FireStore's UI, you will choose "MAP" to represent a JSON object.
- For example, in the image, current and previous are numbers
- However, timeframes, daily, monthly, and weekly are all MAP types.