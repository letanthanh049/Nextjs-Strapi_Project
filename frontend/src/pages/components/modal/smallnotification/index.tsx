import { useEffect } from 'react';
import { Toast } from 'flowbite-react'

export const SmallNotification = (props: any) => {

    useEffect(() => {
        let timeoutId;
        if (props.visible) {
            timeoutId = setTimeout(() => {
                props.setVisible(false);
            }, 2000);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [props.visible]);

    return props.visible
        ? <div className='fixed z-10 bottom-10 right-10'>
            <Toast className='border border-stone-950'>
                <div className="ml-3 text-base text-black font-normal">
                    Bạn đã copy số điện thoại thành công!
                </div>
            </Toast>
        </div>
        : null;
}