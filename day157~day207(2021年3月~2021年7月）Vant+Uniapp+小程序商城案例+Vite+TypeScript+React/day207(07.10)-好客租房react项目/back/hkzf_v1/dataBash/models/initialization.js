const Sequelize = Symbol('Sequelize');
module.exports = class init {
    constructor(sequelize) {
        this[Sequelize] = sequelize;
    }

    // 创建表的关系
    sync() {

        // 建立关联
        this[Sequelize]['House'].belongsToMany(this[Sequelize]['roomType'], {
            through: 'decoration',
        });
        this[Sequelize]['roomType'].belongsToMany(this[Sequelize]['House'], {
            through: 'decoration',
        });
        this[Sequelize]['House'].belongsToMany(this[Sequelize]['area'], {
            through: 'decoration'
        });
        this[Sequelize]['area'].belongsToMany(this[Sequelize]['House'], {
            through: 'decoration'
        });

        this[Sequelize]['House'].belongsToMany(this[Sequelize]['city'], {
            through: 'decoration'
        });
        this[Sequelize]['city'].belongsToMany(this[Sequelize]['House'], {
            through: 'decoration'
        });

        this[Sequelize]['House'].belongsToMany(this[Sequelize]['characteristic'], {
            through: 'decoration'
        });
        this[Sequelize]['characteristic'].belongsToMany(this[Sequelize]['House'], {
            through: 'decoration'
        });

        this[Sequelize]['House'].belongsToMany(this[Sequelize]['device'], {
            through: 'decoration'
        });
        this[Sequelize]['device'].belongsToMany(this[Sequelize]['House'], {
            through: 'decoration'
        });

        this[Sequelize]['House'].belongsToMany(this[Sequelize]['oriented'], {
            through: 'decoration'
        });
        this[Sequelize]['oriented'].belongsToMany(this[Sequelize]['House'], {
            through: 'decoration'
        });

        this[Sequelize]['House'].belongsToMany(this[Sequelize]['subway'], {
            through: 'decoration'
        });
        this[Sequelize]['subway'].belongsToMany(this[Sequelize]['House'], {
            through: 'decoration'
        });

        this[Sequelize]['House'].belongsToMany(this[Sequelize]['collection'], {
            through: 'decoration'
        });
        this[Sequelize]['collection'].belongsToMany(this[Sequelize]['House'], {
            through: 'decoration'
        });
        // this[Sequelize]['status'].sync({force: true});
        return;
        this[Sequelize]['House'].sync({force: true});
        // 创建房屋列表
        this[Sequelize]['area'].sync({force: true});
        this[Sequelize]['city'].sync({force: true});
        this[Sequelize]['subway'].sync({force: true});
        this[Sequelize]['characteristic'].sync({force: true});
        this[Sequelize]['device'].sync({force: true});
        this[Sequelize]['roomType'].sync({force: true});
        this[Sequelize]['oriented'].sync({force: true});
        // 创建用户列表
        this[Sequelize]['User'].sync({force: true});
        this[Sequelize]['collection'].sync({force: true});
        // 管理员
        this[Sequelize]['admin'].sync({force: true});

        this[Sequelize]['decoration'].sync({force: true});
    }
};
