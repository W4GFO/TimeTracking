# TimeTracking

In the interest of giving something back to this platform, I wanted to put together a Firebase solution that anybody can freely copy and use for thier own projects.  

This project makes us of the Firebase Database and the Firebase Google authentication user account.

This project will update in real-time whenever there are changes to the back-end database and/or
the user's "logged In/Out" status changes.

I put this together because, sometimes figuring all this out through trial and error, endless searching, hours watching tutorial videos, guessing, and a bunch of StackOverflow can be pretty time consuming.

When I do include external documents in this project, I will try to make them as specific as possible.

# Data

The data for this project when originally downloaded from FrontEndMentor is using a JSON file.  
Since JSON is also the format of the Firebase Database, I was able to easily leverage the Firebase Database.  

All I basically did was take the data contained within the original file and set up the database with the same data - and more importatnly, in the same format.

In the Firebase project, I am using the FireStore Database service.  The database is set up as follows:

```
	Collection -> Document -> Collection -> Document -> [PATTERN REPEATS]
```

Essentially, a document must reside within a collection and documents canNOT contain other documents.

CAVEAT! - A document CAN contain a collection, which can then contain additional documents.
Below is a very useful link to explain this a little further.

https://firebase.google.com/docs/firestore/data-model


### Setting up Firebase with your React project

The first thing you'll want to do when setting up your React project with Firebase is to install firebase.

```
> npm install firebase
```

Below is a good link to get the overall concept to get firebase integrated when you're ready to dig in deeper.

https://firebase.google.com/docs/firestore/quickstart


## IMPORTANT PART!!!!!

Once you're ready to add in all the project information into your code segment ## DO NOT
place that into any file which will ever be put into a public repo!!!!!!!!!


### 


### The additional npms:

	I'm not really using anything much on this project other than SASS.

	```
	> npm install sass
	```

	NOTE: The only reason I'm using SASS is because I like the easy one line comment syntax and I like the syntax it uses for declaring variables.  Everything else is 100% pure CSS so don't worry if you don't know SASS very well.


# Go to https://firebase.google.com/

In the upper portion of the page "Go to console" 
* Here either select an existing project or create/Add a new one

In the upper righthand corner select the cog wheel next to "Project Overview"
* Then select "Project settings"

Scroll to the bottom of the page and if no app has been created, select the button to create 
a new web app.  It looks sort'a like an empty HTML tag (</>)

Then name it whatever you'd like
