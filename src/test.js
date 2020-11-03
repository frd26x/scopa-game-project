function createTree(table,init){
  if(table.length ===0){
    return init
  }
  const tree =  init || {}
  for(let i=0;i<table.length;i++){
    tree[table[i]]={}
    const rest = table.filter(n=>n!==table[i])
    rest.forEach(n=>tree[table[i]][n]=createTree(rest.filter(nr=>nr!==n),tree[table[i]][n]))
  }
  return tree
}

function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;
	
	// There is no way to take e.g. sets of 5 elements from
	// a set of 4.
	if (k > set.length || k <= 0) {
		return [];
	}
	
	// K-sized set has only one K-sized subset.
	if (k == set.length) {
		return [set];
	}
	
	// There is N 1-sized subsets in a N-sized set.
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	
	// Assert {1 < k < set.length}
	
	// Algorithm description:
	// To get k-combinations of a set, we want to join each element
	// with all (k-1)-combinations of the other elements. The set of
	// these k-sized sets would be the desired result. However, as we
	// represent sets with lists, we need to take duplicates into
	// account. To avoid producing duplicates and also unnecessary
	// computing, we use the following approach: each element i
	// divides the list into three: the preceding elements, the
	// current element i, and the subsequent elements. For the first
	// element, the list of preceding elements is empty. For element i,
	// we compute the (k-1)-computations of the subsequent elements,
	// join each with the element i, and store the joined to the set of
	// computed k-combinations. We do not need to take the preceding
	// elements into account, because they have already been the i:th
	// element so they are already computed and stored. When the length
	// of the subsequent list drops below (k-1), we cannot find any
	// (k-1)-combs, hence the upper limit for the iteration:
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		// head is a list that includes only our current element.
    head = set.slice(i, i + 1);

		// We take smaller combinations from the subsequent elements
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    // if(i===0){
    //   console.log({tailcombs,head,k,set})
    // }
    
		// For each (k-1)-combination we join it with the current
		// and store it to the set of k-combinations.
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

function combinations(set) {
	var k, i, combs, k_combs;
	combs = [];
	
	// Calculate all non-empty k-combinations
	for (k = 1; k <= set.length; k++) {
		k_combs = k_combinations(set, k);
		for (i = 0; i < k_combs.length; i++) {
			combs.push(k_combs[i]);
		}
	}
	return combs;
}


console.log(k_combinations([1,2,3,4],3))

//1 stop [2,3,4]
//[2,3] [2,4] [3,4]

//2 stop 
//[1,3][1,4][3,4]

//3
//[1,2][1,4][2,4]

//4
//[1,2][1,3][2,3]

function combs(table,k=3){
  let res =[]
for(let i=0;i<table.length-k;i++){
  const combs =[]
  const curr = table[i]
  const rest = table.filter((v,idx)=>idx!==i)
  for(let j=0;j<rest.length;j++){
    for(let y=0;y<rest.length;y++){
      combs.push([rest[i],rest[j]])
    }
  }
  combs.map(c=>([...c,curr]))
res= [...combs,...res]
}
}
console.log(k_combinations([0,1,2,3,4],3))