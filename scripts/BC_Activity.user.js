// ==UserScript==
// @name         BC 动作拓展
// @namespace    https://www.bondageprojects.com/
// @version      0.2.0
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
    var bcModSdk = function () { "use strict"; const e = "1.1.0"; function o(e) { alert("Mod ERROR:\n" + e); const o = new Error(e); throw console.error(o), o } const t = new TextEncoder; function n(e) { return !!e && "object" == typeof e && !Array.isArray(e) } function r(e) { const o = new Set; return e.filter((e => !o.has(e) && o.add(e))) } const i = new Map, a = new Set; function d(e) { a.has(e) || (a.add(e), console.warn(e)) } function s(e) { const o = [], t = new Map, n = new Set; for (const r of p.values()) { const i = r.patching.get(e.name); if (i) { o.push(...i.hooks); for (const [o, a] of i.patches.entries()) t.has(o) && t.get(o) !== a && d(`ModSDK: Mod '${r.name}' is patching function ${e.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${o}\nPatch1:\n${t.get(o) || ""}\nPatch2:\n${a}`), t.set(o, a), n.add(r.name) } } o.sort(((e, o) => o.priority - e.priority)); const r = function (e, o) { if (0 === o.size) return e; let t = e.toString().replaceAll("\r\n", "\n"); for (const [n, r] of o.entries()) t.includes(n) || d(`ModSDK: Patching ${e.name}: Patch ${n} not applied`), t = t.replaceAll(n, r); return (0, eval)(`(${t})`) }(e.original, t); let i = function (o) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookChainExit) || void 0 === i ? void 0 : i.call(t, e.name, n), d = r.apply(this, o); return null == a || a(), d }; for (let t = o.length - 1; t >= 0; t--) { const n = o[t], r = i; i = function (o) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookEnter) || void 0 === i ? void 0 : i.call(t, e.name, n.mod), d = n.hook.apply(this, [o, e => { if (1 !== arguments.length || !Array.isArray(o)) throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof e}`); return r.call(this, e) }]); return null == a || a(), d } } return { hooks: o, patches: t, patchesSources: n, enter: i, final: r } } function c(e, o = !1) { let r = i.get(e); if (r) o && (r.precomputed = s(r)); else { let o = window; const a = e.split("."); for (let t = 0; t < a.length - 1; t++)if (o = o[a[t]], !n(o)) throw new Error(`ModSDK: Function ${e} to be patched not found; ${a.slice(0, t + 1).join(".")} is not object`); const d = o[a[a.length - 1]]; if ("function" != typeof d) throw new Error(`ModSDK: Function ${e} to be patched not found`); const c = function (e) { let o = -1; for (const n of t.encode(e)) { let e = 255 & (o ^ n); for (let o = 0; o < 8; o++)e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1; o = o >>> 8 ^ e } return ((-1 ^ o) >>> 0).toString(16).padStart(8, "0").toUpperCase() }(d.toString().replaceAll("\r\n", "\n")), l = { name: e, original: d, originalHash: c }; r = Object.assign(Object.assign({}, l), { precomputed: s(l), router: () => { }, context: o, contextProperty: a[a.length - 1] }), r.router = function (e) { return function (...o) { return e.precomputed.enter.apply(this, [o]) } }(r), i.set(e, r), o[r.contextProperty] = r.router } return r } function l() { const e = new Set; for (const o of p.values()) for (const t of o.patching.keys()) e.add(t); for (const o of i.keys()) e.add(o); for (const o of e) c(o, !0) } function f() { const e = new Map; for (const [o, t] of i) e.set(o, { name: o, original: t.original, originalHash: t.originalHash, sdkEntrypoint: t.router, currentEntrypoint: t.context[t.contextProperty], hookedByMods: r(t.precomputed.hooks.map((e => e.mod))), patchedByMods: Array.from(t.precomputed.patchesSources) }); return e } const p = new Map; function u(e) { p.get(e.name) !== e && o(`Failed to unload mod '${e.name}': Not registered`), p.delete(e.name), e.loaded = !1, l() } function g(e, t, r) { "string" == typeof e && "string" == typeof t && (alert(`Mod SDK warning: Mod '${e}' is registering in a deprecated way.\nIt will work for now, but please inform author to update.`), e = { name: e, fullName: e, version: t }, t = { allowReplace: !0 === r }), e && "object" == typeof e || o("Failed to register mod: Expected info object, got " + typeof e), "string" == typeof e.name && e.name || o("Failed to register mod: Expected name to be non-empty string, got " + typeof e.name); let i = `'${e.name}'`; "string" == typeof e.fullName && e.fullName || o(`Failed to register mod ${i}: Expected fullName to be non-empty string, got ${typeof e.fullName}`), i = `'${e.fullName} (${e.name})'`, "string" != typeof e.version && o(`Failed to register mod ${i}: Expected version to be string, got ${typeof e.version}`), e.repository || (e.repository = void 0), void 0 !== e.repository && "string" != typeof e.repository && o(`Failed to register mod ${i}: Expected repository to be undefined or string, got ${typeof e.version}`), null == t && (t = {}), t && "object" == typeof t || o(`Failed to register mod ${i}: Expected options to be undefined or object, got ${typeof t}`); const a = !0 === t.allowReplace, d = p.get(e.name); d && (d.allowReplace && a || o(`Refusing to load mod ${i}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`), u(d)); const s = e => { "string" == typeof e && e || o(`Mod ${i} failed to patch a function: Expected function name string, got ${typeof e}`); let t = g.patching.get(e); return t || (t = { hooks: [], patches: new Map }, g.patching.set(e, t)), t }, f = { unload: () => u(g), hookFunction: (e, t, n) => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); const r = s(e); "number" != typeof t && o(`Mod ${i} failed to hook function '${e}': Expected priority number, got ${typeof t}`), "function" != typeof n && o(`Mod ${i} failed to hook function '${e}': Expected hook function, got ${typeof n}`); const a = { mod: g.name, priority: t, hook: n }; return r.hooks.push(a), l(), () => { const e = r.hooks.indexOf(a); e >= 0 && (r.hooks.splice(e, 1), l()) } }, patchFunction: (e, t) => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); const r = s(e); n(t) || o(`Mod ${i} failed to patch function '${e}': Expected patches object, got ${typeof t}`); for (const [n, a] of Object.entries(t)) "string" == typeof a ? r.patches.set(n, a) : null === a ? r.patches.delete(n) : o(`Mod ${i} failed to patch function '${e}': Invalid format of patch '${n}'`); l() }, removePatches: e => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); s(e).patches.clear(), l() }, callOriginal: (e, t, n) => (g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`), "string" == typeof e && e || o(`Mod ${i} failed to call a function: Expected function name string, got ${typeof e}`), Array.isArray(t) || o(`Mod ${i} failed to call a function: Expected args array, got ${typeof t}`), function (e, o, t = window) { return c(e).original.apply(t, o) }(e, t, n)), getOriginalHash: e => ("string" == typeof e && e || o(`Mod ${i} failed to get hash: Expected function name string, got ${typeof e}`), c(e).originalHash) }, g = { name: e.name, fullName: e.fullName, version: e.version, repository: e.repository, allowReplace: a, api: f, loaded: !0, patching: new Map }; return p.set(e.name, g), Object.freeze(f) } function h() { const e = []; for (const o of p.values()) e.push({ name: o.name, fullName: o.fullName, version: o.version, repository: o.repository }); return e } let m; const y = function () { if (void 0 === window.bcModSdk) return window.bcModSdk = function () { const o = { version: e, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: f, errorReporterHooks: Object.seal({ hookEnter: null, hookChainExit: null }) }; return m = o, Object.freeze(o) }(); if (n(window.bcModSdk) || o("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && o(`Failed to init Mod SDK: Different version already loaded ('1.1.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== e && (alert(`Mod SDK warning: Loading different but compatible versions ('1.1.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk.version.startsWith("1.0.") && void 0 === window.bcModSdk._shim10register)) { const e = window.bcModSdk, o = Object.freeze(Object.assign(Object.assign({}, e), { registerMod: (o, t, n) => o && "object" == typeof o && "string" == typeof o.name && "string" == typeof o.version ? e.registerMod(o.name, o.version, "object" == typeof t && !!t && !0 === t.allowReplace) : e.registerMod(o, t, n), _shim10register: !0 })); window.bcModSdk = o } return window.bcModSdk }(); return "undefined" != typeof exports && (Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = y), y }();

    const MOD_NAME = "动作拓展";
    const MOD_FULL_NAME = "动作拓展";
    const MOD_VERSION = "0.2.0";


    const mod = bcModSdk.registerMod({
        name: MOD_NAME,
        fullName: MOD_FULL_NAME,
        version: MOD_VERSION
    });


    //============================================================
    //============================================================
    mod.hookFunction("ServerSend", 5, (args, next) => { // ServerSend 只能检测自己发出的聊天信息 可以用来替换自己发出去的文字
        if (args[0] == "ChatRoomChat" && args[1]?.Type == "Activity") {
            let data = args[1];
            let actName = data.Dictionary[3]?.ActivityName ?? "";
            if (actName.indexOf("Act_") == 0) { // 这个条件表示只有当消息中包含以 "Act_" 开头的自定义活动时,才会执行下面的操作
                // 拦截自定义活动的发送并执行自定义操作
                let { metadata, substitutions } = ChatRoomMessageRunExtractors(data, Player)
                let msg = ActivityDictionaryText(data.Content);
                msg = CommonStringSubstitute(msg, substitutions ?? [])
                data.Dictionary.push({
                    Tag: "MISSING ACTIVITY DESCRIPTION FOR KEYWORD " + data.Content,
                    Text: msg
                });
            }
        }
        return next(args);
    });

    //============================================================
    //============================================================
    /**
     * 创建活动对象的函数
     * @param {string} name - 活动的名称
     * @param {string} target - 活动的目标
     * @param {string} targetSelf - 活动的自身目标
     * @param {number} maxProgress - 活动的最大进度
     * @param {number} maxProgressSelf - 活动自身的最大进度
     * @param {Array} activityExpression - 活动表达式,包含一系列的动作
     * @returns {object} - 包含创建的活动信息的对象
     */
    function createActivity(name, target, targetSelf, maxProgress, maxProgressSelf, prerequisite, activityExpression) {
        const activity = {
            Name: `Act_${name}`,
            Target: [target],
            TargetSelf: [targetSelf],
            MaxProgress: maxProgress,
            MaxProgressSelf: maxProgressSelf,
            Prerequisite: prerequisite,
            ActivityExpression: activityExpression,
        };
        ActivityFemale3DCG.push(activity);
        ActivityFemale3DCGOrdering.push(activity.Name);
    }

    /**
     * 活动添加文字描述
     * @param {string} name - 活动的名称
     * @param {string} target - 对别人的描述
     * @param {string} targetSelf - 对自己的描述
     * @returns {Array} - 包含添加的值的数组
     */
    function ActivityDictionaryadd(name, target, targetSelf) {
        const addedValues = [];
        // 使用 filter 函数来检查 Name 属性中是否包含指定名称
        const actActivityFemale3DCG = ActivityFemale3DCG.filter(activity => activity.Name.includes(name));
        if (actActivityFemale3DCG.length > 0) {
            const actName = actActivityFemale3DCG[0].Name;
            const actNameWithoutPrefix = actName.substring(4);
            const actTarget = actActivityFemale3DCG[0].Target;
            const actTargetSelf = actActivityFemale3DCG[0].TargetSelf;

            addedValues.push([`ActivityAct_${actNameWithoutPrefix}`, `${actNameWithoutPrefix}`]);
            if (actTarget.length > 0) {
                addedValues.push([`Label-ChatOther-${actTarget}-${actName}`, `${actNameWithoutPrefix}`]);
                addedValues.push([`ChatOther-${actTarget}-${actName}`, target]);
            }
            if (actTargetSelf.length > 0) {
                addedValues.push([`Label-ChatSelf-${actTargetSelf}-${actName}`, `${actNameWithoutPrefix}`]);
                addedValues.push([`ChatSelf-${actTargetSelf}-${actName}`, targetSelf]);
            }
        }
        // 返回添加的值的数组
        return addedValues;
    }

    // name target targetSelf
    var activityAdd = {
        // 头
        Act_歪头: { A: createActivity("歪头", "", "ItemNeck", 50, 50, [], []), B: ActivityDictionaryadd("Act_歪头", "", "SourceCharacter歪头.") },
        Act_环顾四周: { A: createActivity("环顾四周", "", "ItemNeck", 50, 50, [], []), B: ActivityDictionaryadd("Act_环顾四周", "", "SourceCharacter环视周围.") },
        Act_上下打量: { A: createActivity("上下打量", "ItemHead", "", 50, 50, [], []), B: ActivityDictionaryadd("Act_上下打量", "SourceCharacter仔细打量TargetCharacter", "") },
        Act_闭上眼睛: { A: createActivity("闭上眼睛", "", "ItemHead", 50, 50, [], []), B: ActivityDictionaryadd("Act_闭上眼睛", "", "SourceCharacter闭上了眼睛.") },
        Act_眼睛呆滞: { A: createActivity("眼睛呆滞", "", "ItemHead", 50, 50, [], []), B: ActivityDictionaryadd("Act_眼睛呆滞", "", "SourceCharacter眼睛呆滞地看着前方.") },
        Act_眼睛湿润: { A: createActivity("眼睛湿润", "", "ItemHead", 50, 50, [], []), B: ActivityDictionaryadd("Act_眼睛湿润", "", "SourceCharacter眼角泛着泪光.") },
        Act_流眼泪: { A: createActivity("流眼泪", "", "ItemHead", 50, 50, [], []), B: ActivityDictionaryadd("Act_流眼泪", "", "SourceCharacter眼泪从眼角流下.") },
        //  吞咽
        Act_张开嘴: { A: createActivity("张开嘴", "", "ItemMouth", 50, 50, [], []), B: ActivityDictionaryadd("Act_张开嘴", "", "SourceCharacter张开了嘴") },
        Act_吞咽口水: { A: createActivity("吞咽口水", "", "ItemNeck", 50, 50, [], []), B: ActivityDictionaryadd("Act_吞咽口水", "", "SourceCharacter吞咽嘴里的口水") },
        Act_流口水: { A: createActivity("流口水", "", "ItemMouth", 50, 50, [], []), B: ActivityDictionaryadd("Act_流口水", "", "SourceCharacter的口水顺着嘴角流下") },
        //声音
        Act_轻声喘息: { A: createActivity("轻声喘息", "", "ItemMouth", 50, 50, [], ["Talk"]), B: ActivityDictionaryadd("Act_轻声喘息", "", "SourceCharacter发出轻声地喘息.") },
        Act_打哈欠: { A: createActivity("打哈欠", "", "ItemMouth", 50, 50, ["UseMouth"], []), B: ActivityDictionaryadd("Act_打哈欠", "", "SourceCharacter张嘴打哈欠.") },
        //舔吸
        Act_舔手: { A: createActivity("舔手", "ItemHands", "ItemHands", 50, 50, ["UseMouth"], []), B: ActivityDictionaryadd("Act_舔手", "SourceCharacter舔TargetCharacter的手.", "SourceCharacter舔PronounPossessive自己的手.") },
        Act_舔手指: { A: createActivity("舔手指", "ItemHands", "ItemHands", 50, 50, ["UseMouth"], []), B: ActivityDictionaryadd("Act_舔手指", "SourceCharacter舔TargetCharacter的手指.", "SourceCharacter舔PronounPossessive自己的手指.") },
        Act_舔脚: { A: createActivity("舔脚", "ItemBoots", "ItemBoots", 50, 50, ["UseTougue"], []), B: ActivityDictionaryadd("Act_舔脚", "SourceCharacter舔TargetCharacter的脚.", "SourceCharacter舔PronounPossessive自己的脚.") },
        Act_舔脸: { A: createActivity("舔脸", "ItemMouth", "", 50, 50, ["UseMouth"], []), B: ActivityDictionaryadd("Act_舔脸", "SourceCharacter舔TargetCharacter的脸.", "") },
        Act_吮吸手指: { A: createActivity("吮吸手指", "ItemHands", "ItemHands", 50, 50, ["UseMouth"], []), B: ActivityDictionaryadd("Act_吮吸手指", "SourceCharacter吮吸TargetCharacter的手指.", "SourceCharacter吮吸PronounPossessive的手指.") },
        Act_嗅: { A: createActivity("嗅", "ItemHands", "ItemHands", 50, 50, [], []), B: ActivityDictionaryadd("Act_嗅", "SourceCharacter用鼻子嗅了嗅TargetCharacter的手.", "SourceCharacter用鼻子嗅了嗅自己的手.") },
        //姿势
        Act_跪下: { A: createActivity("跪下", "", "ItemLegs", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_跪下", "", "SourceCharacter轻轻地跪了下来.") },
        Act_站起来: { A: createActivity("站起来", "", "ItemLegs", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_站起来", "", "SourceCharacter手扶着地站了起来.") },
        Act_跪着张开双腿: { A: createActivity("跪着张开双腿", "", "ItemLegs", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_跪着张开双腿", "", "SourceCharacter张开了PronounPossessive的腿.") },
        Act_跪着合并双腿: { A: createActivity("跪着合并双腿", "", "ItemLegs", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_跪着合并双腿", "", "SourceCharacter并拢了PronounPossessive的腿.") },
        Act_手放身后: { A: createActivity("手放身后", "", "ItemArms", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_手放身后", "", "SourceCharacter把PronounPossessive的手放在了身后.") },
        Act_手放身前: { A: createActivity("手放身前", "", "ItemArms", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_手放身前", "", "SourceCharacter把PronounPossessive的手放在了身前.") },
        Act_趴下: { A: createActivity("趴下", "", "ItemBoots", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_趴下", "", "SourceCharacter手放身后趴在地上.") },
        Act_四肢着地: { A: createActivity("四肢着地", "", "ItemBoots", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_四肢着地", "", "SourceCharacter四肢着地趴在地上.") },
        Act_起身跪下: { A: createActivity("起身跪下", "", "ItemBoots", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_起身跪下", "", "SourceCharacter起身跪下.") },
        Act_爬到脚边: { A: createActivity("爬到脚边", "ItemBoots", "", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_爬到脚边", "SourceCharacter爬到TargetCharacter的脚边.", "") },
        Act_蹭大腿: { A: createActivity("蹭大腿", "ItemLegs", "", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_蹭大腿", "SourceCharacter用头轻轻蹭TargetCharacter的大腿.", "") },
        Act_蹭小腿: { A: createActivity("蹭小腿", "ItemFeet", "", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_蹭小腿", "SourceCharacter用头轻轻蹭TargetCharacter的小腿.", "") },
        //脚
        Act_踮起双脚: { A: createActivity("踮起双脚", "", "ItemBoots", 50, 50, ["UseFeet"], []), B: ActivityDictionaryadd("Act_踮起双脚", "", "SourceCharacter踮起PronounPossessive的双脚.") },
        Act_摇晃脚踝: { A: createActivity("摇晃脚踝", "", "ItemBoots", 50, 50, [], []), B: ActivityDictionaryadd("Act_摇晃脚踝", "", "SourceCharacter摇晃PronounPossessive的脚踝.") },
        Act_伸出脚: { A: createActivity("伸出脚", "", "ItemBoots", 50, 50, ["UseFeet"], []), B: ActivityDictionaryadd("Act_伸出脚", "", "SourceCharacter伸出PronounPossessive的脚.") },
        Act_掰开双腿: { A: createActivity("掰开双腿", "ItemLegs", "", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_掰开双腿", "SourceCharacter掰开TargetCharacter的双腿", "") },
        Act_脚托起下巴: { A: createActivity("脚托起下巴", "ItemMouth", "", 50, 50, ["HasKneel"], []), B: ActivityDictionaryadd("Act_脚托起下巴", "SourceCharacter用脚托起TargetCharacter的下巴.", "") },
        //手
        Act_戳脸: { A: createActivity("戳脸", "ItemMouth", "ItemMouth", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_戳脸", "SourceCharacter戳了戳TargetCharacter的脸.", "SourceCharacter戳了戳自己的脸") },
        Act_捏脸: { A: createActivity("捏脸", "ItemMouth", "ItemMouth", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_捏脸", "SourceCharacter捏了捏TargetCharacter的脸.", "SourceCharacter捏了捏自己的脸.") },
        Act_戳手臂: { A: createActivity("戳手臂", "ItemArms", "ItemArms", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_戳手臂", "SourceCharacter戳了戳TargetCharacter的手臂.", "SourceCharacter戳了戳自己的手臂.") },
        Act_揉脸: { A: createActivity("揉脸", "ItemMouth", "ItemMouth", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_揉脸", "SourceCharacter揉了揉TargetCharacter的脸.", "SourceCharacter揉了揉自己的脸.") },
        Act_摇晃手臂: { A: createActivity("摇晃手臂", "ItemArms", "ItemArms", 50, 50, ["UseHands"], []), B: ActivityDictionaryadd("Act_摇晃手臂", "SourceCharacter摇晃TargetCharacter的手臂.", "SourceCharacter摇晃自己的手臂.") },
        Act_轻推: { A: createActivity("轻推", ["ItemTorso"], "", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_轻推", "SourceCharacter用手轻推TargetCharacter的身体.", "") },
        Act_托起脚: { A: createActivity("托起脚", "ItemBoots", "", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_托起脚", "SourceCharacter托起TargetCharacter的脚.", "") },
        Act_扭动手腕: { A: createActivity("扭动手腕", "", "ItemHands", 50, 50, [], []), B: ActivityDictionaryadd("Act_扭动手腕", "", "SourceCharacter扭动PronounPossessive的手腕.") },
        Act_挠头: { A: createActivity("挠头", "", "ItemHead", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_挠头", "", "SourceCharacter用手挠了挠PronounPossessive的头.") },
        Act_捂住耳朵: { A: createActivity("捂住耳朵", "ItemEars", "ItemEars", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_捂住耳朵", "SourceCharacter用手盖住了TargetCharacter的耳朵.", "SourceCharacter用手盖住了自己的耳朵.") },
        Act_捂住眼睛: { A: createActivity("捂住眼睛", "ItemHead", "ItemHead", 50, 50, ["UseArms", "UseHands"], []), B: ActivityDictionaryadd("Act_捂住眼睛", "SourceCharacter捂住TargetCharacter的眼睛.", "SourceCharacter捂住自己的眼睛.") },
        Act_捂住头: { A: createActivity("捂住头", "ItemHead", "ItemHead", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_捂住头", "SourceCharacter捂住TargetCharacter的头.", "SourceCharacter捂住自己的头.") },
        Act_捂住下体: { A: createActivity("捂住下体", "ItemVulva", "ItemVulva", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_捂住下体", "SourceCharacter捂住TargetCharacter的下体.", "SourceCharacter捂住自己的下体.") },
        Act_掀开裙子: { A: createActivity("掀开裙子", "ItemButt", "ItemButt", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_掀开裙子", "SourceCharacter掀开TargetCharacter的裙子.", "SourceCharacter掀开PronounPossessive的裙子.") },
        Act_挥手: { A: createActivity("挥手", "Itemhands", "", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_挥手", "", "SourceCharacter向TargetCharacter挥手.") },
        Act_伸出手: { A: createActivity("伸出手", "", "ItemHands", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_伸出手", "", "SourceCharacter伸出自己的手.") }, Act_拉扯衣角: { A: createActivity("拉扯衣角", "ItemPelvis", "", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_拉扯衣角", "SourceCharacter用手拉扯TargetCharacter的衣角.", "") },
        Act_捂住胸: { A: createActivity("捂住胸", "", "ItemBreast", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_捂住胸", "", "SourceCharacter捂住自己的胸.") },
        Act_手托起下巴: { A: createActivity("手托起下巴", "ItemMouth", "", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_手托起下巴", "SourceCharacter用手托起TargetCharacter的下巴.", "") },
        Act_拽链子: { A: createActivity("拽链子", "ItemNeck", "", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_拽链子", "SourceCharacter拽TargetCharacter的链子.", "") },
        Act_弹额头: { A: createActivity("弹额头", "ItemHead", "", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_弹额头", "SourceCharacter弹了一下TargetCharacter的额头.", "") },
        Act_弹阴蒂: { A: createActivity("弹阴蒂", "ItemVulvaPiercings", "", 50, 50, ["UseHands", "UseArms"], []), B: ActivityDictionaryadd("Act_弹阴蒂", "SourceCharacter弹了一下TargetCharacter的阴蒂.", "") },
        Act_抱腿: { A: createActivity("抱腿", "ItemLegs", "", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_抱腿", "SourceCharacter抱住TargetCharacter的腿.", "") },
        //尾巴
        Act_摇晃尾巴: { A: createActivity("摇晃尾巴", "", "ItemButt", 50, 50, ["HasTail"], []), B: ActivityDictionaryadd("Act_摇晃尾巴", "", "SourceCharacter摇晃PronounPossessive的尾巴.") },
        Act_竖起尾巴: { A: createActivity("竖起尾巴", "", "ItemButt", 50, 50, ["HasTailCat"], []), B: ActivityDictionaryadd("Act_竖起尾巴", "", "SourceCharacter的尾巴竖了起来.") },
        Act_炸毛: { A: createActivity("炸毛", "", "ItemButt", 50, 50, ["HasTailCat"], []), B: ActivityDictionaryadd("Act_炸毛", "", "SourceCharacter弓起后背,身体的毛发立了起来,发出嘶的声音.") },
        Act_舔尾巴: { A: createActivity("舔尾巴", "ItemButt", "ItemButt", 50, 50, ["HasTailCat"], []), B: ActivityDictionaryadd("Act_舔尾巴", "SourceCharacter舔TargetCharacter的尾巴.", "SourceCharacter舔自己的尾巴.") },
        Act_轻抚尾巴: { A: createActivity("轻抚尾巴", "ItemButt", "ItemButt", 50, 50, ["HasTail"], []), B: ActivityDictionaryadd("Act_轻抚尾巴", "SourceCharacter轻抚TargetCharacter的尾巴.", "SourceCharacter轻抚PronounPossessive的尾巴.") },
        Act_尾巴叼在嘴里: { A: createActivity("尾巴叼在嘴里", "ItemButt", "ItemButt", 50, 50, ["HasTailCat"], []), B: ActivityDictionaryadd("Act_尾巴叼在嘴里", "SourceCharacter叼起TargetCharacter的尾巴.", "SourceCharacter把自己的尾巴叼在嘴里.") },
        // 屁股
        Act_抬起屁股: { A: createActivity("抬起屁股", "", "ItemButt", 50, 50, [], []), B: ActivityDictionaryadd("Act_抬起屁股", "", "SourceCharacter弯腰抬起PronounPossessive的屁股.") },
        // 有翅膀
        Act_扇动翅膀: { A: createActivity("扇动翅膀", "", "ItemArms", 50, 50, ["HasWings"], []), B: ActivityDictionaryadd("Act_扇动翅膀", "", "SourceCharacter扇动PronounPossessive的翅膀.") },
        //身体
        Act_躲到身后: { A: createActivity("躲到身后", "ItemTorso", "", 50, 50, [], []), B: ActivityDictionaryadd("Act_躲到身后", "SourceCharacter躲到TargetCharacter的身后.", "") },
        Act_移动到身后: { A: createActivity("移动到身后", "ItemTorso", "", 50, 50, [], []), B: ActivityDictionaryadd("Act_移动到身后", "SourceCharacter移动到TargetCharacter的身后.", "") },
        Act_下巴搭在肩膀上: { A: createActivity("下巴搭在肩膀上", "ItemNeck", "", 50, 50, [], []), B: ActivityDictionaryadd("Act_下巴搭在肩膀上", "SourceCharacter把下巴搭在TargetCharacter的肩膀上.", "") },
        Act_手臂搭在肩膀上: { A: createActivity("手臂搭在肩膀上", "ItemNeck", "", 50, 50, ["UseArms"], []), B: ActivityDictionaryadd("Act_手臂搭在肩膀上", "SourceCharacter把手臂搭在TargetCharacter的肩膀上.", "") },
        Act_搂腰: { A: createActivity("搂腰", "ItemTorso", "", 50, 50, ["UseArms", "UseHands"], []), B: ActivityDictionaryadd("Act_搂腰", "SourceCharacter搂住TargetCharacter的腰.", "") },
        Act_叉腰: { A: createActivity("叉腰", "", "ItemTorso", 50, 50, ["UseArms", "UseHands"], []), B: ActivityDictionaryadd("Act_叉腰", "", "SourceCharacter双手叉腰.") },

        Act_身体颤抖: { A: createActivity("身体颤抖", "", "ItemTorso", 50, 50, [], []), B: ActivityDictionaryadd("Act_身体颤抖", "", "SourceCharacter身体在颤抖.") },
        Act_身体抽搐: { A: createActivity("身体抽搐", "", "ItemTorso", 50, 50, [], []), B: ActivityDictionaryadd("Act_身体抽搐", "", "SourceCharacter身体在抽搐.") },
        // 胸部
        Act_托起乳房: { A: createActivity("托起乳房", "ItemBreast", "ItemBreast", 50, 50, [], []), B: ActivityDictionaryadd("Act_托起乳房", "SourceCharacter托起TargetCharacter的双乳.", "SourceCharacter托起PronounPossessive的双乳.") },
        Act_揉搓乳头: { A: createActivity("揉搓乳头", "ItemNipples", "ItemMipples", 50, 50, ["UseHands", "UseArms", "ZoneNaked"], []), B: ActivityDictionaryadd("Act_揉搓乳头", "SourceCharacter用手捏住TargetCharacter的乳头,开始揉搓.", "SourceCharacter用手捏住PronounPossessive的乳头,开始揉搓.") },
        // 下体有道具
        Act_双腿颤抖: { A: createActivity("双腿颤抖", "", "ItemLegs", 50, 50, [], []), B: ActivityDictionaryadd("Act_双腿颤抖", "", "SourceCharacter的双腿颤抖着.") },
        Act_摇晃双腿: { A: createActivity("摇晃双腿", "", "ItemLegs", 50, 50, [], []), B: ActivityDictionaryadd("Act_摇晃双腿", "", "SourceCharacter摇晃自己的双腿.") },
        Act_流出液体: { A: createActivity("流出液体", "", "ItemVulva", 50, 50, [], []), B: ActivityDictionaryadd("Act_流出液体", "", "有液体顺着SourceCharacter的大腿流下.") },
        Act_失禁: { A: createActivity("失禁", "", "ItemVulva", 50, 50, [], []), B: ActivityDictionaryadd("Act_失禁", "", "SourceCharacter的尿液顺着PronounPossessive大腿流下.") },
        Act_夹紧双腿: { A: createActivity("夹紧双腿", "", "ItemLegs", 50, 50, [], []), B: ActivityDictionaryadd("Act_夹紧双腿", "", "SourceCharacter夹紧TargetCharacter的双腿.") },

        Act_撇眼: { A: createActivity("撇眼", "ItemHead", "", 50, 50, [], []), B: ActivityDictionaryadd("Act_撇眼", "SourceCharacter撇了TargetCharacter一眼.", "") },
        Act_跺脚: { A: createActivity("跺脚", "", "ItemBoots", 50, 50, [], []), B: ActivityDictionaryadd("Act_跺脚", "", "SourceCharacter不停地跺脚.") },
        Act_撩头发: { A: createActivity("撩头发", "", "ItemHood", 50, 50, [], []), B: ActivityDictionaryadd("Act_撩头发", "", "SourceCharacter撩起头发挂在耳边.") },

        // 阴部手
        Act_手指插进阴道: { A: createActivity("手指插进阴道", "ItemVulva", "ItemVulva", 50, 50, ["UseHands", "ZoneNaked", "TargetZoneNaked"], []), B: ActivityDictionaryadd("Act_手指插进阴道", "SourceCharacter手指插进TargetCharacter的阴道内.", "SourceCharacter手指插进自己的的阴道内.") },
        Act_拔出自己的手指: { A: createActivity("拔出自己的手指", "ItemVulva", "ItemVulva", 50, 50, [], []), B: ActivityDictionaryadd("Act_拔出自己的手指", "SourceCharacter从TargetCharacter的阴道内拔出自己的手指,手指连着PronounPossessive的爱液.", "SourceCharacter从PronounPossessive的阴道内拔出自己的手指,手指连着自己的爱液.") },
        Act_蠕动手指: { A: createActivity("蠕动手指", "ItemVulva", "ItemVulva", 50, 50, ["UseHands", "ZoneNaked", "TargetZoneNaked"], []), B: ActivityDictionaryadd("Act_蠕动手指", "SourceCharacter在TargetCharacter的阴道内蠕动手指.", "SourceCharacter在PronounPossessive的阴道内蠕动手指.") },
        Act_快速抽插: { A: createActivity("快速抽插", "ItemVulva", "ItemVulva", 50, 50, ["UseHands", "ZoneNaked", "TargetZoneNaked"], []), B: ActivityDictionaryadd("Act_快速抽插", "SourceCharacter的手在TargetCharacter的阴道内快速抽插,开始揉搓.", "SourceCharacter的手在PronounPossessive的阴道内快速抽插,开始揉搓.") },

        Act_钩住阴蒂环: { A: createActivity("钩住阴蒂环", "ItemVulvaPiercings", "ItemVulvaPiercings", 50, 50, ["UseHands", "HasItemVulvaPiercings"], []), B: ActivityDictionaryadd("Act_钩住阴蒂环", "SourceCharacter钩住TargetCharacter的阴蒂环.", "SourceCharacter钩住自己的阴蒂环.") }, Act_拉扯阴蒂环: { A: createActivity("拉扯阴蒂环", "ItemVulvaPiercings", "ItemVUlvaPiercings", 50, 50, ["UseHands"], []), B: ActivityDictionaryadd("Act_拉扯阴蒂环", "SourceCharacter拉了一下TargetCharacter的阴蒂环又松开了.", "SourceCharacter拉了一下自己的阴蒂环又松开了.") },
        Act_拉扯阴蒂环: { A: createActivity("拉扯阴蒂环", "ItemVulvaPiercings", "ItemVUlvaPiercings", 50, 50, ["UseHands", "HasItemVulvaPiercings"], []), B: ActivityDictionaryadd("Act_拉扯阴蒂环", "SourceCharacter拉了一下TargetCharacter的阴蒂环又松开了.", "SourceCharacter拉了一下自己的阴蒂环又松开了.") },
        //宠物服
        Act_宠物服爬到脚边: { A: createActivity("宠物服爬到脚边", "ItemBoots", "", 50, 50, ["HasPet"], []), B: ActivityDictionaryadd("Act_宠物服爬到脚边", "SourceCharacter爬到TargetCharacter脚边.", "") },
        Act_宠物服蹭腿: { A: createActivity("宠物服蹭腿", ["ItemLegs", "ItemFeet"], "", 50, 50, ["HasPet"], []), B: ActivityDictionaryadd("Act_宠物服蹭腿", "SourceCharacter蹭TargetCharacter的腿.", "") },
        Act_宠物服趴下: { A: createActivity("宠物服趴下", "", "ItemLegs", 50, 50, ["HasPet"], []), B: ActivityDictionaryadd("Act_宠物服趴下", "", "SourceCharacter四肢着地趴在地上.") },
        Act_宠物服跪立: { A: createActivity("宠物服跪立", "", "ItemLegs", 50, 50, ["HasPet"], []), B: ActivityDictionaryadd("Act_宠物服跪立", "", "SourceCharacter手臂离地跪立.") },
        Act_宠物服扑: { A: createActivity("宠物服扑", "ItemArms", "", 50, 50, ["HasPet"], []), B: ActivityDictionaryadd("Act_宠物服扑", "SourceCharacter扑到TargetCharacter身上.", "") },

        // 有猫爪
        Act_猫爪挠手: { A: createActivity("猫爪挠手", "ItemHands", "", 50, 50, ["HasPawMittens"], []), B: ActivityDictionaryadd("Act_猫爪挠手", "SourceCharacter用爪子挠了一下TargetCharacter的手.", "") },
        Act_猫爪挠手臂: { A: createActivity("猫爪挠手臂", "ItemArms", "", 50, 50, ["HasPawMittens"], []), B: ActivityDictionaryadd("Act_猫爪挠手臂", "SourceCharacter用爪子挠了一下TargetCharacter的手臂.", "") },
        Act_猫爪舔手: { A: createActivity("猫爪舔手", "", "ItemHands", 50, 50, ["HasPawMittens"], []), B: ActivityDictionaryadd("Act_猫爪舔手", "", "SourceCharacter舔自己的爪子.") },
        Act_猫爪戳脸: { A: createActivity("猫爪戳脸", "ItemMouth", "ItemMouth", 50, 50, ["HasPawMittens"], []), B: ActivityDictionaryadd("Act_猫爪戳脸", "SourceCharacter用爪子戳了戳TargetCharacter的脸.", "SourceCharacter用爪子戳了戳自己的脸.") },
        Act_猫爪戳鼻子: { A: createActivity("猫爪戳鼻子", "ItemNose", "ItemNose", 50, 50, ["HasPawMittens"], []), B: ActivityDictionaryadd("Act_猫爪戳鼻子", "SourceCharacter用爪子戳了戳TargetCharacter的鼻子.", "SourceCharacter用爪子戳了戳自己的鼻子.") },
        Act_猫爪揉脸: { A: createActivity("猫爪揉脸", "ItemMouth", "ItemMouth", 50, 50, ["HasPawMittens"], []), B: ActivityDictionaryadd("Act_猫爪揉脸", "SourceCharacter用爪子揉了揉TargetCharacter的脸.", "SourceCharacter用爪子揉了揉自己的脸.") },
        Act_猫爪揉鼻子: { A: createActivity("猫爪揉鼻子", "ItemNose", "ItemNose", 50, 50, ["HasPawMittens"], []), B: ActivityDictionaryadd("Act_猫爪揉鼻子", "SourceCharacter用爪子揉了揉TargetCharacter的鼻子.", "SourceCharacter用爪子揉了揉自己的鼻子.") },

        // 有笼子
        Act_撞笼子: { A: createActivity("撞笼子", "", "ItemDevices", 50, 50, ["HasKennel"], []), B: ActivityDictionaryadd("Act_撞笼子", "", "SourceCharacter用身体撞击笼子.") },
        Act_咬笼子: { A: createActivity("咬笼子", "", "ItemDevices", 50, 50, ["HasKennel"], []), B: ActivityDictionaryadd("Act_咬笼子", "", "SourceCharacter用牙齿咬笼子.") },
        Act_摇晃笼子: { A: createActivity("摇晃笼子", "", "ItemDevices", 50, 50, ["HasKennel"], []), B: ActivityDictionaryadd("Act_摇晃笼子", "", "SourceCharacter摇晃笼子的门.") },

        Act_泡沫剑架在脖子上: { A: createActivity("泡沫剑架在脖子上", "ItemNeck", "ItemNeck", 50, 50, ["UseHands", "UseArms", "HasSword"], []), B: ActivityDictionaryadd("Act_泡沫剑架在脖子上", "SourceCharacter把泡沫剑架在TargetCharacter的脖子上.", "SourceCharacter把泡沫剑架在自己的脖子上.") },
        Act_泡沫剑拍脸: { A: createActivity("泡沫剑拍脸", "ItemMouth", "", 50, 50, ["UseHands", "UseArms", "HasSword"], []), B: ActivityDictionaryadd("Act_泡沫剑拍脸", "SourceCharacter用泡沫剑轻轻拍了拍一下TargetCharacter的脸.", "") },

        Act_剪刀剪掉上衣: { A: createActivity("剪刀剪掉上衣", "ItemTorso", "ItemTorso", 50, 50, ["UseHands", "UseArms", "HasScissors"], []), B: ActivityDictionaryadd("Act_剪刀剪掉上衣", "SourceCharacter用剪刀剪掉了TargetCharacter的上衣.", "SourceCharacter用剪刀剪掉了自己的上衣.") },
        Act_剪刀剪掉下衣: { A: createActivity("剪刀剪掉下衣", "ItemPelvis", "ItemPelvis", 50, 50, ["UseHands", "UseArms", "HasScissors"], []), B: ActivityDictionaryadd("Act_剪刀剪掉下衣", "SourceCharacter用剪刀剪掉了TargetCharacter的下衣.", "SourceCharacter用剪刀剪掉了自己的下衣.") },
        // Act_剪刀剪掉绳子: { A: createActivity("剪刀剪掉绳子", "ItemMouth", "", 50, 50, ["UseHands", "UseArms", "HasScissors"], []), B: ActivityDictionaryadd("Act_剪刀剪掉绳子", "SourceCharacter用泡沫剑轻轻拍了拍一下TargetCharacter的脸", "") },
        Act_剪刀剪掉胸罩: { A: createActivity("剪刀剪掉胸罩", "ItemBreast", "ItemBreast", 50, 50, ["UseHands", "UseArms", "HasScissors"], []), B: ActivityDictionaryadd("Act_剪刀剪掉胸罩", "SourceCharacter用剪刀剪掉了TargetCharacter的胸罩.", "SourceCharacter用剪刀剪掉了自己的胸罩.") },
        Act_剪刀剪掉内裤: { A: createActivity("剪刀剪掉内裤", "ItemVulvaPiercings", "ItemVulvaPiercings", 50, 50, ["UseHands", "UseArms", "HasScissors"], []), B: ActivityDictionaryadd("Act_剪刀剪掉内裤", "SourceCharacter用剪刀剪掉了TargetCharacter的内裤.", "SourceCharacter用剪刀剪掉了自己的内裤.") },
        Act_剪刀剪掉袜子: { A: createActivity("剪刀剪掉袜子", "ItemBoots", "ItemBoots", 50, 50, ["UseHands", "UseArms", "HasScissors"], []), B: ActivityDictionaryadd("Act_剪刀剪掉袜子", "SourceCharacter用剪刀剪掉了TargetCharacter的袜子.", "SourceCharacter用剪刀剪掉了自己的袜子.") },

        Act_骑上去: { A: createActivity("骑上去", "ItemTorso", "", 50, 50, [], []), B: ActivityDictionaryadd("Act_骑上去", "SourceCharacter骑在TargetCharacter的背上.", "") },
    };

    //============================================================
    //============================================================
    const CustomPrerequisiteFuncs = new Map(Object.entries({
        // 单向 仅自己
        "HasTail": (acting, acted, group) => !!InventoryGet(acted, "TailStraps"), // 有尾巴
        "HasWings": (acting, acted, group) => !!InventoryGet(acted, "Wings"), // 有翅膀
        "HasLeash": (acting, acted, group) => !!ChatRoomCanBeLeashed(acted), // 有拴绳
        "HasTailCat": (acting, acted, group) => // 有猫尾巴
            !!InventoryIsItemInList(acted, "TailStraps", "TailStrap") ||
            !!InventoryIsItemInList(acted, "TailStraps", "KittenTailStrap1"),

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


        "Hassaddle": (acting, acted, group) => // 鞍
            !!InventoryIsItemInList(acting, "ItemTorso", "Luzi_缰绳"),

    }));

    mod.hookFunction("ActivityCheckPrerequisite", 500, (args, next) => {
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

    //============================================================
    //============================================================
    /**
     * 从玩家身上移除指定活动的道具组函数
     * @param {object} data - 活动消息的数据对象
     * @param {string} groupName - 身体部位名称
     * @param {string} assetName - 活动名称
     * @param {string} removalGroup - 要移除的道具组名称
     */
    function removeActivityItems(data, groupName, assetName, removalGroup) {
        // 检测消息发送者是否是玩家自身, 并且消息内容是否包含对应的 Activity
        if (data.Sender === Player.MemberNumber && (data.Content.includes(`Self-${groupName}-${assetName}`) || data.Content.includes(`Other-${groupName}-${assetName}`))) {

            const targetCharacter = data.Dictionary.find(entry => entry.TargetCharacter !== undefined)?.TargetCharacter; // 提取对方的ID
            const playerIndex = ChatRoomCharacter.findIndex(player => player.MemberNumber === targetCharacter); // 查找房间内对应的玩家
            const targetMember = ChatRoomCharacter[playerIndex]; // 对方玩家的信息
            if (playerIndex !== -1) {
                InventoryRemove(targetMember, removalGroup);
                ChatRoomCharacterUpdate(targetMember)
            }
        }
    }

    mod.hookFunction("ChatRoomMessage", 0, (args, next) => {
        const data = args[0];
        removeActivityItems(data, "ItemTorso", "Act_剪刀剪掉上衣", "Cloth");
        removeActivityItems(data, "ItemPelvis", "Act_剪刀剪掉下衣", "ClothLower");
        removeActivityItems(data, "ItemBreast", "Act_剪刀剪掉胸罩", "Bra");
        removeActivityItems(data, "ItemVulvaPiercings", "Act_剪刀剪掉内裤", "Panties");
        removeActivityItems(data, "ItemBoots", "Act_剪刀剪掉袜子", "Socks");

        next(args);
    });
    //============================================================
    //============================================================

    mod.hookFunction("LoginResponse", 10, (args, next) => {
        for (const key in activityAdd) {
            const activity2 = activityAdd[key].B;
            activity2.forEach((subArray) => {
                ActivityDictionary.push(subArray);
            });
        }
        next(args)
    })

    var Nibble = { Name: "Nibble", MaxProgress: 40, Prerequisite: ["ZoneAccessible", "UseMouth", "ZoneNaked"], Target: ["ItemArms", "ItemBoots", "ItemEars", "ItemFeet", "ItemHands", "ItemLegs", "ItemMouth", "ItemNeck", "ItemNipples", "ItemNose", "ItemPelvis", "ItemTorso", "ItemTorso2", "ItemVulva", "ItemVulvaPiercings",], TargetSelf: ["ItemArms", "ItemBoots", "ItemHands", "ItemMouth", "ItemNipples",], };
    ActivityFemale3DCG.push(Nibble);
    ActivityFemale3DCG.push(Nibble.Name);


    const Activitypng = "Assets/Female3DCG/Activity/";
    const PawMittenspng = "Assets/Female3DCG/ItemHands/Preview/PawMittens.png";
    const Kennelpng = "Assets/Female3DCG/ItemDevices/Preview/Kennel.png";
    const Swordspng = "Assets/Female3DCG/ItemHandheld/Preview/Sword.png";
    const Scissorspng = "Assets/Female3DCG/ItemHandheld/Preview/Scissors.png";

    const ICONS = Object.freeze({ // 图片文件
    });
    const imageReplacement = new Map([ // 替换图片
        // ["Assets/Female3DCG/Activity/Act_托起乳房.png", ICONS2["Luzi_Oaood"]],
        [Activitypng + "Act_歪头.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_环顾四周.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_上下打量.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_闭上眼睛.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_眼睛呆滞.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_眼睛湿润.png", Activitypng + "MoanGagWhimper.png"],
        [Activitypng + "Act_流眼泪.png", Activitypng + "MoanGagWhimper.png"],
        [Activitypng + "Act_张开嘴.png", Activitypng + "Kiss.png"],
        [Activitypng + "Act_吞咽口水.png", Activitypng + "MoanGagWhimper.png"],
        [Activitypng + "Act_流口水.png", Activitypng + "MoanGagWhimper.png"],
        [Activitypng + "Act_轻声喘息.png", Activitypng + "MoanGagGroan.png"],
        [Activitypng + "Act_打哈欠.png", Activitypng + "Kiss.png"],
        [Activitypng + "Act_舔手.png", Activitypng + "MasturbateTongue.png"],
        [Activitypng + "Act_舔手指.png", Activitypng + "MasturbateTongue.png"],
        [Activitypng + "Act_吮吸手指.png", Activitypng + "FrenchKiss.png"],
        [Activitypng + "Act_舔脸.png", Activitypng + "MasturbateTongue.png"],
        [Activitypng + "Act_舔脚.png", Activitypng + "MasturbateTongue.png"],
        [Activitypng + "Act_嗅.png", Activitypng + "Kiss.png"],
        [Activitypng + "Act_跪下.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_站起来.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_跪着张开双腿.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_跪着合并双腿.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_手放身后.png", Activitypng + "Caress.png"],
        [Activitypng + "Act_手放身前.png", Activitypng + "Caress.png"],
        [Activitypng + "Act_趴下.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_四肢着地.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_爬到脚边.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_蹭腿.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_蹭腿.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_踮起双脚.png", Activitypng + "Kick.png"],
        [Activitypng + "Act_摇晃脚踝.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_伸出脚.png", Activitypng + "Kick.png"],
        [Activitypng + "Act_夹紧双腿.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_掰开双腿.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_脚托起下巴.png", Activitypng + "Kick.png"],
        [Activitypng + "Act_脚托起下巴2.png", Activitypng + "Kick.png"],
        [Activitypng + "Act_抬起屁股.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_扇动翅膀.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_猫爪挠手.png", PawMittenspng],
        [Activitypng + "Act_猫爪挠手臂.png", PawMittenspng],
        [Activitypng + "Act_猫爪舔手.png", PawMittenspng],
        [Activitypng + "Act_猫爪戳鼻子.png", PawMittenspng],
        [Activitypng + "Act_猫爪戳脸.png", PawMittenspng],
        [Activitypng + "Act_猫爪揉脸.png", PawMittenspng],
        [Activitypng + "Act_猫爪揉鼻子.png", PawMittenspng],
        [Activitypng + "Act_戳脸.png", Activitypng + "Caress.png"],
        [Activitypng + "Act_捏脸.png", Activitypng + "Pinch.png"],
        [Activitypng + "Act_戳手臂.png", Activitypng + "Caress.png"],
        [Activitypng + "Act_揉脸.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_摇晃手臂.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_轻推.png", Activitypng + "Slap.png"],
        [Activitypng + "Act_托起脚.png", Activitypng + "Caress.png"],
        [Activitypng + "Act_扭动手腕.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_挠头.png", Activitypng + "Pull.png"],
        [Activitypng + "Act_捂住耳朵.png", Activitypng + "HandGag.png"],
        [Activitypng + "Act_捂住眼睛.png", Activitypng + "HandGag.png"],
        [Activitypng + "Act_捂住头.png", Activitypng + "HandGag.png"],
        [Activitypng + "Act_捂住下体.png", Activitypng + "HandGag.png"],
        [Activitypng + "Act_拍头.png", Activitypng + "Slap.png"],
        [Activitypng + "Act_掀开裙子.png", Activitypng + "MasturbateHand.png"],
        [Activitypng + "Act_挥手.png", Activitypng + "Slap.png"],
        [Activitypng + "Act_伸出手.png", Activitypng + "Caress.png"],
        [Activitypng + "Act_拉扯衣角.png", Activitypng + "Pull.png"],
        [Activitypng + "Act_捂住胸.png", Activitypng + "Pull.png"],
        [Activitypng + "Act_手托起下巴.png", Activitypng + "Caress.png"],
        [Activitypng + "Act_拽链子.png", Activitypng + "MasturbateHand.png"],
        [Activitypng + "Act_弹额头.png", Activitypng + "Pinch.png"],
        [Activitypng + "Act_弹阴蒂.png", Activitypng + "Pinch.png"],
        [Activitypng + "Act_摇晃尾巴.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_竖起尾巴.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_炸毛.png", Activitypng + "Bite.png"],
        [Activitypng + "Act_舔尾巴.png", Activitypng + "MasturbateTongue.png"],
        [Activitypng + "Act_轻抚尾巴.png", Activitypng + "Caress.png"],
        [Activitypng + "Act_尾巴叼在嘴里.png", Activitypng + "Kiss.png"],
        [Activitypng + "Act_躲到身后.png", Activitypng + "SistersHug.png"],
        [Activitypng + "Act_移动到身后.png", Activitypng + "SistersHug.png"],
        [Activitypng + "Act_下巴搭在肩膀上.png", Activitypng + "RestHead.png"],
        [Activitypng + "Act_手臂搭在肩膀上.png", Activitypng + "Slap.png"],
        [Activitypng + "Act_搂腰.png", Activitypng + "SistersHug.png"],
        [Activitypng + "Act_身体颤抖.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_身体抽搐.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_托起乳房.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_揉搓乳头.png", Activitypng + "Pinch.png"],
        [Activitypng + "Act_双腿颤抖.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_摇晃双腿.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_流出液体.png", Activitypng + "MoanGagWhimper.png"],
        [Activitypng + "Act_失禁.png", Activitypng + "MoanGagWhimper.png"],
        [Activitypng + "Act_抱.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_手指插进阴道.png", Activitypng + "MasturbateHand.png"],
        [Activitypng + "Act_拔出自己的手指.png", Activitypng + "MasturbateHand.png"],
        [Activitypng + "Act_蠕动手指.png", Activitypng + "Grope.png"],
        [Activitypng + "Act_快速抽插.png", Activitypng + "Grope.png"],
        [Activitypng + "Act_钩住阴蒂环.png", Activitypng + "Pinch.png"],
        [Activitypng + "Act_拉扯阴蒂环.png", Activitypng + "Pinch.png"],
        [Activitypng + "Act_宠物服爬到脚边.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_宠物服蹭腿.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_宠物服蹭腿.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_宠物服趴下.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_宠物服立起来.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_宠物服跪立.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_宠物服扑.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_起身跪下.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_蹭大腿.png", Activitypng + "PoliteKiss.png"],
        [Activitypng + "Act_蹭小腿.png", Activitypng + "PoliteKiss.png"],
        [Activitypng + "Act_撇眼.png", Activitypng + "Wiggle.png"],
        [Activitypng + "Act_跺脚.png", Activitypng + "Step.png"],
        [Activitypng + "Act_叉腰.png", Activitypng + "Choke.png"],
        [Activitypng + "Act_撞笼子.png", Kennelpng],
        [Activitypng + "Act_咬笼子.png", Kennelpng],
        [Activitypng + "Act_摇晃笼子.png", Kennelpng],

        [Activitypng + "Act_泡沫剑架在脖子上.png", Swordspng],
        [Activitypng + "Act_泡沫剑拍脸.png", Swordspng],

        [Activitypng + "Act_剪刀剪掉上衣.png", Scissorspng],
        [Activitypng + "Act_剪刀剪掉下衣.png", Scissorspng],
        [Activitypng + "Act_剪刀剪掉胸罩.png", Scissorspng],
        [Activitypng + "Act_剪刀剪掉内裤.png", Scissorspng],
        [Activitypng + "Act_剪刀剪掉袜子.png", Scissorspng],

        [Activitypng + "Act_骑上去.png", Activitypng + "SistersHug.png"],


    ]);

    // 图片加载队列
    const imageQueue = [];
    // 在绘制循环中使用图片加载队列
    mod.hookFunction('DrawImageResize', 0, async (args, next) => {
        const data = args[0];
        if (!!data && typeof data === 'string' && data.indexOf("Act_") > -1) {
            const modifiedImage = imageReplacement.get(data);
            if (modifiedImage) {
                // 检查图片是否在队列中
                const queuedImage = imageQueue.find((item) => item.src === modifiedImage);
                if (queuedImage) {
                    // 等待加载完成后再使用图片
                    args[0] = await queuedImage.image;
                } else {
                    // 如果不在队列中,说明图片已经加载完成,直接使用
                    args[0] = modifiedImage;
                }
            }
        }
        next(args);
    });

    //============================================================
    //============================================================

    const poseMapping = {
        "ChatSelf-ItemLegs-Act_跪下": "Kneel",
        "ChatSelf-ItemBoots-Act_起身跪下": "Kneel",
        "ChatSelf-ItemLegs-Act_跪着合并双腿": "Kneel",
        "ChatSelf-ItemLegs-Act_跪着张开双腿": "KneelingSpread",
        "ChatSelf-ItemArms-Act_手放身后": "BackBoxTie",
        "ChatSelf-ItemBoots-Act_趴下": "Hogtied",
        "ChatSelf-ItemBoots-Act_四肢着地": "AllFours",
        "ChatSelf-ItemLegs-Act_站起来": null,
        "ChatSelf-ItemArms-Act_手放身前": null,
        "ChatSelf-ItemLegs-Act_宠物服立起来": "Hogtied",
        "ChatSelf-ItemLegs-Act_宠物服趴下": "AllFours",
        // "ChatOther-ItemTorso-Act_骑上去": "Kneel",
    };

    mod.hookFunction("ChatRoomMessage", 0, (args, next) => {
        const data = args[0];
        const content = data.Content;
        if (data.Sender === Player.MemberNumber && poseMapping.hasOwnProperty(content)) {
            const poseName = poseMapping[content];
            PoseSetActive(Player, poseName);
        }

        next(args);
    });
    //============================================================
    //============================================================




    const translationMap = new Map([
        ["Bap", "拍打"],
        ["SourceCharacter baps TargetCharacter.", "SourceCharacter拍打了TargetCharacter."],
        ["Headbutt", "用头猛撞"],
        ["SourceCharacter headbutts TargetCharacter.", "SourceCharacter用头猛撞TargetCharacter"],
        ["Nuzzle", "用鼻子轻抚"],
        ["SourceCharacter nuzzles against the side of TargetCharacter's head.", "SourceCharacter用鼻子轻抚在TargetCharacter头的一侧."],
        ["SourceCharacter nuzzles into TargetCharacter's neck.", "SourceCharacter用鼻子轻抚进TargetCharacter的脖子."],
        ["SourceCharacter nuzzles into TargetCharacter's arms.", "SourceCharacter用鼻子轻抚进TargetCharacter的臂膀."],
        ["SourceCharacter nuzzles underneath TargetCharacter's hand.", "SourceCharacter用鼻子轻抚在TargetCharacter手底下."],
        ["SourceCharacter nuzzles into TargetCharacter's breasts.", "SourceCharacter用鼻子轻抚进TargetCharacter的胸部."],
        ["SourceCharacter nuzzles snugly into TargetCharacter.", "SourceCharacter亲昵地用鼻子轻抚着TargetCharacter."],
        ["SourceCharacter nuzzles against TargetCharacter's thigh.", "SourceCharacter用鼻子轻抚在TargetCharacter的大腿上."],
        ["SourceCharacter nuzzles along TargetCharacter's leg.", "SourceCharacter用鼻子轻抚沿着TargetCharacter的腿."],
        ["SourceCharacter nuzzles under TargetCharacter's feet.", "SourceCharacter用鼻子轻抚在TargetCharacter的脚底下."],
        ["Hug", "拥抱"],
        ["SourceCharacter wraps PronounPossessive arms around TargetCharacter in a big warm hug.", "SourceCharacter用温暖的拥抱将PronounPossessive的手臂紧紧地环绕在TargetCharacter身上."],
        ["SourceCharacter wraps TargetCharacter in a therapeutic selfhug.", "SourceCharacter给TargetCharacter一个治疗性的自我拥抱."],
        ["Tackle", "扑倒"],
        ["SourceCharacter full body tackles TargetCharacter!", "SourceCharacter用全身扑倒了TargetCharacter!"],
        ["Flop", "瘫倒"],
        ["SourceCharacter flops on top of TargetCharacter.", "SourceCharacter瘫倒在TargetCharacter的上面."],
        ["Kiss Eyes", "亲吻眼睛"],
        ["SourceCharacter gently kisses over TargetCharacter's eyes.", "SourceCharacter轻轻地亲吻着TargetCharacter的眼睛."],
        ["Rub Pussy", "摩擦私处"],
        ["SourceCharacter grinds PronounPossessive pussy against TargetCharacter's penis.", "SourceCharacter用PronounPossessive的私处摩擦着TargetCharacter的阴茎."],
        ["Slap Face", "扇脸"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's face.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的脸上."],
        ["Slap Mouth", "扇嘴巴"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's mouth.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的嘴巴上."],
        ["Slap against Pussy", "扇打在私处上"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's pussy.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的私处上."],
        ["Slap Breast", "扇打在乳房上"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's breast.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的乳房上."],
        ["Slap Thigh", "扇打在大腿上"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's thigh.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的大腿上."],
        ["Slap Calf", "扇打在小腿上"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's calf.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的小腿上."],
        ["Slap Feet", "扇打在脚上"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's feet.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的脚上."],
        ["Slap Butt", "扇打在屁股上"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's butt.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的屁股上."],
        ["Slap Neck", "扇打在脖子上"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's neck.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的脖子上."],
        ["Slap Arms", "扇打在手臂上"],
        ["ArmsLSCGSlapPenis", "SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's arm.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的手臂上."],
        ["Slap Hand", "扇打在手上"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's hand.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的手上."],
        ["Slap Penis", "扇打在阴茎上"],
        ["SourceCharacter slaps PronounPossessive ActivityAsset against TargetCharacter's penis.", "SourceCharacter用PronounPossessive的ActivityAsset扇打在TargetCharacter的阴茎上."],
        ["Nibble Tail", "咬尾巴"],
        ["SourceCharacter nibbles on TargetCharacter's tail.", "SourceCharacter咬TargetCharacter的尾巴."],
        ["SourceCharacter nibbles on PronounPossessive own tail.", "SourceCharacter咬自己的尾巴."],
        ["Nibble Halo", "咬光环"],
        ["SourceCharacter nibbles on TargetCharacter's halo.", "SourceCharacter咬TargetCharacter的光环."],
        ["Nibble Wing", "咬翅膀"],
        ["SourceCharacter nibbles on TargetCharacter's wing.", "SourceCharacter咬TargetCharacter的翅膀."],
        ["SourceCharacter nibbles on PronounPossessive own wing.", "SourceCharacter咬自己的翅膀."],
        ["Grind with Pussy", "用阴部磨擦"],
        ["SourceCharacter grinds PronounPossessive pussy against TargetCharacter's.", "SourceCharacter用阴部磨擦着TargetCharacter的."],
        ["Ride with Pussy", "用阴部骑乘"],
        ["SourceCharacter fucks TargetCharacter's penis with PronounPossessive pussy, grinding up and down.", "SourceCharacter用阴部骑乘TargetCharacter的阴茎,上下磨擦."],
        ["Sit on Face", "坐在脸上"],
        ["SourceCharacter grinds PronounPossessive pussy against TargetCharacter's face.", "SourceCharacter用阴部磨擦着TargetCharacter的脸."],
        ["Grind with Ass", "用臀部磨擦"],
        ["SourceCharacter grinds PronounPossessive ass against TargetCharacter's vulva.", "SourceCharacter用臀部磨擦着TargetCharacter的阴道."],
        ["Ride with Ass", "用臀部骑乘"],
        ["SourceCharacter fucks TargetCharacter's penis with PronounPossessive ass.", "SourceCharacter用臀部骑乘TargetCharacter的阴茎."],
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
        ["SourceCharacter takes a big bite out of TargetCharacter's ActivityAsset.", "SourceCharacter咬了TargetCharacter的ActivityAsset的一大口."],
        ["SourceCharacter takes a big bite out of PronounPossessive own ActivityAsset.", "SourceCharacter咬了自己的ActivityAsset的一大口."],
        ["Grab Tongue", "抓舌头"],
        ["SourceCharacter reaches in and grabs hold of TargetCharacter's tongue with PronounPossessive fingers.", "SourceCharacter伸手抓住TargetCharacter的舌头,用自己的手指."],
        ["Release Tongue", "释放舌头"],
        ["SourceCharacter lets go of TargetCharacter's tongue.", "SourceCharacter松开TargetCharacter的舌头."],
        ["Hold Hands", "握手"],
        ["SourceCharacter takes TargetCharacter's hand.", "SourceCharacter握住TargetCharacter的手."],
        ["Release Hand", "放开手"],
        ["SourceCharacter lets go of TargetCharacter's hand.", "SourceCharacter放开TargetCharacter的手."],
        ["Pinch Butt", "捏屁股"],
        ["SourceCharacter pinches TargetCharacter's butt.", "SourceCharacter捏住TargetCharacter的屁股."],
        ["SourceCharacter pinches PronounPossessive own butt.", "SourceCharacter捏住自己的屁股."],
        ["Pinch Cheek", "捏脸颊"],
        ["SourceCharacter pinches TargetCharacter's cheek.", "SourceCharacter捏住TargetCharacter的脸颊."],
        ["SourceCharacter pinches PronounPossessive own cheek.", "SourceCharacter捏住自己的脸颊."],
        ["Release Ear", "释放耳朵"],
        ["SourceCharacter releases TargetCharacter's ear.", "SourceCharacter释放TargetCharacter的耳朵."],
        ["Grab Horn", "抓住角"],
        ["SourceCharacter grabs TargetCharacter's horn.", "SourceCharacter抓住TargetCharacter的角."],
        ["Release Arm", "释放手臂"],
        ["SourceCharacter releases TargetCharacter's arm.", "SourceCharacter释放TargetCharacter的手臂."],
        ["Release Horn", "释放角"],
        ["SourceCharacter releases TargetCharacter's horn.", "SourceCharacter释放TargetCharacter的角."],
        ["Release Neck", "释放脖子"],
        ["SourceCharacter releases TargetCharacter's neck.", "SourceCharacter释放TargetCharacter的脖子."],
        ["Release Mouth", "释放嘴巴"],
        ["SourceCharacter releases TargetCharacter's mouth.", "SourceCharacter释放TargetCharacter的嘴巴."],
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
        ["SourceCharacter chomps down on TargetCharacter's arm and doesn't let go.", "SourceCharacter狠狠地咬住TargetCharacter的手臂,不肯松口."],
        ["Chomp on Leg", "咬住腿"],
        ["SourceCharacter chomps down on TargetCharacter's leg and doesn't let go.", "SourceCharacter狠狠地咬住TargetCharacter的腿,不肯松口."],
        ["Chomp on Butt", "咬住屁股"],
        ["SourceCharacter chomps down on TargetCharacter's butt and doesn't let go.", "SourceCharacter狠狠地咬住TargetCharacter的屁股,不肯松口."],
        ["Chomp on Neck", "咬住脖子"],
        ["SourceCharacter chomps down on TargetCharacter's neck and doesn't let go.", "SourceCharacter狠狠地咬住TargetCharacter的脖子,不肯松口."],
        ["Release Chomp", "松开咬住"],
        ["SourceCharacter releases PronounPossessive chomp on TargetCharacter.", "SourceCharacter松开对TargetCharacter的咬住."],
        ["Quaff", "畅饮"],
        ["SourceCharacter presses PronounPossessive ActivityAsset up against TargetCharacter's lips.", "SourceCharacter将PronounPossessive的ActivityAsset紧贴在TargetCharacter的嘴唇上."],
        ["SourceCharacter quaffs the ActivityAsset in one gulp.", "SourceCharacter一口气畅饮了ActivityAsset."],
        ["Tighten Collar", "收紧颈圈"],
        ["Loosen Collar", "放松颈圈"],
        ["Collar Stats", "颈圈状态"],
        ["Shoot Netgun", "射击净网枪"],
        ["SourceCharacter takes aim at TargetCharacter with PronounPossessive net gun.", "SourceCharacter用PronounPossessive的净网枪瞄准TargetCharacter."],
        ["SourceCharacter turns PronounPossessive net gun on PronounSelf.", "SourceCharacter将PronounPossessive的净网枪对准PronounSelf."],
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
        ["SourceCharacter pulls the ActivityAsset from PronounPossessive mouth.", "SourceCharacter从PronounPossessive的嘴里拔出了ActivityAsset."],
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
        ["Steal", "偷窃"],
        ["SourceCharacter grabs at TargetCharacters hands, trying to steal TargetPronounPossessive item.", "SourceCharacter试图偷窃TargetPronounPossessive的物品,抓住了TargetCharacters的手."],
        ["Give Item", "交出物品"],
        ["SourceCharacter grabs at TargetCharacters hands, trying to steal TargetPronounPossessive item!", "SourceCharacter试图偷窃TargetPronounPossessive的物品,抓住了TargetCharacters的手!"],
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

    ]);
    const translationMapEN = new Map([
        ["歪头", "Tilt Head"],
        ["SourceCharacter歪头.", "SourceCharacter tilts head."],
        ["环顾四周", "Look Around"],
        ["SourceCharacter环视周围.", "SourceCharacter looks around."],
        ["上下打量", "Size Up"],
        ["SourceCharacter仔细打量TargetCharacter", "SourceCharacter sizes up TargetCharacter."],
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
        ["SourceCharacter吞咽嘴里的口水", "SourceCharacter swallows saliva."],
        ["流口水", "Drool"],
        ["SourceCharacter的口水顺着嘴角流下", "SourceCharacter drools down the corner of the mouth."],
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
        ["嗅", "Sniff"],
        ["SourceCharacter用鼻子嗅了嗅TargetCharacter的手.", "SourceCharacter sniffs TargetCharacter's hand."],
        ["SourceCharacter用鼻子嗅了嗅自己的手.", "SourceCharacter sniffs own hand."],
        ["跪下", "Kneel Down"],
        ["SourceCharacter轻轻地跪了下来.", "SourceCharacter kneels down gently."],
        ["站起来", "Stand Up"],
        ["SourceCharacter手扶着地站了起来.", "SourceCharacter stands up with hands on the ground."],
        ["跪着张开双腿", "Kneel with Legs Spread"],
        ["SourceCharacter张开了PronounPossessive的腿.", "SourceCharacter kneels with legs spread."],
        ["跪着合并双腿", "Kneel with Legs Together"],
        ["SourceCharacter并拢了PronounPossessive的腿.", "SourceCharacter kneels with legs together."],
        ["手放身后", "Hands Behind Back"],
        ["SourceCharacter把PronounPossessive的手放在了身后.", "SourceCharacter puts PronounPossessive hands behind back."],
        ["手放身前", "Hands in Front"],
        ["SourceCharacter把PronounPossessive的手放在了身前.", "SourceCharacter puts PronounPossessive hands in front."],
        ["趴下", "Lie Down"],
        ["SourceCharacter手放身后趴在地上.", "SourceCharacter lies down with hands behind back."],
        ["四肢着地", "All Fours"],
        ["SourceCharacter四肢着地趴在地上.", "SourceCharacter is on all fours on the ground."],
        ["起身跪下", "Kneel from Standing"],
        ["SourceCharacter起身跪下.", "SourceCharacter kneels down from standing."],
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
        ["SourceCharacter戳了戳自己的脸", "SourceCharacter pokes own face."],
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
        ["捂住耳朵", "Cover Ears"],
        ["SourceCharacter用手盖住了TargetCharacter的耳朵.", "SourceCharacter covers TargetCharacter's ears with hands."],
        ["SourceCharacter用手盖住了自己的耳朵.", "SourceCharacter covers own ears with hands."],
        ["捂住眼睛", "Cover Eyes"],
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
        ["拉扯衣角", "Tug at Clothes"],
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
        ["SourceCharacter弓起后背,身体的毛发立了起来,发出嘶的声音.", "SourceCharacter arches back, body hair stands up, emitting a hissing sound."],
        ["舔尾巴", "Lick Tail"],
        ["SourceCharacter舔TargetCharacter的尾巴.", "SourceCharacter licks TargetCharacter's tail."],
        ["SourceCharacter舔自己的尾巴.", "SourceCharacter licks own tail."],
        ["轻抚尾巴", "Gently Stroke Tail"],
        ["SourceCharacter轻抚TargetCharacter的尾巴.", "SourceCharacter gently strokes TargetCharacter's tail."],
        ["SourceCharacter轻抚PronounPossessive的尾巴.", "SourceCharacter gently strokes PronounPossessive's tail."],
        ["尾巴叼在嘴里", "Hold Tail in Mouth"],
        ["SourceCharacter叼起TargetCharacter的尾巴.", "SourceCharacter holds TargetCharacter's tail in mouth."],
        ["SourceCharacter把自己的尾巴叼在嘴里.", "SourceCharacter holds own tail in mouth."],
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
        ["SourceCharacter身体在颤抖.", "SourceCharacter's body trembles."],
        ["身体抽搐", "Body Twitches"],
        ["SourceCharacter身体在抽搐.", "SourceCharacter's body twitches."],
        ["托起乳房", "Lift Breasts"],
        ["SourceCharacter托起TargetCharacter的双乳.", "SourceCharacter lifts TargetCharacter's breasts."],
        ["SourceCharacter托起PronounPossessive的双乳.", "SourceCharacter lifts PronounPossessive's breasts."],
        ["揉搓乳头", "Rub Nipples"],
        ["SourceCharacter用手捏住TargetCharacter的乳头,开始揉搓.", "SourceCharacter uses hands to pinch TargetCharacter's nipples, rubbing them."],
        ["SourceCharacter用手捏住PronounPossessive的乳头,开始揉搓.", "SourceCharacter uses hands to pinch PronounPossessive's nipples, rubbing them."],
        ["双腿颤抖", "Legs Tremble"],
        ["SourceCharacter的双腿颤抖着.", "SourceCharacter's legs tremble."],
        ["摇晃双腿", "Shake Legs"],
        ["SourceCharacter摇晃自己的双腿.", "SourceCharacter shakes own legs."],
        ["流出液体", "Liquid Flows"],
        ["有液体顺着SourceCharacter的大腿流下.", "Liquid flows down SourceCharacter's thighs."],
        ["失禁", "Incontinence"],
        ["SourceCharacter的尿液顺着PronounPossessive大腿流下.", "SourceCharacter's urine flows down PronounPossessive thighs."],
        ["夹紧双腿", "Clamp Legs"],
        ["夹紧双腿", "Squeeze Legs"],
        ["SourceCharacter夹紧TargetCharacter的双腿.", "SourceCharacter squeezes TargetCharacter's legs."],
        ["手指插进阴道", "Insert Finger into Vagina"],
        ["SourceCharacter手指插进TargetCharacter的阴道内.", "SourceCharacter inserts a finger into TargetCharacter's vagina."],
        ["SourceCharacter手指插进自己的的阴道内.", "SourceCharacter inserts a finger into own vagina."],
        ["拔出自己的手指", "Withdraw Finger"],
        ["SourceCharacter从TargetCharacter的阴道内拔出自己的手指,手指连着PronounPossessive的爱液.", "SourceCharacter withdraws own finger from TargetCharacter's vagina, the finger coated with PronounPossessive love fluids."],
        ["SourceCharacter从PronounPossessive的阴道内拔出自己的手指,手指连着自己的爱液.", "SourceCharacter withdraws own finger from PronounPossessive's vagina, the finger coated with SourceCharacter's love fluids."],
        ["蠕动手指", "Wriggle Finger"],
        ["SourceCharacter在TargetCharacter的阴道内蠕动手指.", "SourceCharacter wriggles a finger inside TargetCharacter's vagina."],
        ["SourceCharacter在PronounPossessive的阴道内蠕动手指.", "SourceCharacter wriggles a finger inside PronounPossessive's vagina."],
        ["快速抽插", "Quickly Thrust"],
        ["SourceCharacter的手在TargetCharacter的阴道内快速抽插,开始揉搓.", "SourceCharacter's hand quickly thrusts in and out of TargetCharacter's vagina, rubbing and kneading."],
        ["SourceCharacter的手在PronounPossessive的阴道内快速抽插,开始揉搓.", "SourceCharacter's hand quickly thrusts in and out of PronounPossessive's vagina, rubbing and kneading."],
        ["钩住阴蒂环", "Hook Clitoral Piercing"],
        ["SourceCharacter钩住TargetCharacter的阴蒂环.", "SourceCharacter hooks onto TargetCharacter's clitoral piercing."],
        ["SourceCharacter钩住自己的阴蒂环.", "SourceCharacter hooks onto own clitoral piercing."],
        ["拉扯阴蒂环", "Tug Clitoral Piercing"],
        ["SourceCharacter拉了一下TargetCharacter的阴蒂环又松开了.", "SourceCharacter tugs on TargetCharacter's clitoral piercing and then releases it."],
        ["SourceCharacter拉了一下自己的阴蒂环又松开了.", "SourceCharacter tugs on own clitoral piercing and then releases it."],
        ["宠物服爬到脚边", "Pet Crawls to Feet"],
        ["SourceCharacter爬到TargetCharacter脚边.", "SourceCharacter's pet crawls to TargetCharacter's feet."],
        ["宠物服蹭腿", "Pet Rubs Legs"],
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
        ["SourceCharacter用身体撞笼子.", "SourceCharacter bumps its body into the cage."],
        ["咬笼子", "Bite Cage"],
        ["SourceCharacter用牙齿咬笼子.", "SourceCharacter bites the cage."],
        ["摇晃笼子", "Shake Cage"],
        ["SourceCharacter摇晃笼子的门.", "SourceCharacter shakes the door of the cage."],
        ["撇眼", "Roll Eyes"],
        ["SourceCharacter撇了TargetCharacter一眼.", "SourceCharacter rolls its eyes at TargetCharacter."],
        ["跺脚", "Stamp Feet"],
        ["SourceCharacter不停地跺脚.", "SourceCharacter keeps stamping its feet."],
        ["叉腰", "Put Hands on Hips"],
        ["SourceCharacter双手叉腰.", "SourceCharacter puts its hands on its hips."],
        ["撩头发", "Toss Hair"],
        ["SourceCharacter撩起头发挂在耳边.", "SourceCharacter tosses its hair, letting it hang by its ears."],

    ]);
    mod.hookFunction("ChatRoomMessage", 10, (args, next) => {
        next(args)
        // LSCG行动翻译
        let data = args[0]
        if (data.Content === 'ServerEnter') {
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
        }

    });
})();



