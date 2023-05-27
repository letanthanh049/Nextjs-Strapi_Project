import React, { useState, useEffect } from 'react'
import { Router, useRouter } from 'next/router'
import axios from 'axios';
import Link from 'next/link'
import { Dropdown, Avatar } from 'flowbite-react'
import * as localStorage from 'local-storage';

export const Header = () => {
    // const router = useRouter();
    const [loginstatus, setLoginstatus] = useState(true);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [searchvalue, setSearchvalue] = useState('')

    const router = useRouter();

    const login = () => setLoginstatus(true)
    const logout = () => {
        setLoginstatus(false);
        localStorage.clear()
        router.push("/");
    }

    const myCheckProfile = () => {
        if (localStorage.get("Profile") === null) useEffect(() => { logout() }, []);
        else {
            useEffect(() => {
                login()
                setUsername(localStorage.get('Profile')['username']);
                setEmail(localStorage.get('Profile')['email'])
            }, []);
        }
    }
    myCheckProfile()

    const handleInputChange = (e) => {
        setSearchvalue(e.target.value);
    }



    const handleSubmit = async (e) => {
        const res = await axios.get('http://localhost:1337/api/sanphams?filters[TenSP][$contains]=' + searchvalue, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
            }
        })
        console.log(res.data.data)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    return (
        <>
            {/* Custom o trang https://flowbite.com/docs/components/navbar/ */}
            <nav className="bg-white border-gray-200">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                    <Link href="/" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl text-black font-semibold whitespace-nowrap">HTTC Store</span>
                    </Link>
                    <form onSubmit={handleSubmit}>
                        <div className="flex md w-96">
                            <div className="relative hidden md:block w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Search icon</span>
                                </div>
                                <input value={searchvalue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    type="text"
                                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Tìm kiếm..." />
                            </div>
                        </div>
                    </form>
                    <div className="flex items-center">
                        {loginstatus
                            ? <>
                                <Dropdown label={<>
                                    <Avatar img={localStorage.get('Profile')
                                        ? "/images/user-avatar/" + localStorage.get('Profile')['Hinhanh']
                                        : "/images/user-avatar/1.jpg"
                                    } rounded bordered size="sm" />
                                    <span className='text-black font-medium text-sm ml-2'>{username}</span>
                                </>}
                                    pill
                                    outline
                                    color="blue"
                                    size=""
                                >
                                    <Dropdown.Header>
                                        <span className="block text-sm font-medium">
                                            {username}
                                        </span>
                                        <span className="block truncate text-sm">
                                            {email}
                                        </span>
                                    </Dropdown.Header>
                                    <Dropdown.Item>
                                        {localStorage.get('Profile') && localStorage.get('Profile')['Profile'] !== null && localStorage.get('Profile')['Profile']['id'] !== null
                                            ? <Link href={"/user/updateprofile/"}>Sửa Profile Shop</Link>
                                            : <Link href={"/user/updateprofile/"}>Tạo Profile</Link>
                                        }
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link href="/user/productmanage">Quản lý sản phẩm</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link href="/user/changepassword">Đổi mật khẩu</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => logout()}>
                                        Đăng xuất
                                    </Dropdown.Item>
                                </Dropdown>
                            </>
                            : <>
                                <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-3.5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link href='../../account/SignIn'>Đăng nhập</Link></button>
                                <button type="button" className="text-white ml-2 bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-sm px-3.5 py-2.5 text-center mr-3 md:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"><Link href='../../account/SignUp'>Đăng ký</Link></button>
                            </>
                        }

                    </div>
                </div>
            </nav>
            <nav className="bg-gray-50 dark:bg-gray-700 flex items-center">
                <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
                    <div className="flex items-center">
                        <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                            <li>
                                <Link href="/" className="text-base text-gray-900 dark:text-white hover:underline" aria-current="page">Trang chủ</Link>
                            </li>
                            <li>
                                <Link href="/sanpham" className="text-base text-gray-900 dark:text-white hover:underline">Sản phẩm</Link>
                            </li>
                            <li>
                                <Link href="/categories/" className="text-base text-gray-900 dark:text-white hover:underline">Danh mục</Link>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-900 dark:text-white hover:underline">Thương hiệu</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}