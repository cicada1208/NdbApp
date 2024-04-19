import { utils, writeFile } from 'xlsx';

/**
 * export xlsx
 * @param data array of json-object
 * @param wbName work book name
 */
export function exportXlsx(
  data: unknown[],
  wbName = '匯出資料.xlsx',
  wsName: string = null
): void {
  const wb = utils.book_new();
  const ws = utils.json_to_sheet(data);
  utils.book_append_sheet(wb, ws, wsName);
  writeFile(wb, wbName);
}
