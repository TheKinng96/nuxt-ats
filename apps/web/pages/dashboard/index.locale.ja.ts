export default {
  dashboard: {
    title: 'ダッシュボード',
    welcome: 'ようこそ、{name}さん',
    logoutButton: 'ログアウト',
    userInfo: {
      title: 'ユーザー情報',
      subtitle: '現在のログインユーザー',
      name: '名前',
      email: 'メールアドレス',
      role: 'ロール',
      userId: 'ユーザーID',
    },
    organizationInfo: {
      title: '組織情報',
      subtitle: '所属している組織',
      name: '組織名',
      slug: 'スラッグ',
      organizationId: '組織ID',
    },
    debug: {
      title: 'デバッグ情報',
      subtitle: '開発用データ（本番環境では非表示）',
      authState: '認証状態',
      isAuthenticated: 'isAuthenticated',
      isAdmin: 'isAdmin',
      isRecruiter: 'isRecruiter',
      fullUserObject: '完全なユーザーオブジェクト',
      fullOrganizationObject: '完全な組織オブジェクト',
    },
  },
}
