'use strict';

/**
 * sanpham controller
 */

const utils = require('@strapi/utils');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sanpham.sanpham', ({ strapi }) => ({
    // THÊM SẢN PHẨM
    async create(ctx) {
        const { ValidationError } = utils.errors
        const data = ctx.request.body.data
        const TenSP = data.TenSP
        const Mota = data.Mota
        const idProfile = data.Profile
        const Hinhanh = data.Hinhanh
        const Giatien = data.Giatien
        const Danhmuc = data.Danhmuc
        const Theloai = data.Theloai
        const Mausac = data.Mausac
        const Size = data.Size
        const Giatri_thuoctinh = data.Giatri_thuoctinh
        // Tạo truy vấn dựa trên từng Content-Type
        const querySP   = strapi.db.query('api::sanpham.sanpham')
        const queryCTSP = strapi.db.query('api::chitiet-sanpham.chitiet-sanpham')
        
        
        const finalResponse = [];

        try {
            const duplicatedName = await querySP.findOne({
                where: {
                    TenSP: {
                        //search both Upper and not Uppercase
                        $eqi: TenSP
                    }
                }
            })
            if (duplicatedName)
                throw new ValidationError('Tên sản phẩm bị trùng', { Detail: 'Tên sản phẩm "' + TenSP + '" đã được sử dụng, hãy chọn tên khác' })


            const curTime = new Date()
            const insertCTSP = await queryCTSP.create({
                data: {
                    Danhmuc: Danhmuc,
                    Theloai: Theloai,
                    Mausac: Mausac,
                    Size: Size,
                    Giatri_thuoctinh: Giatri_thuoctinh,
                    publishedAt: curTime
                }
            })

            const insertSP = await querySP.create({
                data: {
                    TenSP: TenSP,
                    Mota: Mota,
                    Profile: idProfile,
                    Hinhanh: Hinhanh,
                    Giatien: Giatien,
                    Chitiet_sanpham: insertCTSP.id,
                    publishedAt: curTime
                }
            })

            finalResponse.push({
                TenSP: TenSP,
                Mota: Mota,
                Profile: idProfile,
                Hinhanh: Hinhanh,
                Giatien: Giatien,
                Chitiet_sanpham: insertCTSP.id,
                Danhmuc: Danhmuc,
                Theloai: Theloai,
                Mausac: Mausac,
                Size: Size,
                Giatri_thuoctinh: Giatri_thuoctinh
            })

            ctx.body = data
        } catch (e) {
            ctx.body = e
        }
    },

    
    // SỬA SẢN PHẨM
    async update(ctx) {
        const { ValidationError } = utils.errors
        const data = ctx.request.body.data
        const url = ctx.request.URL.toString()
        const id = url.substring(url.lastIndexOf('/') + 1)
        const TenSP = data.TenSP
        const TenCu = data.TenCu
        const Mota = data.Mota
        const idProfile = data.Profile
        const Hinhanh = data.Hinhanh
        const Giatien = data.Giatien
        const Danhmuc = data.Danhmuc
        const Theloai = data.Theloai
        const Mausac = data.Mausac
        const Size = data.Size
        // Tạo truy vấn dựa trên từng Content-Type
        const querySP   = strapi.db.query('api::sanpham.sanpham')
        const queryCTSP = strapi.db.query('api::chitiet-sanpham.chitiet-sanpham')
        
        
        const finalResponse = [];

        try {
            const duplicatedName = await querySP.findOne({
                where: {
                    $and: [
                        { TenSP: { $eqi: TenSP} },
                        { $not: { TenSP: { $eqi: TenCu } } }
                    ]
                }
            })
            if (duplicatedName)
                throw new ValidationError('Tên sản phẩm bị trùng', { Detail: 'Tên sản phẩm "' + TenSP + '" đã được sử dụng, hãy chọn tên khác' })


            const curTime = new Date()
            const updateSP = await querySP.update({
                where: { id: id },
                data: {
                    TenSP: TenSP,
                    Mota: Mota,
                    Profile: idProfile,
                    Hinhanh: Hinhanh,
                    Giatien: Giatien,
                    updatedAt: curTime
                }
            })
            
            const CTSP = await querySP.findOne({
                where: { id: id },
                populate: { Chitiet_sanpham: { select: ['id'] } }
            })
            const updateCTSP = await queryCTSP.update({
                where: { id: CTSP.Chitiet_sanpham.id },
                data: {
                    Danhmuc: Danhmuc,
                    Theloai: Theloai,
                    Mausac: Mausac,
                    Size: Size,
                    updatedAt: curTime
                }
            })


            finalResponse.push({
                id: id,
                TenSP: TenSP,
                TenCu: TenCu,
                Mota: Mota,
                Profile: idProfile,
                Hinhanh: Hinhanh,
                Giatien: Giatien,
                Danhmuc: Danhmuc,
                Theloai: Theloai,
                Mausac: Mausac,
                Size: Size
            })

            ctx.body = JSON.stringify(finalResponse)
        } catch (e) {
            ctx.body = e
        }
    },


    // XÓA SẢN PHẨM
    async delete(ctx) {
        const url = ctx.request.URL.toString()
        const id = url.substring(url.lastIndexOf('/') + 1)


        // Tạo truy vấn dựa trên từng Content-Type
        const querySP   = strapi.db.query('api::sanpham.sanpham')
        const queryCTSP = strapi.db.query('api::chitiet-sanpham.chitiet-sanpham')

        const finalResponse = []

        try {
            const CTSP = await querySP.findOne({
                where: { id: id },
                populate: { Chitiet_sanpham: { select: ['id'] } }
            })
            const deleteSP = await querySP.delete({ where: { id: id } })
            const deleteCTSP = await queryCTSP.delete({ where: { id: CTSP.Chitiet_sanpham.id } })

            finalResponse.push({
                dataSP: deleteSP,
                dataCTSP: deleteCTSP
            })

            ctx.body = JSON.stringify(finalResponse)
        } catch (e) {
            ctx.body = e
        }
    }
}));