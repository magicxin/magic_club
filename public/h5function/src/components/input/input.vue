<template>
  <table>
    <tr>
      <td v-if="title != ''">
        <label flex="noshrink" layout="row">{{title.split("").join(' ')}}</label>
      </td>
      <td>
        <input type="text" @input="update($event.target)" :placeholder="placeholder">
      </td>
    </tr>
  </table>
</template>

<script>
/**
 * 自定义input组件 
 * 原则: 组件仅针对view展示做解耦封装, 定制或非基本功能 请尽量在业务代码中实现
 * @author wangxin 2017-12-26
 * @description 1.input的基本功能; 2.手机端(ios)较小的光标展示  
 * @augments title 输入框的标题 String
 * @augments placeholder input无内容时的文字占位符, 作提示用
 * @augments inputReg 输入数据的校验, false则不允许输入
 * @todo 扩展, 请尽量遵守上述原则, 并做适当的注释说明
 */
export default {
  name: "icar-input",
  props: {
    title: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    inputReg: {
      type: RegExp,
      default: new RegExp("","g")
    }
  },
  data(){
    return {
      oldValue: ''
    }
  },
  methods: {
    update(t){
      // 输入限制
      console.log(t.value,this.inputReg.test(t.value))
      if (this.inputReg.test(t.value)){
        this.oldValue = t.value
        this.$emit('input', t.value.trim())
      } else {
        t.value = this.oldValue
      }
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  color: #767676;
  background: #fff;
  td:first {
    width: 33%;
  }
  td {
    padding: 10px;
    font-size: 1.3rem;
    label {
      padding: 0 10px;
    }
    input {
      border: none;
      outline: none;
      color: #999999;
      width: 100%;
      font-size: 1.2rem;
      line-height: normal;
    }
  }
}
</style>



