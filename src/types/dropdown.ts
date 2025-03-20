export interface DropdownOptionType {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  options: DropdownOptionType[];
  selected: DropdownOptionType[];
  onChange: (selectedOptions: DropdownOptionType[]) => void;
  placeholder?: string;
}
