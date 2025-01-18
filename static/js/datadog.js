if (window.DD_LOGS) {
    // Set your client token
    DD_LOGS.init({
        clientToken: 'pubdd4d10e6de1bfeb571bee809db657af4',
        forwardErrorsToLogs: true,
    });

    // OPTIONAL
    DD_LOGS.addLoggerGlobalContext('service', 'browser');
    // add global metadata attributes
    const envLogger = DD_LOGS.createLogger('envLogger')
    if (window.location && window.location.host) {
        if (window.location.host === 'neo.foyr.com') {
            envLogger.addContext('env', 'production')
        }else if(window.location.host === 'neostaging.foyr.com') {
            envLogger.addContext('env', 'staging')
        }else {
            envLogger.addContext('env', 'development')
        }
    }

}