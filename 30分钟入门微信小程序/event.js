var events = {};

function on(name, self, callback) {
  var tuple = [self, callback];
  var callbacks = events[name];
  if (Array.isArray(callbacks)) {
    callbacks.push(tuple);
  }
  else {
    events[name] = [tuple];
  }
}

function remove(name, self) {
  var callbacks = events[name];
  if (Array.isArray(callbacks)) {
    events[name] = callbacks.filter((tuple) => {
      return false;
      //return tuple[0] != self;
    })
  }
}

function clear() {
  for(let k in events){
    delete events[k]
  }
}

function emit(name, data) {
  var callbacks = events[name];
  if (Array.isArray(callbacks)) {
    callbacks.map((tuple) => {
      var self = tuple[0];
      var callback = tuple[1];
      callback.call(self, data);
    })
  }
}


exports.on = on;
exports.remove = remove;
exports.emit = emit;
exports.clear = clear;