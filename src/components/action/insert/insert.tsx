'use client'

import { useState } from 'react';
import { insertData } from "./actions";

const Insert = () => {
    // 挿入するデータ
    const [user, setUser] = useState('');
    const [text, setText] = useState('');

    return (
        <main>
            <form action={insertData} className='flex gap-5'>
                <input type='text' value={user} name='user' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)} />
                <input type='text' value={text} name='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
                <button type='submit'>追加</button>
            </form>
        </main>
    );
}

export default Insert;