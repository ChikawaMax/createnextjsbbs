'use server'

import { revalidatePath } from "next/cache";
import { createClient } from "../../../app/utils/supabase/server";
// サーバー側の処理なので、サーバー側のSupabaseクライアントを使用

/**
 * データ削除
 * @param formData - フォームデータ
 */
export async function deleteData(formData: FormData) {
    // Supabaseクライアントを作成
    const supabase = await createClient()

    // フォームから入力値を取得
    const inputs = {
        id: formData.get('id') as string,
    }

    // データ削除
    const { error } = await supabase
        .from('BBS')                  // todosテーブルから
        .delete()                       // 対象データを削除する
        .eq('id', parseInt(inputs.id))  // 対象はidが一致するデータ

    // エラーが発生した場合
    if (error) {
        // ...
    }

    // ページを再検証する（最新のデータを取得しなおす）
    revalidatePath("/delete");
}