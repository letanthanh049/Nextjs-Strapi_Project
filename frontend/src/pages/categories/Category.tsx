import React from 'react'
import { Layout } from '../components/layout';
import { Carousel, ListGroup, Card, Breadcrumb } from 'flowbite-react';
import { BsFillPhoneFill } from 'react-icons/bs'
import { MdEmojiObjects } from 'react-icons/md'
import SanPham from '../sanpham';
import { HiHome } from 'react-icons/hi'
import { ProductCard } from '../components/product_card';
import IconButton from './IconButton';

import { GiClothes } from "react-icons/gi"

const Category = () => {
    return (

        <>
            <Layout title="Danh mục" maxwidth='max-w-screen-xl'>

                <div className="grid mt-4 mb-4 rounded-lg bg-slate-200">
                    <div className='text-center py-2 px-4 '>
                        <h2 className='px-2 py-2 text-black text-3xl font-semibold'>Khám phá danh mục</h2>
                    </div>


                    <ul className='grid grid-cols-4 justify-items-center i '>

                        <li> <IconButton icon={<BsFillPhoneFill className="pr-2 text-2xl" />} label='Điện thoại' link='/categories/Category1' /></li>
                        <li> <IconButton icon={<MdEmojiObjects className="pr-2 text-2xl" />} label='Thực phẩm' link='/categories/Category1' /></li>
                        <li> <IconButton icon={<GiClothes className="pr-2 text-2xl" />} label='Trang phục' link='/categories/Category1' /></li>
                        <li> <IconButton icon={<BsFillPhoneFill className="pr-2 text-2xl" />} label='Nhu yếu phẩm' link='/categories/Category1' /></li>

                    </ul>
                </div>

                <Breadcrumb className='mb-5'>
                    <Breadcrumb.Item href='/' icon={HiHome}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
                </Breadcrumb>

                <ProductCard discount={false} href="/sanpham/AppleWatch" />


            </Layout>


        </>
    )
}

export default Category