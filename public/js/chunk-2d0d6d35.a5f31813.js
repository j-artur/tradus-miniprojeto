(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d6d35"],{"73cf":function(e,t,a){"use strict";a.r(t);a("b0c0");var n=a("7a23"),r={class:"wrapper"},s={class:"message"},i={class:"form-control"},o=Object(n["h"])("label",{for:"name"},"Nome",-1),c={class:"form-control"},m=Object(n["h"])("label",{for:"email"},"Email",-1),u={class:"form-control"},l=Object(n["h"])("label",{for:"password"},"Senha",-1);function d(e,t,a,d,b,p){return Object(n["q"])(),Object(n["d"])("div",r,[Object(n["h"])("form",{onSubmit:t[4]||(t[4]=function(){return e.submit&&e.submit.apply(e,arguments)})},[Object(n["h"])("span",s,Object(n["z"])(e.message),1),Object(n["h"])("div",i,[o,Object(n["E"])(Object(n["h"])("input",{required:"","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.name=t}),type:"text",id:"name",placeholder:"nome"},null,512),[[n["B"],e.name]])]),Object(n["h"])("div",c,[m,Object(n["E"])(Object(n["h"])("input",{required:"","onUpdate:modelValue":t[2]||(t[2]=function(t){return e.email=t}),type:"email",id:"email",placeholder:"email@exemplo.com"},null,512),[[n["B"],e.email]])]),Object(n["h"])("div",u,[l,Object(n["E"])(Object(n["h"])("input",{required:"","onUpdate:modelValue":t[3]||(t[3]=function(t){return e.password=t}),type:"password",id:"password",placeholder:"senha"},null,512),[[n["B"],e.password]])]),Object(n["h"])("button",{type:"submit",disabled:e.submitting},Object(n["z"])(e.submitting?"Registrando...":"Registrar"),9,["disabled"])],32)])}var b=a("1da1"),p=(a("96cf"),a("2948")),h=Object(n["i"])({name:"Login",data:function(){return{name:"",email:"",password:"",message:void 0,submitting:!1}},methods:{submit:function(e){var t=this;return Object(b["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.preventDefault(),t.submitting=!0,t.message=void 0,a.next=5,p["a"].register({name:t.name,email:t.email,password:t.password});case 5:n=a.sent,t.submitting=!1,t.message=n.error?n.error.message:n.message;case 8:case"end":return a.stop()}}),a)})))()}}});h.render=d;t["default"]=h}}]);
//# sourceMappingURL=chunk-2d0d6d35.a5f31813.js.map