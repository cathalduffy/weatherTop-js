# Welcome to the Weather Station App

The Webapp created is based around the theme of a weather app that not only displays various elements of the weather to the user, but also allows them to sign up to the app, log in and create their own stations and readings, as well as having the ability to delete them also. The web app has been deployed by using Glitch, which makes use of server-isde rendering, which has allowed me to to render my code on the frontend instantly.

Below, I will give a quick run through of the major pages that allow for the functionalities and displays of the Webapp.

dashboard.js(controller) This renders many of the methods that I have created in the models. This is the controller for my dashboard page and invokes the methods from models and utils for this page and renders them to the dashboard view. The logic is contained in my models and utils which are then processed in my Dashboard controller. This controller also contains my methods to both add and delete stations as these are all contained on the Dashboard page.

station.js(controller) Much the same as dashboard.js, this controller is rendering methods that I have created in the models and utils. As my stations page contains much of the same functionality as the dashboard page, many of these methods are invoked from the same methods in the models. This controller also contains the methods to both addreading and deletereading, allowing the user to add and delete as many readings as they please. This also contains the method of addreport, which calls data from the API to save these new readings to my json file and finally, render this new information in the frontend of the station.hbs page, along with a graph to display tempTrend.

station-store.js & user-store.js (models) Contain many of the predefined (by the course) functions that support in performing many actions on the webapp

station-anayltics.js (utils) This js file contain the logic most of the logic behind the web application. The functions are contained in this file that allows the user to be able to, for example, see the highest and lowest temperatures, etc

addreading.hbs(partial) This partial is a form that allows me to add readings. Contains input fields for the fields required for a full reading. This tag is then called in station.hhbs(the Station page).

addstation.hbs(partial) This is a form that allows the user to add a station. Contains 3 fields to allow the user to add station name, lat and lng. This is then contained in the dashboard.hbs page where it is displayed.

about.hbs(view) This contains some simple text and images about the app that is created using Fomantic UI and html, as well as some iFrame to diplay, for example, the weather map contained on the page

dashboard.hbs(view) This page displays my Dashboard. The dashboard page displays stations that the member has access to. It also allows the user to add/delete stations.

login.hbs(view) A login form that allows the user that has an account to log in as a member.

signup.hbs(view) A simple form that allows the user to sign up to an account.

station.hbs (view) Calling many of my partials (i.e stationCards.hbs) to display information on my station page. Also contains my tempTrend graph that is calling data by going through the addreading function in my staiton controller and pulling the data from the array in the json file

Known bugs/problems:
