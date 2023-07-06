# lemmy-block-script

A script to mass block communities on Lemmy!

## Usage

    1. Copy `blockScipt.js` somewhere in a texteditor ( something like visual studio code ).
    2. Edit everything the config above ( To apply a full list, simply copy the content from the list that you want to apply from /blocklist/... into toBlock = [] )

    // Don't touch anything below this line  
    // ------------------------------------

    3.Open your browser console (F12)\
    4.Paste the script and press enter\
    4.1.To stop the script, just write stop() in the console close the tab or reload the page


## How to get the list of communities and block them

    1. Copy fetchCommunities.js somewhere in a texteditor ( something like visual studio code ).
    2. Edit everything the config above
    3. Open your browser console (F12)
    4. Paste the script and press enter ( Wait many seconds, depending on the size of the instance! )
    5. Copy the output from the console ( Right click -> Copy Object )
    6. Reload Page
    7. There you have a list of all communities on the instance in your clipboard! ( You can use it in the blockScript.js blocklist!)