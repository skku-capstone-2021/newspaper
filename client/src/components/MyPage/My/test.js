function getCombinations(arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((el) => [el]);

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((el) => [fixed, ...el]);
    results.push(...attached);
  });
  return results;
}

function getMenues(orders, c) {
  let menues = [];
  orders.forEach((order) => {
    menues = order.split("");

    // order.split("").forEach((menu)=>{
    //     if(!menues.includes(menu)){
    //         menues.push(menu);
    //     }
    // })
  });

  menues.sort();
  return menues;
}

function solution(orders, course) {
  let answer = [];

  // const menues = getMenues(orders, course);//모든 메뉴
  let combinations; // c개수의 코스일 때 가능한 모든 조합
  let currentCnt; // 현재 조합이 포함된 order개수
  let maxCnt; // c개수의 코스일 때 가장 많이 포함된 combination의 order개수
  let maxCombinations; // c개수의 코스일 때 가장 많이 포함된 combination들(string[])

  course.forEach((c) => {
    combinations = getMenues(orders, c);
    maxCnt = 0;
    maxCombinations = [];

    combinations.forEach((combination) => {
      currentCnt = 0;
      orders.forEach((order) => {
        if (combination.every((menue) => order.includes(menue))) {
          currentCnt++;
        }
      });

      if (currentCnt >= 2) {
        if (maxCnt === currentCnt) {
          maxCombinations.push(combination.join(""));
        }

        if (maxCnt < currentCnt) {
          maxCnt = currentCnt;
          maxCombinations = [combination.join("")];
        }
      }
    });
    if (maxCombinations.length) {
      answer.push(...maxCombinations);
    }
  });

  answer.sort();
  return answer;
}
