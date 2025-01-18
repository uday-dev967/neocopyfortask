const requireModule = require.context(".", true, /.ack$/); //extract js files inside modules folder
const ackHandlers = {};

requireModule.keys().forEach(fileName => {
  if (fileName === "./index.js") return; //reject the index.js file

  const moduleName = fileName.replace(/(\.\/|\.js)/g, "").split('.')[0]; //

  ackHandlers[moduleName] = requireModule(fileName).default;
});

// console.log('all ackHandlers - ', ackHandlers);

export default ackHandlers
