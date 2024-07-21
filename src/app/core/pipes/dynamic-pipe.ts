import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DynamicPipe'
})
export class DynamicPipe implements PipeTransform {
  transform(code: string, provinceList: { CODE: string, NAME: string }[]): string {
    const province = provinceList.find(p => p.CODE === code);
    return province ? province.NAME : '...';
  }
}
