<template>
    <section>
        <div class="brand-head">
            <div class="brand-left">
                <p>Give your vision a face</p>
                <div>
                    <input autocomplete="off" type="text" placeholder="Brand Name">
                    <img src="~assets/images/pen.svg" alt="">
                </div>
            </div>
            <div class="brand-right">
                <button>Save Changes</button>
            </div>
        </div>
        <div class="brand-components">
            <div class="brand-components-left">
                <!-- <p>Color Palletes</p> -->
                <!-- <div class="color-palletes">
                    <div class="cards">
                        <div class="card">
                            <div></div>
                            <p>#B0DEFF</p>
                        </div>
                        <div class="card">
                            <div></div>
                            <p>#B0DEFF</p>
                        </div>
                        <div class="card">
                            <div></div>
                            <p>#B0DEFF</p>
                        </div>
                        <div class="card">
                            <div></div>
                            <p>#B0DEFF</p>
                        </div>
                    </div>
                </div> -->
                <p>Logo</p>
                <div class="logo-container">
                    <div class="main-logo">
                        <img src="~assets/images/logo.svg" alt="">
                        <!-- <img class="close-side" src="~assets/images/close.svg" alt=""> -->
                    </div>
                    <div class="upload">
                        <img src="~assets/images/plusborder.svg" alt="">
                        <p>Upload Logo</p>
                    </div>
                </div>
            </div>
            <!-- <div class="brand-components-right" >
                <p>Fonts</p>
                <div class="fonts-container">
                    <div class="fonts">
                        <div>
                            <Span>Calibri</Span>
                            <img src="~assets/images/closered.svg" alt="">
                        </div>
                        <div>
                            <Span>Calibri</Span>
                            <img src="~assets/images/closered.svg" alt="">
                        </div>
                        <div>
                            <Span>Calibri</Span>
                            <img src="~assets/images/closered.svg" alt="">
                        </div>
                    </div>
                    <div class="upload">
                        <img src="~assets/images/plusborder.svg" alt="">
                        <p>Upload Logo</p>
                    </div>
                </div>
            </div> -->
        </div>
    </section>
</template>
<script>
export default {
    layout: "dashboard",
    middleware: ["initAuth", "authReq"],
    head() {
        return {
        title: "Neo - Dashboard"
        };
    },
}
</script>
<style lang="scss" scoped>
.brand-head{
    background: #E9E9E9;
    padding: 1.5625rem 3.125rem;
    display: grid;
    justify-content: space-between;
    grid-template-columns: 50% 50%;
    .brand-left{
        p{

        }
        input{
            background: none;
            border: none;
            border-bottom: 0.0625rem solid $border-4;
            font-size: 1.875rem;
        }
    }
    .brand-right{
            justify-self: center;
            align-self: center;
        button{
            @include button-head(#222021);
            color: #222021;
            margin: 0rem;
            margin-left: 1.25rem;
        }
    }
}
.brand-components{
    background: #FBF3F1;
    padding: 1.5625rem 3.125rem;
    display: grid;
    grid-template-columns: max-content max-content;
    grid-gap: 3.125rem;
    p{
        margin-bottom: 0.9375rem;
    }
    .color-palletes{
        background: $color-white;
        padding: 1.25rem 6.25rem 1.25rem 1.25rem;
        margin-bottom: 2.5rem;
        .cards{
            display: flex;
            .card{
                margin-right: 0.9375rem;
                div{
                    height: 3.25rem;
                    width: 3.25rem;
                    background: #B0DEFF;
                }
                p{
                    font-size: 0.625rem;
                    margin: 0rem;
                }
            }
        }
    }
    .logo-container{
        background: white;
        padding: 1.875rem 1.25rem;
        text-align: center;
        .main-logo{
            margin-bottom: 2.1875rem;
            position: relative;
            .close-side{
                position: absolute;
                top: -0.9375rem;
            }
        }
    }
    .upload{
        display: flex;
        align-items: center;
        p{
            margin: 0rem;
            padding-left: 0.625rem;
        }
    }
    .fonts-container{
        background: $color-white;
        padding: 1.25rem;
        width: 25rem;
        span{
            font-size: 1rem;
        }
        .fonts{
            margin-bottom: 0.3125rem;
            div{
                display: flex;
                margin-bottom: 0.9375rem;
                display: -webkit-flex;
                justify-content: space-between;
            }
        }
    }
}

</style>

