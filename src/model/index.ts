/**
 * @title Eメールアドレス
 */
type Email = { type: 'email '; address: string };

/**
 * @title お電話番号
 */
type Phone = { type: 'phone'; number: string };
export interface お問い合わせForm {
  氏名: string;
  お問い合わせの種類: 'ご質問' | 'ご要望' | 'その他';
  お問い合わせ内容: string;
  日中の連絡先: Email | Phone;
  備考?: string;
}
