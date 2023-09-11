// ==UserScript==
// @name BC Responsive Local
// @namespace https://www.bondageprojects.com/
// @version 0.3.5
// @description An anto response script for Bondage Club
// @author Saki Saotome
// @include /^https:\/\/(www\.)?bondage(?:projects\.elementfx|-europe)\.com\/R\d+\/(BondageClub|\d+)(\/)?(((index|\d+)\.html)?)?$/
// @icon  https://dynilath.gitlab.io/SaotomeToyStore/favicon.ico
// @grant none
// @run-at document-end
// ==/UserScript==

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var bcmodsdk = {};

(function (exports) {
	(function(){const e="1.1.0";function o(e){alert("Mod ERROR:\n"+e);const o=new Error(e);throw console.error(o),o}const t=new TextEncoder;function n(e){return !!e&&"object"==typeof e&&!Array.isArray(e)}function r(e){const o=new Set;return e.filter((e=>!o.has(e)&&o.add(e)))}const i=new Map,a=new Set;function d(e){a.has(e)||(a.add(e),console.warn(e));}function s(e){const o=[],t=new Map,n=new Set;for(const r of p.values()){const i=r.patching.get(e.name);if(i){o.push(...i.hooks);for(const[o,a]of i.patches.entries())t.has(o)&&t.get(o)!==a&&d(`ModSDK: Mod '${r.name}' is patching function ${e.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${o}\nPatch1:\n${t.get(o)||""}\nPatch2:\n${a}`),t.set(o,a),n.add(r.name);}}o.sort(((e,o)=>o.priority-e.priority));const r=function(e,o){if(0===o.size)return e;let t=e.toString().replaceAll("\r\n","\n");for(const[n,r]of o.entries())t.includes(n)||d(`ModSDK: Patching ${e.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return (0, eval)(`(${t})`)}(e.original,t);let i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,e.name,n),d=r.apply(this,o);return null==a||a(),d};for(let t=o.length-1;t>=0;t--){const n=o[t],r=i;i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,e.name,n.mod),d=n.hook.apply(this,[o,e=>{if(1!==arguments.length||!Array.isArray(o))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof e}`);return r.call(this,e)}]);return null==a||a(),d};}return {hooks:o,patches:t,patchesSources:n,enter:i,final:r}}function c(e,o=!1){let r=i.get(e);if(r)o&&(r.precomputed=s(r));else {let o=window;const a=e.split(".");for(let t=0;t<a.length-1;t++)if(o=o[a[t]],!n(o))throw new Error(`ModSDK: Function ${e} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const d=o[a[a.length-1]];if("function"!=typeof d)throw new Error(`ModSDK: Function ${e} to be patched not found`);const c=function(e){let o=-1;for(const n of t.encode(e)){let e=255&(o^n);for(let o=0;o<8;o++)e=1&e?-306674912^e>>>1:e>>>1;o=o>>>8^e;}return ((-1^o)>>>0).toString(16).padStart(8,"0").toUpperCase()}(d.toString().replaceAll("\r\n","\n")),l={name:e,original:d,originalHash:c};r=Object.assign(Object.assign({},l),{precomputed:s(l),router:()=>{},context:o,contextProperty:a[a.length-1]}),r.router=function(e){return function(...o){return e.precomputed.enter.apply(this,[o])}}(r),i.set(e,r),o[r.contextProperty]=r.router;}return r}function l(){const e=new Set;for(const o of p.values())for(const t of o.patching.keys())e.add(t);for(const o of i.keys())e.add(o);for(const o of e)c(o,!0);}function f(){const e=new Map;for(const[o,t]of i)e.set(o,{name:o,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((e=>e.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return e}const p=new Map;function u(e){p.get(e.name)!==e&&o(`Failed to unload mod '${e.name}': Not registered`),p.delete(e.name),e.loaded=!1,l();}function g(e,t,r){"string"==typeof e&&"string"==typeof t&&(alert(`Mod SDK warning: Mod '${e}' is registering in a deprecated way.\nIt will work for now, but please inform author to update.`),e={name:e,fullName:e,version:t},t={allowReplace:!0===r}),e&&"object"==typeof e||o("Failed to register mod: Expected info object, got "+typeof e),"string"==typeof e.name&&e.name||o("Failed to register mod: Expected name to be non-empty string, got "+typeof e.name);let i=`'${e.name}'`;"string"==typeof e.fullName&&e.fullName||o(`Failed to register mod ${i}: Expected fullName to be non-empty string, got ${typeof e.fullName}`),i=`'${e.fullName} (${e.name})'`,"string"!=typeof e.version&&o(`Failed to register mod ${i}: Expected version to be string, got ${typeof e.version}`),e.repository||(e.repository=void 0),void 0!==e.repository&&"string"!=typeof e.repository&&o(`Failed to register mod ${i}: Expected repository to be undefined or string, got ${typeof e.version}`),null==t&&(t={}),t&&"object"==typeof t||o(`Failed to register mod ${i}: Expected options to be undefined or object, got ${typeof t}`);const a=!0===t.allowReplace,d=p.get(e.name);d&&(d.allowReplace&&a||o(`Refusing to load mod ${i}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(d));const s=e=>{"string"==typeof e&&e||o(`Mod ${i} failed to patch a function: Expected function name string, got ${typeof e}`);let t=g.patching.get(e);return t||(t={hooks:[],patches:new Map},g.patching.set(e,t)),t},f={unload:()=>u(g),hookFunction:(e,t,n)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);"number"!=typeof t&&o(`Mod ${i} failed to hook function '${e}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&o(`Mod ${i} failed to hook function '${e}': Expected hook function, got ${typeof n}`);const a={mod:g.name,priority:t,hook:n};return r.hooks.push(a),l(),()=>{const e=r.hooks.indexOf(a);e>=0&&(r.hooks.splice(e,1),l());}},patchFunction:(e,t)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);n(t)||o(`Mod ${i} failed to patch function '${e}': Expected patches object, got ${typeof t}`);for(const[n,a]of Object.entries(t))"string"==typeof a?r.patches.set(n,a):null===a?r.patches.delete(n):o(`Mod ${i} failed to patch function '${e}': Invalid format of patch '${n}'`);l();},removePatches:e=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);s(e).patches.clear(),l();},callOriginal:(e,t,n)=>(g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`),"string"==typeof e&&e||o(`Mod ${i} failed to call a function: Expected function name string, got ${typeof e}`),Array.isArray(t)||o(`Mod ${i} failed to call a function: Expected args array, got ${typeof t}`),function(e,o,t=window){return c(e).original.apply(t,o)}(e,t,n)),getOriginalHash:e=>("string"==typeof e&&e||o(`Mod ${i} failed to get hash: Expected function name string, got ${typeof e}`),c(e).originalHash)},g={name:e.name,fullName:e.fullName,version:e.version,repository:e.repository,allowReplace:a,api:f,loaded:!0,patching:new Map};return p.set(e.name,g),Object.freeze(f)}function h(){const e=[];for(const o of p.values())e.push({name:o.name,fullName:o.fullName,version:o.version,repository:o.repository});return e}let m;const y=function(){if(void 0===window.bcModSdk)return window.bcModSdk=function(){const o={version:e,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:f,errorReporterHooks:Object.seal({hookEnter:null,hookChainExit:null})};return m=o,Object.freeze(o)}();if(n(window.bcModSdk)||o("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&o(`Failed to init Mod SDK: Different version already loaded ('1.1.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==e&&(alert(`Mod SDK warning: Loading different but compatible versions ('1.1.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk.version.startsWith("1.0.")&&void 0===window.bcModSdk._shim10register)){const e=window.bcModSdk,o=Object.freeze(Object.assign(Object.assign({},e),{registerMod:(o,t,n)=>o&&"object"==typeof o&&"string"==typeof o.name&&"string"==typeof o.version?e.registerMod(o.name,o.version,"object"==typeof t&&!!t&&!0===t.allowReplace):e.registerMod(o,t,n),_shim10register:!0}));window.bcModSdk=o;}return window.bcModSdk}();return (Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y})();
} (bcmodsdk));
var bcMod = getDefaultExportFromCjs(bcmodsdk);

class DataManager {
    constructor() {
        this.initFromNoData = false;
        this.modData = {};
    }
    static init() {
        if (this._instance === undefined)
            this._instance = new DataManager;
    }
    static get instance() {
        this.init();
        return DataManager._instance;
    }
    static ValidateStringList(object, key) {
        if (object === undefined || !Array.isArray(object[key]))
            return [];
        return object[key].filter(_ => typeof _ === 'string');
    }
    static ValidatorItem(key) {
        return [key, (d) => DataManager.ValidateStringList(d, key)];
    }
    EncodeDataStr() {
        let data = {};
        for (const k in this.modData) {
            data[k] = this.modData[k];
        }
        return LZString.compressToBase64(JSON.stringify(data));
    }
    DecodeDataStr(str) {
        if (str === undefined) {
            Object.assign(this.modData, DataManager.DefaultValue);
            return;
        }
        let d = LZString.decompressFromBase64(str);
        let data = {};
        try {
            let decoded = JSON.parse(d);
            data = decoded;
        }
        catch { }
        DataManager.Validator.forEach((v, k) => {
            this.modData[k] = v(data);
        });
    }
    ServerStoreData() {
        if (Player && Player.OnlineSettings) {
            Player.OnlineSettings.BCResponsive = this.EncodeDataStr();
            if (ServerAccountUpdate) {
                ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
            }
        }
    }
    ServerTakeData() {
        if (Player && Player.OnlineSettings) {
            let rawData = Player.OnlineSettings.BCResponsive;
            if (rawData === undefined) {
                let oldData = Player.OnlineSettings;
                rawData = oldData.BCMoanerReloaded;
                if (rawData !== undefined)
                    delete oldData.BCMoanerReloaded;
            }
            this.DecodeDataStr(rawData);
        }
        if (this.mergeData !== undefined) {
            this.modData.settings = { enable: this.mergeData.settings.enable };
            if (this.initFromNoData) {
                const rkeys = ['low', 'light', 'medium', 'hot', 'orgasm', 'pain', 'tickle'];
                for (const t of rkeys) {
                    this.modData[t] = this.mergeData[t];
                }
                this.initFromNoData = false;
            }
            this.ServerStoreData();
        }
    }
    get data() {
        return this.modData;
    }
    set data(d) {
        this.modData = d;
    }
    PushMergeData(data) {
        this.mergeData = data;
        if (Player && Player.OnlineSettings)
            this.ServerTakeData();
    }
}
DataManager.DefaultValue = {
    settings: { enable: true },
    hot: ["n... Nyah♥", "Oooh", "mmmmmh!", "NYyaaA♥"],
    medium: ["mm", "aaaah", "nyAh♥"],
    light: ["nyah♥", "Aah!", "mh", "oh!♥", "mh♥"],
    low: ["", "", "mh", "♥oh♥", "ah", "...♥"],
    orgasm: ["Nya...Ny...NyaaAAaah!", "Mmmmh... MMmh... Hhhmmmm...", "Oooooh... Mmmmh... OooOOOOh!", "Mmmhnn... Nyhmm... Nyah!"],
    pain: ["Aie!", "Aoouch!", "Aaaaie!", "Ouch", "Aow"],
    tickle: ["Hahaha!", "Mmmmhahaha!", "Muhahah...", "Ha!Ha!"],
};
DataManager.Validator = new Map([
    ["settings", (d) => {
            if (d.settings === undefined || typeof d.settings.enable !== "boolean")
                return { enable: true };
            return d.settings;
        }],
    DataManager.ValidatorItem('low'),
    DataManager.ValidatorItem('light'),
    DataManager.ValidatorItem('medium'),
    DataManager.ValidatorItem('hot'),
    DataManager.ValidatorItem('pain'),
    DataManager.ValidatorItem('orgasm'),
    DataManager.ValidatorItem('tickle'),
]);

function ShuffleStr(src) {
    let temp = JSON.parse(JSON.stringify(src));
    let ret = [];
    while (temp.length > 0) {
        let d = Math.floor(Math.random() * temp.length);
        ret.push(temp[d]);
        temp.splice(d, 1);
    }
    return ret;
}
function ChatRoomSendAction(Content) {
    if (!Content || !Player || !Player.MemberNumber)
        return;
    ServerSend("ChatRoomChat", {
        Content: "Beep",
        Type: "Action",
        Dictionary: [
            { Tag: "Beep", Text: "msg" },
            { Tag: "Biep", Text: "msg" },
            { Tag: "Sonner", Text: "msg" },
            { Tag: "发送私聊", Text: "msg" },
            { Tag: "msg", Text: Content }
        ]
    });
}

function ActivityDeconstruct(dict) {
    let SourceCharacter, TargetCharacter, ActivityGroup, ActivityName;
    for (let v of dict) {
        if (v.hasOwnProperty('TargetCharacter')) {
            TargetCharacter = { MemberNumber: v['TargetCharacter'] };
        }
        else if (v.hasOwnProperty('SourceCharacter')) {
            SourceCharacter = { MemberNumber: v['SourceCharacter'] };
        }
        else if (v.hasOwnProperty('ActivityName')) {
            ActivityName = v['ActivityName'];
        }
        else if (v.hasOwnProperty('Tag') && v.Tag === 'FocusAssetGroup') {
            ActivityGroup = v['FocusGroupName'];
        }
    }
    if (SourceCharacter === undefined || TargetCharacter === undefined
        || ActivityGroup === undefined || ActivityName === undefined)
        return undefined;
    return { SourceCharacter, TargetCharacter, ActivityGroup, ActivityName };
}
function IsSimpleChat(msg) {
    return msg.trim().length > 0 && !msg.startsWith("/") && !msg.startsWith("(") && !msg.startsWith("*") && !msg.startsWith(".") && !msg.includes("'");
}
function ChatRoomInterceptMessage(cur_msg, msg) {
    if (!msg)
        return;
    ElementValue("InputChat", cur_msg + "... " + msg);
    ChatRoomSendChat();
}
function ChatRoomNormalMessage(msg) {
    if (!msg)
        return;
    let backupChatRoomTargetMemberNumber = ChatRoomTargetMemberNumber;
    ChatRoomTargetMemberNumber = null;
    let oldmsg = ElementValue("InputChat");
    ElementValue("InputChat", msg);
    ChatRoomSendChat();
    ElementValue("InputChat", oldmsg);
    ChatRoomTargetMemberNumber = backupChatRoomTargetMemberNumber;
}
function ChatRoomAutoInterceptMessage(cur_msg, msg) {
    if (msg.trimStart().startsWith(".a")) {
        if (IsSimpleChat(cur_msg) && ChatRoomTargetMemberNumber == null) {
            ElementValue("InputChat", cur_msg + "... ");
            ChatRoomSendChat();
        }
        msg = msg.trimStart();
        if (msg.startsWith(".action"))
            msg = msg.substring(7);
        else if (msg.startsWith(".a"))
            msg = msg.substring(2);
        ChatRoomSendAction(msg.trimStart());
    }
    else {
        if (IsSimpleChat(cur_msg) && ChatRoomTargetMemberNumber == null) {
            ChatRoomInterceptMessage(cur_msg, msg);
        }
        else {
            ChatRoomNormalMessage(msg);
        }
    }
}

function buildVersion(v1, v2, v3) {
    return `${v1}.${v2}.${v3}`;
}
var MoanType;
(function (MoanType) {
    MoanType[MoanType["Orgasm"] = 0] = "Orgasm";
    MoanType[MoanType["Pain"] = 1] = "Pain";
    MoanType[MoanType["Tickle"] = 2] = "Tickle";
})(MoanType || (MoanType = {}));
const ModVersion = buildVersion(0, 3, 5);
const ModName = 'BondageClub Responsive';

let ShiftingMoans = {
    hot: [],
    medium: [],
    light: [],
    low: [],
    orgasm: [],
    pain: [],
    tickle: [],
};
function NextMoanString(key) {
    if (ShiftingMoans[key].length === 0) {
        let r = DataManager.instance.data[key];
        if (r.length > 0)
            ShiftingMoans[key] = ShuffleStr(r);
    }
    if (ShiftingMoans[key].length > 0) {
        return ShiftingMoans[key].shift();
    }
    return '';
}
function TypedMoan(player, sender, t) {
    let k;
    if (t === MoanType.Orgasm)
        k = 'orgasm';
    else if (t === MoanType.Pain)
        k = 'pain';
    else if (t === MoanType.Tickle)
        k = 'tickle';
    if (!k)
        return '';
    return NextMoanString(k).replaceAll('MY_NAME', CharacterNickname(player)).replaceAll('SOURCE_NAME', CharacterNickname(sender));
}
function BaseMoan(player, Arousal, shift) {
    let factor = Math.floor(Arousal / 20);
    if (shift)
        factor -= shift;
    if (factor < 0)
        factor = 0;
    else if (factor > 5)
        factor = 5;
    const Tkeys = ['low', 'low', 'light', 'medium', 'hot', 'hot'];
    let k = Tkeys[factor];
    return NextMoanString(k).replaceAll('MY_NAME', CharacterNickname(player));
}
function MixMoan(player, sender, t, act) {
    let actFactor = player.ArousalSettings.Activity.find(_ => _.Name === act)?.Self;
    if (!actFactor)
        return '';
    let threthold1 = Math.max(10, (4 - actFactor) * 25);
    let threthold2 = threthold1 + 40;
    let arousal = player.ArousalSettings.Progress;
    let typed = TypedMoan(player, sender, t);
    let base = BaseMoan(player, arousal);
    if (arousal <= threthold1) {
        return typed;
    }
    else {
        let m = BaseMoan(player, arousal);
        if (!m)
            return typed;
        else {
            if (arousal <= threthold2)
                return typed + "♥" + base + "♥";
            else
                return "♥" + base + "♥";
        }
    }
}
function BaseMoanStepped(player, act) {
    let actFactor = player.ArousalSettings.Activity.find(_ => _.Name === act)?.Self;
    if (!actFactor)
        return '';
    let threthold1 = Math.max(10, (4 - actFactor) * 25);
    let threthold2 = threthold1 + 40;
    let arousal = player.ArousalSettings.Progress;
    if (arousal <= threthold1)
        return BaseMoan(player, arousal, 1);
    else if (arousal <= threthold2)
        return BaseMoan(player, arousal, 0);
    else
        return BaseMoan(player, arousal, -1);
}
function MasturbateMoan(player, sender, masturSrc) {
    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), BaseMoanStepped(player, masturSrc));
}
function PainMessage(player, sender, painSrc) {
    if (!DataManager.instance.data.pain)
        return;
    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), MixMoan(player, sender, MoanType.Pain, painSrc));
}
function OrgasmMessage(player, sender) {
    if (!DataManager.instance.data.orgasm)
        return;
    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), TypedMoan(player, sender, MoanType.Orgasm));
}
function TickleMessage(player, sender, tickleSrc) {
    if (!DataManager.instance.data.tickle)
        return;
    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), MixMoan(player, sender, MoanType.Tickle, tickleSrc));
}

