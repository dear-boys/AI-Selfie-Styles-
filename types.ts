export interface StyleOption {
  label: string;
  value: string;
}

export interface StyleCategory {
  title: string;
  key: keyof SelectedOptions;
  options: StyleOption[];
}

export interface SelectedOptions {
  hairstyle: string;
  outfit: string;
  environment: string;
  posture: string;
  effect: string;
  headwear: string;
  footwear: string;
}
