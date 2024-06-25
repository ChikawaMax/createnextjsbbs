'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { insertData } from './actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
    id: number;
    user: string;
    text: string;
}

const Insert = () => {
    const [bbs, setBbs] = useState<Props[]>([]);
    const [user, setUser] = useState<string>('名無し');
    const [text, setText] = useState<string>('');
    const [count, setCount] = useState<number>(0);

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
    }, [count]); // カウントが変わるたびにデータを再取得

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault(); // デフォルトのフォーム送信を防ぐ

        // データ挿入
        await insertData(new FormData(e.currentTarget as HTMLFormElement));

        // カウントを更新してデータを再取得させる
        setCount((prevCount) => prevCount + 1);

        // フォームをリセット
        setUser('');
        setText('');
    };

    return (
        <main>
            {bbs.length > 0 &&
                <div>
                    {bbs.map(bb => (
                        <div className='border bg-secondary p-2 m-2 rounded-lg' key={bb.id}>
                            <p className='text-sm'>ユーザー名：{bb.user}</p>
                            <p>{bb.text}</p>
                        </div>
                    ))}
                </div>
            }

            <form onSubmit={handleClick} className='border bg-secondary mt-10 grid gap-3 m-2 p-2 rounded-lg'>
                <div className='w-1/4'>
                    <div>ユーザー名</div>
                    <Input type='text' value={user} name='user' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)} />
                </div>
                <div className='w-1/2'>
                    <div>コメント</div>
                    <Input type='text' value={text} name='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
                </div>
                <div>
                    <Button type='submit'>追加</Button>
                </div>
            </form>
        </main>
    );
}

export default Insert;