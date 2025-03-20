import React, { useState } from 'react';
import MultiSelect from './components/MultiSelect';
import { DropdownOptionType } from './types/dropdown';
import { dropDownItems } from './constant/dropDownItems';

const App: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState< DropdownOptionType[]>([]);

  const [availableOptions] = useState<{label: string, value: string}[]>(dropDownItems);

  const handleChange = (newSelected:  DropdownOptionType[]) => {
    setSelectedOptions(newSelected);
  };

  return (
    <div style={{ margin: '100px' }}>
      <h1>Lobox MultiSelect </h1>
      <MultiSelect
        options={availableOptions}
        selected={selectedOptions}
        onChange={(selectedOptions: {label: string, value: string}[]) => handleChange(selectedOptions)}
        placeholder="Type to add or filter..."
      />
    </div>
  );
};

export default App;
