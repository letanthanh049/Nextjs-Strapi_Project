import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios';
import 'flowbite-react'
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Card, Avatar, Label, TextInput, Textarea, Button, Select } from "flowbite-react";
import Link from 'next/link';
import { Layout } from '@/pages/components/layout';
import * as localStorage from 'local-storage';
import { marked } from 'marked'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

const CreateProduct = (props: any) => {
    const [hinhanh1, setHinhanh1] = useState(null)
    const [hinhanh2, setHinhanh2] = useState(null)
    const [hinhanh3, setHinhanh3] = useState(null)
    const [danhmuc, setDanhmuc] = useState([])
    const [theloai, setTheloai] = useState([])
    const [productdetail, setProductdetail] = useState([])
    const [componentThuocTinh, setComponentThuocTinh] = useState(0)

    const [tenSP, setTenSP] = useState('')
    const [tenMoiSP, setTenMoiSP] = useState('')
    const [giaTien, setGiaTien] = useState('')
    const [danhMuc, setDanhMuc] = useState('')
    const [theLoai, setTheLoai] = useState('')
    const [tenThuocTinh, setTenThuocTinh] = useState([])
    const [giaTriThuocTinh, setGiaTriThuocTinh] = useState([])
    const [thuocTinh, setThuocTinh] = useState([6])
    const [moTa, setMoTa] = useState('')

    const router = useRouter();
    const idsanpham = router.query.id;

    const data = {
        data: {
            TenCu: tenSP, 
            TenSP: tenMoiSP,
            Giatien: giaTien,
            Hinhanh: idsanpham+".jpg"
        }
    }

    async function updateSanPham(idsanpham: any) {
        console.log(data)
        const res = await fetch('http://localhost:1337/api/sanphams/' + idsanpham, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
            },
            body: JSON.stringify(data)
        })
        console.log(await res.json())
    }

    async function fetchDanhmucTheloai() {
        const res1 = await axios.get('http://localhost:1337/api/profiles/' + localStorage.get('Profile')['Profile']['id'] + '?fields[0]=TenGH&populate[Danhmuc][fields][0]=TenDM', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
            }
        })
        setDanhmuc(res1.data.data)
        if (res1.data.data.attributes.Danhmuc.data[0].id !== undefined) {
            const res2 = await axios.get('http://localhost:1337/api/danhmucs/' + res1.data.data.attributes.Danhmuc.data[0].id + '?fields[0]=TenDM&populate[Theloai][fields][0]=TenTL', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
                }
            })
            setTheloai(res2.data.data)
        }
    }


    async function fetchProductData(idsanpham: any) {
        const res = await axios.get('http://localhost:1337/api/sanphams/' + idsanpham + '?populate[Profile][fields][0]=TenGH&populate[Profile][fields][1]=Hinhanh&fields[1]=TenSP&fields[2]=Mota&fields[3]=Giatien&fields[4]=Hinhanh&fields[5]=createdAt&populate[Chitiet_sanpham][populate][Danhmuc][fields][0]=TenDM&populate[Chitiet_sanpham][populate][Theloai][fields][0]=TenTL&populate[Chitiet_sanpham][populate][Mausac][fields][0]=TenMau&populate[Chitiet_sanpham][populate][Size][fields][0]=TenSize&populate[Chitiet_sanpham][populate][Giatri_thuoctinh][populate][Thuoctinh_theloai][fields][0]=TenTT&populate[Chitiet_sanpham][populate][Giatri_thuoctinh][fields][1]=Giatri', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
            }
        })
        setProductdetail(res.data.data)
        setTenSP(res.data.data.attributes.TenSP)
        setTenMoiSP(res.data.data.attributes.TenSP)
        setGiaTien(res.data.data.attributes.Giatien)
        setDanhMuc(res.data.data.attributes.Chitiet_sanpham.data.attributes.Danhmuc.data.id)
        setTheLoai(res.data.data.attributes.Chitiet_sanpham.data.attributes.Theloai.data.id)
        const bruh = res.data.data.attributes.Chitiet_sanpham.data.attributes.Giatri_thuoctinh.data
        while (bruh.length < 6) {
            bruh.push(undefined);
        }
        setThuocTinh(bruh)
        setTenThuocTinh(res.data.data.attributes.Chitiet_sanpham.data.attributes.Giatri_thuoctinh.data.map(item => item?.attributes?.Thuoctinh_theloai?.data.attributes?.TenTT))
        setGiaTriThuocTinh(res.data.data.attributes.Chitiet_sanpham.data.attributes.Giatri_thuoctinh.data.map(item => item?.attributes?.Giatri))
        setMoTa(marked(res.data.data.attributes.Mota));
        setComponentThuocTinh(res.data.data.attributes.Chitiet_sanpham.data.attributes.Giatri_thuoctinh.data.length)

        const parts = res.data.data.attributes.Hinhanh.split(".")
        const trueImg1 = `${parts[0]}-1.${parts[1]}`
        const trueImg2 = `${parts[0]}-2.${parts[1]}`
        const trueImg3 = `${parts[0]}-3.${parts[1]}`
        const blobImg1 = await axios.get(`/images/products/${trueImg1}`, { responseType: 'blob' })
        setHinhanh1(blobImg1.data)
        try {
            const blobImg2 = await axios.get(`/images/products/${trueImg2}`, { responseType: 'blob' })
            setHinhanh2(blobImg2.data)
        } catch (error) { }
        try {
            const blobImg3 = await axios.get(`/images/products/${trueImg3}`, { responseType: 'blob' })
            setHinhanh3(blobImg3.data)
        } catch (error) { }

        // const alturl = res.data.data.attributes.TenSP.toLowerCase().replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a").replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e").replace(/ì|í|ị|ỉ|ĩ/g,"i").replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o").replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u").replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y").replace(/đ/g,"d").replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "").replace(/\u02C6|\u0306|\u031B/g, "").replace(/ + /g," ").trim().replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ").replace(/[\s_]+/g,"-").replace(/-$/, "")
        // router.replace('/sanpham/' + alturl);
    }

    useEffect(() => {
        fetchDanhmucTheloai()
        fetchProductData(idsanpham)
    }, [router.query])

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ]

    const handleContentChange = (value: any) => {
        const Turndown = require('turndown').default
        const turndownService = new Turndown()
        const markdown = turndownService.turndown(value)
        setMoTa(markdown);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (!hinhanh1 || !hinhanh2 || !hinhanh3) return
            const formData1 = new FormData()
            const formData2 = new FormData()
            const formData3 = new FormData()
            formData1.append("myImage1", hinhanh1)
            formData2.append("myImage2", hinhanh2)
            formData3.append("myImage3", hinhanh3)
            console.log(formData2)
            const data1 = await axios.post(`/api/imageproduct`, formData1)
            const data2 = await axios.post(`/api/imageproduct`, formData2)
            const data3 = await axios.post(`/api/imageproduct`, formData3)
            // console.log(tenSP, giaTien, danhMuc, theLoai, thuocTinh, moTa)
            // console.log(thuocTinh)
            updateSanPham(idsanpham)

        } catch (error: any) {
            console.log(error.respone?.data)
        }
    }

    // const handleInputGiaTien = (event: any) => {
    //     const input = event.target.value.replace(/\D/g, '');
    //     const formattedInput = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(input);
    //     setGiaTien(formattedInput);
    // }

    return (
        <>
            <Layout title="Tạo Profile Shop" maxwidth="max-w-screen-lg">
                {danhmuc && danhmuc.attributes && theloai && theloai.attributes && productdetail && productdetail.attributes
                    ? <Card >
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className='flex mb-5'>
                                <div className='flex flex-wrap w-1/3 text-black flex-shrink-0 px-2'>
                                    <div className='w-full xoa-justify-content-profile'>
                                        <div className='flex mb-5'>
                                            <Avatar
                                                className='mx-auto'
                                                img={hinhanh1
                                                    ? URL.createObjectURL(hinhanh1)
                                                    : "/images/products/0.png"}
                                                size="2xl"
                                            />
                                        </div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Upload ảnh 1</label>
                                        <input accept='image/*' onChange={e => setHinhanh1(e.target.files[0])} className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file" />
                                        <p className="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG hoặc GIF</p>

                                    </div>
                                </div>
                                <div className='flex flex-wrap w-1/3 text-black flex-shrink-0 px-2'>
                                    <div className='w-full xoa-justify-content-profile'>
                                        <div className='flex mb-5'>
                                            <Avatar
                                                className='mx-auto'
                                                img={hinhanh2
                                                    ? URL.createObjectURL(hinhanh2)
                                                    : "/images/products/0.png"}
                                                size="2xl"
                                            />
                                        </div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Upload ảnh 2</label>
                                        <input accept='image/*' onChange={e => setHinhanh2(e.target.files[0])} className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file" />
                                        <p className="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG hoặc GIF</p>

                                    </div>
                                </div>
                                <div className='flex flex-wrap w-1/3 text-black flex-shrink-0 px-2'>
                                    <div className='w-full xoa-justify-content-profile'>
                                        <div className='flex mb-5'>
                                            <Avatar
                                                className='mx-auto'
                                                img={hinhanh3
                                                    ? URL.createObjectURL(hinhanh3)
                                                    : "/images/products/0.png"}
                                                size="2xl"
                                            />
                                        </div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Upload ảnh 3</label>
                                        <input accept='image/*' onChange={e => setHinhanh3(e.target.files[0])} className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file" />
                                        <p className="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG hoặc GIF</p>

                                    </div>
                                </div>
                            </div>

                            <div className='w-full'>
                                <div className='w-full mb-5'>
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor="pname"
                                            value="Tên sản phẩm:"
                                        />
                                    </div>
                                    <TextInput
                                        id="pname"
                                        type="text"
                                        placeholder='Hãy nhập tên sản phẩm...'
                                        defaultValue={tenSP}
                                        value={tenMoiSP}
                                        onChange={event => setTenMoiSP(event.target.value)}
                                    />
                                </div>
                                <div className='w-8/10 mb-5'>
                                    <div>
                                        <div className="mb-1 block">
                                            <Label
                                                htmlFor="email4"
                                                value="Giá tiền (VNĐ):"
                                            />
                                        </div>
                                        <input type="tel"
                                            id="phone"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Hãy nhập giá tiền..."
                                            required
                                            defaultValue={giaTien}
                                            value={giaTien}
                                            onChange={event => setGiaTien(event.target.value)} />
                                    </div>
                                </div>
                                <div className='w-8/10 mb-5'>
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor="danhmuc"
                                            value="Danh mục:"
                                        />
                                    </div>
                                    <Select
                                        id="danhmuc"
                                        required={true}
                                        defaultValue={danhMuc}
                                        value={danhMuc}
                                    >
                                        <option value="defaultDM">Hãy chọn danh mục...</option>
                                        {danhmuc.attributes.Danhmuc.data.map((item, index) => (
                                            <option value={item.id} key={index}>{item.attributes.TenDM}</option>
                                        ))}
                                    </Select>
                                </div>
                                <div className='w-8/10 mb-5'>
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor="theloai"
                                            value="Thể loại:"
                                        />
                                    </div>
                                    <Select
                                        id="theloai"
                                        required={true}
                                        defaultValue={theLoai}
                                        value={theLoai}
                                    >
                                        <option value="defaultTL">Hãy chọn thể loại...</option>
                                        {theloai.attributes.Theloai.data.map((item, index) => (
                                            <option value={item.id} key={index}>{item.attributes.TenTL}</option>
                                        ))}
                                    </Select>
                                </div>

                                <div>
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor="thuoctinh"
                                            value="Thuộc tính:"
                                        />
                                    </div>
                                    {/* <div className='flex w-full'>
                                        <input className='w-1/3 font-medium bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' type="text" value="Màu sắc:" disabled />
                                        <input className='w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' type="text" placeholder={`Giá trị thuộc tính...`} />
                                    </div>
                                    <div className='flex w-full'>
                                        <input className='w-1/3 font-medium bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' type="text" value="Kích thước:" disabled />
                                        <input className='w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' type="text" placeholder={`Giá trị thuộc tính...`} />
                                    </div> */}
                                    {/* {[...Array(componentThuocTinh)].map((item, index) => (
                                        <div key={index} className='flex'>
                                            <input
                                                className='w-1/3 font-medium bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
                                                type="text"
                                                placeholder={`Tên thuộc tính ${index + 1}`}
                                                defaultValue={item.attributes.Thuoctinh_theloai.data.attributes.TenTT} />
                                            <input
                                                className='w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
                                                type="text"
                                                placeholder={`Giá trị thuộc tính ${index + 1}`}
                                                defaultValue={item.attributes.Giatri} />
                                        </div>
                                    ))} */}
                                    {thuocTinh.slice(0, componentThuocTinh).map((item, index) => (
                                        <div className='flex'>
                                            <input
                                                className='w-1/3 font-medium bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
                                                type="text"
                                                placeholder={`Tên thuộc tính ${index + 1}`}
                                                defaultValue={item && item.attributes ? tenThuocTinh[index] : null}
                                                value={item && item.attributes ? tenThuocTinh[index] : null}
                                            />
                                            <input
                                                className='w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
                                                type="text"
                                                placeholder={`Giá trị thuộc tính ${index + 1}`}
                                                defaultValue={item && item.attributes ? giaTriThuocTinh[index] : null}
                                                value={item && item.attributes ? giaTriThuocTinh[index] : null} />
                                        </div>
                                    ))}
                                    <div className='w-full flex mt-2 mb-5'>
                                        {componentThuocTinh != 6
                                            ? <Button className='mr-2' outline={true} gradientDuoTone="purpleToBlue" onClick={e => setComponentThuocTinh(componentThuocTinh + 1)}>Thêm thuộc tính +</Button>
                                            : <Button className='mr-2' outline={true} gradientDuoTone="purpleToBlue" onClick={e => setComponentThuocTinh(componentThuocTinh + 1)} disabled>Thêm thuộc tính +</Button>}
                                        {componentThuocTinh != 0
                                            ? <Button outline={true} gradientDuoTone="pinkToOrange" onClick={e => setComponentThuocTinh(componentThuocTinh - 1)}>Xóa thuộc tính -</Button>
                                            : <Button outline={true} gradientDuoTone="pinkToOrange" onClick={e => setComponentThuocTinh(componentThuocTinh - 1)} disabled>Xóa thuộc tính -</Button>}
                                    </div>
                                </div>
                            </div>

                            <div className='mb-5'>
                                <div className='mb-1 block '>
                                    <Label htmlFor='linkwebsite' value='Mô tả về sản phẩm:' />
                                </div>
                                <QuillNoSSRWrapper
                                    className='text-black'
                                    modules={modules}
                                    formats={formats}
                                    theme="snow"
                                    onChange={e => handleContentChange(e)}
                                    defaultValue={moTa}
                                />
                            </div>
                            <div className='w-full flex'>
                                <div className='mx-auto mr-0 flex'>
                                    <Link href="/user/productmanage"><Button className='mr-2' gradientMonochrome="failure">Hủy</Button></Link>
                                    <Button gradientMonochrome="info" type="submit">Lưu</Button>
                                </div>
                            </div>
                        </form>
                    </Card>
                    : null}
            </Layout>
        </>
    );
};

export default CreateProduct;