const ActivityDict = new Map([
    ['Slap', (player, sender) => PainMessage(player, sender, 'Slap')],
    ['Bite', (player, sender) => PainMessage(player, sender, 'Bite')],
    ['Spank', (player, sender) => PainMessage(player, sender, 'Spank')],
    ['Kick', (player, sender) => PainMessage(player, sender, 'Kick')],
    ['Pinch', (player, sender) => PainMessage(player, sender, 'Pinch')],
    ['Tickle', (player, sender) => TickleMessage(player, sender, 'Tickle')],
    ['SpankItem', (player, sender) => PainMessage(player, sender, 'SpankItem')],
    ['TickleItem', (player, sender) => TickleMessage(player, sender, 'TickleItem')],
    ['MasturbateItem', (player, sender) => MasturbateMoan(player, sender, 'MasturbateItem')],
    ['ShockItem', (player, sender) => PainMessage(player, sender, 'ShockItem')],
    ['MasturbateHand', (player, sender) => MasturbateMoan(player, sender, 'MasturbateHand')],
    ['MasturbateFist', (player, sender) => MasturbateMoan(player, sender, 'MasturbateFist')],
    ['MasturbateFoot', (player, sender) => MasturbateMoan(player, sender, 'MasturbateFoot')],
    ['MasturbateTongue', (player, sender) => MasturbateMoan(player, sender, 'MasturbateTongue')],
]);
function ActivityHandle(player, sender, data) {
    if (!DataManager.instance.data.settings.enable)
        return;
    if (!data.Dictionary)
        return;
    let activityInfo = ActivityDeconstruct(data.Dictionary);
    if (activityInfo == undefined)
        return;
    if (activityInfo.TargetCharacter.MemberNumber !== player.MemberNumber)
        return;
    let f = ActivityDict.get(activityInfo.ActivityName);
    if (f !== undefined)
        f(player, sender);
}

