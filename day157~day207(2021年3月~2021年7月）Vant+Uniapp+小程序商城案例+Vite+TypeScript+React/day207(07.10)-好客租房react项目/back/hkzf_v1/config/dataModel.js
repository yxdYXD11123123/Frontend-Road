const pinyin = require("node-pinyin");
module.exports = class Config {
    // 地区列表
    static city(list) {
        if (!(list instanceof Array)) list = [list];
        return list.map(v => ({
            label: v.name,
            value: v.code,
            pinyin: pinyin(v.name, {
                style: 'normal'
            }).join(""),
            short: v.name && v.name.split("").map(v => pinyin(v, {
                style: 'normal'
            }).join("")[0]).join("")
        }))
    }

    // 房屋的列表接口
    static houseList(list = []) {
        if (!(list instanceof Array)) list = [list];

        function imgFun(v) {
            let img = v.carouselMap;
            if (img) {
                let fl = img.split("|")[0].indexOf("upload")
                img = fl >= 1 ? img.split("|")[0] : `/newImg/${img.split("|")[0]}`
            } else {
                img = '/img/img404.png'
            }
            return img
        }

        return list.map(v => ({
            houseImg: imgFun(v),
            title: v.title,
            tags: v.tags ? v.tags.split("|") : ["近地铁"],
            price: v.priceNum,
            desc: `${v.roomTypeName || ''}/${v.size || ''}/${v.orientedName || ''}/${v.community || ''}`,
            houseCode: v.houseCode,
        }))
    }
    // 房屋的详细信息
    static house(data) {
        let imgs = data.carouselMap ? data.carouselMap.split('|').map(v => {
            let fl = v.indexOf("upload")
            if (fl >= 1) return v
            else return `/newImg/${v}`
        }) : ['/img/img404.png']
        data.coord = (data.coord !== '""' ? JSON.parse(data.coord) : new Object)
        return {
            houseImg: imgs.splice(0, 8),
            title: data.title,
            tags: data.tags ? data.tags.split("|").filter(v => v !== "undefined" && v) : ["近地铁"],
            price: data.priceNum,
            // desc: `${data.roomTypeName || ''}/${data.size || ''}/${data.orientedName || ''}/${data.community || ''}`,
            // supporting: v.supporting.split("|")
            houseCode: data.houseCode,
            description: data.description,
            roomType: data.roomTypeName || "二室",
            oriented: data.orientedName ? data.orientedName.split("|").filter(v => v) : ["南"],
            floor: data.floor,
            community: data.community,
            coord: (typeof data.coord) != "object" ? JSON.parse(data.coord) : data.coord ,
            supporting: data.supporting ? data.supporting.split("|").filter(v => v).map(v => v === "床" ? "沙发" : v) : [],
            size: data.size
        }

    }

};