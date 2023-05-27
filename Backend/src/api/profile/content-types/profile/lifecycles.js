const utils = require('@strapi/utils');

module.exports = {
    async beforeCreate(ctx) {
        const { ValidationError } = utils.errors
        const data = ctx.params.data
        const TenGH = data.TenGH
        const Email = data.Email
        const query = strapi.db.query('api::profile.profile')

        const duplicatedName = await query.findOne({
            where: {
                //search both Upper and not Uppercase
                TenGH: { $eqi: TenGH }
            }
        })
        const duplicatedEmail = await query.findOne({
            where: {
                //search both Upper and not Uppercase
                Email: { $eqi: Email }
            }
        })

        if (duplicatedName)
            throw new ValidationError('Tên gian hàng bị trùng', { Detail: 'Tên gian hàng "' + TenGH + '" đã được sử dụng, hãy chọn tên khác' })
        if (duplicatedEmail)
            throw new ValidationError('Tên email bị trùng', { Detail: 'Tên Email "' + Email + '" đã được sử dụng, hãy chọn email khác' })
    },

    async beforeUpdate(ctx) {
        const { ValidationError } = utils.errors
        const data = ctx.params.data    
        const TenCu = data.TenCu
        const MailCu = data.MailCu
        const TenMoi = data.TenGH
        const MailMoi = data.Email
        const query = strapi.db.query('api::profile.profile')

        const duplicatedName = await query.findOne({
            where: {
                $and: [
                    { TenGH: { $eqi: TenMoi} },
                    { $not: { TenGH: { $eqi: TenCu } } }
                ]
            }
        })
        const duplicatedEmail = await query.findOne({
            where: {
                $and: [
                    { Email: { $eqi: MailMoi} },
                    { $not: { Email: { $eqi: MailCu } } }
                ]
            }
        })


        if (duplicatedName)
            throw new ValidationError('Tên gian hàng bị trùng', { Detail: 'Tên gian hàng "' + TenMoi + '" đã được sử dụng, hãy chọn tên khác' })
        if (duplicatedEmail)
            throw new ValidationError('Tên email bị trùng', { Detail: 'Tên Email "' + MailMoi + '" đã được sử dụng, hãy chọn email khác' })
        // throw new ValidationError('Random Exception', { Detail: duplicatedEmail})
    }, 

    // async afterCreate(event) {    // Connected to "Save" button in admin panel
    //     const { result } = event;

    //     try {
    //         await strapi.plugins['email'].services.email.send({
    //             to: 'letanthanh049@gmail.com',
    //             subject: 'Test email',
    //             text: 'This is a test email',
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },
}