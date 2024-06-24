'use client'

import { useState, useEffect } from 'react';
import { insertData } from "./actions";
import { createClient } from '@/app/utils/supabase/client';

interface Props {
    id: number;
    user: string;
    text: string;
}

const Insert = () => {
    const [bbs, setBbs] = useState<Props[]>([]);
    const [user, setUser] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [count, setCount] = useState<number>(0)

    const handleClick = () => setCount((prevCount) => prevCount + 1);

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient();

            // BBSリストを取得
            const { data, error } = await supabase
                .from('BBS')
                .select();

            // エラーが発生した場合
            if (error) {
                console.error("BBSの取得でエラーが発生しました", error);
                return;
            }

            // データを状態に保存
            if (data) {
                setBbs(data);
            }
        };

        fetchData();
    }, [count]); // 空の依存配列で、コンポーネントの初回レンダリング時に実行

    return (
        <main>
            <form action={insertData} className='flex gap-5'>
                <input type='text' value={user} name='user' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)} />
                <input type='text' value={text} name='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
                <button type='submit' onClick={handleClick}>追加</button>
            </form>
            {bbs.length > 0 &&
                <ul>
                    {bbs.map(bb => (
                        <li key={bb.id}>
                            <span>{bb.user}</span> : <span>{bb.text}</span>
                        </li>
                    ))}
                </ul>
            }
        </main>
    );
}

export default Insert;
