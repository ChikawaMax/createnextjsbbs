import { createClient } from "@/app/utils/supabase/client";

const Select = async () => {
    const supabase = createClient();

    // BBSリストを取得
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
                        <li key={bb.id}>
                            <span>{bb.user}</span> : <span>{bb.text}</span>
                        </li>
                    ))}
                </ul>
            }
        </main>
    );
}

export default Select;
