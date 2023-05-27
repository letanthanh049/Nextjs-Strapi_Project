import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios';
import 'flowbite-react'
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Card, Avatar, Label, TextInput, Textarea, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { Layout } from '@/pages/components/layout';
import * as localStorage from 'local-storage';
import { marked } from 'marked'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

const UpdateProfile = (props: any) => {
    const [hinhanh, setHinhanh] = useState(null)

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [diaChi, setDiaChi] = useState('')
    const [linkWebsite, setLinkWebsite] = useState('')
    const [hinhAnh, setHinhAnh] = useState('')
    const [moTa, setMoTa] = useState('')

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

    const handleSubmit = async () => {
        try {
            if (!hinhAnh) return
            const formData = new FormData()
            formData.append("myImage", hinhAnh)
            const { data } = await axios.post("/api/image", formData)
            console.log(data)

        } catch (error: any) {
            console.log(error.respone?.data)
        }
    }
    async function fetchProfile() {
        const res = await axios.get('http://localhost:1337/api/profiles/' + localStorage.get('Profile')['Profile']['id'], {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
            }
        })
        // setProfile(res.data.data)
        console.log(res.data.data)
        setEmail(res.data.data.attributes.Email)
        setPhone(res.data.data.attributes.Sdt)
        setDiaChi(res.data.data.attributes.Diachi)
        setLinkWebsite(res.data.data.attributes.Url)
        setMoTa(marked(res.data.data.attributes.Mota));
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <>
            <Layout title="Tạo Profile Shop" maxwidth="max-w-screen-lg">
                <Card >
                    <form onSubmit={handleSubmit}>
                        <div className='flex'>
                            <div className='flex flex-wrap w-1/4 text-black flex-shrink-0'>
                                <div className='w-full xoa-justify-content-profile'>
                                    <div className='flex mb-5'>
                                        <Avatar
                                            className='mx-auto'
                                            img={hinhAnh
                                                ? URL.createObjectURL(hinhAnh)
                                                : "/images/user-avatar/0.jpg"}
                                            size="xl"
                                            rounded={true}
                                        />
                                    </div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Upload ảnh</label>
                                    <input accept='image/*' onChange={e => setHinhAnh(e.target.files[0])} className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file" />
                                    <p className="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG hoặc GIF</p>

                                </div>
                            </div>
                            <div className='w-3/4'>
                                <div className='w-8/10 ml-5 mb-5'>
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor="email4"
                                            value="Email gian hàng:"
                                        />
                                    </div>
                                    <TextInput
                                        id="email4"
                                        type="email"
                                        rightIcon={HiMail}
                                        placeholder="profilename@gmail.com"
                                        required={true}
                                        defaultValue={email}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='w-8/10 ml-5 mb-5'>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-900">Số điện thoại:</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Hãy nhập số điện thoại..."
                                            pattern="[0-9]{10}"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className='w-8/10 ml-5 mb-5'>
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor="address"
                                            value="Địa chỉ gian hàng:"
                                        />
                                    </div>
                                    <Textarea
                                        id="address"
                                        placeholder="Hãy nhập địa chỉ..."
                                        required={true}
                                        rows={2}
                                        value={diaChi}
                                        onChange={e => setDiaChi(e.target.value)}
                                    />
                                </div>
                                <div className='w-8/10 ml-5 mb-5'>
                                    <div className='mb-1 block'>
                                        <Label htmlFor='linkwebsite' value='Link Website của bạn:' />
                                    </div>
                                    <TextInput
                                        id="linkwebsite"
                                        placeholder='Hãy nhập link website...'
                                        type="text"
                                        sizing="md"
                                        value={linkWebsite}
                                        onChange={e => setLinkWebsite(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='mb-5'>
                            <div className='mb-1 block '>
                                <Label htmlFor='linkwebsite' value='Mô tả về gian hàng:' />
                            </div>
                            <QuillNoSSRWrapper
                                className='text-black'
                                modules={modules}
                                formats={formats}
                                theme="snow"
                                defaultValue={moTa}
                                value={moTa}
                                onChange={e => handleContentChange(e)} />
                        </div>
                        <div className='w-full flex'>
                            <div className='mx-auto mr-0 flex'>
                                <Button className='mr-2' gradientMonochrome="failure">Hủy</Button>
                                <Button gradientMonochrome="info" type="submit" >Lưu</Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </Layout>
        </>
    );
};

export default UpdateProfile;
