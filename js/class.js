// class.js

/**
 * ユーザー情報を格納するクラス
 * @param {string} username - ユーザー名
 * @param {string} student_number - 出席番号
 * @property {string} name - ユーザー名
 * @property {string} student_number - 出席番号
 * @property {array} participation - 出席状況をatnd定数を使用して格納する配列
*/
class User {
    #username;
    #student_number;
    #participation;
    #participation_text;

    constructor(username, student_number) {
        this.#username = username;
        this.#student_number = student_number;
        this.#participation = [atnd.not_decided];
    }

    // getter
    get name() { return this.#username; }
    get student_number() { return this.#student_number; }
    get participation() { return this.#participation; }    
    get participation_text() {
        this.#participation_text = atnd_text[this.#participation];
        return this.#participation_text;
    }

    // setter
    set name(value) { this.#username = value; }
    set student_number(value) { this.#student_number = value; }

    /**
     * 出席状況を追加
     * @param {number} value - 出席状況をatnd定数を使用して指定
     */
    push_participation(value) {
        this.#participation.push(value);
    }
    /**
     * 出席状況を変更
     * @param {number} index - 変更する出席状況のインデックス
     * @param {number} value - 出席状況をatnd定数を使用して指定
    */
    change_participation(index, value) {
        this.#participation[index] = value;
    }

}