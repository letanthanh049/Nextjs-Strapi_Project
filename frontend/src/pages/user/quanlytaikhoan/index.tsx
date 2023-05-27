import React from 'react'
import 'flowbite';
import { Layout } from '@/pages/components/layout';
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi'

const QuanLyTaiKhoan = () => {
    return (
        <>
            <Layout title='Quản lý tài khoản' maxwidth='max-w-screen-2xl'>
                <Breadcrumb className='mb-5'>
                    <Breadcrumb.Item href="/" icon={HiHome}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>
                </div>
                <div>

                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>France</option>
                        <option>Germany</option>
                    </select>

                </div>

            </Layout>
        </>
    )
}

export default QuanLyTaiKhoan