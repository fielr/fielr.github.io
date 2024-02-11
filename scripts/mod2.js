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
        Act_拔出自己的手指: { A: createActivity("拔出自己的手指", "ItemVulva", "ItemVulva", 50, 50, ["UseHands", "ZoneNaked", "TargetZoneNaked"], []), B: ActivityDictionaryadd("Act_拔出自己的手指", "SourceCharacter从TargetCharacter的阴道内拔出自己的手指,手指连着PronounPossessive的爱液.", "SourceCharacter从PronounPossessive的阴道内拔出自己的手指,手指连着自己的爱液.") },
        Act_蠕动手指: { A: createActivity("蠕动手指", "ItemVulva", "ItemVulva", 50, 50, ["UseHands", "ZoneNaked", "TargetZoneNaked"], []), B: ActivityDictionaryadd("Act_蠕动手指", "SourceCharacter在TargetCharacter的阴道内蠕动手指.", "SourceCharacter在PronounPossessive的阴道内蠕动手指.") },
        Act_快速抽插: { A: createActivity("快速抽插", "ItemVulva", "ItemVulva", 50, 50, ["UseHands", "ZoneNaked", "TargetZoneNaked"], []), B: ActivityDictionaryadd("Act_快速抽插", "SourceCharacter的手在TargetCharacter的阴道内快速抽插,开始揉搓.", "SourceCharacter的手在PronounPossessive的阴道内快速抽插,开始揉搓.") },

        Act_钩住阴蒂环: { A: createActivity("钩住阴蒂环", "ItemVulvaPiercings", "ItemVulvaPiercings", 50, 50, ["UseHands", "HasItemVulvaPiercings"], []), B: ActivityDictionaryadd("Act_钩住阴蒂环", "SourceCharacter钩住TargetCharacter的阴蒂环.", "SourceCharacter钩住自己的阴蒂环.") },
        Act_拉扯阴蒂环: { A: createActivity("拉扯阴蒂环", "ItemVulvaPiercings", "ItemVUlvaPiercings", 50, 50, ["UseHands", "HasItemVulvaPiercings"], []), B: ActivityDictionaryadd("Act_拉扯阴蒂环", "SourceCharacter拉了一下TargetCharacter的阴蒂环.", "SourceCharacter拉了一下自己的阴蒂环.") },
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
        Act_躺上去: { A: createActivity("躺上去", "ItemDevices", "", 50, 50, [], []), B: ActivityDictionaryadd("Act_躺上去", "SourceCharacter躺到TargetCharacter的身边.", "") },


        Act_舔触手: { A: createActivity("舔触手", "", "ItemMouth", 50, 50, ["HasTentacles"], []), B: ActivityDictionaryadd("Act_舔触手", "", "SourceCharacter舔PronounPossessive的触手.") },
        Act_触手摸头: { A: createActivity("触手摸头", "ItemHead", "ItemHead", 50, 50, ["HasTentacles2"], []), B: ActivityDictionaryadd("Act_触手摸头", "SourceCharacter用触手摸了摸TargetCharacter的头.", "SourceCharacter用触手摸了摸自己的头.") },
        Act_触手戳鼻子: { A: createActivity("触手戳鼻子", "ItemNose", "ItemNose", 50, 50, ["HasTentacles2"], []), B: ActivityDictionaryadd("Act_触手戳鼻子", "SourceCharacter用触手戳了戳TargetCharacter的鼻子.", "SourceCharacter用触手戳了戳自己的鼻子.") },
        Act_触手戳脸: { A: createActivity("触手戳脸", "ItemMouth", "ItemMouth", 50, 50, ["HasTentacles2"], []), B: ActivityDictionaryadd("Act_触手戳脸", "SourceCharacter用触手戳了戳TargetCharacter的脸.", "SourceCharacter用触手戳了戳自己的脸.") },
        Act_触手揉鼻子: { A: createActivity("触手揉鼻子", "ItemNose", "ItemNose", 50, 50, ["HasTentacles2"], []), B: ActivityDictionaryadd("Act_触手揉鼻子", "SourceCharacter用触手揉了揉TargetCharacter的鼻子.", "SourceCharacter用触手揉了揉自己的鼻子.") },
        Act_触手揉脸: { A: createActivity("触手揉脸", "ItemMouth", "ItemMouth", 50, 50, ["HasTentacles2"], []), B: ActivityDictionaryadd("Act_触手揉脸", "SourceCharacter用触手揉了揉TargetCharacter的脸.", "SourceCharacter用触手揉了揉自己的脸.") },

        Act_鱼尾揉脸: { A: createActivity("鱼尾揉脸", "ItemMouth", "ItemMouth", 50, 50, ["SuitLower鱼鱼尾_Luzi"], []), B: ActivityDictionaryadd("Act_鱼尾揉脸", "SourceCharacter用鱼尾揉了揉TargetCharacter的脸.", "SourceCharacter用鱼尾揉了揉PronounPossessive自己的脸.") },
        Act_鱼尾戳脸: { A: createActivity("鱼尾戳脸", "ItemMouth", "ItemMouth", 50, 50, ["SuitLower鱼鱼尾_Luzi"], []), B: ActivityDictionaryadd("Act_鱼尾戳脸", "SourceCharacter用鱼尾戳了戳TargetCharacter的脸.", "SourceCharacter用鱼尾戳了戳PronounPossessive自己的脸.") },
        Act_鱼尾抚脸: { A: createActivity("鱼尾抚脸", "ItemMouth", "ItemMouth", 50, 50, ["SuitLower鱼鱼尾_Luzi"], []), B: ActivityDictionaryadd("Act_鱼尾抚脸", "SourceCharacter用鱼尾轻抚TargetCharacter的脸颊.", "SourceCharacter用鱼尾轻抚PronounPossessive自己的脸颊.") },
        Act_鱼尾担膝盖: { A: createActivity("鱼尾担膝盖", "ItemLegs", "", 50, 50, ["SuitLower鱼鱼尾_Luzi", "IsKneeling"], []), B: ActivityDictionaryadd("Act_鱼尾担膝盖", "SourceCharacter将鱼尾担在了TargetCharacter的膝盖上.", "") },
        Act_鱼尾揉乳房: { A: createActivity("鱼尾揉乳房", "ItemBreast", "ItemBreast", 50, 50, ["SuitLower鱼鱼尾_Luzi"], []), B: ActivityDictionaryadd("Act_鱼尾揉乳房", "SourceCharacter用鱼尾揉了揉TargetCharacter的乳房.", "SourceCharacter用鱼尾揉了揉PronounPossessive自己的乳房.") },
        Act_鱼尾扇风: { A: createActivity("鱼尾扇风", "ItemMouth", "ItemMouth", 50, 50, ["SuitLower鱼鱼尾_Luzi"], []), B: ActivityDictionaryadd("Act_鱼尾扇风", "SourceCharacter用鱼尾给TargetCharacter的脸扇了扇风.", "SourceCharacter用鱼尾给自己扇了扇风") },
        Act_鱼尾戳乳头: { A: createActivity("鱼尾戳乳头", "ItemNipples", "ItemNipples", 50, 50, ["SuitLower鱼鱼尾_Luzi"], []), B: ActivityDictionaryadd("Act_鱼尾戳乳头", "SourceCharacter用鱼尾戳了戳TargetCharacter的乳头.", "SourceCharacter用鱼尾戳了戳自己的乳头.") },
        Act_鱼尾碰手: { A: createActivity("鱼尾碰手", "ItemHands", "", 50, 50, ["SuitLower鱼鱼尾_Luzi"], []), B: ActivityDictionaryadd("Act_鱼尾碰手", "SourceCharacter将鱼尾踝搭在了TargetCharacter的手心上.", "") },
        Act_鱼尾抚弄大腿: { A: createActivity("鱼尾抚弄大腿", "ItemLegs", "", 50, 50, ["SuitLower鱼鱼尾_Luzi"], []), B: ActivityDictionaryadd("Act_鱼尾抚弄大腿", "SourceCharacter用鱼尾抚弄TargetCharacter的大腿.", "") },


        // ===========================
        // ===========================
        // ===========================

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
        next(args)
        for (const key in activityAdd) {
            const activity2 = activityAdd[key].B;
            activity2.forEach((subArray) => {
                ActivityDictionary.push(subArray);
            });
        }
    })

    var Nibble = { Name: "Nibble", MaxProgress: 40, Prerequisite: ["ZoneAccessible", "UseMouth", "ZoneNaked"], Target: ["ItemArms", "ItemBoots", "ItemEars", "ItemFeet", "ItemHands", "ItemLegs", "ItemMouth", "ItemNeck", "ItemNipples", "ItemNose", "ItemPelvis", "ItemTorso", "ItemTorso2", "ItemVulva", "ItemVulvaPiercings",], TargetSelf: ["ItemArms", "ItemBoots", "ItemHands", "ItemMouth", "ItemNipples",], };
    ActivityFemale3DCG.push(Nibble);
    ActivityFemale3DCG.push(Nibble.Name);


    const Activitypng = "Assets/Female3DCG/Activity/";
    const PawMittenspng = "Assets/Female3DCG/ItemHands/Preview/PawMittens.png";
    const Kennelpng = "Assets/Female3DCG/ItemDevices/Preview/Kennel.png";
    const Swordspng = "Assets/Female3DCG/ItemHandheld/Preview/Sword.png";
    const Scissorspng = "Assets/Female3DCG/ItemHandheld/Preview/Scissors.png";
    const Tentaclespng = "Assets/Female3DCG/TailStraps/Preview/Tentacles.png";
    const 鱼尾 = "Assets/Female3DCG/ItemLegs/Preview/MermaidTail.png";



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
        [Activitypng + "Act_躺上去.png", Activitypng + "SistersHug.png"],

        [Activitypng + "Act_舔触手.png", Tentaclespng],
        [Activitypng + "Act_触手摸头.png", Tentaclespng],
        [Activitypng + "Act_触手戳鼻子.png", Tentaclespng],
        [Activitypng + "Act_触手戳脸.png", Tentaclespng],
        [Activitypng + "Act_触手揉鼻子.png", Tentaclespng],
        [Activitypng + "Act_触手揉脸.png", Tentaclespng],

        [Activitypng + "Act_鱼尾揉脸.png", 鱼尾],
        [Activitypng + "Act_鱼尾戳脸.png", 鱼尾],
        [Activitypng + "Act_鱼尾抚脸.png", 鱼尾],
        [Activitypng + "Act_鱼尾担膝盖.png", 鱼尾],
        [Activitypng + "Act_鱼尾揉乳房.png", 鱼尾],
        [Activitypng + "Act_鱼尾扇风.png", 鱼尾],
        [Activitypng + "Act_鱼尾戳乳头.png", 鱼尾],
        [Activitypng + "Act_鱼尾碰手.png", 鱼尾],
        [Activitypng + "Act_鱼尾抚弄大腿.png", 鱼尾],



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
            ChatRoomCharacterUpdate(Player)
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
        ["SourceCharacter full body tackles TargetCharacter!", "SourceCharacter用全身扑倒了TargetCharacter."],
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

    mod.hookFunction("ChatRoomSync", 10, (args, next) => {
        next(args);
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
    });

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
        { regex: /(.+) sways weakly in (.+) place, drifting peacefully\.\.\./, replacement: "$1在$2地方虚弱地摇摆, 平静地漂流..." },
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
        { regex: /(.+)\'s collar beeps and a computerized voice says "Access Denied\./, replacement: "$1的项圈发出嘟嘟声, 电脑化的声音说：“访问被拒绝.”" },
        { regex: /(.+)\'s collar chimes and a computerized voice reads out\:\nCurrent Level\: (.+)\.\.\.\nCorrective Cycles: (.+)\.\.\.\nTighten Trigger\: \'(.+)\'\.\.\.\nLoosen Trigger\: \'(.+)\'\.\.\.\nRemote Access\: (.+)\.\.\./, replacement: "$1的项圈响起提示音, 电脑化的声音读出：\n当前水平：$2...\n校正周期：$3...\n收紧触发器：“$4”...\n放松触发器：“$5”...\n远程访问：$6.." },
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
        { regex: /(.+) convulses weakly with a moan, (.+) eyes rolling back as (.+) lungs scream for air\./, replacement: "$1微弱地抽搐着发出呻吟声, 当$2的眼睛开始翻白时, $4的肺部呼吁空气." },
        { regex: /(.+) snaps back into (.+) senses at (.+)'s voice\./, replacement: "$1突然回到$2的意识中, 听到了$3的声音." },
        { regex: /(.+) (.+)manages to get (.+) (.+) past (.+)'s (.+)lips, forcing (.+) to swallow\./, replacement: "$1$2设法让$3$4经过$5的$6, 迫使$7吞咽." },
        { regex: /(.+) (.+) manages to get (.+) (.+) past (.+)'s (.+) lips, forcing (.+) to swallow it\./, replacement: "$1$2设法让$3$4经过$5的$6, 迫使$7吞咽它." },
        { regex: /(.+) (.+) successfully defends against (.+)'s (.+) attempt to force (.+) to drink (.+) (.+)\./, replacement: "$1$2成功抵御了$3的$4企图迫使$5喝下$6$7." },
        { regex: /(.+) leads (.+) and (.+) out of the room by (.+) ears\./, replacement: "$1带着$2和$3走出房间, 拉着$4的耳朵." },
        { regex: /(.+) roughly pulls (.+) and (.+) out of the room by (.+) arms\./, replacement: "$1粗暴地拉着$2和$3走出房间, 抓住$4的手臂." },
        { regex: /(.+) tugs (.+) and (.+) out of the room by (.+) tongues\./, replacement: "$1拽着$2和$3走出房间, 用$4的舌头." },
        { regex: /(.+) tries (.+) best to escape from (.+)'s grip\.\.\./, replacement: "$1竭尽全力从$3的控制中挣脱..." },
        { regex: /(.+)\'s eyes start to roll back with a groan as (.+) completely closes (.+) airway with (.+) hand\./, replacement: "$1的眼睛开始滚动, 发出呻吟声, 当$2用$4的手完全封闭$3的气道时." },
    ];

    mod.hookFunction("ChatRoomMessage", 0, (args, next) => {

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

    mod.hookFunction("ServerSend", 0, (args, next) => {
        let language = localStorage.getItem("BondageClubLanguage");
        if (language === "CN" || language === "TW") {
            const data = args[1];
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

})();
