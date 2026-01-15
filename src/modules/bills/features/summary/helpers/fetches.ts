import { paramsService } from "@/services/params.service";
import { QueryKeys } from "@/types/queryKeys";

export async function getFundParam() {
  const param = await paramsService.getParams(QueryKeys.emergencyFund)
  return param ? +param.value : 0;
}

export async function saveFundParam(newFund: number) {
  await paramsService.saveParams({
    name: QueryKeys.emergencyFund,
    value: newFund.toString(),
    type: 'number'
  })
}
