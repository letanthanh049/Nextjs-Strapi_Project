import { Layout } from '@/pages/components/layout'
import { ProductCard } from '@/pages/components/product_card'
import { ProductCardCarousel } from '@/pages/components/product_card_carousel'
import axios from 'axios'
import { Breadcrumb } from 'flowbite-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { HiHome } from 'react-icons/hi'

const Subproduct = () => {
    const router = useRouter()
    const [subproducts, setSubproducts] = useState([])

    async function fetchData() {
        const res = await axios.get(`http://localhost:1337/api/sanphams?filters[Chitiet_sanpham][Theloai][TenTL][$eq]=${router.query.TenTL}&fields[0]=TenSP&fields[1]=Hinhanh&fields[2]=Giatien&populate[Chitiet_sanpham][populate][Danhmuc][fields][0]=TenDM`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24'
                }
            })
        setSubproducts(res.data.data)
    }

    useEffect(() => {
        if (router.query.TenTL === undefined) {

        } else {
            fetchData()

        }

    }, [router.query.TenTL])



    return (
        <>
            <Layout title="Danh mục" maxwidth='max-w-screen-xl'>



                <Breadcrumb className='mb-5'>
                    <Breadcrumb.Item href='/' icon={HiHome}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href='/categories'>Danh mục</Breadcrumb.Item>
                    <Breadcrumb.Item>Thể loại</Breadcrumb.Item>
                    <Breadcrumb.Item>{router.query.TenTL}</Breadcrumb.Item>

                </Breadcrumb>
                <div className='w-full'>
                    <div className='w-full flex flex-wrap'>
                        {subproducts.map(item => (

                            <ProductCardCarousel
                                key={item.id}
                                discount={false}
                                href={"/sanpham/" + item.id}
                                image={item.attributes.Hinhanh}
                                title={item.attributes.TenSP}
                                price={item.attributes.Giatien}
                                category={router.query.TenTL}
                            />
                        ))}
                    </div>
                </div>


            </Layout >


        </>
    )
}

export default Subproduct