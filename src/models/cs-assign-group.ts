export interface ICSAssignGroup {
  csassignMainId?: string;
  loginId?: string;
  userName?: string;
  proTitleLevelLabel?: string;
  itemId?: string;
  itemName?: string;
  csteamId?: string;
  teamName?: string;
  timeInterval?: string;
  beds?: string;
  checkItems?: string;
}

export default class CSAssignGroup implements ICSAssignGroup {
  csassignMainId: string;
  loginId: string;
  userName: string;
  proTitleLevelLabel: string;
  itemId: string;
  itemName: string;
  csteamId: string;
  teamName: string;
  timeInterval: string;
  beds: string;
  checkItems: string;

  constructor({
    csassignMainId = '',
    loginId = '',
    userName = '',
    proTitleLevelLabel = '',
    itemId = '',
    itemName = '',
    csteamId = '',
    teamName = '',
    timeInterval = '',
    beds = '',
    checkItems = ''
  }: ICSAssignGroup = {}) {
    this.csassignMainId = csassignMainId;
    this.loginId = loginId;
    this.userName = userName;
    this.proTitleLevelLabel = proTitleLevelLabel;
    this.itemId = itemId;
    this.itemName = itemName;
    this.csteamId = csteamId;
    this.teamName = teamName;
    this.timeInterval = timeInterval;
    this.beds = beds;
    this.checkItems = checkItems;
  }
}

