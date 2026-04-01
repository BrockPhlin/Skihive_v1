/**
 * 根据各部件 name/weight/cost/power/stability 估算综合得分（0–100）。
 * 思路参考北航 flyeval 多旋翼性能评估中对「动力系统与重量、续航、负载」的权衡：
 * https://flyeval.com/paper/
 * （本实现为教学演示用线性加权模型，非网站官方公式。）
 */
const COMPONENT_IDS = ['propeller', 'motor', 'battery', 'sensor', 'frame', 'camera']

function computeAssemblyScore(choices) {
  let totalWeight = 0
  let totalCost = 0
  let totalPower = 0
  let totalStability = 0
  let n = 0

  COMPONENT_IDS.forEach((id) => {
    const o = choices && choices[id]
    if (!o) return
    n += 1
    totalWeight += Number(o.weight) || 0
    totalCost += Number(o.cost) || 0
    totalPower += Number(o.power) || 0
    totalStability += Number(o.stability) || 0
  })

  if (n < 6) return 0

  // 推力/重量比 proxy（功率项相对总重，类比桨/机体重量与推力关系）
  const thrustProxy = totalPower / (totalWeight + 80)
  // 稳定性贡献（传感器/机架等）
  const stabilityPart = (totalStability / 18) * 38
  // 成本与重量惩罚（过重、过贵会降低综合「可飞性」得分）
  const costPenalty = Math.min(22, totalCost / 95)
  const weightPenalty = Math.min(18, totalWeight / 220)

  let raw = 28 + thrustProxy * 42 + stabilityPart - costPenalty - weightPenalty
  raw = Math.max(0, Math.min(100, raw))
  return Math.round(raw)
}

module.exports = {
  computeAssemblyScore,
  COMPONENT_IDS
}
