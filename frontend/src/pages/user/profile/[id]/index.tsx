import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'flowbite-react'
import { useRouter } from 'next/router';
import { Layout } from "@/pages/components/layout";
import { Breadcrumb, Card, Avatar, Pagination } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import moment from 'moment'
import { ProductCardCarousel } from '@/pages/components/product_card_carousel';

const Profile = (props: any) => {
    const router = useRouter()
    const [profile, setProfile] = useState([])
    const [profileproduct, setProfileproduct] = useState([])
    const [profilepagination, setProfilepagination] = useState([])
    const [currentpage, setCurrentpage] = useState(1)

    const onPageChange = (e) => {
        setCurrentpage(e)
    }

    async function fetchProfile() {
        const res = await axios.get('http://localhost:1337/api/profiles/' + router.query.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
            }
        })
        setProfile(res.data.data)
    }

    async function fetchProfileProduct() {
        const res = await axios.get('http://localhost:1337/api/sanphams?filters[Profile][id][$eq]=' + router.query.id + '&pagination[page]=' + currentpage + '&pagination[pageSize]=5&fields[0]=TenSP&fields[1]=Hinhanh&fields[2]=Giatien&populate[Chitiet_sanpham][populate][Danhmuc][fields][0]=TenDM', {
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
        if (router.query.id == undefined) { }
        else {
            fetchProfile()
            fetchProfileProduct()
        }
    }, [currentpage, router.query.id])

    return (
        <>
            {profile && profile.attributes && profileproduct && profilepagination && profilepagination.pagination
                ? <Layout title="Tạo Profile Shop" maxwidth="max-w-screen-xl">
                    <Breadcrumb className='mb-5'>
                        <Breadcrumb.Item href="/" icon={HiHome}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item >Profile {profile.attributes.TenGH}</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className='block'>
                        <Card className='mb-5'>
                            <div className='flex'>
                                <div className='flex flex-wrap w-1/3 text-black'>
                                    <div className='w-full xoa-justify-content-profile'>
                                        <div className='flex'>
                                            <Avatar
                                                className='mr-2 flex-shrink-0'
                                                img={"/images/user-avatar/" + profile.attributes.Hinhanh}
                                                size="lg"
                                                rounded={true}
                                            />
                                            <p className='text-xl font-semibold my-auto'>{profile.attributes.TenGH}</p>
                                        </div>
                                    </div>
                                    {/* Ngày đăng ký */}
                                    <div className='flex my-auto mb-0'>
                                        <p className='text-gray-600 font-semibold mr-2'>Ngày đăng ký:</p>
                                        <p className='text-black'>{moment(profile.attributes.Ngaydangky).format("DD/MM/YYYY")}</p>
                                    </div>
                                </div>
                                <div className='w-2/3 text-black text-lg'>
                                    <div className='bg-slate-100 flex'>
                                        <p className='mr-2 font-semibold text-blue-700'>Sản phẩm:</p>
                                        <p>{profilepagination.pagination.total}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='mr-2 font-semibold text-blue-700'>Email:</p>
                                        <p>{profile.attributes.Email}</p>
                                    </div>
                                    <div className='bg-slate-100 flex'>
                                        <p className='mr-2 font-semibold text-blue-700'>Địa chỉ:</p>
                                        <p>{profile.attributes.Diachi}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='mr-2 font-semibold text-blue-700'>Số điện thoại:</p>
                                        <p>{profile.attributes.Sdt}</p>
                                    </div>
                                    <div className='bg-slate-100 flex'>
                                        <p className='mr-2 font-semibold text-blue-700'>Link website:</p>
                                        <a className='text-blue-700 hover:text-blue-800' target='_blank' href={"https://" + profile.attributes.Url}>{profile.attributes.Url}</a>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className='w-full mb-5'>
                            <h5 className="text-2xl font-bold text-center tracking-tight text-blue-700">
                                Mô tả
                            </h5>
                            <p className="font-normal text-gray-700">
                                <ReactMarkdown children={profile.attributes.Mota} />
                            </p>
                        </Card>

                        <Card>
                            {/* Nội dung bên trong */}
                            <div className='w-full'>
                                <div className='w-full flex flex-wrap'>
                                    {profileproduct.map((item, index) => (
                                        <ProductCardCarousel key={index} discount={false} href={"/sanpham/" + item.id} image={item.attributes.Hinhanh} title={item.attributes.TenSP} price={item.attributes.Giatien} category={item.attributes.Chitiet_sanpham.data.attributes.Danhmuc.data.attributes.TenDM} />
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
                    </div>
                </Layout >
                : null}
        </>
    );
};
export default Profile;
