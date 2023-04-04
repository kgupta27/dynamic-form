export interface FormControl {
    type: string;
    position: string;
    id: string;
    text?: string;
    value?: string;
    validation?: string;
    options?: { id: string; value: string }[];
    navigate?: string;
    style?: { [key: string]: string };
  }
  