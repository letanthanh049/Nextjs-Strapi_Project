import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout';
import { Carousel, ListGroup, Card, Breadcrumb, Pagination } from 'flowbite-react';
import { BsFillPhoneFill } from 'react-icons/bs'
import { MdEmojiObjects } from 'react-icons/md'
import SanPham from '../sanpham';
import { HiHome } from 'react-icons/hi'
import { ProductCard } from '../components/product_card';
import { IconButton } from './IconButton';
import { GiClothes } from "react-icons/gi"
import axios from 'axios';
import { Button } from "flowbite-react"

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ProductCardCarousel } from '../components/product_card_carousel';


const Category = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategory] = useState([])
    async function fetchData() {
        const res = await axios.get(`http://localhost:1337/api/danhmucs?fields[0]=TenDM&populate[Theloai][fields][0]=TenTL`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24'
                }
            })
        setCategory(res.data.data)
        
    }
    const [currentpage, setCurrentpage] = useState(1)
    const [profilepagination, setProfilepagination] = useState([])

    const onPageChange = (e) => {
        setCurrentpage(e)
    }

    async function fetchProduct() {
        const res = await axios.get('http://localhost:1337/api/sanphams?pagination[page]=' + currentpage + '&pagination[pageSize]=8&fields[0]=TenSP&fields[1]=Hinhanh&fields[2]=Giatien&populate[Chitiet_sanpham][populate][Danhmuc][fields][0]=TenDM', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
            }
        })
        setProducts(res.data.data)
        setProfilepagination(res.data.meta)
    }

    useEffect(() => {
        fetchProduct()
    }, [currentpage])

    useEffect(() => {

        fetchData()
    }, [])
    return (

        <>
                {profilepagination && profilepagination.pagination && products ?  
            <Layout title="Danh mục" maxwidth='max-w-screen-xl'>

                <div className="grid h-auto mt-4 mb-4 rounded-lg bg-slate-200">
                    <div className='text-center py-2 px-4 '>
                        <h2 className='px-2 py-2 text-black md:text-3xl font-semibold text-xl'>Khám phá danh mục</h2>
                    </div>

                    <ul className='flex flex-wrap gap-4 justify-around items-center mb-4 '>
                        {categories.slice(0, 5).map((category) => (
                            <li className='flex items-center' key={category.id}>
                                <Link className='button' href={`/categories/category/${category.id}?TenDM=${category.attributes.TenDM}`}>
                                    < Button className="bg-black hover:bg-slate-600 text-[13px]" outline={true}>
                                        {
                                            category.attributes.TenDM

                                        }
                                    </ Button>

                                </Link>
                            </li>

                        ))}
                    </ul>


                </div>

                <Breadcrumb className='mb-5'>
                    <Breadcrumb.Item href='/' icon={HiHome}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
                </Breadcrumb>
                <div className='w-full flex flex-wrap'>
                    {
                        products.map(product => (
                            <ProductCardCarousel
                                discount={false}
                                href={"/sanpham/" + product.id}
                                image={product.attributes.Hinhanh}
                                title={product.attributes.TenSP}
                                price={product.attributes.Giatien}

                            />

                        ))
                    }

                </div>
                <Pagination
                                className='w-fit mx-auto'
                                currentPage={currentpage}
                                onPageChange={e => onPageChange(e)}
                                showIcons={true}
                                totalPages={profilepagination.pagination.pageCount}
                            />
                


            </Layout >

                :null}

        </>
    )
}

export default Category