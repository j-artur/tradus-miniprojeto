(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22c101"],{f243:function(e,t,a){"use strict";a.r(t);var n=a("7a23"),i={class:"wrapper"},r={class:"message"},s={class:"form-control"},c=Object(n["h"])("label",{for:"email"},"Email",-1);function u(e,t,a,u,m,o){return Object(n["q"])(),Object(n["d"])("div",i,[Object(n["h"])("form",{onSubmit:t[2]||(t[2]=function(){return e.submit&&e.submit.apply(e,arguments)})},[Object(n["h"])("span",r,Object(n["z"])(e.message),1),Object(n["h"])("div",s,[c,Object(n["E"])(Object(n["h"])("input",{required:"","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.email=t}),type:"email",id:"email",placeholder:"email@example.com"},null,512),[[n["B"],e.email]])]),Object(n["h"])("button",{type:"submit",disabled:e.submitting},Object(n["z"])(e.submitting?"Enviando email...":"Enviar email de recuperação"),9,["disabled"])],32)])}var m=a("1da1"),o=(a("96cf"),a("2948")),l=Object(n["i"])({name:"Login",data:function(){return{email:"",message:void 0,submitting:!1}},methods:{submit:function(e){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.preventDefault(),t.submitting=!0,t.message=void 0,a.next=5,o["a"].forgetPassword(t.email);case 5:n=a.sent,t.submitting=!1,t.message=n.error?n.error.message:n.message;case 8:case"end":return a.stop()}}),a)})))()}}});l.render=u;t["default"]=l}}]);
//# sourceMappingURL=chunk-2d22c101.393304d9.js.map