function chain(data) {
  var instance = function instance(element){
    var newChain = instance.functions.slice();
    if (typeof element === "function") {
      newChain.push(element)
    }
    var newStream = chain(data);
    newStream.functions = newChain;
    return newStream;
  };
  instance.functions = [];
  instance.data = data;
  instance.clank = function(){
    var localData = instance.data.slice();
    chainsLoop: for(var i in instance.functions) {
      var newLocalData = [];
      var broken = false;
      var brokenValue = undefined;
      dataLoop: for(var j in localData) {
        var result = instance.functions[i](localData[j], j);
        if(result.break) {
          brokenValue = localData[j];
          localData = newLocalData;
          broken = true;
          break chainsLoop;
        }
        if(result.stop) {
          localData = newLocalData;
          continue chainsLoop;
        }
        if(result.skip){
          continue dataLoop;
        }
        newLocalData.push(result.data)
      }
      localData = newLocalData;
    }
    return {data:localData, broken: broken, brokenValue:brokenValue};
  }
  return instance;
}
