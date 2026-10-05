<template>
  <div class="space-y-10">
    <PageHeader title="Banner 横幅" description="用于发布网络变更、维护窗口和安全事件等需要被及时理解的信息，左侧图标自动映射语义色。" />

    <ComponentExample title="语义等级" description="primary / success / warning / error 四级通告。" :code="rcCode0">
      <div class="space-y-2.5">
        <Banner color="primary" title="全球边缘网络更新" description="亚太与欧洲区域节点现已全面启用 Anycast 智能链路分发。" />
        <Banner color="success" title="访问凭据轮转就绪" description="租户安全密钥已由 KMS 服务无感知轮换完成。" />
        <Banner color="warning" title="网络维护预警" description="法兰克福可用区将于北京时间凌晨 03:00 进行例行交换机固件维护。" />
        <Banner color="error" title="节点异常" description="gru-edge-07 连续健康检查失败，流量已自动切换至备用节点。" />
      </div>
    </ComponentExample>

    <ComponentExample title="带操作按钮" description="通过 action 插槽追加低干扰操作。" :code="rcCode1">
      <Banner color="neutral" title="账单周期提醒" description="本月用量报表已生成，请及时核对出站流量费用。">
        <template #action><Button size="xs" variant="outline" color="neutral">查看报表</Button></template>
      </Banner>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="banner" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<div class="space-y-2.5">
  <Banner color="primary" title="全球边缘网络更新" description="亚太与欧洲区域节点现已全面启用 Anycast 智能链路分发。" />
  <Banner color="success" title="访问凭据轮转就绪" description="租户安全密钥已由 KMS 服务无感知轮换完成。" />
  <Banner color="warning" title="网络维护预警" description="法兰克福可用区将于北京时间凌晨 03:00 进行例行交换机固件维护。" />
  <Banner color="error" title="节点异常" description="gru-edge-07 连续健康检查失败，流量已自动切换至备用节点。" />
</div>`

const rcCode1 = `<Banner color="neutral" title="账单周期提醒" description="本月用量报表已生成，请及时核对出站流量费用。">
  <template #action><Button size="xs" variant="outline" color="neutral">查看报表</Button></template>
</Banner>`


const apiRows = [ { name: 'title', type: 'string', default: '—', description: '加粗标题。' },
  { name: 'description', type: 'string', default: '—', description: '正文说明。' },
  { name: 'color', type: "'primary' | 'neutral' | 'success' | 'warning' | 'error'", default: 'primary', description: '语义色与图标映射。' },
  { name: 'variant', type: "'outline' | 'soft' | 'subtle'", default: 'soft', description: '底色强度。' },
  { name: 'icon / action', type: 'slot', default: '—', description: '自定义左侧图标 / 右侧操作区。' } ]
</script>
