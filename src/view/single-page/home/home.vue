<template>
    <div>
    <!-- 1780 600 -->
    <!-- 走马灯 -->
        <Carousel
            v-model="value3"             
            :autoplay="setting.autoplay"
            :autoplay-speed="setting.autoplaySpeed"
            :dots="setting.dots"
            :radius-dot="setting.radiusDot"
            :trigger="setting.trigger"
            :arrow="setting.arrow">
            <CarouselItem>
                <div class="demo-carousel"><img width="100%" src="../../../../src/assets/img/blood_1.png" alt="img"></div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel"><img width="100%" src="../../../../src/assets/img/blood_2.png" alt="img"></div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel"><img width="100%" src="@/assets/img/blood_3.png" alt="img"></div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel"><img width="100%" src="@/assets/img/blood_4.png" alt="img"></div>
            </CarouselItem>
        </Carousel>

        <!-- 内容卡片 -->
        <div class="card">

            <Row style="background:#eee;padding:20px">
                <Col >
                    <router-link to="/Eryth">
                        <Card>
                           
                                
                                <div class="moudle">
                                    
                                    
                                    <img class="moudle_image" src="@/assets/img/development.png">
                                    <div class="moudle_title">
                                       Differentiation
                                    </div>

                                </div>
                                
                                <div class='count_div'>
                                   
                                    <p  class='h3_title'>Sample's number
                                        <count-to :end="68" count-class="count-style"/>                                                              
                                    </p>
                                </div>
                                      
                        </Card>
                    </router-link>
                </Col>
                
            </Row>

            <Row style="background:#eee;padding:20px">
                <Col >
                <!-- Hema -->
                     <router-link to="/">
                        <Card>
                            <div style="text-align:center">
                                <!-- <img width="25%" height="10%" src="@/assets/img/red_sys.jpg"> -->
                                <h3 class='h3_title'>Disease</h3>
                                <!-- <p>Samples's number<count-to :end="88" count-class="count-style"/></p> -->
                                <p class='h3_title'>Sorry, This module function is under development </p>
                            </div>
                            
                        </Card>
                    </router-link>
                </Col>
            </Row>
            <Row style="background:#eee;padding:20px">
                <Col > 
                    <!-- patients -->
                    <router-link to="/">
                        <Card>
                            <div style="text-align:center">
                                <!-- <img width="25%" height="10%" src="@/assets/img/red_sys.jpg"> -->
                                <h3 class='h3_title'>Patient</h3>                            
                                <!-- <p>Sample:<count-to :end="88" count-class="count-style"/> </p> -->
                                <p class='h3_title'>Sorry, This module function is under development </p>
                            </div>
                            
                        </Card>
                    </router-link>
                    
                </Col> 
                 
            </Row>
            <Row style="background:#eee;padding:20px">
                <Col> 
                <!-- drugs -->
                    <router-link to="/">
                        <Card>
                            <div style="text-align:center">
                                <!-- <img width="25%" height="10%" src="@/assets/img/red_sys.jpg"> -->
                                <h3 class='h3_title'>Drugs</h3>
                                <!-- <p>Types:<count-to :end="88" count-class="count-style"/></p> -->
                                <p class='h3_title'>Sorry, This module function is under development </p>
                            </div>
                            
                        </Card>
                    </router-link>
                </Col>
            </Row>
        </div>
       
    
    </div>


</template>


<script>
import CountTo from '@/components/count-to'
export default {
    name:"home",
    components:{
        CountTo
    },
    data () {
            return {
                value3: 0,
                setting: {
                    autoplay: true,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover'
                }
            }
        },
   

    
}
</script>


<style lang="less">
@designWidth: 1920;

    .function {
        .px2vw(@px) {
            return: unit(( @px/@designWidth )*100, vw);
        }
    }
    .card Card{
        float: left;

        
    }
    .count-style{
        font-size:calc((90/1920) * 100vw);
        //  !important calc((90/1920) * 100vw) 
    }
    .moudle{
        float: left;
        text-align:center;
        margin-left: 30%;
        height:calc((180/1920) * 100vw);
        line-height: calc((180/1920) * 100vw);
        width:calc((450/1920) * 100vw);

    }

    .moudle_image{
        block:true;
        float: left; 
        margin-bottom:5% ;
        width: calc((120/1920) * 100vw) ;
        height:calc((180/1920) * 100vw);
        line-height: calc((180/1920) * 100vw);

    }
    .moudle_title{
        margin-top:1%;
        margin-left:15%;
        font-size: calc((30/1920) * 100vw);
        text-align:center;
        padding-left:40%;
        font-weight:bold


       
    }

    .h3_title{
		font-size:calc((30/1920) * 100vw);
		   
	}
    .count_div{
        text-align:center ;height:10%
    }
</style>
