import { reactive } from 'vue'

export type MenuItem = {
  name: string
  href?: string
  children?: MenuItem[]
  showSubMenu?: boolean
}

export const menuList: MenuItem[] = reactive([
  {
    name: 'サービス',
    showSubMenu: false,
    children: [
      { name: 'サービス一覧', href: 'https://comiru.jp/lineup' },
      { name: 'ComiruBASIC', href: 'https://comiru.jp/' },
      { name: 'ComiruFREE', href: 'https://comiru.jp/free/index' },
      { name: 'ComiruAir', href: 'https://comiru.co/lp/air/' },
      { name: 'ComiruHR', href: 'https://contents.comiru.jp/feature/hr/' },
    ]
  },
  {
    name: 'プラン一覧',
    href: 'https://comiru.jp/plans'
  },
  {
    name: '基本機能',
    showSubMenu: false,
    children: [
      {
        name: 'Comiru',
        showSubMenu: false,
        children: [
          { name: '専用アプリ＆LINE連携', href: 'https://comiru.jp/feature/app' },
          { name: '指導報告書', href: 'https://comiru.jp/feature/report' },
          { name: 'お知らせ', href: 'https://comiru.jp/feature/news' },
          { name: '入退室管理', href: 'https://comiru.jp/feature/entry' },
          { name: '請求書', href: 'https://comiru.jp/feature/invoice' },
          { name: '口座振替', href: 'https://comiru.jp/feature/account' },
          { name: 'カード決済', href: 'https://comiru.jp/feature/card' },
          { name: '成績管理', href: 'https://comiru.jp/feature/record' },
          { name: '座席管理', href: 'https://comiru.jp/feature/seat' },
          { name: '見込顧客獲得', href: 'https://comiru.jp/free/lead-manage' },
          { name: 'Web申込み', href: 'https://comiru.jp/free/web-apply' },
          { name: '口コミ収集＆掲載', href: 'https://comiru.jp/free/collect' }
        ]
      },
      {
        name: 'ComiruAir',
        showSubMenu: false,
        children: [
          { name: 'オンライン授業支援', href: 'https://comiru.co/lp/air/' }
        ]
      },
      {
        name: 'ComiruHR',
        showSubMenu: false,
        children: [
          { name: '講師人事労務管理', href: 'https://contents.comiru.jp/feature/hr/' }
        ]
      }
    ]
  },
  {
    name: '導入事例',
    href: 'https://comiru.jp/case/list'
  },
  {
    name: 'お役立ち資料',
    href: 'https://comiru.jp/file/list'
  },
  {
    name: 'セミナー一覧',
    href: 'https://comiru.jp/seminar/list'
  },
  {
    name: 'ヘルプ',
    showSubMenu: false,
    children: [
      {
        name: 'Comiru',
        showSubMenu: false,
        children: [
          { name: '導入までの流れ', href: 'https://comiru.jp/introduction' },
          { name: 'よくある質問', href: 'https://comiru.jp/faq' }
        ]
      },
      {
        name: 'ComiruAir',
        showSubMenu: false,
        children: [
          { name: 'よくある質問', href: 'https://comiru.jp/air/faq' }
        ]
      },
      { name: 'お問い合わせ', href: 'https://comiru.jp/feedback' }
    ]
  }
])