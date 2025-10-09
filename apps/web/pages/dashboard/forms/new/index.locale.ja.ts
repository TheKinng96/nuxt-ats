export default {
  newForm: {
    title: '新規フォーム作成',
    subtitle: '候補者が応募するためのカスタムフォームを作成します',
    back: '戻る',
    submitButton: 'フォームを作成',
    formInfo: {
      title: '基本情報',
      description: 'フォームの基本情報を入力してください',
    },
    fields: {
      name: {
        label: 'フォーム名',
        placeholder: '例: エンジニア採用応募フォーム',
        help: '社内で識別しやすい名前をつけてください',
      },
      slug: {
        label: 'URL スラッグ',
        placeholder: 'engineer-application',
        help: '公開URLに使用されます。小文字の英数字とハイフンのみ使用可能',
      },
      description: {
        label: '説明',
        placeholder: 'このフォームの用途や目的を入力',
        help: '任意：フォームの目的や用途を記載してください',
      },
      isActive: {
        label: 'フォームを公開する',
        help: 'オフにすると、候補者は応募できなくなります',
      },
    },
    validation: {
      nameRequired: 'フォーム名は必須です',
      nameMin: 'フォーム名は2文字以上である必要があります',
      slugRequired: 'URLスラッグは必須です',
      slugPattern: 'URLスラッグは小文字の英数字とハイフンのみ使用できます',
    },
    info: {
      title: '次のステップ',
      description: 'フォームを作成後、フィールドを追加して応募項目をカスタマイズできます。',
    },
    errors: {
      createFailed: 'フォームの作成に失敗しました',
    },
  },
}
