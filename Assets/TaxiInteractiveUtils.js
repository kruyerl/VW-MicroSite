/*!
 * VERSION: 0.04
 * DATE: 2016-08-23
 * Website: http://taxiinteractive.com
 * Support: support@taxiinteractive.com
 * @license Copyright (c) 2016, TaxiInteractive. All rights reserved.
 * */


( function(document, window){

    function OutgoingMessage(){}
    function IncomingMessage(){}

    //outgoing messages
    OutgoingMessage.WRITE_STATS = "writeStats";
    OutgoingMessage.DOWNLOAD_MAP_TILE = "download_map_tile";
    OutgoingMessage.REPORT_USER_ACTIVITY = "report_user_activity";



    //incoming messages
    IncomingMessage.UPDATE_TILE_STATUS = "update_tile_status";

    function TaxiInteractiveUtils(){

    }


    //************************************ stats types *****************************************/
    TaxiInteractiveUtils.STATS_TYPE_LISTING_THUMB_PRESS = "listings_item_thumb";
    TaxiInteractiveUtils.STATS_TYPE_FORM_INPUT = "form_input";

    // static vars
    TaxiInteractiveUtils.liveMode = false;
    TaxiInteractiveUtils.dispatchMessages = false;

    /**
     * Initializes TaxiInteractive utils
     */
    TaxiInteractiveUtils.initialize = function(){
        TaxiInteractiveUtils.params = TaxiInteractiveUtils.getSearchParameters();
        // if pathToAssetsFolder is undefined then template may not display images and other external files
        TaxiInteractiveUtils.pathToAssetsFolder =  TaxiInteractiveUtils.params.pathToAssetsFolder;

        //////////////// USE THIS FOR TESTING PURPOSES WHEN TESTING IN STANDARD BROWSER /////////////////
        /*if(TaxiInteractiveUtils.isUndefined(TaxiInteractiveUtils.pathToAssetsFolder)){
            TaxiInteractiveUtils.pathToAssetsFolder = "C:/Users/Maxim/TaxiInteractive";
        }*/
        /////////////////////////////////////////////////////////////////////////////////////////////////


        // if dispatchMessages is false then messages are not delivered to the main app
        //
        TaxiInteractiveUtils.dispatchMessages =  TaxiInteractiveUtils.params.dispatchMessages=="true";//   (TaxiInteractiveUtils.params.dispatchMessages==false)? false : true;
        //
        TaxiInteractiveUtils.liveMode = ( TaxiInteractiveUtils.params.liveMode == "true");

        TaxiInteractiveUtils.unit_id = TaxiInteractiveUtils.isUndefined(TaxiInteractiveUtils.params.unit_id) ? null: TaxiInteractiveUtils.params.unit_id;
        TaxiInteractiveUtils.uuid = TaxiInteractiveUtils.isUndefined(TaxiInteractiveUtils.params.uuid) ? null: TaxiInteractiveUtils.params.uuid;


        //start listening mouse and touch events
        TaxiInteractiveUtils.startListeningUserInput();

        console.log("TaxiInteractiveUtils initialized!");
    };

    TaxiInteractiveUtils.startListeningUserInput = function(){
        window.onclick = function(context){
            TaxiInteractiveUtils.broadcastMessage(OutgoingMessage.REPORT_USER_ACTIVITY);
        }
    };

    TaxiInteractiveUtils.broadcastMessage = function(command, params){
        
        console.log("command to be sent: ",command, "\nparams:",params);

        var messageObject = {"command":command, "params":  ((TaxiInteractiveUtils.isUndefined(params))||(params==null)) ? {} : params};
        var messageToDispatch = ("data://" + JSON.stringify(messageObject)).replace(/"/g, "'");
        //console.log(messageToDispatch);

        //do nothing if dispatchMessages is false
        if(!TaxiInteractiveUtils.dispatchMessages){
            return;
        }


        /*if(!TaxiInteractiveUtils.liveMode){
            //Do nothing as this is in-browser testing
            //console.log("Skipped sending message as liveMode is false: " + command);
            return;
        }*/



        window.location.href = messageToDispatch;
    };

    TaxiInteractiveUtils.receiveMessage = function(messageString){
        var commandObj = JSON.parse(messageString);

        //alert("Received a message from Main APP:" + messageString);

        //1. handle core sys messages
        switch (commandObj.command){

            default:

            break;

        }

        //2. let the template handle content specific messages
        if(window.receiveMessage){
            window.receiveMessage(messageString);
        }


    };


    TaxiInteractiveUtils.getSearchParameters = function(){
        function transformToAssocArray( prmstr ) {
            var params = {};
            var prmarr = prmstr.split("&");
            for ( var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split("=");
                params[tmparr[0]] = tmparr[1];
            }
            return params;
        }

        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
    };


    TaxiInteractiveUtils.isUndefined = function(param){
        return (typeof param == 'undefined');
    };

    /**
     * Searches and returns the input paramerer specified by name.
     * Returns null if the parameter is missin or its null or if its undefined
     * @param name
     * @returns {*}
     */
    TaxiInteractiveUtils.getInputParameter = function(name){

        var result = TaxiInteractiveUtils.params[name];
        if(TaxiInteractiveUtils.isUndefined(result)){
            result = null;
        }

        return result;
    }


    window.TaxiInteractiveUtils = TaxiInteractiveUtils;

}(document, window));