import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'flowbite-react'
import Link from 'next/link';
import { Layout } from '../components/layout';
import { Breadcrumb, ListGroup, Pagination } from 'flowbite-react';
import { HiHome } from 'react-icons/hi'
import { ProductCard } from '@/pages/components/product_card';

const SanPham = () => {
    const [product, setProduct] = useState([])
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
        setProduct(res.data.data)
        setProfilepagination(res.data.meta)
    }

    useEffect(() => {
        fetchProduct()
    }, [currentpage])

    return (
        <>
            {profilepagination && profilepagination.pagination && product
                ? <Layout title="Sản phẩm" maxwidth='max-w-screen-xl'>
                    <Breadcrumb className='mb-5'>
                        <Breadcrumb.Item href='/' icon={HiHome}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
                    </Breadcrumb>


                    <div className='flex'>
                        {/* Menu list group */}
                        <div className="w-64 mr-1 flex-shrink-0">
                            <ListGroup>
                                <span className='flex w-full pt-2 px-4 font-semibold text-2xl text-blue-700'>Danh mục</span>
                                <ul className="w-full py-2 px-4 text-lg space-y-4 text-black list-inside">
                                    <li><Link className='hover:text-gray-500' href="#">Điện thoại</Link>
                                        <ol className="pl-5 mt-2 space-y-1 list-disc list-inside">
                                            <li><Link className='hover:text-gray-400' href="#">Iphone</Link></li>
                                            <li><Link className='hover:text-gray-400' href="#">Samsung</Link></li>
                                            <li><Link className='hover:text-gray-400' href="#">Asus</Link></li>
                                            <li><Link className='hover:text-gray-400' href="#">OPPO</Link></li>
                                        </ol>
                                    </li>
                                    <li><Link className='hover:text-gray-400' href="#">Thực phẩm</Link>
                                        <ul className="pl-5 mt-2 space-y-1 list-disc list-inside">
                                            <li><Link className='hover:text-gray-400' href="#">Sữa (Thùng)</Link></li>
                                            <li><Link className='hover:text-gray-400' href="#">Bánh</Link></li>
                                            <li><Link className='hover:text-gray-400' href="#">Trái cây (kg)</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className='hover:text-gray-400' href="#">Trang phục</Link>
                                        <ul className="pl-5 mt-2 space-y-1 list-disc list-inside">
                                            <li><Link className='hover:text-gray-400' href="#">Nón</Link></li>
                                            <li><Link className='hover:text-gray-400' href="#">Giày</Link></li>
                                            <li><Link className='hover:text-gray-400' href="#">Quần/áo</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className='hover:text-gray-400' href="#">Nhu yếu phẩm</Link>
                                        <ul className="pl-5 mt-2 space-y-1 list-disc list-inside">
                                            <li><Link className='hover:text-gray-400' href="#">Kem đánh răng</Link></li>
                                            <li><Link className='hover:text-gray-400' href="#">Bàn chải</Link></li>
                                            <li><Link className='hover:text-gray-400' href="#">Khăn</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </ListGroup>
                        </div>

                        {/* Nội dung bên trong */}
                        <div className='w-full'>
                            <div className='w-full flex flex-wrap'>
                                {product.map((item, index) => (
                                    <ProductCard key={index} discount={false} href={"/sanpham/" + item.id} image={item.attributes.Hinhanh} title={item.attributes.TenSP} price={item.attributes.Giatien} category={item.attributes.Chitiet_sanpham.data.attributes.Danhmuc.data.attributes.TenDM} />
                                ))}
                            </div>
                            <Pagination
                                className='w-fit mx-auto'
                                currentPage={currentpage}
                                onPageChange={e => onPageChange(e)}
                                showIcons={true}
                                totalPages={profilepagination.pagination.pageCount}
                            />
                        </div>
                    </div>
                </Layout >
                : null}
        </>
    )
}

export default SanPham