class ChatMessageHandler {
    constructor() {
        this._handles = new Map();
    }
    Run(player, data) {
        if (player === undefined || player.MemberNumber === undefined)
            return;
        if (player.GhostList && player.GhostList.indexOf(data.Sender) >= 0)
            return;
        let sender = ChatRoomCharacter.find(c => c.MemberNumber == data.Sender);
        if (sender === undefined)
            return;
        let f = this._handles.get(data.Type);
        if (f)
            f.forEach(_ => player && sender && _(player, sender, data));
    }
    ;
    Register(type, handle) {
        let f = this._handles.get(type);
        if (!f) {
            this._handles.set(type, []);
            f = this._handles.get(type);
        }
        f.push(handle);
    }
}

class Localization {
    static GetText(srcTag) {
        if (TranslationLanguage === 'CN') {
            return this.CNTextMap.get(srcTag) || "";
        }
        return this.ENTextMap.get(srcTag) || "";
    }
}
Localization.CNTextMap = new Map([
    ["responsive_setting_title", "- BC Responsive 设置 -"],
    ["setting_button_popup", "BC Responsive 设置"],
    ["setting_enable", "启用 Responsive"],
    ["setting_title_low", "低性奋"],
    ["setting_title_light", "微弱性奋"],
    ["setting_title_medium", "中等性奋"],
    ["setting_title_hot", "热烈性奋"],
    ["setting_title_orgasm", "高潮"],
    ["setting_title_pain", "痛苦"],
    ["setting_title_tickle", "瘙痒"],
    ["setting_input_invalid", "格式错误"],
]);
Localization.ENTextMap = new Map([
    ["responsive_setting_title", "- BC Responsive Setting -"],
    ["setting_button_popup", "BC Responsive Setting"],
    ["setting_enable", "Enable Responsive"],
    ["setting_title_low", "Low"],
    ["setting_title_light", "Light"],
    ["setting_title_medium", "Medium"],
    ["setting_title_hot", "Hot"],
    ["setting_title_orgasm", "Orgasm"],
    ["setting_title_pain", "Pain"],
    ["setting_title_tickle", "Tickle"],
    ["setting_input_invalid", "Syntax Error"],
]);

