"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const o=require("solid-js/web"),c=require("@opencode/plugin/gui"),d=require("solid-js"),m=require("effect"),g=require("node:os"),u=c.Ipc.define({id:"opencode-footer.home",methods:{read:{output:m.Schema.String}}}),x=t=>{t.provide(u,{read:()=>g.homedir()})};var b=o.template('<div class=opencode-footer><span class=opencode-footer__dot></span><span class="opencode-footer__text opencode-footer__name">'),p=o.template("<span class=opencode-footer__separator>·"),w=o.template('<span class="opencode-footer__text opencode-footer__path">'),y=o.template('<span class="opencode-footer__text opencode-footer__branch">');const S=`
  .opencode-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    /*
     * The composer dock above ends with a 12px inset, but the window edge reads as extra space below the
     * text, so a slightly smaller bottom inset keeps the text visually centered.
     */
    padding: 0 12px 8px;
    font-size: 11px;
    line-height: 16px;
    color: var(--v2-text-text-faint);
  }
  .opencode-footer__dot {
    flex: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--v2-text-text-faint);
  }
  .opencode-footer__dot[data-connected="true"] {
    background: var(--v2-state-fg-success);
  }
  .opencode-footer__text {
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .opencode-footer__name {
    color: var(--v2-text-text-muted);
  }
  .opencode-footer__path {
    max-width: 36vw;
  }
  .opencode-footer__branch {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--v2-text-text-weak);
  }
  .opencode-footer__separator {
    flex: none;
    color: var(--v2-text-text-faint);
    opacity: 0.6;
  }
`;function $(t,s){return s&&(t===s||t.startsWith(`${s}/`))?`~${t.slice(s.length)}`:t}const q=c.Plugin.define({i18n:{en:{connected:"Connected",disconnected:"Disconnected"},zh:{connected:"已连接",disconnected:"未连接"}},setup(t){const[s,v]=d.createSignal("");t.main(u).read().then(v,()=>{}),c.createKeyed(()=>{const e=t.sessions.current();return e?{data:e.server.data,directory:e.directory}:void 0},e=>{e.data.location.vcs.sync({directory:e.directory}).catch(()=>{})},{equals:(e,a)=>e.data===a.data&&e.directory===a.directory});const i=()=>t.sessions.current()?.server??t.servers.get("sidecar"),f=()=>{const e=t.sessions.current();return e?$(e.directory,s()):void 0},_=()=>{const e=t.sessions.current();return e?e.server.data.location.vcs.info({directory:e.directory})?.branch.current:void 0};t.add(c.Style,S),t.add(c.Slot,{at:"window.bottom",render:()=>(()=>{var e=b(),a=e.firstChild,h=a.nextSibling;return o.insert(h,()=>i()?.name??"opencode"),o.insert(e,o.createComponent(d.Show,{get when(){return f()},children:n=>[p(),(()=>{var r=w();return o.insert(r,n),r})()]}),null),o.insert(e,o.createComponent(d.Show,{get when(){return _()},children:n=>[p(),(()=>{var r=y();return o.insert(r,o.createComponent(t.ui.Icon,{name:"branch",size:"small"}),null),o.insert(r,n,null),r})()]}),null),o.effect(n=>{var r=i()?.connected?"true":"false",l=t.t(i()?.connected?"connected":"disconnected");return r!==n.e&&o.setAttribute(a,"data-connected",n.e=r),l!==n.t&&o.setAttribute(a,"aria-label",n.t=l),n},{e:void 0,t:void 0}),e})()})},main:x});exports.default=q;
