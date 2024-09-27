// ==UserScript==
// @name         BC 动作拓展
// @namespace    https://www.bondageprojects.com/
// @version      0.3.0
// @description  代码测试
// @author       Echo
// @include      /^https:\/\/(www\.)?bondageprojects\.elementfx\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @include      /^https:\/\/(www\.)?bondage-europe\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';
    // =======================================================================================
    /** @type {ModSDKGlobalAPI} *///@ts-ignore
    const bcModSdk = function () { "use strict"; const o = "1.2.0"; function e(o) { alert("Mod ERROR:\n" + o); const e = new Error(o); throw console.error(e), e; } const t = new TextEncoder; function n(o) { return !!o && "object" == typeof o && !Array.isArray(o); } function r(o) { const e = new Set; return o.filter((o => !e.has(o) && e.add(o))); } const i = new Map, a = new Set; function c(o) { a.has(o) || (a.add(o), console.warn(o)); } function s(o) { const e = [], t = new Map, n = new Set; for (const r of f.values()) { const i = r.patching.get(o.name); if (i) { e.push(...i.hooks); for (const [e, a] of i.patches.entries()) t.has(e) && t.get(e) !== a && c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e) || ""}\nPatch2:\n${a}`), t.set(e, a), n.add(r.name); } } e.sort(((o, e) => e.priority - o.priority)); const r = function (o, e) { if (0 === e.size) return o; let t = o.toString().replaceAll("\r\n", "\n"); for (const [n, r] of e.entries()) t.includes(n) || c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`), t = t.replaceAll(n, r); return (0, eval)(`(${t})`); }(o.original, t); let i = function (e) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookChainExit) || void 0 === i ? void 0 : i.call(t, o.name, n), c = r.apply(this, e); return null == a || a(), c; }; for (let t = e.length - 1; t >= 0; t--) { const n = e[t], r = i; i = function (e) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookEnter) || void 0 === i ? void 0 : i.call(t, o.name, n.mod), c = n.hook.apply(this, [e, o => { if (1 !== arguments.length || !Array.isArray(e)) throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`); return r.call(this, o); }]); return null == a || a(), c; }; } return { hooks: e, patches: t, patchesSources: n, enter: i, final: r }; } function l(o, e = !1) { let r = i.get(o); if (r) e && (r.precomputed = s(r)); else { let e = window; const a = o.split("."); for (let t = 0; t < a.length - 1; t++)if (e = e[a[t]], !n(e)) throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0, t + 1).join(".")} is not object`); const c = e[a[a.length - 1]]; if ("function" != typeof c) throw new Error(`ModSDK: Function ${o} to be patched not found`); const l = function (o) { let e = -1; for (const n of t.encode(o)) { let o = 255 & (e ^ n); for (let e = 0; e < 8; e++)o = 1 & o ? -306674912 ^ o >>> 1 : o >>> 1; e = e >>> 8 ^ o; } return ((-1 ^ e) >>> 0).toString(16).padStart(8, "0").toUpperCase(); }(c.toString().replaceAll("\r\n", "\n")), d = { name: o, original: c, originalHash: l }; r = Object.assign(Object.assign({}, d), { precomputed: s(d), router: () => { }, context: e, contextProperty: a[a.length - 1] }), r.router = function (o) { return function (...e) { return o.precomputed.enter.apply(this, [e]); }; }(r), i.set(o, r), e[r.contextProperty] = r.router; } return r; } function d() { for (const o of i.values()) o.precomputed = s(o); } function p() { const o = new Map; for (const [e, t] of i) o.set(e, { name: e, original: t.original, originalHash: t.originalHash, sdkEntrypoint: t.router, currentEntrypoint: t.context[t.contextProperty], hookedByMods: r(t.precomputed.hooks.map((o => o.mod))), patchedByMods: Array.from(t.precomputed.patchesSources) }); return o; } const f = new Map; function u(o) { f.get(o.name) !== o && e(`Failed to unload mod '${o.name}': Not registered`), f.delete(o.name), o.loaded = !1, d(); } function g(o, t) { o && "object" == typeof o || e("Failed to register mod: Expected info object, got " + typeof o), "string" == typeof o.name && o.name || e("Failed to register mod: Expected name to be non-empty string, got " + typeof o.name); let r = `'${o.name}'`; "string" == typeof o.fullName && o.fullName || e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`), r = `'${o.fullName} (${o.name})'`, "string" != typeof o.version && e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`), o.repository || (o.repository = void 0), void 0 !== o.repository && "string" != typeof o.repository && e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`), null == t && (t = {}), t && "object" == typeof t || e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`); const i = !0 === t.allowReplace, a = f.get(o.name); a && (a.allowReplace && i || e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`), u(a)); const c = o => { let e = g.patching.get(o.name); return e || (e = { hooks: [], patches: new Map }, g.patching.set(o.name, e)), e; }, s = (o, t) => (...n) => { var i, a; const c = null === (a = (i = m.errorReporterHooks).apiEndpointEnter) || void 0 === a ? void 0 : a.call(i, o, g.name); g.loaded || e(`Mod ${r} attempted to call SDK function after being unloaded`); const s = t(...n); return null == c || c(), s; }, p = { unload: s("unload", (() => u(g))), hookFunction: s("hookFunction", ((o, t, n) => { "string" == typeof o && o || e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`); const i = l(o), a = c(i); "number" != typeof t && e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`), "function" != typeof n && e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`); const s = { mod: g.name, priority: t, hook: n }; return a.hooks.push(s), d(), () => { const o = a.hooks.indexOf(s); o >= 0 && (a.hooks.splice(o, 1), d()); }; })), patchFunction: s("patchFunction", ((o, t) => { "string" == typeof o && o || e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`); const i = l(o), a = c(i); n(t) || e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`); for (const [n, i] of Object.entries(t)) "string" == typeof i ? a.patches.set(n, i) : null === i ? a.patches.delete(n) : e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`); d(); })), removePatches: s("removePatches", (o => { "string" == typeof o && o || e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`); const t = l(o); c(t).patches.clear(), d(); })), callOriginal: s("callOriginal", ((o, t, n) => { "string" == typeof o && o || e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`); const i = l(o); return Array.isArray(t) || e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`), i.original.apply(null != n ? n : globalThis, t); })), getOriginalHash: s("getOriginalHash", (o => { "string" == typeof o && o || e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`); return l(o).originalHash; })) }, g = { name: o.name, fullName: o.fullName, version: o.version, repository: o.repository, allowReplace: i, api: p, loaded: !0, patching: new Map }; return f.set(o.name, g), Object.freeze(p); } function h() { const o = []; for (const e of f.values()) o.push({ name: e.name, fullName: e.fullName, version: e.version, repository: e.repository }); return o; } let m; const y = void 0 === window.bcModSdk ? window.bcModSdk = function () { const e = { version: o, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: p, errorReporterHooks: Object.seal({ apiEndpointEnter: null, hookEnter: null, hookChainExit: null }) }; return m = e, Object.freeze(e); }() : (n(window.bcModSdk) || e("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== o && alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk); return "undefined" != typeof exports && (Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = y), y; }();

    const MOD_NAME = "动作拓展";
    const MOD_FULL_NAME = "动作拓展";
    const MOD_VERSION = "0.3.2";

    const 笨蛋Luzi = bcModSdk.registerMod({
        name: MOD_NAME,
        fullName: MOD_FULL_NAME,
        version: MOD_VERSION
    });

    const w = window;
    const ActivityICONS = new Map();
    const poseMapping = {};

    function patchFunction(target, patches) {
        笨蛋Luzi.patchFunction(target, patches);
    }

    // patchFunction("DrawCharacter", {
    //     'if (CurrentScreen != "ChatRoom" || ChatRoomHideIconState <= 1)': '',
    //     'DrawArousalMeter(C, X, Y, Zoom);': '',
    //     'OnlineGameDrawCharacter(C, X, Y, Zoom);': '',
    //     'if (C.HasHiddenItems) DrawImageZoomCanvas("Screens/Character/Player/HiddenItem.png", DrawCanvas, 0, 0, 86, 86, X + 54 * Zoom, Y + 880 * Zoom, 70 * Zoom, 70 * Zoom);': '',
    //     'if ((C.Name != "") && ((CurrentModule == "Room") || (CurrentModule == "Online" && !(CurrentScreen == "ChatRoom" && ChatRoomHideIconState >= 3)) || ((CurrentScreen == "Wardrobe") && !C.IsPlayer())) && (CurrentScreen != "Private") && (CurrentScreen != "PrivateBed") && (CurrentScreen != "PrivateRansom"))': '',
    //     'if ((CurrentScreen !== "ChatRoom") || (ChatRoomMapViewIsActive() === false) || (CurrentCharacter != null))': '',
    //     'if ((!Player.IsBlind() && BlurLevel <= 10) || (Player.GameplaySettings && Player.GameplaySettings.SensDepChatLog == "SensDepLight"))': '',
    //     'DrawCanvas.font = CommonGetFont(30);': '',
    //     'const NameOffset = CurrentScreen == "ChatRoom" && (ChatRoomCharacter.length > 5 || (ChatRoomCharacter.length == 5 && CommonPhotoMode)) && CurrentCharacter == null ? -4 : 0;': '',
    //     'DrawText(CharacterNickname(C), X + 255 * Zoom, Y + 980 * Zoom + NameOffset, (CommonIsColor(C.LabelColor)) ? C.LabelColor : "White", "Black");': '',
    //     'DrawCanvas.font = CommonGetFont(36);': '',
    // });

    var isLogin = false;
    笨蛋Luzi.hookFunction('LoginResponse', 0, (args, next) => {
        if (!isLogin) {
            console.log("动作拓展0.3.1已加载！")

            // 屏蔽跨域
            patchFunction("GLDrawLoadImage", {
                "Img.src = url;": 'Img.crossOrigin = "Anonymous";\n\t\tImg.src = url;',
            });
            patchFunction("CommonDynamicFunction", {
                "else": '// else',
                "console.log": '// console.log',
            });


            isLogin = true;
        }
        next(args);
    });






    /**
     * 替换原始动作
     * @param {string} args - 聊天数据
     * @param {string} itemSlot - 道具所在部位
     * @param {string} itemName - 道具名称
     * @param {string} itemContent - 道具内容
     * @param {string} replacementText - 替换文本
     */
    function ReplaceOriginalAction(args, itemSlot, itemName, itemContent, replacementText) {
        if (!!InventoryIsItemInList(Player, itemSlot, itemName)) {
            if (args[0] == "ChatRoomChat" && args[1]?.Type == "Activity") {
                if (args[1] && args[1]?.Content === itemContent) {
                    args[1].Content = "笨蛋Luzi";
                    args[1].Dictionary.push({
                        Tag: "MISSING ACTIVITY DESCRIPTION FOR KEYWORD " + args[1].Content,
                        Text: replacementText
                    });
                }
            }
        }
    }

    // 替换自己发出去的文字
    笨蛋Luzi.hookFunction("ServerSend", 5, (args, next) => {
        if (args[0] == "ChatRoomChat" && args[1]?.Type == "Activity") {
            let data = args[1];
            let actName = data.Dictionary[3]?.ActivityName ?? "";
            if (actName.indexOf("笨蛋Luzi_") == 0) {
                let { metadata, substitutions } = ChatRoomMessageRunExtractors(data, Player)
                let msg = ActivityDictionaryText(data.Content);
                msg = CommonStringSubstitute(msg, substitutions ?? [])
                data.Dictionary.push({
                    Tag: "MISSING ACTIVITY DESCRIPTION FOR KEYWORD " + data.Content,
                    Text: msg
                });
            }
            if (actName.indexOf("笨蛋笨Luzi_") == 0) {
                let { metadata, substitutions } = ChatRoomMessageRunExtractors(data, Player)
                let msg = ActivityDictionaryText(data.Content);
                msg = CommonStringSubstitute(msg, substitutions ?? [])
                data.Dictionary.push({
                    Tag: "MISSING ACTIVITY DESCRIPTION FOR KEYWORD " + data.Content,
                    Text: msg
                });
            }
            let language = localStorage.getItem("BondageClubLanguage");
            if ((language === "CN" || language === "TW")) {
                ReplaceOriginalAction(args, "SuitLower", "鱼鱼尾_Luzi", "ChatSelf-ItemFeet-Wiggle", "SourceCharacter摇晃自己的鱼尾.")
                ReplaceOriginalAction(args, "SuitLower", "鱼鱼尾_Luzi", "ChatSelf-ItemBoots-Wiggle", "SourceCharacter摇晃自己的鱼尾.")
                ReplaceOriginalAction(args, "SuitLower", "鱼鱼尾_Luzi", "ChatOther-ItemFeet-Kick", "SourceCharacter用鱼尾在TargetCharacter的小腿上拍了一下.")
                ReplaceOriginalAction(args, "SuitLower", "鱼鱼尾_Luzi", "ChatOther-ItemLegs-Kick", "SourceCharacter用鱼尾在TargetCharacter的大腿上拍了一下.")
                ReplaceOriginalAction(args, "SuitLower", "鱼鱼尾_Luzi", "ChatSelf-ItemBoots-笨蛋Luzi_跺脚", "SourceCharacter用鱼尾不停地拍打着地面.")
                ReplaceOriginalAction(args, "SuitLower", "鱼鱼尾_Luzi", "ChatSelf-ItemBoots-Lick", "SourceCharacter舔PronounPossessive的鱼尾巴.")
                ReplaceOriginalAction(args, "SuitLower", "鱼鱼尾_Luzi", "ChatSelf-ItemFeet-Caress", "SourceCharacter轻抚自己的鱼尾.")
                ReplaceOriginalAction(args, "SuitLower", "鱼鱼尾_Luzi", "ChatSelf-ItemBoots-Caress", "SourceCharacter抚摸PronounPossessive的鱼尾.")
                ReplaceOriginalAction(args, "SuitLower", "鱼鱼尾_Luzi", "ChatSelf-ItemFeet-Tickle", "SourceCharacter挠了挠自己的鱼尾.")
                ReplaceOriginalAction(args, "SuitLower", "鱼鱼尾_Luzi", "ChatSelf-ItemLegs-笨蛋Luzi_摇晃双腿", "SourceCharacter摇晃PronounPossessive的鱼尾.")
                ReplaceOriginalAction(args, "SuitLower", "鱼鱼尾_Luzi", "ChatSelf-ItemBoots-LSCG_Flick", "SourceCharacter轻弹自己的鱼尾.")
            }

            // 找到具有 ActivityName 属性的对象
            // const activityObjects = data.Dictionary.filter(item => item.hasOwnProperty('ActivityName'));
            // activityObjects.forEach(activityObject => {// 遍历找到的对象并替换 ActivityName 值
            //     activityObject.ActivityName = 'ShockItem';// 将 ActivityName 值替换为 'ShockItem'
            // });
            // console.log(args)

        }
        next(args);
    });


    /**
     * 创建活动对象的函数
     * @param {string} prerequisite - 动作前提条件
     * @param {string} name - 动作名称
     * @param {string} targetSelf - 对自己做动作的部位
     * @param {string} target - 对他人做动作的部位
     * @param {number} maxProgressSelf - 对自己做动作最大的兴奋值
     * @param {number} maxProgress - 对他人做动作最大的兴奋值
     * @param {Array} activityExpression - 动作表情
     * @param {string} targetSelftext - 对自己做动作的描述
     * @param {string} targettext - 对他人做动作的描述
     * @param {string} assetgroup - 道具图片的组名没有就 ""
     * @param {string} imageName - 如果道具组名没有就填写姿势图片名称
     * @param {boolean} modPosture - true修改姿势  false不修改姿势
     * @param {boolean} modifyOwnPosture - true修改自己的姿势  false活动的目标动作修改自己的姿势
     * @param {string} postureName - 姿势名称
     * @returns {object} - 包含创建的活动信息的对象
     */
    function createActivity(activityInfo) {
        const {
            prerequisite,
            name,
            targetSelf,
            target,
            maxProgressSelf,
            maxProgress,
            activityExpression,
            targetSelftext,
            targettext,
            assetgroup,
            imageName,
            modPosture,
            modifyOwnPosture,
            postureName
        } = activityInfo;

        const activity = {
            Name: `笨蛋Luzi_${name}`, // 道具名字
            TargetSelf: [targetSelf], // 自己的部位
            Target: [target], // 对方的部位
            MaxProgressSelf: maxProgressSelf, // 自己目标最大进度
            MaxProgress: maxProgress, // 对方活动最大进度
            Prerequisite: prerequisite, // 前提条件
            ActivityExpression: activityExpression, // 活动表情
        };
        ActivityFemale3DCG.push(activity); // 这个是把自己的活动数组添加进去
        ActivityFemale3DCGOrdering.push(activity.Name); // 这个是活动名字
        ActivityDictionary.push([`Activity笨蛋Luzi_${name}`, `${name}`]);
        if (targetSelftext) {
            ActivityDictionary.push([`Label-ChatSelf-${targetSelf}-${activity.Name}`, `${name}`]);
            ActivityDictionary.push([`ChatSelf-${targetSelf}-${activity.Name}`, targetSelftext]);
        };
        if (targettext) {
            ActivityDictionary.push([`Label-ChatOther-${target}-${activity.Name}`, `${name}`]);
            ActivityDictionary.push([`ChatOther-${target}-${activity.Name}`, targettext]);
        };

        if (!assetgroup) {
            ActivityICONS.set(`Assets/Female3DCG/Activity/笨蛋Luzi_${name}.png`, `Assets/Female3DCG/Activity/${imageName}.png`);
        } else {
            ActivityICONS.set(`Assets/Female3DCG/Activity/笨蛋Luzi_${name}.png`, `Assets/Female3DCG/${assetgroup}/Preview/${imageName}.png`);
        };
        if (modPosture) {
            if (modifyOwnPosture) {
                poseMapping[`ChatSelf-${targetSelf}-笨蛋Luzi_${name}`] = postureName;
            } else {
                poseMapping[`ChatOther-${target}-笨蛋Luzi_${name}`] = postureName;
            }
        };
    }
    // 添加动作
    const activitiesInfo = [
        {
            name: "歪头", prerequisite: [],
            targetSelf: "ItemNeck", targetSelftext: "SourceCharacter歪头.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "环视周围", prerequisite: [],
            targetSelf: "ItemNeck", targetSelftext: "SourceCharacter环视周围.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "上下打量", prerequisite: [],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemHead", targettext: "SourceCharacter仔细打量TargetCharacter.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "闭上眼睛", prerequisite: [],
            targetSelf: "ItemHead", targetSelftext: "SourceCharacter闭上了眼睛.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "眼睛呆滞", prerequisite: [],
            targetSelf: "ItemHead", targetSelftext: "SourceCharacter眼睛呆滞地看着前方.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "眼睛湿润", prerequisite: [],
            targetSelf: "ItemHead", targetSelftext: "SourceCharacter眼角泛着泪光.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MoanGagWhimper",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "流眼泪", prerequisite: [],
            targetSelf: "ItemHead", targetSelftext: "SourceCharacter眼泪从眼角流下.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MoanGagWhimper",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "张开嘴", prerequisite: [],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter张开了嘴.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Kiss",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "吞咽口水", prerequisite: [],
            targetSelf: "ItemNeck", targetSelftext: "SourceCharacter吞咽嘴里的口水.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MoanGagWhimper",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "流口水", prerequisite: [],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter的口水顺着嘴角流下.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MoanGagWhimper",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "轻声喘息", prerequisite: ["Talk"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter发出轻声地喘息.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MoanGagGroan",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "打哈欠", prerequisite: ["UseMouth"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter张嘴打哈欠.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Kiss",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "舔手", prerequisite: ["UseMouth"],
            targetSelf: "ItemHands", targetSelftext: "SourceCharacter舔PronounPossessive自己的手.", maxProgressSelf: 50,
            target: "ItemHands", targettext: "SourceCharacter舔TargetCharacter的手.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MasturbateTongue",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "舔手指", prerequisite: ["UseMouth"],
            targetSelf: "ItemHands", targetSelftext: "SourceCharacter舔PronounPossessive自己的手指.", maxProgressSelf: 50,
            target: "ItemHands", targettext: "SourceCharacter舔TargetCharacter的手指.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MasturbateTongue",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "吮吸手指", prerequisite: ["UseMouth"],
            targetSelf: "ItemHands", targetSelftext: "SourceCharacter吮吸PronounPossessive的手指.", maxProgressSelf: 50,
            target: "ItemHands", targettext: "SourceCharacter吮吸TargetCharacter的手指.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "FrenchKiss",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "舔脸", prerequisite: ["UseMouth"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter舔TargetCharacter的脸.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MasturbateTongue",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "舔脚", prerequisite: ["UseTougue"],
            targetSelf: "ItemBoots", targetSelftext: "SourceCharacter舔PronounPossessive自己的脚.", maxProgressSelf: 50,
            target: "ItemBoots", targettext: "SourceCharacter舔TargetCharacter的脚.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MasturbateTongue",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "嗅手", prerequisite: [],
            targetSelf: "ItemHands", targetSelftext: "SourceCharacter用鼻子嗅了嗅自己的手.", maxProgressSelf: 50,
            target: "ItemHands", targettext: "SourceCharacter用鼻子嗅了嗅TargetCharacter的手.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Kiss",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "跪下", prerequisite: ["UseArms"],
            targetSelf: "ItemLegs", targetSelftext: "SourceCharacter轻轻地跪了下来.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: true, modifyOwnPosture: true, postureName: "Kneel"
        },
        {
            name: "站起来", prerequisite: ["UseArms"],
            targetSelf: "ItemLegs", targetSelftext: "SourceCharacter手扶着地站了起来.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: true, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "跪着张开腿", prerequisite: ["UseArms"],
            targetSelf: "ItemLegs", targetSelftext: "SourceCharacter张开了PronounPossessive的腿.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: true, modifyOwnPosture: true, postureName: "KneelingSpread"
        },
        {
            name: "跪着并拢腿", prerequisite: ["UseArms"],
            targetSelf: "ItemLegs", targetSelftext: "SourceCharacter并拢了PronounPossessive的腿.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: true, modifyOwnPosture: true, postureName: "Kneel"
        },
        {
            name: "趴下", prerequisite: ["UseArms"],
            targetSelf: "ItemBoots", targetSelftext: "SourceCharacter手放身后趴在地上.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: true, modifyOwnPosture: true, postureName: "Hogtied"
        },
        {
            name: "四肢着地", prerequisite: ["UseArms"],
            targetSelf: "ItemBoots", targetSelftext: "SourceCharacter四肢着地趴在地上.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: true, modifyOwnPosture: true, postureName: "AllFours"
        },
        {
            name: "起身跪下", prerequisite: ["UseArms"],
            targetSelf: "ItemBoots", targetSelftext: "SourceCharacter起身跪下.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: true, modifyOwnPosture: true, postureName: "Kneel"
        },
        {
            name: "爬到脚边", prerequisite: [],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemBoots", targettext: "SourceCharacter爬到TargetCharacter的脚边.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: true, modifyOwnPosture: false, postureName: "AllFours"
        },
        {
            name: "蹭大腿", prerequisite: [],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemLegs", targettext: "SourceCharacter用头轻轻蹭TargetCharacter的大腿.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "PoliteKiss",
            modPosture: true, modifyOwnPosture: false, postureName: "Kneel"
        },
        {
            name: "蹭小腿", prerequisite: [],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemFeet", targettext: "SourceCharacter用头轻轻蹭TargetCharacter的小腿.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "PoliteKiss",
            modPosture: true, modifyOwnPosture: false, postureName: "AllFours"
        },
        {
            name: "踮起双脚", prerequisite: ["UseFeet"],
            targetSelf: "ItemBoots", targetSelftext: "SourceCharacter踮起PronounPossessive的双脚.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Kick",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "摇晃脚踝", prerequisite: [],
            targetSelf: "ItemBoots", targetSelftext: "SourceCharacter摇晃PronounPossessive的脚踝.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "伸出脚", prerequisite: [],
            targetSelf: "ItemBoots", targetSelftext: "SourceCharacter伸出PronounPossessive的脚.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Kick",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "掰开双腿", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemLegs", targettext: "SourceCharacter掰开TargetCharacter的双腿.", maxProgress: 500,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "夹紧双腿", prerequisite: ["HasItemVulva"],
            targetSelf: "ItemLegs", targetSelftext: "SourceCharacter夹紧了自己的腿.", maxProgressSelf: 500,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "脚托起下巴", prerequisite: ["HasKneel"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter用脚托起TargetCharacter的下巴.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Step",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "戳脸", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter戳了戳自己的脸.", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter戳了戳TargetCharacter的脸.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Caress",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "捏脸", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter捏了捏自己的脸.", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter捏了捏TargetCharacter的脸.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Pinch",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "戳手臂", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "ItemArms", targetSelftext: "SourceCharacter戳了戳自己的手臂.", maxProgressSelf: 50,
            target: "ItemArms", targettext: "SourceCharacter戳了戳TargetCharacter的手臂.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Caress",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "揉脸", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter揉了揉自己的脸.", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter揉了揉TargetCharacter的脸.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "摇晃手臂", prerequisite: ["UseHands"],
            targetSelf: "ItemArms", targetSelftext: "SourceCharacter摇晃自己的手臂.", maxProgressSelf: 50,
            target: "ItemArms", targettext: "SourceCharacter摇晃TargetCharacter的手臂.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "轻推", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemTorso", targettext: "SourceCharacter用手轻推TargetCharacter的身体.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Slap",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "托起脚", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemBoots", targettext: "SourceCharacter托起TargetCharacter的脚.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Caress",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "扭动手腕", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "ItemHands", targetSelftext: "SourceCharacter扭动PronounPossessive的手腕.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "挠头", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "ItemHead", targetSelftext: "SourceCharacter挠了挠PronounPossessive的头.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Pull",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "盖住耳朵", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "ItemEars", targetSelftext: "SourceCharacter用手盖住了自己的耳朵.", maxProgressSelf: 50,
            target: "ItemEars", targettext: "SourceCharacter用手盖住了TargetCharacter的耳朵.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "HandGag",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "遮住眼睛", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "ItemHead", targetSelftext: "SourceCharacter用手遮住了自己的眼睛.", maxProgressSelf: 50,
            target: "ItemHead", targettext: "SourceCharacter用手遮住了TargetCharacter的眼睛.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "HandGag",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "捂住头", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "ItemHead", targetSelftext: "SourceCharacter捂住自己的头.", maxProgressSelf: 50,
            target: "ItemHead", targettext: "SourceCharacter捂住TargetCharacter的头.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "HandGag",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "捂住下体", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "ItemVulva", targetSelftext: "SourceCharacter捂住自己的下体.", maxProgressSelf: 50,
            target: "ItemVulva", targettext: "SourceCharacter捂住TargetCharacter的下体.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "HandGag",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "掀开裙子", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "ItemButt", targetSelftext: "SourceCharacter掀开PronounPossessive的裙子.", maxProgressSelf: 50,
            target: "ItemButt", targettext: "SourceCharacter掀开TargetCharacter的裙子.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MasturbateHand",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "挥手", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemHands", targettext: "SourceCharacter向TargetCharacter挥手.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Slap",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "伸出手", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "ItemHands", targetSelftext: "SourceCharacter伸出自己的手.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Caress",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "捂住胸", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "ItemBreast", targetSelftext: "SourceCharacter捂住自己的胸.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Pull",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "手托起下巴", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter用手托起TargetCharacter的下巴.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Caress",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "拽链子", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemNeck", targettext: "SourceCharacter拽TargetCharacter的链子.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MasturbateHand",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "弹额头", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemHead", targettext: "SourceCharacter弹了一下TargetCharacter的额头.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Pinch",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "弹阴蒂", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemVulvaPiercings", targettext: "SourceCharacter弹了一下TargetCharacter的阴蒂.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Pinch",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "抱腿", prerequisite: ["UseArms"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemLegs", targettext: "SourceCharacter抱住TargetCharacter的腿.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Caress",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "拉扯衣角", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemPelvis", targettext: "SourceCharacter用手拉扯TargetCharacter的衣角.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Pull",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "拍头", prerequisite: ["UseHands", "UseArms"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemHead", targettext: "SourceCharacter拍打TargetCharacter的头.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Slap",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "摇晃尾巴", prerequisite: ["HasTail"],
            targetSelf: "ItemButt", targetSelftext: "SourceCharacter摇晃PronounPossessive的尾巴.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "竖起尾巴", prerequisite: ["HasTailCat"],
            targetSelf: "ItemButt", targetSelftext: "SourceCharacter的尾巴竖了起来.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "炸毛", prerequisite: ["HasTailCat"],
            targetSelf: "ItemButt", targetSelftext: "SourceCharacter弓起后背, 身体的毛发立了起来, 发出嘶的声音.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Bite",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "舔尾巴", prerequisite: ["HasTailCat"],
            targetSelf: "ItemButt", targetSelftext: "SourceCharacter舔自己的尾巴.", maxProgressSelf: 50,
            target: "ItemButt", targettext: "SourceCharacter舔TargetCharacter的尾巴.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MasturbateTongue",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "轻抚尾巴", prerequisite: ["HasTail"],
            targetSelf: "ItemButt", targetSelftext: "SourceCharacter轻抚PronounPossessive的尾巴.", maxProgressSelf: 50,
            target: "ItemButt", targettext: "SourceCharacter轻抚TargetCharacter的尾巴.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Caress",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "尾巴叼在嘴里", prerequisite: ["HasTailCat"],
            targetSelf: "ItemButt", targetSelftext: "SourceCharacter叼起自己的尾巴.", maxProgressSelf: 50,
            target: "ItemButt", targettext: "SourceCharacter叼起TargetCharacter的尾巴.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Kiss",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "抬起屁股", prerequisite: [],
            targetSelf: "ItemButt", targetSelftext: "SourceCharacter弯腰抬起PronounPossessive的屁股.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "扇动翅膀", prerequisite: ["HasWings"],
            targetSelf: "ItemArms", targetSelftext: "SourceCharacter扇动PronounPossessive的翅膀.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "躲到身后", prerequisite: [],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemTorso", targettext: "SourceCharacter躲到TargetCharacter的身后.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "SistersHug",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "移动到身后", prerequisite: [],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemTorso", targettext: "SourceCharacter移动到TargetCharacter的身后.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "SistersHug",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "下巴搭在肩膀上", prerequisite: [],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemNeck", targettext: "SourceCharacter把下巴搭在TargetCharacter的肩膀上.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "RestHead",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "手臂搭在肩膀上", prerequisite: ["UseArms"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemNeck", targettext: "SourceCharacter把手臂搭在TargetCharacter的肩膀上.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Slap",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "搂腰", prerequisite: ["UseArms", "UseHands"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemTorso", targettext: "SourceCharacter搂住TargetCharacter的腰.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "SistersHug",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "叉腰", prerequisite: ["UseArms", "UseHands"],
            targetSelf: "ItemTorso", targetSelftext: "SourceCharacter双手叉在腰上.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Choke",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "身体颤抖", prerequisite: [],
            targetSelf: "ItemTorso", targetSelftext: "SourceCharacter颤抖着身体.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "身体抽搐", prerequisite: [],
            targetSelf: "ItemTorso", targetSelftext: "SourceCharacter身体抽搐着.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "托起乳房", prerequisite: [],
            targetSelf: "ItemBreast", targetSelftext: "SourceCharacter托起PronounPossessive的双乳.", maxProgressSelf: 50,
            target: "ItemBreast", targettext: "SourceCharacter托起TargetCharacter的双乳.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "揉搓乳头", prerequisite: ["UseHands", "UseArms", "ZoneNaked"],
            targetSelf: "ItemNipples", targetSelftext: "SourceCharacter揉搓PronounPossessive的乳头.", maxProgressSelf: 90,
            target: "ItemNipples", targettext: "SourceCharacter揉搓TargetCharacter的乳头.", maxProgress: 90,
            activityExpression: [],
            assetgroup: "", imageName: "Pinch",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "双腿颤抖", prerequisite: [],
            targetSelf: "ItemLegs", targetSelftext: "SourceCharacter颤抖着双腿.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "摇晃双腿", prerequisite: [],
            targetSelf: "ItemLegs", targetSelftext: "SourceCharacter摇晃PronounPossessive的双腿.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "流出液体", prerequisite: [],
            targetSelf: "ItemVulva", targetSelftext: "SourceCharacter股间有液体顺着的大腿流下.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MoanGagWhimper",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "失禁", prerequisite: [],
            targetSelf: "ItemVulva", targetSelftext: "SourceCharacter的尿液顺着PronounPossessive大腿流下.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "MoanGagWhimper",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "撇眼", prerequisite: [],
            targetSelf: "ItemHead", targetSelftext: "SourceCharacter撇了TargetCharacter一眼.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "跺脚", prerequisite: [],
            targetSelf: "ItemBoots", targetSelftext: "SourceCharacter不停地跺脚.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Step",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "撩头发", prerequisite: ["UseArms", "UseHands"],
            targetSelf: "ItemHood", targetSelftext: "SourceCharacter撩起头发挂在耳边.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Caress",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "手指插进阴道", prerequisite: ["UseHands", "ZoneNaked", "TargetZoneNaked"],
            targetSelf: "ItemVulva", targetSelftext: "SourceCharacter手指插进自己的的阴道内.", maxProgressSelf: 90,
            target: "ItemVulva", targettext: "SourceCharacter手指插进TargetCharacter的阴道内.", maxProgress: 90,
            activityExpression: [],
            assetgroup: "", imageName: "MasturbateHand",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "拔出自己的手指", prerequisite: ["UseHands", "ZoneNaked", "TargetZoneNaked"],
            targetSelf: "ItemVulva", targetSelftext: "SourceCharacter从PronounPossessive的阴道内拔出自己的手指,手指连着自己的爱液.", maxProgressSelf: 90,
            target: "ItemVulva", targettext: "SourceCharacter从TargetCharacter的阴道内拔出自己的手指,手指连着PronounPossessive的爱液.", maxProgress: 90,
            activityExpression: [],
            assetgroup: "", imageName: "MasturbateHand",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "蠕动手指", prerequisite: ["UseHands", "ZoneNaked", "TargetZoneNaked"],
            targetSelf: "ItemVulva", targetSelftext: "SourceCharacter在PronounPossessive的阴道内蠕动手指.", maxProgressSelf: 50,
            target: "ItemVulva", targettext: "SourceCharacter在TargetCharacter的阴道内蠕动手指.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Grope",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "快速抽插", prerequisite: ["UseHands", "ZoneNaked", "TargetZoneNaked"],
            targetSelf: "ItemVulva", targetSelftext: "SourceCharacter的手在PronounPossessive的阴道内快速抽插.", maxProgressSelf: 50,
            target: "ItemVulva", targettext: "SourceCharacter的手在TargetCharacter的阴道内快速抽插.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Grope",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "钩住阴蒂环", prerequisite: ["UseHands", "HasItemVulvaPiercings"],
            targetSelf: "ItemVulvaPiercings", targetSelftext: "SourceCharacter钩住自己的阴蒂环.", maxProgressSelf: 50,
            target: "ItemVulvaPiercings", targettext: "SourceCharacter钩住TargetCharacter的阴蒂环.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Pinch",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "拉扯阴蒂环", prerequisite: ["UseHands", "HasItemVulvaPiercings"],
            targetSelf: "ItemVulvaPiercings", targetSelftext: "SourceCharacter拉了一下自己的阴蒂环.", maxProgressSelf: 50,
            target: "ItemVulvaPiercings", targettext: "SourceCharacter拉了一下TargetCharacter的阴蒂环.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Pinch",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "宠物服爬到脚边", prerequisite: ["HasPet"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemBoots", targettext: "SourceCharacter爬到TargetCharacter脚边.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: true, modifyOwnPosture: false, postureName: "AllFours"
        },
        {
            name: "宠物服蹭小腿", prerequisite: ["HasPet"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemFeet", targettext: "SourceCharacter蹭TargetCharacter的腿.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: "AllFours"
        },
        {
            name: "宠物服蹭大腿", prerequisite: ["HasPet"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemLegs", targettext: "SourceCharacter蹭TargetCharacter的腿.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: "AllFours"
        },
        {
            name: "宠物服趴下", prerequisite: ["HasPet"],
            targetSelf: "ItemLegs", targetSelftext: "SourceCharacter四肢着地趴在地上.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: true, modifyOwnPosture: false, postureName: "AllFours"
        },
        {
            name: "宠物服跪立", prerequisite: ["HasPet"],
            targetSelf: "ItemLegs", targetSelftext: "SourceCharacter手臂离地跪立.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: true, modifyOwnPosture: true, postureName: "Hogtied"
        },
        {
            name: "宠物服扑", prerequisite: [],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemArms", targettext: "SourceCharacter扑到TargetCharacter身上.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "猫爪挠手", prerequisite: ["HasPawMittens"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemHands", targettext: "SourceCharacter用爪子挠了一下TargetCharacter的手.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHands", imageName: "PawMittens",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "猫爪挠手臂", prerequisite: ["HasPawMittens"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemArms", targettext: "SourceCharacter用爪子挠了一下TargetCharacter的手臂.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHands", imageName: "PawMittens",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "猫爪舔手", prerequisite: ["HasPawMittens"],
            targetSelf: "ItemHands", targetSelftext: "SourceCharacter舔自己的爪子.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHands", imageName: "PawMittens",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "猫爪戳脸", prerequisite: ["HasPawMittens"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter用爪子戳了戳自己的脸.", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter用爪子戳了戳TargetCharacter的脸.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHands", imageName: "PawMittens",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "猫爪戳鼻子", prerequisite: ["HasPawMittens"],
            targetSelf: "ItemNose", targetSelftext: "SourceCharacter用爪子戳了戳自己的鼻子.", maxProgressSelf: 50,
            target: "ItemNose", targettext: "SourceCharacter用爪子戳了戳TargetCharacter的鼻子.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHands", imageName: "PawMittens",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "猫爪揉脸", prerequisite: ["HasPawMittens"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter用爪子揉了揉自己的脸.", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter用爪子揉了揉TargetCharacter的脸.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHands", imageName: "PawMittens",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "猫爪揉鼻子", prerequisite: ["HasPawMittens"],
            targetSelf: "ItemNose", targetSelftext: "SourceCharacter用爪子揉了揉自己的鼻子.", maxProgressSelf: 50,
            target: "ItemNose", targettext: "SourceCharacter用爪子揉了揉TargetCharacter的鼻子.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHands", imageName: "PawMittens",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "撞笼子", prerequisite: ["HasKennel"],
            targetSelf: "ItemArms", targetSelftext: "SourceCharacter用身体撞击笼子.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemDevices", imageName: "Kennel",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "咬笼子", prerequisite: ["HasKennel"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter用牙齿咬笼子.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemDevices", imageName: "Kennel",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "摇晃笼子", prerequisite: ["HasKennel"],
            targetSelf: "ItemArms", targetSelftext: "SourceCharacter摇晃笼子的门.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemDevices", imageName: "Kennel",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "泡沫剑架在脖子上", prerequisite: ["UseHands", "UseArms", "HasSword"],
            targetSelf: "ItemNeck", targetSelftext: "SourceCharacter把泡沫剑架在自己的脖子上.", maxProgressSelf: 50,
            target: "ItemNeck", targettext: "SourceCharacter把泡沫剑架在TargetCharacter的脖子上", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHandheld", imageName: "Sword",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "泡沫剑拍脸", prerequisite: ["UseHands", "UseArms", "HasSword"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter用泡沫剑轻轻拍了拍一下TargetCharacter的脸", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHandheld", imageName: "Sword",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "剪刀剪掉上衣", prerequisite: ["UseHands", "UseArms", "HasSword"],
            targetSelf: "ItemTorso", targetSelftext: "SourceCharacter用剪刀剪掉了自己的上衣.", maxProgressSelf: 50,
            target: "ItemTorso", targettext: "SourceCharacter用剪刀剪掉了TargetCharacter的上衣.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHandheld", imageName: "Scissors",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "剪刀剪掉下衣", prerequisite: ["UseHands", "UseArms", "HasSword"],
            targetSelf: "ItemPelvis", targetSelftext: "SourceCharacter用剪刀剪掉了自己的下衣.", maxProgressSelf: 50,
            target: "ItemPelvis", targettext: "SourceCharacter用剪刀剪掉了TargetCharacter的下衣.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHandheld", imageName: "Scissors",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "剪刀剪掉胸罩", prerequisite: ["UseHands", "UseArms", "HasSword"],
            targetSelf: "ItemBreast", targetSelftext: "SourceCharacter用剪刀剪掉了自己的胸罩.", maxProgressSelf: 50,
            target: "ItemBreast", targettext: "SourceCharacter用剪刀剪掉了TargetCharacter的胸罩.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHandheld", imageName: "Scissors",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "剪刀剪掉内裤", prerequisite: ["UseHands", "UseArms", "HasSword"],
            targetSelf: "ItemVulvaPiercings", targetSelftext: "SourceCharacter用剪刀剪掉了自己的内裤.", maxProgressSelf: 50,
            target: "ItemVulvaPiercings", targettext: "SourceCharacter用剪刀剪掉了TargetCharacter的内裤.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHandheld", imageName: "Scissors",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "剪刀剪掉袜子", prerequisite: ["UseHands", "UseArms", "HasSword"],
            targetSelf: "ItemBoots", targetSelftext: "SourceCharacter用剪刀剪掉了自己的袜子.", maxProgressSelf: 50,
            target: "ItemBoots", targettext: "SourceCharacter用剪刀剪掉了TargetCharacter的袜子.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemHandheld", imageName: "Scissors",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "舔触手", prerequisite: ["HasTentacles"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter舔PronounPossessive的触手.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "TailStraps", imageName: "Tentacles",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "触手摸头", prerequisite: ["HasTentacles2"],
            targetSelf: "ItemHead", targetSelftext: "SourceCharacter用触手摸了摸自己的头.", maxProgressSelf: 50,
            target: "ItemHead", targettext: "SourceCharacter用触手摸了摸TargetCharacter的头.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "TailStraps", imageName: "Tentacles",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "触手戳鼻子", prerequisite: ["HasTentacles2"],
            targetSelf: "ItemNose", targetSelftext: "SourceCharacter用触手戳了戳自己的鼻子.", maxProgressSelf: 50,
            target: "ItemNose", targettext: "SourceCharacter用触手戳了戳TargetCharacter的鼻子.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "TailStraps", imageName: "Tentacles",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "触手戳脸", prerequisite: ["HasTentacles2"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter用触手戳了戳自己的脸.", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter用触手戳了戳TargetCharacter的脸.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "TailStraps", imageName: "Tentacles",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "触手揉鼻子", prerequisite: ["HasTentacles2"],
            targetSelf: "ItemNose", targetSelftext: "SourceCharacter用触手揉了揉自己的鼻子.", maxProgressSelf: 50,
            target: "ItemNose", targettext: "SourceCharacter用触手揉了揉TargetCharacter的鼻子.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "TailStraps", imageName: "Tentacles",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "触手掀裙子", prerequisite: ["HasTentacles2"],
            targetSelf: "ItemButt", targetSelftext: "SourceCharacter用触手掀开PronounPossessive的裙子.", maxProgressSelf: 50,
            target: "ItemButt", targettext: "SourceCharacter用触手掀开TargetCharacter的裙子.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "TailStraps", imageName: "Tentacles",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "触手揉脸", prerequisite: ["HasTentacles2"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter用触手揉了揉自己的脸.", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter用触手揉了揉TargetCharacter的脸.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "TailStraps", imageName: "Tentacles",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "鱼尾揉脸", prerequisite: ["SuitLower鱼鱼尾_Luzi"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter用鱼尾揉了揉PronounPossessive自己的脸.", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter用鱼尾揉了揉TargetCharacter的脸.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemLegs", imageName: "MermaidTail",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "鱼尾戳脸", prerequisite: ["SuitLower鱼鱼尾_Luzi"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter用鱼尾戳了戳PronounPossessive自己的脸.", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter用鱼尾戳了戳TargetCharacter的脸.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemLegs", imageName: "MermaidTail",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "鱼尾抚脸", prerequisite: ["SuitLower鱼鱼尾_Luzi"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter用鱼尾轻抚PronounPossessive自己的脸颊.", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter用鱼尾轻抚TargetCharacter的脸颊.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemLegs", imageName: "MermaidTail",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "鱼尾担膝盖", prerequisite: ["SuitLower鱼鱼尾_Luzi", "IsKneeling"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemLegs", targettext: "SourceCharacter将鱼尾担在了TargetCharacter的膝盖上.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemLegs", imageName: "MermaidTail",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "鱼尾揉乳房", prerequisite: ["SuitLower鱼鱼尾_Luzi"],
            targetSelf: "ItemBreast", targetSelftext: "SourceCharacter用鱼尾揉了揉PronounPossessive自己的乳房.", maxProgressSelf: 50,
            target: "ItemBreast", targettext: "SourceCharacter用鱼尾揉了揉TargetCharacter的乳房.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemLegs", imageName: "MermaidTail",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "鱼尾扇风", prerequisite: ["SuitLower鱼鱼尾_Luzi"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter用鱼尾给自己扇了扇风.", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter用鱼尾给TargetCharacter的脸扇了扇风.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemLegs", imageName: "MermaidTail",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "鱼尾戳乳头", prerequisite: ["SuitLower鱼鱼尾_Luzi"],
            targetSelf: "ItemNipples", targetSelftext: "SourceCharacter用鱼尾戳了戳自己的乳头.", maxProgressSelf: 50,
            target: "ItemNipples", targettext: "SourceCharacter用鱼尾戳了戳TargetCharacter的乳头.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemLegs", imageName: "MermaidTail",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "鱼尾碰手", prerequisite: ["SuitLower鱼鱼尾_Luzi"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemHands", targettext: "SourceCharacter将鱼尾踝搭在了TargetCharacter的手心上.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemLegs", imageName: "MermaidTail",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "鱼尾抚弄大腿", prerequisite: ["SuitLower鱼鱼尾_Luzi"],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemLegs", targettext: "SourceCharacter用鱼尾抚弄TargetCharacter的大腿.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "ItemLegs", imageName: "MermaidTail",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "躺上去", prerequisite: [],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemArms", targettext: "SourceCharacter躺到TargetCharacter的身边.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Scissors",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "骑上去", prerequisite: [],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemTorso", targettext: "SourceCharacter骑在TargetCharacter的背上.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: true, modifyOwnPosture: false, postureName: "Kneel"
        },
        {
            name: "射击乳房", prerequisite: ["阿巴阿巴"],
            targetSelf: "ItemBreast", targetSelftext: "SourceCharacter举起枪瞄准PronounPossessive自己的乳房.", maxProgressSelf: 50,
            target: "ItemBreast", targettext: "SourceCharacter举起枪瞄准, 水弹直直击中了TargetCharacter的乳房.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "阿巴阿巴",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "射击屁股", prerequisite: ["阿巴阿巴"],
            targetSelf: "ItemButt", targetSelftext: "SourceCharacter举起枪瞄准PronounPossessive自己的屁股.", maxProgressSelf: 50,
            target: "ItemButt", targettext: "SourceCharacter举起枪瞄准, 水弹直直击中了TargetCharacter的屁股.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "阿巴阿巴",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "射击脸", prerequisite: ["阿巴阿巴"],
            targetSelf: "ItemMouth", targetSelftext: "SourceCharacter举起枪瞄准PronounPossessive自己的脸.", maxProgressSelf: 50,
            target: "ItemMouth", targettext: "SourceCharacter举起枪瞄准, 水弹直直击中了TargetCharacter的脸.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "阿巴阿巴",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "射击腰", prerequisite: ["阿巴阿巴"],
            targetSelf: "ItemTorso", targetSelftext: "SourceCharacter举起枪瞄准PronounPossessive自己的腰.", maxProgressSelf: 50,
            target: "ItemTorso", targettext: "SourceCharacter举起枪瞄准, 水弹直直击中了TargetCharacter的腰.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "阿巴阿巴",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "射击耳朵", prerequisite: ["阿巴阿巴"],
            targetSelf: "ItemEars", targetSelftext: "SourceCharacter举起枪瞄准PronounPossessive自己的耳朵.", maxProgressSelf: 50,
            target: "ItemEars", targettext: "SourceCharacter举起枪瞄准, 水弹直直击中了TargetCharacter的耳朵.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "阿巴阿巴",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "射击手臂", prerequisite: ["阿巴阿巴"],
            targetSelf: "ItemArms", targetSelftext: "SourceCharacter举起枪瞄准PronounPossessive自己的手臂.", maxProgressSelf: 50,
            target: "ItemArms", targettext: "SourceCharacter举起枪瞄准, 水弹直直击中了TargetCharacter的手臂.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "阿巴阿巴",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "射击脖子", prerequisite: ["阿巴阿巴"],
            targetSelf: "ItemNeck", targetSelftext: "SourceCharacter举起枪瞄准PronounPossessive自己的脖子.", maxProgressSelf: 50,
            target: "ItemNeck", targettext: "SourceCharacter举起枪瞄准, 水弹直直击中了TargetCharacter的脖子.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "阿巴阿巴",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "射击头", prerequisite: ["阿巴阿巴"],
            targetSelf: "ItemHead", targetSelftext: "SourceCharacter举起枪瞄准PronounPossessive自己的头.", maxProgressSelf: 50,
            target: "ItemHead", targettext: "SourceCharacter举起枪瞄准, 水弹直直击中了TargetCharacter的头.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "阿巴阿巴",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "射击眉心", prerequisite: ["阿巴阿巴"],
            targetSelf: "ItemHead", targetSelftext: "SourceCharacter举起枪瞄准PronounPossessive自己的眉心.", maxProgressSelf: 50,
            target: "ItemHead", targettext: "SourceCharacter举起枪瞄准, 水弹正中TargetCharacter的眉心!", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "阿巴阿巴",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "射击鼻子", prerequisite: ["阿巴阿巴"],
            targetSelf: "ItemNose", targetSelftext: "SourceCharacter举起枪瞄准PronounPossessive自己的鼻子.", maxProgressSelf: 50,
            target: "ItemNose", targettext: "SourceCharacter举起枪瞄准, 水弹直直击中了TargetCharacter的鼻子.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "阿巴阿巴",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },
        {
            name: "射击肚子", prerequisite: ["阿巴阿巴"],
            targetSelf: "ItemPelvis", targetSelftext: "SourceCharacter举起枪瞄准PronounPossessive自己的肚子.", maxProgressSelf: 50,
            target: "ItemPelvis", targettext: "SourceCharacter举起枪瞄准, 水弹直直击中了TargetCharacter的肚子.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "阿巴阿巴",
            modPosture: false, modifyOwnPosture: false, postureName: ""
        },



    ];

    // 先决条件
    const CustomPrerequisiteFuncs = new Map(Object.entries({
        // 单向 仅自己
        "HasTail": (acting, acted, group) => !!InventoryGet(acted, "TailStraps"), // 有尾巴
        "HasWings": (acting, acted, group) => !!InventoryGet(acted, "Wings"), // 有翅膀
        "HasLeash": (acting, acted, group) => !!ChatRoomCanBeLeashed(acted), // 有拴绳
        "HasTailCat": (acting, acted, group) => // 有猫尾巴
            !!InventoryIsItemInList(acted, "TailStraps", "TailStrap") ||
            !!InventoryIsItemInList(acted, "TailStraps", "KittenTailStrap1"),
        "HasTentacles": (acting, acted, group) => !!InventoryIsItemInList(acted, "TailStraps", "Tentacles"), // 触手

        // 双向
        "HasPawMittens": (acting, acted, group) => // 有猫爪手套
            !!InventoryIsItemInList(acting, "ItemHands", "PawMittens"),
        "HasPet": (acting, acted, group) =>// 有宠物服
            !!InventoryIsItemInList(acting, "ItemArms", "BitchSuit") ||
            !!InventoryIsItemInList(acting, "ItemArms", "PetCrawler") ||
            !!InventoryIsItemInList(acting, "ItemArms", "StrictLeatherPetCrawler") ||
            !!InventoryIsItemInList(acting, "ItemArms", "ShinyPetSuit"),
        "HasKennel": (acting, acted, group) => // 有狗笼
            !!InventoryIsItemInList(acting, "ItemDevices", "Kennel"),
        "HasItemVulvaPiercings": (acting, acted, group) => !!InventoryGet(acted, "ItemVulvaPiercings"), // 有穿环
        "HasItemVulva": (acting, acted, group) => !!InventoryGet(acted, "ItemVulva"), // 阴部有道具
        "HasSword": (acting, acted, group) => // 有泡沫剑
            !!InventoryIsItemInList(acting, "ItemHandheld", "Sword"),
        "HasScissors": (acting, acted, group) => // 有剪刀
            !!InventoryIsItemInList(acting, "ItemHandheld", "Scissors"),

        "HasCloth": (acting, acted, group) => !!InventoryGet(acting, "Cloth"), // 有衣服
        "HasNoCloth": (acting, acted, group) => !InventoryGet(acting, "Cloth"), // 没有衣服
        "HasClothLower": (acting, acted, group) => !!InventoryGet(acting, "ClothLower"), // 有下装
        "HasBra": (acting, acted, group) => !!InventoryGet(acting, "Bra"), // 有胸罩
        "HasPanties": (acting, acted, group) => !!InventoryGet(acting, "Panties"), // 有内裤
        "HasSocks": (acting, acted, group) => !!InventoryGet(acting, "Socks"), // 有袜子
        "Hassaddle": (acting, acted, group) => !!InventoryIsItemInList(acting, "ItemTorso", "缰绳_Luzi"), // 鞍
        "Hasbed": (acting, acted, group) => !!InventoryIsItemInList(acting, "ItemDevices", "床右边_Luzi"), // 鞍
        "HasTentacles2": (acting, acted, group) => !!InventoryIsItemInList(acting, "TailStraps", "Tentacles"), // 触手
        "SuitLower鱼鱼尾_Luzi": (acting, acted, group) => !!InventoryIsItemInList(acting, "SuitLower", "鱼鱼尾_Luzi"),
        "阿巴阿巴": (acting, acted, group) => !!InventoryIsItemInList(acting, "ItemHandheld", "阿巴阿巴_Luzi"),


    }));

    笨蛋Luzi.hookFunction("ActivityCheckPrerequisite", 6, (args, next) => {
        var prereqName = args[0];
        if (CustomPrerequisiteFuncs.has(prereqName)) {
            var acting = args[1];
            var acted = args[2];
            var targetGrp = args[3];
            var customPrereqFunc = CustomPrerequisiteFuncs.get(prereqName);
            if (!customPrereqFunc)
                return next(args);
            else {
                return customPrereqFunc(acting, acted, targetGrp);
            }
        }
        else
            return next(args);
    });

    笨蛋Luzi.hookFunction('DrawImageResize', 50, (args, next) => {
        const data = args[0];
        if (typeof data === 'string' && (data.indexOf("笨蛋Luzi_") !== -1 || data.indexOf("笨蛋笨Luzi_") !== -1)) {
            if (ActivityICONS.has(data)) {
                args[0] = ActivityICONS.get(data);
            }
            if (data.indexOf("笨蛋笨Luzi_") !== -1) {
                args[0] = "Assets/Female3DCG/Activity/Wiggle.png";
            }
        }
        next(args);
    });

    笨蛋Luzi.hookFunction("ChatRoomMessage", 0, (args, next) => {
        const data = args[0];
        const content = data.Content;
        if (data.Sender === Player.MemberNumber && poseMapping.hasOwnProperty(content)) {
            const poseName = poseMapping[content];
            PoseSetActive(Player, poseName);
            ChatRoomCharacterUpdate(Player)
        }
        next(args);
    });
    let is笨蛋炉子 = false;
    笨蛋Luzi.hookFunction("LoginResponse", 10, (args, next) => {
        next(args)
        if (!is笨蛋炉子) {
            var Nibble = { Name: "Nibble", MaxProgress: 40, Prerequisite: ["ZoneAccessible", "UseMouth", "ZoneNaked"], Target: ["ItemArms", "ItemBoots", "ItemEars", "ItemFeet", "ItemHands", "ItemLegs", "ItemMouth", "ItemNeck", "ItemNipples", "ItemNose", "ItemPelvis", "ItemTorso", "ItemTorso2", "ItemVulva", "ItemVulvaPiercings",], TargetSelf: ["ItemArms", "ItemBoots", "ItemHands", "ItemMouth", "ItemNipples",], };
            ActivityFemale3DCG.push(Nibble);
            // ActivityFemale3DCG.push(Nibble.Name);

            w.newActivities = activitiesInfo.map(activityInfo => createActivity(activityInfo));
            if (Player.OnlineSettings.ECHO && Player.OnlineSettings.ECHO.炉子ActivityFemale3DCG) {
                // 解压炉子ActivityFemale3DCG
                var decompressedActivityFemale3DCG = JSON.parse(LZString.decompressFromUTF16(Player.OnlineSettings.ECHO.炉子ActivityFemale3DCG));
                ActivityFemale3DCG.push(...decompressedActivityFemale3DCG); // 将解压缩后的数据添加到ActivityFemale3DCG数组中
            }
            if (Player.OnlineSettings.ECHO && Player.OnlineSettings.ECHO.炉子ActivityFemale3DCGOrdering) {
                // 解压炉子ActivityFemale3DCGOrdering
                var decompressedActivityFemale3DCGOrdering = JSON.parse(LZString.decompressFromUTF16(Player.OnlineSettings.ECHO.炉子ActivityFemale3DCGOrdering));
                ActivityFemale3DCGOrdering.push(...decompressedActivityFemale3DCGOrdering); // 将解压缩后的数据添加到ActivityFemale3DCGOrdering数组中
            }
            if (Player.OnlineSettings.ECHO && Player.OnlineSettings.ECHO.炉子ActivityDictionary) {
                // 解压炉子ActivityDictionary
                var decompressedActivityDictionary = JSON.parse(LZString.decompressFromUTF16(Player.OnlineSettings.ECHO.炉子ActivityDictionary));
                ActivityDictionary.push(...decompressedActivityDictionary); // 将解压缩后的数据添加到ActivityDictionary数组中
            }
            is笨蛋炉子 = true;
        }
    })


    // 翻译
    const translationMap = new Map([
        ["Bap", "拍打"],
        ["SourceCharacter baps TargetCharacter.", "SourceCharacter拍打了TargetCharacter."],
        ["Headbutt", "头槌"],
        ["SourceCharacter headbutts TargetCharacter.", "SourceCharacter用头猛撞TargetCharacter"],
        ["Nuzzle", "用鼻子轻抚"],
        ["SourceCharacter nuzzles against the side of TargetCharacter's head.", "SourceCharacter用鼻子轻抚TargetCharacter头的一侧."],
        ["SourceCharacter nuzzles into TargetCharacter's neck.", "SourceCharacter用鼻子轻抚在TargetCharacter的脖子."],
        ["SourceCharacter nuzzles into TargetCharacter's arms.", "SourceCharacter用鼻子轻抚在TargetCharacter的臂膀."],
        ["SourceCharacter nuzzles underneath TargetCharacter's hand.", "SourceCharacter用鼻子轻抚在TargetCharacter手底下."],
        ["SourceCharacter nuzzles into TargetCharacter's breasts.", "SourceCharacter用鼻子轻抚在TargetCharacter的胸部."],
        ["SourceCharacter nuzzles snugly into TargetCharacter.", "SourceCharacter亲昵地用鼻子轻抚着TargetCharacter."],
        ["SourceCharacter nuzzles against TargetCharacter's thigh.", "SourceCharacter用鼻子轻抚在TargetCharacter的大腿上."],
        ["SourceCharacter nuzzles along TargetCharacter's leg.", "SourceCharacter用鼻子沿着TargetCharacter的腿轻抚着."],
        ["SourceCharacter nuzzles under TargetCharacter's feet.", "SourceCharacter用鼻子轻抚在TargetCharacter的脚底下."],
        ["Hug", "拥抱"],
        ["SourceCharacter wraps PronounPossessive arms around TargetCharacter in a big warm hug.", "SourceCharacter用温暖的拥抱将PronounPossessive的手臂紧紧地环绕在TargetCharacter身上."],
        ["SourceCharacter wraps TargetCharacter in a therapeutic selfhug.", "SourceCharacter给TargetCharacter一个治疗性的自我拥抱."],
        ["Tackle", "扑倒"],
        ["SourceCharacter full body tackles TargetCharacter!", "SourceCharacter全身扑到TargetCharacter身上."],
        ["Flop", "瘫倒"],
        ["SourceCharacter flops on top of TargetCharacter.", "SourceCharacter瘫倒在TargetCharacter的身上."],
        ["Kiss Eyes", "亲吻眼睛"],
        ["SourceCharacter gently kisses over TargetCharacter's eyes.", "SourceCharacter轻轻地亲吻着TargetCharacter的眼睛."],
        ["Rub Pussy", "摩擦私处"],
        ["SourceCharacter grinds PronounPossessive pussy against TargetCharacter's penis.", "SourceCharacter用PronounPossessive的私处摩擦着TargetCharacter的阴茎."],
        ["Slap Face", "扇脸"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's face.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的脸上."],
        ["Slap Mouth", "扇嘴巴"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's mouth.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的嘴巴上."],
        ["Slap against Pussy", "扇打私处"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's pussy.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的私处上."],
        ["Slap Breast", "扇打乳房"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's breast.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的乳房上."],
        ["Slap Thigh", "扇打大腿"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's thigh.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的大腿上."],
        ["Slap Calf", "扇打小腿"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's calf.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的小腿上."],
        ["Slap Feet", "扇打脚"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's feet.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的脚上."],
        ["Slap Butt", "扇打屁股"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's butt.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的屁股上."],
        ["Slap Neck", "扇打脖子"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's neck.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的脖子上."],
        ["Slap Arms", "扇打手臂"],
        ["ArmsLSCGSlapPenis", "SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's arm.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的手臂上."],
        ["Slap Hand", "扇打手"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's hand.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的手上."],
        ["Slap Penis", "扇打阴茎"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's penis.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的阴茎上."],
        ["Nibble Tail", "轻咬尾巴"],
        ["SourceCharacter nibbles on TargetCharacter's tail.", "SourceCharacter轻咬TargetCharacter的尾巴."],
        ["SourceCharacter nibbles on PronounPossessive own tail.", "SourceCharacter轻咬自己的尾巴."],
        ["Nibble Halo", "咬光环"],
        ["SourceCharacter nibbles on TargetCharacter's halo.", "SourceCharacter咬TargetCharacter的光环."],
        ["Nibble Wing", "轻咬翅膀"],
        ["SourceCharacter nibbles on TargetCharacter's wing.", "SourceCharacter轻咬TargetCharacter的翅膀."],
        ["SourceCharacter nibbles on PronounPossessive own wing.", "SourceCharacter轻咬自己的翅膀."],
        ["Grind with Pussy", "用阴部磨擦"],
        ["SourceCharacter grinds PronounPossessive pussy against TargetCharacter's.", "SourceCharacter用阴部磨擦着TargetCharacter的阴部."],
        ["Ride with Pussy", "用阴部骑乘"],
        ["SourceCharacter fucks TargetCharacter's penis with PronounPossessive pussy, grinding up and down.", "SourceCharacter用阴部骑乘在TargetCharacter的阴茎,上下磨擦."],
        ["Sit on Face", "坐在脸上"],
        ["SourceCharacter grinds PronounPossessive pussy against TargetCharacter's face.", "SourceCharacter用阴部磨擦着TargetCharacter的脸."],
        ["Grind with Ass", "用臀部磨擦"],
        ["SourceCharacter grinds PronounPossessive ass against TargetCharacter's vulva.", "SourceCharacter用臀部磨擦着TargetCharacter的阴道."],
        ["Ride with Ass", "用臀部骑乘"],
        ["SourceCharacter fucks TargetCharacter's penis with PronounPossessive ass.", "SourceCharacter用臀部骑乘在TargetCharacter的阴茎."],
        ["Suck", "吮吸"],
        ["SourceCharacter wraps PronounPossessive lips around TargetCharacter's ActivityAsset and sucks.", "SourceCharacter用嘴唇包裹住TargetCharacter的ActivityAsset并吮吸."],
        ["SourceCharacter wraps PronounPossessive lips around TargetCharacter's ActivityAsset and sucks.", "SourceCharacter用嘴唇包裹住TargetCharacter的ActivityAsset并吮吸."],
        ["Deepthroat", "深喉"],
        ["SourceCharacter takes TargetCharacter's ActivityAsset deep down PronounPossessive throat.", "SourceCharacter将TargetCharacter的ActivityAsset深深地吞入PronounPossessive的喉咙."],
        ["SourceCharacter takes TargetCharacter's ActivityAsset deep down PronounPossessive throat.", "SourceCharacter将TargetCharacter的ActivityAsset深深地吞入PronounPossessive的喉咙."],
        ["Suck", "吮吸"],
        ["SourceCharacter wraps PronounPossessive lips around TargetCharacter's ActivityAsset and sucks.", "SourceCharacter用嘴唇包裹住TargetCharacter的ActivityAsset并吮吸."],
        ["SourceCharacter wraps PronounPossessive lips around PronounPossessive own ActivityAsset and sucks.", "SourceCharacter用嘴唇包裹住自己的ActivityAsset并吮吸."],
        ["Deepthroat", "深喉"],
        ["SourceCharacter takes TargetCharacter's ActivityAsset deep down PronounPossessive throat.", "SourceCharacter将TargetCharacter的ActivityAsset深深地吞入PronounPossessive的喉咙."],
        ["SourceCharacter takes PronounPossessive own ActivityAsset deep down PronounPossessive throat.", "SourceCharacter将自己的ActivityAsset深深地吞入PronounPossessive的喉咙."],
        ["Eat", "咬一口"],
        ["SourceCharacter takes a big bite out of TargetCharacter's ActivityAsset.", "SourceCharacter咬了TargetCharacter的ActivityAsset一大口."],
        ["SourceCharacter takes a big bite out of PronounPossessive own ActivityAsset.", "SourceCharacter咬了自己的ActivityAsset一大口."],
        ["Grab Tongue", "抓舌头"],
        ["SourceCharacter reaches in and grabs hold of TargetCharacter's tongue with PronounPossessive fingers.", "SourceCharacter伸手抓住TargetCharacter的舌头."],
        ["Release Tongue", "松开舌头"],
        ["SourceCharacter lets go of TargetCharacter's tongue.", "SourceCharacter松开TargetCharacter的舌头."],
        ["Hold Hands", "牵手"],
        ["SourceCharacter takes TargetCharacter's hand.", "SourceCharacter牵住TargetCharacter的手."],
        ["Release Hand", "放开手"],
        ["SourceCharacter lets go of TargetCharacter's hand.", "SourceCharacter放开TargetCharacter的手."],
        ["Pinch Butt", "捏屁股"],
        ["SourceCharacter pinches TargetCharacter's butt.", "SourceCharacter捏住TargetCharacter的屁股."],
        ["SourceCharacter pinches PronounPossessive own butt.", "SourceCharacter捏住自己的屁股."],
        ["Pinch Cheek", "捏脸颊"],
        ["SourceCharacter pinches TargetCharacter's cheek.", "SourceCharacter捏住TargetCharacter的脸颊."],
        ["SourceCharacter pinches PronounPossessive own cheek.", "SourceCharacter捏住自己的脸颊."],
        ["Release Ear", "松开耳朵"],
        ["SourceCharacter releases TargetCharacter's ear.", "SourceCharacter松开TargetCharacter的耳朵."],
        ["Grab Horn", "抓住角"],
        ["SourceCharacter grabs TargetCharacter's horn.", "SourceCharacter抓住TargetCharacter的角."],
        ["Release Arm", "松开手臂"],
        ["SourceCharacter releases TargetCharacter's arm.", "SourceCharacter放开TargetCharacter的手臂."],
        ["Release Horn", "松开角"],
        ["SourceCharacter releases TargetCharacter's horn.", "SourceCharacter放开TargetCharacter的角."],
        ["Release Neck", "松开脖子"],
        ["SourceCharacter releases TargetCharacter's neck.", "SourceCharacter放开TargetCharacter的脖子."],
        ["Release Mouth", "松开嘴巴"],
        ["SourceCharacter releases TargetCharacter's mouth.", "SourceCharacter松开TargetCharacter的嘴巴."],
        ["Stuff with Foot", "用脚填塞"],
        ["SourceCharacter shoves PronounPossessive foot into TargetCharacter's mouth, grabbing their tongue with PronounPossessive toes.", "SourceCharacter用脚塞进TargetCharacter的嘴巴,用脚趾夹住他们的舌头."],
        ["Remove Foot", "移开脚"],
        ["SourceCharacter removes PronounPossessive foot from TargetCharacter's mouth.", "SourceCharacter从TargetCharacter的嘴巴里取出自己的脚."],
        ["Tug", "拽"],
        ["SourceCharacter tugs on TargetCharacter's crotch rope.", "SourceCharacter拽着TargetCharacter的胯部绳索."],
        ["SourceCharacter tugs lewdly on PronounPossessive own crotch rope.", "SourceCharacter淫荡地拽着自己的胯部绳索."],
        ["Flick Ear", "轻弹耳朵"],
        ["SourceCharacter flicks TargetCharacter's ear.", "SourceCharacter轻弹TargetCharacter的耳朵."],
        ["SourceCharacter flicks PronounPossessive own ear.", "SourceCharacter轻弹自己的耳朵."],
        ["Flick Nose", "轻弹鼻子"],
        ["SourceCharacter flicks TargetCharacter's nose.", "SourceCharacter轻弹TargetCharacter的鼻子."],
        ["SourceCharacter flicks PronounPossessive own nose.", "SourceCharacter轻弹自己的鼻子."],
        ["Flick Nipple", "轻弹乳头"],
        ["SourceCharacter flicks TargetCharacter's nipple.", "SourceCharacter轻弹TargetCharacter的乳头."],
        ["SourceCharacter flicks PronounPossessive own nipple.", "SourceCharacter轻弹自己的乳头."],
        ["Flick Butt", "轻弹屁股"],
        ["SourceCharacter flicks TargetCharacter's butt.", "SourceCharacter轻弹TargetCharacter的屁股."],
        ["SourceCharacter flicks PronounPossessive own butt.", "SourceCharacter轻弹自己的屁股."],
        ["Flick Foot", "轻弹脚底"],
        ["SourceCharacter flicks the bottom of TargetCharacter's feet.", "SourceCharacter轻弹TargetCharacter的脚底."],
        ["SourceCharacter flicks the bottom of PronounPossessive feet.", "SourceCharacter轻弹自己的脚底."],
        ["Flick Forehead", "轻弹额头"],
        ["SourceCharacter flicks TargetCharacter's forehead.", "SourceCharacter轻弹TargetCharacter的额头."],
        ["SourceCharacter flicks PronounPossessive own forehead.", "SourceCharacter轻弹自己的额头."],
        ["Flick Neck", "轻弹脖子"],
        ["SourceCharacter flicks TargetCharacter's neck.", "SourceCharacter轻弹TargetCharacter的脖子."],
        ["SourceCharacter flicks PronounPossessive own neck.", "SourceCharacter轻弹自己的脖子."],
        ["Flick Thigh", "轻弹大腿"],
        ["SourceCharacter flicks TargetCharacter's thigh.", "SourceCharacter轻弹TargetCharacter的大腿."],
        ["SourceCharacter flicks PronounPossessive own thigh.", "SourceCharacter轻弹自己的大腿."],
        ["Flick Leg", "轻弹腿"],
        ["SourceCharacter flicks TargetCharacter's leg.", "SourceCharacter轻弹TargetCharacter的腿."],
        ["SourceCharacter flicks PronounPossessive own leg.", "SourceCharacter轻弹自己的腿."],
        ["Flick Clitoris", "轻弹阴蒂"],
        ["SourceCharacter flicks TargetCharacter's clitoris.", "SourceCharacter轻弹TargetCharacter的阴蒂."],
        ["SourceCharacter flicks PronounPossessive own clitoris.", "SourceCharacter轻弹自己的阴蒂."],
        ["Flick Balls", "轻弹睾丸"],
        ["SourceCharacter flicks TargetCharacter's balls.", "SourceCharacter轻弹TargetCharacter的睾丸."],
        ["SourceCharacter flicks PronounPossessive own balls.", "SourceCharacter轻弹自己的睾丸."],
        ["Flick Pussy", "轻弹阴部"],
        ["SourceCharacter flicks TargetCharacter's pussy.", "SourceCharacter轻弹TargetCharacter的阴部."],
        ["SourceCharacter flicks PronounPossessive own pussy.", "SourceCharacter轻弹自己的阴部."],
        ["Flick Penis", "轻弹阴茎"],
        ["SourceCharacter flicks TargetCharacter's penis.", "SourceCharacter轻弹TargetCharacter的阴茎."],
        ["SourceCharacter flicks PronounPossessive own penis.", "SourceCharacter轻弹自己的阴茎."],
        ["Chomp on Arm", "咬住手臂"],
        ["SourceCharacter chomps down on TargetCharacter's arm and doesn't let go.", "SourceCharacter狠狠地咬住TargetCharacter的手臂,不松口."],
        ["Chomp on Leg", "咬住腿"],
        ["SourceCharacter chomps down on TargetCharacter's leg and doesn't let go.", "SourceCharacter狠狠地咬住TargetCharacter的腿,不松口."],
        ["Chomp on Butt", "咬住屁股"],
        ["SourceCharacter chomps down on TargetCharacter's butt and doesn't let go.", "SourceCharacter狠狠地咬住TargetCharacter的屁股,不松口."],
        ["Chomp on Neck", "咬住脖子"],
        ["SourceCharacter chomps down on TargetCharacter's neck and doesn't let go.", "SourceCharacter狠狠地咬住TargetCharacter的脖子,不松口."],
        ["Release Chomp", "松开咬住"],
        ["SourceCharacter releases PronounPossessive chomp on TargetCharacter.", "SourceCharacter松开对TargetCharacter的咬住."],
        ["Quaff", "畅饮"],
        ["SourceCharacter presses PronounPossessive ActivityAsset up against TargetCharacter's lips.", "SourceCharacter将PronounPossessive的ActivityAsset紧贴在TargetCharacter的嘴唇上."],
        ["SourceCharacter quaffs the ActivityAsset in one gulp.", "SourceCharacter一口气畅饮了ActivityAsset."],
        ["Tighten Collar", "收紧项圈"],
        ["Loosen Collar", "放松项圈"],
        ["Collar Stats", "项圈状态"],
        ["Shoot Netgun", "射击网枪"],
        ["SourceCharacter takes aim at TargetCharacter with PronounPossessive net gun.", "SourceCharacter用PronounPossessive的网枪瞄准TargetCharacter."],
        ["SourceCharacter turns PronounPossessive net gun on PronounSelf.", "SourceCharacter将PronounPossessive的网枪对准PronounSelf."],
        ["Pour into Funnel", "倒入漏斗"],
        ["SourceCharacter pours PronounPossessive ActivityAsset into TargetCharacter's funnel.", "SourceCharacter将PronounPossessive的ActivityAsset倒入TargetCharacter的漏斗中."],
        ["SourceCharacter pours PronounPossessive ActivityAsset into PronounPossessive own funnel.", "SourceCharacter将PronounPossessive的ActivityAsset倒入PronounPossessive自己的漏斗中."],
        ["Gag Mouth", "堵住嘴巴"],
        ["SourceCharacter gags TargetCharacter with PronounPossessive ActivityAsset.", "SourceCharacter用PronounPossessive的ActivityAsset堵住了TargetCharacter的嘴巴."],
        ["SourceCharacter gags PronounSelf with PronounPossessive own ActivityAsset.", "SourceCharacter用PronounPossessive自己的ActivityAsset堵住了PronounSelf的嘴巴."],
        ["Place around Neck", "放在脖子上"],
        ["SourceCharacter places PronounPossessive ActivityAsset around TargetCharacter's neck.", "SourceCharacter将PronounPossessive的ActivityAsset放在TargetCharacter的脖子上."],
        ["SourceCharacter places PronounPossessive ActivityAsset around PronounPossessive own neck.", "SourceCharacter将PronounPossessive的ActivityAsset放在PronounPossessive自己的脖子上."],
        ["Take Gag", "取下口球"],
        ["SourceCharacter removes TargetCharacter's ActivityAsset.", "SourceCharacter取下了TargetCharacter的ActivityAsset."],
        ["SourceCharacter pulls the ActivityAsset from PronounPossessive mouth.", "SourceCharacter从PronounPossessive的嘴里取下了ActivityAsset."],
        ["SourceCharacter takes TargetCharacter's ActivityAsset from around TargetPronounPossessive neck.", "SourceCharacter从TargetPronounPossessive的脖子上取下了TargetCharacter的ActivityAsset."],
        ["SourceCharacter takes PronounPossessive own ActivityAsset from around PronounPossessive neck.", "SourceCharacter从PronounPossessive的脖子上取下了PronounPossessive自己的ActivityAsset."],
        ["Move to Mouth", "移至嘴边"],
        ["SourceCharacter moves TargetCharacter's ActivityAsset up to PronounPossessive mouth.", "SourceCharacter将TargetCharacter的ActivityAsset移到了PronounPossessive的嘴边."],
        ["SourceCharacter moves PronounPossessive own ActivityAsset up to PronounPossessive mouth.", "SourceCharacter将PronounPossessive自己的ActivityAsset移到了PronounPossessive的嘴边."],
        ["Wear around Neck", "挂在脖子上"],
        ["SourceCharacter removes TargetCharacter's ActivityAsset, letting it hang around their neck.", "SourceCharacter取下了TargetCharacter的ActivityAsset,让它挂在了他们的脖子上."],
        ["SourceCharacter removes the ActivityAsset from Pro…h and lets it hang around PronounPossessive neck.", "SourceCharacter取下了PronounPossessive的ActivityAsset,并让它挂在了PronounPossessive的脖子上."],
        ["Tie Up", "捆绑"],
        ["SourceCharacter swiftly wraps PronounPossessive rope around TargetCharacter's feet, binding TargetPronounPossessive tightly.", "SourceCharacter迅速地用绳子将PronounPossessive的脚缠绕起来,紧紧地捆绑着TargetPronounPossessive."],
        ["SourceCharacter wraps PronounPossessive rope around PronounPossessive feet tightly.", "SourceCharacter紧紧地用绳子将PronounPossessive的脚缠绕起来."],
        ["SourceCharacter swiftly wraps PronounPossessive rope around TargetCharacter's legs, binding TargetPronounPossessive tightly.", "SourceCharacter迅速地用绳子将PronounPossessive的腿缠绕起来,紧紧地捆绑着TargetPronounPossessive."],
        ["SourceCharacter wraps PronounPossessive rope around PronounPossessive legs tightly.", "SourceCharacter紧紧地用绳子将PronounPossessive的腿缠绕起来."],
        ["SourceCharacter swiftly wraps PronounPossessive rope around TargetCharacter's pelvis", "binding TargetPronounPossessive tightly.", "SourceCharacter迅速地用绳子将PronounPossessive的骨盆缠绕起来,紧紧地捆绑着TargetPronounPossessive."],
        ["SourceCharacter wraps PronounPossessive rope around PronounPossessive pelvis tightly.", "SourceCharacter紧紧地用绳子将PronounPossessive的骨盆缠绕起来."],
        ["SourceCharacter swiftly wraps PronounPossessive rope around TargetCharacter's arms, binding TargetPronounPossessive tightly.", "SourceCharacter迅速地用绳子将PronounPossessive的胳膊缠绕起来,紧紧地捆绑着TargetPronounPossessive."],
        ["SourceCharacter wraps PronounPossessive rope around PronounPossessive arms tightly.", "SourceCharacter紧紧地用绳子将PronounPossessive的胳膊缠绕起来."],
        ["SourceCharacter swiftly wraps PronounPossessive rope around TargetCharacter's eyes, binding TargetPronounPossessive tightly.", "SourceCharacter迅速地用绳子将PronounPossessive的眼睛缠绕起来,紧紧地捆绑着TargetPronounPossessive."],
        ["SourceCharacter wraps PronounPossessive rope around PronounPossessive eyes tightly.", "SourceCharacter紧紧地用绳子将PronounPossessive的眼睛缠绕起来."],
        ["SourceCharacter swiftly wraps PronounPossessive rope around TargetCharacter's neck, binding TargetPronounPossessive tightly.", "SourceCharacter迅速地用绳子将PronounPossessive的脖子缠绕起来,紧紧地捆绑着TargetPronounPossessive."],
        ["SourceCharacter wraps PronounPossessive rope around PronounPossessive neck tightly.", "SourceCharacter紧紧地用绳子将PronounPossessive的脖子缠绕起来."],
        ["SourceCharacter swiftly wraps PronounPossessive rope around TargetCharacter's breasts", "binding TargetPronounPossessive tightly.", "SourceCharacter迅速地用绳子将PronounPossessive的胸部缠绕起来,紧紧地捆绑着TargetPronounPossessive."],
        ["SourceCharacter wraps PronounPossessive rope around PronounPossessive breasts tightly.", "SourceCharacter紧紧地用绳子将PronounPossessive的胸部缠绕起来."],
        ["SourceCharacter swiftly wraps PronounPossessive rope around TargetCharacter's waist, binding TargetPronounPossessive tightly.", "SourceCharacter迅速地用绳子将PronounPossessive的腰部缠绕起来,紧紧地捆绑着TargetPronounPossessive."],
        ["SourceCharacter wraps PronounPossessive rope around PronounPossessive waist tightly.", "SourceCharacter紧紧地用绳子将PronounPossessive的腰部缠绕起来."],
        ["SourceCharacter swiftly wraps PronounPossessive rope around TargetCharacter's toes, binding TargetPronounPossessive tightly.", "SourceCharacter迅速地用绳子将PronounPossessive的脚趾缠绕起来,紧紧地捆绑着TargetPronounPossessive."],
        ["SourceCharacter wraps PronounPossessive rope around PronounPossessive toes tightly.", "SourceCharacter紧紧地用绳子将PronounPossessive的脚趾缠绕起来."],
        ["Steal", "抢夺"],
        ["SourceCharacter grabs at TargetCharacters hands, trying to steal TargetPronounPossessive item.", "SourceCharacter抓住了TargetCharacters的手,试图抢夺TargetPronounPossessive的物品."],
        ["Give Item", "交出物品"],
        ["SourceCharacter grabs at TargetCharacters hands, trying to steal TargetPronounPossessive item!", "SourceCharacter抓住了TargetCharacters的手, 试图抢夺TargetPronounPossessive的物品!"],
        ["Shark Bite", "鲨鱼咬"],
        ["SourceCharacter's ActivityAsset bites TargetCharacter's arm.", "SourceCharacter的ActivityAsset咬住了TargetCharacter的胳膊."],
        ["SourceCharacter's ActivityAsset bites TargetCharacter's foot.", "SourceCharacter的ActivityAsset咬住了TargetCharacter的脚."],
        ["SourceCharacter's ActivityAsset bites TargetCharacter's breast.", "SourceCharacter的ActivityAsset咬住了TargetCharacter的乳房."],
        ["SourceCharacter's ActivityAsset bites TargetCharacter's butt.", "SourceCharacter的ActivityAsset咬住了TargetCharacter的臀部."],
        ["SourceCharacter's ActivityAsset bites TargetCharacter's ear.", "SourceCharacter的ActivityAsset咬住了TargetCharacter的耳朵."],
        ["SourceCharacter's ActivityAsset bites TargetCharacter's leg.", "SourceCharacter的ActivityAsset咬住了TargetCharacter的腿."],
        ["SourceCharacter's ActivityAsset bites TargetCharacter on the hand.", "SourceCharacter的ActivityAsset咬住了TargetCharacter的手."],
        ["SourceCharacter's ActivityAsset bites TargetCharacter in the thigh.", "SourceCharacter的ActivityAsset咬住了TargetCharacter的大腿."],
        ["SourceCharacter's ActivityAsset bites TargetCharacter on the neck.", "SourceCharacter的ActivityAsset咬住了TargetCharacter的脖子."],
        ["SourceCharacter's ActivityAsset bites TargetCharacter's nipple.", "SourceCharacter的ActivityAsset咬住了TargetCharacter的乳头."],
        ["SourceCharacter's ActivityAsset chomps on TargetCharacter.", "SourceCharacter的ActivityAsset狠狠地咬住了TargetCharacter."],
        ["Boop", "轻戳"],
        ["SourceCharacter boops TargetCharacter's nose with PronounPossessive ActivityAsset.", "SourceCharacter用PronounPossessive的ActivityAsset轻戳了TargetCharacter的鼻子."],
        ["Squeeze", "紧紧地拥抱"],
        ["SourceCharacter hugs PronounPossessive ActivityAsset tightly.", "SourceCharacter紧紧地拥抱着PronounPossessive的ActivityAsset."],
        ["SourceCharacter hugs PronounPossessive ActivityAsset tightly.", "SourceCharacter紧紧地拥抱着PronounPossessive的ActivityAsset."],
        ["Take Photo", "拍照"],
        ["SourceCharacter snaps a photo of TargetCharacter.", "SourceCharacter给TargetCharacter拍了一张照片."],
        ["SourceCharacter takes a selfie.", "SourceCharacter自拍了一张照片."],
        ['Wag Tail', '摇晃尾巴'],
        ['SourceCharacter wags PronounPossessive tail.', 'SourceCharacter摇晃PronounPossessive的尾巴.'],
        ['SourceCharacter wraps TargetCharacter in a therapeutic self-hug.', 'SourceCharacter以一个治疗性的自我拥抱包裹着TargetCharacter.'],
        ['SourceCharacter releases PronounPossessive own neck.', 'SourceCharacter松开了自己的脖子.'],
        ['Clamp Hand over Eyes', '用手捂住眼睛.'],
        ["SourceCharacter clamps her hand over TargetCharacter's eyes.", 'SourceCharacter将她的手捂在TargetCharacter的眼睛上.'],
        ['SourceCharacter clamps her hand over PronounPossessive own eyes.', 'SourceCharacter将她的手捂在她自己的眼睛上.'],
        ['SourceCharacter releases PronounPossessive own mouth.', 'SourceCharacter放开了自己的嘴.'],
        ['Release Eyes', '放开眼睛'],
        ["SourceCharacter removes their hand from TargetCharacter's eyes.", 'SourceCharacter 将手从TargetCharacter的眼睛上移开.'],
        ['SourceCharacter pulls their hand away from PronounPossessive eyes.', 'SourceCharacter 将手从自己的眼睛旁抽走.'],
        ['SourceCharacter shoves PronounPossessive foot into…rabbing their tongue with PronounPossessive toes.', 'SourceCharacter 将脚塞入……用脚趾抓挠自己的舌头.'],

    ]);





    const translationMapEN = new Map([
        ["歪头", "Tilt Head"],
        ["SourceCharacter歪头.", "SourceCharacter tilts head."],
        ["环视周围", "Look Around"],
        ["SourceCharacter环视周围.", "SourceCharacter looks around."],
        ["上下打量", "Size Up"],
        ["SourceCharacter仔细打量TargetCharacter.", "SourceCharacter sizes up TargetCharacter."],
        ["闭上眼睛", "Close Eyes"],
        ["SourceCharacter闭上了眼睛.", "SourceCharacter closes eyes."],
        ["眼睛呆滞", "Blank Stare"],
        ["SourceCharacter眼睛呆滞地看着前方.", "SourceCharacter stares blankly ahead."],
        ["眼睛湿润", "Watery Eyes"],
        ["SourceCharacter眼角泛着泪光.", "SourceCharacter's eyes are watery."],
        ["流眼泪", "Tear Up"],
        ["SourceCharacter眼泪从眼角流下.", "SourceCharacter tears up."],
        ["张开嘴", "Open Mouth"],
        ["SourceCharacter张开了嘴", "SourceCharacter opens mouth."],
        ["吞咽口水", "Swallow Saliva"],
        ["SourceCharacter吞咽嘴里的口水.", "SourceCharacter swallows saliva."],
        ["流口水", "Drool"],
        ["SourceCharacter的口水顺着嘴角流下.", "SourceCharacter drools down the corner of the mouth."],
        ["轻声喘息", "Softly Pant"],
        ["SourceCharacter发出轻声地喘息.", "SourceCharacter softly pants."],
        ["打哈欠", "Yawn"],
        ["SourceCharacter张嘴打哈欠.", "SourceCharacter yawns."],
        ["舔手", "Lick Hand"],
        ["SourceCharacter舔TargetCharacter的手.", "SourceCharacter licks TargetCharacter's hand."],
        ["SourceCharacter舔PronounPossessive自己的手.", "SourceCharacter licks PronounPossessive own hand."],
        ["舔手指", "Lick Fingers"],
        ["SourceCharacter舔TargetCharacter的手指.", "SourceCharacter licks TargetCharacter's fingers."],
        ["SourceCharacter舔PronounPossessive自己的手指.", "SourceCharacter licks PronounPossessive own fingers."],
        ["舔脚", "Lick Feet"],
        ["SourceCharacter舔TargetCharacter的脚.", "SourceCharacter licks TargetCharacter's feet."],
        ["SourceCharacter舔PronounPossessive自己的脚.", "SourceCharacter licks PronounPossessive own feet."],
        ["舔脸", "Lick Face"],
        ["SourceCharacter舔TargetCharacter的脸.", "SourceCharacter licks TargetCharacter's face."],
        ["吮吸手指", "Suck on Fingers"],
        ["SourceCharacter吮吸TargetCharacter的手指.", "SourceCharacter sucks on TargetCharacter's fingers."],
        ["SourceCharacter吮吸PronounPossessive的手指.", "SourceCharacter sucks on PronounPossessive own fingers."],
        ["嗅手", "Sniff"],
        ["SourceCharacter用鼻子嗅了嗅TargetCharacter的手.", "SourceCharacter sniffs TargetCharacter's hand."],
        ["SourceCharacter用鼻子嗅了嗅自己的手.", "SourceCharacter sniffs own hand."],
        ["跪下", "Kneel Down"],
        ["SourceCharacter轻轻地跪了下来.", "SourceCharacter kneels down gently."],
        ["站起来", "Stand Up"],
        ["SourceCharacter手扶着地站了起来.", "SourceCharacter stands up with hands on the ground."],
        ["跪着张开腿", "Kneel with Legs Spread"],
        ["SourceCharacter张开了PronounPossessive的腿.", "SourceCharacter kneels with legs spread."],
        ["跪着并拢腿", "Kneel with Legs Closed"],
        ["SourceCharacter并拢了PronounPossessive的腿.", "SourceCharacter kneels with legs closed."],
        ["手放身后", "Hands Behind Back"],
        ["SourceCharacter把PronounPossessive的手放在了身后.", "SourceCharacter puts PronounPossessive hands behind back."],
        ["手放身前", "Hands in Front"],
        ["SourceCharacter把PronounPossessive的手放在了身前.", "SourceCharacter puts PronounPossessive hands in front."],
        ["趴下", "Lie Down"],
        ["SourceCharacter手放身后趴在地上.", "SourceCharacter lies down with hands behind back."],
        ["四肢着地", "All Fours"],
        ["SourceCharacter四肢着地趴在地上.", "SourceCharacter is on all fours on the ground."],
        ["起身跪下", "Get Up and Kneel"],
        ["SourceCharacter起身跪下.", "SourceCharacter get up and kneels down."],
        ["爬到脚边", "Crawl to Feet"],
        ["SourceCharacter爬到TargetCharacter的脚边.", "SourceCharacter crawls to TargetCharacter's feet."],
        ["蹭大腿", "Nuzzle Thigh"],
        ["SourceCharacter用头轻轻蹭TargetCharacter的大腿.", "SourceCharacter gently nuzzles TargetCharacter's thigh."],
        ["蹭小腿", "Nuzzle Shin"],
        ["SourceCharacter用头轻轻蹭TargetCharacter的小腿.", "SourceCharacter gently nuzzles TargetCharacter's shin."],
        ["踮起双脚", "Stand on Tiptoes"],
        ["SourceCharacter踮起PronounPossessive的双脚.", "SourceCharacter stands on tiptoes."],
        ["摇晃脚踝", "Wiggle Ankles"],
        ["SourceCharacter摇晃PronounPossessive的脚踝.", "SourceCharacter wiggles PronounPossessive ankles."],
        ["伸出脚", "Extend Leg"],
        ["SourceCharacter伸出PronounPossessive的脚.", "SourceCharacter extends PronounPossessive leg."],
        ["掰开双腿", "Spread Legs"],
        ["SourceCharacter掰开TargetCharacter的双腿.", "SourceCharacter spreads TargetCharacter's legs."],
        ["脚托起下巴", "Foot on Chin"],
        ["SourceCharacter用脚托起TargetCharacter的下巴.", "SourceCharacter places foot on TargetCharacter's chin."],
        ["戳脸", "Poke Face"],
        ["SourceCharacter戳了戳TargetCharacter的脸.", "SourceCharacter pokes TargetCharacter's face."],
        ["SourceCharacter戳了戳自己的脸.", "SourceCharacter pokes own face."],
        ["捏脸", "Pinch Face"],
        ["SourceCharacter捏了捏TargetCharacter的脸.", "SourceCharacter pinches TargetCharacter's face."],
        ["SourceCharacter捏了捏自己的脸.", "SourceCharacter pinches own face."],
        ["戳手臂", "Poke Arm"],
        ["SourceCharacter戳了戳TargetCharacter的手臂.", "SourceCharacter pokes TargetCharacter's arm."],
        ["SourceCharacter戳了戳自己的手臂.", "SourceCharacter pokes own arm."],
        ["揉脸", "Rub Face"],
        ["SourceCharacter揉了揉TargetCharacter的脸.", "SourceCharacter rubs TargetCharacter's face."],
        ["SourceCharacter揉了揉自己的脸.", "SourceCharacter rubs own face."],
        ["摇晃手臂", "Shake Arms"],
        ["SourceCharacter摇晃TargetCharacter的手臂.", "SourceCharacter shakes TargetCharacter's arms."],
        ["SourceCharacter摇晃自己的手臂.", "SourceCharacter shakes own arms."],
        ["轻推", "Light Push"],
        ["SourceCharacter用手轻推TargetCharacter的身体.", "SourceCharacter lightly pushes TargetCharacter's body."],
        ["托起脚", "Lift Foot"],
        ["SourceCharacter托起TargetCharacter的脚.", "SourceCharacter lifts TargetCharacter's foot."],
        ["扭动手腕", "Twist Wrists"],
        ["SourceCharacter扭动PronounPossessive的手腕.", "SourceCharacter twists PronounPossessive wrists."],
        ["挠头", "Scratch Head"],
        ["SourceCharacter用手挠了挠PronounPossessive的头.", "SourceCharacter scratches PronounPossessive head."],
        ["盖住耳朵", "Cover Ears"],
        ["SourceCharacter用手遮住了TargetCharacter的眼睛.", "SourceCharacter covers TargetCharacter's ears with hands."],
        ["SourceCharacter用手遮住了自己的眼睛.", "SourceCharacter covers own ears with hands."],
        ["遮住眼睛", "Cover Eyes"],
        ["SourceCharacter捂住TargetCharacter的眼睛.", "SourceCharacter covers TargetCharacter's eyes with hands."],
        ["SourceCharacter捂住自己的眼睛.", "SourceCharacter covers own eyes with hands."],
        ["捂住头", "Cover Head"],
        ["SourceCharacter捂住TargetCharacter的头.", "SourceCharacter covers TargetCharacter's head with hands."],
        ["SourceCharacter捂住自己的头.", "SourceCharacter covers own head with hands."],
        ["捂住下体", "Cover Groin"],
        ["SourceCharacter捂住TargetCharacter的下体.", "SourceCharacter covers TargetCharacter's groin with hands."],
        ["SourceCharacter捂住自己的下体.", "SourceCharacter covers own groin with hands."],
        ["掀开裙子", "Lift Skirt"],
        ["SourceCharacter掀开TargetCharacter的裙子.", "SourceCharacter lifts TargetCharacter's skirt."],
        ["SourceCharacter掀开PronounPossessive的裙子.", "SourceCharacter lifts PronounPossessive's skirt."],
        ["挥手", "Wave Hand"],
        ["SourceCharacter向TargetCharacter挥手.", "SourceCharacter waves hand at TargetCharacter."],
        ["伸出手", "Reach Out Hand"],
        ["SourceCharacter伸出自己的手.", "SourceCharacter reaches out own hand."],
        ["拉扯衣角", "Tug Clothes"],
        ["SourceCharacter用手拉扯TargetCharacter的衣角.", "SourceCharacter tugs at TargetCharacter's clothes."],
        ["捂住胸", "Cover Chest"],
        ["SourceCharacter捂住自己的胸.", "SourceCharacter covers own chest."],
        ["手托起下巴", "Hand under Chin"],
        ["SourceCharacter用手托起TargetCharacter的下巴.", "SourceCharacter places hand under TargetCharacter's chin."],
        ["拽链子", "Pull Chain"],
        ["SourceCharacter拽TargetCharacter的链子.", "SourceCharacter pulls TargetCharacter's chain."],
        ["弹额头", "Flick Forehead"],
        ["SourceCharacter弹了一下TargetCharacter的额头.", "SourceCharacter flicks TargetCharacter's forehead."],
        ["弹阴蒂", "Flick Clitoris"],
        ["SourceCharacter弹了一下TargetCharacter的阴蒂.", "SourceCharacter flicks TargetCharacter's clitoris."],
        ["抱腿", "Hug Legs"],
        ["SourceCharacter抱住TargetCharacter的腿.", "SourceCharacter hugs TargetCharacter's legs."],
        ["摇晃尾巴", "Wag Tail"],
        ["SourceCharacter摇晃PronounPossessive的尾巴.", "SourceCharacter wags PronounPossessive tail."],
        ["竖起尾巴", "Raise Tail"],
        ["SourceCharacter的尾巴竖了起来.", "SourceCharacter raises own tail."],
        ["炸毛", "Puff Up"],
        ["SourceCharacter弓起后背, 身体的毛发立了起来, 发出嘶的声音.", "SourceCharacter arches back, body hair stands up, emitting a hissing sound."],
        ["舔尾巴", "Lick Tail"],
        ["SourceCharacter舔TargetCharacter的尾巴.", "SourceCharacter licks TargetCharacter's tail."],
        ["SourceCharacter舔自己的尾巴.", "SourceCharacter licks own tail."],
        ["轻抚尾巴", "Gently Stroke Tail"],
        ["SourceCharacter轻抚TargetCharacter的尾巴.", "SourceCharacter gently strokes TargetCharacter's tail."],
        ["SourceCharacter轻抚PronounPossessive的尾巴.", "SourceCharacter gently strokes PronounPossessive's tail."],
        ["尾巴叼在嘴里", "Hold Tail in Mouth"],
        ["SourceCharacter叼起TargetCharacter的尾巴.", "SourceCharacter holds TargetCharacter's tail in mouth."],
        ["SourceCharacter叼起自己的尾巴.", "SourceCharacter holds own tail in mouth."],
        ["抬起屁股", "Lift Buttocks"],
        ["SourceCharacter弯腰抬起PronounPossessive的屁股.", "SourceCharacter bends over, lifting PronounPossessive buttocks."],
        ["扇动翅膀", "Flap Wings"],
        ["SourceCharacter扇动PronounPossessive的翅膀.", "SourceCharacter flaps PronounPossessive wings."],
        ["躲到身后", "Hide Behind"],
        ["SourceCharacter躲到TargetCharacter的身后.", "SourceCharacter hides behind TargetCharacter."],
        ["移动到身后", "Move Behind"],
        ["SourceCharacter移动到TargetCharacter的身后.", "SourceCharacter moves behind TargetCharacter."],
        ["下巴搭在肩膀上", "Chin on Shoulder"],
        ["SourceCharacter把下巴搭在TargetCharacter的肩膀上.", "SourceCharacter places chin on TargetCharacter's shoulder."],
        ["手臂搭在肩膀上", "Arm on Shoulder"],
        ["SourceCharacter把手臂搭在TargetCharacter的肩膀上.", "SourceCharacter places arm on TargetCharacter's shoulder."],
        ["搂腰", "Embrace Waist"],
        ["SourceCharacter搂住TargetCharacter的腰.", "SourceCharacter embraces TargetCharacter's waist."],
        ["身体颤抖", "Body Trembles"],
        ["SourceCharacter颤抖着身体.", "SourceCharacter's body trembles."],
        ["身体抽搐", "Body Twitches"],
        ["SourceCharacter身体抽搐着.", "SourceCharacter's body twitches."],
        ["托起乳房", "Lift Breasts"],
        ["SourceCharacter托起TargetCharacter的双乳.", "SourceCharacter lifts TargetCharacter's breasts."],
        ["SourceCharacter托起PronounPossessive的双乳.", "SourceCharacter lifts PronounPossessive's breasts."],
        ["揉搓乳头", "Rub Nipples"],
        ["SourceCharacter揉搓TargetCharacter的乳头.", "SourceCharacter uses hands to pinch TargetCharacter's nipples, rubbing them."],
        ["SourceCharacter揉搓PronounPossessive的乳头.", "SourceCharacter uses hands to pinch PronounPossessive's nipples, rubbing them."],
        ["双腿颤抖", "Legs Tremble"],
        ["SourceCharacter颤抖着双腿.", "SourceCharacter's legs tremble."],
        ["摇晃双腿", "Shake Legs"],
        ["SourceCharacter摇晃PronounPossessive的双腿.", "SourceCharacter shakes own legs."],
        ["流出液体", "Liquid Flows"],
        ["SourceCharacter股间有液体顺着的大腿流下.", "Liquid flows down SourceCharacter's thighs."],
        ["失禁", "Incontinence"],
        ["SourceCharacter的尿液顺着PronounPossessive大腿流下.", "SourceCharacter's urine flows down PronounPossessive thighs."],
        ["夹紧双腿", "Squeeze Legs"],
        ["SourceCharacter夹紧了自己的腿..", "SourceCharacter squeezes TargetCharacter's legs."],
        ["手指插进阴道", "Insert Finger into Vagina"],
        ["SourceCharacter手指插进TargetCharacter的阴道内.", "SourceCharacter inserts finger into TargetCharacter's vagina."],
        ["SourceCharacter手指插进自己的的阴道内.", "SourceCharacter inserts finger into own vagina."],
        ["拔出自己的手指", "Remove Finger"],
        ["SourceCharacter从TargetCharacter的阴道内拔出自己的手指,手指连着PronounPossessive的爱液.", "SourceCharacter removes own finger from TargetCharacter's vagina, the finger coated with PronounPossessive love fluids."],
        ["SourceCharacter从PronounPossessive的阴道内拔出自己的手指,手指连着自己的爱液.", "SourceCharacter removes own finger from PronounPossessive's vagina, the finger coated with SourceCharacter's love fluids."],
        ["蠕动手指", "Wriggle Finger"],
        ["SourceCharacter在TargetCharacter的阴道内蠕动手指.", "SourceCharacter wriggles a finger inside TargetCharacter's vagina."],
        ["SourceCharacter在PronounPossessive的阴道内蠕动手指.", "SourceCharacter wriggles a finger inside PronounPossessive's vagina."],
        ["快速抽插", "Quickly Thrust"],
        ["SourceCharacter的手在TargetCharacter的阴道内快速抽插.", "SourceCharacter's hand quickly thrusts in and out of TargetCharacter's vagina, rubbing and kneading."],
        ["SourceCharacter的手在PronounPossessive的阴道内快速抽插.", "SourceCharacter's hand quickly thrusts in and out of PronounPossessive's vagina, rubbing and kneading."],
        ["钩住阴蒂环", "Hook Clitoral Piercing"],
        ["SourceCharacter钩住TargetCharacter的阴蒂环.", "SourceCharacter hooks onto TargetCharacter's clitoral piercing."],
        ["SourceCharacter钩住自己的阴蒂环.", "SourceCharacter hooks onto own clitoral piercing."],
        ["拉扯阴蒂环", "Tug Clitoral Piercing"],
        ["SourceCharacter拉了一下TargetCharacter的阴蒂环.", "SourceCharacter tugs on TargetCharacter's clitoral piercing and then releases it."],
        ["SourceCharacter拉了一下自己的阴蒂环.", "SourceCharacter tugs on own clitoral piercing and then releases it."],
        ["宠物服爬到脚边", "Pet Crawls to Feet"],
        ["SourceCharacter爬到TargetCharacter脚边.", "SourceCharacter's pet crawls to TargetCharacter's feet."],
        ["宠物服蹭小腿", "Pet Rubs Legs"],
        ["宠物服蹭大腿", "Pet Rubs Legs"],
        ["SourceCharacter蹭TargetCharacter的腿.", "SourceCharacter's pet rubs against TargetCharacter's legs."],
        ["宠物服趴下", "Pet Lies Down"],
        ["SourceCharacter四肢着地趴在地上.", "SourceCharacter's pet lies down on all fours."],
        ["宠物服跪立", "Pet Kneels"],
        ["SourceCharacter手臂离地跪立.", "SourceCharacter's pet kneels with its limbs off the ground."],
        ["宠物服扑", "Pet Pounces"],
        ["SourceCharacter扑到TargetCharacter身上.", "SourceCharacter's pet pounces onto TargetCharacter."],
        ["猫爪挠手", "Cat Scratches Hand"],
        ["SourceCharacter用爪子挠了一下TargetCharacter的手.", "SourceCharacter's pet scratches TargetCharacter's hand with its claws."],
        ["猫爪挠手臂", "Cat Scratches Arm"],
        ["SourceCharacter用爪子挠了一下TargetCharacter的手臂.", "SourceCharacter's pet scratches TargetCharacter's arm with its claws."],
        ["猫爪舔手", "Cat Licks Paw"],
        ["SourceCharacter舔自己的爪子.", "SourceCharacter's pet licks its own paw."],
        ["猫爪戳脸", "Cat Pokes Face"],
        ["SourceCharacter用爪子戳了戳TargetCharacter的脸.", "SourceCharacter's pet pokes TargetCharacter's face with its claws."],
        ["SourceCharacter用爪子戳了戳自己的脸.", "SourceCharacter's pet pokes its own face with its claws."],
        ["猫爪戳鼻子", "Cat Pokes Nose"],
        ["SourceCharacter用爪子戳了戳TargetCharacter的鼻子.", "SourceCharacter's pet pokes TargetCharacter's nose with its claws."],
        ["SourceCharacter用爪子戳了戳自己的鼻子.", "SourceCharacter's pet pokes its own nose with its claws."],
        ["猫爪揉脸", "Cat Rubs Face"],
        ["SourceCharacter用爪子揉了揉TargetCharacter的脸.", "SourceCharacter uses its claws to rub TargetCharacter's face."],
        ["SourceCharacter用爪子揉了揉自己的脸.", "SourceCharacter uses its claws to rub its own face."],
        ["猫爪揉鼻子", "Cat Rubs Nose"],
        ["SourceCharacter用爪子揉了揉TargetCharacter的鼻子.", "SourceCharacter uses its claws to rub TargetCharacter's nose."],
        ["SourceCharacter用爪子揉了揉自己的鼻子.", "SourceCharacter uses its claws to rub its own nose."],
        ["撞笼子", "Bump into Cage"],
        ["SourceCharacter用身体撞击笼子.", "SourceCharacter bumps its body into the cage."],
        ["咬笼子", "Bite Cage"],
        ["SourceCharacter用牙齿咬笼子.", "SourceCharacter bites the cage."],
        ["摇晃笼子", "Shake Cage"],
        ["SourceCharacter摇晃笼子的门.", "SourceCharacter shakes the door of the cage."],
        ["撇眼", "Roll Eyes"],
        ["SourceCharacter撇了TargetCharacter一眼.", "SourceCharacter rolls its eyes at TargetCharacter."],
        ["跺脚", "Stamp Feet"],
        ["SourceCharacter不停地跺脚.", "SourceCharacter keeps stamping its feet."],
        ["叉腰", "Put Hands on Hips"],
        ["SourceCharacter双手叉在腰上.", "SourceCharacter puts its hands on its hips."],
        ["撩头发", "Toss Hair"],
        ["SourceCharacter撩起头发挂在耳边.", "SourceCharacter tosses its hair, letting it hang by its ears."],
        ["骑上去", "Ride On"],
        ["SourceCharacter骑在TargetCharacter的背上.", "SourceCharacter Rides on TargetCharacter's Back."],
        ["泡沫剑架在脖子上", "Foam Sword Rests on the Neck"],
        ["SourceCharacter把泡沫剑架在自己的脖子上.", "SourceCharacter Places the Foam Sword on own Neck."],
        ["SourceCharacter把泡沫剑架在TargetCharacter的脖子上", "SourceCharacter Places the Foam Sword on TargetCharacter's Neck"],
        ["泡沫剑拍脸", "Foam Sword Hits the Face"],
        ["SourceCharacter用泡沫剑轻轻拍了拍一下TargetCharacter的脸", "SourceCharacter Gently Hits TargetCharacter's Face with a Foam Sword"],
        ["剪刀剪掉上衣", "Scissors Cut Off the Top"],
        ["SourceCharacter用剪刀剪掉了自己的上衣.", "SourceCharacter Cuts Off own Top with Scissors."],
        ["SourceCharacter用剪刀剪掉了TargetCharacter的上衣.", "SourceCharacter Cuts Off TargetCharacter's Top with Scissors."],
        ["剪刀剪掉下衣", "Scissors Cut Off the Bottom"],
        ["SourceCharacter用剪刀剪掉了自己的下衣.", "SourceCharacter Cuts Off own Bottom with Scissors."],
        ["SourceCharacter用剪刀剪掉了TargetCharacter的下衣.", "SourceCharacter Cuts Off TargetCharacter's Bottom with Scissors."],
        ["剪刀剪掉胸罩", "Scissors Cut Off the Bra"],
        ["SourceCharacter用剪刀剪掉了自己的胸罩.", "SourceCharacter Cuts Off own Bra with Scissors."],
        ["SourceCharacter用剪刀剪掉了TargetCharacter的胸罩.", "SourceCharacter Cuts Off TargetCharacter's Bra with Scissors."],
        ["剪刀剪掉内裤", "Scissors Cut Off the Underwear"],
        ["SourceCharacter用剪刀剪掉了自己的内裤.", "SourceCharacter Cuts Off own Underwear with Scissors."],
        ["SourceCharacter用剪刀剪掉了TargetCharacter的内裤.", "SourceCharacter Cuts Off TargetCharacter's Underwear with Scissors."],
        ["剪刀剪掉袜子", "Scissors Cut Off the Socks"],
        ["SourceCharacter用剪刀剪掉了自己的袜子.", "SourceCharacter Cuts Off own Socks with Scissors."],
        ["SourceCharacter用剪刀剪掉了TargetCharacter的袜子.", "SourceCharacter Cuts Off TargetCharacter's Socks with Scissors."],
        ["躺上去", "Lie Down"],
        ["SourceCharacter躺到TargetCharacter的身边.", "SourceCharacter Lies Down Next to TargetCharacter."],
        ["舔触手", "Lick Tentacles"],
        ["SourceCharacter舔PronounPossessive的触手.", "SourceCharacter Licks PronounPossessive Tentacles."],
        ["触手摸头", "Tentacles Pet Head"],
        ["SourceCharacter用触手摸了摸自己的头.", "SourceCharacter Pet own Head with Tentacles."],
        ["SourceCharacter用触手摸了摸TargetCharacter的头.", "SourceCharacter Pet TargetCharacter's Head with Tentacles."],
        ["触手戳鼻子", "Tentacles Poke Nose"],
        ["SourceCharacter用触手戳了戳自己的鼻子.", "SourceCharacter Pokes own Nose with Tentacles."],
        ["SourceCharacter用触手戳了戳TargetCharacter的鼻子.", "SourceCharacter Pokes TargetCharacter's Nose with Tentacles."],
        ["触手戳脸", "Tentacles Poke Face"],
        ["SourceCharacter用触手戳了戳自己的脸.", "SourceCharacter Pokes own Face with Tentacles."],
        ["SourceCharacter用触手戳了戳TargetCharacter的脸.", "SourceCharacter Pokes TargetCharacter's Face with Tentacles."],
        ["触手揉鼻子", "Tentacles Rub Nose"],
        ["SourceCharacter用触手揉了揉自己的鼻子.", "SourceCharacter Rubs own Nose with Tentacles."],
        ["SourceCharacter用触手揉了揉TargetCharacter的鼻子.", "SourceCharacter Rubs TargetCharacter's Nose with Tentacles."],
        ["触手揉脸", "Tentacles Rub Face"],
        ["SourceCharacter用触手揉了揉自己的脸.", "SourceCharacter Rubs own Face with Tentacles."],
        ["SourceCharacter用触手揉了揉TargetCharacter的脸.", "SourceCharacter用触手揉了揉TargetCharacter的脸."],
        ["鱼尾揉脸", "Fish Tail Rubs Face"],
        ["SourceCharacter用鱼尾揉了揉PronounPossessive自己的脸.", "SourceCharacter用鱼尾揉了揉自己的脸."],
        ["SourceCharacter用鱼尾揉了揉TargetCharacter的脸.", "SourceCharacter用鱼尾揉了揉TargetCharacter的脸."],
        ["鱼尾戳脸", "Fish Tail Pokes Face"],
        ["SourceCharacter用鱼尾戳了戳PronounPossessive自己的脸.", "SourceCharacter用鱼尾戳了戳自己的脸."],
        ["SourceCharacter用鱼尾戳了戳TargetCharacter的脸.", "SourceCharacter用鱼尾戳了戳TargetCharacter的脸."],
        ["鱼尾抚脸", "Fish Tail Caresses Face"],
        ["SourceCharacter用鱼尾轻抚PronounPossessive自己的脸颊.", "SourceCharacter用鱼尾轻抚自己的脸颊."],
        ["SourceCharacter用鱼尾轻抚TargetCharacter的脸颊.", "SourceCharacter用鱼尾轻抚TargetCharacter的脸颊."],
        ["鱼尾担膝盖", "Fish Tail Rests on Knee"],
        ["SourceCharacter将鱼尾担在了TargetCharacter的膝盖上.", "SourceCharacter将鱼尾担在了TargetCharacter的膝盖上."],
        ["鱼尾揉乳房", "Fish Tail Rubs Chest"],
        ["SourceCharacter用鱼尾揉了揉PronounPossessive自己的乳房.", "SourceCharacter用鱼尾揉了揉自己的乳房."],
        ["SourceCharacter用鱼尾揉了揉TargetCharacter的乳房.", "SourceCharacter用鱼尾揉了揉TargetCharacter的乳房."],
        ["鱼尾扇风", "Fish Tail Fans"],
        ["SourceCharacter用鱼尾给自己扇了扇风.", "SourceCharacter用鱼尾给自己扇了扇风."],
        ["SourceCharacter用鱼尾给TargetCharacter的脸扇了扇风.", "SourceCharacter用鱼尾给TargetCharacter的脸扇了扇风."],
        ["鱼尾戳乳头", "Fish Tail Pokes Nipple"],
        ["SourceCharacter用鱼尾戳了戳自己的乳头.", "SourceCharacter用鱼尾戳了戳自己的乳头."],
        ["SourceCharacter用鱼尾戳了戳TargetCharacter的乳头.", "SourceCharacter用鱼尾戳了戳TargetCharacter的乳头."],
        ["鱼尾碰手", "Fish Tail Touches Hand"],
        ["SourceCharacter将鱼尾踝搭在了TargetCharacter的手心上.", "SourceCharacter将鱼尾踝搭在了TargetCharacter的手心上."],
        ["鱼尾抚弄大腿", "Fish Tail Strokes Thigh"],
        ["SourceCharacter用鱼尾抚弄TargetCharacter的大腿.", "SourceCharacter用鱼尾抚弄TargetCharacter的大腿."],
        ["SourceCharacter拍打TargetCharacter的头.", "SourceCharacter拍打TargetCharacter的头."],

    ]);


    let is笨蛋炉子2 = false;
    笨蛋Luzi.hookFunction("ChatRoomSync", 10, (args, next) => {
        next(args);
        if (!is笨蛋炉子2) {
            setTimeout(() => {
                let language = localStorage.getItem("BondageClubLanguage");
                if ((language === "CN" || language === "TW")) {
                    // 替换翻译后的值
                    let found = false;
                    while (!found) {
                        const containsActivityLSCG_ = ActivityDictionary.some(activity => activity[0].includes('LSCG_'));
                        if (containsActivityLSCG_) {
                            ActivityDictionary.forEach(activity => {
                                const originalValue = activity[1];
                                if (translationMap.has(originalValue)) {
                                    activity[1] = translationMap.get(originalValue);
                                }
                            });
                            found = true;
                        } else {
                            break;
                        }
                    }
                };
                if (!(language === "CN" || language === "TW")) {
                    // 替换翻译后的值
                    ActivityDictionary.forEach(activity => {
                        const originalValue = activity[1];
                        if (translationMapEN.has(originalValue)) {
                            activity[1] = translationMapEN.get(originalValue);
                        }
                    });
                }
            }, 6000);
            is笨蛋炉子2 = true;
        }
    });

    //============================================================
    //============================================================

    /**
     * 创建活动对象的函数
     * @param {string} name - 动作名称
     * @param {string} targetSelf - 对自己做动作的部位
     * @param {string} target - 对他人做动作的部位
     * @param {string} targetSelftext - 对自己做动作的描述
     * @param {string} targettext - 对他人做动作的描述
     * @returns {object} - 包含创建的活动信息的对象
     */
    function createActivity2(activityInfo) {
        const {
            name,
            targetSelf,
            target,
            targetSelftext,
            targettext,
        } = activityInfo;

        const activity = {
            Name: `笨蛋笨Luzi_${name}`, // 道具名字
            TargetSelf: targetSelftext ? [targetSelf] : [], // 自己的部位
            Target: targettext ? [target] : [], // 对方的部位
            Prerequisite: [],
            MaxProgress: 50,
            MaxProgressSelf: 50,
        };
        ActivityFemale3DCG.push(activity); // 这个是把自己的活动数组添加进去
        ActivityFemale3DCGOrdering.push(activity.Name); // 这个是活动名字
        ActivityDictionary.push([`Activity笨蛋笨Luzi_${name}`, `${name}`]);
        if (!targetSelftext) {
            activity.TargetSelf = [];
        }
        if (!targettext) {
            activity.Target = [];
        }
        if (targetSelftext && targetSelf) {
            ActivityDictionary.push([`Label-ChatSelf-${targetSelf}-${activity.Name}`, `${name}`]);
            ActivityDictionary.push([`ChatSelf-${targetSelf}-${activity.Name}`, targetSelftext]);
        };
        if (targettext && target) {
            ActivityDictionary.push([`Label-ChatOther-${target}-${activity.Name}`, `${name}`]);
            ActivityDictionary.push([`ChatOther-${target}-${activity.Name}`, targettext]);
        };
    }



    // 👤👥
    // 🅰🅱
    // 👈👉
    /**
     * 创建活动对象的函数
     * @param {string} name - 输入框名称
     */
    function 移除清空输入框(name) {
        if (document.getElementById(name)) {
            document.getElementById(name).style.display = "none"; // 移除输入框
            document.getElementById(name).value = ""; // 清空输入框
        }
    }

    function 移除清空输入框不清空(name) {
        if (document.getElementById(name)) {
            document.getElementById(name).style.display = "none"; // 移除输入框
        }
    }

    function 笨蛋LZActivity() {
        Player.OnlineSettings.ECHO = Player.OnlineSettings.ECHO || {};
        Player.OnlineSettings.ECHO.炉子ActivityFemale3DCG = LZString.compressToUTF16(JSON.stringify(ActivityFemale3DCG.filter(obj => obj.Name && obj.Name.includes("笨蛋笨Luzi_"))));
        Player.OnlineSettings.ECHO.炉子ActivityFemale3DCGOrdering = LZString.compressToUTF16(JSON.stringify(ActivityFemale3DCGOrdering.filter(item => item.includes("笨蛋笨Luzi_"))));
        Player.OnlineSettings.ECHO.炉子ActivityDictionary = LZString.compressToUTF16(JSON.stringify(ActivityDictionary.filter(subArray => { return subArray.some(item => item.includes("笨蛋笨Luzi_")); })));
        ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
    }

    // #region GUIScreen

    const GUIScreen = {
        /** @type { Subscreen | null } */
        _Current: null,
        get Current() { return this._Current; },
        /**
         * @param {Subscreen | null} value
         */
        set Current(value) {
            if (this._Current !== null) this._Current.unload();
            this._Current = value;
            if (this._Current === null) {
                if (typeof PreferenceSubscreenExtensionsClear === "function")
                    PreferenceSubscreenExtensionsClear();
                else PreferenceSubscreen = "";
            } else {
                this.Current.load();
            }
        }
    }

    class Subscreen {
        load() { }
        run() { }
        click() { }
        exit() { GUIScreen.Current = null; }
        unload() { }
    }

    class BaseSubscreen extends Subscreen {
        constructor(prev) { super(); this.prev = prev; }
        exit() { GUIScreen.Current = this.prev; }
    }

    class 自定义动作设置 extends BaseSubscreen {
        constructor(prev) {
            super(prev);
            this.单双 = "👤"
            this.isme = "👈"
            this.新建动作 = false
            this.当前动作索引 = 0;
            this.动作 = undefined;
            this.当前界面 = undefined;
        }

        run() {
            DrawImageResize("https://emdsa2.github.io/-mod/image/动作拓展设置.jpg"
                , 0, 0, 2000, 1000);
            DrawImageResize("https://emdsa2.github.io/-mod/image/条线.png"
                , 0, 0, 2000, 1000);
            DrawImageResize("https://emdsa2.github.io/-mod/image/返回白.png"
                , 114, 75, 90, 90);
            DrawText(`- 自定义动作设置 -`, 1000, 125, "Black");


            DrawCharacter(Player, 370, 50, 0.9, false);// 绘制主要标签和玩家
            if (PreferenceArousalIsActive()) {
                // 绘制所有可用的角色区域
                for (let Group of AssetGroup) {
                    if (Group.IsItem() && !Group.MirrorActivitiesFrom && AssetActivitiesForGroup("Female3DCG", Group.Name).length)
                        DrawAssetGroupZone(Player, Group.Zone, 0.9, 370, 50, 1, "#808080FF", 3, PreferenceGetFactorColor(PreferenceGetZoneFactor(Player, Group.Name)));
                }
                // 可以选择并在角色身上绘制区域
                if (Player.FocusGroup != null) {
                    DrawAssetGroupZone(Player, Player.FocusGroup.Zone, 0.9, 370, 50, 1, "cyan");
                    MainCanvas.textAlign = "center";
                }
            }
            // DrawButton(80, 210, 160, 100, "", "#646464", "");
            const name = document.getElementById('笨蛋Luzi_activityName')?.value || "";
            const targetSelftext = document.getElementById('笨蛋Luzi_targetSelfText')?.value || "";
            const targettext = document.getElementById('笨蛋Luzi_targetText')?.value || "";
            let targetSelf = Player.FocusGroup?.Name || "";
            let target = Player.FocusGroup?.Name || "";

            const activityInfo2 = { name, targetSelf, target, targetSelftext, targettext };

            if (MouseIn(80, 210, 160, 100)) {
                DrawImageResize("https://emdsa2.github.io/-mod/image/白箭头右.png"
                    , 270, 232, 90, 50);
                DrawText(`动作`, 220, 260, "White");
            } else {
                if (this.当前界面 !== `动作`) {
                    DrawText(`动作`, 160, 260, "White");
                }
            }


            if (MouseIn(80, 380, 160, 100)) {
                DrawImageResize("https://emdsa2.github.io/-mod/image/白箭头右.png"
                    , 270, 399, 90, 50);
                DrawText(`文本`, 220, 426.67, "White");
            } else {
                if (this.当前界面 !== `文本`) {
                    DrawText(`文本`, 160, 426.67, "White");
                }
            }

            if (this.当前界面 == `动作`) {
                ElementCreateInput("笨蛋Luzi_activityName", "text", "", "20"); // 创建一个新的文本输入元素
                ElementPosition("笨蛋Luzi_activityName", 1260, 250, 400); // 特定位置绘制一个输入框
                DrawText(`动作名字:`, 960, 260, "White");// 绘制一个文本元素
                DrawImageResize("https://emdsa2.github.io/-mod/image/白箭头右.png"
                    , 270, 232, 90, 50);
                DrawText(`动作`, 220, 260, "White");
                if (this.单双 === "👤") {
                    DrawButton(1500, 200, 90, 90, "👤", "White", "");
                    DrawImageResize("data:image/png;base64,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",
                        940, 340, 100, 140);

                    if (this.isme === "👈") {
                        DrawButton(840, 356, 80, 90, "👈", "White", "");
                    }
                    // document.getElementById("笨蛋Luzi_targetSelfText").value

                    if (this.isme === "👉") {
                        DrawButton(840, 356, 80, 90, "👉", "White", "");
                    }
                }
                if (this.单双 === "👥") {
                    DrawButton(1500, 200, 90, 90, "👥", "White", "");
                }

            } else { 移除清空输入框不清空("笨蛋Luzi_activityName") }

            if (this.当前界面 == `文本`) {
                DrawImageResize("https://emdsa2.github.io/-mod/image/白箭头右.png"
                    , 270, 399, 90, 50);
                DrawText(`文本`, 220, 426.67, "White");
                if (this.单双 === "👤") {
                    if (this.isme === "👈") {
                        ElementCreateTextArea("笨蛋Luzi_targetSelfText");
                        document.getElementById("笨蛋Luzi_targetSelfText").setAttribute("maxLength", 1000);
                        ElementPosition("笨蛋Luzi_targetSelfText", 1310, 650, 850, 480); // 特定位置绘制一个输入框

                        DrawText(`对自己使用动作的文本:`, 1100, 360, "White");// 绘制一个文本元素
                        DrawButton(1460, 328, 80, 60, "👈", "White", "");
                        DrawButton(1560, 328, 80, 60, "👉", "White", "");
                        DrawButton(1660, 328, 80, 60, "🚻", "White", "");


                        target = "";
                    } else { 移除清空输入框("笨蛋Luzi_targetSelfText") }
                    // document.getElementById("笨蛋Luzi_targetSelfText").value

                    if (this.isme === "👉") {
                        ElementCreateTextArea("笨蛋Luzi_targetText");
                        document.getElementById("笨蛋Luzi_targetText").setAttribute("maxLength", 1000);
                        ElementPosition("笨蛋Luzi_targetText", 1310, 650, 850, 480); // 特定位置绘制一个输入框

                        DrawText(`对别人使用动作的文本:`, 1100, 360, "White");// 绘制一个文本元素
                        DrawButton(1460, 328, 80, 60, "👈", "White", "");
                        DrawButton(1560, 328, 80, 60, "👉", "White", "");
                        DrawButton(1660, 328, 80, 60, "🚻", "White", "");


                        targetSelf = "";
                    } else { 移除清空输入框("笨蛋Luzi_targetText") }
                }
                if (this.单双 === "👥") {

                    ElementCreateTextArea("笨蛋Luzi_targetSelfText");
                    document.getElementById("笨蛋Luzi_targetSelfText").setAttribute("maxLength", 1000);
                    ElementPosition("笨蛋Luzi_targetSelfText", 1310, 300, 800, 380); // 特定位置绘制一个输入框
                    DrawText(`对自己使用动作的文本:`, 1100, 80, "White");// 绘制一个文本元素
                    DrawButton(1730, 135, 80, 60, "👈", "White", "");
                    DrawButton(1860, 135, 80, 60, "👉", "White", "");
                    DrawButton(1730, 220, 80, 60, "🚻", "White", "");


                    ElementCreateTextArea("笨蛋Luzi_targetText");
                    document.getElementById("笨蛋Luzi_targetText").setAttribute("maxLength", 1000);
                    ElementPosition("笨蛋Luzi_targetText", 1310, 790, 800, 380); // 特定位置绘制一个输入框
                    DrawText(`对别人使用动作的文本:`, 1100, 560, "White");// 绘制一个文本元素
                    DrawButton(1730, 635, 80, 60, "👈", "White", "");
                    DrawButton(1860, 635, 80, 60, "👉", "White", "");
                    DrawButton(1730, 720, 80, 60, "🚻", "White", "");
                }

                if (Player.FocusGroup && Player.FocusGroup.Name && name) {
                    if (MouseIn(1770, 460, 150, 80)) {
                        // 获取用户输入的动作名字
                        const name = document.getElementById('笨蛋Luzi_activityName')?.value || "";
                        // 检查是否存在重复的动作名字
                        if (ActivityFemale3DCGOrdering.includes("笨蛋笨Luzi_" + name)) {
                            DrawText(`动作名字已存在!`, 1850, 400, "red");// 绘制一个文本元素
                        }
                        if (!ActivityFemale3DCGOrdering.includes("笨蛋笨Luzi_" + name)) {
                            DrawText(`新建动作`, 1850, 400, "White");// 绘制一个文本元素
                        }
                    }

                    if (!this.新建动作) {
                        DrawButton(1770, 460, 150, 80, "新建", "White", "");
                    }
                    if (this.新建动作) {
                        DrawButton(1770, 460, 150, 80, "✪ ω ✪", "White", "");
                        createActivity2(activityInfo2);
                        this.新建动作 = false
                    }
                }

            } else {
                移除清空输入框不清空("笨蛋Luzi_targetSelfText")
                移除清空输入框不清空("笨蛋Luzi_targetText")
            }

            if (MouseIn(80, 710, 160, 100)) {
                DrawImageResize("https://emdsa2.github.io/-mod/image/白箭头右.png"
                    , 270, 730, 90, 50);
                DrawText(`删除`, 220, 760, "White");
            } else {
                if (this.当前界面 !== `删除`) {
                    DrawText(`删除`, 160, 760, "White");
                }
            }

            if (this.当前界面 == `删除`) {
                DrawImageResize("https://emdsa2.github.io/-mod/image/白箭头右.png"
                    , 270, 730, 90, 50);
                DrawText(`删除`, 220, 760, "White");

                DrawText(`删除已有动作:`, 1000, 260, "White");// 绘制一个文本元素
                this.动作 = ActivityFemale3DCGOrdering.filter(item => item.includes("笨蛋笨Luzi_"));
                DrawBackNextButton(900, 325, 400, 64, this.动作[this.当前动作索引], "White", "", () => { }, () => { });
                DrawButton(1360, 325, 100, 64, "🚮", "White", "");

                DrawButton(1600, 720, 90, 90, "♻", "red", "");
                if (MouseIn(1600, 720, 90, 90)) {
                    DrawText(`清空所有创建动作`, 1650, 680, "red");// 绘制一个文本元素
                }
            }
        }
        click() {
            if (MouseIn(114, 75, 90, 90)) {
                笨蛋LZActivity();
                console.log("已存储进个人设置");
                this.exit();
            }

            for (const Group of AssetGroup) {
                if (Group.IsItem() && !Group.MirrorActivitiesFrom && AssetActivitiesForGroup("Female3DCG", Group.Name).length) {
                    const Zone = Group.Zone.find(z => DialogClickedInZone(Player, z, 0.9, 370, 50, 1));
                    if (Zone) {
                        Player.FocusGroup = Group;
                        PreferenceArousalZoneFactor = PreferenceGetZoneFactor(Player, Group.Name);
                    }
                }
            }

            if (MouseIn(80, 210, 160, 100)) {
                this.当前界面 = `动作`
            }
            if (this.当前界面 == `动作`) {
                if (MouseIn(1500, 200, 90, 90)) {
                    this.单双 = (this.单双 === "👤") ? "👥" : "👤";
                    移除清空输入框("笨蛋Luzi_targetSelfText");
                    移除清空输入框("笨蛋Luzi_targetText");
                }

                if (MouseIn(840, 356, 80, 90)) {
                    this.isme = (this.isme === "👈") ? "👉" : "👈";
                    移除清空输入框("笨蛋Luzi_targetSelfText");
                    移除清空输入框("笨蛋Luzi_targetText");
                }
            }



            if (MouseIn(80, 380, 160, 100)) {
                this.当前界面 = `文本`
            }
            if (this.当前界面 == `文本`) {
                if (this.单双 === "👤") {

                    if (this.isme === "👈") {
                        if (MouseIn(1460, 328, 80, 60)) { document.getElementById('笨蛋Luzi_targetSelfText').value += "SourceCharacter" };
                        if (MouseIn(1560, 328, 80, 60)) { document.getElementById('笨蛋Luzi_targetSelfText').value += "TargetCharacter" };
                        if (MouseIn(1660, 328, 80, 60)) { document.getElementById('笨蛋Luzi_targetSelfText').value += "PronounPossessive" }
                    };
                    if (this.isme === "👉") {
                        if (MouseIn(1460, 328, 80, 60)) { document.getElementById('笨蛋Luzi_targetText').value += "SourceCharacter" };
                        if (MouseIn(1560, 328, 80, 60)) { document.getElementById('笨蛋Luzi_targetText').value += "TargetCharacter" };
                        if (MouseIn(1660, 328, 80, 60)) { document.getElementById('笨蛋Luzi_targetText').value += "PronounPossessive" }
                    };
                };

                if (this.单双 === "👥") {
                    if (MouseIn(1730, 135, 80, 60)) { document.getElementById('笨蛋Luzi_targetSelfText').value += "SourceCharacter" };
                    if (MouseIn(1860, 135, 80, 60)) { document.getElementById('笨蛋Luzi_targetSelfText').value += "TargetCharacter" };
                    if (MouseIn(1730, 220, 80, 60)) { document.getElementById('笨蛋Luzi_targetSelfText').value += "PronounPossessive" };
                    if (MouseIn(1730, 635, 80, 60)) { document.getElementById('笨蛋Luzi_targetText').value += "SourceCharacter" };
                    if (MouseIn(1860, 635, 80, 60)) { document.getElementById('笨蛋Luzi_targetText').value += "TargetCharacter" };
                    if (MouseIn(1730, 720, 80, 60)) { document.getElementById('笨蛋Luzi_targetText').value += "PronounPossessive" }
                }



                if (MouseIn(1770, 460, 150, 80)) {
                    let name = document.getElementById('笨蛋Luzi_activityName')?.value || "";// 获取用户输入的动作名字
                    // 检查是否存在重复的动作名字
                    if (ActivityFemale3DCGOrdering.includes("笨蛋笨Luzi_" + name)) {
                        this.新建动作 = false;
                    }

                    if (!ActivityFemale3DCGOrdering.includes("笨蛋笨Luzi_" + name)) {
                        this.新建动作 = true
                        笨蛋LZActivity();
                        console.log("已存储进个人设置");
                    }
                }
                // Player.OnlineSettings.ECHO


            }


            if (MouseIn(80, 710, 160, 100)) {
                this.当前界面 = `删除`
            }

            if (this.当前界面 == `删除`) {

                if (Array.isArray(this.动作) && this.动作.length > 0) {
                    DrawBackNextButton(900, 325, 400, 64, this.动作[this.当前动作索引], "White", "",
                        // 点击按钮切换到上一个字符串
                        () => { this.当前动作索引 = (this.当前动作索引 - 1 + this.动作.length) % this.动作.length; return this.动作[this.当前动作索引]; },
                        // 点击按钮切换到下一个字符串
                        () => { this.当前动作索引 = (this.当前动作索引 + 1) % this.动作.length; return this.动作[this.当前动作索引]; }
                    );
                }
                if (MouseIn(1360, 325, 100, 64)) {
                    ActivityFemale3DCG = ActivityFemale3DCG.filter(obj => obj.Name !== this.动作[this.当前动作索引]);
                    ActivityFemale3DCGOrdering = ActivityFemale3DCGOrdering.filter(item => item !== this.动作[this.当前动作索引]);
                    var regex2 = new RegExp(this.动作[this.当前动作索引] + "$");
                    ActivityDictionary = ActivityDictionary.filter(subArray => !regex2.test(subArray[0]));

                    笨蛋LZActivity();
                    console.log("已存储进个人设置");
                }
                if (MouseIn(1600, 720, 90, 90)) {
                    ActivityFemale3DCG = ActivityFemale3DCG.filter(obj => !obj.Name.includes("笨蛋笨Luzi_"));
                    ActivityFemale3DCGOrdering = ActivityFemale3DCGOrdering.filter(item => !item.includes("笨蛋笨Luzi_"));
                    ActivityDictionary = ActivityDictionary.filter(subArray => !subArray[0].includes("笨蛋笨Luzi_"));
                    Player.OnlineSettings.ECHO.炉子ActivityDictionary = "";
                    Player.OnlineSettings.ECHO.炉子ActivityFemale3DCG = "";
                    Player.OnlineSettings.ECHO.炉子ActivityFemale3DCGOrdering = "";
                    ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
                    console.log("已全部清空");
                }
            }


            // console.log(ActivityFemale3DCG.filter(obj => obj.Name.includes("笨蛋笨Luzi_")))
            // console.log(ActivityFemale3DCGOrdering.filter(item => item.includes("笨蛋笨Luzi_")))
            // console.log(ActivityDictionary.filter(subArray => subArray[0].includes("笨蛋笨Luzi_")))
        }
        unload() {
            移除清空输入框("笨蛋Luzi_activityName");
            移除清空输入框("笨蛋Luzi_targetSelfText");
            移除清空输入框("笨蛋Luzi_targetText")
        }
    }

    class 高潮计数保留设置 extends BaseSubscreen {
        constructor(prev) { super(prev); }
        run() {
            DrawImageResize("https://emdsa2.github.io/-mod/image/选择界面.png"
                , 0, 0, 2000, 1000);
            DrawImageResize("https://emdsa2.github.io/-mod/image/返回白.png"
                , 114, 75, 90, 90);

            DrawText(`- 杂项设置 -`, 1000, 125, "Black");

            DrawText(`高潮计数保留`, 450, 236, "#FFFFFF");
            DrawCheckbox(250, 200, 64, 64, "", false  /*Player.OnlineSettings.ECHO.高潮开关*/);
            DrawButton(250, 290, 390, 90, "      清空高潮次数", "White", "Icons/Trash.png");

            DrawButton(1050, 290, 390, 90, "       储存制作", "White", "Icons/Crafting.png");
            DrawButton(1450, 290, 390, 90, "       读取制作", "White", "Icons/Crafting.png");
        }
        click() {
            if (MouseIn(114, 75, 90, 90)) {
                this.exit();
            }
            if (MouseIn(250, 200, 64, 64)) {
                // saveOrgasmToggle(!Player.OnlineSettings.ECHO.高潮开关);
            }
            if (MouseIn(250, 290, 390, 90)) {
                // pass
            }
            if (MouseIn(1050, 290, 290, 90)) {
                Player.OnlineSettings.ECHO.炉子Crafting = LZString.compressToUTF16(JSON.stringify(Player.Crafting));
                ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
                console.log("已储存")
            }
            if (MouseIn(1450, 290, 290, 90)) {
                Player.Crafting = JSON.parse(LZString.decompressFromUTF16(Player.OnlineSettings.ECHO.炉子Crafting));
                console.log("已读取")
            }
        }
    }

    class 动作拓展设置 extends BaseSubscreen {
        constructor(prev) { super(prev); }
        run() {
            DrawImageResize("https://emdsa2.github.io/-mod/image/选择界面.png"
                , 0, 0, 2000, 1000);
            DrawImageResize("https://emdsa2.github.io/-mod/image/返回白.png"
                , 114, 75, 90, 90);
            DrawText(`- 动作拓展设置 -`, 1000, 125, "Black");

            DrawImageResize("https://emdsa2.github.io/-mod/image/界面选择.png"
                , 0, 0, 2000, 1000,);

            DrawImageResize("https://emdsa2.github.io/-mod/image/界面缠绕.png"
                , 0, 0, 2000, 1000,);


            // DrawButton(900, 220, 360, 600, "", "#646464", "");
            if (MouseIn(317, 220, 360, 600)) { DrawText(`自定义动作`, 500, 356, "#FFFFFF"); }
            else { DrawText(`自定义动作`, 500, 356, "#888888"); }

            if (MouseIn(900, 220, 360, 600)) { DrawText(`自定义服装`, 1080, 356, "#FFFFFF"); }
            else { DrawText(`自定义服装`, 1080, 356, "#888888"); }

            if (MouseIn(1450, 220, 360, 600)) { DrawText(`杂项`, 1624, 356, "#FFFFFF"); }
            else { DrawText(`杂项`, 1624, 356, "#888888"); }

            // DrawButton(1500, 840, 390, 90, "      Discord", "White", "Icons/Trash.png");
            if (MouseIn(1500, 840, 390, 90)) {
                DrawTextWrap(
                    `插件翻译\n\n\n\n\n动作\n/\n服装拓展\n\n在此查看插件更新及反馈建议`
                    , 1500, 700, 390, 90, "White");
            }
        }
        click() {
            if (MouseIn(114, 75, 90, 90)) {
                this.exit();
            }
            if (MouseIn(317, 220, 360, 600)) {
                GUIScreen.Current = new 自定义动作设置(this);
            }
            if (MouseIn(900, 220, 360, 600)) {
            }
            if (MouseIn(1450, 220, 360, 600)) {
                GUIScreen.Current = new 高潮计数保留设置(this);
                if (Player.OnlineSettings.ECHO === undefined) { /*saveOrgasmSettings(false, 0)*/ }
            }
            if (MouseIn(1500, 840, 390, 90)) {
                window.open("https://discord.gg/K9YnNqsNKx");
            }
        }
    }

    (async () => {
        if (typeof PreferenceRegisterExtensionSetting === "function") {
            PreferenceRegisterExtensionSetting({
                Identifier: "动作拓展设置",
                ButtonText: "动作拓展设置",
                Image: "Icons/Use.png",
                load: () => GUIScreen.Current = new 动作拓展设置(null),
                click: () => GUIScreen.Current?.click(),
                run: () => GUIScreen.Current?.run(),
                unload: () => GUIScreen.Current?.unload(),
                exit: () => GUIScreen.Current?.exit(),
            });
        } else {
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
            const SettingSubscreenName = "动作拓展设置";
            window[`PreferenceSubscreen${SettingSubscreenName}Load`] = () => GUIScreen.Current = new 动作拓展设置(null);
            window[`PreferenceSubscreen${SettingSubscreenName}Run`] = () => GUIScreen.Current?.run();
            window[`PreferenceSubscreen${SettingSubscreenName}Click`] = () => GUIScreen.Current?.click();
            window[`PreferenceSubscreen${SettingSubscreenName}Exit`] = () => GUIScreen.Current?.exit();
            window[`PreferenceSubscreen${SettingSubscreenName}Unload`] = () => GUIScreen.Current?.unload();

            笨蛋Luzi.hookFunction("DrawButton", 2, (args, next) => {
                if (args[6] == `Icons/${SettingSubscreenName}.png`) args[6] = "Icons/Use.png";
                return next(args);
            });

            笨蛋Luzi.hookFunction("TextGet", 2, (args, next) => {
                if (args[0] == `Homepage${SettingSubscreenName}`) return "动作拓展设置";
                return next(args);
            });

            while (!Array.isArray(PreferenceSubscreenList)) await delay(100);
            if (!PreferenceSubscreenList.includes(SettingSubscreenName))
                PreferenceSubscreenList.push(SettingSubscreenName);
        }

    })()

    笨蛋Luzi.hookFunction("DrawBackNextButton", 10, (args, next) => {
        if (args[4]?.includes("笨蛋笨Luzi_")) {
            args[4] = args[4]?.replace("笨蛋笨Luzi_", "");
        }
        next(args);
    });
    //#endregion

    const translations = [
        { regex: /(.+) moans uncontrollably as (.+)'s drug takes effect\./, replacement: "$1在$2的药物生效时无法控制地呻吟." },
        { regex: /(.+) quivers as (.+) body is flooded with (.+)'s aphrodisiac\./, replacement: "$1在$3的催情剂涌入$2的身体时颤抖不已." },
        { regex: /(.+)'s eyes roll back as a wave of pleasure washes over (.+) body\./, replacement: "$1的眼睛翻白,一股快感涌过$2的身体." },
        { regex: /(.+) sighs as a cool relaxing calm glides through (.+) body, fighting to keep (.+) eyes open\./, replacement: "$1叹息着,一股凉爽、放松的平静感在$2的身体中流动,努力保持$3的眼睛睁开." },
        { regex: /(.+)'s muscles relax as (.+)'s sedative courses through (.+) body/, replacement: "$1的肌肉在$2的镇静剂流过$3的身体时放松了." },
        { regex: /(.+) fights to stay conscious against the relentless weight of (.+)'s drug\./, replacement: "$1努力保持清醒, 抵抗着$2的药物的无情压力." },
        { regex: /(.+)'s eyes droop as (.+) fights to stay conscious against the cool, welcoming weight of (.+)'s drug\./, replacement: "$1的眼睛低垂, $2在抗拒着$3的药物的凉爽、欢迎的压力, 努力保持清醒." },
        { regex: /(.+) moans thankfully as (.+)'s medicine heals (.+)\./, replacement: "$1感激地呻吟, $2的药物正在治愈$3." },
        { regex: /(.+)'s body glows slightly as (.+)'s cure washes warmly over (.+)\./, replacement: "$1的身体微微发光, $2的治疗温暖地覆盖在$3身上." },
        { regex: /(.+)'s drug rushes warmly through (.+)'s body, curing what ails (.+)\./, replacement: "$1的药物温暖地流过$2的身体, 治愈了$3的疾病." },
        { regex: /(.+) gulps and swallows (.+)'s drink, a cool relaxing feeling starting to spread through (.+) body\./, replacement: "$1啜饮着$2的饮料, 一种凉爽而放松的感觉开始在$3的身体中蔓延." },
        { regex: /(.+) sighs as a cool relaxing calm glides down (.+) throat, fighting to keep (.+) eyes open\./, replacement: "$1叹息着, 一股凉爽而放松的平静滑过$2的喉咙, 努力保持着$3的眼睛睁开." },
        { regex: /(.+)'s muscles relax as (.+)'s sedative pours down (.+) throat and starts to take effect\./, replacement: "$1的肌肉在$2的镇定剂倾入$3的喉咙后放松, 开始产生作用." },
        { regex: /(.+)'s eyes droop as (.+) fights to stay conscious against the cool, welcoming weight of (.+)'s drug\./, replacement: "$1的眼睛开始闭合, $2努力保持清醒, 抗拒着$3的药物带来的凉爽而欢迎的沉重感.", },
        { regex: /(.+) whimpers and struggles to keep control of (.+) mind\./, replacement: "$1呜咽着, 挣扎着保持对$2心灵的控制." },
        { regex: /(.+) gasps weakly as (.+)'s drug slowly erases (.+) free will\./, replacement: "$1虚弱地喘息着, 随着$2的药物慢慢地抹去$3的自由意志." },
        { regex: /(.+)'s eyes struggle to focus as (.+)'s drug makes (.+) more suggestible\./, replacement: "$1 的眼睛努力聚焦, $2的药物使得$3更易受建议." },
        { regex: /(.+) starts to drift dreamily as they swallow (.+)'s drink\./, replacement: "$1开始梦幻般地漂浮, 当他们咽下$2的饮料." },
        { regex: /(.+) gasps weakly and starts to lose focus as (.+)'s drug warms (.+) comfortably\./, replacement: "$1虚弱地喘息着, 开始失去焦点, $2的药物温暖地包裹着$3." },
        { regex: /(.+)'s eyes flutter and defocus as (.+)'s drink slides warmly down (.+) throat\./, replacement: "$1的眼睛闪烁, 变得模糊不清, 当$2的饮料温暖地滑过$3的喉咙时." },
        { regex: /(.+) gulps thankfully as (.+)'s medicine slowly heals (.+)\./, replacement: "$1感激地大口地喝着, 当$2的药物慢慢治愈了$3." },
        { regex: /(.+)'s body glows slightly as (.+)'s cure glides warmly through (.+)\./, replacement: "$1的身体微微发光, 当$2的药物温暖地流过$3时." },
        { regex: /(.+)'s antidote slowly washes through (.+)'s body, curing what ails (.+)\./, replacement: "$1的解毒药慢慢地流过$2的身体, 治愈了$3的病痛." },
        { regex: /(.+)'s body goes limp as (.+) mind empties and (.+) awaits a command\./, replacement: "$1的身体变得无力, $2的头脑变得空虚, $3等待着一个命令." },
        { regex: /(.+)'s eyes roll back as a wave of pleasure emanates from (.+) belly\./, replacement: "$1的眼睛翻白, 当一股快乐的感觉从$2的肚子中散发出来." },
        { regex: /(.+)'s eyes move dreamily under (.+) closed eyelids\.\.\./, replacement: "$1的眼睛在闭合的眼皮下梦幻般地移动着..." },
        { regex: /(.+) exhales slowly, fully relaxed\.\.\./, replacement: "$1缓缓地呼出一口气, 完全放松..." },
        { regex: /(.+)'s muscles twitch weakly in (.+) sleep\.\.\./, replacement: "$1的肌肉在睡眠中微弱地抽搐着..." },
        { regex: /(.+) moans softly and relaxes\.\.\./, replacement: "$1轻轻地呻吟着并放松着..." },
        { regex: /(.+) fires a net wildly\./, replacement: "$1疯狂地射出一张网." },
        { regex: /(.+) fires at themselves point blank\./, replacement: "$1在零距离处射击自己." },
        { regex: /(.+) fires a net at (.+)\./, replacement: "$1向$2射出一张网." },
        { regex: /(.+)'s mask whirs and shudders as it reloads its own supply and continues emitting\./, replacement: "$1的面具嗡嗡作响, 颤抖着重新装载自己的供应并继续释放." },
        { regex: /(.+)'s mask hums menacingly as it holds its supply in reserve\./, replacement: "$1的面具威胁地嗡嗡作响, 将其供应保留着." },
        { regex: /(.+)'s mask clicks and turns itself back on\./, replacement: "$1的面具发出咔嚓声, 重新启动." },
        { regex: /(.+) reloads (.+)'s mask and turns it back on, pumping gas back into (.+) lungs\./, replacement: "$1重新装载了$2的面具并重新启动, 将气体注入$3的肺部." },
        { regex: /(.+) switches on (.+)'s mask, filling (.+) lungs\./, replacement: "$1打开了$2的面具,将气体填满$3的肺部." },
        { regex: /(.+) switches off (.+)'s mask, halting the flow of gas\./, replacement: "$1关闭了$2的面具,停止气体的流动." },
        { regex: /(.+)'s eyes widen as (.+) mask activates, slowly filling (.+) lungs with its drug\./, replacement: "$1的眼睛睁大, $2面具启动, 缓慢地将药物填满$3的肺部." },
        { regex: /(.+) takes a deep breath of cool, clean air as (.+) mask is removed\./, replacement: "$1深吸一口凉爽、清新的空气, 当$2面具被移除时." },
        { regex: /(.+)'s mask hisses quietly as it runs out of its supply of gas\./, replacement: "$1的面具轻轻地嘶嘶作响, 它的气体用尽了." },
        { regex: /(.+) groans helplessly as (.+) headset manipulates (.+) mind\./, replacement: "$1无助地呻吟着, $2耳机操控着$3的思维." },
        { regex: /(.+) struggles to keep (.+) focus through the overwhelming influence of (.+) headset\./, replacement: "$1挣扎着保持$2的专注, 尽管$3耳机的影响是压倒性的." },
        { regex: /(.+) whimpers as (.+) headset erases (.+) own mind relentlessly\./, replacement: "$1抽泣着, $2耳机无情地抹去了$3的思维." },
        { regex: /(.+)'s muscles relax limply as (.+) takes a deep breath through (.+) mask\./, replacement: "$1的肌肉变得无力松弛, 当$2通过$3的面具深吸一口气." },
        { regex: /(.+)'s eyes flutter weakly as (.+) inhales\./, replacement: "$1的眼睛微弱地眨动着, 当$2吸气时." },
        { regex: /(.+) struggles to keep (.+) drooping eyes open as (.+) mask continues to emit its sedative gas\./, replacement: "$1挣扎着保持$2沉重的眼睑睁开, $3的面具继续释放着镇定气体." },
        { regex: /(.+) groans helplessly as (.+) mask sends another dose into (.+) lungs\./, replacement: "$1无助地呻吟着, $2的面具又向$3的肺部注入了一剂药物." },
        { regex: /(.+) struggles to keep (.+) focus through the suggestible haze caused by (.+) mask\./, replacement: "$1挣扎着保持$2的专注, 尽管$3的面具造成的易受建议的阴霾." },
        { regex: /(.+) whimpers as (.+) mask's drug pushes (.+) further out of (.+) own mind\./, replacement: "$1抽泣着, $2的面具的药物将$3推得更远离$4自己的思维." },
        { regex: /(.+)'s spine tingles as (.+) takes a deep breath through (.+) mask\./, replacement: "$1的脊柱一阵刺痛, 当$2通过$3的面具深吸一口气." },
        { regex: /(.+) lets out a muffled moan as (.+) inhales\./, replacement: "$1发出一声闷哼, 当$2吸气时." },
        { regex: /(.+)'s sensitive areas burn hot as (.+) breathes through (.+) mask\./, replacement: "$1敏感的部位在$2通过$3的面具呼吸时烧得滚烫." },
        { regex: /(.+) sighs with relief as (.+) takes a deep gulp of healing mist\./, replacement: "$1欣慰地叹了口气, 当$2深吸一口治愈的薄雾." },
        { regex: /(.+) feels a tingle across (.+) skin as (.+) mask heals them\./, replacement: "$1感到皮肤上一阵刺痛, 当$2的面具治愈了他们." },
        { regex: /(.+) lets out a quiet moan as (.+) mask releases a healing mist into her lungs\./, replacement: "$1发出一声安静的呻吟, 当$2的面具释放出治愈的薄雾进入她的肺部." },
        { regex: /(.+)'s whimpers, (.+) tongue held tightly\./, replacement: "$1呜咽, $2的舌头被紧紧地抓住." },
        { regex: /(.+) strains, trying to pull (.+) tongue free\./, replacement: "$1用力, 试图把$2的舌头拉出来." },
        { regex: /(.+) starts to drool, (.+) tongue held fast\./, replacement: "$1开始流口水, $2的舌头被牢牢地固定住." },
        { regex: /(.+) wiggles (.+) nose\./, replacement: "$1扭动$2的鼻子." },
        { regex: /(.+) wiggles (.+) nose with a small frown\./, replacement: "$1皱着眉头扭动$2的鼻子." },
        { regex: /(.+) sneezes in surprise\./, replacement: "$1惊讶地打了个喷嚏." },
        { regex: /(.+) looks crosseyed at (.+) nose\./, replacement: "$1斜视着$2的鼻子." },
        { regex: /(.+) wiggles (.+) nose with a squeak\./, replacement: "$1发出吱吱声, 扭动$2的鼻子." },
        { regex: /(.+) meeps\!/, replacement: "$1发出吱吱声!" },
        { regex: /(.+) swats at (.+)'s hand\./, replacement: "$1朝$2的手拍打." },
        { regex: /(.+) covers (.+) nose protectively, squinting at (.+)\./, replacement: "$1保护地捂着$2的鼻子, 斜着眼睛看着$3." },
        { regex: /(.+) snatches (.+)'s booping finger\./, replacement: "$1抢夺$2戳戳的手指." },
        { regex: /(.+)'s nose overloads and shuts down\./, replacement: "$1的鼻子超载并关闭." },
        { regex: /(.+) struggles in (.+) bindings, huffing\./, replacement: "$1在$2约束中挣扎, 喘气." },
        { regex: /(.+) frowns and squirms in (.+) bindings\./, replacement: "$1在$2约束中皱眉挣扎." },
        { regex: /(.+) whimpers in (.+) bondage\./, replacement: "$1在$2束缚中呜咽." },
        { regex: /(.+) groans helplessly\./, replacement: "$1无助地呻吟." },
        { regex: /(.+) whines and wiggles in (.+) bondage\./, replacement: "$1在$2约束中呜咽和扭动." },
        { regex: /(.+)'s mouth moves silently\./, replacement: "$1的嘴无声地动着." },
        { regex: /(.+)'s mouth moves without a sound\./, replacement: "$1的嘴无声地动着." },
        { regex: /(.+)'s whimpers inaudibly, unable to breathe\./, replacement: "$1的呜咽无法听到, 无法呼吸." },
        { regex: /(.+) groans and convulses\./, replacement: "$1呻吟并抽搐." },
        { regex: /(.+) shudders as (.+) lungs burn\./, replacement: "$1当$2的肺燃烧时颤抖." },
        { regex: /(.+) gasps and gulps for air\./, replacement: "$1喘气并拼命吞咽空气." },
        { regex: /(.+)'s lungs expand hungrily as (.+) gasps in air\./, replacement: "$1的肺急切地扩张, 当$2喘着气." },
        { regex: /(.+) gasps for air with a whimper\./, replacement: "$1呜咽着喘气." },
        { regex: /(.+) coughs as (.+) collar pushes against (.+) throat\./, replacement: "$1在$2项圈顶向$3喉咙时咳嗽." },
        { regex: /(.+) gulps as (.+) feels the tight collar around (.+) neck\./, replacement: "$1感到$2紧贴在$3脖子上的紧领, gulp了一口气." },
        { regex: /(.+) shifts nervously in (.+) tight collar\./, replacement: "$1在$2紧领中紧张地转动." },
        { regex: /(.+) trembles, very conscious of the tight collar around (.+) neck\./, replacement: "$1颤抖着, 非常意识到紧贴在$2脖子上的紧领." },
        { regex: /(.+) huffs uncomfortably in (.+) tight collar\./, replacement: "$1在$2紧领中不舒服地咕噜作响." },
        { regex: /(.+) whimpers pleadingly as (.+) struggles to take a full breath\./, replacement: "$1恳求地呜咽, 当$2努力吸满一口气." },
        { regex: /(.+) chokes against (.+) collar, moaning softly\./, replacement: "$1在$2项圈上窒息, 轻声呻吟." },
        { regex: /(.+)'s eyes flutter weakly as (.+) collar presses into (.+) neck\./, replacement: "$1的眼睛微弱地眨动, 当$2项圈压在$3脖子上时." },
        { regex: /(.+) tries to focus on breathing, each inhale an effort in (.+) collar\./, replacement: "$1试着专注于呼吸, 在$2项圈中每一次吸气都是一种努力." },
        { regex: /(.+) splutters and chokes, struggling to breathe\./, replacement: "$1咕噜作响并窒息, 挣扎着呼吸." },
        { regex: /(.+) grunts and moans, straining to breathe\./, replacement: "$1呻吟着并哼哼, 努力呼吸." },
        { regex: /(.+)'s eyes have trouble focusing, as (.+) chokes and gets lightheaded\./, replacement: "$1的眼睛难以聚焦, 因为$2窒息并感到头晕." },
        { regex: /(.+)'s eyes flutter as (.+) fights to keep control of (.+) senses\.\.\./, replacement: "$1的眼睛飘动, 因为$2努力保持对$3感觉的控制." },
        { regex: /(.+) whimpers and struggles to stay awake\.\.\./, replacement: "$1呜咽着, 挣扎着保持清醒..." },
        { regex: /(.+) can feel (.+) eyelids grow heavy as (.+) drifts on the edge of trance\.\.\./, replacement: "$1能感觉到$2眼皮变得沉重, 因为$3在恍惚边缘漂流..." },
        { regex: /(.+) lets out a low moan as (.+) muscles relax and (.+) starts to drop\.\.\./, replacement: "$1低声呻吟, 当$2肌肉放松时, $3开始下垂..." },
        { regex: /(.+)'s eyes flutter as (.+) fights to keep them open\.\.\./, replacement: "$1的眼睛飘动, 因为$2努力保持它们睁开..." },
        { regex: /(.+) yawns and struggles to stay awake\.\.\./, replacement: "$1打哈欠, 挣扎着保持清醒..." },
        { regex: /(.+) can feel (.+) eyelids grow heavy as (.+) drifts on the edge of sleep\.\.\./, replacement: "$1能感觉到$2眼皮变得沉重, 因为$3在睡眠边缘漂流..." },
        { regex: /(.+) takes a deep, relaxing breath as (.+) muscles relax and (.+) eyes start to droop\.\.\./, replacement: "$1深深地吸了一口放松的气息, 当$2肌肉放松, $3眼睛开始下垂..." },
        { regex: /(.+)'s eyes move dreamily under (.+) closed eyelids\.\.\./, replacement: "$1的眼睛在$2闭合的眼睑下梦幻般地移动..." },
        { regex: /(.+) takes another deep breath through (.+) gag\.\.\./, replacement: "$1通过$2口饰再次深呼吸..." },
        { regex: /(.+)'s muscles twitch weakly in (.+) sleep\.\.\./, replacement: "$1的肌肉在$2睡眠中微弱抽动..." },
        { regex: /(.+) moans softly and relaxes\.\.\./, replacement: "$1轻声呻吟并放松..." },
        { regex: /(.+)'s whimpers, (.+) tongue held tightly\./, replacement: "$1的呜咽声, $2舌头被牢牢地固定." },
        { regex: /(.+) strains, trying to pull (.+) tongue free\./, replacement: "$1用力, 试图把$2舌头拉出来." },
        { regex: /(.+) starts to drool, (.+) tongue held fast\./, replacement: "$1开始流口水, $2舌头被牢牢固定." },
        { regex: /(.+) barely trembles, unable to move (.+) mouth or make a sound\.\.\./, replacement: "$1几乎不发抖, 无法移动$2嘴巴或发出声音..." },
        { regex: /(.+)'s eyes plead helplessly as (.+) muscles refuse to obey\.\.\./, replacement: "$1的眼睛无助地乞求, 当$2肌肉拒绝服从..." },
        { regex: /(.+) manages to muster a quiet whimper, (.+) body held fast\.\.\./, replacement: "$1设法发出了一声轻柔的呜咽, $2身体被牢牢固定..." },
        { regex: /(.+)'s eyes widen as they try to speak without success\.\.\./, replacement: "$1的眼睛睁大, 当它们试图说话却没有成功..." },
        { regex: /(.+) looks around helplessly, unable to make a sound\.\.\./, replacement: "$1无助地四处张望, 无法发出声音..." },
        { regex: /(.+)'s mouth moves in silence\.\.\./, replacement: "$1的嘴巴无声地动着..." },
        { regex: /(.+)'s mouth moves silently\.\.\./, replacement: "$1的嘴巴无声地动着..." },
        { regex: /(.+) whimpers, struggling in (.+) bindings and unable to speak\.\.\./, replacement: "$1在$2约束中挣扎, 无法说话..." },
        { regex: /(.+)'s eyes widen as they squirm in (.+) bondage, only a gentle moan escaping\.\.\./, replacement: "$1的眼睛睁大, 当它们在$2束缚中扭动时, 只有一声轻柔的呻吟逃逸..." },
        { regex: /(.+) tries (.+) best to speak, but has to resign themselves to mearly a bound whimper\.\.\./, replacement: "$1尽力想说话, 但不得不只是发出一声被束缚的呜咽..." },
        { regex: /(.+) squirms in (.+) bindings, (.+) mouth moving in silence\.\.\./, replacement: "$1在$2约束中扭动, 嘴巴无声地移动..." },
        { regex: /(.+)'s eyelids flutter as a thought tries to enter (.+) blank mind\.\.\./, replacement: "$1的眼皮轻微颤动, 当一种想法试图进入$2空白的思维中..." },
        { regex: /(.+) sways weakly in (.+) place, drifting peacefully\.\.\./, replacement: "$1在$2地方虚弱地摇晃, 平静地漂流..." },
        { regex: /(.+) trembles as something deep and forgotten fails to resurface\.\.\./, replacement: "$1颤抖着, 因为某种深刻而被遗忘的东西未能重新浮出水面..." },
        { regex: /(.+) moans softly as (.+) drops even deeper into trance\.\.\./, replacement: "$1轻声呻吟, 因为$2甚至更深地陷入了恍惚之中..." },
        { regex: /(.+) quivers, patiently awaiting something to fill (.+) empty head\.\.\./, replacement: "$1颤抖着, 耐心等待着某种东西来填补$2空虚的脑袋..." },
        { regex: /(.+) stares blankly, (.+) mind open and suggestible\.\.\./, replacement: "$1茫然地凝视着, $2思维开放且易受影响..." },
        { regex: /(.+)'s eyelids flutter gently, awaiting a command\.\.\./, replacement: "$1的眼皮轻轻颤动, 等待着一声命令..." },
        { regex: /(.+) trembles with a quiet moan as (.+) yearns to obey\.\.\./, replacement: "$1轻声呻吟着颤抖, 因为$2渴望服从..." },
        { regex: /(.+)'s eyes move dreamily under (.+) closed eyelids\.\.\./, replacement: "$1的眼睛在$2闭着的眼皮下梦幻般地移动..." },
        { regex: /(.+) exhales slowly, fully relaxed\.\.\./, replacement: "$1慢慢地呼出气, 完全放松..." },
        { regex: /(.+)'s muscles twitch weakly in (.+) sleep\.\.\./, replacement: "$1的肌肉在$2睡眠中微弱抽动..." },
        { regex: /(.+) moans softly and relaxes\.\.\./, replacement: "$1轻声呻吟并放松..." },
        { regex: /(.+)'s eyes widen as (.+) gag inflates to completely fill (.+) throat\./, replacement: "$1的眼睛睁大, 当$2口饰膨胀完全填满$3喉咙时." },
        { regex: /(.+) splutters and gasps for air around (.+) gag\./, replacement: "$1喷溅并在$2口饰周围喘息." },
        { regex: /(.+)'s eyes flutter as (.+) collar starts to tighten around (.+) neck with a quiet hiss\./, replacement: "$1的眼睛飘动, 当$2项圈开始在$3脖子上轻轻地发出嘶嘶声时." },
        { regex: /(.+) gasps for air as (.+) collar presses in around (.+) neck with a hiss\./, replacement: "$1喘着气, 当$2项圈嘶嘶地压在$3脖子上时." },
        { regex: /(.+)'s face runs flush, choking as (.+) collar hisses, barely allowing any air to (.+) lungs\./, replacement: "$1的脸色变得潮红, 当$2项圈嘶嘶作响时, 几乎没有任何空气进入$3的肺部, 导致窒息." },
        { regex: /(.+) chokes and gasps desperately as (.+) collar slowly releases some pressure\./, replacement: "$1呼吸困难地喘息, 当$2项圈缓慢地释放一些压力时." },
        { regex: /(.+)'s collar opens a little as (.+) lets out a moan, gulping for air\./, replacement: "$1的项圈稍微打开, 当$2发出呻吟时, 急切地吞食着空气." },
        { regex: /(.+) whimpers thankfully as (.+) collar reduces most of its pressure around (.+) neck\./, replacement: "$1感激地呜咽着, 当$2项圈在$3脖子周围减轻大部分压力时." },
        { regex: /(.+) takes a deep breath as (.+) collar releases its grip with a hiss\./, replacement: "$1深吸一口气, 当$2项圈发出嘶嘶声释放其控制时." },
        { regex: /(.+) gulps thankfully as the threat to (.+) airway is removed\./, replacement: "$1感激地吞咽着, 当对$2气道的威胁消除时." },
        { regex: /(.+)'s eyes start to roll back, gasping and choking as (.+) collar presses in tightly and completely with a menacing hiss\./, replacement: "$1的眼睛开始翻白, 当$2项圈紧紧而完全地压着时, 发出威胁的嘶嘶声, 喘息和窒息." },
        { regex: /(.+)'s eyes flutter with a groan, unable to get any air to (.+) lungs\./, replacement: "$1的眼睛随着呻吟而飘动, 无法让任何空气进入$2的肺部." },
        { regex: /(.+) chokes and spasms, (.+) collar holding tight\./, replacement: "$1窒息和痉挛, $2项圈紧紧地控制着." },
        { regex: /(.+) chokes and spasms, (.+) gripping (.+) throat relentlessly\./, replacement: "$1窒息和痉挛, $2不停地紧抓着$3的喉咙." },
        { regex: /(.+) convulses weakly with a moan, (.+) eyes rolling back as the collar hisses impossibly tighter\./, replacement: "$1痉挛着, 带着呻吟, $2的眼睛翻白, 项圈发出不可思议的更紧的嘶嘶声." },
        { regex: /As (.+) collapses unconscious, (.+) collar releases all of its pressure with a long hiss\./, replacement: "当$1失去知觉倒下时, $2的项圈发出长长的嘶嘶声, 释放出所有的压力." },
        { regex: /As (.+) collapses unconscious, (.+) releases (.+) neck\./, replacement: "当$1失去知觉倒下时, $2释放了对$3脖子的控制." },
        { regex: /As (.+) slumps unconscious, (.+) nose plugs fall out\./, replacement: "当$1失去知觉倒下时, $2的鼻塞掉了出来." },
        { regex: /(.+) quivers with one last attempt to stay awake\.\.\./, replacement: "$1颤抖着, 做最后的努力保持清醒." },
        { regex: /(.+) trembles weakly with one last attempt to maintain (.+) senses\.\.\./, replacement: "$1微弱地颤抖, 做最后的努力保持$2感觉." },
        { regex: /(.+)'s frowns as (.+) fights to remain conscious\./, replacement: "$1皱着眉头, 当$2努力保持清醒时." },
        { regex: /(.+)'s eyes immediately defocus, (.+) posture slumping slightly as (.+) loses control of (.+) body at the utterance of a trigger word\./, replacement: "$1的眼睛立即变得模糊, 当$2说出触发词时, $3的姿势略微下垂, 失去对$4身体的控制." },
        { regex: /(.+)'s eyes glaze over, (.+) posture slumping weakly as (.+) loses control of (.+) body\./, replacement: "$1的眼睛变得呆滞, $2微弱地下垂, $3失去对$4身体的控制." },
        { regex: /(.+) reboots, blinking and gasping as (.+) regains (.+) senses\./, replacement: "$1重新启动, 眨眼喘息, 当$2重新获得$3感官时." },
        { regex: /(.+) blinks, shaking (.+) head with confusion as (.+) regains (.+) senses\./, replacement: "$1眨眼, 困惑地摇摇头, 当$3重新获得$4感官时." },
        { regex: /(.+) gasps, blinking and blushing with confusion\./, replacement: "$1喘息, 眨眼并因困惑而脸红." },
        { regex: /(.+) concentrates, breaking the hold the previous trigger word held over (.+)\./, replacement: "$1集中精神, 打破了以前触发词对$2的控制." },
        { regex: /(.+)'s eyes dart around, (.+) world suddenly plunged into darkness\./, replacement: "$1的眼睛四处游移, $2的世界突然陷入黑暗." },
        { regex: /(.+) frowns as (.+) is completely deafened\./, replacement: "$1皱着眉头, 因为$2完全失聪." },
        { regex: /(.+)'s eyes widen in a panic as (.+) muscles seize in place\./, replacement: "$1恐慌地睁大眼睛, 当$2的肌肉僵硬时." },
        { regex: /(.+) is unable to fight the spell's hypnotizing influence, slumping weakly as (.+) eyes go blank\./, replacement: "$1无法抵抗咒语的催眠影响, 当$2的眼睛变得空白时, 软弱地倒下." },
        { regex: /(.+)'s protests suddenly fall completely silent\./, replacement: "$1的抗议突然完全沉默了." },
        { regex: /(.+)'s mouth moves in protest but not a single sound escapes\./, replacement: "$1的嘴在抗议, 但没有任何声音逃脱." },
        { regex: /(.+) succumbs to the spell's overwhelming pressure, (.+) eyes closing as (.+) falls unconscious\./, replacement: "$1屈服于咒语的压倒性压力, 当$3失去意识时, $2的眼睛闭上了." },
        { regex: /(.+) gasps, blinking as the magic affecting (.+) is removed\./, replacement: "$1喘息着眨眼, 当影响$2的魔法被移除时." },
        { regex: /(.+) trembles as (.+) clothing shimmers and morphs around (.+)\./, replacement: "$1颤抖着, 当$2的衣服闪烁并在$3周围变形时." },
        { regex: /(.+) squeaks as (.+) clothing shimmers and morphs around (.+)\./, replacement: "$1尖叫着, 当$2的衣服闪烁并在$3周围变形时." },
        { regex: /(.+) trembles as (.+) body shimmers and morphs\./, replacement: "$1颤抖, 当$2的身体闪烁并改变形状时." },
        { regex: /(.+) squeaks as (.+) body shimmers and morphs\./, replacement: "$1尖叫着, 当$2的身体闪烁并改变形状时." },
        { regex: /(.+) squirms as (.+) arousal is paired\./, replacement: "$1扭动着身体, 当$2的兴奋被配对时." },
        { regex: /(.+) quivers as (.+) feels (.+) impending denial\./, replacement: "$1颤抖着, 当$2感受到$3即将到来的拒绝时." },
        { regex: /(.+) whimpers as (.+) feels (.+) impending denial\./, replacement: "$1呜咽着, 当$2感受到$3即将到来的拒绝时." },
        { regex: /(.+)'s muscles slump limply once more as another dose of chloroform is applied\./, replacement: "$1的肌肉再次无力松弛, 当又一剂氯仿被施用时." },
        { regex: /(.+) eyes go wide as the sweet smell of ether fills (.+) nostrils\./, replacement: "$1的眼睛瞪大, 当乙醚的甜味充满$2的鼻孔时." },
        { regex: /(.+) slumps back in (.+) sleep as another dose of ether assails (.+) senses\./, replacement: "$1在另一剂乙醚冲击$3的感官时, $2沉入睡梦中." },
        { regex: /(.+), unable to continue holding (.+) breath, takes a desparate gasp through the chemical-soaked cloth\./, replacement: "$1, 无法继续屏住$2的呼吸, 透过浸满化学药品的布料拼命地喘气." },
        { regex: /(.+)'s body trembles as the chloroform sinks deep into (.+) mind\./, replacement: "$1的身体颤抖, 当氯仿深深渗入$2的头脑时." },
        { regex: /(.+) takes a deep, calm breath as (.+) chloroform starts to lose its potency\.\.\./, replacement: "$1深深地吸了口气, 当$2氯仿开始失去效力时, 保持平静." },
        { regex: /(.+) continues to sleep peacefully as the cloth is removed\.\.\./, replacement: "$1继续安详地睡着, 当布料被移开时." },
        { regex: /(.+) gulps in fresh air as the cloth is removed\.\.\./, replacement: "$1大口吸入新鲜空气, 当布料被移开时." },
        { regex: /(.+) starts to stir with a gentle moan\.\.\./, replacement: "$1开始缓慢地挣扎着, 轻轻地呻吟着." },
        { regex: /(.+)'s eyes flutter and start to open sleepily\.\.\./, replacement: "$1的眼睛飘动着, 开始慢慢地睁开, 显得昏昏欲睡." },
        { regex: /(.+) moans and trembles in frustration as (.+) is held right at the edge\.\.\./, replacement: "$1因被困在边缘而感到沮丧地呻吟和颤抖." },
        { regex: /(.+) leads (.+) out of the room by the ear\./, replacement: "$1领着$2通过耳朵离开房间." },
        { regex: /(.+) roughly pulls (.+) out of the room by the arm\./, replacement: "$1粗暴地拉着$2通过手臂离开房间." },
        { regex: /(.+) tugs (.+) out of the room by the tongue\./, replacement: "$1拽着$2通过舌头离开房间." },
        { regex: /(.+) drags (.+) out of the room with a wince\./, replacement: "$1痛苦地拖着$2离开房间." },
        { regex: /(.+) feels as though (.+) abilities are enhanced\./, replacement: "$1感觉自己的能力得到了增强." },
        { regex: /(.+) feels as though (.+) abilities are deminished\./, replacement: "$1感觉自己的能力受到了削弱." },
        { regex: /(.+)'s abilities return to normal\./, replacement: "$1的能力恢复正常." },
        { regex: /(.+) blinks and returns to (.+) senses\./, replacement: "$1眨了眨眼, 回到了$2的感觉中." },
        { regex: /(.+)'s breathing calms down as (.+) regains control of (.+) arousal\./, replacement: "$1的呼吸平静下来, 当$2重新控制了$3的兴奋时." },
        { regex: /(.+) slumps weakly as (.+) slips into unconciousness\./, replacement: "$1无力地瘫坐, 当$2陷入无意识时." },
        { regex: /(.+)'s eyelids flutter and start to open sleepily\.\.\./, replacement: "$1的眼睑飘动, 开始昏昏欲睡地睁开." },
        { regex: /(.+)'s body reshapes and grows to twice its size\./, replacement: "$1的身体重新塑形并长大至两倍大小." },
        { regex: /(.+)'s body reshapes and shrinks to half its size\./, replacement: "$1的身体重新塑形并缩小至一半大小." },
        { regex: /(.+)'s body returns to its normal size\./, replacement: "$1的身体恢复到正常大小." },
        { regex: /(.+)'s (.+) engulfs (.+)\./, replacement: "$1的$2吞没了$3." },
        { regex: /(.+) struggles in (.+) bindings, unable to reach (.+) collar's controls\./, replacement: "$1在$2约束下挣扎, 无法触及$3项圈的控制装置." },
        { regex: /(.+) struggles in (.+) bindings, unable to reach (.+)'s collar controls\./, replacement: "$1在$2约束下挣扎, 无法触及$3的项圈控制装置." },
        { regex: /(.+) presses a button on (.+) collar\./, replacement: "$1按下$2项圈上的一个按钮." },
        { regex: /(.+) presses a button on (.+)'s collar\./, replacement: "$1按下$2的项圈上的一个按钮." },
        { regex: /(.+)\'s collar beeps and a computerized voice says "Access Denied\./, replacement: "$1的项圈发出嘟嘟声, 电脑化的声音说:“访问被拒绝.”" },
        { regex: /(.+)\'s collar chimes and a computerized voice reads out\:\nCurrent Level\: (.+)\.\.\.\nCorrective Cycles: (.+)\.\.\.\nTighten Trigger\: \'(.+)\'\.\.\.\nLoosen Trigger\: \'(.+)\'\.\.\.\nRemote Access\: (.+)\.\.\./, replacement: "$1的项圈响起提示音, 电脑化的声音读出:\n当前水平:$2...\n校正周期:$3...\n收紧触发器:“$4”...\n放松触发器:“$5”...\n远程访问:$6.." },
        { regex: /(.+) gives (.+) (.+) to (.+)\./, replacement: "$1给$2$3给$4." },
        { regex: /(.+) slowly waves (.+) (.+) in an intricate pattern, making sure (.+) follows along with (.+) (.+)/, replacement: "$1慢慢地挥动着$2$3以复杂的图案, 确保$4跟着他们的$5$6." },
        { regex: /(.+) repeats an indecipherable phrase, touching (.+) (.+) to (.+)'s (.+)/, replacement: "$1重复着一个难以理解的短语, 把$2$3碰到$4的$5." },
        { regex: /(.+) holds both(.+)(.+) and(.+)'s (.+) tightly, energy traveling from one to the other/, replacement: "$1紧紧地握着$2$3和$4的$5, 能量从一个传递到另一个" },
        { regex: /(.+) waves (.+) (.+) in an intricate pattern and casts (.+) on (.+)(.+)/, replacement: "$1挥动$2$3以复杂的图案并在$4上施放$5$6" },
        { regex: /(.+) chants an indecipherable phrase, pointing (.+) (.+) at (.+) and casting (.+)(.+)/, replacement: "$1吟诵着一个难以理解的短语, 指着$2$3对准$4并施放$5$6" },
        { regex: /(.+) aims (.+) (.+) at (.+) and, with a grin, casts (.+) (.+)/, replacement: "$1瞄准$2$3在$4上, 并带着笑容施放$5$6 " },
        { regex: /(.+) struggles to wield (.+)'s (.+), (.+) spell backfiring\./, replacement: "$1挣扎着挥舞$2的$3, $4法术反噬." },
        { regex: /(.+) struggles to wield (.+)'s (.+), (.+) spell fizzling with no effect\./, replacement: "$1挣扎着挥舞$2的$3, $4法术无效." },
        { regex: /(.+) casts (.+) at (.+) but it seems to fizzle\./, replacement: "$1施放$2在$3, 但看起来失效了." },
        { regex: /(.+) tries to explain the details of (.+) to (.+) but (.+) don't seem to understand\./, replacement: "$1试图向$3解释$2的细节, 但$4似乎不理解." },
        { regex: /(.+) tries to teach (.+) (.+) but (.+) don't seem to have ̶i̶n̶s̶t̶a̶l̶l̶e̶d̶ embraced Magic™\./, replacement: "$1试图教$3$2, 但$4似乎没有 embraced Magic™." },
        { regex: /(.+)\'s (.+) fizzles when cast on (.+), none of its effects allowed to take hold\./, replacement: "$1的$2消失了, 没有任何效果." },
        { regex: /(.+)\'s paired spell fizzles as it attempts to pair with (.+)\./, replacement: "$1的配对法术消失了, 当尝试与$2配对时." },
        { regex: /(.+) squirms as (.+) arousal is paired\./, replacement: "$1扭动不安, 当$2的情欲被配对时." },
        { regex: /(.+) lets out a quiet gasp as the pleasure center of (.+) mind starts to tingle\./, replacement: "$1发出轻轻的呼吸声, 因为$2心灵的愉悦中心开始发麻." },
        { regex: /(.+)\'s mind is already full of spells. (.+) must forget one before (.+) can learn (.+)\./, replacement: "$1的心灵已经充满了咒语.$2必须忘记一个才能学会$4." },
        { regex: /(.+) already knows a spell called (.+) and ignores (.+) new instructions\./, replacement: "$1已经知道一个名为$2的咒语, 忽略了$3的新指示." },
        { regex: /(.+) grins as they finally understand the details of (.+) and memorizes it for later\./, replacement: "$1露出笑容, 因为他们终于理解了$2的细节, 并把它记在心里以备将来." },
        { regex: /(.+) gulps down (.+)'s (.+)\./, replacement: "$1吞下了$2的$3." },
        { regex: /(.+) leads (.+) out of the room by the (.+)\./, replacement: "$1牵着$2走出房间." },
        { regex: /(.+) leads (.+) and (.+) out of the room\./, replacement: "$1带着$2和$3走出房间." },
        { regex: /(.+) drags (.+) out of the room with a wince\./, replacement: "$1拖着$2一边皱着眉走出房间." },
        { regex: /(.+)\'s (.+) state wears off\./, replacement: "$1的$2状态消失了." },
        { regex: /(.+) (.+) successfully defends against (.+)'s (.+) attempt to force (.+) to drink (.+) (.+), spilling drink all over\./, replacement: "$1 $2 成功地抵御了$3的$4企图强迫$5喝 $6 $7, 饮料洒得到处都是." },
        { regex: /(.+) (.+) manages to wrest (.+)'s (.+) (.+) out of (.+) grasp\!/, replacement: "$1$2设法夺过$3的$4$5脱离了$6的控制!" },
        { regex: /(.+) makes an activity roll and gets: (.+) (.+)/, replacement: "$1进行一次活动检定并获得: $2 $3" },
        { regex: /(.+) makes an activity check attack against (.+)\!/, replacement: "$1进行一次活动检定攻击, 攻击目标是$2!" },
        { regex: /(.+) makes an activity check defending from (.+)\!/, replacement: "$1进行一次活动检定防御, 防御来自$2!" },
        { regex: /(.+) (.+) manages to get (.+) (.+) past (.+)'s (.+) lips, forcing (.+) to swallow\./, replacement: "$1$2设法让$3$4经过$5的$6, 迫使$7吞咽." },
        { regex: /(.+) lets out a long low moan as (.+)'s drink burns pleasurably down (.+) throat\./, replacement: "$1发出长长的低吟, 当$2的饮料愉快地灼烧着$3的喉咙." },
        { regex: /(.+) gulps and quivers as (.+) body is slowly flooded with (.+)'s aphrodisiac\./, replacement: "$1低声喘息, 当$2的身体逐渐被$3的催情剂淹没." },
        { regex: /(.+) gasps, snapping back into (.+) senses confused and blushing\./, replacement: "$1喘息, 突然回到$2的意识中, 感到困惑而脸红." },
        { regex: /(.+) groans as air is allowed back into (.+) lungs\./, replacement: "$1呻吟着, 当空气重新进入$2的肺部时." },
        { regex: /(.+)\'s eyes flutter as (.+) wraps (.+) hand around (.+) neck\./, replacement: "$1的眼睛眨动着, 当$2用$4的手环绕着$3的脖子时." },
        { regex: /(.+) gasps for air as (.+) tightens (.+) grip on (.+) neck\./, replacement: "$1为了呼吸而喘息, 当$2在$4的脖子上紧紧抓着时." },
        { regex: /(.+)\'s face runs flush, choking as (.+) presses firmly against (.+) neck, barely allowing any air to (.+) lungs\./, replacement: "$1的脸颊泛起红潮, 当$2紧紧压在$4的脖子上, 几乎不让空气进入$5的肺部时." },
        { regex: /(.+) gasps in relief as (.+) releases (.+) pressure on (.+) neck\./, replacement: "$1松了口气, 当$2释放对$4的压力时." },
        { regex: /(.+) chokes and spasms, struggling in (.+) gag\./, replacement: "$1呛着并痉挛, 挣扎在$2的口球中." },
        { regex: /(.+) convulses weakly with a moan, (.+) eyes rolling back as (.+) clenches around (.+) throat even tighter\./, replacement: "$1微弱地抽搐着发出呻吟声, 当$2更紧地锁紧$4的喉咙时, $3的眼睛翻白." },
        { regex: /(.+) convulses weakly with a moan, (.+) eyes rolling back as (.+) lungs scream for air\./, replacement: "$1微弱地抽搐着发出呻吟声, 当$2的眼睛开始翻白时, $3的肺部呼吁空气." },
        { regex: /(.+) snaps back into (.+) senses at (.+)'s voice\./, replacement: "$1突然回到$2的意识中, 听到了$3的声音." },
        { regex: /(.+) (.+)manages to get (.+) (.+) past (.+)'s (.+)lips, forcing (.+) to swallow\./, replacement: "$1$2设法让$3$4经过$5的$6, 迫使$7吞咽." },
        { regex: /(.+) (.+) manages to get (.+) (.+) past (.+)'s (.+) lips, forcing (.+) to swallow it\./, replacement: "$1$2设法让$3$4经过$5的$6, 迫使$7吞咽它." },
        { regex: /(.+) (.+) successfully defends against (.+)'s (.+) attempt to force (.+) to drink (.+) (.+)\./, replacement: "$1$2成功抵御了$3的$4企图迫使$5喝下$6$7." },
        { regex: /(.+) leads (.+) and (.+) out of the room by (.+) ears\./, replacement: "$1带着$2和$3走出房间, 拉着$4的耳朵." },
        { regex: /(.+) roughly pulls (.+) and (.+) out of the room by (.+) arms\./, replacement: "$1粗暴地拉着$2和$3走出房间, 抓住$4的手臂." },
        { regex: /(.+) tugs (.+) and (.+) out of the room by (.+) tongues\./, replacement: "$1拽着$2和$3走出房间, 用$4的舌头." },
        { regex: /(.+) tries (.+) best to escape from (.+)'s grip\.\.\./, replacement: "$1竭尽全力从$3的控制中挣脱..." },
        { regex: /(.+)\'s eyes start to roll back with a groan as (.+) completely closes (.+) airway with (.+) hand\./, replacement: "$1的眼睛开始滚动, 发出呻吟声, 当$2用$4的手完全封闭$3的气道时." },

        // BCC
        // 强制舔腿
        { regex: /(.+) uses "Force lick legs" spell on (.+)/, replacement: "$1 对 $2 使用了 \"强制舔腿\" 法术" },
        { regex: /(.+) gets on his knees and starts licking (.+) legs/, replacement: "$1 跪下并开始舔 $2 的腿" },

        // 催眠入睡
        { regex: /(.+) uses \"Put to sleep\" spell on himself/, replacement: "$1 自己使用了 \"催眠入睡\" 法术" },
        { regex: /(.+) uses \"Put to sleep\" spell on (.+)/, replacement: "$1 对 $2 使用了 \"催眠入睡\" 法术" },
        { regex: /(.+) fell asleep, only hot kiss or hard spanking can wake his up/, replacement: "$1 睡着了，只有热烈的亲吻或严厉的打屁股才能唤醒他" },

        // 移除魔法效果
        { regex: /(.+) uses \"Remove enchantments\" spell on himself/, replacement: "$1 自己使用了 \"移除魔法\" 法术" },
        { regex: /(.+) uses \"Remove enchantments\" spell on (.+)/, replacement: "$1 对 $2 使用了 \"移除魔法\" 法术" },
        { regex: /All spell effects were removed from (.+)/, replacement: "所有法术效果从 $1 身上被移除了" },

        // 使其无助
        { regex: /(.+) uses \"Make helpless\" spell on himself/, replacement: "$1 自己使用了 \"使无助\" 法术" },
        { regex: /(.+) uses \"Make helpless\" spell on (.+)/, replacement: "$1 对 $2 使用了 \"使无助\" 法术" },
        { regex: /(.+) was enchanted, now he is totally helpless/, replacement: "$1 被施了魔法，现在他完全无助" },
        // 制造幻觉
        { regex: /(.+) uses \"Make hallucination\" spell on himself/, replacement: "$1 自己使用了 \"制造幻觉\" 法术" },
        { regex: /(.+) uses \"Make hallucination\" spell on (.+)/, replacement: "$1 对 $2 使用了 \"制造幻觉\" 法术" },
        { regex: /(.+) was subject to hallucinations/, replacement: "$1 开始产生幻觉" },

        // 使说猫语
        { regex: /(.+) uses \"Make cat speech\" spell on himself/, replacement: "$1 自己使用了 \"让猫语\" 法术" },
        { regex: /(.+) uses \"Make cat speech\" spell on (.+)/, replacement: "$1 对 $2 使用了 \"让猫语\" 法术" },
        { regex: /(.+) was forced to speak like a cat/, replacement: "$1 被迫像猫一样说话" },

        // 使说婴儿语
        { regex: /(.+) uses \"Make baby speech\" spell on himself/, replacement: "$1 自己使用了 \"让婴儿语\" 法术" },
        { regex: /(.+) uses \"Make baby speech\" spell on (.+)/, replacement: "$1 对 $2 使用了 \"让婴儿语\" 法术" },
        { regex: /(.+) was forced to speak like a baby/, replacement: "$1 被迫像婴儿一样说话" },

        // 使说小狗语
        { regex: /(.+) uses \"Make puppy speech\" spell on himself/, replacement: "$1 自己使用了 \"让小狗语\" 法术" },
        { regex: /(.+) uses \"Make puppy speech\" spell on (.+)/, replacement: "$1 对 $2 使用了 \"让小狗语\" 法术" },
        { regex: /(.+) was forced to speak like a puppy/, replacement: "$1 被迫像小狗一样说话" },

        // 使说牛语
        { regex: /(.+) uses \"Make cow speech\" spell on himself/, replacement: "$1 自己使用了 \"让牛语\" 法术" },
        { regex: /(.+) uses \"Make cow speech\" spell on (.+)/, replacement: "$1 对 $2 使用了 \"让牛语\" 法术" },
        { regex: /(.+) was forced to speak like a cow/, replacement: "$1 被迫像牛一样说话" },

        // 使目标感到情欲
        { regex: /(.+) uses \"Maky horny\" spell on himself/, replacement: "$1 自己使用了 \"亢奋\" 法术" },
        { regex: /(.+) uses \"Maky horny\" spell on (.+)/, replacement: "$1 对 $2 使用了 \"亢奋\" 法术" },
        { regex: /(.+) became very horny/, replacement: "$1 变得非常亢奋" },

        // 剥夺声音
        { regex: /(.+) uses \"Take away voice\" spell on himself/, replacement: "$1 自己使用了 \"剥夺声音\" 法术" },
        { regex: /(.+) uses \"Take away voice\" spell on (.+)/, replacement: "$1 对 $2 使用了 \"剥夺声音\" 法术" },
        { regex: /(.+) lost his voice/, replacement: "$1 失去了声音" },

        // 控制
        { regex: /(.+) uses \"Control\" spell on himself/, replacement: "$1 自己使用了 \"自我控制\" 法术" },
        { regex: /(.+) uses \"Control\" spell on (.+)/, replacement: "$1 对 $2 使用了 \"控制\" 法术" },
        { regex: /(.+) lost control of his body/, replacement: "$1 失去了对自己身体的控制" },

        // 翻转
        { regex: /(.+) uses \"Flip\" spell on himself/, replacement: "$1 自己使用了 \"翻转屏幕\" 法术" },
        { regex: /(.+) uses \"Flip\" spell on (.+)/, replacement: "$1 对 $2 使用了 \"翻转屏幕\" 法术" },
        { regex: /(.+)'s screen was flipped/, replacement: "$1 的屏幕被翻转了" },

        // 溶解衣物
        { regex: /(.+) uses \"Dissolve clothes\" spell on himself/, replacement: "$1 自己使用了 \"溶解衣物\" 法术" },
        { regex: /(.+) uses \"Dissolve clothes\" spell on (.+)/, replacement: "$1 对 $2 使用了 \"溶解衣物\" 法术" },
        { regex: /(.+)'s clothes were dissolved/, replacement: "$1 的衣物被溶解了" },

    ];






    笨蛋Luzi.hookFunction("ChatRoomMessage", 0, (args, next) => {

        let language = localStorage.getItem("BondageClubLanguage");
        if (language === "CN" || language === "TW") {
            const data = args[0];
            if (data.Content === 'Beep') {
                const filteredDictionary = data.Dictionary.filter(item => item.Tag === 'msg');
                const filteredObject = filteredDictionary[0];
                if (filteredObject) {
                    translations.forEach(({ regex, replacement }) => {
                        filteredObject.Text = filteredObject.Text.replace(regex, replacement);
                    });
                    if (filteredObject.Text.indexOf("herself") !== -1) {
                        filteredObject.Text = filteredObject.Text.replace(/herself/g, "她自己");
                    }
                    if (filteredObject.Text.indexOf("her") !== -1) {
                        filteredObject.Text = filteredObject.Text.replace(/her/g, "她");
                    }
                    if (filteredObject.Text.indexOf("she") !== -1) {
                        filteredObject.Text = filteredObject.Text.replace(/she/g, "她");
                    }
                    if (filteredObject.Text.indexOf("net") !== -1) {
                        filteredObject.Text = filteredObject.Text.replace(/net/g, "网");
                    }
                    // console.log(filteredObject.Text);
                }
                // console.log(data);
            }
        }

        next(args);
    });

    笨蛋Luzi.hookFunction("ChatRoomDrawCharacterStatusIcons", 6, (args, next) => {
        if (ChatRoomHideIconState == 0) {
            let C = args[0];
            let CharX = args[1];
            let CharY = args[2];
            let Zoom = args[3];
            if (C.ECHOBETA) {
                DrawImageResize("data:image/png;base64,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",
                    CharX + 420 * Zoom, CharY + 5, 35 * Zoom, 35 * Zoom);
            }
            if (C.ECHO) {
                DrawImageResize("data:image/png;base64,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",
                    CharX + 420 * Zoom, CharY + 5, 35 * Zoom, 35 * Zoom);
            }
            if (C.ECHO2) {
                DrawImageResize("data:image/png;base64,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",
                    CharX + 420 * Zoom, CharY + 5, 35 * Zoom, 35 * Zoom);
            }

        }
        next(args);
    });

    // ========================================================================
    // ========================================================================

})();


