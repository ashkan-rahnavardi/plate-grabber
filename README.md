# To Do

### Form Page

- [ ] Redirect user to home page after form save or update
  - [ ] First user gets an alert displaying if save/update was successful
    - [ ] if successful redirect to homepage
    - [ ] if unsuccessful stay on current form page & highlight sections that need to be filled out
  - [ ] make sure that the forms displayed on the homepage are updated to include the newly saved/updated form
    - [ ] Will have to update FormsContext since that is what's used to display the form summaries on the homepage
- [ ] Change the layout of the forms to be more user friendly, everything doesn't need to be on one line
  - [ ] will have to restructure the Form Model as well to make sense with the new layout
    - [ ] Every road has block(s) and every block has side(s)
  - [ ] Add a button to add plates

### Home Page

- [ ] Update Form OverView
  - [ ] Change the actions column to be a view/edit icon
  - [ ] Selected forms can be deleted
- [ ] 404 page not found if you try to go to a forms URL which does not exist in your Forms Context
  - [ ] currently going to a form which doesn't exist acts like going to form/new

### Authentication & Data retrieval

- [ ] Store the form data in the Session, removing the need for a separate FormsProvider
- [ ] Research/Test the downsides of my current approach of having an async RootLayout which preloads all the data from the backend. Does it introduce any security flaws?

### Camera

- [ ] Set up react-pro-cam
- [ ] Set up api so every time a photo is taken the license plate is extracted (similar to plate grabber v1)
  - [ ] After the photo is taken the user can decide whether or not to add the plate to the sheet
  - [ ] The user can also change the street, block and side that the plate belongs to
  - [ ] save the photo to the data base as well?

### View Plates

- [ ] Create a new component or page to display all of the license plates stored in a form.
- [ ] Can maybe make it so only the extracted text of the license plate is shown, but then clicking on the text shows you the photo associated with that plate.
  - [ ] Would only have to make an api call to the database to get one photo at a time, improving performance.
- [ ] Have a view all photos button which opens up a carousel
  - [ ] the carousel shows one photo at a time and the associated extracted license plate information
  - [ ] You'd be able to edit the extracted text license plate in case the API gets it wrong
- [ ] _Clicking on the extracted text to view plate and the view all photos are redundant, think of a better more simple UI when you get to this stage _

# Project Structure

In order to reduce props drilling I have made session and forms data available to all client components through the SessionProvider and FormsProvider.

## Authentication & Data Retrieval

next-auth v4 is currently being used for authentication, which does not work the best with nextjs 14's app router. I tried next-auth v5 which is still in beta, and I ran into some app breaking problems so I've reverted back to v4.

- Currently the root layout component of my application is asynchronous, which is not ideal.
- In the RootLayout I retrieve the session from the server
- The session contains the users email, which is used with a server action to retrieve all of the forms belonging to that user
- The session is passed as a prop to the SessionProvider, making it available to all of the children
- The forms are passed as a prop to the FormsProvider, also making them available to all of the children

**Possible Solutions: **

- Making the RouteLayout a server component, getting the Forms and Session data there through the server, then passing them down as props to the children, The children page would then be a client component, which would wrap its children in the SessionProvider, FormsProvider and Theme Provider

## Homepage

_src/containers/home/index.tsx_

The landing page of the application after the user has been authenticated. Consists of 3 components: TopNav, DataTable, and NewFormButton.

Aquires the list of forms associated with the user through the FormsContext, and passes it down to the DataTable.

### Top Nav

_src/components/TopNav/index.tsx_
The Top Nav of the application which displays the UserNav and the DarkMode Toggle

#### UserNav

_src/components/TopNav/userNav.tsx_
Displays the User Avatar, clicking the avatar opens a drop down menu with actions pertaining to the user. The profile and settings options are currently just placeholders.

Calls useSession to get the user information, which is required to display the user email & photo.

#### DarkToggle

_src/components/Buttons/darkToggle.tsx_
Allows the user to change between light, dark and system theme mode. The default value is set to system.

Only gets rendered once the component has mounted on the client side and the JS has run to determine which theme mode it is in. A skeleton gets rendered in its place while this is happening.

### Data Table

_src/components/DataTable/data-table.tsx_
Displays a summary of all the forms which belong to the user. Allows the user to search all saved forms via reference number, and also features sorting the saved forms by date (Install Date). Also features pagination, only 10 forms are displayed at once.

Clicking on view/edit forwards that forms reference number to form/[id], which then displays that forms information

### New Form Button

_src/components/Buttons/newForm.tsx_
Clicking the button routes the user to the form/new page.

## Form Page

_src/containers/Form/index.tsx_

Is either passed the forms reference number or 'new' for its URL param [id]. If id = new then it loads up an empty form page, if the id isn't new then it filters all of the forms from the formsContext and displays the form with the matching reference number.

# Routing

Dynamic routing is used for form/[id] to either display the saved form information, or to create a new form.
