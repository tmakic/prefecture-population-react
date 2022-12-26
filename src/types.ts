export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export interface InputCheckEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement
}