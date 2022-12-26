export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export interface Population {
  prefCode: number;
  prefName: string;
  data: { value: number; year: number }[];
}

export interface InputCheckEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement
}