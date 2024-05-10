"use strict";(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[6631],{49555:(e,l,a)=>{a.d(l,{r:()=>_});var i=a(72791),t=a(39159),n=a(96067),s=a(84271),o=a(59153),d=a(89366),r=a(58728),c=a(87311),u=a(68405),v=a(59434),m=a(55886),h=a(67521),x=a(13524),p=(a(42822),a(45629)),g=a(14565),f=a(60070),b=a(76033),j=a(80925),y=a(43504),S=a(80184);const _=e=>{var l,a;let{show:_,handleClose:N,getList:w,preData:C}=e;const[Z,M]=(0,i.useState)(null===C||void 0===C?void 0:C.first_name),[D,k]=(0,i.useState)(null===C||void 0===C?void 0:C.last_name),[E,P]=(0,i.useState)(null===C||void 0===C?void 0:C.mobile_no),[L,W]=(0,i.useState)(null===C||void 0===C?void 0:C.comments),[Y,z]=(0,i.useState)(null===C||void 0===C?void 0:C.state_id),[F,q]=(0,i.useState)(null===C||void 0===C?void 0:C.email),[A,B]=(0,i.useState)(!1),[R,T]=(0,i.useState)(r.Lc),G=(0,v.v9)(u.yV),H=(0,i.useRef)(!0),U=(0,v.v9)(h.oB),V="".concat(window.location.origin,"/referral?user_id=").concat(null===G||void 0===G?void 0:G.id);var I={first_name:Z,last_name:D,email:F,mobile_no:(0,c.eS)(E),state_id:Y,comments:L,status:x.PE.followUp,action_status:" Schedule Interview",reporting_manager_id:null!==G&&void 0!==G&&G.is_manager?null===G||void 0===G?void 0:G.id:null!==(l=null===G||void 0===G?void 0:G.manager_id)&&void 0!==l?l:null===G||void 0===G?void 0:G.id};(0,i.useEffect)((()=>{H.current&&(H.current=!1)}),[Z,D,F]);const K=()=>{const e=(0,r.rN)(I);return T(e),(0,c.$V)(e)},$=e=>{e.preventDefault(),K()&&(B(!0),J())},J=()=>{(0,t.T$G)(I).then((e=>{n.Z.success("Referral created Successfully"),w(),N()})).catch((e=>{n.Z.error((0,c.oN)(e))})).finally((()=>{B(!1)}))},O=e=>{e.preventDefault();var l={first_name:Z,last_name:D,email:F,mobile_no:(0,c.eS)(E),state_id:Y,comments:L,status:null===C||void 0===C?void 0:C.status,reporting_manager_id:null===C||void 0===C?void 0:C.recruiter_id};K()&&(B(!0),(0,t.lwd)(null===C||void 0===C?void 0:C.id,l).then((e=>{n.Z.success("Updated Successfully"),w(),N()})).finally((()=>{B(!1)})))},[Q,X]=(0,i.useState)([]);return(0,i.useEffect)((function(){(0,t.$B6)().then((e=>{X(e.data)})).catch((e=>{X([])}))}),[]),(0,S.jsxs)(p.Z,{show:_,onHide:N,title:C?"Update Lead":"Add New Lead",maxWidth:"750",children:[(0,S.jsx)(m.Z,{visible:A,full:!0,size:100}),(0,S.jsxs)("div",{className:"bg-cmGrey100 d-flex align-items-start justify-content-center flex-wrap gap-5 p-5 mx-sm-20 mx-10 mb-5",style:{borderRadius:"10px",fontFamily:f.t.manrope},children:[(0,S.jsx)("div",{style:{height:"147px",width:"146px"},className:"bg-cmwhite rounded p-3 shadow",children:(0,S.jsx)(j.ZP,{value:V,className:"w-100 h-100"})}),(0,S.jsxs)("div",{className:"card p-0 bg-transparent w-sm-50",children:[(0,S.jsxs)("div",{className:"card-body p-0",children:[(0,S.jsx)("div",{className:"card-title text-cmGrey900",style:{fontSize:"14px",fontWeight:600},children:"Your Referral Code"}),(0,S.jsx)("div",{className:"text-cmGrey600",style:{fontSize:"11px",fontWeight:600,lineHeight:"16px"},children:"Streamline the lead generation process by quickly sharing the link, to input valuable leads."})]}),(0,S.jsxs)("div",{className:"card-footer pb-0 px-0 ",style:{fontSize:"11px",fontWeight:500},children:[(0,S.jsx)(y.rU,{className:"text-decoration-underline cursor-pointer mb-2 text-cmGrey800",to:"/referral?user_id=".concat(null===G||void 0===G?void 0:G.id),target:"_blank",children:V}),(0,S.jsxs)("div",{className:"d-flex align-items-center gap-3",children:[(0,S.jsx)(b.D8,{onClick:()=>{navigator.clipboard.writeText(V),n.Z.success("Link Copied")},path:"/media/icons/duotune/art/CopyButtonSVG.svg",svgClassName:"h-35px w-35px cursor-pointer"}),(0,S.jsx)(d.u,{data:{text:"Sequifi | Referral",url:V,title:"Sequifi"},children:(0,S.jsx)(b.D8,{path:"/media/icons/duotune/art/ButtonEdit.svg",svgClassName:"h-35px w-35px cursor-pointer"})})]})]})]})]}),(0,S.jsx)("div",{className:"text-cmGrey600 text-center mb-5",style:{fontWeight:"600",fontSize:"12px"},children:"Or add Manually"}),(0,S.jsxs)("form",{className:"w-sm-75 mx-auto mb-10 overflow-hidden",onSubmit:C?O:$,children:[(0,S.jsxs)("div",{className:"px-15 mb-10",style:{fontFamily:"Manrope",fontSize:"14px"},children:[(0,S.jsxs)("div",{className:"row mb-5",children:[(0,S.jsx)("div",{className:"col-sm",children:(0,S.jsx)(s.ZP,{label:"First Name",required:!0,placeholder:"Enter First Name",onChange:e=>{M(e.target.value)},errorMessage:null===R||void 0===R?void 0:R.firstName,value:Z,rejex:/^[\w\-\s]+$/})}),(0,S.jsx)("div",{className:"col-sm",children:(0,S.jsx)(s.ZP,{label:"Last Name",required:!0,placeholder:"Enter Last Name",onChange:e=>{k(e.target.value)},errorMessage:null===R||void 0===R?void 0:R.lastName,value:D,rejex:/^[\w\-\s]+$/})})]}),(0,S.jsx)("div",{className:"",children:(0,S.jsx)("div",{className:"mb-5",children:(0,S.jsx)(s.ZP,{label:"Email",required:!0,placeholder:"Enter Email",onChange:e=>{q(e.target.value)},errorMessage:null===R||void 0===R?void 0:R.email,value:F,type:s.rC.email})})}),(0,S.jsx)("div",{className:"",children:(0,S.jsx)("div",{className:"mb-5",children:(0,S.jsx)(s.ZP,{label:"Phone Number",value:E,onChange:e=>P(e.target.value),placeholder:"Enter Contact Number",type:s.rC.mobile})})}),(0,S.jsx)("div",{className:"mb-5",children:(0,S.jsx)(o.Z,{label:"Current (Home Location of the candidate)",valueKey:"id",options:U,value:Y,onChange:e=>z(e.target.value),errorMessage:""})}),(0,S.jsx)("div",{className:"",children:(0,S.jsx)("div",{className:"mb-5",children:(0,S.jsx)(s.ZP,{label:"Reporting Manager",placeholder:null!==G&&void 0!==G&&G.is_manager?"".concat(null===G||void 0===G?void 0:G.first_name," ").concat(null===G||void 0===G?void 0:G.last_name):null!==(a=null===G||void 0===G?void 0:G.manager_name)&&void 0!==a?a:(null===G||void 0===G?void 0:G.first_name)+(null===G||void 0===G?void 0:G.last_name),disabled:!0})})}),(0,S.jsx)("div",{className:"",children:C?(0,S.jsx)(S.Fragment,{}):(0,S.jsx)("div",{className:"",children:(0,S.jsx)(s.ZP,{label:"Comments",placeholder:"Add Comments",type:s.rC.textarea,onChange:e=>{W(e.target.value)},value:L})})})]}),(0,S.jsx)("div",{className:"d-flex mx-auto justify-content-center align-items-center",children:(0,S.jsx)(g.ZP,{disabled:A,buttonType:g.JB.primary,padding:"px-20",buttonLabel:C?"Update":"Submit",onClick:e=>C?O(e):$(e)})})]})]})}},46606:(e,l,a)=>{a.d(l,{q:()=>g});var i=a(72791),t=(a(54164),a(38202)),n=a(59153),s=a(13524),o=a(39159),d=a(55886),r=a(59434),c=a(68405),u=a(58728),v=a(87311),m=a(96067),h=a(14565),x=a(45629),p=a(80184);document.getElementById("root-modals")||document.body;const g=e=>{var l,a;let{show:g,handleClose:f,userData:b,getHiringList:j=(()=>{}),changeStatus:y}=e;const[S,_]=(0,i.useState)(null),[N,w]=(0,i.useState)(""),[C,Z]=(0,i.useState)(""),[M,D]=(0,i.useState)([]),[k,E]=(0,i.useState)(!1),[P,L]=(0,i.useState)(!1),[W,Y]=(0,i.useState)(u.sQ),z=(0,r.v9)(c.yV),[F,q]=(0,i.useState)(null===z||void 0===z?void 0:z.id),A=e=>{const l={lead_id:null===b||void 0===b?void 0:b.id,user_id:null===z||void 0===z?void 0:z.id,date:(0,s.Kj)(N,"YYYY-MM-DD"),schedule:C},a=(0,u.z8)(l);Y(a),(0,v.$V)(a)&&(E(!0),(0,o.CrC)(l).then((()=>{m.Z.success("Interview Scheduled"),f(),j(),y(null!==b&&void 0!==b&&b.interview_time?s.PE.interviewRescheduled:s.PE.interviewScheduled)})).catch((e=>{m.Z.error((0,v.oN)(e))})).finally((()=>{E(!1)})))},B=(0,i.useMemo)((()=>{const e=[{name:"".concat(null===z||void 0===z?void 0:z.first_name," ").concat(null===z||void 0===z?void 0:z.last_name,"(Me)"),id:null===z||void 0===z?void 0:z.id}];var l,a;null!==z&&void 0!==z&&z.is_manager||e.push({name:"".concat(null===b||void 0===b||null===(l=b.reporting_manager)||void 0===l?void 0:l.first_name," ").concat(null===b||void 0===b||null===(a=b.reporting_manager)||void 0===a?void 0:a.last_name," (Reporting Manager)"),id:null===b||void 0===b?void 0:b.reporting_manager_id});return e}),[null===z||void 0===z?void 0:z.first_name,null===z||void 0===z?void 0:z.id,null===z||void 0===z?void 0:z.is_manager,null===z||void 0===z?void 0:z.last_name,null===b||void 0===b||null===(l=b.reporting_manager)||void 0===l?void 0:l.first_name,null===b||void 0===b||null===(a=b.reporting_manager)||void 0===a?void 0:a.last_name,null===b||void 0===b?void 0:b.reporting_manager_id]),R=(0,i.useMemo)((()=>B.find((e=>(null===e||void 0===e?void 0:e.id)==F))),[B,F]);return(0,p.jsx)(x.Z,{show:g,onHide:f,title:"Schedule Interview",maxWidth:"600",children:(0,p.jsxs)("div",{className:"",style:{position:"relative"},children:[(0,p.jsx)(d.Z,{full:!0,visible:k}),(0,p.jsx)("form",{onSubmit:A,children:(0,p.jsxs)("div",{className:"modal-body py-sm-5  px-10",style:{fontFamily:"Manrope",fontSize:"14px"},children:[(0,p.jsx)("div",{className:"mb-5",children:(0,p.jsx)(n.Z,{valueKey:"id",label:"Who will take interview ?",required:!0,showClear:!1,options:B,value:F,onChange:e=>{var l;q(null===e||void 0===e||null===(l=e.target)||void 0===l?void 0:l.value),w(null),_(null),Z(null)},placeholder:"Who will take interview"})}),(0,p.jsx)("div",{className:"mb-5",children:(0,p.jsx)(t.Z,{label:"Date",required:!0,placeholder:"Interview date",value:null,onChange:e=>{(e=>{L(!0);const l=(0,s.Kj)(new Date,"YYYY-MM-DD"),a=(0,s.Kj)(e,"YYYY-MM-DD"),i={user_id:null===R||void 0===R?void 0:R.id,date:a};(0,o.ka6)(i).then((e=>{var i,t,n;let s=(null===e||void 0===e||null===(i=e.data)||void 0===i?void 0:i.length)>0?null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.map((e=>({value:e}))):[];var o,d,r;l==a?(s=null===(o=s)||void 0===o?void 0:o.filter((e=>{var a,i;const t=null===e||void 0===e||null===(a=e.value.split(" - "))||void 0===a||null===(i=a[1])||void 0===i?void 0:i.replace("PM"," PM").replace("AM"," AM");return new Date("".concat(l," ").concat(t))>new Date})),D(null!==(d=s)&&void 0!==d?d:[])):D(null!==(r=s)&&void 0!==r?r:[]),D(null!==(n=s)&&void 0!==n?n:[])})).finally((()=>L(!1))),w(a)})(e.target.value),_(null)},className:"w-100",errorMessage:null===W||void 0===W?void 0:W.interviewDate,minDate:new Date})}),(0,p.jsx)("div",{className:"mb-5",children:(0,p.jsx)(n.Z,{label:"Time Slot",required:!0,options:M,value:S,displayKey:"value",onChange:e=>{_(e.target.value),Z(e.target.value)},placeholder:P?"Loading...":(null===M||void 0===M?void 0:M.length)>0?"Select Time Slot":"No Time Slot Available",errorMessage:null===W||void 0===W?void 0:W.interviewSlot})}),(0,p.jsx)("div",{className:"text-center",children:(0,p.jsx)(h.ZP,{buttonType:h.JB.primary,buttonLabel:"Schedule",onClick:e=>(e=>{e.preventDefault(),A()})(e)})})]})})]})})}},8299:(e,l,a)=>{a.d(l,{m:()=>c});var i=a(39159),t=a(96067),n=a(72791),s=a(55886),o=a(45629),d=a(87311),r=a(80184);const c=e=>{let{show:l,handleClose:a,id:c}=e;const[u,v]=(0,n.useState)(!1);return(0,r.jsxs)(o.Z,{show:l,onHide:a,title:"Are you sure want to hire ?",maxWidth:"1000",children:[(0,r.jsx)(s.Z,{visible:u,full:!0}),(0,r.jsx)("div",{className:"modal-body py-lg-5  p-15 ",style:{fontFamily:"Manrope",fontSize:"14px"},children:(0,r.jsx)("div",{className:"mb-5",children:(0,r.jsx)("h2",{style:{fontSize:"17px",color:"#212121",fontFamily:"Manrope",fontWeight:"700",marginLeft:"5px",textAlign:"center"},children:"This action will send credential to a new user on their mail."})})}),(0,r.jsx)("button",{className:"d-flex mx-auto justify-content-center align-items-center mb-10 cursor-pointer border-0 px-10 py-2 bg-cmBlue-Crayola text-cmwhite",style:{borderRadius:"6px",fontSize:"16px",fontWeight:"700"},onClick:()=>{v(!0),(0,i.jYB)(c).then((()=>{a("done"),t.Z.success("User hired and credentials sent to their mail")})).catch((e=>{t.Z.error((0,d.oN)(e))})).finally((()=>{v(!1)}))},children:"Send Credential"})]})}},39033:(e,l,a)=>{a.d(l,{l:()=>m});var i=a(72791),t=a(46012),n=a(39159),s=a(96067),o=a(16871),d=a(55886),r=a(87311),c=a(45629),u=a(14565),v=a(80184);const m=e=>{let{show:l,handleClose:a,leadId:m,handleSchedule:h,setLoading:x}=e;const[p,g]=(0,i.useState)(null),[f,b]=(0,i.useState)(""),[j,y]=(0,i.useState)(!1),S=((0,o.s0)(),(0,i.useCallback)((e=>new Promise((l=>{(0,n.TjC)(e).then((e=>{var a;const i=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.map((e=>({...e,name:"".concat(null===e||void 0===e?void 0:e.first_name," ").concat(null===e||void 0===e?void 0:e.last_name)})));l(i)})).catch((()=>{l([])}))}))),[])),_=(0,i.useCallback)((e=>{g(e)}),[]);return(0,v.jsxs)(c.Z,{show:l,onHide:a,maxWidth:"600",title:"Assign",children:[(0,v.jsx)(d.Z,{full:!0,visible:j}),(0,v.jsx)("form",{onSubmit:h,children:(0,v.jsxs)("div",{className:"modal-body pt-lg-5 pb-lg-20  p-15  ",style:{fontFamily:"Manrope",fontSize:"14px"},children:[(0,v.jsxs)("div",{className:"mb-5",children:[(0,v.jsx)("label",{className:"form-label",style:{fontWeight:"600"},children:"Employee"}),(0,v.jsx)(t.Z,{placeholder:"Search an Employee",onSearch:S,onSelectValue:_,selectedValue:null===p||void 0===p?void 0:p.name,style:{border:f?"1px solid #FF0000":"1px solid #D8D8D8",borderRadius:"10px",fontWeight:500}}),f&&(0,v.jsx)("div",{className:"h-20px",children:(0,v.jsx)("small",{id:"",className:"text-cmError block",children:f})})]}),(0,v.jsx)("div",{className:"text-center",children:(0,v.jsx)(u.ZP,{buttonType:u.JB.primary,buttonLabel:"Assign",onClick:e=>(e=>{e.preventDefault();const l={lead_id:m,transfer_to_user_id:null===p||void 0===p?void 0:p.id};if(!l.transfer_to_user_id)return b("Select Employee");y(!0),(0,n.UnW)(l).then((()=>{b(""),a()})).catch((e=>{s.Z.error((0,r.oN)(e))})).finally((()=>s.Z.success("Assigned")))})(e)})})]})})]})}}}]);
//# sourceMappingURL=6631.145dc8bc.chunk.js.map