class GUISettingScreen {
    Load() { }
    Run() { }
    Click() { }
    Exit() { setSubscreen(null); }
    Unload() { }
}
class GUIMainMenu extends GUISettingScreen {
    Run() {
        const data = DataManager.instance.data;
        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
        const titleBaseX = 400;
        const titleBaseY = 280;
        DrawText(Localization.GetText("responsive_setting_title"), titleBaseX, 125, "Black", "Gray");
        DrawText(`v${ModVersion}`, titleBaseX + 400, 125, "Black", "Gray");
        DrawCheckbox(titleBaseX, 160, 64, 64, Localization.GetText("setting_enable"), data.settings.enable);
        const inputBaseX = titleBaseX + 700;
        for (let i = 0; i < GUIMainMenu.keys.length; i++) {
            const k = GUIMainMenu.keys[i];
            const tY = titleBaseY + 90 * i;
            DrawText(Localization.GetText(`setting_title_${k}`), titleBaseX, tY, "Black", "Gray");
            let input = document.getElementById(GUIMainMenu.ElementID(k));
            if (!input) {
                input = ElementCreateInput(GUIMainMenu.ElementID(k), "text", GUIMainMenu.StringListShow(data[k]), "256");
            }
            if (input) {
                ElementPosition(GUIMainMenu.ElementID(k), inputBaseX, tY, 1000, 64);
                if (!GUIMainMenu.ValidateInput(input.value)) {
                    DrawText(Localization.GetText(`setting_input_invalid`), inputBaseX + 520, tY, "Red", "Gray");
                }
            }
        }
    }
    Click() {
        const data = DataManager.instance.data;
        if (MouseIn(1815, 75, 90, 90)) {
            for (let i = 0; i < GUIMainMenu.keys.length; i++) {
                const k = GUIMainMenu.keys[i];
                let input = document.getElementById(GUIMainMenu.ElementID(k));
                if (input) {
                    let newL = GUIMainMenu.ValidateInput(input.value);
                    if (newL)
                        DataManager.instance.data[k] = newL;
                }
            }
            DataManager.instance.ServerStoreData();
            this.Exit();
        }
        else if (MouseIn(400, 160, 64, 64)) {
            data.settings.enable = !data.settings.enable;
        }
    }
    Unload() {
        GUIMainMenu.keys.forEach(_ => ElementRemove(GUIMainMenu.ElementID(_)));
    }
}
GUIMainMenu.keys = ['low', 'light', 'medium', 'hot', 'orgasm', 'pain', 'tickle'];
GUIMainMenu.ElementID = (k) => `BCResponsive_Input${k}`;
GUIMainMenu.StringListShow = (p) => {
    if (p.length === 0)
        return "";
    let result = JSON.stringify(p);
    return result.substring(1, result.length - 1);
};
GUIMainMenu.ValidateInput = (input) => {
    let raw = `[${input}]`;
    const ValidateStringList = (input) => {
        if (!Array.isArray(input))
            return undefined;
        if (!input.every(_ => typeof _ === 'string'))
            return undefined;
        return input;
    };
    try {
        let d = JSON.parse(raw);
        return ValidateStringList(d);
    }
    catch {
        return undefined;
    }
};
function setSubscreen(subscreen) {
    if (GUISetting.instance) {
        GUISetting.instance.currentScreen = subscreen;
    }
}
class GUISetting {
    get currentScreen() {
        return this._currentScreen;
    }
    set currentScreen(subscreen) {
        if (this._currentScreen) {
            this._currentScreen.Unload();
        }
        this._currentScreen = subscreen;
        if (this._currentScreen) {
            this._currentScreen.Load();
        }
    }
    constructor() {
        this._currentScreen = null;
        GUISetting.instance = this;
    }
    load(mod) {
        mod.hookFunction("PreferenceRun", 10, (args, next) => {
            if (this._currentScreen) {
                MainCanvas.textAlign = "left";
                this._currentScreen.Run();
                MainCanvas.textAlign = "center";
                return;
            }
            next(args);
            if (PreferenceSubscreen === "")
                DrawButton(1815, 820, 90, 90, "", "White", "Icons/Arousal.png", Localization.GetText("setting_button_popup"));
        });
        mod.hookFunction("PreferenceClick", 10, (args, next) => {
            if (this._currentScreen) {
                this._currentScreen.Click();
                return;
            }
            if (MouseIn(1815, 820, 90, 90)) {
                this.currentScreen = new GUIMainMenu();
            }
            else {
                return next(args);
            }
        });
        mod.hookFunction("InformationSheetExit", 10, (args, next) => {
            if (this._currentScreen) {
                this._currentScreen.Exit();
                return;
            }
            return next(args);
        });
    }
}
GUISetting.instance = null;

