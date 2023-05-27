// const utils = require('@strapi/utils');

// module.exports = {
//     async beforeCreate(ctx) {
//         const { ValidationError } = utils.errors
//         const data = ctx.params.data
//         const TenSP = data.TenSP
//         const query = strapi.db.query('api::sanpham.sanpham')

//         const duplicatedName = await query.findOne({
//             where: {
//                 TenSP: {
//                     //search both Upper and not Uppercase
//                     $eqi: TenSP
//                 }
//             }
//         })

//         if (duplicatedName)
//             throw new ValidationError('Tên sản phẩm bị trùng', { Detail: 'Tên sản phẩm "' + TenSP + '" đã được sử dụng, hãy chọn tên khác' })
//     },

//     async beforeUpdate(ctx) {
//         const { ValidationError } = utils.errors
//         const data = ctx.params.data    
//         const TenSP = data.TenSP
//         const TenMoi = data.TenMoi
//         const query = strapi.db.query('api::sanpham.sanpham')

//         const duplicatedName = await query.findOne({
//             where: {
//                 $and: [
//                     { TenSP: { $eqi: TenMoi} },
//                     { $not: { TenSP: { $eqi: TenSP } } }
//                 ]
//             }
//         })


//         if (duplicatedName)
//             throw new ValidationError('Tên sản phẩm bị trùng', { Detail: 'Tên sản phẩm "' + TenMoi + '" đã được sử dụng, hãy chọn tên khác' })
//         else throw new ValidationError('a', {Detail: ctx.params.data})
//     },
// }