# quat-from-unit-vec3

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Creates a quaternion from two (normalized) unit vectors. Adapted from [this blog post](http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final).

## Install

```sh
npm install quat-from-unit-vec3 --save
```

## Example

```js
var fromUnitVec3 = require('quat-from-unit-vec3')

var vecA = [0, 0, 0]
var vecB = [0, 0, 1]
var quat = fromUnitVec3([], vecA, vecB)
//=> [ 0, 0, 0, 1 ]
```

## Usage

[![NPM](https://nodei.co/npm/quat-from-unit-vec3.png)](https://www.npmjs.com/package/quat-from-unit-vec3)

#### `quat = fromUnitVec3(quat, a, b)`

Forms a quaternion from two normalized unit vectors, `a` and `b` (3-component arrays). The value is stored in `quat` (a 4-component array) and returned.

## License

MIT, see [LICENSE.md](http://github.com/Jam3/quat-from-unit-vec3/blob/master/LICENSE.md) for details.
