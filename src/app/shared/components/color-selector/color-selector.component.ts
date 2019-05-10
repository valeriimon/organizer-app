import { Component, OnInit, forwardRef } from '@angular/core';
import { ColorPallete } from '../../models';
import { colors } from '../../constants';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { }

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorSelectorComponent),
    multi: true
  }],
})
export class ColorSelectorComponent implements ControlValueAccessor {
  label: string = '';
  colorList: ColorPallete = colors;

  private innerValue: any = '';

  constructor() { }

  private _onTouch: () => void = noop;
  private _onChange: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this._onChange(v);
    }
  }
  onBlur() {
    this._onTouch();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this._onChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouch = fn;
  }

}
