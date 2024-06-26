
// サーバー側の処理なので、サーバー側のSupabaseクライアントを使用
import { createClient } from '@/app/utils/supabase/server';
import { updateData } from './action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// このページをSSRにする（App Routerの仕様で、これがないと本番環境でこのページはSSGになる。その結果データベースを更新しても反映されなくなる。）
export const revalidate = 0;

const Update = async () => {
    // Supabaseクライアントを作成
    const supabase = createClient();

    // Todoのリストを取得
    const { data: bbs, error } = await supabase
        .from('BBS')
        .select()

    // エラーが発生した場合
    if (error) {
        return <div>Todoの取得でエラーが発生しました</div>
    }

    return (
        <main>
            {bbs.length > 0 &&
                <ul>
                    {/* データの数だけフォームを用意 */}
                    {bbs.map(bb => (
                        <li key={bb.id}>
                            <form action={updateData} className='flex gap-2 mb-2 justify-center'>
                                <Input type='text' defaultValue={bb.user!} name='user' className='w-1/5' />
                                <Input type='text' defaultValue={bb.text!} name='text' className='w-3/5' />
                                <input type='number' defaultValue={bb.id} name='id' hidden />
                                <Button type='submit'>更新</Button>
                            </form>
                        </li>
                    ))}
                </ul>
            }
        </main>
    );
}

export default Update