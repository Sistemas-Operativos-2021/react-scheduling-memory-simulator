(this["webpackJsonpscheduling-memory-simulator"]=this["webpackJsonpscheduling-memory-simulator"]||[]).push([[0],{92:function(e,t,i){},99:function(e,t,i){"use strict";i.r(t);var n,a=i(0),r=i.n(a),c=i(30),l=i.n(c),s=(i(92),i(69)),o=i(14),j=i(31),d=i(13),b=i(147),u=i(146),x=i(148),m=i(144),p=i(143),h=i(149),O=i(142),f=i(152),g=i(155),v=i(154),M=i(150),I=i(153),_=i(156),w=i(141),S=i(151),y=i(32),z=i(145),T=i(135),B=i(2),D=Object(T.a)("input")(n||(n=Object(y.a)(["\n  font-size: 1rem;\n  font-family: IBM Plex Sans, sans-serif;\n  font-weight: 400;\n  line-height: 1.4375em;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 10px;\n  padding: 6px 10px;\n  color: #20262d;\n  text-align: center;\n  width: 100%;\n  &:focus {\n    outline: none;\n  }\n"]))),L=a.forwardRef((function(e,t){return Object(B.jsx)(z.a,Object(j.a)(Object(j.a)({components:{Input:D}},e),{},{ref:t}))}));function P(e){var t=e.placeholder,i=e.value;return Object(B.jsx)(L,{"aria-label":"Demo input",placeholder:t,value:i})}var C=Object(O.a)({inputValue:{textAlign:"right"}});function k(e){var t=e.items,i=void 0===t?[]:t,n=C();return Object(B.jsx)(M.a,{component:S.a,children:Object(B.jsxs)(f.a,{sx:{minWidth:650,overflow:"hidden"},"aria-label":"simple table",children:[Object(B.jsx)(I.a,{children:Object(B.jsxs)(_.a,{children:[Object(B.jsx)(v.a,{children:"Proceso ID"}),Object(B.jsx)(v.a,{align:"center",children:"Tiempo de arribo (\u03bcs)"}),Object(B.jsx)(v.a,{align:"center",children:"Tiempo de irrupci\xf3n (\u03bcs)"}),Object(B.jsx)(v.a,{align:"center",children:"Tama\xf1o (MB)"})]})}),Object(B.jsx)(g.a,{children:i.map((function(e,t){return Object(B.jsxs)(_.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(B.jsx)(v.a,{component:"th",scope:"row",children:t}),Object(B.jsx)(w.a,{title:"Ingrese el tiempo en el que el proceso llega al sistema.",children:Object(B.jsx)(v.a,{align:"center",children:Object(B.jsx)(P,{classes:n.inputValue,placeholder:e.arrival_time,value:e.arrival_time})})}),Object(B.jsx)(w.a,{title:"Ingrese el tiempo en el que el proceso abandona al sistema.",children:Object(B.jsx)(v.a,{align:"center",children:Object(B.jsx)(P,{classes:n.inputValue,placeholder:e.irruption_time,value:e.irruption_time})})}),Object(B.jsx)(w.a,{title:"Ingrese el espacio en memoria que el proceso ocupar\xe1.",children:Object(B.jsx)(v.a,{align:"center",children:Object(B.jsx)(P,{classes:n.inputValue,placeholder:e.size,value:e.size})})})]},e.id)}))})]})})}var F=Object(O.a)({inputValue:{textAlign:"right"}});function N(e){var t=e.items,i=void 0===t?[]:t;F();return Object(B.jsx)(M.a,{component:S.a,children:Object(B.jsxs)(f.a,{sx:{minWidth:650,overflow:"hidden"},"aria-label":"simple table",children:[Object(B.jsx)(I.a,{children:Object(B.jsxs)(_.a,{children:[Object(B.jsx)(v.a,{children:"Nombre Partici\xf3n"}),Object(B.jsx)(v.a,{align:"center",children:"Tama\xf1o total (MB)"})]})}),Object(B.jsx)(g.a,{children:i.map((function(e){return Object(B.jsxs)(_.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(B.jsx)(v.a,{component:"th",scope:"row",children:e.name}),Object(B.jsxs)(v.a,{align:"center",component:"th",scope:"row",children:[e.size,"MB"]})]},e.name)}))})]})})}var V=Object(O.a)({root:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",marginTop:"5rem"},content:{display:"flex",flexDirection:"column",height:"25%"},stepLabel:{"& .MuiStepLabel-label.Mui-active":{color:"rgba(0, 0, 0, 0.87)"},"& .MuiStepLabel-label.Mui-disabled":{color:"rgba(0, 0, 0, 0.87)",opacity:.7},"& .MuiStepLabel-label.Mui-alternativeLabel":{color:"rgba(0, 0, 0, 0.87)"},"& .MuiStepLabel-label.Mui-completed":{color:"rgba(0, 0, 0, 0.87)"}}}),q=["Ingresar procesos","Corroborar memoria"];function A(){var e=V(),t=a.useState(0),i=Object(d.a)(t,2),n=i[0],r=i[1],c=function(){r((function(e){return e+1}))},l=function(){r((function(e){return e-1}))},s=function(){return Object(B.jsxs)(b.a,{sx:{display:"flex",flexDirection:"row",pt:2},children:[Object(B.jsx)(p.a,{className:e.button,color:"primary",disabled:0===n,onClick:l,children:"Back"}),Object(B.jsx)(b.a,{sx:{flex:"1 1 auto"}}),Object(B.jsx)(p.a,{onClick:c,children:n===q.length-1?"Finish":"Next"})]})};return Object(B.jsx)("div",{className:e.root,children:Object(B.jsxs)("div",{className:e.content,children:[Object(B.jsx)(u.a,{activeStep:n,children:q.map((function(t,i){return Object(B.jsx)(x.a,Object(j.a)(Object(j.a)({},{}),{},{children:Object(B.jsx)(m.a,Object(j.a)(Object(j.a)({className:e.stepLabel},{}),{},{children:t}))}),t)}))}),n===q.length?Object(B.jsxs)(a.Fragment,{children:[Object(B.jsx)(h.a,{sx:{mt:2,mb:1},children:"Aca pondr\xeda un simulador si tan solo tuviera uno"}),Object(B.jsxs)(b.a,{sx:{display:"flex",flexDirection:"row",pt:2},children:[Object(B.jsx)(b.a,{sx:{flex:"1 1 auto"}}),Object(B.jsx)(p.a,{onClick:function(){r(0)},children:"Reset"})]})]}):Object(B.jsxs)(a.Fragment,{children:[Object(B.jsxs)(b.a,{sx:{display:"flex",flexDirection:"column",pt:2,maxHeight:"40rem"},children:[0===n&&Object(B.jsx)(k,{titles:["Proceso ID","Tiempo de arribo (\u03bcs)","Tiempo de irrupci\xf3n (\u03bcs)\t","Tama\xf1o (MB)"],items:[{id:1,arrival_time:0,irruption_time:10,size:100},{id:2,arrival_time:0,irruption_time:2,size:100},{id:3,arrival_time:0,irruption_time:1,size:100},{id:4,arrival_time:1,irruption_time:5,size:150},{id:5,arrival_time:2,irruption_time:4,size:250}]}),1===n&&Object(B.jsx)(N,{titles:["Nombre particion","Tama\xf1o"],items:[{name:"Small",usedSpace:0,size:60,isInUse:!1,idProcess:null},{name:"Medium",usedSpace:0,size:120,isInUse:!1,idProcess:null},{name:"Big",usedSpace:0,size:250,isInUse:!1,idProcess:null}]})]}),Object(B.jsx)(s,{})]})]})})}function U(){return Object(B.jsx)(s.a,{children:Object(B.jsx)(o.c,{children:Object(B.jsx)(o.a,{path:"/",children:Object(B.jsx)(A,{})})})})}var J=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,157)).then((function(t){var i=t.getCLS,n=t.getFID,a=t.getFCP,r=t.getLCP,c=t.getTTFB;i(e),n(e),a(e),r(e),c(e)}))};l.a.render(Object(B.jsx)(r.a.StrictMode,{children:Object(B.jsx)(U,{})}),document.getElementById("root")),J()}},[[99,1,2]]]);
//# sourceMappingURL=main.264ee170.chunk.js.map