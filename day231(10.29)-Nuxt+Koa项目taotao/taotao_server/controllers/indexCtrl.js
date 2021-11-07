// 宫格
module.exports.gridlist = async (ctx) => {
  ctx.body = {
    status: 200,
    gridList: [
      {
        id: 1,
        img_src: "/images/nav1.png"
      },
      {
        id: 2,
        img_src: "/images/nav2.png"
      },
      {
        id: 3,
        img_src: "/images/nav3.png"
      },
      {
        id: 4,
        img_src: "/images/nav4.png"
      },
      {
        id: 5,
        img_src: "/images/nav5.png"
      },
      {
        id: 6,
        img_src: "/images/nav6.png"
      }
    ]
  }
}
// 轮播图
module.exports.banners = async (ctx) => {
  ctx.body = {
    status: 200,
    swipperList: [
      {
        id: 1,
        img_src: "/images/banner1.png",
      },
      {
        id: 2,
        img_src: "/images/banner2.png",
      },
      {
        id: 3,
        img_src: "/images/banner3.png",
      },
      {
        id: 4,
        img_src: "/images/banner4.png",
      },
      {
        id: 5,
        img_src: "/images/banner5.png",
      },
    ]
  }
}
// 运动专区
module.exports.sports = async (ctx) => {
  ctx.body = {
    status: 200,
    sports: [
      {
        name: 'adidas阿迪达斯 男式 场下休闲篮球鞋S83700',
        img: '/images/product.jpg',
        price: 1.00,
        oldPrice: 888.00
      },
      {
        name: 'FORUM 84 LOW 新款低帮经典运动鞋',
        img: '/images/product.jpg',
        price: 1.00,
        oldPrice: 899.00
      },
      {
        name: 'adidas阿迪达斯 男式 场下休闲篮球鞋S83700',
        img: '/images/product.jpg',
        price: 1.00,
        oldPrice: 888.00
      },
      {
        name: 'adidas阿迪达斯 男式 场下休闲篮球鞋S83700',
        img: '/images/product.jpg',
        price: 1.00,
        oldPrice: 888.00
      }
    ]
  }
}