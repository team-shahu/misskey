オリジナルのMisskeyの変更履歴は[CHANGELOG](CHANGELOG.md)をご覧ください。

<!--
## Unlereased
### General

### Client

### Server

  
-->
## shahu.1.10.1
### General
- Fix: ロール剥奪後もサーバーサイドLLMが使えてしまうバグの修正
### Client
- Enhance: 独自機能設定画面の挙動を改善

## shahu.1.10.0
### General
- Feat: LLMによる拡張機能(ノート要約, プロフィール要約, ノート作成補助)
- Enhance: LLM利用ロールの追加

### Client
- Fix: セミパブリック投稿の公開範囲が削除して編集で引き継がれない問題

### Server
- Enhance: サーバーサイドで使用するLLMトークンを指定できるように
- Fix: 2025.3.0の変更に合わせてisRoot処理系を廃止

## shahu.1.9.3
### Client
- 1.9.2の修正に漏れがあったため再度修正
  
## shahu.1.9.2
### Client
- サーバーアイコンがすべて自鯖のものになってしまうバグの修正
  
## shahu.1.9.1
### Client
- サーバー情報をアイコンのみにする設定が有効時、異常な挙動を示す問題の修正
  
## shahu.1.9.0
### Client
- Fix: サーバー情報をアイコンのみにする設定が有効時、レイアウトが崩れてしまう問題の修正

### Server
- Fix: ブロック履歴周りが正常に完了しない問題や履歴が正しく発行されない問題を修正
- Refactor: フォロー履歴関連の最適化
- Fix: 絵文字のアップロードにコケる問題の修正
- Fix: 絵文字の画像更新時にシステムユーザーとして再アップロードされていなかった問題の修正


## etc
過去のバージョン (1.9.0未満) の詳細な変更履歴は記録されていません。

### 過去に実装された独自機能
- ノートを一定期間で自動消去する「すぐ消す」機能　不明, https://github.com/team-shahu/misskey/pull/32
- チャンネル内お知らせ機能 https://github.com/team-shahu/misskey/pull/2
- 他インスタンスの絵文字でもローカルに存在すればリアクションできるように
- フォローリクエストを自動的に拒否する機能
- 絵文字のクリックメニューに「絵文字ピッカーに追加」を追加
- 投稿フォームのツールバーを任意にカスタマイズできるように
- 下書き機能
- 同じ音源が短時間で重複して流れないように
- 通知にフォロバボタンを表示 https://github.com/team-shahu/misskey/pull/5
- 二要素認証のバックアップコードを保存するように促すダイアログを表示するように
- カスタムフォント機能
- 絵文字を登録したユーザーがアカウントを消去しても継続して絵文字の使用ができるように https://github.com/team-shahu/misskey/pull/11
- アバターデコレーションを登録したユーザーがアカウントを消去しても継続して使用ができるように
- アバターデコレーションをmisskeyUI上から登録できるように https://github.com/team-shahu/misskey/pull/12
- TL上のサーバー情報をアイコン表示に切り替えられるように https://github.com/team-shahu/misskey/pull/13 https://github.com/team-shahu/misskey/pull/24
- 特定のロールにのみお知らせを発行する機能 https://github.com/team-shahu/misskey/pull/18 https://github.com/team-shahu/misskey/pull/54 https://github.com/team-shahu/misskey/pull/58
- リアクションした人一覧がブロック・ミュートを考慮するようにする設定 https://github.com/team-shahu/misskey/pull/23 https://github.com/team-shahu/misskey/pull/27
- 誰がリアクションをしたのかを非表示にできる機能 https://github.com/hideki0403/kakurega.app/commit/65d85bb4fe724dc0737f1ac7958bc13c96cc926d
- 誰がリアクションをしたのかを非表示にできる機能 https://github.com/team-shahu/misskey/pull/35 (https://github.com/team-shahu/misskey/commit/5b2923c8127336d7fd2ee39c76d16f8a30d1b9e1)
- 任意のTLを非表示にできるように https://github.com/team-shahu/misskey/pull/36
- プロフィールからアクティビティとファイルを隠せるようにする https://github.com/team-shahu/misskey/pull/37
- フォローしているユーザーなら鍵ノートでもアンテナにひっかかるように https://github.com/team-shahu/misskey/pull/38
- nyaizeを無効化できるように https://github.com/team-shahu/misskey/pull/39
- 新着ノート通知があった時まとめるように https://github.com/team-shahu/misskey/pull/40
- いいねボタンの実装 https://github.com/team-shahu/misskey/pull/41 https://github.com/team-shahu/misskey/pull/44 https://github.com/team-shahu/misskey/pull/45
- 独自機能ページの追加 https://github.com/team-shahu/misskey/pull/42
- 予約投稿機能 https://github.com/team-shahu/misskey/pull/46 https://github.com/team-shahu/misskey/pull/49 https://github.com/team-shahu/misskey/pull/51
- フォロー/フォロリクの履歴 https://github.com/team-shahu/misskey/pull/49 https://github.com/team-shahu/misskey/pull/50 https://github.com/team-shahu/misskey/pull/49 https://github.com/team-shahu/misskey/pull/53 https://github.com/team-shahu/misskey/pull/65
- ドライブから削除したファイルをオブジェクトストレージからも葬るように https://github.com/team-shahu/misskey/pull/49 https://github.com/team-shahu/misskey/pull/52
- えもえもローディング画面 https://github.com/team-shahu/misskey/pull/55
- セミパブリックモードの追加 https://github.com/team-shahu/misskey/pull/57 https://github.com/team-shahu/misskey/pull/60 https://github.com/team-shahu/misskey/pull/62 https://github.com/team-shahu/misskey/pull/63 https://github.com/team-shahu/misskey/pull/66 https://github.com/team-shahu/misskey/pull/68
- ログイン通知周りの改良 https://github.com/team-shahu/misskey/pull/59 https://github.com/team-shahu/misskey/pull/65 https://github.com/team-shahu/misskey/pull/70
- 絵文字ライセンスをAPに追加 https://github.com/team-shahu/misskey/pull/64
- listenbrainzウィジェット https://github.com/team-shahu/misskey/pull/69
