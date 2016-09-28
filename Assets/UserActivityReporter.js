(function (document, window) {
    //********************* Defining UserActivityReporter class ********************//
    
    //interval of time in ms when page title gets reverted to its initial value
    UserActivityReporter.REPORT_ACTIVITY_INTERVAL = 1000;
    // text to be used as a temporary page title in order to signalize the fact of user interaction with web page
    UserActivityReporter.USER_ACTIVE_TITLE_LABEL = "#report_user_activity";

    function UserActivityReporter() {
        //vars
        this.revertTitleIntervalID = null;
        this.originalTitle = document.title;
    
        // resets window title to its initial value
        this.revertTitle = (function (context) {
            return function () {
                document.title = context.originalTitle;
                clearInterval(context.revertTitleIntervalID);  
            };
        }(this));
        
        //global onclick handler
        window.onclick = (function (context) {
            var reportUserActivity = function () {
                document.title = UserActivityReporter.USER_ACTIVE_TITLE_LABEL;
                if (context.revertTitleIntervalID) {
                    clearInterval(context.revertTitleIntervalID);
                }
                context.revertTitleIntervalID = setInterval(context.revertTitle, UserActivityReporter.REPORT_ACTIVITY_INTERVAL);
            };
            return reportUserActivity;
        }(this));
    }
        
    //************* creating instance of UserActivityReporter  *******************//
    try{
        var activityReporter = new UserActivityReporter(); 
    }catch(error){
      //  window.alert(error.message);
    }
        
   
}(document, window));