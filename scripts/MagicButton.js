// ==UserScript==
// @name         MagicButton
// @namespace    https://www.bondageprojects.com/
// @version      1.4.2
// @description  Act as not tied.
// @author       fielr
// @match        https://bondageprojects.elementfx.com/*
// @match        https://www.bondageprojects.elementfx.com/*
// @match        https://bondage-europe.com/*
// @match        https://www.bondage-europe.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var bcmodsdk = {};

	(function (exports) {
		// Bondage Club Mod Development Kit (1.2.0)
		// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
		/** @type {ModSDKGlobalAPI} */
		(function(){const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return !!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o));}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name);}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return (0, eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c};}return {hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else {let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o;}return ((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router;}return r}function d(){for(const o of i.values())o.precomputed=s(o);}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d();}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d());}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d();})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d();})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return (Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y})(); 
	} (bcmodsdk));

	var bcModSdk = /*@__PURE__*/getDefaultExportFromCjs(bcmodsdk);

	const modApi = bcModSdk.registerMod({
	    name: 'MagicButton',
	    fullName: 'MagicButton',
	    version: '1.4.2'
	});
	const HOOK_PRIORITY = {
	    observe: 0,
	    addBehaviour: 3,
	    normal: 7,
	    overrideBehaviour: 15,
	};
	const ICONS = {
	    Unlock: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAxCAYAAABznEEcAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIkSURBVGhD7ZqNUcMwDEYLE8AGjMAIsAEbABMAEzACbAAbwAawATABbAAbgB5p7tIgpZYTOS7Xd/dd3Z/YlmPJstNFAJeiO9G3ogcR3x+JquNA9CR6F2md18TvT0RVwMi+iLSOpojrZ4UOaB3zarY7MpUBrbLvyM7y1Qs+gJMe/r77y6vooymugEPvNUWVY9FzU4wHp9RGE92ILOMw/lr0KdKupd5iWFEIA1I4E2nXY1yR8Gv5QqoBLfxeq6dItLIa944gU0ubVnw25DejofJ+o4i5nNMw/qHVN4sRRKocrPrwmWS8IZZGGb0+b6L7puiC+pg+fajrvCnWj3UnSCCT2V2+bjRbI2rhXxiRGp2sXGgsOLaWL5EEXom+RFoi6YJGyPWthC1atOuKVBpWilFa7BxJU9ywas51BzSZafqQY5+KmE61YPbFMqKmzrcQXNS9uGUEaXWVZ0Ma28WuFiKNYKHqKoxII9gT7Hd0KyoKUUCL1alis69FuLEHbq7oNBbugjaF+Hx0LtSntGNjWM42dpA5otPk60+UEVbqzpzeGCNI1vpOSELpPSVMInI69Y92LkRZ6fQ65vCJydkaUQuRRnRX7ND9SaQROHG7pSQqRZ2YhE8n1gRyHtcptxfLiPD0eUosIzi84gloTZiDGj2dpoRBfWyKqwwZwTFiTWQ/37aeqZWWtclKhkRuzB9QcsXpI8/L1yaNnmd2GBOSwBkkbqAWix+NvIfGLFPXswAAAABJRU5ErkJggg==",
	    Checked: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAxCAYAAABznEEcAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANESURBVGhD7dlJqI1hHMfxax4jM6UMGROFosiQhbKwsEAsrISlUhZkKUNmGVZS7CTFQgqlbKQMG5EpLGSe5/H7ve7R29tzzn3uGe59bt1ffTp37DzP+z7v/xlOXVvaUr10aHhNNe0bXksmxU60Q1/Mx1KMxXN8wW+0ivTEajzCH/zEJSyGv2sVmYwLsAMF3oHH2Io+SDoO70Pw6mc7UfAeJzESyWY53iHUgQI7aEeTi1VoNu4g1PC88/ifqBLWDBmMNRhW/13p+Hxc+/dlOumIVfDBDV31vCsYjaQyHTfxC6FGZ73CMqQyguozFGdQrBplfcVODEAy6YS1+I5Qo7Ps5DlMhTN6ErEhM3AfoUbn3cI82PFk4pA4jVCD8z5gE7oimfTABrxAqNF5FzEGycThsAR3EWpw3kvMQlIZD4dRTDn9gS1IKtZ2h9FrhBqdZSfPYjiSylw8QajReTewAFWrRpbDSmvzQFxFqMF5PgdWI3d3Fce1/QjMgUuDXiinM/2wGx8RanSew2gCKo6NnYYjuIfb2IZRaEocDq51Yie1p3DYVRw7MAlO827OC2/wFjvg0IiNS+tTiFlaaCUqXtzZgXGwA9+Qf5PP2IeY2dNhtB7ZC1GM5fQ4XBBWHIeLJwuhN8pyezgEpZ6RRQhdiBCrkTu7qiyxHS4ueUNvlOXV9Y7YkVAmwt1X6H/z3sD5o2qnGI7fmNlUTlqb0R/Z9MZexOwR/JsTKHYxyoqHVo770BuGfILls/CMOBw8tYutRg9Q9bVRFxxE7FiWG/f96A6rmicRMf/vxVqHmhylOhx8cGOqSoF/exQOo9Dv86xGx1DT0zyr1AHELNYKvCOhn4d4MDAFNc8gbIdHh6GGlOsZPKJptp2aQ8sThlBjyuGsvwtOhM2ew7AShRrWFJfhHNIi8XOBPYjdF4e44V+BzmiRuLzwGXFGd0iEGtkYK14SH5LYCIdW7Kq04DpcWCYVH/aYqmXZfYiFKLVYbJFYtSy/jc0j7ubcTCV1fpqNz4gTYrGZ3btgNXJrm9xdyMaZ3Qc2tFayAHhQltT5abF4gOCQcR9iZ3y1nG5EN9Q81brNftrjCnYmvPJ+muMRjVWsLW1pPamr+wsoLy24cJhcqgAAAABJRU5ErkJggg=="
	};
	let modActive = false;
	function switchActive$1() {
	    modActive = !modActive;
	}
	async function waitFor(func) {
	    while (!func()) {
	        await new Promise((resolve) => setTimeout(resolve, 10));
	    }
	}

	function cheatHooks () {
	    // Player
	    modApi.hookFunction("Player.CanChangeClothesOn", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return true;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.CanChangeToPose", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return true;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.CanInteract", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return true;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.CanWalk", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return true;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.GetBlindLevel", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return 0;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.GetClumsiness", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return 0;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.GetBlurLevel", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return 0;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.GetDeafLevel", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return 0;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.GetTints", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return [];
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.HasTints", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return false;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.IsRestrained", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return false;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.IsSlow", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return false;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.IsOwnedByPlayer", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return true;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.IsLoverOfPlayer", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return true;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("Player.IsEnclose", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return false;
	        }
	        return next(args);
	    });
	    // Activity
	    modApi.hookFunction("ActivityPossibleOnGroup", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return true;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("ActivityCheckPrerequisite", HOOK_PRIORITY.normal, (args, next) => {
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
	                "HasFlatChest",
	                // 动作拓展
	                "HasTail",
	                "HasWings",
	                "HasTailCat",
	                "HasTentacles",
	                "HasPawMittens",
	                "HasPet",
	                "HasKennel",
	                "HasItemVulvaPiercings",
	                "HasItemVulva",
	                "HasSword",
	                "HasScissors",
	                "HasCloth",
	                "HasNoCloth",
	                "HasClothLower",
	                "HasBra",
	                "HasPanties",
	                "HasSocks",
	                "Hassaddle",
	                "Hasbed",
	                "HasTentacles2",
	                "SuitLower鱼鱼尾_Luzi",
	                "阿巴阿巴"
	            ].includes(args[0])) {
	                return true;
	            }
	        }
	        return next(args);
	    });
	    // Character
	    modApi.hookFunction("CharacterCanKneel", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive && args[0].ID == 0 && args[0].Effect.includes("Freeze")) {
	            return true;
	        }
	        return next(args);
	    });
	    // ChatRoom
	    modApi.hookFunction("ChatRoomCanLeave", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return true;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("ChatRoomUpdateDisplay", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            Player.Effect = Player.Effect.filter((e) => e !== "VRAvatars");
	            next(args);
	            CharacterLoadEffect(Player);
	        }
	        else {
	            next(args);
	        }
	    });
	    modApi.hookFunction("ChatRoomFocusCharacter", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return modApi.callOriginal("ChatRoomFocusCharacter", args);
	        }
	        return next(args);
	    });
	    modApi.hookFunction("ChatRoomOwnerPresenceRule", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return false;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("ChatRoomShouldBlockGaggedOOCMessage", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive)
	            return false;
	        return next(args);
	    });
	    // ChatRoomMapView
	    modApi.hookFunction("ChatRoomMapViewHasSuperPowers", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive)
	            return true;
	        return next(args);
	    });
	    // Dialog
	    modApi.hookFunction("DialogCanUnlock", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive && args[0].ID == 0) {
	            return true;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("DialogCanUseRemoteState", HOOK_PRIORITY.normal, (args, next) => {
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
	    modApi.hookFunction("DrawText", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive && args[0] === DialogFindPlayer("TimerUnknown")) {
	            const property = DialogFocusSourceItem?.Property;
	            args[0] = DialogFindPlayer("TimerLeft") + " " + TimerToString(property?.RemoveTimer - CurrentTime);
	            next(args);
	        }
	        else {
	            next(args);
	        }
	    });
	    // Inventory
	    modApi.hookFunction("InventoryGroupIsBlocked", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return false;
	        }
	        return next(args);
	    });
	    modApi.hookFunction("InventoryPrerequisiteMessage", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            // if ([
	            //     "RemoveClothesForItem",
	            //     "UnZipSuitForItem",
	            //     "RemoveChastityFirst",
	            //     "MustBeOnBed"
	            // ].includes(next(args))) {
	            //     return "";
	            // }
	            return "";
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
	        // @ts-ignore
	        modApi.hookFunction(padLocks, HOOK_PRIORITY.normal, (args, next) => {
	            next(args);
	            if (modActive) {
	                document.getElementById("Password")?.setAttribute("placeholder", DialogFocusSourceItem?.Property?.Password);
	            }
	        });
	    }
	    // @ts-ignore
	    modApi.hookFunction("InventoryItemMiscCombinationPadlockLoad", HOOK_PRIORITY.normal, (args, next) => {
	        next(args);
	        if (modActive) {
	            document.getElementById("CombinationNumber")?.setAttribute("placeholder", DialogFocusSourceItem?.Property?.CombinationNumber);
	        }
	    });
	    //Server
	    modApi.hookFunction("ServerSend", HOOK_PRIORITY.normal, (args, next) => {
	        if (modActive) {
	            return modApi.callOriginal("ServerSend", args);
	        }
	        return next(args);
	    });
	    // Struggle
	    modApi.hookFunction("StruggleMinigameStart", HOOK_PRIORITY.normal, (args, next) => {
	        next(args);
	        if (modActive) {
	            StruggleProgress = 100;
	        }
	    });
	}

	const buttons = {
	    dialogSwitch: [68, 948, 52, 52],
	    dialogUnlock: [68, 890, 52, 52],
	    chatroomButton: [0, 815, 45, 45]
	};
	function ChatroomButton() {
	    modApi.hookFunction("ChatRoomMenuDraw", HOOK_PRIORITY.addBehaviour, (args, next) => {
	        DrawButton(...buttons.chatroomButton, "M", modActive ? "aquamarine" : "white");
	        next(args);
	    });
	    modApi.hookFunction("ChatRoomClick", HOOK_PRIORITY.normal, (args, next) => {
	        if (MouseIn(...buttons.chatroomButton)) {
	            return switchActive$1();
	        }
	        next(args);
	    });
	}
	function DialogButton() {
	    modApi.hookFunction("DialogDraw", HOOK_PRIORITY.addBehaviour, (args, next) => {
	        next(args);
	        DrawButton(...buttons.dialogSwitch, "", "white", modActive ? ICONS.Checked : "");
	    });
	    modApi.hookFunction("DialogClick", HOOK_PRIORITY.normal, (args, next) => {
	        if (MouseIn(...buttons.dialogSwitch)) {
	            return switchActive$1();
	        }
	        next(args);
	    });
	}
	function shortcuts() {
	    ChatroomButton();
	    DialogButton();
	}

	function gui () {
	    shortcuts();
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
	function registerCommand() {
	    CommandCombine({
	        Tag: "expo",
	        Description: "导出聊天记录",
	        Action: () => downloadFile()
	    });
	}
	async function exportChat() {
	    await waitFor(() => !!Commands);
	    registerCommand();
	}

	const stop = [10, 10, 60, 60];
	const resist = [75, 10, 60, 60];
	function orgasm() {
	    modApi.hookFunction("ChatRoomRun", 3, (args, next) => {
	        next(args);
	        if (Player.ArousalSettings.OrgasmTimer > 0) {
	            DrawButton(...stop, "STOP", "White", "", "停止高潮");
	        }
	        if (Player.ArousalSettings.OrgasmStage === 1) {
	            DrawButton(...resist, "", "White", "Icons/Small/Remove.png", "抵抗高潮");
	        }
	    });
	    modApi.hookFunction("ChatRoomClick", 3, (args, next) => {
	        if (Player.ArousalSettings.OrgasmTimer > 0) {
	            if (MouseIn(...stop)) {
	                if (Player?.ArousalSettings.OrgasmStage === 2) {
	                    ActivityOrgasmStop(Player, 20);
	                }
	                else {
	                    ActivityOrgasmStop(Player, 60);
	                }
	                return;
	            }
	        }
	        if (Player?.ArousalSettings?.OrgasmStage === 1) {
	            if (MouseIn(...resist)) {
	                ActivityOrgasmGameGenerate(ActivityOrgasmGameDifficulty);
	                return;
	            }
	        }
	        next(args);
	    });
	}

	let active = true;
	function switchActive() {
	    active = !active;
	    ChatRoomSendLocal(active ? "activated" : "deactivated", 3000);
	}
	const allowedPose = [
	    "BaseUpper",
	    "BaseLower",
	    "Kneel"
	];
	const forbiddenPose = [
	    "KneelingSpread",
	    "Yoked",
	    "OverTheHead",
	    "Hogtied",
	    "Suspension",
	    "AllFours",
	    "BackBoxTie",
	    "LegsClosed",
	    "Spread",
	    "BackElbowTouch",
	    "BackCuffs",
	    "TapedHands",
	    "LegsOpen"
	];
	function keepPose() {
	    modApi.hookFunction("ChatRoomSyncSingle", HOOK_PRIORITY.overrideBehaviour, (args, next) => {
	        if (active && !validatePose(args[0])) {
	            args[0].Character.ActivePose = Player.Pose;
	        }
	        next(args);
	    });
	    CommandCombine({
	        Tag: "kpose",
	        Description: "启用/禁用阻止别人改变你的姿势",
	        Action: () => switchActive()
	    });
	}
	function validatePose(data) {
	    if (data.SourceMemberNumber === Player.MemberNumber) {
	        return true;
	    }
	    const dataPose = data.Character.ActivePose;
	    const currentPose = Player.Pose;
	    if (currentPose.includes("BackBoxTie") && currentPose.includes("LegsClosed")) {
	        console.log("keepPose: BackBoxTie");
	        return false;
	    }
	    if (dataPose?.some(pose => allowedPose.includes(pose))) {
	        return true;
	    }
	    if (dataPose?.some(pose => forbiddenPose.includes(pose))) {
	        console.log("keepPose: Forbidden");
	        return false;
	    }
	    return true;
	}

	function additional () {
	    exportChat().then();
	    orgasm();
	    keepPose();
	}

	let isInit = false;
	function init() {
	    cheatHooks();
	    gui();
	    additional();
	}
	modApi.hookFunction("LoginResponse", HOOK_PRIORITY.observe, (args, next) => {
	    next(args);
	    if (CommonIsObject(args[0]) && !isInit) {
	        init();
	        isInit = true;
	    }
	});

})();
