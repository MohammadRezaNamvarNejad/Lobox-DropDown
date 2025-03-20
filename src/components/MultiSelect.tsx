import React, {
    useState,
    useRef,
    useEffect,
    KeyboardEvent,
    ChangeEvent,
    MouseEvent,
  } from 'react';
  import '../styles/MultiSelect.scss';
import { DropdownOptionType, MultiSelectProps } from '../types/dropdown';
  

  const MultiSelect: React.FC<MultiSelectProps> = ({
    options,
    selected,
    onChange,
    placeholder = 'Select or type...',
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      function handleClickOutside(event: MouseEvent | globalThis.MouseEvent) {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const toggleDropdown = () => {
      setIsOpen((prev) => !prev);
    };
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (!isOpen) {
        setIsOpen(true);
      }
    };
  
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        e.preventDefault();
        addNewOption(inputValue.trim());
        setInputValue('');
      }
    };
  
    const addNewOption = (newLabel: string) => {
      const value = newLabel.toLowerCase().replace(/\s+/g, '-');
      const alreadyExists = options.some((opt) => opt.value === value);
  
      if (!alreadyExists) {
        const newOption: DropdownOptionType = { label: newLabel, value };
        const newOptions = [...options, newOption];
        onChange([...selected, newOption]);
      } else {
        const existingOption = options.find((opt) => opt.value === value);
        if (existingOption && !selected.some((sel) => sel.value === value)) {
          onChange([...selected, existingOption]);
        }
      }
    };
  
    const handleSelectOption = (option: DropdownOptionType) => {
      const isSelected = selected.some((sel) => sel.value === option.value);
      if (isSelected) {
        onChange(selected.filter((sel) => sel.value !== option.value));
      } else {
        onChange([...selected, option]);
      }
    };
  
    const handleRemoveSelected = (option: DropdownOptionType) => {
      onChange(selected.filter((sel) => sel.value !== option.value));
    };
  
    const filteredOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  
    return (
      <div className="multi-select" ref={containerRef}>
        <div className="multi-select__control" onClick={toggleDropdown}>
          {selected.map((option) => (
            <div key={option.value} className="multi-select__value-badge">
                <span className='multi-select__value-badge-label'>{option.label}</span>
              <span
                className="multi-select__value-badge-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveSelected(option);
                }}
              >
                &times;
              </span>
            </div>
          ))}
  
          <input
            className="multi-select__control-input"
            type="text"
            value={inputValue}
            placeholder={selected.length==0 ? placeholder : ''}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
  
        {isOpen && (
          <div className="multi-select__menu">
            {filteredOptions.map((option) => {
              const isSelected = selected.some(
                (sel) => sel.value === option.value
              );
              return (
                <div
                  key={option.value}
                  className={`multi-select__menu-item ${
                    isSelected ? 'selected' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectOption(option);
                  }}
                >
                  {option.label}
                  {isSelected && <span>✓</span>}
                </div>
              );
            })}
            {filteredOptions.length === 0 && (
              <div className="multi-select__menu-item">
                Press <strong>Enter</strong> to add: <em>{inputValue}</em>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default MultiSelect;
  