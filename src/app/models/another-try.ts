const hierarchy: Hierarchy = {
  id: '123',
  items: [
    { id: '1', children: [ { id: '2' }, { id: '3'}] },
    { id: '4', children: [ { id: '5' }, { id: '6', children: [{id: '7'}]}] },
  ],
};

export interface Hierarchy {
  id: string;
  items: HierarchyItem[];
}

export interface HierarchyItem {
  id: string;
  children?: HierarchyItem[];
}
