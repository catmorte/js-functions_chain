
# js-functions_chain
functions chain made with closure, love and drugs :)

Chain functions receive two elements: an element from array and it's index
Chain function should return the next object: 
```
data - new element
break - "true" if you need to break the chain and return unfinished collection
skip - "true" if you need to skip current element
stop - "true" if you need to stop current chain function and start the next
```
To get result call:
```javascript
chain([...])(chFunc1)(chFunc2)(chFunc3)...(chFuncN).clank()
```

clank returns the folowing structure:
```
data - chain result
broken - if chain was broken by some chain function
brokenValue - element that break the chain
```

## Examples:

Filter even elements and power them 
```javascript
function evenOnly(_){
 return { skip: _%2!=0, data: _ };
}
function pow(_){
 return { data: _*_ }
}

console.log(chain([1,2,3,4,5,6,7])(evenOnly)(pow).clank())
```
Result:
```
{data: [4,16,36], broken:false, brokenElement: undefined}
```

##
Create subchain with additional functionality
```javascript
function evenOnly(_){
 return { skip: _%2!=0, data: _ };
}
function pow(_){
 return { data: _*_ }
}
var ch1 = chain([1,2,3,4,5,6,7])(evenOnly)
var ch2 = ch1(pow) 
console.log(ch1.clank())
console.log(ch2.clank())
```
Result:
```
{data: [2,4,6], broken:false, brokenElement: undefined}
{data: [4,16,36], broken:false, brokenElement: undefined}
```
##
Power first fifth elements

```javascript
function stopAfterFive(_){
 return {stop: _>5, data: _ }
}
function pow(_){
 return { data: _*_ }
}
console.log(chain([1,2,3,4,5,6,7])(stopAfterFive)(pow).clank())
```
Result:
```
{data: [1, 4, 9, 16, 25], broken:false, brokenElement: undefined}
```

##
Break chain
```javascript
function breakIfNegative(_){
 return { break: _<0, data: _ }
}

console.log(chain([1,2,3,-4,5,6,7])(breakIfNegative)(pow).clank())
```
Result:
```
{data: [1, 4, 9, 16, 25], broken: true, brokenValue: -4}
```
