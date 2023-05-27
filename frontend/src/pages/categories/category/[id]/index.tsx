import React, { useEffect, useState, useReducer } from 'react'
import { Carousel, ListGroup, Card, Breadcrumb, Pagination } from 'flowbite-react';
import axios from 'axios';
import { Button } from "flowbite-react"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '@/pages/components/layout';
import { ProductCard } from '@/pages/components/product_card';
import { HiHome } from 'react-icons/hi';
import { ProductCardCarousel } from '@/pages/components/product_card_carousel';


const SubCategory = () => {
    const router = useRouter()
    // const [task, dispatch] = useReducer(taskReducer, [])

    const [procducts, setProducts] = useState([])
    const [subcategories, setSubcategory] = useState([])

    async function fetchData() {
        const res = await axios.get(`http://localhost:1337/api/danhmucs?fields[0]=TenDM&populate[Theloai][fields][0]=TenTL`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24'
                }
            })
        setSubcategory(res.data.data[router.query.id - 1].attributes.Theloai.data)
        console.log(res.data.data[router.query.id - 1].attributes.Theloai.data)


    }
    async function fetchSubproduct() {
        const res = await axios.get(`http://localhost:1337/api/sanphams?filters[Chitiet_sanpham][Danhmuc][TenDM][$eq]=${router.query.TenDM}&fields[0]=TenSP&fields[1]=Hinhanh&fields[2]=Giatien`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24'
                }
            })
        setProducts(res.data.data)
    }
    useEffect(() => {
        if (router.query.id === undefined) {

        } else {
            fetchData()

        }
    }, [router.query.id])
    useEffect(() => {
        if (router.query.TenDM === undefined) {

        } else {
            fetchSubproduct()

        }
    }, [router.query.TenDM])
    return (

        <>
            <Layout title="Danh mục" maxwidth='max-w-screen-xl'>

                <div className="grid h-auto mt-4 mb-4 rounded-lg bg-slate-200">
                    <div className='text-center py-2 px-4 '>
                        <h2 className='px-2 py-2 text-black md:text-3xl font-semibold text-xl'>Khám phá thể loại</h2>
                    </div>

                    <ul className='flex flex-wrap gap-4 justify-around items-center mb-4 '>
                        {subcategories.slice(0, 5).map((subcategory) => (
                            <li className='flex items-center' key={subcategory.id}>
                                <Link href={`/categories/subproduct/${subcategory.id}?TenTL=${subcategory.attributes.TenTL}`}>
                                    <Button className="bg-black hover:bg-slate-600 text-[13px]" outline={true}>
                                        {
                                            subcategory.attributes.TenTL

                                        }
                                    </ Button>

                                </Link>

                            </li>

                        ))}
                    </ul>


                </div>

                <Breadcrumb className='mb-5'>
                    <Breadcrumb.Item href='/' icon={HiHome}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href='/categories'>Danh mục</Breadcrumb.Item>
                    <Breadcrumb.Item >Thể loại</Breadcrumb.Item>
                </Breadcrumb>
                <div className='w-full'>
                    <div className='w-full flex flex-wrap'>
                        {procducts.map(item => (

                            <ProductCardCarousel
                                discount={false}
                                href={"/sanpham/" + item.id}
                                image={item.attributes.Hinhanh}
                                title={item.attributes.TenSP}
                                price={item.attributes.Giatien}
                                category={router.query.TenDM}

                            />
                        ))}
                    </div>
                </div>


            </Layout >


        </>
    )
}

export default SubCategory