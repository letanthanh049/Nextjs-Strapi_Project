import React from 'react'
import { Button, Modal } from 'flowbite-react'
import Image from 'next/image'
import axios from 'axios'

export const ConfirmModal = (props: any) => {

    async function fetchProfileProduct(idproduct: any) {
        const res = await axios.delete('http://localhost:1337/api/sanphams/' + idproduct, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 44e1c4adc864717c17b7fc4c0d884aaf8cffbc57c1b937a36d168acd9bdbe535e56d1adbd934ef9355fc6462f8309dbad3606ca31b392c5191d2bd00f78a22edb58c5d46b71849cbc50b8fa8b8bb36c330ae69afe7ca86feff04cc31057ef726d0087b4e9ff748f88cb8977de146c1349133ca86d8d7698db77da8fc9a7d8e24`
            }
        })
        props.fetchProfileProduct()
    }

    const accept = () => {
        fetchProfileProduct(props.currentdeleteproduct)
        props.isShowChange(false)
    }
    const cancel = () => { props.isShowChange(false) }

    return (
        <>
            <Modal
                dismissible={true}
                show={props.isShow}
                size="md"
                popup={true}
                onClose={close}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <Image alt="Alert icon" width='80' height='80' className="mx-auto mb-4 text-gray-400" src="/alert_icon.png"></Image>
                        <h3 className="mb-5 text-lg font-normal text-black">
                            {props.message}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button gradientMonochrome="info" onClick={accept}>Đồng ý</Button>
                            <Button gradientMonochrome="failure" onClick={cancel}>Hủy</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}