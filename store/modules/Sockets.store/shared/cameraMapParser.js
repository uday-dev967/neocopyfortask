const framerMapper = (progressObj) => {
  let frameMap = {}
  progressObj.frameMap = frameMap
  if (progressObj.name && progressObj.name.indexOf(`ANIMATION`) !== -1) {
    for (const pipeline of progressObj.list) {
      if (pipeline.name && pipeline.name.indexOf(`ANIMATION`) !== -1) {
        for (const slave of pipeline.list) {
          if (slave.frameLog) {
            Object.assign(frameMap, slave.frameLog)
          }
        }
      }
    }
  }
  if (isEmpty(progressObj.frameMap)) progressObj.frameMap = null
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export default function (cameraMap) {
  if (cameraMap) {
    const cameraKeys = Object.keys(cameraMap)
    for (const cameraKey of cameraKeys) {
      framerMapper(cameraMap[cameraKey])
    }
  }
}
