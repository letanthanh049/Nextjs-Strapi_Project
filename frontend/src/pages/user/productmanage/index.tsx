import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'flowbite-react'
import Link from 'next/link';
import { Layout } from '@/pages/components/layout';
import { Breadcrumb, Pagination, Card, Button } from 'flowbite-react';
import { HiHome } from 'react-icons/hi'
import { ProductCard } from '@/pages/components/product_card';
import { ProductCardCRUD } from '@/pages/components/product_card_crud';
import * as localStorage from 'local-storage';
import { ConfirmModal } from '@/pages/components/modal/confirmmodal';

const ProductManage = () => {
    const [product, setProduct] = useState([])
    const [currentpage, setCurrentpage] = useState(1)
    const [profileproduct, setProfileproduct] = useState([])
    const [profilepagination, setProfilepagination] = useState([])
    const [modalshow, setModalshow] = useState(false)
    const [currentdeleteproduct, setCurrentdeleteproduct] = useState(null)

    const onPageChange = (e: any) => {
        setCurrentpage(e)
    }

    async function fetchProfileProduct() {
        const res = await axios.get('http://localhost:1337/api/sanphams?filters[Profile][id][$eq]=' + localStorage.get('Profile')['Profile']['id'] + '&pagination[page]=' + currentpage + '&pagination[pageSize]=10&fields[0]=TenSP&fields[1]=Hinhanh&fields[2]=Giatien&populate[Chitiet_sanpham][populate][Danhmuc][fields][0]=TenDM', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
            }
        })
        setProfileproduct(res.data.data)
        setProfilepagination(res.data.meta)
    }

    useEffect(() => {
        fetchProfileProduct()
    }, [currentpage])

    return (
        <>
            {profilepagination && profilepagination.pagination && product
                ? <Layout title="Sản phẩm" maxwidth='max-w-screen-xl'>
                    <ConfirmModal isShow={modalshow} isShowChange={setModalshow} currentdeleteproduct={currentdeleteproduct} fetchProfileProduct={fetchProfileProduct} message="Bạn có chắc muốn xóa sản phẩm này!" />
                    <div className='mb-5 w-full flex'>
                        <Breadcrumb className='mb-5'>
                            <Breadcrumb.Item href='/' icon={HiHome}>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Quản lý sản phẩm</Breadcrumb.Item>
                        </Breadcrumb>
                        <Link className='mx-auto mr-0' href="/user/productmanage/createproduct"><Button gradientDuoTone="cyanToBlue">Thêm sản phẩm</Button></Link>
                    </div>

                    <Card>
                        {/* Nội dung bên trong */}
                        <div className='w-full'>
                            <div className='w-full flex flex-wrap'>
                                {profileproduct.map((item, index) => (
                                    <ProductCardCRUD key={index} discount={false} href={"/sanpham/" + item.id} image={item.attributes.Hinhanh} title={item.attributes.TenSP} price={item.attributes.Giatien} category={item.attributes.Chitiet_sanpham.data.attributes.Danhmuc.data.attributes.TenDM} isModalShow={modalshow} triggerModal={setModalshow} currentdeleteproduct={setCurrentdeleteproduct} idsanpham={item.id}/>
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
                    </Card>
                </Layout >
                : null}
        </>
    )
}

export default ProductManage