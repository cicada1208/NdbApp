export default {
  required:
    (label = '') =>
    (v: unknown): unknown =>
      (v || '').toString().trim().length > 0 || `${label || '欄位'} 必填`,

  maxLen:
    (maxLen: number, chs = true, label = '') =>
    (v: unknown): unknown =>
      (chs
        ? // eslint-disable-next-line no-control-regex
          (v || '').toString().replace(/[^\x00-\xff]/g, 'xx').length <= maxLen
        : (v || '').toString().length <= maxLen) ||
      `${label || '欄位'} 字長超過 ${maxLen}`,

  email:
    (label = '') =>
    (v: string): unknown => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(v) || `${label || '欄位'} 格式錯誤`;
    },

  /**
   * v-file-input
   * - when multiple: param v is an array of files
   * - when not multiple: param v is a file
   * @returns false or error message 表示為錯誤狀態
   */
  file:
    (maxMb: number, label = '') =>
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    (v): unknown => {
      // v-file-input when multiple: param v is an array of files
      // when not multiple: param v is a file
      // return false or error message 表示為錯誤狀態
      let result;
      if (!v) return true;
      else if (!isNaN(v.length)) {
        // multiple
        result = !v.length || !v.filter(f => f.size > maxMb * 1000000).length;
      } else {
        // not multiple
        result = !v || !(v.size > maxMb * 1000000);
      }
      result = result || `${label} 每個檔案須小於 ${maxMb} MB`;
      return result;
    }
};
