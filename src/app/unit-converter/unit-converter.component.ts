import { Component } from '@angular/core';

@Component({
  selector: 'app-unit-converter',
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.css'],
})
export class UnitConverterComponent {
  inputValue: number = 0;
  category: string = 'Length'; // Danh mục mặc định
  inputUnit: string = 'Meters';
  outputUnit: string = 'Kilometers';
  convertedValue: number | null = null;

  // Các danh mục có sẵn
  categories: string[] = ['Length', 'Weight', 'Temperature', 'Volume', 'Speed'];

  // Dữ liệu chuyển đổi
  units: { [category: string]: string[] } = {
    Length: ['Meters', 'Kilometers', 'Centimeters', 'Feet', 'Inches'],
    Weight: ['Kilograms', 'Grams', 'Pounds', 'Ounces'],
    Temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
    Volume: ['Liters', 'Milliliters', 'Gallons', 'Cubic meters'],
    Speed: [
      'Meters per second',
      'Kilometers per hour',
      'Miles per hour',
      'Feet per second',
    ],
  };

  // Tỉ lệ chuyển đổi cho độ dài, khối lượng và thể tích
  conversionRates: { [key: string]: { [unit: string]: number } } = {
    Length: {
      Meters: 1,
      Kilometers: 0.001,
      Centimeters: 100,
      Feet: 3.28084,
      Inches: 39.3701,
    },
    Weight: {
      Kilograms: 1,
      Grams: 1000,
      Pounds: 2.20462,
      Ounces: 35.274,
    },
    Volume: {
      Liters: 1,
      Milliliters: 1000,
      Gallons: 0.264172,
      'Cubic meters': 0.001,
    },
    Speed: {
      'Meters per second': 1,
      'Kilometers per hour': 3.6,
      'Miles per hour': 2.23694,
      'Feet per second': 3.28084,
    },
  };

  // Các đơn vị hiện tại dựa trên danh mục được chọn
  currentUnits: string[] = this.units['Length'];

  // Xử lý thay đổi danh mục
  onCategoryChange(): void {
    this.currentUnits = this.units[this.category];
    this.inputUnit = this.currentUnits[0];
    this.outputUnit = this.currentUnits[0];
  }

  // Chuyển đổi dựa trên danh mục được chọn
  convert(): void {
    if (this.category === 'Temperature') {
      this.convertTemperature();
    } else {
      this.convertGeneral();
    }
  }

  // Chuyển đổi chung cho độ dài, khối lượng, thể tích, tốc độ
  convertGeneral(): void {
    const rateFrom = this.conversionRates[this.category][this.inputUnit];
    const rateTo = this.conversionRates[this.category][this.outputUnit];
    this.convertedValue = (this.inputValue * rateFrom) / rateTo;
  }

  // Logic chuyển đổi nhiệt độ
  convertTemperature(): void {
    if (this.inputUnit === this.outputUnit) {
      this.convertedValue = this.inputValue;
    } else if (
      this.inputUnit === 'Celsius' &&
      this.outputUnit === 'Fahrenheit'
    ) {
      this.convertedValue = (this.inputValue * 9) / 5 + 32;
    } else if (this.inputUnit === 'Celsius' && this.outputUnit === 'Kelvin') {
      this.convertedValue = this.inputValue + 273.15;
    } else if (
      this.inputUnit === 'Fahrenheit' &&
      this.outputUnit === 'Celsius'
    ) {
      this.convertedValue = ((this.inputValue - 32) * 5) / 9;
    } else if (
      this.inputUnit === 'Fahrenheit' &&
      this.outputUnit === 'Kelvin'
    ) {
      this.convertedValue = ((this.inputValue - 32) * 5) / 9 + 273.15;
    } else if (this.inputUnit === 'Kelvin' && this.outputUnit === 'Celsius') {
      this.convertedValue = this.inputValue - 273.15;
    } else if (
      this.inputUnit === 'Kelvin' &&
      this.outputUnit === 'Fahrenheit'
    ) {
      this.convertedValue = ((this.inputValue - 273.15) * 9) / 5 + 32;
    }
  }
}
