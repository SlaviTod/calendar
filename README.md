
[`Elbetitsa calendar v.1.0.0`](https://drive.google.com/file/d/15y2TEzZEmRb91-l0QMz-avE8-0tVyhYp/view?usp=sharing)

# Elbetitsa Event Calendar

This application is a mobile app for vocal ensemble Elbetitsa (https://elbetitsa.eu) in order to schedule rehearsals and events (e.g. concerts and festivals).


## Get started

The app is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

In order to start the project You should install the .apk file on an Android device and start the app
[`Elbetitsa calendar v.1.0.0`](https://drive.google.com/file/d/15y2TEzZEmRb91-l0QMz-avE8-0tVyhYp/view?usp=sharing) 
Note: A user with the role 'User' cannot see private events on the Calendar. Please, for testing purposes of the calendar functionality, use the following user: 
email: test@softuni.bg
pass: Test11t%


# Functional Guide

## Project Overview
* Application Name: Elbetitsa Event Calendar ("Elbetitsa EC" for short)
* Application Category: Event Calendar 
* Main Purpose
The main purpose of the app is to schedule rehearsals and events (concerts and festivals). 
Elbetitsa is a female vocal ensemble, which sings polyphonic a cappella (without music accompaniment). When there is a rehearsal planned there should be a count of how many people from each voice will attend because it's crucial to know beforehand if there will be enough singers in the first place. This will also be used when there are public or private events (e.g. concerts, festivals, trips, parties, etc.).

## User Access & Permissions
- Guest (Not Authenticated) 
If the user is unauthenticated they can access: 
* the login screen;
* the register screen.

- Authenticated User
If the user is registered (and logged in) they can access:
* the home screen with public events (sorted by date in a descending order by default) and the event screen for details;
* the profile page, where they can change their name, password or profile image.


The full functionality is accessible for users with roles (Member of the Choir/Conductor), which includes: 
* the calender screen - which shows the current month with marked private events. At the moment there isn't a private event details screen so if You want to see details load the update screen. 

* create an event screen - the member or conductor can add a private event.

* update an event screen - authorized users can update a selected event.

* update voice (only for a User with the role Member).


## Authentication & Session Handling
### Authentication Flow
When the application starts it tries to load a user session from the Expo Secure Store. 
If there is none the App requires the user to log in. Login requires email and password. After a successful login the user is redirected to the Profile screen if they role is User, otherwise they get redirected to the Calendar screen, where the private events of the formation are marked to the calendar. By default the current month is loaded. 
If a user doesn't have an account, they may create one on the Registration screen. After a successful registration the user is automatically logged in and redirected to the profile screen.
On logout the user data that is stored in the app is cleared and the user is redirected to the Login screen. 

### Session Persistence
The user session data (User data and token) is stored in Expo Secure Store and retrieved when the app is started, so the user stays logged in. The React AuthContext is used for storing, updating (after the user data updates or the profile picture uploads), retrieving the user data and credentials, as well as for clearing the data after logout. 

## Navigation Structure
Root Navigation Logic
The project uses the Expo Router. All Tab Screens are placed in protected folder. 

The full navigation structure is:
* Root Stack Navigator 
    (protected) - screens that require authentication  
    /login - 
    /register
    /logout
* Protected Stack Navigator 
    (tabs)
    \modal
* Tabs Navigator: 
    \(tabs)\calendar
    \(tabs)\index
    \(tabs)\profile
* Calendar Nested Stack Navigator
The Calendar Tab is a nested Stack Navigator.
    \(tabs)\calendar\index
    \(tabs)\calendar\add-event
    \(tabs)\calendar\update-event

The Calendar Includes the following Screen Types:
* Standard screens  such as Home, Profile, Calendar, Create Event, Login, Register;
* Edit screen - Update Event Screen;
* Modal screen - Public Event Detail Screen. 
   
## List → Details Flowindex
List / Overview Screen 
The Home Screen display lists all public events of the Vocal Ensemble. In the list each event item shows the event title, start time and event image (if there is a missing picture for the particular event an image from the assets is shown).
User interactions:
    * Pull-to-refresh to refresh the event list; 
    * Load new items when you scroll to end of the list (infinite scroll); 
    * Open Event Details modal when press on the event item, in list.
Details Screen as modal 
The navigation is triggered by pressing on the event item in the list. 
The id of the public event is passed as a route parameter and is used to find the particular event data on the modal screen.
 
 
## Data Source & Backend
### Elbetitsa api 
The mobile app uses an existing api (https://elbetitsa.eu/api) which has: 
- a few public routes that already exist, such as:
   * /languages - for the supported languages;
   * /events - for the Elbetitsa public events, which use pagination (sorted by event date in a descending order)
   requires:   languageId, default: 1 [bg], 
               itemsPerPage, default: 5,
               currentPage, default: 1
   supports:   search by event title
   * /articles - at the moment it is only used for the 'about-us' section (requires languageId, default: 1 [bg]);
   * /users - for the user registration.
- some private routes, used to create/update/delete events, update profile, etc. that already exist;
- some routes and additional functionality was added, such as: 
   * CRUD for private events - repetitive (choir rehearsals) and one time (trips, parties, etc.) events;
   * marking and updating the attendance for private events.
Except for public events all requests to the backend are directed to the /mobile router in order to handle mobile authentication that differ from the one applied for the web. The full list of the accessible /mobile routes is placed in Elbetitsa types as ElbetitsaApiCalls.

### Elbetitsa types 
All used types, such as entity models, api requests & responses, enumerations, etc. are stored in the Elbetitsa TypeScript Library (the project can be found in elbetitsa-types folder of the initial [project](https://github.com/SlaviTod/elbetitsa-event-calendar)), that is imported in the project.
The build library files are placed in the /types folder of the project. 

## Data Operations (CRUD)
Description of the implemented data operations:
### Read (GET)
    • Home screen - Get all public events (paginated) 
 The pubic evens are fetched initially as a part of the refreshPublicEvents function. When a user goes on the Home screen (or returns to it) the list is refreshed and the initial public events are loaded. 
 Afterwards, public events are continuously fetched when the user scrolls to the bottom of the list (loadPublicEvents function passing current page, infinite scroll).
 The list is refreshed also when the user does a Pull-to-refresh. 

    • Calendar Screen - Get all private events (for the particular period - month) 
All private events for the particular month are fetched from the backend and then the data is used to mark the dates with the events on the calendar. When the user selects another month the private events data is fetched accordingly.   


When the user performs the long press on the day of the calendar (if the day is not passed) the action list is shown. If there is not any event for the selected day - only create-event is available, otherwise - create, update and delete are listed.   
### Create (POST)
    • create Private Event (add-event Screen) 
    The selected date is passed to the add-event Screen as params and is filled automatically. For all events except recurring-season rehearsal end date (that is need for the calendar) is set automatically to the end of the day or to the end of the event when the duration in minutes (these field require numeric keyboard) for event is set. For recurring events (season rehearsal) the end date is selected from the plain calendar. 
    The User can create different types of private events. Some of the fields are specific to some of them (such as day of the week and startAt for repetitive - season rehearsal). When the required fields are valid the user can save the new event in the DB. 

### Update (PUT)
    • update Private Event (update-event Screen)
    The event id and the event type are passed to the update-event Screen as route params and are used for the selection of the event data. 
    On the Update Event Screen the user can edit the event data (at the moment only start date cannot be updated) and save it in the DB if the form is valid. 
    
    • update user profile info (from Profile Screen)
    The User can update their first name, last name or voice (enumerated - soprano, alto, etc, if their role is member). If the user info is successfully updated in the DB, the login info in the app will be updated. 

    • change Password (from Profile Screen)
    The User can change the password if they provide the correct old password and a new password that meets the requirements. If the user password is successfully updated the user is notified with an alert. 

    • upload profile image (Profile Screen) 
    The User can select an image from the Phone Gallery (expo-image-picker is used) and upload it as a profile image. If the image is uploaded to the server successfully the user data is updated and also the UI in the header.  

### Delete 
    • delete Private Event (on the Calendar Screen)
    When the User performs the long press on the marked calendar day, the user can delete the event from the day. After the deletion, the day of the event is unmarked from the calendar. If the deleted event is a recurring one, all marked days get unmarked.
    
## Forms & Validation
### Forms Used
All Forms in the App are created with Formik and use Yup for validation. 
    * Login Form
    * Register Form
    * User Profile Form
    * Change Pass Form 
    * Event Form (create event)
    * Update Event Form 
### Validation Rules
On the Register Form: 
    * the validation rules for the firstName and lastName fields are:
        - is a string and isn't null (is required);
        - required min length (2);
        - required max length (20);
        - required regex pattern. 
    * the validation rules for the password are:
        - is a string and isn't null (is required);
        - required min length (8);
        - required max length (40);
        - required regex pattern (should contain at least one capital and one small letter, one number and one symbol from the list). 
On the Private Event Form 
    * the validation rules for the event title are:
        - required min length (2);
        - required max length (255);
        - required regex pattern. 
If any of the validation criteria is not met a validation error message is shown below the form field.
The User cannot submit a form if there is a validation error (Formik functionality). 

## Native Device Features
Used Native Feature
The app uses the Image Picker for uploading a user profile picture to the backend server. 

## Typical User Flow
A normal user journey (conductor/member) through the app follows these steps: 

0. First LogIn 
1. Calendar - current month
2. Select day and pick action from list 
3. create/update/delete event


## Error & Edge Case Handling
### Authentication errors 
Alert with the error description, that is sent from the server, is shown to the user. After that the User can resend the form. 

### Network or data errors - Empty or missing data states
Alert with the error description is shown to the user (or is logged).  
