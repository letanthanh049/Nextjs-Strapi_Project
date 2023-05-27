'use strict';

/**
 * giatri-thuoctinh controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::giatri-thuoctinh.giatri-thuoctinh', ({ strapi }) => ({
    async create(ctx) {
        const data = ctx.request.body.data
        const createdVal = []

        const queryGTTT = strapi.db.query('api::giatri-thuoctinh.giatri-thuoctinh')
        try {
            //Kiểm tra giá trị thuộc tính có trùng không, nếu không => create New, có thì chọn luôn
            await Promise.all(data.map(async obj => {
                const id = obj.Thuoctinh_theloai
                const value = obj.Giatri
                const checkDupl = await queryGTTT.findOne({
                    select: ['Giatri'],
                    where: {
                        Giatri: {
                            $eqi: value
                        }
                    },
                    populate: {
                        Thuoctinh_theloai: {
                            select: ['TenTT'],
                            where: {
                                id: id
                            }
                        }
                    }
                })

                if (checkDupl) createdVal.push(checkDupl)
                else {
                    const curTime = new Date()
                    const res = await queryGTTT.create({
                        data: {
                            Thuoctinh_theloai: { id: id },
                            Giatri: value,
                            publishedAt: curTime
                        }
                    })
                    createdVal.push(res)
                }

            }))
            ctx.body = createdVal
        } catch (e) {
            ctx.body = e
        }
    }
}));
