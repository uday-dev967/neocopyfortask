<template>
    <Section>
        <div class="top-nav">
            <div class="neo-conatiner">
                <p>Neo</p>
            </div>
            <div class="login-Button">
                <Button>Log In</Button>
            </div>
        </div>
        <div class="content-bar" v-if="false">
            <p class="publish-by">Published by - </p>
            <p class="nov">Views :24</p>
            <button>Preview</button>
        </div>
        <div v-if="!isRenderTypeCuboidAvailable" class="images-main-container">
            <div v-for="(item, index) in renders" :key="index">
                <img :src="item.enhancedImage?item.enhancedImage:item.image" alt="">
            </div>
        </div>
        <div v-else class="pano-viewer-wrapper">
            <div id="PanoCanvas"></div>
        </div>
    </Section>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
    asyncData(context) {
        return context.$axios.get(`/rm/gallery/${context.params.id}`)
        .then((res) => {

            return { renders: res.data.data.renders,title:'custom title',description:'my cutom description',
            ogDescription:'my custom og des' }
        })
        .catch((e) => {
            console.log(e);
            // error({ statusCode: 404, message: 'Post not found' })
        })
    },
    head () {
    return {
        title: 'Neo - Gallery',
        meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: this.description },
                {  name: 'og:title', content: this.title },
                {  name: 'og:description', content: this.ogDescription },
                {  name: 'og:image', content: 'https://foyr.com/wp-content/uploads/2020/02/banner-image.jpg?x67681' },
                {   name:"twitter:title", content:"European Travel Destinations "},
                {   name:"twitter:description", content:" Offering tour packages for individuals or groups."}
            ]   
        }
    },
    data() {
        return {
            camera: undefined,
			controls: undefined,
			renderer: undefined,
			scene: undefined,
			materials: [],
            cuboids: ""
        }
    },
    mounted() {
        if (this.isRenderTypeCuboidAvailable) {
            this.init();
            this.animate();
            this.updateTexture();
        }
	},
    computed: {
        isRenderTypeCuboidAvailable() {
            if (this.getCuboidRender) return true;
            return false;
        },
        getCuboidRender() {
            if (this.renders && this.renders.length > 0) {
                return this.renders.find(e => e.renderType === "cuboid")
            }

            return ""
            
        }
    },
    methods: {
        init() {
			const container = document.getElementById("PanoCanvas");
            let canvasParent = document.querySelector(".pano-viewer-wrapper");
            let canvasParentDimensions = {};
            if (canvasParent) {
                canvasParentDimensions = canvasParent.getBoundingClientRect();
            } else {
                canvasParentDimensions = {
                    height: window.innerHeight,
                    width: window.innerWidth
                };
            }

			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(canvasParentDimensions.width, canvasParentDimensions.height);
			container.appendChild(this.renderer.domElement);

			this.scene = new THREE.Scene();

			this.camera = new THREE.PerspectiveCamera(
				60,
				canvasParentDimensions.width / canvasParentDimensions.height,
				0.1,
				100
			);
			this.camera.position.z = 0.01;

			this.controls = new OrbitControls(
				this.camera,
				this.renderer.domElement
			);
			this.controls.enableZoom = false;
			this.controls.enablePan = false;
			this.controls.enableDamping = true;
			this.controls.rotateSpeed = -0.25;

			this.materials = [];

			for (let i = 0; i < 6; i++) {
				this.materials.push(
					new THREE.MeshBasicMaterial({
						side: THREE.DoubleSide,
					})
				);
			}

			const skyBox = new THREE.Mesh(
				new THREE.BoxGeometry(1, 1, 1),
				this.materials
			);
			skyBox.geometry.scale(1, 1, 1);
			this.scene.add(skyBox);

			window.addEventListener("resize", this.onWindowResize);
		},
		updateTexture() {
			const textures = this.getTexturesFromAtlasFile(this.getCuboidRender.image, 6);
			for (let i = 0; i < this.materials.length; i++) {
				this.materials[i].map = textures[i];
				this.materials[i].needsUpdate = true;
			}
		},
		getTexturesFromAtlasFile(atlasImgUrl, tilesNum) {
			const textures = [];
			for (let i = 0; i < tilesNum; i++) {
				textures[i] = new THREE.Texture();
			}

			new THREE.ImageLoader().load(atlasImgUrl, (image) => {
				let canvas, context;
				const tileWidth = image.height;

				for (let i = 0; i < textures.length; i++) {
					canvas = document.createElement("canvas");
					context = canvas.getContext("2d");
					canvas.height = tileWidth;
					canvas.width = tileWidth;
					context.drawImage(
						image,
						tileWidth * i,
						0,
						tileWidth,
						tileWidth,
						0,
						0,
						tileWidth,
						tileWidth
					);
					textures[i].image = canvas;
					textures[i].needsUpdate = true;
				}
			});
			return textures;
		},
		onWindowResize() {
			this.camera.aspect = canvasParentDimensions.width / canvasParentDimensions.height;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(canvasParentDimensions.width, canvasParentDimensions.height);
		},
		animate() {
			requestAnimationFrame(this.animate);
			this.controls.update(); // required when damping is enabled
			this.renderer.render(this.scene, this.camera);
		},
    },
}
</script>
<style lang="scss" scoped>
section{
    .top-nav{
        height: 36px;
        display: grid;
        grid-template-columns: max-content 1fr;
        background: linear-gradient(90deg,  #201F20 0%, #4D4C4D  100%), #4D4C4D;
        place-item: center;
        .neo-conatiner{
            background: #E9BEB3;
            display: grid;
            height: 36px;
            align-content: center;
            p{
                color: #201F20;
                font-size: 1.2rem;
                margin: 0px;
                text-transform: uppercase;
                padding: 0px 1.5rem;
            }
        }
        .login-Button{
            justify-self: end;
            margin-right: 1.5rem;
            align-self: center;
            button{
                font-size: 0.8125rem;
                color: #E9BEB3;
                border: 1px solid #E9BEB3;
                padding: 0.5rem 1.25rem ;
                background: none;
            }
        }
        
    }
    .content-bar{
        background: #0E0E0E;
        height: 52px;
        display: grid;
        grid-template-columns: 1fr 1fr max-content;
        align-items: center;
        .publish-by{
            font-weight: 500;
            font-size: 0.875rem;
            color: #FFFFFF;
            padding-left: 3.75rem;
            margin: 0px;
        }
        .nov{
            color: #E9BEB3;
            font-weight: 500;
            font-size: 0.875rem;
            margin: 0px;
        }
        button{
            background: #E9BEB3;
            padding: 0.5rem 1.25rem ;
            font-size: 0.9375rem;
            color: #0E0E0E;
            height: max-content;
            margin-right: 1.5rem;
        }
    }
    .images-main-container{
        padding: 56px 54px;
        text-align: center;
        display: grid;
        grid-row-gap: 24px;
        div{
            img{
                max-width: 100%;
            }
        }
    }

    .pano-viewer-wrapper {
        height: calc(100vh - 36px);
        width: 100%;
        background-color: $color-white;
    }
}
</style>