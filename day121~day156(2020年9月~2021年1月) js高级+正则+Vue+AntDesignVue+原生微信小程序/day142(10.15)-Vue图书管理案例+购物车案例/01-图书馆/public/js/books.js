let vm = Vue.createApp({
    data() {
        return {
            books: [],
            bname: '',
            bid: '',
            isMoidify: false,
            ishad: true
        }
    },
    created() {
        this.getBooks()
    },
    methods: {
        // 获取数据并渲染
        async getBooks() {
            let res = await axios.get('/books');
            if (res.status == 200) {
                this.books = res.data;
            }
        },
        // 删除数据
        async removeBook(id) {
            let res = await axios.delete(`/books/${id}`);
            if (res.status == 200) {
                this.getBooks();
            }
        },
        // 修改数据
        async modifyBook(id) {
            let res = await axios.get('/books/' + id);
            if (res.status == 200) {
                this.bid = res.data.id;
                this.bname = res.data.name;
                this.isMoidify = true;
            }
        },
        async addBook() {
            // 修改数据
            if (this.isMoidify) {
                if (this.bname.trim().length > 0) {
                    let res = await axios.put('books/' + this.bid, {
                        name: this.bname
                    });
                    if (res.data.status == 200) {
                        this.getBooks();
                        this.bid = '';
                        this.bname = '';
                        this.isMoidify = false;
                    }
                }
            }
            // 添加数据
            else {
                if (this.bname.trim().length > 0) {
                    let res = await axios.post('books', {
                        name: this.bname.trim()
                    })
                    if (res.status == 200) {
                        this.bname = '';
                        this.getBooks();
                    }
                }
                else {
                    alert('书名不能为空')
                }
            }
        }
    },
    computed: {
        sum() {
            return this.books.length;
        }
    },
    watch: {
        bname() {
            let result = this.books.some(element => {
                if (element.name == this.bname) {
                    return true;
                }
            });
            this.ishad = result;
        }
    }
});

vm.mount('#app');

