"use strict";(self.webpackChunkedh_builder=self.webpackChunkedh_builder||[]).push([[180],{1180:function(e,n,t){t.r(n);var a=t(3430),i=t(2791),r=(t(3303),t(184));n.default=function(){var e=(0,i.useState)(""),n=(0,a.Z)(e,2),t=n[0],s=n[1],u=(0,i.useState)(""),c=(0,a.Z)(u,2),l=c[0],o=c[1];return(0,r.jsx)("div",{className:"background",children:(0,r.jsx)("div",{className:" username-container",children:(0,r.jsxs)("form",{children:[(0,r.jsx)("h1",{children:"What is your account's email?"}),(0,r.jsx)("p",{style:{margin:"10px 0 10px 0"},children:"Enter your email and we will send you a password reset link."}),(0,r.jsx)("input",{onChange:function(e){return s(e.target.value)},value:t,type:"email",placeholder:"Email"}),(0,r.jsx)("p",{style:{margin:"10px 0 10px 0",color:l.startsWith("Please check")?"green":"red"},children:l}),(0,r.jsx)("input",{type:"submit",onClick:function(e){return function(e){e.preventDefault(),fetch("".concat("https://edh-builder-api.herokuapp.com","forgotpassword"),{method:"POST",headers:{"content-Type":"application/json"},body:JSON.stringify({email:t})}).then((function(e){return e.json()})).then((function(e){o(e)}))}(e)},className:"signin-button",value:"submit"})]})})})}},3303:function(){}}]);
//# sourceMappingURL=180.6e602572.chunk.js.map