import React from 'react'
import { Button, Modal } from 'flowbite-react'
import Image from 'next/image'

export const AlertModal = (props: any) => {

    const close = () => { props.isShowChange(false) }

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
                            <Button gradientMonochrome="info" onClick={close}>Đồng ý</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}