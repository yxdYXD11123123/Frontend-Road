<template>
  <div class="pay">
    <div v-if="!trade_state">
      <div>请使用微信扫码付款</div>
      <div>
        <!-- 付款二维码 -->
        <img :src="qr_url" alt="" />
      </div>
    </div>
    <div v-else>
      <h3>支付成功</h3>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  async asyncData({ params, $api }) {
    // 获取支付商品信息
    const { body, total_fee } = params;
    // 下单
    const {
      status,
      data: { qr_url, out_trade_no },
    } = await $api.CreateOrder({
      body,
      total_fee,
      trade_type: "NATIVE",
      spbill_create_ip: "127.0.0.1",
    });

    if (status !== 200) return;
    // 成功
    return {
      // 付款二维码
      qr_url,
      out_trade_no,
    };
  },
  data() {
    return {
      // 轮询查询订单 定时器id
      queryIntervalId: 0,
      // 支付状态
      trade_state: false,
    };
  },
  methods: {
    // 查询订单是否支付
    queryOrder() {
      this.queryIntervalId = setInterval(async () => {
        const { status } = await this.$api.QueryOrder(this.out_trade_no);
        if (status === 200) {
          Toast.success("订单已支付");
          clearInterval(this.queryIntervalId);
          this.trade_state = true;
        }
      }, 2000);
    },
  },
  created() {
    this.queryOrder();
  },
  destroyed() {
    clearInterval(this.queryIntervalId);
  },
};
</script>

<style>
.pay {
  text-align: center;
}
</style>