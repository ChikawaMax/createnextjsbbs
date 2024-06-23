
// サーバー側の処理なので、サーバー側のSupabaseクライアントを使用
import { createClient } from '@/app/utils/supabase/server';
import { updateData } from './action';

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
                            <form action={updateData}>
                                <input type='text' defaultValue={bb.user!} name='user' />
                                <input type='text' defaultValue={bb.text!} name='text' />
                                <input type='number' defaultValue={bb.id} name='id' hidden />
                                <button type='submit'>更新</button>
                            </form>
                        </li>
                    ))}
                </ul>
            }
        </main>
    );
}

export default Update