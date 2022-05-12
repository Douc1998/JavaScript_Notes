const a = new Set([1, 2, 3])
const b = new Set([2, 4, 5])

// 可求多个集合的并集
function union(a, ...bSets) {
  const unionSet = new Set(a);
  for (let b of bSets) {
    for (let bValue of b) {
      unionSet.add(bValue);
    }
  }
  return unionSet;
}

// 可求多个集合的交集
function intersection(a, ...bSets) {
  const intersectionSet = new Set(a);
  for (let aValue of intersectionSet) {
    for (let b of bSets) {
      if (!b.has(aValue)) {
        intersectionSet.delete(aValue)
      }
    }
  }
  return intersectionSet
}

// 求两个集合差集
function difference(a, b) {
  const differenceSet = new Set(a);
  for (let bValue of b) {
    if (!a.has(bValue)) {
      differenceSet.delete(bValue)
    }
  }
  return differenceSet;
}

console.log(union(a, b))
console.log(intersection(a, b))
console.log(difference(a, b))

console.log(Array.from(a))