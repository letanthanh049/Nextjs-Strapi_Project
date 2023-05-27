'use strict';

/**
 * profile controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::profile.profile', ({ strapi }) => ({
    async checkValid(ctx) {
        const data = ctx.request.body.data
        const TenGH  = data.TenGH
        const query = strapi.db.query('api::profile.profile')
        try {
            const res = await query.findOne({
                where: {
                    TenGH: {
                        //search both Upper and not Uppercase
                        $eqi: TenGH
                    }
                }
            })
            if (res) return ctx.badRequest('Tên gian hàng bị trùng', { Detail: 'Tên gian hàng ' + TenGH + ' đã được sử dụng, hãy chọn tên khác' })
            else ctx.body = "valid input"
        } catch (e) {
            ctx.body = e
        }
    },
}));
