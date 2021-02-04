<template>
  <div class="home_container">
    <section>
      <!-- 头部标签 -->
      <header class="top_tips">
        <span class="num_tip">题目{{ itemNum }}</span>
      </header>
      <!-- 题目内容 -->
      <!-- v-if="questions.length > 0 --- questions拿到以后再渲染 -->
      <div class="item_back item_container_style" v-if="questions.length > 0">
        <div class="item_list_container">
          <!-- 题干 -->
          <header class="item_title">
            {{ questions[itemNum - 1].topic_name }}
          </header>
          <!-- 选项 -->
          <ul>
            <li
              class="item_list"
              v-for="(item, index) in questions[itemNum - 1].topic_answer"
              :key="item.topic_answer_id"
              @click="
                chooseAnswer(
                  questions[itemNum - 1].topic_id,
                  item.topic_answer_id
                )
              "
            >
              <!-- 显示 ABCD 选项 -->
              <!-- 是否选中要由answers中的记录答案决定（如果有记录答案并且答案和这个id相符则选中） -->
              <span
                class="option_style"
                :class="{
                  has_choosed:
                    answers[questions[itemNum - 1].topic_id] &&
                    answers[questions[itemNum - 1].topic_id] ==
                      item.topic_answer_id
                }"
                >{{ String.fromCharCode(65 + index) }}</span
              >
              <!-- 答案选项内容 -->
              <span class="option_detail">{{ item.answer_name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 下一题按钮 -->
      <!-- 只要还不是最后一题，显示下一题按钮，否则显示提交按钮 -->
      <span
        class="next_item button_style"
        v-if="itemNum < questions.length"
        @click="nextQuestion(questions[itemNum - 1].topic_id)"
      ></span>
      <!-- 提交按钮 -->
      <span
        class="submit_item button_style"
        v-else
        @click="submitAnswers"
      ></span>
      <!-- 上一题按钮 -->
      <span class="back_last" v-if="itemNum > 1" @click="lastQuestion"
        >上一题</span
      >
    </section>
  </div>
</template>

<script>
// 导入共享库的映射方法
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["questions", "itemNum", "answers", "score"])
  },
  methods: {
    // 点击选择选项，在store中记录答案 （题目id，答案id）
    chooseAnswer(topic_id, topic_answer_id) {
      this.$store.commit("recordAnswer", { topic_id, topic_answer_id });
    },
    // 点击下一题按钮（题目id）
    nextQuestion(topic_id) {
      // 如果答案中已经记录了这个题的答案，则可以跳到下一题
      if (this.answers[topic_id]) {
        this.$store.commit("nextQuestion");
      } else {
        alert("您还没有选择本题答案");
      }
    },
    // 返回上一题
    ...mapMutations(["lastQuestion"]),
    // 点击提交按钮
    submitAnswers() {
      let rightAnswers = {};
      // 清除分数
      this.$store.commit("clearScore");
      // 计分
      this.questions.forEach(i => {
        i.topic_answer.forEach(j => {
          if (j.is_standard_answer == 1) {
            rightAnswers[i.topic_id] = j.topic_answer_id;
            if (this.answers[i.topic_id] == j.topic_answer_id) {
              this.$store.commit("addScore", 100 / this.questions.length);
            }
          }
        });
      });
      // 跳转页面
      this.$router.push("/score");
    }
  }
};
</script>

<style lang="scss">
.home_container {
  height: 100%;
  background-image: url("/images/1-1.jpg");
}
.next_item {
  background-image: url("/images/2-2.png");
}

.submit_item {
  background-image: url("/images/3-1.png");
}

.item_back {
  background-image: url("/images/2-1.png");
  background-size: 100% 100%;
}

.item_title {
  font-size: 0.65rem;
  color: #fff;
  line-height: 0.7rem;
}

.item_list_container {
  margin: 2.5rem;
  padding: 0;
}

.item_list {
  font-size: 0;
  margin-top: 0.4rem;
  width: 10rem;
  span {
    display: inline-block;
    font-size: 0.6rem;
    color: #fff;
    vertical-align: middle;
  }
  .option_style {
    height: 0.725rem;
    width: 0.725rem;
    border: 1px solid #fff;
    border-radius: 50%;
    line-height: 0.725rem;
    text-align: center;
    margin-right: 0.3rem;
    font-size: 0.5rem;
    font-family: "Arial";
  }
  .has_choosed {
    background-color: #ffd400;
    color: #575757;
    border-color: #ffd400;
  }
  .option_detail {
    width: 7.5rem;
    padding-top: 0.11rem;
  }
}

// 上一题
.back_last {
  display: block;
  font-weight: 700;
  position: absolute;
  top: 3.5rem;
  margin-left: 2.4rem;
  color: rebeccapurple;
}
</style>