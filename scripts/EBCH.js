// ==UserScript==
// @name Eli's BC Helper
// @namespace https://www.bondageprojects.com/
// @version 1.02.41
// @description A collection of helpful features for BC
// @author Elicia (Help from Sid)
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match http://localhost:*/*
// @icon data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant none
// @run-at document-end
// ==/UserScript==

//todo
//chatlog:
//add style tags chatlog

//pose engine:
//make it so poses aren't wonky anymore, possibly by letting all of the commands through, and checking if they went through before sending message
//make it so messages are more contextual/fit all contexts, and use nicknames instead of name

//possible future features:
//auto reacting to some inputs, like actions


//SDK stuff

var bcModSdk=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();
//SDKstuff end



(async function () {
  const ver = "1.02.41";
  var latestupdate = "EBCH updated (" + ver + "):\n" +
  "-SDK Update.";
  const modApi = bcModSdk.registerMod({ 
    name: 'EBCH',
    fullName: "Eli's Bondage Club Helper",
    version: ver,
    repository: 'https://gitlab.com/e2466/ebch',
  });
  const ManualUrl = "https://e2466.gitlab.io/ebch/";
  const WelcomeString = "EBCH: /ebch for commands.";
  const posearray = ["Yoked","BaseLower","BaseUpper","KneelingSpread","Kneel","OverTheHead","Hogtied","AllFours","BackBoxTie","LegsClosed","Spread","BackElbowTouch","LegsOpen"];
  const posecdadd = 2000;
  const generalhelp = "EBCH Commands:\n" +
                "<i>/ebch</i> or <i>/ebch help</i>: Diplays this help menu.\n" +
                "<i>/ebch reset</i>: Resets EBCH settings to default.\n" +
                "<i>/ebch welcome</i>: Toggles welcome message on and off.\n" +
                "<i>/ebch log</i>: Displays chatlogging related help.\n" +
                "<i>/ebch notifs</i>: Displays custom notifications related help.\n" +
                "<i>/ebch ungarble</i>: Displays ungarble related help.\n" +
                "<i>/ebch pose</i>: Displays pose related help.";
  const posehelp = "EBCH Pose Commands:\n" +
                  "<i>/ebch pose help</i>: Diplays this help menu.\n" +
                  "<i>/ebch pose on/off</i>: Turns on or off the rendering of the Pose UI button.\n" +
                  "<i>/ebch pose [posegoeshere] [targetgoeshere]</i>: Changes the target to the written pose.\n" +
                  "Pose options: Yoked, BaseLower, BaseUpper, KneelingSpread, Kneel, OverTheHead, Hogtied, AllFours, BackBoxTie, LegsClosed, Spread, BackElbowTouch, LegsOpen.";
  const ungarblehelp = "Please note that some addons do use alternate garbling methods, and if those are turned on on the target's side, this won't ungarble them.\nBCE is a good example of this.\n\n" +
                  "EBCH Ungarble Commands:\n" +
                  "<i>/ebch ungarble help</i>: Diplays this help menu.\n" +
                  "<i>/ebch ungarble off</i>: Turns off the EBCH ungarble.\n" +
                  "<i>/ebch ungarble hw</i>: Turns on the EBCH ungarble, but only for those on your hearing whitelist.\n" +
                  "<i>/ebch ungarble all</i>: Turns on the EBCH ungarble for everyone.\n" +
                  "<i>/ebch ungarble add</i>: Adds someone <i>in your chatroom</i> to the hearing whitelist. Works with name and number.\n" +
                  "<i>/ebch ungarble rem</i>: Removes someone from the hearing whitelist. Only works with player number.\n" +
                  "<i>/ebch ungarble list</i>: Lists the player numbers on your hearing whitelist.\n" +
                  "<i>/ebch ungarble clear</i>: Clears your hearing whitelist.";
  const loghelp = "EBCH logging Commands:\n" +
                  "<i>/ebch log help</i>: Diplays this help menu.\n" +
                  "<i>/ebch log on/off</i>: Turns Chatlogging on/off.\n" +
                  "<i>/ebch log clear</i>: Clears chatlogs associated with the current character.\n" +
                  "<i>/ebch log download</i>: Creates a log from the database and sends it as a downloadable file.";
  const notifshelp = "Please note that message notifications in BC options need to be enabled for this to work.\n\n" +
                  "EBCH Custom Notifications Commands:\n" +
                  "<i>/ebch notifs help</i>: Diplays this help menu.\n" +
                  "<i>/ebch notifs on/off</i>: Turns notifications on or off.\n" +
                  "<i>/ebch notifs add</i>: Adds a word to the notification words list.\n" +
                  "<i>/ebch notifs rem</i>: Removes a word from the notification words list.\n" +
                  "<i>/ebch notifs clear</i>: Clears the notification words list.\n" +
                  "<i>/ebch notifs list</i>: Lists the words that will trigger a notification.";

  //buttons loc
  // x, y, size, spacing (anchor self menu)
  const selfmenuanchor = [120, 968, 30, 10];
  // x  , y , size x, size y, spacing (anchor pose ui)
  const puicoords = [300, 10, 100, 40, 5];

  const buttungarble = [selfmenuanchor[0], selfmenuanchor[1], selfmenuanchor[2], selfmenuanchor[2]];
  const buttnotifs = [selfmenuanchor[0] + selfmenuanchor[2] + selfmenuanchor[3], selfmenuanchor[1], selfmenuanchor[2], selfmenuanchor[2]];
  const buttlog = [selfmenuanchor[0] + selfmenuanchor[2] * 2 + selfmenuanchor[3] * 2, selfmenuanchor[1], selfmenuanchor[2], selfmenuanchor[2]];

  const buttposeui = [puicoords[0] + 50,puicoords[1],40,40];
  const buttbaseupper = [puicoords[0] + puicoords[2] + puicoords[4],puicoords[1],puicoords[2],puicoords[3]];
  const buttyoked = [puicoords[0] + (puicoords[2] + puicoords[4]),puicoords[1]  + (puicoords[3] + puicoords[4]),puicoords[2],puicoords[3]];
  const buttoverthehead = [puicoords[0] + (puicoords[2] + puicoords[4]),puicoords[1] + (puicoords[3] + puicoords[4]) * 2,puicoords[2],puicoords[3]];
  const buttbackboxtie = [puicoords[0] + (puicoords[2] + puicoords[4]),puicoords[1] + (puicoords[3] + puicoords[4]) * 3,puicoords[2],puicoords[3]];
  const buttbackelbowtouch = [puicoords[0] + (puicoords[2] + puicoords[4]),puicoords[1] + (puicoords[3] + puicoords[4]) * 4,puicoords[2],puicoords[3]];
  const buttbaselower = [puicoords[0] + (puicoords[2] + puicoords[4]),puicoords[1] + (puicoords[3] + puicoords[4]) * 6,puicoords[2],puicoords[3]];
  const buttkneel = [puicoords[0] + (puicoords[2] + puicoords[4]),puicoords[1] + (puicoords[3] + puicoords[4]) * 7,puicoords[2],puicoords[3]];
  const buttkneelspread = [puicoords[0] + (puicoords[2] + puicoords[4]),puicoords[1] + (puicoords[3] + puicoords[4]) * 8,puicoords[2],puicoords[3]];
  const buttlegsclosed = [puicoords[0] + (puicoords[2] + puicoords[4]),puicoords[1] + (puicoords[3] + puicoords[4]) * 9,puicoords[2],puicoords[3]];
  const buttspread = [puicoords[0] + (puicoords[2] + puicoords[4]),puicoords[1] + (puicoords[3] + puicoords[4]) * 10,puicoords[2],puicoords[3]];
  const butthogtied = [puicoords[0] + (puicoords[2] + puicoords[4]),puicoords[1] + (puicoords[3] + puicoords[4]) * 12,puicoords[2],puicoords[3]];
  const buttallfours = [puicoords[0] + (puicoords[2] + puicoords[4]),puicoords[1] + (puicoords[3] + puicoords[4]) * 13,puicoords[2],puicoords[3]];

  //-
  var diskspaceerror = 0;
  var modCommands;
  var HearingWhitelist = [];
  var notifwords = [];
  var ungarble = 0;
  antiGarbling();
  crCommands();
  poseMenuOthers();
  poseMenuOthersClick();
  //ebchLogging();
  ebchwhnet();
  lobbyToggle();
  lobbyClick();
  var debug = 0;
  var focus = 1;
  var logging = 0;
  var notifs = 0;
  var db;
  var dbsetup = 0;
  var textToWrite;
  var poseui = 0;
  var poseuirender = 1;
  var lastmsg;
  var ebchinit = 0;


  var posecd = Date.now();
  var welcomemsg = 0;
  var welcomemsgtoggle = 1;
  if(ServerPlayerIsInChatRoom() && ebchinit === 0) {
    //console.log("EBCH: Init1.");
    if (Player.OnlineSettings.EBCH !== "" || ServerPlayerIsInChatRoom() && Player.OnlineSettings.EBCH !== undefined) {Load();}
    if (welcomemsgtoggle === 1 && welcomemsg === 0 && ServerPlayerIsInChatRoom())
    {
      welcomemsg = 1;
      ChatRoomSendLocal(WelcomeString);

    }
    ebchinit = 1;
  }
  console.log("EBCH ver. " + ver);
  

  //dbfunctions

  function openDb(DB_NAME, DB_STORE_NAME) {
    console.log("EBCH: Preparing DB.");
    var req = indexedDB.open(DB_NAME, 1);
    req.onsuccess = function (evt) {
      // Equal to: db = req.result;
      db = this.result;
      console.log("EBCH: DB Ready.");
      dbsetup = 1;
    };
    req.onerror = function (evt) {
      console.error("Error initializing EBCH db, check if you have space on your disk, and if you do, try restarting your browser:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
      console.log("EBCH: DB Update Process.");
      var store = evt.currentTarget.result.createObjectStore(
        DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
    };
  }

  function nameornickname(c)
  {
    if (c.Nickname)
    {
      return c.Nickname;
    } else {
      return c.Name;
    }
  }

  //OutWhisper, Whisper, Chat, Activity
  function adddata(data, ori) {
    //comes from chatroom
    var text;
    var oriname;
    var orinum;
    if (data.Sender)
    {
      orinum = data.Sender;
    } else {
      orinum = Player.MemberNumber;
    }
    if(ori === 0)
    {
      const SenderCharacter = ChatRoomCharacter.find(c => c.MemberNumber == data.Sender);
      if (!SenderCharacter) return;
      if(data.Type === "Activity" || data.Type === "Action"){
        

        // Make a copy of the message for the purpose of substitutions
        let msg = String(data.Content);

        const preHandlers = ChatRoomMessageRunHandlers("pre", data, SenderCharacter, msg);
        if (typeof preHandlers === "boolean" && preHandlers)
          return;
        else if (typeof preHandlers === "string")
          msg = preHandlers;

        // Hidden messages don't go any further
        if (data.Type === "Hidden") return;

        // Metadata extracted from the message's dictionary
        const { metadata, substitutions } = ChatRoomMessageRunExtractors(data, SenderCharacter);

        // Substitute actions and server messages for their fulltext version
        switch (data.Type) {
          case "Action":
            msg = DialogFindPlayer(msg);
            break;

          case "ServerMessage":
            msg = DialogFindPlayer("ServerMessage" + msg);
            break;

          case "Activity":
            msg = ActivityDictionaryText(msg);
            break;
        }

        // Apply requested substitutions
        text = "( " + CommonStringSubstitute(msg, substitutions) + " )";
        
      } 
      else if (data.Type == "Emote") 
      {
        text = "* " + nameornickname(SenderCharacter) + " " + data.Content + " *";
      }


      else if (data.Type !== "Whisper")
      {
        text = nameornickname(SenderCharacter) + ": " + data.Content;
      } 
      
      else {
        text = "Whisper from " + nameornickname(SenderCharacter) + ": " + data.Content;
      }
      oriname = SenderCharacter.Name;
    } 
    else 
    {
      var t = targetfind(data[1].Target);
      if(!t) return;
      text = "Whisper to " + nameornickname(t) + ": " + data[1].Content;
      oriname = Player.Name;
    }
    //console.log(text);
    text = text.replaceAll(/</g, "&lt;").replaceAll(/>/g, "&gt;");
    text = text.replaceAll("\n","<br>");

    


    const datenow = new Date(Date.now());
    var obj = { logmsg: "[" + datenow.toLocaleDateString() + " - " + datenow.toLocaleTimeString() + " - Room: " + Player.LastChatRoom.Name + " - AccName: " + oriname + " - AccNum: " + orinum + "]<br>" + text + "<br>"} ;
    if (typeof blob != 'undefined')
      obj.blob = blob;
    var store = getObjectStore("logs" + JSON.stringify(Player.MemberNumber), 'readwrite');
    if (!store) {return;}
    var req;
    try {
      req = store.add(obj);
    } catch (e) {
      if (e.name == 'DataCloneError')
      throw e;
    }
    req.onsuccess = function (evt) {
      if(debug === 1) {console.log("EBCH: DB Insertion worked.");}
    };
    req.onerror = function() {
      if(debug === 1) {console.log("EBCH: DB Insertion error.");}
    };
  }
  
  function getObjectStore(store_name, mode) {
    var tx;
    if(typeof db.transaction === 'function'){
      var tx = db.transaction(store_name, mode);
      return tx.objectStore(store_name);
    } else {
      if(ServerPlayerIsInChatRoom() && logging === 1 && diskspaceerror === 0){
        ChatRoomSendLocal("It would seem EBCH database failed to initialize.\nPlease check if you have space remaining on your disk, and if so, please restart your browser.\nThis error seems to be related to the latest version of chrome.\nAs it is, chatlogging won't work, you will have a number of errors saving data with FBC too.");
        diskspaceerror = 1;
      }
    }
    
  }

  function clearObjectStore(DB_STORE_NAME) {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    if (!store) {return;}
    var req = store.clear();
    req.onsuccess = function(evt) {
      ChatRoomSendLocal("EBCH: Database " + DB_STORE_NAME + " cleared successfully.");
    };
    req.onerror = function (evt) {
      console.error("clearObjectStore:", evt.target.errorCode);
    };
  }

  function retrieveAll(DB_STORE_NAME) {
      var store = getObjectStore(DB_STORE_NAME, 'readwrite');
      if (!store) {return;}
      var msgs = [];
      store.openCursor().onsuccess = async function(event) {
      var cursor = event.target.result;
      if (cursor) {
      msgs = msgs + Object.values(cursor.value)[0];
      cursor.continue();
      } else {
    textToWrite = msgs;
    ChatRoomSendLocal("EBCH: Data Retrieved. Preparing and formatting text file...");
    saveTextAsFileCont();
      }
    };

  }

    function saveTextAsFile()
    {
      var store = "logs" + JSON.stringify(Player.MemberNumber);
      ChatRoomSendLocal("EBCH: Retrieving data from DB. This may take a while.");
      retrieveAll(store);
    }

  function saveTextAsFileCont() {
    if(textToWrite === "") {return ChatRoomSendLocal("EBCH: No content to output, exiting export function.");}
    //textToWrite = textToWrite.replaceAll('"',"");
    var textFileAsBlob = new Blob([textToWrite], {type:'text/html'});
    const datenow = new Date(Date.now());
    var fileNameToSaveAs = "BC ChatLog " + JSON.stringify(Player.Name) + " - " + datenow.toLocaleDateString() + " - " + datenow.toLocaleTimeString();
    //if we are on gecko, add .html extension (1.10.00)
    if (!window.webkitURL != null)
    {
      fileNameToSaveAs = fileNameToSaveAs + ".html";
    }
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    ChatRoomSendLocal("EBCH: Sending file.");
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
    textToWrite = "";
  }

  //end of db functions
  //check if the page is in focus or not
  document.addEventListener('visibilitychange', function (event) {
    if (document.hidden) {
        focus = 0;
    } else {
        focus = 1;
    }
  });


  await waitFor(() => ServerIsConnected && ServerSocket);

  function targetfind(input) {
    var targetnumber = parseInt(input);
    var target;
    if(targetnumber >= 0)
    {
      target = ChatRoomCharacter.find((x) => x.MemberNumber === targetnumber);
    } else {
      target = ChatRoomCharacter.find((x) => x.Name.toLowerCase() === input.trim());
    }
    return target;
  }

  function Act(P, AG, AN) {
    if(debug === 1) console.log("Trying to boop ", P);
    // ensure activity is allowed and is not being done on player
    if (!ActivityAllowedForGroup(P, AG).some(a => a.Name == AN)) return;
    var Dictionary = [];
    Dictionary.push({ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber });
    Dictionary.push({ Tag: "TargetCharacter", Text: P.Name, MemberNumber: P.MemberNumber });
    Dictionary.push({ Tag: "ActivityGroup", Text: AG });
    Dictionary.push({ Tag: "ActivityName", Text: AN });
    ServerSend("ChatRoomChat", { Content: ((P.ID == 0) ? "ChatSelf-" : "ChatOther-") + AG + "-" + AN, Type: "Activity", Dictionary: Dictionary });
  }

  function ActionBeep(tar, str1,str2){
    const msg = nameornickname(Player) + str1 + nameornickname(tar) + str2
    ServerSend("ChatRoomChat", { Content: "Beep", Type: "Action", Dictionary: [
    // EN
		{ Tag: "Beep", Text: "msg" },
		// CN
		{ Tag: "发送私聊", Text: "msg" },
		// DE
		{ Tag: "Biep", Text: "msg" },
		// FR
		{ Tag: "Sonner", Text: "msg" },
		// Message itself
		{ Tag: "msg", Text: msg }
    ]});
  }

  async function Pose(tar, pose){
    const currenttime = Date.now();
    var lastpose;
    var usingsamepose;
    if(Player.Effect.indexOf("Block") === -1 && posecd <= currenttime && !tar.BlackList.includes(Player.MemberNumber) && (tar.ItemPermission <=2 || tar.ID == 0 || tar.IsLoverOfPlayer() || tar.IsOwnedByPlayer() || tar.WhiteList.includes(Player.MemberNumber))){
      for(const p of tar.DrawPose) {
        if(p === pose){
          usingsamepose = 1;
        }
      }
      lastpose = tar.DrawPose;
      CharacterSetActivePose(tar, pose);
      ChatRoomCharacterUpdate(tar);
      await sleep(300);
      if(tar.MemberNumber === Player.MemberNumber)
      {
        return;
      } else if (lastpose != tar.DrawPose && !usingsamepose) {
          posecd = currenttime + posecdadd;
          switch (pose){
            case "Yoked":
              ActionBeep(tar," raises ", "'s hands.");
              break;

            case "BaseLower":
              ActionBeep(tar," helps ", " up on their feet.");
              break;

            case "BaseUpper":
              ActionBeep(tar," lets ", " relax their arms.");
              break;

            case "KneelingSpread":
              ActionBeep(tar," lowers ", " on their knees, forcing their legs open.");
              break;

            case "Kneel":
              ActionBeep(tar," helps ", " to their knees.");
              break;

            case "OverTheHead":
              ActionBeep(tar," forcibly raises ", "'s hands above their head.");
              break;

            case "HogTied":
              ActionBeep(tar," lowers ", " on their belly.");
              break;

            case "AllFours":
              ActionBeep(tar," forces ", " on all fours.");
              break;

            case "BackBoxTie":
              ActionBeep(tar," draws ", "'s arms behind their back.");
              break;

            case "LegsClosed":
              ActionBeep(tar," helps ", " stand straight with their legs closed.");
              break;

            case "Spread":
              ActionBeep(tar," forces ", " to spread their legs.");
              break;

            case "BackElbowTouch":
              ActionBeep(tar," draws ", "'s arms behind their back, elbows almost touching.");
              break;

            case "LegsOpen":
              ActionBeep(tar," helps ", " stand straight with their legs open.");
              break;

            default:
              break;

          }
        return;
      }
    }
  }

  function Save() {
    //debug,antigarble
    if(debug === 1) {console.log("saving settings");}
    var sdebug;
    var sungarble;
    var slogging;
    var sposeui;
    var sHW;
    var sNW;
    var sN;
    var sposeuirender;
    var swelcomemsgtoggle;
    var ebchsettings;
    if(JSON.stringify(debug) === null)
    {
      sdebug = "0";
    } else {
      sdebug = JSON.stringify(debug);
    }
    if(JSON.stringify(ungarble) === null)
    {
      sungarble = "0";
    } else {
      sungarble = JSON.stringify(ungarble);
    }
    if(JSON.stringify(logging) === null)
    {
      slogging = "0";
    } else {
      slogging = JSON.stringify(logging);
    }
    if(JSON.stringify(notifs) === null)
    {
      sN = "0";
    } else {
      sN = JSON.stringify(notifs);
    }
    if(JSON.stringify(poseui) === null)
    {
      sposeui = "0";
    } else {
      sposeui = JSON.stringify(poseui);
    }
    if(JSON.stringify(poseuirender) === null)
    {
      sposeuirender = "0";
    } else {
      sposeuirender = JSON.stringify(poseuirender);
    }
    if(JSON.stringify(welcomemsgtoggle) === null)
    {
      swelcomemsgtoggle = "0";
    } else {
      swelcomemsgtoggle = JSON.stringify(welcomemsgtoggle);
    }
    if(JSON.stringify(HearingWhitelist) === null) {
      sHW = "";
    } else {
      sHW = JSON.stringify(HearingWhitelist);
    }
    if(JSON.stringify(notifwords) === null) {
      sNW = "";
    } else {
      sNW = JSON.stringify(notifwords);
    }

    ebchsettings =  sdebug + "," + sungarble + "," + slogging + "," + sposeui + "," + sN +  "," + ver + "," + sposeuirender + "," + swelcomemsgtoggle + "|" + sHW + "|" + sNW;
    ebchsettings = ebchsettings.replaceAll("[","");
    ebchsettings = ebchsettings.replaceAll("]","");
    Player.OnlineSettings.EBCH = ebchsettings;
    ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings })
  }

  function Load() {
    if(Player.OnlineSettings.EBCH !== undefined) {
    if(debug === 1) {console.log("loading settings");}
      var ebchsettings = Player.OnlineSettings.EBCH;
      ebchsettings = ebchsettings.replace("/g","");
      ebchsettings = ebchsettings.replaceAll('"',"");
      //console.log(ebchsettings);
      if(ebchsettings !== ""){
        var setlist = ebchsettings.split("|");
        var wl = setlist[1];
        if(wl !== "" && wl !== undefined) {
          HearingWhitelist = wl.split(",");
          HearingWhitelist = HearingWhitelist.map((x) => +x);
        } else {
          HearingWhitelist = [];
        }
        var nw = setlist[2];
        if(nw !== "" && nw !== undefined) {
          notifwords = nw.split(",");
        } else {
          notifwords = [];
        }
        var settings = setlist[0].split(",");
        debug = parseInt(settings[0]);
        ungarble = parseInt(settings[1]);
        logging = parseInt(settings[2]);
        if(logging === 1 && dbsetup === 0){openDb("BCLogs"+ JSON.stringify(Player.MemberNumber), "logs" + JSON.stringify(Player.MemberNumber));}
        notifs = parseInt(settings[4]);
        poseui = parseInt(settings[3]);
        if(settings[6])
        {
          poseuirender = parseInt(settings[6]);
        } else {
          poseuirender = 1;
        }
        if(settings[7])
        {
          welcomemsgtoggle = parseInt(settings[7]);
        } else {
          welcomemsgtoggle = 1;
        }

        if(settings[5] !== ver) {
          ChatRoomSendLocal(latestupdate);
          Save();
        }
      }
    }
  }

  function SelfMenuDraw() {
    if(ungarble === 0)
    {
      DrawButton(...buttungarble, "Ung", "White", "", "EBCH: Turn on Ungarble (Hearing Whitelist)");
    } else if(ungarble === 1)
    {
      DrawButton(...buttungarble, "Ung", "Yellow", "", "EBCH: Turn on Ungarble (all)");
    } else if(ungarble === 2) {
      DrawButton(...buttungarble, "Ung", "Green", "", "EBCH: Turn off ungarble");
    }
    if(notifs === 0)
    {
      DrawButton(...buttnotifs, "Not", "White", "", "EBCH: Turn on custom notifications");
    } else if(notifs === 1) {
      DrawButton(...buttnotifs, "Not", "Green", "", "EBCH: Turn off custom notifications");
    }
    if(logging === 0)
    {
      DrawButton(...buttlog, "Log", "White", "", "EBCH: Turn on chatlogging");
    } else if (logging === 1) {
      DrawButton(...buttlog, "Log", "Green", "", "EBCH: Turn off chatlogging");
    }


  }

  function PoseMenuDraw() {
    if(poseuirender === 1 && poseui === 1) {
      var target = CurrentCharacter;
      // x  , y , size x, size y, spacing
        DrawButton(...buttbaseupper,"BaseHand","White","","Base Hands");
        DrawButton(...buttyoked, "HandsUp", "White","","Hands Up");
        DrawButton(...buttoverthehead, "HandsHigh", "White","","Hands Up High");
        DrawButton(...buttbackboxtie, "BackLoose", "White","","Back Loose");
        DrawButton(...buttbackelbowtouch, "BackTight", "White","","Back Tight");
        DrawButton(...buttbaselower,"Standing","White","","Stand");
        DrawButton(...buttkneel,"Kneeling","White","","Kneel");
        DrawButton(...buttkneelspread, "KneelSpr","White","","Kneel Spread");
        DrawButton(...buttlegsclosed,"StandCl","White","","Standing Closed Legs");
        DrawButton(...buttspread,"StandSpr","White","","Standing Spread");
        DrawButton(...butthogtied, "BellyLie", "White","","Belly Lie");
        DrawButton(...buttallfours,"AllFours","White","","All Fours");
    }
  }
  ServerSocket.on("ChatRoomSync", async (data) => {
    
    if (ebchinit === 0 && ServerPlayerIsInChatRoom()){
      //console.log("EBCH: Init2");
      if(dbsetup === 0) {openDb("BCLogs"+ JSON.stringify(Player.MemberNumber), "logs" + JSON.stringify(Player.MemberNumber));}
      Load();
      ebchinit = 1;
      if(welcomemsgtoggle === 1 && welcomemsg === 0){
        welcomemsg = 1;
        ChatRoomSendLocal(WelcomeString);
      }
        
    }
  })
    // users in the chatroom are stored in ChatRoomCharacter array
  // on channel join data Type is Action, Content is ServerEnter and MemberNumber is the joining user
  ServerSocket.on("ChatRoomMessage", async (data) => {

    //console.log("ChatRoomMessageBit", data);
    

    // if the data is not a ServerEnter, return
    //if (data.Content !== "ServerEnter" && data.Type !== "Chat" && data.Type !== "Action" && data.Type !== "Activity" && data.Type !== "Emote" && data.Type !== "Whisper") {
      //return;
    //}
    //load settings when entering chatroom
    if(data.Content === "ServerEnter" && data.Sender === Player.MemberNumber && ebchinit === 0) {
      Load();
      if(dbsetup === 0) {openDb("BCLogs"+ JSON.stringify(Player.MemberNumber), "logs" + JSON.stringify(Player.MemberNumber));}
      if(welcomemsgtoggle === 1 && welcomemsg === 0){
        welcomemsg = 1;
        ChatRoomSendLocal(WelcomeString);
      }
      ebchinit = 1;

      
    }
    if(data.Type === "Chat" && focus === 0 && notifs === 1) {
      for (const P of notifwords) {
        var cont = data.Content.toLowerCase();
        let index = cont.search(P);
        if(index !== -1) {
          //word was found
          if(data.Content.length === P.length || index === 0 && data.Content.substring(P.length ,P.length + 1) === " " || index !== 0 && index !== -1 && data.Content.substring(index - 1, index) === " " && (data.Content.substring(index + P.length,index + P.length + 1) === " " || data.Content.length === index + P.length))
          NotificationRaise("ChatMessage", data.Content);
        }

      }
    }
    if((data.Type === "Whisper" || data.Type == "Chat" || data.Type == "Activity" || data.Type == "Action" || data.Type == "Emote") && logging === 1 && dbsetup === 1) {
      
      adddata(data, 0);

    }


    return;
  });



  async function waitFor(func, cancelFunc = () => false) {
    while (!func()) {
      if (cancelFunc()) {
        if(debug === 1) console.log("waitFor returning false.");
        return false;
      }
      if(debug === 1) console.log("waitFor sleep bit.");
      await sleep(100);
    }
    if(debug === 1) console.log("waitFor returning true.");
    return true;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //catches the garble function to handle the antigarble
  async function antiGarbling() {
      await waitFor(() => !!SpeechGarble);
      modApi.hookFunction('SpeechGarble', 4, (args, next) => {
        // Copy original, which is second argument
        const originalText = args[1];
        const source = args[0];
        // Call the original function, saving result
        const garbledText = next(args);
        // Return modified result by adding original text after the garbled text
        if(!originalText)
        {
          return "";
        }
        if(originalText.indexOf("(") !== 0 &&  SpeechGetTotalGagLevel(source) >= 1 && ungarble !== 0 && (HearingWhitelist.includes(source.MemberNumber) || ungarble === 2 || HearingWhitelist == source.MemberNumber))
        {
          return originalText + " (Ungarbled)";
        } else if(originalText.indexOf("(") === 0 &&  SpeechGetTotalGagLevel(source) >= 1 && ungarble !== 0 && (HearingWhitelist.includes(source.MemberNumber) || ungarble === 2 || HearingWhitelist == source.MemberNumber)){
          return originalText;
        } else {
          return garbledText;
        }
        //return garbledText + ' <> ' + originalText;
      });
    }
  //catches server sends to trigger chatlogging >//< only way I found to fix the fact sending whispers didn't trigger the chatlogging
  async function ebchwhnet(){
    await waitFor(() => !!ServerSend)
    modApi.hookFunction('ServerSend', 4, (args, next) => {


      next(args);
      if(args[0] === "ChatRoomChat" && args[1].Type === "Whisper" && logging === 1 && ServerPlayerIsInChatRoom()) {
        //console.log("Serversend: ", args);
        adddata(args, 1);
        return;

      }


    })
  }

  //catches dialogclick to handle pose ui
  async function poseMenuOthersClick() {
    await waitFor(() => DialogClick);
    modApi.hookFunction("DialogClick", 4, (args,next) => {
      if(CurrentCharacter.ID === 0) {
        //ungarble button
        if(MouseIn(...buttungarble)) {
          if(ungarble === 0) {
            ungarble = 1;
            //ChatroomSendLocal("EBCH: Ungarble: Hearing Whitelist turned on.\n Type !ebchungarblehelp for commands.");
            ControllerClearAreas();
            DialogDraw();
            Save();
          } else if(ungarble === 1) {
            ungarble = 2;
            //ChatroomSendLocal("EBCH: Ungarble all turned on.\n Type !ebchungarblehelp for commands.");
            ControllerClearAreas();
            DialogDraw();
            Save();
          } else if(ungarble === 2) {
            ungarble = 0;
            //ChatroomSendLocal("EBCH: Ungarble turned off.");
            ControllerClearAreas();
            DialogDraw();
            Save();
          }
        } else if (MouseIn(...buttnotifs)) {
          if(notifs === 0){
            notifs = 1;
            //ChatroomSendLocal("EBCH: Custom notifications turned on.\nType !ebchnotifhelp for commands.");
            ControllerClearAreas();
            DialogDraw();
            Save();
          } else if (notifs === 1){
            notifs = 0;
            //ChatroomSendLocal("EBCH: Custom notifications turned off.");
            ControllerClearAreas();
            DialogDraw();
            Save();
          }
        } else if (MouseIn(...buttlog)) {
          if(logging === 0) {
            logging = 1;
            if(dbsetup === 0)  {openDb("BCLogs"+ JSON.stringify(Player.MemberNumber), "logs" + JSON.stringify(Player.MemberNumber));}
            //ChatroomSendLocal("EBCH: Chatlogging turned on.\nType !ebchlogginghelp for commands.");
            ControllerClearAreas();
            DialogDraw();
            Save();
          } else if (logging === 1) {
            logging = 0;
            //ChatroomSendLocal("EBCH: Chatlogging turned off.\n");
            ControllerClearAreas();
            DialogDraw();
            Save();
          }
        }
      }
      if(poseuirender === 1 && poseui === 1 && MouseIn(...buttposeui) && CurrentCharacter.ID !== 0)
      {
        poseui = 0;
        ControllerClearAreas();
        DialogDraw();
        Save();
        return;
      }
      else if(poseuirender === 1 && poseui === 0 && MouseIn(...buttposeui) && CurrentCharacter.ID !== 0)
      {
        poseui = 1;
        ControllerClearAreas();
        DialogDraw();
        Save();
        return;
      }

      if(poseuirender === 1 && poseui === 1) {
          if (MouseIn(...buttbaseupper) && CurrentCharacter.ID !== 0 && CharacterCanChangeToPose(CurrentCharacter, "BaseUpper")) {
          Pose(CurrentCharacter, "BaseUpper");
          return;
        }
        if (MouseIn(...buttyoked) && CurrentCharacter.ID !== 0 && CharacterCanChangeToPose(CurrentCharacter, "Yoked")) {
          Pose(CurrentCharacter, "Yoked");
          return;
        }
        if (MouseIn(...buttoverthehead) && CurrentCharacter.ID !== 0 && CharacterCanChangeToPose(CurrentCharacter, "OverTheHead")) {
          Pose(CurrentCharacter, "OverTheHead");
          return;
        }
        if (MouseIn(...buttbackboxtie) && CurrentCharacter.ID !== 0 && CharacterCanChangeToPose(CurrentCharacter, "BackBoxTie")) {
          Pose(CurrentCharacter, "BackBoxTie");
          return;
        }
        if (MouseIn(...buttbackelbowtouch) && CurrentCharacter.ID !== 0 && CharacterCanChangeToPose(CurrentCharacter, "BackElbowTouch")) {
          Pose(CurrentCharacter, "BackElbowTouch");
          return;
        }
        if (MouseIn(...buttbaselower) && CurrentCharacter.ID !== 0 && CharacterCanChangeToPose(CurrentCharacter, "BaseLower")) {
          Pose(CurrentCharacter, "BaseLower");
          return;
        }
        if (MouseIn(...buttkneel) && CurrentCharacter.ID !== 0 && CharacterCanChangeToPose(CurrentCharacter, "Kneel")) {
          Pose(CurrentCharacter, "Kneel");
          return;
        }
        if (MouseIn(...buttkneelspread) && CurrentCharacter.ID !== 0 && CharacterCanChangeToPose(CurrentCharacter, "KneelingSpread")) {
          Pose(CurrentCharacter, "KneelingSpread");
          return;
        }
        if (MouseIn(...buttlegsclosed) && CurrentCharacter.ID !== 0 && CharacterCanChangeToPose(CurrentCharacter, "LegsClosed")) {
          Pose(CurrentCharacter, "LegsClosed");
          return;
        }
        if (MouseIn(...buttspread) && CurrentCharacter.ID !== 0 && CharacterCanChangeToPose(CurrentCharacter, "Spread")) {
          Pose(CurrentCharacter, "Spread");
          return;
        }
        if (MouseIn(...butthogtied) && CurrentCharacter.ID !== 0 && CharacterCanChangeToPose(CurrentCharacter, "Hogtied")) {
          Pose(CurrentCharacter, "Hogtied");
          return;
        }
        if (MouseIn(...buttallfours) && CurrentCharacter.ID !== 0 && CharacterCanChangeToPose(CurrentCharacter, "AllFours")) {
          Pose(CurrentCharacter, "AllFours");
          return;
        }
      }

      next(args);
    })
  }
  //catches dialog draw to draw the pose ui buttons
  async function poseMenuOthers() {
    await waitFor(() => !!DialogDraw);
    modApi.hookFunction('DialogDraw', 4, (args,next) => {
      if(CurrentCharacter.ID === 0) {
        SelfMenuDraw();
      }
      if(poseuirender === 1 && poseui === 1 && CurrentCharacter.ID !== 0){
        DrawButton(...buttposeui,"Poses","Green","","EBCH: Pose UI off");
      } else if(poseuirender === 1 & poseui === 0 && CurrentCharacter.ID !== 0) {
        DrawButton(...buttposeui,"Poses","White","","EBCH: Pose UI on");
      }

      if(CurrentCharacter.ID !== 0 && poseui === 1) {
        PoseMenuDraw();
      }
      next(args);
    })
  }
  //Credit to Utsumi #52258 for the idea and some of the code.
  async function lobbyToggle() {
    await waitFor(() => !!ChatSearchNormalDraw);
    modApi.hookFunction('ChatSearchNormalDraw', 4, (args,next) => {
      next(args);
      if(CurrentScreen === "ChatSearch" && GameVersion == "R99")
      {
        var curlobby;
        switch(ChatRoomSpace) {
        case "X":
          curlobby = "Mixed";
          break;

        case "":
          curlobby = "Female";
          break;

        case "M":
          curlobby = "Male";
          break;

        case "Asylum":
          curlobby = "Asylum";
          break;
        }
        DrawTextWrap(("Lobby: " + curlobby), 925, 885, 400, 100, "#FFFFFF");
        DrawButton(1265, 885, 90, 90, "", "White", "Icons/Next.png", "");
      }

    })
  }
  //Credit to Utsumi #52258 for the idea and some of the code.
  async function lobbyClick() {
    await waitFor(() => ChatSearchClick);
    modApi.hookFunction ('ChatSearchClick', 4, (args,next) => {
      next(args);
      var genders = Player.GetGenders();
      if (MouseIn(1265,885, 90, 90)){
        switch(ChatRoomSpace){
        case "X":
          if(!genders.includes("M")){
            ChatSelectStartSearch(ChatRoomSpaceType.FEMALE_ONLY);
          } else if (!genders.includes("F")){
            ChatSelectStartSearch(ChatRoomSpaceType.MALE_ONLY);
          } else {
            ChatSelectStartSearch(ChatRoomSpaceType.ASYLUM);
          }
          
          break;

        case "":
          ChatSelectStartSearch(ChatRoomSpaceType.ASYLUM);
          break;

        case "M":
          ChatSelectStartSearch(ChatRoomSpaceType.ASYLUM);
          break;

        case "Asylum":
          ChatSelectStartSearch(ChatRoomSpaceType.MIXED);
          break;
        }
      }
    })
  }

  //handles chat commands
    async function crCommands() {
    await waitFor(() => !!CommandCombine);


    var modCommands = [
      {
        Tag: "ebch",
        Description: "Calls EBCH Help Menu, prefixes most EBCH commands.",
        Action: (self, msg, args, parsed) => {
          let cmd;

          //if there is no argument, fill it with help to get the help menu
          if(self === "")
          {
            cmd = "help";
          } else {
            cmd = args.shift();
          }
          let cmd2 = args.shift();
          let cmd3 = args.shift();
          let lcposearray = posearray.map(pose =>{
            return pose.toLowerCase();
          });
          switch (cmd) {
            default: ChatRoomSendLocal(`EBCH: Unknown command. (${cmd})`);
            //help case start
            case "help":
              ChatRoomSendLocal(
                generalhelp
                );
              break;
            // help case end

            case "welcome":
              welcomemsgtoggle = (welcomemsgtoggle === 0) ? 1 : 0;
              ChatRoomSendLocal("EBCH: Welcome message turned " + (welcomemsgtoggle ? "on" : "off") + ".");
              Save();
              break;

            // reset case start
            case "reset":
              ChatRoomSendLocal("EBCH: Resetting to defaults and clearing saved settings.");
              logging = 0;
              notifs = 0;
              ungarble = 0;
              poseui = 0;
              HearingWhitelist = [];
              notifwords = [];
              Save();
            break;
            //reset case end

            case "pose":
              if(cmd2 === undefined)
              {
                cmd2 = "help";
              }
              switch(cmd2){

                default:
                  if(lcposearray.includes(cmd2)){
                    var index = lcposearray.indexOf(cmd2);
                    var ps = posearray[index];
                    if(!cmd3)
                    {
                      cmd3 = Player.MemberNumber;
                    }
                    var target = targetfind(cmd3);
                    if(target){
                      Pose(target,ps);
                      break;
                    } else {
                      ChatRoomSendLocal(`EBCH: Target couldn't be found in chatroom (${cmd3})`);
                      break;
                    }
                  } else {
                    ChatRoomSendLocal(`EBCH: Unkown Subcommand. (${cmd2})`);
                  }

                case "help":
                  ChatRoomSendLocal(
                  posehelp
                  );
                  break;

                case "on":
                  if(poseuirender === 0){
                    poseuirender = 1;
                    ChatRoomSendLocal("EBCH: Rendering of the pose ui button turned on.");
                    Save();
                  } else {
                    ChatRoomSendLocal("EBCH: Pose UI rendering already on.");
                  }
                  break;

                case "off":
                  if(poseuirender === 1){
                    poseuirender = 0;
                    ChatRoomSendLocal("EBCH: Rendering of the pose ui button turned off.");
                    Save();
                  } else {
                    ChatRoomSendLocal("EBCH: Rendering of the pose UI already off.")
                  }
              }
              break;

            //log case start
            case "log":
              //if there is no second argument, fill it with help instead
              if(cmd2 === undefined)
              {
                cmd2 = "help";
              }
              //begin log switch statement
              switch (cmd2) {
                default: ChatRoomSendLocal(`EBCH: Unknown subcommand. (${cmd2})`);


                case "help":
                  ChatRoomSendLocal(
                  loghelp
                  );
                  break;

                case "on":
                  if (logging === 0) {
                    if(dbsetup === 0) {openDb("BCLogs"+ JSON.stringify(Player.MemberNumber), "logs" + JSON.stringify(Player.MemberNumber));}
                    logging = 1;
                    ChatRoomSendLocal("EBCH: Chatlogging turned on.");
                    Save();
                  } else {
                    ChatRoomSendLocal("EBCH: Chatlogging already turned on.");
                  }
                  break;

                case "off":
                  if(logging === 1) {
                    logging = 0;
                    ChatRoomSendLocal("EBCH: Chatlogging turned off.");
                    Save();
                  } else {
                    ChatRoomSendLocal("EBCH: Chatlogging already turned off.");
                  }
                break;

              case "clear":
                ChatRoomSendLocal("EBCH: Attempting to clear database.");
                var store = "logs" + JSON.stringify(Player.MemberNumber);
                clearObjectStore(store);
                break;

              case "download":
                ChatRoomSendLocal("EBCH: Preparing export.");
                saveTextAsFile();
                break;


              }
              break;

            case "notifs":
              if(cmd2 === undefined)
              {
                cmd2 = "help";
              }
              switch(cmd2){
                default: ChatRoomSendLocal(`EBCH: Unknown subcommand. (${cmd2})`);

                case "help":
                  ChatRoomSendLocal(
                  notifshelp
                  );
                  break;

                case "on":
                  if (notifs === 0){
                    notifs = 1;
                    ChatRoomSendLocal("EBCH: Custom Notifications turned on.");
                    Save();
                  } else {
                    ChatRoomSendLocal("EBCH: Custom Notifications already on.");
                  }
                  break;

                case "off":
                  if(notifs === 1){
                    notifs = 0;
                    ChatRoomSendLocal("EBCH: Custom Notifications turned off.");
                    Save();
                  } else {
                    ChatRoomSendLocal("EBCH: Custom Notifications already off.");
                  }
                  break;

                case "add":
                  if(cmd3 !== ""){
                    notifwords.push(cmd3);
                    ChatRoomSendLocal("EBCH: Added " + cmd3 + " to the notification words.");
                    Save();
                  } else {
                    ChatRoomSendLocal("EBCH: No word provided as a third argument to add.");
                  }
                  break;

                case "rem":
                  var index = notifwords.indexOf(cmd3);
                  if(index > -1 && cmd3 !== "")
                  {
                    notifwords.splice(index,1);
                    ChatRoomSendLocal("EBCH: Removed " + cmd3 + " from the notification words.");
                    Save();
                  } else if(cmd3 === "") {
                    ChatRoomSendLocal("EBCH: No third argument provided.");
                  } else {
                    ChatRoomSendLocal("EBCH: Word not found in the list.");
                  }
                  break;

                case "clear":
                  notifwords = [];
                  ChatRoomSendLocal("EBCH: Notification Words cleared.");
                  Save();
                  break;

                case "list":
                  ChatRoomSendLocal("EBCH: Notification Words: " + notifwords);
                  break;



              }
              break;

            case "ungarble":
              if(cmd2 === undefined)
              {
                cmd2 = "help";
              }
              switch(cmd2){
                default: ChatRoomSendLocal(`EBCH: Unknown subcommand. (${cmd2})`);

                case "help":
                  ChatRoomSendLocal(
                  ungarblehelp
                  );
                  break;

                case "off":
                  if(ungarble !== 0){
                    ungarble = 0;
                    ChatRoomSendLocal("EBCH: Ungarble turned off.");
                    Save();
                  } else {
                    ChatRoomSendLocal("EBCH: Ungarble already off.");
                  }
                  break;

                case "hw":
                  if(ungarble !== 1) {
                    ungarble = 1;
                    ChatRoomSendLocal("EBCH: Ungarble turned on. (Hearing Whitelist mode)");
                    Save();
                  } else {
                    ChatRoomSendLocal("EBCH: Ungarble already on. (Hearing Whitelist Mode)");
                  }
                  break;

                case "all":
                  if(ungarble !== 2){
                    ungarble = 2;
                    ChatRoomSendLocal("EBCH: Ungarble turned on. (All)");
                    Save();
                  } else {
                    ChatRoomSendLocal("EBCH: Ungarble already on. (All)");
                  }
                  break;

                case "add":
                  var target = targetfind(cmd3);
                  if(target !== "" && target !== null && target !== undefined && !HearingWhitelist.includes(target.MemberNumber)) {
                    HearingWhitelist.push(target.MemberNumber);
                    ChatRoomSendLocal("EBCH: Added " + target.Name + " to the hearing whitelist.");
                    Save();
                  } else if(target !== "" || target === null || target === undefined) {
                    ChatRoomSendLocal("EBCH: Target could not be found in chatroom, or no name/number was specified.");
                  } else if(HearingWhitelist.includes(target.MemberNumber)) {
                    ChatRoomSendLocal("EBCH: Provided name/number is already on the whitelist.");
                  } else {
                    ChatRoomSendLocal("EBCH: Unspecified error.");
                  }
                  break;

                case "rem":
                  var n = cmd3;
                  n = parseInt(n);
                  if(HearingWhitelist.includes(n)){
                    var index = HearingWhitelist.indexOf(n);
                    HearingWhitelist.splice(index,1);
                    ChatRoomSendLocal("EBCH: Removed " + cmd3 + " from the hearing whitelist.");
                    Save();
                  } else {
                    ChatRoomSendLocal("EBCH: Could not find number in the hearing whitelist.");
                  }
                  break;

                case "list":
                  ChatRoomSendLocal("EBCH: Hearing Whitelist: " + HearingWhitelist);
                  break;

                case "clear":
                 HearingWhitelist = [];
                 ChatRoomSendLocal("EBCH: Hearing Whitelist Cleared.");
                 break;


              }
              break;
          }
        }
      }
    ];
    CommandCombine(modCommands);
  }

})();
