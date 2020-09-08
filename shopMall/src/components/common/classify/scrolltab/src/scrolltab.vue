<template>
    <div class="yd-scrolltab">
        <div class="yd-scrolltab-nav" ref="navbox">
            <a href="javascript:;"
               class="yd-scrolltab-item f15 tc"
               v-for="(item, key) in navList"
               :key="key"
               :ref="`tabitem_${key}`"
               :class="activeIndex == key ? 'yd-scrolltab-active' : ''"
               @click="moveHandler(key)">
                <div class="yd-scrolltab-icon"><i :class="item.icon"></i></div>
                <div class="yd-scrolltab-title">{{item.label}}</div>
            </a>
        </div>
        <div class="yd-scrolltab-content" ref="scrollView">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-scrolltab',
        data() {
            return {
                scrolling: false,
                navList: [],
                activeIndex: this.index,
                timer: null,
                navtop: 0
            }
        },
        props: {
            index: {
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                },
                default: 0
            },
            callback: {
                type: Function
            }
        },
        methods: {
            init() {
                this.scrollView = this.$refs.scrollView;

                this.contentOffsetTop = this.scrollView.getBoundingClientRect().top;

                this.bindEvent();
            },
            addItem(panel) {
                this.navList.push(panel);
            },
            getPanels() {
                return this.$children.filter(item => item.$options.name === 'yd-scrolltab-panel');
            },
            bindEvent() {
                this.scrollView.addEventListener('scroll', this.scrollHandler);
                window.addEventListener('resize', this.scrollHandler);
            },
            setDefault() {
                this.getPanels().every((panel, index) => {
                    if (this.activeIndex === index) {
                        this.moveHandler(index);
                        return false;
                    }
                    return true;
                });
            },
            moveHandler(index) {
                this.activeIndex = index;

                this.scrollContent(index);
            },
            scrollContent(index) {
                if (this.scrolling) return;
                this.scrolling = true;

                const itemOffsetTop = this.getPanels()[index].$el.getBoundingClientRect().top;
                this.scrollView.scrollTop = itemOffsetTop + this.scrollView.scrollTop - this.contentOffsetTop + 2;

                setTimeout(() => {
                    this.scrolling = false;
                }, 10);
            },
            navInView(index = 0) {
                const navitem = this.$refs['tabitem_' + index][0];
                const height = ~~navitem.offsetHeight;

                if (navitem.offsetTop - height <= this.navtop) {
                    this.navtop -= height;
                } else {
                    if (navitem.offsetTop + height * 3 >= this.scrollView.offsetHeight) {
                        this.navtop += height;
                    }
                }

                this.$refs.navbox.scrollTop = this.navtop;
            },
            scrollHandler() {
                if (this.scrolling) return;

                const panels = this.getPanels();
                const panelsLength = panels.length;
                const scrollBox = this.scrollView;
                const scrollBoxHeight = scrollBox.offsetHeight;
                const scrollBoxTop = scrollBox.scrollTop;
                const panelItemHeight = panels[0].$el.offsetHeight;

                if (scrollBoxTop >= panelItemHeight * panelsLength - scrollBoxHeight) {
                    this.activeIndex = panelsLength - 1;
                    return;
                }

                panels.forEach((panel, index) => {
                    if (panel.$el.getBoundingClientRect().top <= this.contentOffsetTop) {
                        this.activeIndex = index;
                    }
                });
            }
        },
        watch: {
            navList() {
                this.setDefault();
            },
            activeIndex(index) {
                this.navInView(index);
                this.callback && this.callback(index);
            },
            index(index) {
                this.scrollContent(index);
                this.activeIndex = index;
            }
        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.scrollView.removeEventListener('scroll', this.scrollHandler);
            window.removeEventListener('resize', this.scrollHandler);
        }
    }
</script>
<style lang="scss">
$css-prefix: yd;
$line-high-color: #e4e4e4;
 .yd-scrolltab-item{height: 60px !important;}

@mixin right-line($color, $zindex: 0) {
  content: '';
  position: absolute;
  z-index: $zindex;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  /* background-image: linear-gradient(to right, $color 50%, transparent 50%); */
}

@mixin bottom-line($color, $zindex: 0) {
  height: 1px;
  position: absolute;
  z-index: $zindex;
  bottom: 0;
  left: 0;
  content: '';
  width: 100%;
  /* background-image: linear-gradient(0deg, $color 50%, transparent 50%); */
}

.#{$css-prefix} {
  &-scrolltab {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    &-nav {
      height: 100%;
      background-color: #F5F5F5;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      position: relative;
      z-index: 1;
      &:after {
        @include right-line(#DFDFDF);
      }
    }


    &-item {
      height:46px;
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;

      &:after {
        @include bottom-line(#DFDFDF);
      }
      &:before {
        @include right-line(#DFDFDF);
      }
      &:active {
        background: none; /* for firefox */
      }
    }

    &-active {
      background-color: #FFF;
      border-left: 5px solid #45B7FF;
      &:before {
        @include right-line(#FFF);
      }
      &:active {
        background-color: #FFF;
      }
    }
    &-active &-title{color: #45B7FF !important; margin-left: -5px;}
    &-icon {
      margin-right: .2rem;
      font-size: .32rem;
      display: flex;
      align-items: center;
      justify-content: center;
      > img {
        height: .4rem;
        display: inline-block;
      }
    }

    &-title {
      color: #666;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-content {
      height: 100%;
      background-color: #FFF;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      flex: 1;
      padding: 0 .24rem .24rem .24rem;
      position: relative;
    }

    &-content-title {
      font-size: 17px;
      font-weight: normal;
      line-height: (92rem/40);
      color: #282828;
      display: block;
      height: (92rem/40);
      position: relative;
      z-index: 1;
      /* &:after {
        @include bottom-line($line-high-color);
      } */
    }
  }
}
</style>
