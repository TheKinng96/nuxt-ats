export default {
  editForm: {
    title: 'フォーム編集',
    subtitle: 'フォームの設定とフィールドを編集',
    back: '戻る',
    saveButton: '変更を保存',
    addFieldButton: 'フィールドを追加',
    basicInfo: {
      title: '基本情報',
      description: 'フォームの基本設定を編集',
    },
    fields: {
      title: 'フォームフィールド',
      subtitle: '候補者が入力する項目を管理',
      empty: 'まだフィールドが追加されていません。「フィールドを追加」ボタンから項目を追加してください。',
      edit: '編集',
      name: {
        label: 'フォーム名',
      },
      slug: {
        label: 'URL スラッグ',
      },
      description: {
        label: '説明',
      },
      isActive: {
        label: 'フォームを公開する',
      },
    },
    fieldTypes: {
      text: 'テキスト',
      email: 'メールアドレス',
      phone: '電話番号',
      textarea: 'テキストエリア',
      number: '数値',
      select: 'セレクト',
      multiSelect: '複数選択',
      checkbox: 'チェックボックス',
      radio: 'ラジオボタン',
      date: '日付',
      file: 'ファイル',
      url: 'URL',
    },
    stats: {
      title: '統計情報',
      fields: 'フィールド数',
      candidates: '候補者数',
      submissions: '応募数',
    },
    validation: {
      nameRequired: 'フォーム名は必須です',
      nameMin: 'フォーム名は2文字以上である必要があります',
      slugRequired: 'URLスラッグは必須です',
      slugPattern: 'URLスラッグは小文字の英数字とハイフンのみ使用できます',
    },
    success: {
      saved: 'フォームを保存しました',
    },
    errors: {
      fetchFailed: 'フォームの読み込みに失敗しました',
      saveFailed: 'フォームの保存に失敗しました',
    },
  },
}
