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

const ChangePassword = (props: any) => {
    const [currentpassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [pwdconfirm, setPwdConfirm] = useState('')

    const data = {
        currentPassword: currentpassword,
        password: password,
        passwordConfirmation: pwdconfirm
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        console.log("data: ", data)
        const changepwd = await fetch(`http://localhost:1337/api/auth/change-password`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer `+ localStorage.get('Profile')['jwt']
            },
            body: JSON.stringify(data)
        })

        const res = await changepwd.json()

        if (typeof res.error !== "undefined") {
            console.log('Change password fail', res.error);
        } else {
            console.log('Change password success', res);
        }
    }


    return (
        <>
            <Layout title="Tạo Profile Shop" maxwidth="max-w-screen-lg">
                <Card >
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className='flex'>
                            <div className='w-4/5 mx-auto'>
                                <div className='w-8/10 ml-5 mb-5'>
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor="currentpassword"
                                            value="Password hiện tại:"
                                        />
                                    </div>
                                    <TextInput
                                        name="currentpassword"
                                        type="password"
                                        placeholder="Hãy nhập password hiện tại..."
                                        required={true}
                                        value={currentpassword}
                                        onChange={e => setCurrentPassword(e.target.value)}
                                    />
                                </div>
                                <div className='w-8/10 ml-5 mb-5'>
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor="password"
                                            value="Password mới:"
                                        />
                                    </div>
                                    <TextInput
                                        name="password"
                                        type="password"
                                        placeholder="Hãy nhập password mới..."
                                        required={true}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className='w-8/10 ml-5 mb-5'>
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor="pwdconfirm"
                                            value="Xác nhận lại password:"
                                        />
                                    </div>
                                    <TextInput
                                        name="pwdconfirm"
                                        type="password"
                                        placeholder="Hãy nhập xác nhận lại password..."
                                        required={true}
                                        value={pwdconfirm}
                                        onChange={e => setPwdConfirm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex'>
                            <div className='mx-auto flex'>
                                <Button className='mr-2' gradientMonochrome="failure">Hủy</Button>
                                <Button gradientMonochrome="info" type='submit' >Lưu</Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </Layout>
        </>
    );
};

export default ChangePassword;
