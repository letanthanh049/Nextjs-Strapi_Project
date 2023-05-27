import React from 'react'
import { Card, Badge } from 'flowbite-react';
import Link from 'next/link';
import Image from 'next/image';
import { NumericFormat } from 'react-number-format';

export const ProductCardCarousel = (props: any) => {
    const parts = props.image.split('.');
    const trueimage = `${parts[0]}-1.${parts[1]}`

    return (
        <>
            <div className="product-card-carousel mx-1 mb-2">
                <div className='w-full h-full'>
                    <Card className='h-80 hover:border-blue-600 hover:border-2'>
                        <Link href={props.href}>
                            <Image className="aspect-square" width={250} height={250} alt={props.title} src={"/images/products/" + trueimage} />
                            <h5 className="text-md font-semibold tracking-tight text-gray-900 truncate">
                                {props.title}
                            </h5>
                        </Link>
                        <Badge className='w-fit'>{props.category}</Badge>
                        <div className='mb-2'>
                            <NumericFormat className="w-full text-lg font-bold text-gray-900" value={props.price} displayType='text' thousandSeparator={true} suffix='₫' />
                        </div>
                    </Card>
                </div >
            </div >
        </>
    )
}
