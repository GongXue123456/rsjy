<template>
    <div class="yd-scrolltab-content-item">
        <van-cell class="fb f17 c28" :title="label" />
        <!-- <van-cell class="fb f17 c28" :title="label" is-link value="全部" /> -->
        <!-- <strong class="yd-scrolltab-content-title"></strong> -->
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-scrolltab-panel',
        props: {
            label: String,
            icon: String,
            active: Boolean
        },
        mounted() {
          this.$nextTick(function () {
            this.$parent.addItem({label: this.label, icon: this.icon, _uid: this._uid});
          })

        }
    }
</script>
<style>
.van-cell__value{font-size: 14px;color: #3C3C3C;font-weight: normal}
</style>
