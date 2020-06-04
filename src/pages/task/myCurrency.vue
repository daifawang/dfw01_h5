<template>
    <div>
        <!-- <loading v-show="!loadSuccess"></loading> -->
        <div  class="my-currency">
            <div class="top-box" ref="topBox">
                <div class="header">
                    <div class="header-top">
                        <div @click="goBack" class="back-icon">
                            <img src="../../assets/images/task/fanhui_jiantou.png">
                        </div>
                        <div>我的元宝</div>
                        <div @click="goRule" class="rule-icon">
                            <img src="../../assets/images/task/wenhao.png">
                        </div>
                    </div>
                    <div class="header-middle">
                        <span class="desc">可用元宝</span>
                        <span class="num">{{coinNewCount}}</span>
                        <img src="../../assets/images/task/yuanbao.png" class="yb-icon">
                    </div>
                </div>
                <div class="currency-detail">
                    <div class="total-box" ref="zsGuide">
                        <div>
                            <div class="total-desc">总获取</div>
                            <div class="had-num">{{coinSum}}</div>
                        </div>
                        <div>
                            <div class="total-desc">已使用</div>
                            <div class="used-num">{{coinPoints}}</div>
                        </div>
                    </div>
                    <div class="gray-bg-line"></div>
                    <div class="coin-list">
                        <div class="cl-tag">
                            <div v-for="(item,index) in type" :key="index" :class="{'act-tag':activeTag==item.id}"
                                @click="changeTab(item.id)">{{item.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="coin-detail" id="coinDetail" :style="{marginTop:topBoxHeight+'px'}" ref="coinDetail">
                <van-loading v-if="showLoading" size="24px" vertical>加载中...</van-loading>
                <div v-if="coinDetail.length>0">
                    <div v-for="(item,index) in coinDetail" :key="index" class="coin-detail-wrapper">
                        <div>
                            <div class="goods-name">{{item.goodsName}}</div>
                            <div class="created-time">{{item.createdTime}}</div>
                        </div>
                        <div class="coin-num" :class="{'red-font':Number(item.coinNum)<0}">{{item.coinNum}}</div>
                    </div>
                </div>
                <div v-if="showNoData" class="load-more">暂无元宝数据</div>
                <div v-if="loadingMore && coinDetail.length>0" class="load-more">加载中~</div>
            </div>
            <div v-if="!loadingMore" class="bottom">已经到底啦~</div>
        </div>
    </div>

</template>
<script>
import { AppJsBridge, hybappObj } from "@/assets/js/hybApp_api.js";
import Const from "@/assets/js/const";
import loading from "@/components/loading.vue";
export default {
    name: "myCurrency",
    data() {
        return {
            type: [
                { name: "全部", id: "0" },
                { name: "已获取", id: "1" },
                { name: "已使用", id: "2" }
            ],
            loadSuccess: false,
            showLoading: false,
            showNoData: false,
            boxHeight: document.documentElement.clientHeight, //盒子高度
            activeTag: 0, //0 全部 1 已获取  2 已使用 被选中状态
            coinNewCount: "0", //可使用元宝数目
            coinPoints: "0", //已消费元宝数目
            coinSum: "0", //累计获得元宝数目
            pageNum: 0, //分页page_num
            loadingMore: true, //到达底部加载更多开关
            topBoxHeight: 200,
            coinDetail: [] //元宝列表
        };
    },
    // components: {
    //     loading: loading
    // },
    created() {
        document.title = "我的元宝";
        AppJsBridge.hidenNavigation();
        this.initData();
        setTimeout(() => {
            this.initListData(this.activeTag);
        }, 100);
    },
    mounted() {
        console.log('this.$refs.topBox.clientHeight:'+this.$refs.topBox.clientHeight);
        this.topBoxHeight = this.$refs.topBox.offsetHeight - 39;
        window.addEventListener("scroll", this.loadeMore);
    },
    methods: {
        //数据初始化
        initData() {
            AppJsBridge.initSignData({}, 954001, param => {
                this.$http({
                    apiType: "2",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "/gateway.do",
                    data: param
                })
                    .then(res => {
                        console.log(res);
                        if (res.reCode == "0") {
                            // this.loadSuccess = true;
                            this.coinNewCount = res.result.coinNewCount;
                            this.coinPoints = res.result.coinPoints;
                            this.coinSum = res.result.coinSum;
                        } else {
                            this.$toast(res.reInfo);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            });
        },
        /* 加载更多 */
        loadeMore: function() {
            let scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            let windowHeight =
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            let scrollHeight =
                document.documentElement.scrollHeight ||
                document.body.scrollHeight;
            console.log(
                "---scrollTop:" +
                    scrollTop +
                    "---windowHeight:" +
                    windowHeight +
                    "---scrollHeight:" +
                    scrollHeight
            );
            if (scrollTop + windowHeight >= scrollHeight - 2) {
                console.log(22222222222);
                if (this.loadingMore) {
                    this.pageNum += 1;
                    console.log(this.pageNum);
                    this.initListData(this.activeTag);
                }
            }
        },
        initListData(activeTag) {
            //元宝使用列表
            AppJsBridge.initSignData(
                { type: activeTag, pageNum: this.pageNum + "" },
                954003,
                param => {
                    this.$http({
                        apiType: "2",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        url: "/gateway.do",
                        data: param
                    })
                        .then(res => {
                            console.log(res);
                            this.showLoading = false;
                            if (res.reCode == "0") {
                                if (res.result.length > 0) {
                                    this.loadingMore = true;
                                    console.log("res.result.length:" + res.result.length);
                                    let coinDetail_lists = this.coinDetail.concat(res.result); //邀请记录列表
                                    this.coinDetail = coinDetail_lists;
                                    console.log(this.coinDetail);
                                }
                                if (this.coinDetail.length <= 0 && res.result.length <= 0) {
                                    console.log(1111111111);
                                    this.showNoData = true;
                                }
                                if (this.coinDetail.length > 0 && res.result.length <= 0) {
                                    this.loadingMore = false;
                                    return;
                                }
                            } else {
                                this.$toast(res.reInfo);
                                this.loadingMore = false;
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            );
        },
        changeTab(id) {
            //切换tab
            this.showLoading = true;
            this.activeTag = id;
            this.coinDetail = [];
            this.pageNum = 0;
            this.initListData(this.activeTag);
            window.scrollTo(0, 0);
        },
        goBack() {
            //返回
            console.log("返回");
            AppJsBridge.close();
        },
        goRule() {
            //规则
            window.location.href = `${
                Const.APP_RUL
            }hyb_task_h5/dist/index.html?t=${new Date().getTime()}/#/task/myCurrencyRule?&NEW_WVW_HYB`;
        }
    }
};
</script>
<style type="text/less" lang="less"  scoped>
.background(@url,@repeat) {
    background-image: url(@url);
    background-size: cover;
    background-position: center;
    background-repeat: @repeat;
}
.font(@sise,@color,@lh) {
    font-size: @sise;
    color: @color;
    line-height: @lh;
}
.space-flex(@flex:center) {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: @flex;
    justify-content: @flex;
}
.my-currency {
    font-size: 1.125rem;
    width: 100%;
    height: 100vh;
    background: rgba(244, 245, 247, 1);
}
.top-box {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    // height: auto;
    clear:both;
}
.header {
    width: 100%;
    height: 10.625rem;
    background: url("../../assets/images/task/wdyb_bg.png") no-repeat;
    background-size: cover;
    color: #fff;
}
.header-top {
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    & div {
        display: inline-block;
    }
    .back-icon,
    .rule-icon {
        position: absolute;
        top: 12px;
        & img {
            max-width: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
    }
    .back-icon {
        left: 13px;
        width: 1.25rem;
        height: 1.25rem;
    }
    .rule-icon {
        right: 15px;
        width: 1.125rem;
        height: 1.125rem;
    }
}

.header-middle {
    margin-top: 0.9375rem;
    padding-left: 1.625rem;
    .desc {
        font-size: 1rem;
    }
    .num {
        font-size: 31px;
        font-weight: bold;
        margin: 0 11px 0 16px;
    }
    .yb-icon {
        width: 1.25rem;
        height: auto;
    }
}
.currency-detail {
    // position: absolute;
    // top:8.4375rem;
    position: relative;
    top: -35px;
    left: 0;
    // width: 100%;
    width: calc(100% - 20px);
    height: 100%;
    padding: 0 0.625rem;
    .total-box {
        padding: 0 1.0625rem;
        .space-flex(space-between);
        width: calc(100% - 2.125rem);
        height: 6.1875rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.5rem;
        text-align: left;
        .used-num {
            text-align: right;
        }
        .total-desc {
            font-size: 1rem;
            color: rgba(153, 153, 153, 1);
            line-height: 1.5625rem;
        }
        .had-num {
            font-size: 1.5rem;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
        }
        .used-num {
            font-size: 1.5rem;
            font-weight: bold;
            color: rgba(153, 153, 153, 1);
        }
    }
    .gray-bg-line {
        width: 100%;
        height: 5px;
        background-color: #f4f5f7;
    }
    .coin-list {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.5rem 0.5rem 0 0;
        padding: 1.1875rem 1rem 0rem;
        .cl-tag {
            .space-flex(flex-start);
            margin-bottom: 0.1875rem;
            font-size: 1rem;
            color: rgba(153, 153, 153, 1);
            & div {
                margin-right: 1.5625rem;
            }
            .act-tag {
                border: 0.0625rem solid rgba(228, 50, 46, 1);
                border-radius: 6.25rem;
                padding: 0rem 0.8125rem;
                color: #e4322e;
            }
        }
    }
}
.coin-detail {
    background: rgba(255, 255, 255, 1);
    border-radius: 0 0 0.5rem 0.5rem;
    padding: 0px 1rem;
    box-sizing: border-box;
    // width: 100%;
    height: auto;
    margin-top: -2.1875rem;
    margin-left: 0.625rem;
    margin-right: 0.5rem;
    //   overflow-y: scroll;
}
.coin-detail-wrapper {
    .space-flex(space-between);
    height: 4.5625rem;
    border-bottom: 0.0625rem solid #e8e8e8;
    .goods-name {
        .font(1.125rem, #1a1a1a, 1.1875rem);
        font-weight: bold;
    }
    .created-time {
        .font(0.9375rem, #6c6c6c, 1.1875rem);
        margin-top: 0.625rem;
    }
    .coin-num {
        .font(18px, #50c39c, 1.1875rem);
        font-weight: bold;
        margin-bottom: 1.875rem;
    }
    .red-font {
        color: #e4322e;
    }
}
.load-more {
    font-size: 1rem;
    color: rgba(202, 202, 202, 1);
    line-height: 3.125rem;
    text-align: center;
    height: 3.125rem;
}
.bottom {
    width: 100%;
    height: 2.5625rem;
    line-height: 2.5625rem;
    background: #f4f5f7;
    text-align: center;
    font-size: 1rem;
    color: #cacaca;
}
</style>
