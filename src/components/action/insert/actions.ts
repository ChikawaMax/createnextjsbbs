'use server'

import { createClient } from "@/app/utils/supabase/server"


// サーバー側の処理なので、サーバー側のSupabaseクライアントを使用

/**
 * データ挿入
 * @param formData - フォームデータ
 */
export async function insertData(formData: FormData) {
    // Supabaseクライアントを作成
    const supabase = await createClient()

    // フォームから入力値を取得
    const inputs = {
        user: formData.get('user') as string,
        text: formData.get('text') as string,
    }

    // データ挿入
    const { error } = await supabase
        .from("BBS")                  // todosテーブルに
        .insert({ text: inputs.text, user: inputs.user })  // 入力されたテキストを挿入

    // エラーが発生した場合
    if (error) {
        // ...
    }
}