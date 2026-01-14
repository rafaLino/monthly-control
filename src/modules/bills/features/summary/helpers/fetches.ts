let mock = 1000;
export async function getFundParam() {
  // const param = await paramsService.getParams(QueryKeys.emergencyFund)
  // return Number(param?.value) ?? 0
  console.log('fetching fund param', mock);
  return mock;
}

export async function saveFundParam(newFund: number) {
  // await paramsService.saveParams({
  //     name: QueryKeys.emergencyFund,
  //     value: newFund.toString(),
  //     type: 'number'
  // })
  mock = newFund;
  return mock;
}
