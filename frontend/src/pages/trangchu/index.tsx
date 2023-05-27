import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'flowbite';
import { Carousel, ListGroup, Card } from 'flowbite-react';
import { ProductCardCarousel } from '../components/product_card_carousel';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

export const TrangChu = () => {
    const [newproduct, setNewproduct] = useState([])

    useEffect(() => {
        async function fectchData() {
            const res = await axios.get(`http://localhost:1337/api/sanphams?fields[0]=TenSP&fields[1]=Hinhanh&fields[2]=Giatien&populate[Chitiet_sanpham][populate][Danhmuc][fields][0]=TenDM&pagination[limit]=10&sort[0]=id%3Adesc`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
                }
            })
            setNewproduct(res.data.data)
        }
        fectchData()
        console.log(newproduct)
    }, [])

    return (
        <>
            <div className='block'>
                {/* Carousel của website */}
                <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mb-10">
                    <Carousel slideInterval={5000}>
                        <img
                            src="/images/carousel/1.jpg"
                            alt="..."
                        />
                        <img
                            src="/images/carousel/2.jpg"
                            alt="..."
                        />
                        <img
                            src="/images/carousel/3.jpg"
                            alt="..."
                        />
                        <img
                            src="/images/carousel/4.jpg"
                            alt="..."
                        />
                        <img
                            src="/images/carousel/5.jpg"
                            alt="..."
                        />
                    </Carousel>
                </div>

                <div className="h-80 text-black xoa-justify-content mb-36">
                    <div className='mb-5 font-bold text-center text-3xl text-red-600'>Các sản phẩm mới</div>
                    <Carousel slide={false}
                        indicators={false}
                        leftControl={<AiFillLeftCircle className='text-3xl' />}
                        rightControl={<AiFillRightCircle className='text-3xl' />}>
                        <div className="flex h-full justify-center bg-white">
                            {newproduct.slice(0, 5).map((item, index) => (
                                <ProductCardCarousel key={index} discount={false} href={"/sanpham/" + item.id} image={item.attributes.Hinhanh} title={item.attributes.TenSP} price={item.attributes.Giatien} category={item.attributes.Chitiet_sanpham.data.attributes.Danhmuc.data.attributes.TenDM} />
                            ))}
                        </div>
                        <div className="flex h-full justify-center bg-white">
                            {newproduct.slice(5, 10).map((item, index) => (
                                <ProductCardCarousel key={index} discount={false} href={"/sanpham/" + item.id} image={item.attributes.Hinhanh} title={item.attributes.TenSP} price={item.attributes.Giatien} category={item.attributes.Chitiet_sanpham.data.attributes.Danhmuc.data.attributes.TenDM} />
                            ))}
                        </div>
                    </Carousel>
                </div>

                <div className="h-80 text-black xoa-justify-content mb-10">
                    <div className='mb-5 font-bold text-center text-3xl text-red-600'>Các sản phẩm phổ biến</div>
                    <Carousel slide={false}
                        indicators={false}
                        leftControl={<AiFillLeftCircle className='text-3xl' />}
                        rightControl={<AiFillRightCircle className='text-3xl' />}>
                        <div className="flex h-full justify-center bg-white">
                            {newproduct.slice(0, 5).map((item, index) => (
                                <ProductCardCarousel key={index} discount={false} href={"/sanpham/" + item.id} image={item.attributes.Hinhanh} title={item.attributes.TenSP} price={item.attributes.Giatien} category={item.attributes.Chitiet_sanpham.data.attributes.Danhmuc.data.attributes.TenDM} />
                            ))}
                        </div>
                        <div className="flex h-full justify-center bg-white">
                            {newproduct.slice(5, 10).map((item, index) => (
                                <ProductCardCarousel key={index} discount={false} href="/sanpham/" image={item.attributes.Hinhanh} title={item.attributes.TenSP} price={item.attributes.Giatien} category={item.attributes.Chitiet_sanpham.data.attributes.Danhmuc.data.attributes.TenDM} />
                            ))}
                        </div>
                    </Carousel>
                </div>

            </div>
        </>
    )
}
