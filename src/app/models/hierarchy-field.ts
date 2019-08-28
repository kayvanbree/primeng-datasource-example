const data: Row[] = [
  {
    fields: [
      { column: 'name', id: '1', value: 'Henk' },
      { column: 'name', id: '2', parent: '1', value: 'Peter' } as HierarchyField,
    ]
  },
];

export interface Row {
  fields: Field[];
}

export interface HierarchyField extends Field {
  parent: string;
}

export interface Field {
  value: any;
  id: string;
  column: string;
}
