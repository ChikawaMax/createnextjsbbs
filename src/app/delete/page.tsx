import { createClient } from '../utils/supabase/server';
import { deleteData } from './action';

// このページをSSRにする（これがないと本番環境でこのページはSSGになる。その結果データベースを更新しても反映されなくなる。）
export const revalidate = 0;

const Page = async () => {
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
                            <form action={deleteData}>
                                <input type='text' defaultValue={bb.user!} name='user' disabled />
                                <input type='text' defaultValue={bb.text!} name='text' disabled />
                                <input type='number' defaultValue={bb.id} name='id' hidden />
                                <button type='submit'>削除</button>
                            </form>
                        </li>
                    ))}
                </ul>
            }
        </main>
    );
}

export default Page