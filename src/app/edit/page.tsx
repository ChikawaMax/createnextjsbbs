import Delete from '@/components/action/delete/delete'
import Update from '@/components/action/update/update'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='grid gap-5 m-5'>
            <Link href={'/'}>戻る</Link>
            <Update />
            <Delete />
        </div>
    )
}

export default page
