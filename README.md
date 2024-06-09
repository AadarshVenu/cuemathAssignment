**To set up and run the app**
This App was made using Expo development framework.Install expo framework, pull the code and trying running the code by npm run start.

**Documentation on the code structure and approach**
Folders such as components which has folders such as screens and utilties and subcomponents is made in the root folder.
In App.js, navigation and font fetching is handled.
There are mainly four screens

  1.FirstScreen- Contains the CuemathGo logo and buttons to signup and login.
        Vibration for 10ms is given on pressing of each button and user will be navigated to sign up and login screen respective to the button pressed.
  2.SignUpScreen- Contains inputtextboxes to fetch the user details and store the data in async storage or local storage.
        Loading is given while async calls.
        Error Alert is given if the user still exists and success alert if user succeeds in signing up and details get stored.
  3.LoginScreen- contains the inputtextboxes to fetch the email and password and error is thrown if the user doesnt exists.
        Loading is given while async calls.

  4.Home-
    contains a NavBar which as logout button and avatar with logged in email which is made as a separate component.
    the middle part has the carousel containing lottie icons.
    Carousel is imported from react-native-reanimated-carousel and for lottie animation from lottie-react-native.
    BottomSheet plugin used is @gorhom/bottom-sheet.
    Two named consants are imported from Constants.js in utilties folder

    The first and third lottie animations are in loop.

    When first lottie is tapped, bottom sheet is expanded fully which is handled through state updation.
`   When third lottie is tapped, the webview is shown using CustomHTML.
    For second lottie,the animation is triggered on each tap by 33%.This is handled by updating the ref and using useEffect.

    For the pagination of carousel, it is handled by state updation and opacity.

    Constants,MyLottieAnimation,Primary Button and Secondary Button are in Utilties Folder.

    
    
  


![Screenshot_2024-06-09-22-08-53-06_f73b71075b1de7323614b647fe394240](https://github.com/AadarshVenu/cuemathAssignment/assets/85875388/7ec108f2-6b3b-4030-9950-9c997a7ac948)
![Screenshot_2024-06-09-22-09-23-69_f73b71075b1de7323614b647fe394240](https://github.com/AadarshVenu/cuemathAssignment/assets/85875388/0785e31f-51cb-4f45-9f2a-8667a6cc70d5)
![Screenshot_2024-06-09-22-09-14-07_f73b71075b1de7323614b647fe394240](https://github.com/AadarshVenu/cuemathAssignment/assets/85875388/3cab0212-1795-4e73-a27c-632a00a361a6)
![IMG-20240609-WA0001](https://github.com/AadarshVenu/cuemathAssignment/assets/85875388/e4dc5491-2072-435a-81fb-1624397ea5c8)
![IMG-20240609-WA0000](https://github.com/AadarshVenu/cuemathAssignment/assets/85875388/d8ada645-63cf-4a0e-97bf-5b74393d78c7)