(function () {
    if (window.BCResponsive_Loaded)
        return;
    let mod = bcMod.registerMod({ name: ModName, fullName: ModName, version: ModVersion, repository: 'https://gitlab.com/dynilath/BCResponsive' });
    window.BCResponsive_Loaded = false;
    const OrgasmHandle = (C) => {
        if (!DataManager.instance.data.settings.enable)
            return;
        if (CurrentScreen !== 'ChatRoom' || !Player)
            return;
        if (Player.MemberNumber !== C.MemberNumber)
            return;
        OrgasmMessage(Player, Player);
    };
    const chatMessageHandler = new ChatMessageHandler;
    mod.hookFunction('ChatRoomMessage', 9, (args, next) => {
        next(args);
        chatMessageHandler.Run(Player, args[0]);
    });
    mod.hookFunction('ActivityOrgasmStart', 9, (args, next) => {
        OrgasmHandle(args[0]);
        next(args);
    });
    chatMessageHandler.Register('Activity', ActivityHandle);
    const GUI = new GUISetting;
    GUI.load(mod);
    DataManager.init();
    function LoadAndMessage() {
        DataManager.instance.ServerTakeData();
        console.log(`${ModName} v${ModVersion} ready.`);
    }
    mod.hookFunction('LoginResponse', 0, (args, next) => {
        next(args);
        LoadAndMessage();
    });
    if (Player && Player.MemberNumber) {
        LoadAndMessage();
    }
    window.BCResponsive_Loaded = true;
    console.log(`${ModName} v${ModVersion} loaded.`);
})();