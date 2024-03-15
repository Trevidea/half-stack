// import { Pipe, PipeTransform } from '@angular/core';
// import { ColumnMode } from '@swimlane/ngx-datatable';

// @Pipe({
//   name: 'customFilter'
// })
// export class CustomFilterPipe implements PipeTransform {
//   transform(rows: any[], term: string, columns: any[], columnMode: ColumnMode): any[] {
//     if (!term) {
//       return rows;
//     }

//     return rows.filter((row) => {
//       return columns.some((column) => {
//         const cellValue = row[column.prop];

//         if (!cellValue) {
//           return false;
//         }

//         if (columnMode === ColumnMode.force) {
//           // For columns that are set to "force" mode, use the column's value as the search term
//           return cellValue === term;
//         } else {
//           // For columns that are not set to "force" mode, perform a partial string match on the row's value
//           return (cellValue as string).toLowerCase().includes(term.toLowerCase());
//         }
//       });
//     });
//   }
// }                         