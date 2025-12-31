import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  showPresent?: boolean;
  isPresent?: boolean;
  onPresentChange?: (isPresent: boolean) => void;
  minYear?: number;
  maxYear?: number;
}

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export function DatePicker({
  label,
  value,
  onChange,
  disabled = false,
  minYear = 1970,
  maxYear,
}: DatePickerProps) {
  const currentYear = new Date().getFullYear();
  const effectiveMaxYear = maxYear || currentYear + 5;
  
  // Parse the value (format: YYYY-MM)
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  useEffect(() => {
    if (value) {
      const parts = value.split('-');
      if (parts.length >= 2) {
        setSelectedYear(parts[0]);
        setSelectedMonth(parts[1]);
      }
    }
  }, [value]);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    if (selectedYear) {
      onChange(`${selectedYear}-${month}`);
    }
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    if (selectedMonth) {
      onChange(`${year}-${selectedMonth}`);
    } else {
      // Default to January if no month selected
      setSelectedMonth('01');
      onChange(`${year}-01`);
    }
  };

  // Generate years array (descending from max to min)
  const years = Array.from(
    { length: effectiveMaxYear - minYear + 1 },
    (_, i) => String(effectiveMaxYear - i)
  );

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="flex gap-2">
        <Select
          value={selectedMonth}
          onValueChange={handleMonthChange}
          disabled={disabled}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedYear}
          onValueChange={handleYearChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
