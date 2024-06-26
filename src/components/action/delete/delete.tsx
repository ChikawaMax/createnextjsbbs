import { Input } from '@/components/ui/input';
import { createClient } from '../../../app/utils/supabase/server';
import { deleteData } from './action';
import { Button } from '@/components/ui/button';

// このページをSSRにする（これがないと本番環境でこのページはSSGになる。その結果データベースを更新しても反映されなくなる。）
export const revalidate = 0;

const Delete = async () => {
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
                            <form action={deleteData} className='flex gap-2 mb-2 justify-center'>
                                <Input type='text' defaultValue={bb.user!} name='user' disabled className='w-1/5' />
                                <Input type='text' defaultValue={bb.text!} name='text' disabled className='w-3/5' />
                                <input type='number' defaultValue={bb.id} name='id' hidden />
                                <Button type='submit'>削除</Button>
                            </form>
                        </li>
                    ))}
                </ul>
            }
        </main>
    );
}

export default Delete