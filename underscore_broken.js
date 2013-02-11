(function() {
  
  // Call iterator(value, key, obj) for each element of obj
  var each = function(obj, iterator) {
    if(Array.isArray(obj)){
      for(var i = 0; i < obj.length; i++){
          iterator(obj[i], i, obj);
        } 
    } else {
      for(var i in obj) {
        if(obj.hasOwnProperty(i)){
          iterator(obj[i], i, obj);
        }
      }
    }
  };

  // Determine if the array or object contains a given value (using `===`).
  var contains = function(obj, target) {
    var doesContain = false;
    _.each(obj, function(val){
      if(val === target) {
        doesContain = true;
      }
    });
    return doesContain;
  };

  // Return the results of applying an iterator to each element.
  var map = function(array, iterator) {
    var results = [];
    _.each(array , function(val, key, obj){
      results[results.length] = iterator(val);
    });
    return results;
  };

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  var pluck = function(obj, property) {
    return _.map(obj, function(currentItem){
        return currentItem[property];
    });

  };

  // Return an array of the last n elements of an array. If n is undefined, return
  // just the last element
  var last = function(array, n) {
    var someArray = [];
    if(n === undefined){n = 1;}
    if(array === null) {
      return undefined;
    }
    if (Array.isArray(array)){
      return array.slice(Math.max(array.length - n, 0 ) );
    } else {
      _.each(array, function(currentItem){
        someArray.push(currentItem);
      })
      return someArray.slice(Math.max(array.length - n, 0 ) );
    }
  };

  // Like last, same same, but different
  var first = function(array, n) {
    var someArray = [];
    if(n === undefined){n = 1;}
    if(array === null) {
      return undefined;
    }
    if (Array.isArray(array)){
      return array.slice(0, n);
    } else {
      _.each(array, function(currentItem){
        someArray.push(currentItem);
      })
      return someArray.slice(0, n);
    }
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  // 
  // You can pass in an state that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(previous_value, item){
  //     return previous_value + item;
  //   }, 0); // should be 6
  //
  var reduce = function(obj, iterator, state) {
    if(state === undefined) {    
      if(typeof(obj[0]) === 'string'){
        state = '';
      } else if(typeof(obj[0]) === 'number'){
        state = 0;
      } else {
        state = false;
      }
    }

    _.each(obj, function(value){
      state = iterator(state, value);
    });
    return state;
  };
   
    

  // Return all elements of an array that pass a truth test.
  var select = function(array, iterator) {
    var results = [];
    var val = _.map(array,iterator);
    for(var i in array){
      if(val[i] === true) {
        results.push(array[i]);
      }
    }
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  var reject = function(array, iterator) {
    var results = [];
    var val = _.map(array,iterator);
    for(var i in array){
      if(val[i] === false) {
        results.push(array[i]);
      }
    }
    return results;
  };

  // Determine whether all of the elements match a truth test.
  var every = function(obj, iterator) {

    // return _.reduce(obj, function(allTrue, currItem){ 
    //   return allTrue && currItem === true;
    // }, false);

    var results=[];
    var val = _.map(obj,iterator);
    for(var i in val){
      if(val[i] == false) {
        return false;
      } else if(val[i] == true){
        results.push(true);
      } else {
        results.push(undefined);
      }
    }
    if(_.contains(results, true)){return true;}
    if(_.contains(results, undefined)) {return undefined;}
    return results;
  };

  // Determine whether any of the elements pass a truth test.
  var any = function(obj, iterator) {
    var results=[];
    if(iterator !== undefined) {
      var val = _.map(obj,iterator);
      for(var i in val){
        if(val[i] == true) {
          return true;
        } else if(typeof(obj[i]) == "string") {
        console.log(typeof(obj[i]))
          return true;
        }        
      }
    } else {
      var truthy = false;
      _.each(obj, function(value, index) {
        if(value) {
          truthy = true;
        }
      });
      return truthy;
    }
    return false;
  };

  // Produce a duplicate-free version of the array.
  var uniq = function(array) {
    var newArray = [];
    for(var i in array) {
      if(_.contains (newArray, array[i]) ){

      }else {
        newArray.push(array[i]);
      }
    }
    return newArray;
  };

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  var once = function(func) {
    var result;
    var isCalled = false;
    return function(){
      if(isCalled){return result}
      isCalled = true;
      result = func();
      return result;
    }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  var memoize = function(func) {
    var pastArguments = {};
    return function(){
      var arg = arguments[0];
      if(!pastArguments.hasOwnProperty(arg)){ 
        var tempResult = func(arg);
        pastArguments[arg] = tempResult;
        return tempResult;
      } else {
          return pastArguments[arg];
      }

    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  var delay = function(func, wait) {
    setTimeout(func, wait);
  };

  // Extend a given object with all the properties of the passed in 
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //
  var extend = function(obj) {
    _.each(arguments, function(value){
      for(var prop in value) {
        obj[prop] = value[prop];
      }
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  var defaults = function(obj) {
    _.each(arguments, function(value){
      for(var prop in value) {
        if(!(prop in obj)){
          obj[prop] = value[prop];
        }
      }
    });
    return obj;
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  var flatten = function(nestedArray) {
    var allArrays = [];
    var subflat = function(array2){
      for(var i in array2) {
        if(Array.isArray(array2[i])) {
          subflat(array2[i]); 
        } else {
          allArrays.push(array2[i]);
        }
      }
    }
    subflat(nestedArray);
    return allArrays;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  var sortBy = function(obj, iterator) {
    var x = iterator;
    if ('string' === typeof iterator) {
      iterator = function (obj) { return obj[x];}
    }

    return obj.sort(function (a,b) {
      return iterator(a) - iterator(b);
    });
  };




  // Zip together two or more arrays with elements of the same index 
  // going together.
  // 
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  var zip = function() {
    var results = [];
    var length = _.pluck(arguments, 'length');
    var maxLength = Math.max.apply(Math, length);
    for (var i = 0; i < maxLength; i++){
      results[i] = [];
        for(var j = 0; j < maxLength; j++){
          results[i].push(arguments[j][i]);
        }
    };
    return results;
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  var intersection = function(array) {
    var rest = [];
    for(var i = 1; i<arguments.length; i++ ) {
      rest.push(arguments[i]);
    }
    var first = arguments[0];
    var results = [];

    for (var i in first){
      _.each(rest, function(value){
        if(_.contains(value, first[i]) ){
         results.push(first[i]);
        }
      });
    }
    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  var difference = function(array) {
    var first = arguments[0];
    var args = [];
    for (var i in arguments){
      args.push(arguments[i]);
    }
    var rejected = _.intersection.apply(this, arguments);
    console.log(rejected);
    debugger;
    var result = _.reject(first, function(value){
      for (var j =0; j< rejected.length; j++){
        // console.log(rejected[j]);
         return rejected[j] == value;
      }
    });

    console.log(result);
    console.log(first);
    return result;


  };

  // Shuffle an array.
  var shuffle = function(obj) {
    var shuffledArray = [];
    var inputLength = obj.length;
    var isItemThere = function(array, target) {
      for(var j in array) {
        if( array[j] === target ){return true;}
      }
    };

    for(var i =0; i < inputLength; i++) {
      var newIndex = Math.floor(Math.random() * inputLength);
      if(!   (isItemThere(shuffledArray, obj[newIndex]) )  )   {
        shuffledArray.push(obj[newIndex]);
      } else {
        i--;
      }
    }
    return shuffledArray;
  };

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  var chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  var throttle = function(func, wait) {
  };

  var range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  this._ = {
    each: each,
    contains: contains,
    map: map,
    pluck: pluck,
    last: last,
    first: first,
    reduce: reduce,
    select: select,
    reject: reject,
    every: every,
    any: any,
    uniq: uniq,
    once: once,
    memoize: memoize,
    delay: delay,
    extend: extend,
    defaults: defaults,
    flatten: flatten,
    sortBy: sortBy,
    zip: zip,
    intersection: intersection,
    difference: difference,
    shuffle: shuffle,
    chain: chain,
    throttle: throttle,
    range: range
  };


}).call(this);
