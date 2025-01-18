!function(){
    var segement=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
//analytics.load(window.location.host === 'neo.foyr.com'?"iX3UfArMQV16srg5mOVAEqm7HjUTUc29":"BCDJzK669Rm5DWVl7cosU0X39xRpMSRP");
if(window.location.host == "neo.foyr.com")
segement.load("iX3UfArMQV16srg5mOVAEqm7HjUTUc29");
else
segement.load("BCDJzK669Rm5DWVl7cosU0X39xRpMSRP");
segement.page();
}}();