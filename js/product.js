const app = Vue.createApp({
    data() {
        return {
            products: [],
            selectedProduct: {},
            isShow: false
        };
    },
    methods: {
        checkLogin() {
            axios.post("https://ec-course-api.hexschool.io/v2/api/user/check")
                .then(res => {
                    this.getProduct();
                    this.isShow = true;
                })
                .catch(err => {
                    alert('您沒有權限進入!')
                    location.href = "index.html";
                });
        },
        getProduct() {
            axios.get("https://ec-course-api.hexschool.io/v2/api/moreene/admin/products")
                .then(res => {
                    this.products = res.data.products;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        checkDetail(id) {
            this.selectedProduct = this.products.find(item => item.id === id);
        },
        showImage(id){
            this.selectedProduct.imageUrl = this.selectedProduct.imagesUrl[id]
        }
    },
    mounted() {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    },
});

app.mount("#app");