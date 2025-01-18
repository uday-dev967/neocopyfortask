
  function initFreshChat() {
    window.fcWidget.init({
      config: {
        cssNames: {
          widget: "custom_fc_frame"
        }
      },
      token: "101785df-864c-42e3-b646-fbf06afc5ebd",
      host: "https://wchat.freshchat.com"
    });
  }
  function initialize(i,t){var e;i.getElementById(t)?initFreshChat():((e=i.createElement("script")).id=t,e.async=!0,e.src="https://wchat.freshchat.com/js/widget.js",e.onload=initFreshChat,i.head.appendChild(e))}function initiateCall(){initialize(document,"freshchat-js-sdk")}window.addEventListener?window.addEventListener("load",initiateCall,!1):window.attachEvent("load",initiateCall,!1);
  