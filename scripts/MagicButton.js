function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var bcmodsdk = {};

(function (exports) {
	// Bondage Club Mod Development Kit (1.1.0)
	// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
	/** @type {ModSDKGlobalAPI} */
	(function(){const e="1.1.0";function o(e){alert("Mod ERROR:\n"+e);const o=new Error(e);throw console.error(o),o}const t=new TextEncoder;function n(e){return !!e&&"object"==typeof e&&!Array.isArray(e)}function r(e){const o=new Set;return e.filter((e=>!o.has(e)&&o.add(e)))}const i=new Map,a=new Set;function d(e){a.has(e)||(a.add(e),console.warn(e));}function s(e){const o=[],t=new Map,n=new Set;for(const r of p.values()){const i=r.patching.get(e.name);if(i){o.push(...i.hooks);for(const[o,a]of i.patches.entries())t.has(o)&&t.get(o)!==a&&d(`ModSDK: Mod '${r.name}' is patching function ${e.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${o}\nPatch1:\n${t.get(o)||""}\nPatch2:\n${a}`),t.set(o,a),n.add(r.name);}}o.sort(((e,o)=>o.priority-e.priority));const r=function(e,o){if(0===o.size)return e;let t=e.toString().replaceAll("\r\n","\n");for(const[n,r]of o.entries())t.includes(n)||d(`ModSDK: Patching ${e.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return (0, eval)(`(${t})`)}(e.original,t);let i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,e.name,n),d=r.apply(this,o);return null==a||a(),d};for(let t=o.length-1;t>=0;t--){const n=o[t],r=i;i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,e.name,n.mod),d=n.hook.apply(this,[o,e=>{if(1!==arguments.length||!Array.isArray(o))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof e}`);return r.call(this,e)}]);return null==a||a(),d};}return {hooks:o,patches:t,patchesSources:n,enter:i,final:r}}function c(e,o=!1){let r=i.get(e);if(r)o&&(r.precomputed=s(r));else {let o=window;const a=e.split(".");for(let t=0;t<a.length-1;t++)if(o=o[a[t]],!n(o))throw new Error(`ModSDK: Function ${e} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const d=o[a[a.length-1]];if("function"!=typeof d)throw new Error(`ModSDK: Function ${e} to be patched not found`);const c=function(e){let o=-1;for(const n of t.encode(e)){let e=255&(o^n);for(let o=0;o<8;o++)e=1&e?-306674912^e>>>1:e>>>1;o=o>>>8^e;}return ((-1^o)>>>0).toString(16).padStart(8,"0").toUpperCase()}(d.toString().replaceAll("\r\n","\n")),l={name:e,original:d,originalHash:c};r=Object.assign(Object.assign({},l),{precomputed:s(l),router:()=>{},context:o,contextProperty:a[a.length-1]}),r.router=function(e){return function(...o){return e.precomputed.enter.apply(this,[o])}}(r),i.set(e,r),o[r.contextProperty]=r.router;}return r}function l(){const e=new Set;for(const o of p.values())for(const t of o.patching.keys())e.add(t);for(const o of i.keys())e.add(o);for(const o of e)c(o,!0);}function f(){const e=new Map;for(const[o,t]of i)e.set(o,{name:o,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((e=>e.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return e}const p=new Map;function u(e){p.get(e.name)!==e&&o(`Failed to unload mod '${e.name}': Not registered`),p.delete(e.name),e.loaded=!1,l();}function g(e,t,r){"string"==typeof e&&"string"==typeof t&&(alert(`Mod SDK warning: Mod '${e}' is registering in a deprecated way.\nIt will work for now, but please inform author to update.`),e={name:e,fullName:e,version:t},t={allowReplace:!0===r}),e&&"object"==typeof e||o("Failed to register mod: Expected info object, got "+typeof e),"string"==typeof e.name&&e.name||o("Failed to register mod: Expected name to be non-empty string, got "+typeof e.name);let i=`'${e.name}'`;"string"==typeof e.fullName&&e.fullName||o(`Failed to register mod ${i}: Expected fullName to be non-empty string, got ${typeof e.fullName}`),i=`'${e.fullName} (${e.name})'`,"string"!=typeof e.version&&o(`Failed to register mod ${i}: Expected version to be string, got ${typeof e.version}`),e.repository||(e.repository=void 0),void 0!==e.repository&&"string"!=typeof e.repository&&o(`Failed to register mod ${i}: Expected repository to be undefined or string, got ${typeof e.version}`),null==t&&(t={}),t&&"object"==typeof t||o(`Failed to register mod ${i}: Expected options to be undefined or object, got ${typeof t}`);const a=!0===t.allowReplace,d=p.get(e.name);d&&(d.allowReplace&&a||o(`Refusing to load mod ${i}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(d));const s=e=>{"string"==typeof e&&e||o(`Mod ${i} failed to patch a function: Expected function name string, got ${typeof e}`);let t=g.patching.get(e);return t||(t={hooks:[],patches:new Map},g.patching.set(e,t)),t},f={unload:()=>u(g),hookFunction:(e,t,n)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);"number"!=typeof t&&o(`Mod ${i} failed to hook function '${e}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&o(`Mod ${i} failed to hook function '${e}': Expected hook function, got ${typeof n}`);const a={mod:g.name,priority:t,hook:n};return r.hooks.push(a),l(),()=>{const e=r.hooks.indexOf(a);e>=0&&(r.hooks.splice(e,1),l());}},patchFunction:(e,t)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);n(t)||o(`Mod ${i} failed to patch function '${e}': Expected patches object, got ${typeof t}`);for(const[n,a]of Object.entries(t))"string"==typeof a?r.patches.set(n,a):null===a?r.patches.delete(n):o(`Mod ${i} failed to patch function '${e}': Invalid format of patch '${n}'`);l();},removePatches:e=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);s(e).patches.clear(),l();},callOriginal:(e,t,n)=>(g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`),"string"==typeof e&&e||o(`Mod ${i} failed to call a function: Expected function name string, got ${typeof e}`),Array.isArray(t)||o(`Mod ${i} failed to call a function: Expected args array, got ${typeof t}`),function(e,o,t=window){return c(e).original.apply(t,o)}(e,t,n)),getOriginalHash:e=>("string"==typeof e&&e||o(`Mod ${i} failed to get hash: Expected function name string, got ${typeof e}`),c(e).originalHash)},g={name:e.name,fullName:e.fullName,version:e.version,repository:e.repository,allowReplace:a,api:f,loaded:!0,patching:new Map};return p.set(e.name,g),Object.freeze(f)}function h(){const e=[];for(const o of p.values())e.push({name:o.name,fullName:o.fullName,version:o.version,repository:o.repository});return e}let m;const y=function(){if(void 0===window.bcModSdk)return window.bcModSdk=function(){const o={version:e,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:f,errorReporterHooks:Object.seal({hookEnter:null,hookChainExit:null})};return m=o,Object.freeze(o)}();if(n(window.bcModSdk)||o("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&o(`Failed to init Mod SDK: Different version already loaded ('1.1.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==e&&(alert(`Mod SDK warning: Loading different but compatible versions ('1.1.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk.version.startsWith("1.0.")&&void 0===window.bcModSdk._shim10register)){const e=window.bcModSdk,o=Object.freeze(Object.assign(Object.assign({},e),{registerMod:(o,t,n)=>o&&"object"==typeof o&&"string"==typeof o.name&&"string"==typeof o.version?e.registerMod(o.name,o.version,"object"==typeof t&&!!t&&!0===t.allowReplace):e.registerMod(o,t,n),_shim10register:!0}));window.bcModSdk=o;}return window.bcModSdk}();return (Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y})();
} (bcmodsdk));

var bcModSdk = /*@__PURE__*/getDefaultExportFromCjs(bcmodsdk);

const modApi = bcModSdk.registerMod({
    name: 'MagicButton',
    fullName: 'MagicButton',
    version: '1.2.12'
});
const MagicButtonICONS = {
    Unlock: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAxCAYAAABznEEcAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIkSURBVGhD7ZqNUcMwDEYLE8AGjMAIsAEbABMAEzACbAAbwAawATABbAAbgB5p7tIgpZYTOS7Xd/dd3Z/YlmPJstNFAJeiO9G3ogcR3x+JquNA9CR6F2md18TvT0RVwMi+iLSOpojrZ4UOaB3zarY7MpUBrbLvyM7y1Qs+gJMe/r77y6vooymugEPvNUWVY9FzU4wHp9RGE92ILOMw/lr0KdKupd5iWFEIA1I4E2nXY1yR8Gv5QqoBLfxeq6dItLIa944gU0ubVnw25DejofJ+o4i5nNMw/qHVN4sRRKocrPrwmWS8IZZGGb0+b6L7puiC+pg+fajrvCnWj3UnSCCT2V2+bjRbI2rhXxiRGp2sXGgsOLaWL5EEXom+RFoi6YJGyPWthC1atOuKVBpWilFa7BxJU9ywas51BzSZafqQY5+KmE61YPbFMqKmzrcQXNS9uGUEaXWVZ0Ma28WuFiKNYKHqKoxII9gT7Hd0KyoKUUCL1alis69FuLEHbq7oNBbugjaF+Hx0LtSntGNjWM42dpA5otPk60+UEVbqzpzeGCNI1vpOSELpPSVMInI69Y92LkRZ6fQ65vCJydkaUQuRRnRX7ND9SaQROHG7pSQqRZ2YhE8n1gRyHtcptxfLiPD0eUosIzi84gloTZiDGj2dpoRBfWyKqwwZwTFiTWQ/37aeqZWWtclKhkRuzB9QcsXpI8/L1yaNnmd2GBOSwBkkbqAWix+NvIfGLFPXswAAAABJRU5ErkJggg==",
    Checked: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAxCAYAAABznEEcAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANESURBVGhD7dlJqI1hHMfxax4jM6UMGROFosiQhbKwsEAsrISlUhZkKUNmGVZS7CTFQgqlbKQMG5EpLGSe5/H7ve7R29tzzn3uGe59bt1ffTp37DzP+z7v/xlOXVvaUr10aHhNNe0bXksmxU60Q1/Mx1KMxXN8wW+0ivTEajzCH/zEJSyGv2sVmYwLsAMF3oHH2Io+SDoO70Pw6mc7UfAeJzESyWY53iHUgQI7aEeTi1VoNu4g1PC88/ifqBLWDBmMNRhW/13p+Hxc+/dlOumIVfDBDV31vCsYjaQyHTfxC6FGZ73CMqQyguozFGdQrBplfcVODEAy6YS1+I5Qo7Ps5DlMhTN6ErEhM3AfoUbn3cI82PFk4pA4jVCD8z5gE7oimfTABrxAqNF5FzEGycThsAR3EWpw3kvMQlIZD4dRTDn9gS1IKtZ2h9FrhBqdZSfPYjiSylw8QajReTewAFWrRpbDSmvzQFxFqMF5PgdWI3d3Fce1/QjMgUuDXiinM/2wGx8RanSew2gCKo6NnYYjuIfb2IZRaEocDq51Yie1p3DYVRw7MAlO827OC2/wFjvg0IiNS+tTiFlaaCUqXtzZgXGwA9+Qf5PP2IeY2dNhtB7ZC1GM5fQ4XBBWHIeLJwuhN8pyezgEpZ6RRQhdiBCrkTu7qiyxHS4ueUNvlOXV9Y7YkVAmwt1X6H/z3sD5o2qnGI7fmNlUTlqb0R/Z9MZexOwR/JsTKHYxyoqHVo770BuGfILls/CMOBw8tYutRg9Q9bVRFxxE7FiWG/f96A6rmicRMf/vxVqHmhylOhx8cGOqSoF/exQOo9Dv86xGx1DT0zyr1AHELNYKvCOhn4d4MDAFNc8gbIdHh6GGlOsZPKJptp2aQ8sThlBjyuGsvwtOhM2ew7AShRrWFJfhHNIi8XOBPYjdF4e44V+BzmiRuLzwGXFGd0iEGtkYK14SH5LYCIdW7Kq04DpcWCYVH/aYqmXZfYiFKLVYbJFYtSy/jc0j7ubcTCV1fpqNz4gTYrGZ3btgNXJrm9xdyMaZ3Qc2tFayAHhQltT5abF4gOCQcR9iZ3y1nG5EN9Q81brNftrjCnYmvPJ+muMRjVWsLW1pPamr+wsoLy24cJhcqgAAAABJRU5ErkJggg=="
};
async function waitFor(func) {
    while (!func()) {
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
}

let modActive = false;
const mainPriority = 7;
function activeSwitch() {
    modActive = !modActive;
}
function commonHooks() {
    // Player
    modApi.hookFunction("Player.CanChangeClothesOn", mainPriority, (args, next) => {
        if (modActive) {
            return true;
        }
        return next(args);
    });
    modApi.hookFunction("Player.CanChangeToPose", mainPriority, (args, next) => {
        if (modActive) {
            return true;
        }
        return next(args);
    });
    modApi.hookFunction("Player.CanInteract", mainPriority, (args, next) => {
        if (modActive) {
            return true;
        }
        return next(args);
    });
    modApi.hookFunction("Player.CanWalk", mainPriority, (args, next) => {
        if (modActive) {
            return true;
        }
        return next(args);
    });
    modApi.hookFunction("Player.GetBlindLevel", mainPriority, (args, next) => {
        if (modActive) {
            return 0;
        }
        return next(args);
    });
    modApi.hookFunction("Player.GetClumsiness", mainPriority, (args, next) => {
        if (modActive) {
            return 0;
        }
        return next(args);
    });
    modApi.hookFunction("Player.GetBlurLevel", mainPriority, (args, next) => {
        if (modActive) {
            return 0;
        }
        return next(args);
    });
    modApi.hookFunction("Player.GetDeafLevel", mainPriority, (args, next) => {
        if (modActive) {
            return 0;
        }
        return next(args);
    });
    modApi.hookFunction("Player.GetTints", mainPriority, (args, next) => {
        if (modActive) {
            return [];
        }
        return next(args);
    });
    modApi.hookFunction("Player.HasTints", mainPriority, (args, next) => {
        if (modActive) {
            return false;
        }
        return next(args);
    });
    modApi.hookFunction("Player.IsRestrained", mainPriority, (args, next) => {
        if (modActive) {
            return false;
        }
        return next(args);
    });
    modApi.hookFunction("Player.IsSlow", mainPriority, (args, next) => {
        if (modActive) {
            return false;
        }
        return next(args);
    });
    modApi.hookFunction("Player.IsOwnedByPlayer", mainPriority, (args, next) => {
        if (modActive) {
            return true;
        }
        return next(args);
    });
    modApi.hookFunction("Player.IsLoverOfPlayer", mainPriority, (args, next) => {
        if (modActive) {
            return true;
        }
        return next(args);
    });
    modApi.hookFunction("Player.IsEnclose", mainPriority, (args, next) => {
        if (modActive) {
            return false;
        }
        return next(args);
    });
    // Activity
    modApi.hookFunction("ActivityPossibleOnGroup", mainPriority, (args, next) => {
        if (modActive) {
            return true;
        }
        return next(args);
    });
    modApi.hookFunction("ActivityCheckPrerequisite", mainPriority, (args, next) => {
        if (modActive) {
            if (![
                "TargetMouthBlocked",
                "IsGagged",
                "TargetHasPenis",
                "HasPenis",
                "TargetHasVagina",
                "HasVagina",
                "TargetHasBreasts",
                "HasBreasts",
                "TargetHasFlatChest",
                "HasFlatChest"
            ].includes(args[0])) {
                return true;
            }
        }
        return next(args);
    });
    // Character
    modApi.hookFunction("CharacterCanKneel", mainPriority, (args, next) => {
        if (modActive && args[0].ID == 0 && args[0].Effect.includes("Freeze")) {
            return true;
        }
        return next(args);
    });
    // ChatRoom
    modApi.hookFunction("ChatRoomCanLeave", mainPriority, (args, next) => {
        if (modActive) {
            return true;
        }
        return next(args);
    });
    modApi.hookFunction("ChatRoomFocusCharacter", mainPriority, (args, next) => {
        if (modActive) {
            return modApi.callOriginal("ChatRoomFocusCharacter", args);
        }
        return next(args);
    });
    modApi.hookFunction("ChatRoomOwnerPresenceRule", mainPriority, (args, next) => {
        if (modActive) {
            return false;
        }
        return next(args);
    });
    // Dialog
    modApi.hookFunction("DialogCanUnlock", mainPriority, (args, next) => {
        if (modActive && args[0].ID == 0) {
            return true;
        }
        return next(args);
    });
    modApi.hookFunction("DialogCanUseRemoteState", mainPriority, (args, next) => {
        if (modActive && args[0].ID == 0) {
            const response = modApi.callOriginal("DialogCanUseRemoteState", args);
            if (response == "InvalidItem") {
                return next(args);
            }
            return "Available";
        }
        return next(args);
    });
    // Draw
    modApi.hookFunction("DrawText", mainPriority, (args, next) => {
        if (modActive && args[0] === DialogFindPlayer("TimerUnknown")) {
            const property = DialogFocusSourceItem === null || DialogFocusSourceItem === void 0 ? void 0 : DialogFocusSourceItem.Property;
            args[0] = DialogFindPlayer("TimerLeft") + " " + TimerToString(property.RemoveTimer - CurrentTime);
            next(args);
        }
        else {
            next(args);
        }
    });
    // Inventory
    modApi.hookFunction("InventoryGroupIsBlocked", mainPriority, (args, next) => {
        if (modActive) {
            return false;
        }
        return next(args);
    });
    modApi.hookFunction("InventoryPrerequisiteMessage", mainPriority, (args, next) => {
        if (modActive) {
            if ([
                "RemoveClothesForItem",
                "UnZipSuitForItem",
                "RemoveChastityFirst"
            ].includes(next(args))) {
                return "";
            }
        }
        return next(args);
    });
    // Padlocks
    const PasswordPadlocks = [
        "InventoryItemMiscPasswordPadlockLoad",
        "InventoryItemMiscTimerPasswordPadlockLoad",
        "InventoryItemMiscSafewordPadlockLoad",
        // "InventoryItemMiscCombinationPadlockLoad"
    ];
    for (const padLocks of PasswordPadlocks) {
        modApi.hookFunction(padLocks, mainPriority, (args, next) => {
            var _a;
            next(args);
            if (modActive) {
                (_a = document.getElementById("Password")) === null || _a === void 0 ? void 0 : _a.setAttribute("placeholder", DialogFocusSourceItem.Property.Password);
            }
        });
    }
    modApi.hookFunction("InventoryItemMiscCombinationPadlockLoad", mainPriority, (args, next) => {
        var _a;
        next(args);
        if (modActive) {
            (_a = document.getElementById("CombinationNumber")) === null || _a === void 0 ? void 0 : _a.setAttribute("placeholder", DialogFocusSourceItem.Property.CombinationNumber);
        }
    });
    //Server
    modApi.hookFunction("ServerSend", mainPriority, (args, next) => {
        if (modActive) {
            return modApi.callOriginal("ServerSend", args);
        }
        return next(args);
    });
    // Struggle
    modApi.hookFunction("StruggleMinigameStart", mainPriority, (args, next) => {
        next(args);
        if (modActive) {
            StruggleProgress = 100;
        }
    });
}
function drawCheckboxWithHoverText(Left, Top, Width, Height, HoveringText = "", IsChecked, Disabled = false, CheckImage = "Icons/Checked.png") {
    DrawButton(Left, Top, Width, Height, "", Disabled ? "#ebebe4" : "White", IsChecked ? CheckImage : "", HoveringText, Disabled);
}
const switchButton = [68, 948, 52, 52];
const unlockButton = [68, 890, 52, 52];
function dialogGui() {
    // 开关
    modApi.hookFunction("DialogDraw", 3, (args, next) => {
        next(args);
        drawCheckboxWithHoverText(...switchButton, "MagicButton", modActive, undefined, MagicButtonICONS.Checked);
    });
    modApi.hookFunction("ChatRoomMenuDraw", 3, (args, next) => {
        next(args);
        DrawButton(0, 90, 45, 45, "M", "White", "", "MagicButton");
    });
    // 移除物品按钮
    modApi.hookFunction("DialogDrawItemMenu", 3, (args, next) => {
        if (args[0] === Player && InventoryGet(Player, Player.FocusGroup.Name) && modActive) {
            DrawButton(...unlockButton, "", "", MagicButtonICONS.Unlock, "快速移除物品(不会在聊天中显示)");
        }
        next(args);
    });
    // 按按钮
    modApi.hookFunction("DialogClick", 3, (args, next) => {
        if (MouseIn(...switchButton)) {
            activeSwitch();
            return;
        }
        if (Player.FocusGroup && modActive) {
            if (InventoryGet(Player, Player.FocusGroup.Name)) {
                if (MouseIn(...unlockButton)) {
                    InventoryRemove(Player, Player.FocusGroup.Name);
                    return;
                }
            }
        }
        next(args);
    });
    modApi.hookFunction("ChatRoomClick", 3, (args, next) => {
        if (MouseIn(0, 90, 45, 45)) {
            activeSwitch();
            return;
        }
        next(args);
    });
}
function mainButton() {
    commonHooks();
    dialogGui();
}

function extendPlayerID(playerID) {
    let ID = playerID;
    while (ID.length < 8) {
        ID += " ";
    }
    return ID;
}
function getChatMessage() {
    const elements = document.getElementsByClassName("ChatMessage");
    let output = `==========生成时间: ${new Date().toLocaleString("zh-CN")}    房间名: ${ChatRoomData.Name}==========\n`;
    for (const subElement of elements) {
        output += (`[${subElement.getAttribute("data-time")}] ${extendPlayerID(subElement.getAttribute("data-sender"))} ${subElement.innerText}\n`);
    }
    return output;
}
function getFileName() {
    const date = new Date().toLocaleDateString().replace(/\//g, "-").slice(2);
    return `${date}-${ChatRoomData.Name}`;
}
function downloadFile() {
    const file = new Blob([getChatMessage()], { type: "text/plain;charset=utf-8" });
    const aTag = document.createElement("a");
    aTag.href = URL.createObjectURL(file);
    aTag.download = getFileName() + ".txt";
    aTag.click();
}
async function exportChatCommand() {
    await waitFor(() => !!Commands);
    const cmds = [
        {
            Tag: "expo",
            Description: "导出聊天记录",
            Action: () => downloadFile()
        },
        {
            Tag: "magicbutton",
            Description: "启用/关闭MagicButton",
            Action: () => activeSwitch()
        }
    ];
    CommandCombine(cmds);
}

const stopOrgasm = [10, 10, 60, 60];
const resistOrgasm = [75, 10, 60, 60];
function orgasmControl() {
    modApi.hookFunction("ChatRoomRun", 3, (args, next) => {
        next(args);
        if (Player.ArousalSettings.OrgasmTimer > 0) {
            DrawButton(...stopOrgasm, "STOP", "White", "", "停止高潮");
        }
        if (Player.ArousalSettings.OrgasmStage === 1) {
            DrawButton(...resistOrgasm, "", "White", "Icons/Small/Remove.png", "抵抗高潮");
        }
    });
    modApi.hookFunction("ChatRoomClick", 3, (args, next) => {
        var _a, _b;
        if (((_a = Player === null || Player === void 0 ? void 0 : Player.ArousalSettings) === null || _a === void 0 ? void 0 : _a.OrgasmTimer) > 0) {
            if (MouseIn(...stopOrgasm)) {
                if ((Player === null || Player === void 0 ? void 0 : Player.ArousalSettings.OrgasmStage) === 2) {
                    ActivityOrgasmStop(Player, 20);
                }
                else {
                    ActivityOrgasmStop(Player, 60);
                }
                return;
            }
        }
        if (((_b = Player === null || Player === void 0 ? void 0 : Player.ArousalSettings) === null || _b === void 0 ? void 0 : _b.OrgasmStage) === 1) {
            if (MouseIn(...resistOrgasm)) {
                ActivityOrgasmGameGenerate(ActivityOrgasmGameDifficulty);
                return;
            }
        }
        next(args);
    });
}
function validPosePermitted(newPose, oldPose) {
    const diff = newPose.length >= oldPose.length ? newPose.filter(pose => !oldPose.includes(pose)) : oldPose.filter(pose => !newPose.includes(pose));
    if (newPose.length === 0 || diff.length === 0) {
        return true;
    }
    console.log(`diff: ${diff}`);
    // 'BaseUpper', 'BaseLower', 'Kneel'
    if (diff.length > 1 || !['BaseLower', 'Kneel'].includes(diff[0])) {
        return false;
    }
    else {
        return true;
    }
}
function antiPoseChange() {
    modApi.hookFunction("ChatRoomSyncSingle", 0, (args, next) => {
        var _a;
        const lastPose = Player.ActivePose;
        const data = args[0];
        // console.log(data);
        if (data.SourceMemberNumber !== Player.MemberNumber && data.Character.MemberNumber === Player.MemberNumber && !validPosePermitted(data.Character.ActivePose, lastPose)) {
            const sourceCharacter = ((_a = ChatRoomCharacter.find(c => c.MemberNumber === data.SourceMemberNumber)) === null || _a === void 0 ? void 0 : _a.Name) + `(${data.SourceMemberNumber})`;
            console.log(`Pose change detected ${data.Character.ActivePose} from ${sourceCharacter}.`);
            Player.ActivePose = lastPose;
            ChatRoomCharacterUpdate(Player);
            args[0].Character.ActivePose = lastPose;
            next(args);
            // ServerSend("ChatRoomChat", {
            //     Content: "PoseChangeWarn",
            //     Type: "Action",
            //     Dictionary: [
            //         // Message itself
            //         { Tag: "MISSING PLAYER DIALOG: PoseChangeWarn", Text: `Pose change from ${sourceCharacter} denied.` },
            //     ],
            // });
        }
        else {
            next(args);
        }
    });
}
function immediateMaidService() {
    modApi.hookFunction("MainHallClick", 0, (args, next) => {
        next(args);
        if (MainHallNextEventTimer != null) {
            MainHallNextEventTimer = CommonTime();
        }
    });
}
function alwaysActive() {
    orgasmControl();
    antiPoseChange();
    immediateMaidService();
}

let modIsInit = false;
function init() {
    mainButton();
    alwaysActive();
    exportChatCommand();
}
function initWait() {
    modApi.hookFunction("LoginResponse", 0, (args, next) => {
        next(args);
        const C = args[0];
        if (typeof (C) == "object" && C.Name != null && C.AccountName != null && !modIsInit) { //大概是登录成功吧
            init();
            modIsInit = true;
        }
    });
}
initWait();
