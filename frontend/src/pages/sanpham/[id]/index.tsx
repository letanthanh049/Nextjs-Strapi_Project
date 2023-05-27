import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'flowbite-react'
import Image from 'next/image';
import Link from 'next/link';
import { NumericFormat } from 'react-number-format';
import { useRouter } from 'next/router';
import { Layout } from '@/pages/components/layout'
import { Breadcrumb, Button, Card, Avatar, Rating, Carousel, Badge } from 'flowbite-react';
import { HiHome } from 'react-icons/hi'
import { AiFillPhone, AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { BsFillClipboard2Fill, BsFillClipboard2CheckFill } from 'react-icons/bs'
import { ProductCardCarousel } from '@/pages/components/product_card_carousel';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import moment from 'moment'
import { SmallNotification } from '@/pages/components/modal/smallnotification';

const ChiTietSanPham = () => {
    const [modalshow, setModalshow] = useState(false)
    const [productdetail, setProductdetail] = useState([])
    const [suggestproduct, setSuggestproduct] = useState([])
    const [profile, setProfile] = useState([])
    const [showsdt, setShowsdt] = useState(false)
    const [iscopy, setIscopy] = useState(false)
    const [currentpicture, setCurrentpicture] = useState(null)
    const [img1, setImg1] = useState()
    const [img2, setImg2] = useState()
    const [img3, setImg3] = useState()

    const router = useRouter()

    async function fetchData() {
        const res = await axios.get('http://localhost:1337/api/sanphams/' + router.query.id + '?populate[Profile][fields][0]=TenGH&populate[Profile][fields][1]=Hinhanh&fields[1]=TenSP&fields[2]=Mota&fields[3]=Giatien&fields[4]=Hinhanh&fields[5]=createdAt&populate[Chitiet_sanpham][populate][Danhmuc][fields][0]=TenDM&populate[Chitiet_sanpham][populate][Theloai][fields][0]=TenTL&populate[Chitiet_sanpham][populate][Mausac][fields][0]=TenMau&populate[Chitiet_sanpham][populate][Size][fields][0]=TenSize&populate[Chitiet_sanpham][populate][Giatri_thuoctinh][populate][Thuoctinh_theloai][fields][0]=TenTT&populate[Chitiet_sanpham][populate][Giatri_thuoctinh][fields][1]=Giatri', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
            }
        })
        setProductdetail(res.data.data)
        const parts = res.data.data.attributes.Hinhanh.split(".")
        const trueImg1 = `${parts[0]}-1.${parts[1]}`
        const trueImg2 = `${parts[0]}-2.${parts[1]}`
        const trueImg3 = `${parts[0]}-3.${parts[1]}`
        setCurrentpicture(trueImg1)
        setImg1(trueImg1)
        setImg2(trueImg2)
        setImg3(trueImg3)

        // const alturl = res.data.data.attributes.TenSP.toLowerCase().replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a").replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e").replace(/ì|í|ị|ỉ|ĩ/g,"i").replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o").replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u").replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y").replace(/đ/g,"d").replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "").replace(/\u02C6|\u0306|\u031B/g, "").replace(/ + /g," ").trim().replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ").replace(/[\s_]+/g,"-").replace(/-$/, "")
        // router.replace('/sanpham/' + alturl);
    }
    async function fetchSuggest() {
        const res = await axios.get(`http://localhost:1337/api/sanphams?fields[0]=TenSP&fields[1]=Hinhanh&fields[2]=Giatien&populate[Chitiet_sanpham][populate][Danhmuc][fields][0]=TenDM&pagination[limit]=10&sort[0]=id%3Adesc`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
            }
        })
        setSuggestproduct(res.data.data)
    }

    async function fetchProfile() {
        const res = await axios.get('http://localhost:1337/api/sanphams/' + router.query.id + '?fields[0]=TenSP&populate[0]=Profile', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
            }
        })
        setProfile(res.data.data)
    }

    useEffect(() => {
        setShowsdt(false)
        setIscopy(false)
        if (router.query.id == undefined) { }
        else {
            fetchData()
            fetchSuggest()
            fetchProfile()
        }
    }, [router.query.id])

    return (
        <>
            {productdetail && productdetail.attributes && profile && profile.attributes
                ? <Layout title={productdetail.attributes.TenSP} maxwidth='max-w-screen-xl'>
                    <Breadcrumb className='mb-5'>
                        <Breadcrumb.Item href="/" icon={HiHome}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/sanpham">Sản phẩm</Breadcrumb.Item>
                        <Breadcrumb.Item>{productdetail.attributes.TenSP}</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className='block'>
                        <div className='w-full flex mb-5 h-fit'>
                            <div className='block w-[60rem]'>
                                <Card className='w-full mb-5'>
                                    <div className='flex'>
                                        <div className='w-2/5 block mr-10'>
                                            <Image alt="picture" width='300' height='300' className='rounded-lg border-2 hover:border-blue-600' src={"/images/products/" + currentpicture} />
                                            <div className='flex flex-wrap'>
                                                <Image onClick={() => setCurrentpicture(img1)} alt="" width='100' height='100' className='rounded-lg border-2 hover:border-blue-600' src={"/images/products/" + img1} />
                                                {img2 === 'active'
                                                    ? null
                                                    : <Image onClick={() => setCurrentpicture(img2)} onError={() => setImg2('active')} alt="" width='100' height='100' className='rounded-lg border-2 hover:border-blue-600' src={"/images/products/" + img2} />}
                                                {img3 === 'active'
                                                    ? null
                                                    : <Image onClick={() => setCurrentpicture(img3)} onError={() => setImg3('active')} alt="" width='100' height='100' className='rounded-lg border-2 hover:border-blue-600' src={"/images/products/" + img3} />}
                                            </div>
                                        </div>
                                        <div className='w-[36rem] flex flex-col gap-4'>
                                            <div className='text-black text-2xl font-bold'>{productdetail && productdetail.attributes ? productdetail.attributes.TenSP : null}</div>
                                            {/* Giá */}
                                            <NumericFormat className="w-full text-3xl font-bold text-red-700" value={productdetail.attributes.Giatien} displayType='text' thousandSeparator={true} suffix='₫' />
                                            {/* Thẻ danh mục */}
                                            <div className='flex'>
                                                <p className='text-black font-semibold mr-2 text-lg'>Danh mục:</p>
                                                <p className='text-black text-lg'>{productdetail.attributes.Chitiet_sanpham.data.attributes.Danhmuc.data.attributes.TenDM}</p>
                                            </div>
                                            {/* Thẻ thể loại */}
                                            <div className='flex'>
                                                <p className='text-black font-semibold mr-2 text-lg'>Thể loại:</p>
                                                <p className='text-black text-lg'>{productdetail.attributes.Chitiet_sanpham.data.attributes.Theloai.data.attributes.TenTL}</p>
                                            </div>
                                            <div className='flex my-auto mb-0'>
                                                {/* Ngày đăng ký */}
                                                <div className='flex my-auto mb-0'>
                                                    <p className='text-gray-600 font-semibold mr-2'>Ngày đăng ký:</p>
                                                    <p className='text-black'>{moment(productdetail.attributes.createdAt).format("DD/MM/YYYY")}</p>
                                                    {/* <Moment format="DD/MM/YYYY">{productdetail.attributes.createdAt}</Moment> */}
                                                </div>
                                                {/* Nút liên hệ với shop */}
                                                {/* <AlertModal isShow={modalshow} isShowChange={setModalshow} message='cockenballs' ></AlertModal> */}
                                                <SmallNotification visible={modalshow} setVisible={setModalshow}></SmallNotification>
                                                <Button className='w-fit mx-auto my-auto mr-0 mb-0 hover:animate-pulse' size="xl" gradientMonochrome="info" onClick={
                                                    showsdt ? () => {
                                                        navigator.clipboard.writeText('091 234 5678')
                                                        setIscopy(true)
                                                        setModalshow(true)
                                                    } : () => setShowsdt(true)
                                                }>
                                                    {showsdt == true
                                                        ? iscopy
                                                            ? <>
                                                                <span className='text-green-300'>091 234 5678</span>
                                                                {/* const phoneNumber = "0912345678";
                                                    const formattedPhoneNumber = phoneNumber.slice(0, 3) + " " + phoneNumber.slice(3, 6) + " " + phoneNumber.slice(6); */}
                                                                <BsFillClipboard2CheckFill className='ml-2 h-5 w-5 text-green-300' />
                                                            </>

                                                            : <>
                                                                <span>091 234 5678</span>
                                                                {/* const phoneNumber = "0912345678";
                                                            const formattedPhoneNumber = phoneNumber.slice(0, 3) + " " + phoneNumber.slice(3, 6) + " " + phoneNumber.slice(6); */}
                                                                <BsFillClipboard2Fill className='ml-2 h-5 w-5' />
                                                            </>
                                                        : <>
                                                            Liên hệ với shop
                                                            <AiFillPhone className='ml-2 h-5 w-5' />
                                                        </>}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Mô tả sản phẩm */}
                                <Card className='w-full mb-5'>
                                    <h5 className="text-2xl font-bold text-center tracking-tight text-blue-700">
                                        Mô tả sản phẩm
                                    </h5>
                                    <p className="font-normal text-gray-700">
                                        <ReactMarkdown children={productdetail.attributes.Mota} />
                                    </p>
                                </Card>

                                {/* Thuộc tính sản phẩm */}
                                <Card className='w-full mb-5'>
                                    <h5 className="text-2xl font-bold text-center tracking-tight text-blue-700">
                                        Thuộc tính sản phẩm
                                    </h5>
                                    <div className='flex flex-wrap'>
                                        {/* {productdetail.attributes.Chitiet_sanpham.data.attributes.Mausac.data
                                            ? <div className="w-1/2 flex items-center space-x-4 mb-5">
                                                <div className="min-w-0 flex-1">
                                                    <Badge size="sm" className='w-fit'>
                                                        Màu sắc
                                                    </Badge>
                                                    <p className="ml-2 text-base font-medium text-gray-800">
                                                        {productdetail.attributes.Chitiet_sanpham.data.attributes.Mausac.data.map((item, index) => {
                                                            const isLastIndex = index === productdetail.attributes.Chitiet_sanpham.data.attributes.Mausac.data.length - 1
                                                            return (
                                                                isLastIndex
                                                                    ? <span>{item.attributes.TenMau}.</span>
                                                                    : <span>{item.attributes.TenMau}, </span>
                                                            )
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            : null}
                                        {productdetail.attributes.Chitiet_sanpham.data.attributes.Size.data
                                            ? <div className="w-1/2 flex items-center space-x-4 mb-5">
                                                <div className="min-w-0 flex-1">
                                                    <Badge size="sm" className='w-fit'>
                                                        Kích thước
                                                    </Badge>
                                                    <p className="ml-2 text-base font-medium text-gray-800">
                                                        {productdetail.attributes.Chitiet_sanpham.data.attributes.Size.data.map((item, index) => {
                                                            const isLastIndex = index === productdetail.attributes.Chitiet_sanpham.data.attributes.Size.data.length - 1
                                                            return (
                                                                isLastIndex
                                                                    ? <span>{item.attributes.TenSize}.</span>
                                                                    : <span>{item.attributes.TenSize}, </span>
                                                            )
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            : null} */}

                                        {productdetail.attributes.Chitiet_sanpham.data.attributes.Giatri_thuoctinh.data.map((item, index) => (
                                            <>
                                                <div className="w-1/2 flex space-x-4 mb-5">
                                                    <div className="min-w-0 flex-1">
                                                        {/* <p className="truncate text-sm font-semibold text-gray-900">
                                                            {item.attributes.Thuoctinh_theloai.data.attributes.TenTT}
                                                        </p> */}
                                                        <Badge size="sm" className='w-fit'>
                                                            {item.attributes.Thuoctinh_theloai.data.attributes.TenTT}
                                                        </Badge>
                                                        <p className="ml-2 text-base font-medium text-gray-800">
                                                            {item.attributes.Giatri}
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </Card>{/*  bg-${index % 2 === 0 ? `white` : `slate-200`} */}
                            </div>

                            {/* Profile */}
                            <div className='ml-5 w-[15rem]'>
                                <div className='sticky top-0'>
                                    <Card className='text-black break-words xoa-gap mr-0 mx-auto h-fit'>
                                        <Link href={"/user/profile/" + profile.attributes.Profile.data.id} className='mt-0 my-auto mb-2'>
                                            <Avatar img={"/images/user-avatar/" + profile.attributes.Profile.data.attributes.Hinhanh} rounded={true} />
                                            <div className="font-medium text-center">
                                                {profile.attributes.Profile.data.attributes.TenGH}
                                            </div>
                                        </Link>
                                        <div className='bg-slate-100'>
                                            <p className='font-semibold text-blue-700'>Email:</p>
                                            <p>{profile.attributes.Profile.data.attributes.Email}</p>
                                        </div>
                                        <div>
                                            <p className='font-semibold text-blue-700'>Địa chỉ:</p>
                                            <p>{profile.attributes.Profile.data.attributes.Diachi}</p>
                                        </div>
                                        <div className='bg-slate-100'>
                                            <p className='font-semibold text-blue-700'>URL:</p>
                                            <a className='text-blue-700 hover:text-blue-800' target='_blank' href={"https://" + profile.attributes.Profile.data.attributes.Url}>{profile.attributes.Profile.data.attributes.Url}</a>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>

                        <div className="h-80 text-black xoa-justify-content mb-10">
                            <div className='text-center font-bold text-2xl text-blue-700 mb-3'>Các sản phẩm tương tự</div>
                            <Carousel slide={false}
                                indicators={false}
                                leftControl={<AiFillLeftCircle className='text-3xl' />}
                                rightControl={<AiFillRightCircle className='text-3xl' />}>
                                <div className="flex h-full justify-center bg-white">
                                    {suggestproduct.slice(0, 5).map((item, index) => (
                                        <ProductCardCarousel key={index} discount={false} href={"/sanpham/" + item.id} image={item.attributes.Hinhanh} title={item.attributes.TenSP} price={item.attributes.Giatien} category={item.attributes.Chitiet_sanpham.data.attributes.Danhmuc.data.attributes.TenDM} />
                                    ))}
                                </div>
                                <div className="flex h-full justify-center bg-white">
                                    {suggestproduct.slice(5, 10).map((item, index) => (
                                        <ProductCardCarousel key={index} discount={false} href={"/sanpham/" + item.id} image={item.attributes.Hinhanh} title={item.attributes.TenSP} price={item.attributes.Giatien} category={item.attributes.Chitiet_sanpham.data.attributes.Danhmuc.data.attributes.TenDM} />
                                    ))}
                                </div>
                            </Carousel>
                        </div>

                    </div >
                </Layout >
                : null}

        </>
    )
}

export default ChiTietSanPham