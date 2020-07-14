export interface VendindKeypad {
  buttons: string[];
  displayedProducts: any[];
  initialized: boolean;

  result: string;
  previousItem: string;
  topUp: boolean;

  // error vars
  invalidText: string;
  showData: boolean;
  isCodeValid: boolean;
  isCreditValid: boolean;

  errorCategory: string[];
}
