// サーバー側の処理なので、サーバー側のSupabaseクライアントを使用
import { createClient } from "../utils/supabase/server";


// このページをSSRにする（これがないと本番環境でこのページはSSGになる。その結果データベースを更新しても反映されなくなる。※supabaseとは関係なく、App Routerのお話）
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
                    {bbs.map(bb => (
                        <ul key={bb.id}>
                            <li>{bb.user}</li><li>{bb.text}</li>
                        </ul>
                    ))}
                </ul>
            }
        </main>
    );
}

export default Page