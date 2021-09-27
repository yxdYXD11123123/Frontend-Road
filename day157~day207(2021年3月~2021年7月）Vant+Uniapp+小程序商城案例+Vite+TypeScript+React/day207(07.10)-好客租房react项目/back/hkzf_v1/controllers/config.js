const fs = require('fs'),
    path = require('path'),
    dataBash = require('../dataBash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * @return {string}
 */
function GUID(name = "") {
    /**
     * @return {string}
     */
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (name + S4() + S4() + "-" + S4() + "-" + S4());

}

module.exports = {
    // 初始化项目
    init: async ctx => {
        return;
        /**
         *
         console.log("读取城市列表");
         let city = await fs.readFileSync(path.join(__dirname, '../data/city.json'), 'utf8');
         city = JSON.parse(city.toString());
         city['RECORDS'] = city['RECORDS'].map(v => new Promise(async resove => {
            let data = await dataBash.House.citySave({
                name: v.name,
                code: v.code,
                type: v.type,
                superior: v.superior
            });
            resove();
        }));
         // 读取地区json文件
         console.log('读取地区文件');
         let areaLists = await fs.readFileSync(path.join(__dirname, '../data/areaLists.json'), 'utf8');
         areaLists = JSON.parse(areaLists.toString());
         areaLists['RECORDS'] = areaLists['RECORDS'].map(v => new Promise(async resolve => {
            await dataBash.House.areaSave({
                "city": v.city,
                "cityName": v.city_name,
                "area": v.area,
                "areaName": v.area_name,
                "street": v.street,
                "streetName": v.street_name,
                "community": v.community,
                "communityName": v.community_name
            });
            resolve();
        }));
         console.log('存储地区列表');
         await Promise.all(areaLists['RECORDS']);
         areaLists = null;
         console.log('地区列表配置成功');

         //读取朝向列表
         console.log("读取朝向列表");
         let orientedList = await fs.readFileSync(path.join(__dirname, '../data/orienteds.json'), 'utf8');
         orientedList = JSON.parse(orientedList.toString());
         orientedList['RECORDS'] = orientedList['RECORDS'].map(v => new Promise(async resove => {
            await dataBash.House.orientedSaver({
                name: v.name,
                code: v.code
            });
            resove();
        }));
         console.log("存储朝向列表");
         await Promise.all(orientedList['RECORDS']);
         orientedList = null;
         console.log('朝向列表配置成功');

         // 地铁线路配置
         console.log("读取地铁列表");
         let subwayList = await fs.readFileSync(path.join(__dirname, '../data/subways.json'), 'utf8');
         subwayList = JSON.parse(subwayList.toString());
         subwayList['RECORDS'] = subwayList['RECORDS'].map(v => new Promise(async resove => {
            await dataBash.House.subwaySaver({
                areaSubwayName: v.area,
                station: v.station,
                platform: v.platform,
                code: v.code
            });
            resove();
        }));
         console.log("存储地铁列表");
         await Promise.all(subwayList['RECORDS']);
         subwayList = null;
         console.log('朝向地铁配置成功');

         // 房型
         let roomType = await fs.readFileSync(path.join(__dirname, '../data/roomTypes.json'), 'utf8');
         roomType = JSON.parse(roomType.toString())['RECORDS'];
         roomType = roomType.map(v => new Promise(async resolve => {
            await dataBash.House.roomTypeSaver({
                name: v.name,
                code: v.code
            });
            resolve();
        }));
         await Promise.all(roomType);
         roomType = null;
         console.log('房型配置');

         // 设备
         let device = await fs.readFileSync(path.join(__dirname, '../data/devices.json'), 'utf8');
         device = JSON.parse(device.toString())['RECORDS'];
         device = device.map(v => new Promise(async resolve => {
            await dataBash.House.deviceSaver({
                name: v.name,
                code: v.code
            });
            resolve();
        }));
         await Promise.all(device);
         device = null;
         console.log('设备配置');

         console.log("读取特色列表");
         let characteristicList = await fs.readFileSync(path.join(__dirname, '../data/characteristics.json'), 'utf8');
         characteristicList = JSON.parse(characteristicList.toString());
         characteristicList['RECORDS'] = characteristicList['RECORDS'].map(v => new Promise(async resove => {
            await dataBash.House.characteristicSaver({
                name: v.name,
                code: v.code
            });
            resove();
        }));
         **/
            // 房屋
        let houses = await fs.readFileSync(path.join(__dirname, '../data/houses.json'), 'utf8');
        houses = JSON.parse(houses.toString())['RECORDS'];
        console.log("数据读取成功");
        // houses = [houses[0]];
        // houses = houses.map((v, i) => new Promise(async resolve => ));

        for (; houses.length > 0;) {
            let v = houses.splice(0, 1)[0];
            let roomType = '';
            if (v.room_type_name.indexOf('1室') >= 0) roomType = "一室";
            else if (v.room_type_name.indexOf('2室') >= 0) roomType = "二室";
            else if (v.room_type_name.indexOf('3室') >= 0) roomType = "三室";
            else if (v.room_type_name.indexOf('4室') >= 0) roomType = "四室";
            else roomType = "四室+";
            let time = v.time.split(" ")[0].split("/");
            time = `2019/${time[1]}/${time[0]}`;
            // let myHouse = await dataBash.House.houseSave();
            let myHouse = {
                carouselMap: v.carouselMap,
                houseCode: v.houseCode,
                title: v.title,
                description: v.description,
                entire: v.entire,
                priceNum: v.price_num,
                roomTypeName: roomType,
                community: v.community,
                orientedName: v.oriented_name,
                floor: v.floor,
                time: new Date(time),
                priceType: v.priceType,
                supporting: v.supporting,
                coord: JSON.parse(v.coord.replace("\/", "")),
                areaName: v.area_name,
                tags: v.tags && v.tags.split("|").filter(v => v).join("|"),
                line: v.line_name && v.line_name.split("|").filter(v => v).join("|"),
                size: v.size,
                userCode: v.userCode,
                releaseNews: v.releaseNews || 0,
                characteristic_name: v.characteristic_name && v.characteristic_name.split('|').filter(v => v).join("|"),
                characteristicID: '',
                lineID: '',
                tagsID: '',
                areaID: '',
                supportingID: '',
                priceTypeID: '',
                floorID: '',
                orientedID: '',
                communityID: '',
                roomTypeID: ''
            };
            // 房屋类型处理
            roomType = await dataBash.House.roomTypeFindOne({where: {name: roomType}});
            myHouse.roomTypeID = roomType.code;
            // 城市code
            // let area = await dataBash.House.
            // 地区
            let community = await dataBash.House.areaFindOne({where: {communityName: v.community}});
            if (community) myHouse.areaID = `${Config.city}|${community.area}|${community.street}|${community.community}`;
            let area = v.area_name.split('|');
            // 地铁
            if (v.line_name) {
                let line = [...new Set(v.line_name.split("|"))];
                let subway = await dataBash.House.subwayFind({
                    where: {
                        [Op.or]: line.map(v => ({
                            platform: v,
                            areaSubwayName: area[0]
                        })).filter(v => v.platform)
                    }
                });
                myHouse.lineID = subway.map(v => v.code).join(",");
                myHouse.lineNum = subway.map(v => v.station).join(",")
            }
            // 特色
            if (v.tags) {
                let tags = v.tags.split('|').filter(v => v);
                tags = await dataBash.House.characteristicFind({
                    where: {
                        [Op.or]: tags.map(v => ({name: v}))
                    }
                });
                myHouse.tagsID = tags.map(v => v.code).join(",");
            }

            //设备
            if (v.supporting) {
                let supporting = v.supporting.split("|");
                supporting = await dataBash.House.deviceFind({
                    where: {
                        [Op.or]: supporting.map(v => ({name: v}))
                    }
                });
                myHouse.supportingID = supporting.map(v => v.code).join(",")
            }

            //朝向
            if (v.oriented_name) {
                let oriented = v.oriented_name.split("|");
                oriented = await dataBash.House.orientedFind({
                    where: {
                        [Op.or]: oriented.map(v => ({
                            name: v
                        }))
                    }
                });
                myHouse.orientedID = oriented.map(v => v.code).join(",");
            }

            // console.log(myHouse, v);
            // return;
            await dataBash.House.houseSave(myHouse);
            console.log(houses.length);
        }

    },

    // 配置数据
    configuration: async ctx => {

        // 对地区进行处理
    }
};
