'use server'

import { createClient } from "../utils/supabase/server"


/**
 * データ更新
 * @param formData - フォームデータ
 */
export async function updateData(formData: FormData) {
    // Supabaseクライアントを作成
    const supabase = await createClient()

    // フォームから入力値を取得
    const inputs = {
        id: formData.get('id') as string,
        text: formData.get('text') as string,
        user: formData.get('user') as string,
    }

    // データ更新
    const { error } = await supabase
        .from('BBS')                  // todosテーブルを
        .update({ text: inputs.text, user: inputs.user })  // 入力されたテキストに更新する
        .eq('id', parseInt(inputs.id))  // 対象はidが一致するデータ

    // エラーが発生した場合
    if (error) {
        // ...
    }
}