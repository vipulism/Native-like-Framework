var body,bodyH,swipe,swipeH,drawer,drawerH,drawerDimm,drawerDimmH,navToggle,viewContent,burger,burgerTop,burgerBottom,topbar,topbarH,refEl,toast,toastH,menu,menuContent;angular.module("nlFramework",[]).factory("$nlFramework",["$nlConfig","$nlDrawer","$nlBurger","$nlRefresh","$nlToast","$nlMenu",function(t,e,n,o,i,r){var s={drawer:e,burger:n,refresh:o,toast:i,menu:r,config:t};return s}]).factory("$nlConfig",function(){return{openned:!1,plusActive:!1,holdPos:null,reverse:!1,scroll:{},nlRefresh:{},options:{maxWidth:300,topBarHeight:56,speed:.2,animation:"ease",modifyViewContent:!0,useActionButton:!0,refresh:{activeColor:"#558844",defaultColor:"#aa3344"},burger:{endY:6,startScale:1,endScale:.7}}}}).factory("$nlHelpers",function(){return{translate:function(t,e,n,o,i,r,s,a,l,d,c){var e=e||0,o=o||0,n=n||"",i=i||"",s=s||"",a=a||!1,u=t;l="nlRefresh"===u.id?l?"scale3d("+l+","+l+",1)":"scale3d(1,1,1)":l?"scale3d("+l+",1,1)":"","burger-top"===u.id?u.style.transformOrigin="100% 100%":"burger-bottom"===u.id&&(u.style.transformOrigin="100% 0%"),u.style.transform="translate3d("+n+e+"px, "+i+o+"px, 0) rotate3d( 0, 0, 1, "+s+r+"deg ) "+l,u.style.webkitTransform="translate("+n+e+"px, "+i+o+"px) translateZ(0) rotate("+s+r+"deg) "+l,a&&(u.style.width=a+"px"),c&&(u.style.opacity=c),a&&(u.style["max-width"]=a+"px"),d&&(u.style.msTransform=u.style.MozTransform=u.style.OTransform="translateX("+n+e+"px) translateY("+i+o+"px) rotate("+s+r+"deg)")},merge:function(t,e){var n={};for(var o in t)n[o]=t[o];for(var o in e)n[o]=e[o];return n}}}).factory("$nlBurger",["$nlConfig","$nlHelpers",function(t,e){return{animate:function(n){var o=t.maxWidth,i=o-Math.abs(n),r=Math.floor(100/o*i);if(r>0){var s=t.options.burger.startScale-Math.abs((1-t.options.burger.endScale)/100*r).toFixed(2),a=Math.floor(.45*r),l=Math.floor(t.options.burger.endY/100*r);l=y_pos_bottom=l<t.options.burger.endY?l:t.options.burger.endY;var d=Math.floor(1.8*r);t.options.reverse&&(d=180+(180-d)),burger.style.transition="none",burgerTop.style.transition="none",burgerBottom.style.transition="none",e.translate(burger,0,"",0,"",d,"",""),e.translate(burgerTop,0,"",l,"",a,"","",s),e.translate(burgerBottom,0,"",y_pos_bottom,"-",a,"-","",s)}},toggle:function(n){burger.style.transition="all "+t.options.speed+"s "+t.options.animation,burgerTop.style.transition="all "+t.options.speed+"s "+t.options.animation,burgerBottom.style.transition="all "+t.options.speed+"s "+t.options.animation,n?(e.translate(burgerTop,0,"",t.options.burger.endY,"",45,"","",t.options.burger.endScale),e.translate(burgerBottom,0,"",t.options.burger.endY,"-",45,"-","",t.options.burger.endScale),e.translate(burger,0,"",0,"-",180,"")):(e.translate(burgerTop,0,"",0,"",0,"","",t.options.burger.startScale),e.translate(burgerBottom,0,"",0,"",0,"","",t.options.burger.startScale),t.options.reverse?e.translate(burger,0,"",0,"-",360,""):e.translate(burger,0,"",0,"-",0,"")),setTimeout(function(){burger.style.transition="none",burgerTop.style.transition="none",burgerBottom.style.transition="none",n?t.options.reverse=!0:(e.translate(burger,0,"",0,"-",0,""),t.options.reverse=!1)},1e3*t.options.speed)}}}]).factory("$nlDrawer",["$nlConfig","$nlBurger","$nlHelpers",function(t,e,n){var o={init:function(e){t.options=n.merge(t.options,e),body=document.body,bodyH=new Hammer(body),swipe=document.getElementById("nlSwipe"),swipeH=new Hammer(swipe),drawer=document.getElementById("nlDrawer"),drawerH=new Hammer(drawer),drawerDimm=document.getElementById("nlDimm"),drawerDimmH=new Hammer(drawerDimm),burger=document.getElementById("nlBurger"),burgerTop=document.getElementById("burger-top"),burgerBottom=document.getElementById("burger-bottom"),t.deviceW=Math.max(document.documentElement.clientWidth,window.innerWidth||0),t.deviceH=Math.max(document.documentElement.clientHeight,window.innerHeight||0),t.options.modifyViewContent&&(viewContent=document.getElementById("nlContent"),console.log(viewContent),viewContentH=new Hammer(viewContent),viewContent.style["margin-top"]=t.options.topBarHeight+"px",viewContent.style["min-height"]=t.deviceH-t.options.topBarHeight+"px",viewContent.style.width=t.deviceW+"px"),t.options.useActionButton&&(actionPanel=document.getElementById("nlActionButton"),actionPlus=document.getElementById("nlPlus")),t.maxWidth=t.options.maxWidth>t.deviceW-56?t.deviceW-56:t.options.maxWidth,n.translate(drawer,t.maxWidth,"-",0,"",0,"",t.maxWidth),window.onresize=function(e){t.deviceW=Math.max(document.documentElement.clientWidth,window.innerWidth||0),t.deviceH=Math.max(document.documentElement.clientHeight,window.innerHeight||0),t.options.modifyViewContent&&(viewContent.style.width=t.deviceW+"px",viewContent.style["min-height"]=t.deviceH-t.options.topBarHeight+"px"),t.maxWidth=t.options.maxWidth>t.deviceW-56?t.deviceW-56:t.options.maxWidth,o.openned?n.translate(drawer,0,"",0,"",0,"",t.maxWidth):n.translate(drawer,t.maxWidth,"-",0,"",0,"",t.maxWidth)},drawerH.on("panleft panright",function(t){o.openned&&o.move(t,!0)}),drawerDimmH.on("panleft panright",function(t){o.openned&&o.move(t)}),swipeH.on("panright panleft",function(t){o.move(t)}),o.touchEnd(swipe),o.touchEnd(drawer),o.touchEnd(drawerDimm)},show:function(){drawer.style.transition="all "+t.options.speed+"s "+t.options.animation,t.maxWidth=t.options.maxWidth>t.deviceW-56?t.deviceW-56:t.options.maxWidth,n.translate(drawer,0,"",0,"",0,"",t.maxWidth),drawerDimm.style.transition="all "+t.options.speed+"s "+t.options.animation,drawerDimm.style.visibility="visible",drawerDimm.style.opacity="1",o.openned=!0,t.options.reverse=!0,e.toggle(!0)},hide:function(){drawer.style.transition="all "+t.options.speed+"s "+t.options.animation,n.translate(drawer,t.maxWidth,"-",0,"",0,""),drawerDimm.style.transition="all "+t.options.speed+"s "+t.options.animation,drawerDimm.style.visibility="hidden",drawerDimm.style.opacity="0",o.openned&&e.toggle(!1),o.togglePlus(!0),o.openned=!1},toggle:function(){o.openned?o.hide():o.show()},move:function(i,r){t.options.direction="panleft"===i.type?"left":"right";var s=i.center.x-t.maxWidth;r&&(t.options.holdPos=t.options.holdPos?t.options.holdPos:s,s+=Math.abs(t.options.holdPos)),s=0>s?s:0;var a=t.options.maxWidth-Math.abs(s),l=(a/(t.options.maxWidth/100)/100).toFixed(2);l=1>l?l:1,e.animate(s),drawerDimm.style.transition="none",drawerDimm.style.visibility="visible",drawerDimm.style.opacity=l,drawer.style.transition="none",t.maxWidth=t.options.maxWidth>t.deviceW-56?t.deviceW-56:t.options.maxWidth,n.translate(drawer,s,"",0,"",0,"",t.maxWidth),o.openned=!0,i.isFinal?("left"===t.options.direction?o.hide():o.show(),t.options.holdPos=null,t.options.endTrue=!1):t.options.endTrue=!0},touchEnd:function(e){t.onTouch="ontouchstart"in window?!0:!1,t.onTouch?e.addEventListener("touchend",function(t){n(t,!0)},!1):e.addEventListener("mouseup",function(t){n(t,!1)},!1);var n=function(e,n){var i=n?e.changedTouches[0]:e,r=i.clientX>t.options.maxWidth/2,s="left"===t.options.direction,a="right"===t.options.direction,l=t.options.endTrue;r&&s&&l||r&&a&&l?o.show():(!r&&s&&l||!r&&a&&l)&&o.hide(),t.options.direction=!1,t.options.endTrue=!1,t.options.holdPos=null,e.preventDefault()}},set:function(e){var o=t.options;t.options=n.merge(o,e)},togglePlus:function(e){t.options.useActionButton&&(drawerDimm.style.transition="all "+t.options.speed+"s "+t.options.animation,o.plusActive||e?(o.plusActive=!1,burger.style["z-index"]="1106",drawerDimm.style.visibility="hidden",drawerDimm.style.opacity="0",actionPlus.style["z-index"]="1104",actionPanel.classList.remove("active")):(o.plusActive=!0,burger.style["z-index"]="1104",actionPlus.style["z-index"]="1106",actionPanel.classList.add("active"),setTimeout(function(){drawerDimm.style.visibility="visible",drawerDimm.style.opacity="1"},100)))}};return o}]).factory("$nlRefresh",["$nlConfig","$nlHelpers",function(t,e){var n={init:function(){t.onTouch="ontouchstart"in window?!0:!1,topbar=document.getElementById("nlTopbar"),topbarH=new Hammer(topbar),refEl=document.getElementById("nlRefresh"),refIcon=document.getElementById("reload-icon"),refIcon.style.transition="all "+t.options.speed+"s "+t.options.animation,t.syncTrue=!1,t.scroll.top=0,t.center=t.deviceW/2-refEl.offsetWidth/2,topbarH.on("pan",function(t){n.move(t)}),n.touchEnd(body)},move:function(n){if(t.center=t.deviceW/2-refEl.offsetWidth/2,!t.syncing){refEl.style.transition="none";var o=Math.floor(t.deviceH/2),i=100/t.deviceH*n.center.y;if(n.center.y<o){t.syncTrue=!1;var r=i/2*(o/100),s=2*i*.005,a=.36*(o/100*n.center.y);refIcon.style.transition="none",refIcon.style.fill=t.options.refresh.defaultColor,e.translate(refIcon,"","","","","","","","","",s),e.translate(refEl,t.center,"",r,"",a)}else{refIcon.style.transition="fill "+4*t.options.speed+"s "+t.options.animation,t.syncTrue=!0;var i=o/100*(n.center.y-o),l=100/t.deviceH*n.center.y,d=100/(t.deviceH/2)*(n.center.y-o),r=l/2*(o/100);r-=r/100*d/3.5;var a=.36*(o/100*n.center.y);refIcon.style.fill=t.options.refresh.activeColor,e.translate(refIcon,"","","","","","","","","","1"),e.translate(refEl,t.center,"",r,"",a)}}},touchEnd:function(o){t.onTouch?o.addEventListener("touchend",function(t){i(t,!0)},!1):o.addEventListener("mouseup",function(t){i(t,!1)},!1);var i=function(o,i){var r=Math.floor(t.deviceH/2),s=i?o.changedTouches[0]:o;setTimeout(function(){if(refEl.style.transition="all "+t.options.speed/2+"s "+t.options.animation,s.clientY>r&&t.syncTrue&&!t.syncing){t.syncTrue=!1,t.syncing=!0,t.nlRefresh.ended=!1,n.callback();var o=0,i=0,a=.36*(r/100*(s.clientY-r))+360;t.nlRefresh.minY=t.options.topBarHeight+t.options.topBarHeight/3,e.translate(refEl,t.center,"",t.nlRefresh.minY,"",a,""),setTimeout(function(){refEl.style.transition="all "+t.options.speed/2+"s linear";var n=setInterval(function(){if(t.nlRefresh.ended)clearInterval(n);else{var r=a+i;e.translate(refEl,t.center,"",t.nlRefresh.minY,"",r,""),o+=.1,i+=6+o}},25)},1e3*t.options.speed)}else refEl.style.transition="all "+t.options.speed+"s "+t.options.animation,e.translate(refEl,t.center,"",0,"",0,""),t.syncTrue=!1,t.syncing=!1},50)}},callback:function(){setTimeout(function(){t.syncEndTrue()},2500)},syncEnd:function(){t.nlRefresh.ended=!0,setTimeout(function(){refEl.style.transition="all "+t.options.speed/2+"s "+t.options.animation,e.translate(refEl,t.center,"",t.nlRefresh.minY,"",0,"","","1.2")},100),setTimeout(function(){e.translate(refEl,t.center,"",t.nlRefresh.minY,"",0,"","","0")},200),setTimeout(function(){e.translate(refEl,t.center,"",0,"",0,"","","0")},300),t.syncTrue=!1,t.syncing=!1}};return n}]).factory("$nlToast",["$nlConfig","$nlHelpers",function(t,e){var n={init:function(o){t.options=e.merge(t.options,o),toast=document.getElementById("nlToast"),toastH=new Hammer(toast),toastH.on("panleft panright",function(t){n.move(t)}),n.touchEnd(toast)},show:function(o,i,r,s,a){t.runnigTimeout&&clearTimeout(t.runnigTimeout),console.log(t.runnigTimeout),"top"===i?(toast.style.top="75px",toast.style.bottom="auto"):(toast.style.top="",toast.style.bottom="1rem"),"function"==typeof r?n.trueCb=r:n.trueCb=function(){},"function"==typeof s?n.falseCb=s:n.falseCb=function(){},o&&(toast.innerHTML=o),"top"===i?(toast.style.transition="none",e.translate(toast,0,"",t.deviceH,"-",0,"")):(toast.style.transition="none",e.translate(toast,0,"",t.deviceH,"",0,"")),setTimeout(function(){toast.style.transition="all "+t.options.speed/2+"s "+t.options.animation,e.translate(toast,0,"",0,"",0,"")},100),a&&(t.runnigTimeout=setTimeout(function(){n.hide(!0)},a))},center:function(){toast.style.transition="all "+t.options.speed/2+"s "+t.options.animation,e.translate(toast,0,"",0,"",0,"")},right:function(){n.trueCb(),toast.style.transition="all "+t.options.speed/2+"s "+t.options.animation,e.translate(toast,t.deviceW,"",0,"",0,""),setTimeout(function(){n.hide()},t.options.speed/2*1e3)},left:function(){n.falseCb(),toast.style.transition="all "+t.options.speed/2+"s "+t.options.animation,e.translate(toast,t.deviceW,"-",0,"",0,""),setTimeout(function(){n.hide()},t.options.speed/2*1e3)},hide:function(n){console.log(n),n?toast.style.transition="all "+t.options.speed+"s "+t.options.animation:toast.style.transition="none",setTimeout(function(){e.translate(toast,0,"",t.deviceH,"",0,"")},100)},move:function(o){toast.style.transition="none",n.direction="panleft"===o.type?"left":"right",n.holdPos=n.holdPos?n.holdPos:i;var i=o.center.x-t.deviceW;i+=Math.abs(n.holdPos),e.translate(toast,i,"",0,"",0),o.isFinal?("left"===n.direction?n.left():n.right(),n.holdPos=null,n.endTrue=!1):n.endTrue=!0},touchEnd:function(e){t.onTouch="ontouchstart"in window?!0:!1,t.onTouch?e.addEventListener("touchend",function(t){o(t,!0)},!1):e.addEventListener("mouseup",function(t){o(t,!1)},!1);var o=function(e,o){var i=o?e.changedTouches[0]:e,r=(i.clientX>t.deviceW/2,"left"===n.direction,"right"===n.direction,n.endTrue);r&&n.center(),n.direction=!1,n.endTrue=!1,n.holdPos=null,e.preventDefault()}},trueCb:function(){console.log("True Callback")},falseCb:function(){console.log("False Callback")}};return n}]).factory("$nlMenu",["$nlConfig","$nlHelpers",function(t,e){var n={openned:!1,init:function(){menu=document.getElementById("nlMenu"),menuContent=menu.children[1],bodyH.on("tap",function(t){console.log(n.openned),n.openned&&n.hide()})},show:function(){menuContent.style.visibility="visible",menuContent.style.opacity="1",e.translate(menuContent,0,"",0,"",0),setTimeout(function(){n.openned=!0},50)},hide:function(){menuContent.style.visibility="hidden",menuContent.style.opacity="0",e.translate(menuContent,0,"",0,"",0),n.openned=!1}};return n}]);